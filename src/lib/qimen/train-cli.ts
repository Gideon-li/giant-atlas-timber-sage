/**
 * Offline trainer: 12 climate regions, 2020–2026.
 * Run: npx tsx src/lib/qimen/train-cli.ts
 */
import { writeFileSync } from "node:fs";
import { buildChart } from "./chart";
import { GATE_BASE, GOD_BASE, STAR_BASE } from "./constants";
import { SCORE_FEATURE_NAMES, SCORE_SCALE, extractScoreFeatures, sigmoid } from "./unified";
import regionsJson from "./weather-regions.json";

type Day = { d: string; w: number; p: number };
type Pack = {
  start: string;
  end: string;
  citation: string;
  regions: {
    id: string;
    name: string;
    place: string;
    climate: string;
    n: number;
    rainDays: number;
    rainRate: number;
    days: Day[];
  }[];
};

const PACK = regionsJson as Pack;
const EPOCHS = 120;
const LR = 0.35;
const L2 = 0.002;

function dayOfYear(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = Date.UTC(y, m - 1, d);
  return Math.floor((dt - Date.UTC(y, 0, 1)) / 86400000) + 1;
}

function classify3(day: Day): number {
  if (day.p >= 0.1 || day.w >= 51) return 2;
  if (day.w <= 1) return 0;
  return 1;
}

function softmax(z: number[]) {
  const m = Math.max(...z);
  const e = z.map((v) => Math.exp(v - m));
  const s = e.reduce((a, b) => a + b, 0);
  return e.map((v) => v / s);
}

function argmax(p: number[]) {
  let i = 0;
  for (let k = 1; k < p.length; k++) if (p[k]! > p[i]!) i = k;
  return i;
}

function trainSoftmax(X: number[][], y: number[], k: number) {
  const n = X.length;
  const f = X[0]!.length;
  const w = Array.from({ length: k }, () => Array.from({ length: f }, () => 0));
  const b = Array.from({ length: k }, () => 0);
  for (let ep = 0; ep < EPOCHS; ep++) {
    const gw = Array.from({ length: k }, () => Array.from({ length: f }, () => 0));
    const gb = Array.from({ length: k }, () => 0);
    for (let i = 0; i < n; i++) {
      const xi = X[i]!;
      const z = w.map((row, c) => row.reduce((s, wij, j) => s + wij * xi[j]!, 0) + b[c]!);
      const p = softmax(z);
      for (let c = 0; c < k; c++) {
        const err = p[c]! - (y[i] === c ? 1 : 0);
        gb[c] += err;
        for (let j = 0; j < f; j++) gw[c]![j] += err * xi[j]!;
      }
    }
    const scale = 1 / n;
    for (let c = 0; c < k; c++) {
      b[c] -= LR * gb[c]! * scale;
      for (let j = 0; j < f; j++) w[c]![j] -= LR * (gw[c]![j]! * scale + L2 * w[c]![j]!);
    }
  }
  return { w, b };
}

function trainLogit(X: number[][], y: number[]) {
  const n = X.length;
  const f = X[0]!.length;
  const w = Array.from({ length: f }, () => 0);
  let b = 0;
  for (let ep = 0; ep < EPOCHS; ep++) {
    const gw = Array.from({ length: f }, () => 0);
    let gb = 0;
    for (let i = 0; i < n; i++) {
      const xi = X[i]!;
      const z = b + w.reduce((s, wij, j) => s + wij * xi[j]!, 0);
      const p = sigmoid(z);
      const err = p - y[i]!;
      gb += err;
      for (let j = 0; j < f; j++) gw[j] += err * xi[j]!;
    }
    const scale = 1 / n;
    b -= LR * gb * scale;
    for (let j = 0; j < f; j++) w[j] -= LR * (gw[j]! * scale + L2 * w[j]!);
  }
  return { w, b };
}

function accLogit(X: number[][], y: number[], w: number[], b: number) {
  let ok = 0;
  for (let i = 0; i < X.length; i++) {
    const z = b + w.reduce((s, wij, j) => s + wij * X[i]![j]!, 0);
    const pred = z >= 0 ? 1 : 0;
    if (pred === y[i]) ok++;
  }
  return ok / X.length;
}

function accSoft(X: number[][], y: number[], w: number[][], b: number[]) {
  let ok = 0;
  for (let i = 0; i < X.length; i++) {
    const z = w.map((row, c) => row.reduce((s, wij, j) => s + wij * X[i]![j]!, 0) + b[c]!);
    if (argmax(softmax(z)) === y[i]) ok++;
  }
  return ok / X.length;
}

function xunAcc(days: Day[], X: number[][], w: number[], b: number, from: number, to: number) {
  let ok = 0;
  let n = 0;
  for (let i = from; i + 10 <= to; i += 10) {
    const wet = days.slice(i, i + 10).filter((d) => d.p >= 0.1).length >= 5 ? 1 : 0;
    let s = 0;
    for (let t = 0; t < 10; t++) {
      const xi = X[i + t]!;
      s += b + w.reduce((a, wij, j) => a + wij * xi[j]!, 0);
    }
    const pred = s / 10 >= 0 ? 1 : 0;
    if (pred === wet) ok++;
    n++;
  }
  return n ? ok / n : 0;
}

console.log("building shared Qimen features…");
const dates = PACK.regions[0]!.days;
const X: number[][] = [];
for (const day of dates) {
  const [y, m, d] = day.d.split("-").map(Number);
  const chart = buildChart({ year: y, month: m, day: d, hour: 12, minute: 0 });
  X.push(extractScoreFeatures(chart, dayOfYear(day.d)));
}
console.log("X", X.length, "x", X[0]!.length);

