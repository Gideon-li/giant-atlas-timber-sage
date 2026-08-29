import { useEffect, useState } from "react";
import { isOuhai } from "@/lib/qimen/china";
import { forecastWeather, REGIONS_PACK, type WeatherForecast } from "@/lib/qimen/weather-model";
import { regionForProvince, regionMeta } from "@/lib/qimen/regions";
import type { QimenChart } from "@/lib/qimen/types";
import { useAppStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";

function doyOf(y: number, m: number, d: number) {
  const dt = Date.UTC(y, m - 1, d);
  return Math.floor((dt - Date.UTC(y, 0, 1)) / 86400000) + 1;
}

export function WeatherPanel({ chart }: { chart: QimenChart }) {
  const province = useAppStore((s) => s.province);
  const city = useAppStore((s) => s.city);
  const district = useAppStore((s) => s.district);
  const civil = useAppStore((s) => s.civil);
  const provinceCode = useAppStore((s) => s.provinceCode);
  const ouhai = isOuhai(province, city, district);
  const regionId = regionForProvince(provinceCode);
  const region = regionMeta(regionId);
  const [fc, setFc] = useState<WeatherForecast | null>(null);

  useEffect(() => {
    setFc(null);
    const id = window.setTimeout(() => {
      setFc(forecastWeather(chart, civil.month, doyOf(civil.year, civil.month, civil.day), regionId));
    }, 0);
    return () => window.clearTimeout(id);
  }, [chart, civil.year, civil.month, civil.day, regionId]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-display text-lg text-fg">古法测天</h2>
        <p className="text-xs text-muted">
          玄武主雨，腾蛇主雷，白虎主风，九天主晴，九地主雾湿。当前气候区「{region.place}」使用独立权重，数据 {REGIONS_PACK.start}–
          {REGIONS_PACK.end} Open-Meteo 再分析。
        </p>
      </div>

      <p className="rounded-md border border-border bg-elevated px-3 py-2 text-xs text-muted">
        选点 {province}
        {city}
        {district} → 气候站 {region.name}（{region.place}）
        {ouhai ? " · 瓯海为原校准点" : " · 本区独立训练，非瓯海套用"}。全国共 {REGIONS_PACK.regions.length} 套权重。
      </p>

      {!fc ? (
        <p className="rounded-lg border border-border bg-surface px-4 py-8 text-center text-sm text-muted">
          正在载入「{region.name}」权重…
        </p>
      ) : (
        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-muted">{chart.ju.label}</p>
              <p className="mt-1 font-display text-2xl text-fg">{fc.cls}</p>
              <p className="mt-1 text-xs text-subtle">{fc.level}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-2xl tabular-nums text-fg">
                {fc.score > 0 ? "+" : ""}
                {fc.score}
              </p>
              <p className="text-xs text-muted">有雨倾向 {fc.rainProb}%</p>
              <Badge tone={fc.cls === "雨" ? "bad" : fc.cls === "晴" ? "good" : "warn"} className="mt-1">
                {fc.cls}
              </Badge>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {fc.probs.map((p) => (
              <div key={p.name} className="rounded-md border border-border bg-elevated p-2.5">
                <p className="text-[11px] text-subtle">{p.name}</p>
                <p className="mt-1 font-mono text-sm tabular-nums">{p.p}%</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm leading-7 text-fg">{fc.reading}</p>
          {fc.factors?.length ? (
            <ul className="mt-3 divide-y divide-border">
              {fc.factors.map((f) => (
                <li key={f.key} className="flex items-center justify-between py-1.5 text-xs">
                  <span className="text-muted">{f.label}</span>
                  <span className="font-mono tabular-nums">
                    {f.weight > 0 ? "+" : ""}
                    {f.weight}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="mt-2 text-[11px] text-subtle">
            古法雨势 {fc.ancient.rain} · 晴势 {fc.ancient.sun} · 风 {fc.ancient.wind} · 雷 {fc.ancient.thunder}
          </p>
          <p className="mt-2 text-[11px] text-subtle">{fc.sourceNote}</p>
        </div>
      )}

      <p className="text-xs leading-5 text-muted">
        训练过程、权重与原始数据仅管理员可见。请用管理员账号登录后，打开右上角「管理」下载论文与数据。
      </p>
    </div>
  );
}
