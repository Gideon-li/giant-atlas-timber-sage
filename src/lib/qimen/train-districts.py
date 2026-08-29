#!/usr/bin/env python3
"""Train one L2 logistic weather model per China district (2020–2026).

Open-Meteo archive was rate-limited. Labels come from NOAA CPC Unified Gauge
daily precipitation (0.5°), bilinearly interpolated to each district centroid
so every 区/县 gets its own series and its own (w, b).
"""
from __future__ import annotations

import json
import time
from collections import defaultdict
from datetime import date, timedelta
from pathlib import Path

import numpy as np
from netCDF4 import Dataset
from cftime import num2date

ROOT = Path("/workspace/src/lib/qimen")
PCA_PATH = ROOT / "china-pca.json"
X_PATH = Path("/tmp/qimen-X.json")
OUT_PATH = ROOT / "district-weights.json"
COORDS_PATH = ROOT / "district-coords.json"
CAL_PATH = ROOT / "event-calibration.json"
CPC_DIR = Path("/tmp/cpc")

START = "2020-01-01"
END = "2026-08-27"  # CPC 2026 file ends here
TRAIN_UNTIL = "2024-12-31"
EPOCHS = 120
EPOCHS_SOFT = 80
LR = 0.35
L2 = 0.002
SCORE_SCALE = 22
FILL = 1e20
Y_PATH = Path("/tmp/Ymm.npz")

GATE_BASE = {"生门": 22, "开门": 20, "休门": 14, "景门": 6, "杜门": -4, "惊门": -10, "伤门": -12, "死门": -20}
STAR_BASE = {"天辅": 16, "天心": 16, "天任": 12, "天冲": 10, "天禽": 14, "天英": 2, "天柱": -8, "天芮": -12, "天蓬": -14}
GOD_BASE = {"值符": 18, "九天": 14, "九地": 10, "太阴": 12, "六合": 12, "腾蛇": -10, "白虎": -12, "玄武": -10}


def cell_key(lat: float, lng: float):
    return (round(lat * 4) / 4, round(lng * 4) / 4)


def build_units(pca, coords):
    units = []
    for p in pca:
        pc = coords.get(p["code"])
        for c in p["c"]:
            cc = coords.get(c["code"])
            areas = [a for a in (c.get("a") or []) if a["n"] not in ("市辖区", "县")]
            if not areas:
                src = coords.get(c["code"]) or pc
                if src:
                    units.append(
                        {
                            "code": c["code"],
                            "kind": "district",
                            "name": c["n"],
                            "province": p["n"],
                            "city": c["n"],
                            "district": c["n"],
                            "provinceCode": p["code"],
                            "cityCode": c["code"],
                            "lat": src["lat"],
                            "lng": src["lng"],
                        }
                    )
                continue
            for a in areas:
                src = coords.get(a["code"]) or cc or pc
                if not src:
                    continue
                units.append(
                    {
                        "code": a["code"],
                        "kind": "district",
                        "name": a["n"],
                        "province": p["n"],
                        "city": c["n"],
                        "district": a["n"],
                        "provinceCode": p["code"],
                        "cityCode": c["code"],
                        "lat": src["lat"],
                        "lng": src["lng"],
                    }
                )
            if cc:
                units.append(
                    {
                        "code": c["code"],
                        "kind": "city",
                        "name": c["n"],
                        "province": p["n"],
                        "city": c["n"],
                        "district": "",
                        "provinceCode": p["code"],
                        "cityCode": c["code"],
                        "lat": cc["lat"],
                        "lng": cc["lng"],
                    }
                )
        if pc:
            units.append(
                {
                    "code": p["code"],
                    "kind": "province",
                    "name": p["n"],
                    "province": p["n"],
                    "city": "",
                    "district": "",
                    "provinceCode": p["code"],
                    "cityCode": "",
                    "lat": pc["lat"],
                    "lng": pc["lng"],
                }
            )
    for u in units:
        u["cell"] = cell_key(u["lat"], u["lng"])
    return units