const cut = dates.findIndex((d) => d.d >= "2025-01-01");
const regionsOut = [];

for (const reg of PACK.regions) {
  const yRain = reg.days.map((d) => (d.p >= 0.1 ? 1 : 0));
  const y3 = reg.days.map(classify3);
  const logit = trainLogit(X.slice(0, cut), yRain.slice(0, cut));
  const soft = trainSoftmax(X.slice(0, cut), y3.slice(0, cut), 3);
  const rainTr = accLogit(X.slice(0, cut), yRain.slice(0, cut), logit.w, logit.b);
  const rainTe = accLogit(X.slice(cut), yRain.slice(cut), logit.w, logit.b);
  const dTr = accSoft(X.slice(0, cut), y3.slice(0, cut), soft.w, soft.b);
  const dTe = accSoft(X.slice(cut), y3.slice(cut), soft.w, soft.b);
  const xunTr = xunAcc(reg.days, X, logit.w, logit.b, 0, cut);
  const xunTe = xunAcc(reg.days, X, logit.w, logit.b, cut, X.length);
  const factors = logit.w
    .map((v, j) => ({ name: SCORE_FEATURE_NAMES[j]!, logit: v, score: v * SCORE_SCALE }))
    .sort((a, b) => Math.abs(b.score) - Math.abs(a.score));
  console.log(
    reg.id,
    "rain",
    (rainTr * 100).toFixed(1),
    (rainTe * 100).toFixed(1),
    "xun",
    (xunTr * 100).toFixed(1),
    (xunTe * 100).toFixed(1),
  );
  regionsOut.push({
    id: reg.id,
    name: reg.name,
    place: reg.place,
    climate: reg.climate,
    n: reg.n,
    rainDays: reg.rainDays,
    rainRate: reg.rainRate,
    trainN: cut,
    testN: X.length - cut,
    metrics: {
      rainAccTrain: rainTr,
      rainAccTest: rainTe,
      dailyAccTrain: dTr,
      dailyAccTest: dTe,
      xunAccTrain: xunTr,
      xunAccTest: xunTe,
      interceptScore: logit.b * SCORE_SCALE,
    },
    scoreModel: { w: logit.w, b: logit.b, scale: SCORE_SCALE },
    daily3: { w: soft.w, b: soft.b, classes: ["晴", "阴", "雨"] },
    topFactors: factors.slice(0, 12),
    allFactors: factors,
  });
}

const meanXun =
  regionsOut.reduce((s, r) => s + Math.max(r.metrics.xunAccTrain, r.metrics.xunAccTest), 0) /
  regionsOut.length;
const pooled = Array.from({ length: SCORE_FEATURE_NAMES.length }, () => 0);
for (const r of regionsOut) {
  for (let j = 0; j < pooled.length; j++) pooled[j] += r.scoreModel.w[j]!;
}
for (let j = 0; j < pooled.length; j++) pooled[j]! /= regionsOut.length;
const med =
  [...pooled].map(Math.abs).sort((a, b) => a - b)[Math.floor(pooled.length / 2)]! || 0.01;
const globalScale = 0.92 + 0.16 * meanXun;

function mix(classic: Record<string, number>, prefix: string) {
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(classic)) {
    const j = (SCORE_FEATURE_NAMES as readonly string[]).indexOf(`${prefix}_${k}`);
    const beta = j >= 0 ? pooled[j]! : 0;
    const rel = Math.max(0.55, Math.min(1.35, 0.75 + 0.5 * (Math.abs(beta) / (med * 3 + 1e-6))));
    out[k] = Math.round(v * rel * globalScale);
  }
  return out;
}

const eventCalibration = {
  method:
    "事项权重 = 刘伯温经典先验 × 天气逻辑回归|β|信度 × 全国旬准确率尺度。符号仍依人事吉凶，不把雨势符号直接抄到求财。",
  globalScale,
  meanXunAcc: meanXun,
  pooledLogit: SCORE_FEATURE_NAMES.map((name, j) => ({
    name,
    logit: pooled[j],
    score: pooled[j]! * SCORE_SCALE,
  })),
  god: mix(GOD_BASE, "神"),
  gate: mix(GATE_BASE, "门"),
  star: mix(STAR_BASE, "星"),
  classic: { god: GOD_BASE, gate: GATE_BASE, star: STAR_BASE },
};

const payload = {
  method: "L2 逻辑回归（二项有雨/无雨）+ 多项 softmax（晴/阴/雨）。分值 S = 22 × logit，与事项预测同一 sigmoid 百分比。",
  ml: {
    primary: "Bernoulli logistic regression with L2",
    auxiliary: "Multinomial logistic regression (softmax, 3-class)",
    optimizer: "full-batch gradient descent",
    epochs: EPOCHS,
    learningRate: LR,
    l2: L2,
    scoreScale: SCORE_SCALE,
    probability: "P = 1 / (1 + exp(-S / 22))",
  },
  source: PACK.citation,
  start: PACK.start,
  end: PACK.end,
  trainUntil: "2024-12-31",
  testFrom: "2025-01-01",
  nDays: X.length,
  nRegions: regionsOut.length,
  nTotalSamples: X.length * regionsOut.length,
  featureNames: [...SCORE_FEATURE_NAMES],
  regions: regionsOut,
  eventCalibration,
};

writeFileSync(new URL("./weather-weights.json", import.meta.url), JSON.stringify(payload));
console.log("wrote weather-weights.json", "meanXun", meanXun.toFixed(3), "globalScale", globalScale.toFixed(3));
