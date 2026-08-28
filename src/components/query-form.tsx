import { CITIES, HOUR_NAMES } from "@/lib/qimen/constants";
import { hourToZhiIndex } from "@/lib/qimen/calendar";
import { EVENTS } from "@/lib/qimen/constants";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function QueryForm() {
  const civil = useAppStore((s) => s.civil);
  const setCivil = useAppStore((s) => s.setCivil);
  const trueSolar = useAppStore((s) => s.trueSolar);
  const cityId = useAppStore((s) => s.cityId);
  const mode = useAppStore((s) => s.mode);
  const setField = useAppStore((s) => s.setField);
  const useNow = useAppStore((s) => s.useNow);
  const personName = useAppStore((s) => s.personName);
  const gender = useAppStore((s) => s.gender);
  const birthYear = useAppStore((s) => s.birthYear);
  const eventId = useAppStore((s) => s.eventId);

  const dateValue = `${civil.year}-${pad(civil.month)}-${pad(civil.day)}`;
  const timeValue = `${pad(civil.hour)}:${pad(civil.minute)}`;
  const zhiIdx = hourToZhiIndex(civil.hour);

  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-[var(--shadow-panel)] sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-display text-sm text-fg">起盘</p>
          <p className="mt-0.5 text-xs text-muted">时间用北京时间。时辰一换，盘面与权重即变。</p>
        </div>
        <div className="flex rounded-md border border-border bg-elevated p-0.5">
          {(
            [
              ["scan", "全盘扫描"],
              ["ask", "定向问事"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setField("mode", id)}
              className={cn(
                "h-10 rounded-sm px-3 text-sm transition-colors",
                mode === id ? "bg-primary text-primary-fg" : "text-muted hover:text-fg",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="col-span-2 flex min-h-11 flex-col gap-1 text-xs text-muted sm:col-span-1">
          日期
          <input
            type="date"
            value={dateValue}
            onChange={(e) => {
              const [y, m, d] = e.target.value.split("-").map(Number);
              if (y && m && d) setCivil({ ...civil, year: y, month: m, day: d });
            }}
            className="h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
          />
        </label>
        <label className="flex min-h-11 flex-col gap-1 text-xs text-muted">
          时刻
          <input
            type="time"
            value={timeValue}
            onChange={(e) => {
              const [h, mi] = e.target.value.split(":").map(Number);
              if (Number.isFinite(h) && Number.isFinite(mi)) {
                setCivil({ ...civil, hour: h, minute: mi });
              }
            }}
            className="h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
          />
        </label>
        <div className="flex items-end">
          <Button type="button" variant="secondary" className="w-full" onClick={useNow}>
            此刻
          </Button>
        </div>
        <label className="flex items-center gap-2 text-sm text-fg">
          <input
            type="checkbox"
            checked={trueSolar}
            onChange={(e) => setField("trueSolar", e.target.checked)}
            className="size-4 accent-primary"
          />
          真太阳时
        </label>
      </div>

      {trueSolar ? (
        <label className="mt-3 flex flex-col gap-1 text-xs text-muted">
          城市经度（近似真太阳时，未计均时差）
          <select
            value={cityId}
            onChange={(e) => setField("cityId", e.target.value)}
            className="h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
          >
            {CITIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} · {c.lng}°E
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <div className="mt-4">
        <p className="mb-2 text-xs text-muted">时辰</p>
        <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-12">
          {HOUR_NAMES.map((name, i) => (
            <button
              key={name}
              type="button"
              onClick={() => setCivil({ ...civil, hour: (i * 2 + 23) % 24, minute: 30 })}
              className={cn(
                "h-10 rounded-md border font-display text-sm transition-colors",
                zhiIdx === i
                  ? "border-primary bg-primary text-primary-fg"
                  : "border-border bg-elevated text-muted hover:text-fg",
              )}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {mode === "ask" ? (
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 sm:grid-cols-4">
          <label className="flex flex-col gap-1 text-xs text-muted">
            称呼
            <input
              value={personName}
              onChange={(e) => setField("personName", e.target.value)}
              placeholder="可空"
              className="h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none placeholder:text-subtle focus:border-ring"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-muted">
            性别
            <select
              value={gender}
              onChange={(e) => setField("gender", e.target.value as "male" | "female")}
              className="h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
            >
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs text-muted">
            出生年（年命）
            <input
              inputMode="numeric"
              value={birthYear}
              onChange={(e) => setField("birthYear", e.target.value.replace(/[^\d]/g, "").slice(0, 4))}
              placeholder="如 1992"
              className="h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none placeholder:text-subtle focus:border-ring"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-muted">
            所问之事
            <select
              value={eventId}
              onChange={(e) => setField("eventId", e.target.value as typeof eventId)}
              className="h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
            >
              {EVENTS.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : null}
    </section>
  );
}