def load_cpc_cube():
    """Return dates, precip cropped to China (T, nlat, nlon), lat, lon."""
    blocks = []
    date_list = []
    lat_c = lon_c = None
    i0 = i1 = j0 = j1 = None
    for year in range(2020, 2027):
        path = CPC_DIR / f"precip.{year}.nc"
        ds = Dataset(path)
        lat = np.array(ds.variables["lat"][:], dtype=np.float64)
        lon = np.array(ds.variables["lon"][:], dtype=np.float64)
        if lat_c is None:
            # CPC lat decreases 89.75 → -89.75
            lat_mask = (lat >= 15.0) & (lat <= 55.5)
            lon_mask = (lon >= 70.0) & (lon <= 140.0)
            i_idx = np.where(lat_mask)[0]
            j_idx = np.where(lon_mask)[0]
            i0, i1 = int(i_idx[0]), int(i_idx[-1]) + 1
            j0, j1 = int(j_idx[0]), int(j_idx[-1]) + 1
            lat_c = lat[i0:i1]
            lon_c = lon[j0:j1]
            print("  china grid", lat_c.shape, lon_c.shape, "lat", lat_c[0], lat_c[-1], "lon", lon_c[0], lon_c[-1])
        t = ds.variables["time"]
        times = num2date(np.array(t[:]), t.units)
        p = np.array(ds.variables["precip"][:, i0:i1, j0:j1], dtype=np.float32)
        ds.close()
        p = np.where(np.abs(p) > FILL, np.nan, p)
        keep = 0
        for i, tm in enumerate(times):
            iso = f"{tm.year:04d}-{tm.month:02d}-{tm.day:02d}"
            if iso < START or iso > END:
                continue
            date_list.append(iso)
            blocks.append(p[i])
            keep += 1
        print("  cpc", year, "kept", keep, "running", len(date_list))
        del p
    precip = np.stack(blocks, axis=0)
    del blocks
    print("cpc cube", precip.shape, precip.nbytes // 1_000_000, "MB", date_list[0], date_list[-1])
    return date_list, precip, lat_c, lon_c


def bilinear_points(precip, lats, lons, pts):
    """pts: (N,2) lat,lng → (T,N) mm. CPC lon is 0–360, lat decreasing."""
    t, nlat, nlon = precip.shape
    n = len(pts)
    plat = pts[:, 0]
    plon = np.where(pts[:, 1] < 0, pts[:, 1] + 360.0, pts[:, 1])
    # lon increasing
    j = np.searchsorted(lons, plon) - 1
    j = np.clip(j, 0, nlon - 2)
    # lat decreasing
    i = np.searchsorted(-lats, -plat) - 1
    i = np.clip(i, 0, nlat - 2)
    lat1, lat2 = lats[i], lats[i + 1]
    lon1, lon2 = lons[j], lons[j + 1]
    ty = np.where(lat1 == lat2, 0.0, (plat - lat1) / (lat2 - lat1))
    tx = np.where(lon1 == lon2, 0.0, (plon - lon1) / (lon2 - lon1))
    ty = ty.astype(np.float32)
    tx = tx.astype(np.float32)
    v00 = precip[:, i, j]
    v01 = precip[:, i, j + 1]
    v10 = precip[:, i + 1, j]
    v11 = precip[:, i + 1, j + 1]
    w00 = (1 - ty) * (1 - tx)
    w01 = (1 - ty) * tx
    w10 = ty * (1 - tx)
    w11 = ty * tx
    acc = np.zeros((t, n), dtype=np.float64)
    wsum = np.zeros((t, n), dtype=np.float64)
    for v, w in ((v00, w00), (v01, w01), (v10, w10), (v11, w11)):
        ok = np.isfinite(v)
        acc += np.where(ok, v * w, 0.0)
        wsum += np.where(ok, w, 0.0)
    out = np.divide(acc, wsum, out=np.zeros_like(acc), where=wsum > 1e-6)
    bad = wsum[0] <= 1e-6
    if bad.any():
        print("  fallback nearest for", int(bad.sum()), "points")
        finite_frac = np.isfinite(precip).mean(axis=0)
        for k in np.where(bad)[0]:
            ii, jj = int(i[k]), int(j[k])
            found = None
            for rad in range(1, 12):
                i0, i1 = max(0, ii - rad), min(nlat, ii + rad + 2)
                j0, j1 = max(0, jj - rad), min(nlon, jj + rad + 2)
                sub = finite_frac[i0:i1, j0:j1]
                if sub.max() < 0.5:
                    continue
                loc = np.unravel_index(np.argmax(sub), sub.shape)
                found = precip[:, i0 + loc[0], j0 + loc[1]]
                break
            if found is None:
                found = np.nanmean(precip[:, ii : ii + 1, jj : jj + 1], axis=(1, 2))
            out[:, k] = np.where(np.isfinite(found), found, 0.0)
    return np.clip(out, 0.0, None).astype(np.float32)


def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-np.clip(z, -20, 20)))


def train_logit_batch(X, Y):
    n, f = X.shape
    d = Y.shape[1]
    w = np.zeros((f, d), dtype=np.float64)
    b = np.zeros(d, dtype=np.float64)
    for _ in range(EPOCHS):
        p = sigmoid(X @ w + b)
        err = p - Y
        b -= LR * err.mean(axis=0)
        w -= LR * (X.T @ err / n + L2 * w)
    return w, b


