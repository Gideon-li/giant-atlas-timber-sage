import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { LocationPicker } from "@/components/location-picker";
import { EVENTS, HOUR_NAMES } from "@/lib/qimen/constants";
import { dunFromSolarMonth, hourToZhiIndex, MONTH_NAMES } from "@/lib/qimen/calendar";
import { digitRootToJu } from "@/lib/qimen/classic";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const JU_HAN = ["一", "二", "三", "四", "五", "六", "七", "八", "九"] as const;

export function QueryForm() {
  const civil = useAppStore((s) => s.civil);
  const setCivil = useAppStore((s) => s.setCivil);
  const trueSolar = useAppStore((s) => s.trueSolar);
  const casting = useAppStore((s) => s.casting);
  const lotsMonth = useAppStore((s) => s.lotsMonth);
  const lotsJu = useAppStore((s) => s.lotsJu);
  const lotsCode = useAppStore((s) => s.lotsCode);
  const applyLotsCode = useAppStore((s) => s.applyLotsCode);
  const mode = useAppStore((s) => s.mode);
  const setField = useAppStore((s) => s.setField);
  const setLotsMonth = useAppStore((s) => s.setLotsMonth);
  const drawLots = useAppStore((s) => s.drawLots);
  const useNow = useAppStore((s) => s.useNow);
  const personName = useAppStore((s) => s.personName);
  const gender = useAppStore((s) => s.gender);
  const birthYear = useAppStore((s) => s.birthYear);
  const eventId = useAppStore((s) => s.eventId);
  const district = useAppStore((s) => s.district);
  const city = useAppStore((s) => s.city);
  const [open, setOpen] = useState(false);

  const dateValue = `${civil.year}-${pad(civil.month)}-${pad(civil.day)}`;
  const timeValue = `${pad(civil.hour)}:${pad(civil.minute)}`;
  const zhiIdx = hourToZhiIndex(civil.hour);
  const dun = dunFromSolarMonth(lotsMonth);
  const dunLabel = dun === "yang" ? "阳遁" : "阴遁";

  const [shaking, setShaking] = useState(false);
  const [flashJu, setFlashJu] = useState<number | null>(null);
  const shakeRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (shakeRef.current) window.clearInterval(shakeRef.current);
    };
  }, []);

  const onShake = () => {
    if (shaking) return;
    const reduce =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      drawLots();
      return;
    }
    setShaking(true);
    let ticks = 0;
    shakeRef.current = window.setInterval(() => {
      ticks += 1;
      setFlashJu(1 + Math.floor(Math.random() * 9));
      if (ticks >= 8) {
        if (shakeRef.current) window.clearInterval(shakeRef.current);
        shakeRef.current = null;
        setShaking(false);
        setFlashJu(null);
        drawLots();
      }
    }, 70);
  };

  const shownJu = flashJu ?? lotsJu;
  const isLots = casting === "lots";
  const locShort = district || city;
  const summary = isLots
    ? `求签 · ${dunLabel}${shownJu}局 · ${HOUR_NAMES[zhiIdx]}时 · ${locShort}`
    : `拆补 · ${civil.month}月${civil.day}日 ${HOUR_NAMES[zhiIdx]}时 · ${locShort}`;

  return (
    <section className="rounded-xl border border-border bg-surface p-3 shadow-[var(--shadow-panel)] sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-display text-sm text-fg">起盘</p>
          <p className="mt-0.5 text-xs leading-5 text-muted">
            {summary}
            <span className="text-subtle">
              {" "}
              · {mode === "scan" ? "全盘扫描" : "定向问事"}
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 shrink-0 items-center gap-1 rounded-md border border-border bg-elevated px-3 text-sm text-fg lg:hidden"
          aria-expanded={open}
        >
          {open ? "收起" : "改盘"}
          <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
        </button>
      </div>

      <div className="mt-3 flex flex-col gap-2 min-[520px]:flex-row min-[520px]:items-center min-[520px]:justify-between">
        <div className="flex min-w-0 rounded-md border border-border bg-elevated p-0.5">
          {(
            [
              ["chaibu", "拆补时盘"],
              ["lots", "求签定局"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setField("casting", id);
                if (id === "lots") setLotsMonth(civil.month);
              }}
              className={cn(
                "h-10 min-w-0 flex-1 rounded-sm px-2 text-sm transition-colors sm:px-3",
                casting === id ? "bg-primary text-primary-fg" : "text-muted hover:text-fg",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex min-w-0 rounded-md border border-border bg-elevated p-0.5">
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
                "h-10 min-w-0 flex-1 rounded-sm px-2 text-sm transition-colors sm:px-3",
                mode === id ? "bg-primary text-primary-fg" : "text-muted hover:text-fg",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className={cn(open ? "block" : "hidden lg:block")}>
      <p className="mt-3 hidden text-xs text-muted lg:block">
        {isLots
          ? "按月定阴阳遁，抽一局为用。时辰仍定值符值使。"
          : "时间用北京时间。时辰一换，盘面与权重即变。"}
      </p>

      {isLots ? (
        <div className="mt-4 border-t border-border pt-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs text-muted">月份定遁</p>
              <p className="mt-1 font-display text-fg">
                {MONTH_NAMES[lotsMonth - 1]}
                <span className="ml-2 text-sm text-muted">
                  {dunLabel} · 12–5月阳遁，6–11月阴遁
                </span>
              </p>
            </div>
            <Button type="button" variant="secondary" onClick={onShake} disabled={shaking}>
              {shaking ? "摇签中" : "摇签"}
            </Button>
          </div>

          <div className="fit-hours mt-3">
            {MONTH_NAMES.map((name, i) => {
              const m = i + 1;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setLotsMonth(m)}
                  className={cn(
                    "h-10 rounded-md border text-xs transition-colors sm:text-sm",
                    lotsMonth === m
                      ? "border-primary bg-primary text-primary-fg"
                      : "border-border bg-elevated text-muted hover:text-fg",
                  )}
                >
                  {m}
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-lg border border-border bg-elevated p-3">
            <p className="text-xs text-muted">三位数求局</p>
            <p className="mt-1 text-xs leading-5 text-subtle">
              把三位数字各位相加，超过 9 再加，得到 1–9 即为局数。例：168 → 1+6+8=15 → 1+5=6，第六局。阴阳遁仍按月份。
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <input
                inputMode="numeric"
                maxLength={6}
                placeholder="如 168"
                value={lotsCode ?? ""}
                onChange={(e) => applyLotsCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="h-12 w-32 rounded-md border border-border bg-surface px-3 font-mono text-lg tabular-nums text-fg outline-none placeholder:text-subtle focus:border-ring"
              />
              {lotsCode ? (
                <Badge tone="warn">
                  {digitRootToJu(lotsCode).steps.join(" → ") || lotsCode} · {dunLabel}
                  {lotsJu}局
                </Badge>
              ) : (
                <span className="text-xs text-subtle">输入后自动定局</span>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-2">
            <p className="text-xs text-muted">抽局 · 选 1–9，或摇签</p>
            <Badge tone="warn">
              {dunLabel}
              {shownJu}局
            </Badge>
          </div>
          <div className="mt-2 grid max-w-md grid-cols-3 gap-1.5">
            {JU_HAN.map((han, i) => {
              const n = i + 1;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setField("lotsJu", n)}
                  className={cn(
                    "flex h-14 items-center justify-center gap-1 rounded-md border font-display text-base transition-colors",
                    shownJu === n
                      ? "border-primary bg-primary text-primary-fg"
                      : "border-border bg-elevated text-muted hover:text-fg",
                  )}
                >
                  <span>{han}</span>
                  <span className="text-xs opacity-70">局</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className={cn("fit-fields mt-4", isLots && "border-t border-border pt-4")}>
        <label className="flex min-h-11 flex-col gap-1 text-xs text-muted">
          日期
          <input
            type="date"
            value={dateValue}
            onChange={(e) => {
              const [y, m, d] = e.target.value.split("-").map(Number);
              if (y && m && d) {
                setCivil({ ...civil, year: y, month: m, day: d });
                if (isLots) setLotsMonth(m);
              }
            }}
            className="h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
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
            className="h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
          />
        </label>
        <div className="flex items-end">
          <Button type="button" variant="secondary" className="w-full" onClick={useNow}>
            此刻
          </Button>
        </div>
        {isLots ? (
          <p className="flex items-center text-xs text-muted">时辰定值符，局数用签</p>
        ) : (
          <label className="flex items-center gap-2 text-sm text-fg">
            <input
              type="checkbox"
              checked={trueSolar}
              onChange={(e) => setField("trueSolar", e.target.checked)}
              className="size-4 accent-primary"
            />
            真太阳时
          </label>
        )}
      </div>

      {!isLots && trueSolar ? (
        <p className="mt-2 text-xs text-muted">真太阳时按所选省市区经度相对东经 120° 改正，未计均时差。</p>
      ) : null}

      <div className="mt-4">
        <p className="mb-2 text-xs text-muted">时辰</p>
        <div className="fit-hours">
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

      <LocationPicker />

      <div className="fit-people mt-4 border-t border-border pt-4">
        <label className="flex flex-col gap-1 text-xs text-muted">
          称呼
          <input
            value={personName}
            onChange={(e) => setField("personName", e.target.value)}
            placeholder="可空"
            className="h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none placeholder:text-subtle focus:border-ring"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted">
          性别
          <select
            value={gender}
            onChange={(e) => setField("gender", e.target.value as "male" | "female")}
            className="h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
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
            className="h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none placeholder:text-subtle focus:border-ring"
          />
        </label>
        {mode === "ask" ? (
          <label className="flex flex-col gap-1 text-xs text-muted">
            所问之事
            <select
              value={eventId}
              onChange={(e) => setField("eventId", e.target.value as typeof eventId)}
              className="h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
            >
              {EVENTS.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.name}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <p className="flex items-end text-xs leading-5 text-muted">
            填写出生年后，全盘扫描另计本命年、冲太岁、命干落宫，不改各事项用神。
          </p>
        )}
      </div>
      </div>
    </section>
  );
}