def train_softmax_batch(X, Y, k=3, chunk=400):
    n, f = X.shape
    d = Y.shape[1]
    w = np.zeros((k, f, d), dtype=np.float64)
    b = np.zeros((k, d), dtype=np.float64)
    for c0 in range(0, d, chunk):
        c1 = min(d, c0 + chunk)
        wc, bc = _softmax_one(X, Y[:, c0:c1], k)
        w[:, :, c0:c1] = wc
        b[:, c0:c1] = bc
        print("  softmax", c1, "/", d, flush=True)
    return w, b


def _softmax_one(X, Y, k):
    n, f = X.shape
    d = Y.shape[1]
    w = np.zeros((k, f, d), dtype=np.float32)
    b = np.zeros((k, d), dtype=np.float32)
    X32 = X.astype(np.float32)
    n_idx = np.arange(n)[:, None]
    d_idx = np.arange(d)[None, :]
    for _ in range(EPOCHS_SOFT):
        z = np.einsum("nf,kfd->nkd", X32, w) + b
        z -= z.max(axis=1, keepdims=True)
        e = np.exp(np.clip(z, -20, 20))
        p = e / e.sum(axis=1, keepdims=True)
        yoh = np.zeros_like(p)
        yoh[n_idx, Y, d_idx] = 1.0
        err = p - yoh
        b -= np.float32(LR) * err.mean(axis=0)
        w -= np.float32(LR) * (np.einsum("nkd,nf->kfd", err, X32) / n + np.float32(L2) * w)
    return w.astype(np.float64), b.astype(np.float64)


def classify3(p_mm):
    y = np.ones(p_mm.shape, dtype=np.int32)
    y[p_mm < 0.1] = 0
    y[p_mm >= 5.0] = 2
    return y


def xun_acc_batch(p_mm, logits, lo, hi):
    span = hi - lo
    n_xun = span // 10
    if n_xun <= 0:
        return np.zeros(p_mm.shape[1])
    wet = (p_mm[lo : lo + n_xun * 10].reshape(n_xun, 10, -1) >= 0.1).sum(axis=1) >= 5
    pred = logits[lo : lo + n_xun * 10].reshape(n_xun, 10, -1).mean(axis=1) >= 0
    return (wet == pred).mean(axis=0)


def mix_event(classic, prefix, names, pooled, med, global_scale):
    out = {}
    for k, v in classic.items():
        try:
            j = names.index(f"{prefix}_{k}")
            beta = float(pooled[j])
        except ValueError:
            beta = 0.0
        rel = max(0.55, min(1.35, 0.75 + 0.5 * (abs(beta) / (med * 3 + 1e-6))))
        out[k] = int(round(v * rel * global_scale))
    return out


def r5(xs):
    return [round(float(v), 5) for v in xs]


def main():
    pca = json.loads(PCA_PATH.read_text())
    if not COORDS_PATH.exists():
        raise SystemExit("district-coords.json missing")
    coords = json.loads(COORDS_PATH.read_text())
    print("coords", len(coords))

    units = build_units(pca, coords)
    districts = [u for u in units if u["kind"] == "district"]
    print("units", len(units), "districts", len(districts))

    pack = json.loads(X_PATH.read_text())
    dates_x = pack["dates"]
    X_all = np.array(pack["X"], dtype=np.float64)
    names = pack["featureNames"]

    Ymm = None
    dates = None
    if Y_PATH.exists():
        z = np.load(Y_PATH)
        Ymm = z["Y"]
        dates = [str(x) for x in z["dates"]]
        print("loaded Y cache", Ymm.shape, dates[0], dates[-1])

    if Ymm is None:
        print("loading CPC…")
        dates_cpc, precip, lats, lons = load_cpc_cube()
        c_map = {d: i for i, d in enumerate(dates_cpc)}
        dates = [d for d in dates_x if d in c_map]
        p_all = precip[[c_map[d] for d in dates]]
        del precip
        pts = np.array([[u["lat"], u["lng"]] for u in units], dtype=np.float64)
        print("interpolating", len(units), "centroids…")
        Ymm = bilinear_points(p_all, lats, lons, pts)
        del p_all
        np.savez_compressed(Y_PATH, Y=Ymm, dates=np.array(dates))
        print("wrote", Y_PATH, Ymm.shape)

    x_map = {d: i for i, d in enumerate(dates_x)}
    missing = [d for d in dates if d not in x_map]
    if missing:
        raise SystemExit(f"X missing {len(missing)} dates e.g. {missing[:3]}")
    X = X_all[[x_map[d] for d in dates]]
    del X_all
    cut = next(i for i, d in enumerate(dates) if d >= "2025-01-01")
    print("X", X.shape, "cut", cut, dates[cut], "features", len(names))
    print("Ymm", Ymm.shape, "nan", int(np.isnan(Ymm).sum()), "mean rain rate", float((Ymm >= 0.1).mean()))

    y_rain = (Ymm >= 0.1).astype(np.float64)
    y3 = classify3(Ymm)
    Xtr, Xte = X[:cut], X[cut:]
    print("training logit…", flush=True)
    w, b = train_logit_batch(Xtr, y_rain[:cut])
    print("training softmax…", flush=True)
    sw, sb = train_softmax_batch(Xtr, y3[:cut], 3)
    print("metrics…", flush=True)

    logits = X @ w + b
    rain_tr = ((Xtr @ w + b >= 0).astype(np.int32) == y_rain[:cut].astype(np.int32)).mean(axis=0)
    rain_te = ((Xte @ w + b >= 0).astype(np.int32) == y_rain[cut:].astype(np.int32)).mean(axis=0)
    d_tr = np.zeros(len(units))
    d_te = np.zeros(len(units))
    CH = 250
    for c0 in range(0, len(units), CH):
        c1 = min(len(units), c0 + CH)
        pred3_tr = (np.einsum("nf,kfd->nkd", Xtr, sw[:, :, c0:c1]) + sb[:, c0:c1]).argmax(axis=1)
        pred3_te = (np.einsum("nf,kfd->nkd", Xte, sw[:, :, c0:c1]) + sb[:, c0:c1]).argmax(axis=1)
        d_tr[c0:c1] = (pred3_tr == y3[:cut, c0:c1]).mean(axis=0)
        d_te[c0:c1] = (pred3_te == y3[cut:, c0:c1]).mean(axis=0)
    xun_tr = xun_acc_batch(Ymm, logits, 0, cut)
    xun_te = xun_acc_batch(Ymm, logits, cut, len(dates))
    print(
        "mean rainTe",
        round(float(rain_te.mean()), 3),
        "mean xunTe",
        round(float(xun_te.mean()), 3),
        "mean xunTr",
        round(float(xun_tr.mean()), 3),
    )

    # unique 0.5° native cells for honesty stats
    native = [(round(u["lat"] * 2) / 2, round(u["lng"] * 2) / 2) for u in units]
    print("unique 0.5deg nearest", len(set(native)), "unique centroids", len({(u["lat"], u["lng"]) for u in units}))

    cell_models = []
    cell_index = {}
    for ui, u in enumerate(units):
        cell_index[u["code"]] = ui
        p_mm = Ymm[:, ui]
        cell_models.append(
            {
                "lat": round(u["lat"], 5),
                "lng": round(u["lng"], 5),
                "nDistricts": 1,
                "code": u["code"],
                "kind": u["kind"],
                "rainDays": int((p_mm >= 0.1).sum()),
                "rainRate": round(float((p_mm >= 0.1).mean()), 4),
                "metrics": {
                    "rainAccTrain": round(float(rain_tr[ui]), 4),
                    "rainAccTest": round(float(rain_te[ui]), 4),
                    "dailyAccTrain": round(float(d_tr[ui]), 4),
                    "dailyAccTest": round(float(d_te[ui]), 4),
                    "xunAccTrain": round(float(xun_tr[ui]), 4),
                    "xunAccTest": round(float(xun_te[ui]), 4),
                    "interceptScore": round(float(b[ui] * SCORE_SCALE), 4),
                },
                "scoreModel": {"w": r5(w[:, ui]), "b": round(float(b[ui]), 5), "scale": SCORE_SCALE},
                "daily3": {
                    "w": [r5(sw[c, :, ui]) for c in range(3)],
                    "b": [round(float(sb[c, ui]), 5) for c in range(3)],
                    "classes": ["晴", "阴", "雨"],
                },
            }
        )

    lookup = {u["code"]: cell_index[u["code"]] for u in units if u["code"] in cell_index}

    dist_idx = [i for i, u in enumerate(units) if u["kind"] == "district"]
    pooled = w[:, dist_idx].mean(axis=1)
    mean_xun = float(np.mean(np.maximum(xun_tr[dist_idx], xun_te[dist_idx])))
    med = float(np.median(np.abs(pooled))) or 0.01
    global_scale = 0.92 + 0.16 * mean_xun
    event_cal = {
        "method": "事项权重 = 刘伯温经典先验 × 全国区县天气逻辑回归|β|信度 × 全国旬准确率尺度。符号仍依人事吉凶，不把雨势符号直接抄到求财。",
        "globalScale": round(global_scale, 4),
        "meanXunAcc": round(mean_xun, 4),
        "pooledLogit": [
            {"name": names[j], "logit": round(float(pooled[j]), 5), "score": round(float(pooled[j] * SCORE_SCALE), 4)}
            for j in range(len(names))
        ],
        "god": mix_event(GOD_BASE, "神", names, pooled, med, global_scale),
        "gate": mix_event(GATE_BASE, "门", names, pooled, med, global_scale),
        "star": mix_event(STAR_BASE, "星", names, pooled, med, global_scale),
        "classic": {"god": GOD_BASE, "gate": GATE_BASE, "star": STAR_BASE},
    }

    prov_acc = defaultdict(lambda: {"n": 0, "rain": 0.0, "xun": 0.0, "rate": 0.0})
    for i, u in enumerate(units):
        if u["kind"] != "district":
            continue
        a = prov_acc[u["province"]]
        a["n"] += 1
        a["rain"] += float(rain_te[i])
        a["xun"] += float(xun_te[i])
        a["rate"] += float((Ymm[:, i] >= 0.1).mean())

    payload = {
        "method": "全国每个区县行政中心经纬度，对 NOAA CPC Unified Gauge 0.5° 日降水做双线性插值，再对该区县自己的 2020–2026 序列独立做 L2 逻辑回归（有雨）与 softmax（晴/阴/雨）。原生分辨率 0.5°，相邻区县序列相关，但每区单独拟合，不共享 w、b。",
        "ml": {
            "primary": "Bernoulli logistic regression with L2",
            "auxiliary": "Multinomial logistic regression (softmax, 3-class)",
            "optimizer": "full-batch gradient descent (all districts in one matrix)",
            "epochs": EPOCHS,
            "learningRate": LR,
            "l2": L2,
            "scoreScale": SCORE_SCALE,
            "grid": "NOAA CPC Unified Gauge 0.5 degree, bilinear to district centroid",
            "probability": "P = 1 / (1 + exp(-S / 22))",
        },
        "source": "Xie, P., Chen, M., et al. CPC Unified Gauge-Based Analysis of Global Daily Precipitation. NOAA PSL. Centroids: Aliyun DataV areas_v3.",
        "start": dates[0],
        "end": dates[-1],
        "trainUntil": TRAIN_UNTIL,
        "testFrom": "2025-01-01",
        "nDays": len(dates),
        "nDistricts": len(districts),
        "nCities": sum(1 for u in units if u["kind"] == "city"),
        "nProvinces": sum(1 for u in units if u["kind"] == "province"),
        "nCells": len(cell_models),
        "nTotalSamples": int(len(dates) * len(districts)),
        "nTrainDays": cut,
        "nTestDays": len(dates) - cut,
        "featureNames": names,
        "meanXunAcc": round(mean_xun, 4),
        "meanRainAccTest": round(float(rain_te[dist_idx].mean()), 4),
        "globalScale": round(global_scale, 4),
        "pooledLogit": event_cal["pooledLogit"],
        "eventCalibration": event_cal,
        "provinceMetrics": [
            {
                "province": k,
                "n": v["n"],
                "rainAccTest": round(v["rain"] / v["n"], 4),
                "xunAccTest": round(v["xun"] / v["n"], 4),
                "rainRate": round(v["rate"] / v["n"], 4),
            }
            for k, v in sorted(prov_acc.items(), key=lambda kv: kv[0])
        ],
        "cells": cell_models,
        "lookup": lookup,
        "districts": [
            {
                "code": u["code"],
                "name": u["district"] or u["name"],
                "province": u["province"],
                "city": u["city"],
                "lat": u["lat"],
                "lng": u["lng"],
                "cell": cell_index.get(u["code"]),
            }
            for u in districts
        ],
    }
    OUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")))
    CAL_PATH.write_text(json.dumps(event_cal, ensure_ascii=False, indent=2))
    pub = Path("/workspace/public/qimen-district-weights-2020-2026.json")
    pub.write_bytes(OUT_PATH.read_bytes())
    print(
        "wrote",
        OUT_PATH,
        "bytes",
        OUT_PATH.stat().st_size,
        "cells",
        len(cell_models),
        "districts",
        len(districts),
        "lookup",
        len(lookup),
        "meanXun",
        round(mean_xun, 3),
        "cal",
        CAL_PATH,
    )


if __name__ == "__main__":
    main()
