import { useState } from "react";
import type { FortuneKind, FortunePack, FortuneSlice, PeriodFortune } from "@/lib/qimen/fortune";
import type { EventScore } from "@/lib/qimen/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

function toneOf(level: string): "good" | "bad" | "warn" | "neutral" {
  if (level.includes("吉")) return "good";
  if (level.includes("凶")) return "bad";
  return "warn";
}

function ScoreMeter({ score }: { score: number }) {
  const pct = Math.round(((score + 100) / 200) * 100);
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-elevated">
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-300",
          score >= 6 ? "bg-auspicious" : score <= -6 ? "bg-inauspicious" : "bg-warn",
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function SliceBar({ slice, compact }: { slice: FortuneSlice; compact?: boolean }) {
  const pct = Math.round(((slice.score + 80) / 160) * 100);
  return (
    <div
      className={cn(
        "rounded-md border px-2 py-2",
        slice.current ? "border-primary bg-elevated" : "border-border bg-surface",
      )}
    >
      <div className="flex items-center justify-between gap-1">
        <span className={cn("text-muted", compact ? "text-[11px]" : "text-xs")}>{slice.name}</span>
        <span className="font-mono text-[11px] tabular-nums text-fg">
          {slice.score > 0 ? "+" : ""}
          {slice.score}
        </span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-elevated">
        <div
          className={cn(
            "h-full rounded-full",
            slice.score >= 6 ? "bg-auspicious" : slice.score <= -6 ? "bg-inauspicious" : "bg-warn",
          )}
          style={{ width: `${Math.max(6, Math.min(100, pct))}%` }}
        />
      </div>
      {slice.current ? (
        <p className="mt-1 text-[10px] text-subtle">当前</p>
      ) : null}
    </div>
  );
}

function OverallCard({ f }: { f: PeriodFortune }) {
  const palace = f.chart.palaces[f.palaceId];
  return (
    <article className="rounded-lg border border-border bg-surface p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg text-fg">{f.title}</h3>
          <p className="mt-1 text-xs text-muted">{f.subtitle}</p>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl tabular-nums text-fg">
            {f.score > 0 ? "+" : ""}
            {f.score}
          </p>
          <p className="text-xs text-muted">顺利倾向 {f.probability}%</p>
          <Badge tone={toneOf(f.level)} className="mt-1">
            {f.level}
          </Badge>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted">
        用神 {palace.bagua}
        {palace.id}宫值符 · {palace.god ?? "无神"} / {palace.star} / {palace.gate ?? "无门"}
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {(
          [
            ["开始 · 神", f.phases.start],
            ["过程 · 星", f.phases.process],
            ["收局 · 门", f.phases.end],
          ] as const
        ).map(([label, ph]) => (
          <div key={label} className="rounded-md border border-border bg-elevated p-2.5">
            <p className="text-[11px] text-subtle">{label}</p>
            <p
              className={cn(
                "mt-1 font-mono text-sm tabular-nums",
                ph.score >= 4 ? "text-auspicious-fg" : ph.score <= -4 ? "text-inauspicious-fg" : "text-fg",
              )}
            >
              {ph.score > 0 ? "+" : ""}
              {ph.score}
            </p>
            <p className="mt-1 text-[11px] leading-4 text-muted">{ph.summary}</p>
          </div>
        ))}
      </div>
      {f.patterns.length ? (
        <div className="mt-3 flex flex-wrap gap-1">
          {f.patterns.map((p) => (
            <Badge key={p} tone="warn">
              {p}
            </Badge>
          ))}
        </div>
      ) : null}
      <p className="mt-4 text-sm leading-7 text-fg">{f.reading}</p>
      {f.associations.length ? (
        <div className="mt-4 rounded-md border border-border bg-elevated p-3">
          <p className="font-display text-sm text-fg">联想预测</p>
          <p className="mt-1 text-xs text-subtle">据交节盘门星神与太岁月建日支推想，不是实录。</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted">
            {f.associations.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          {f.classicCite ? <p className="mt-2 text-xs leading-5 text-subtle">{f.classicCite}</p> : null}
        </div>
      ) : null}
    </article>
  );
}

function EventRows({ events }: { events: EventScore[] }) {
  const [open, setOpen] = useState<string | null>(events[0]?.eventId ?? null);
  return (
    <ul className="flex flex-col gap-1.5">
      {events.map((ev) => {
        const on = open === ev.eventId;
        return (
          <li key={ev.eventId}>
            <button
              type="button"
              onClick={() => setOpen(on ? null : ev.eventId)}
              className={cn(
                "flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-colors",
                on ? "border-primary bg-elevated" : "border-border bg-surface hover:border-border-strong",
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-fg">{ev.name}</span>
                  <span className="font-mono text-xs tabular-nums text-muted">
                    {ev.score > 0 ? "+" : ""}
                    {ev.score}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <ScoreMeter score={ev.score} />
                  <Badge tone={toneOf(ev.level)}>{ev.level}</Badge>
                </div>
                {on ? <p className="mt-2 text-xs leading-5 text-muted">{ev.reading}</p> : null}
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

const SCOPES: { id: FortuneKind; label: string; hint: string }[] = [
  { id: "year", label: "年运", hint: "立春交节" },
  { id: "month", label: "月运", hint: "节气交节" },
  { id: "day", label: "日运", hint: "日中午时" },
];

export function FortunePanel({
  pack,
  scope,
  onScope,
}: {
  pack: FortunePack;
  scope: FortuneKind;
  onScope: (k: FortuneKind) => void;
}) {
  const f = pack[scope];
  const sliceHint =
    scope === "year" ? "十二节气月" : scope === "month" ? "上中下元（旬）" : "当日十二时辰";
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-display text-lg text-fg">年 · 月 · 日运势</h2>
        <p className="text-xs text-muted">
          年家取立春交节、月家取当月节气交节、日家取午时。值符为「我」，分值与事项同一套 S → P=σ(S/22)。左侧九宫随此处切换为年盘、月盘或日盘。
        </p>
      </div>
      <div className="flex gap-1 rounded-md border border-border bg-surface p-1">
        {SCOPES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onScope(s.id)}
            className={cn(
              "h-11 flex-1 rounded-sm text-sm",
              scope === s.id ? "bg-primary text-primary-fg" : "text-muted hover:text-fg",
            )}
          >
            {s.label}
            <span className="ml-1 hidden text-[11px] opacity-70 sm:inline">{s.hint}</span>
          </button>
        ))}
      </div>
      <OverallCard f={f} />
      <div>
        <h3 className="font-display text-sm text-fg">{sliceHint}</h3>
        <p className="mt-1 text-xs text-muted">条越高越顺。高亮为当前所处。点击上方年/月/日可对照。</p>
        <div
          className={cn(
            "mt-2 grid gap-1.5",
            scope === "month" ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-3 sm:grid-cols-4",
          )}
        >
          {f.slices.map((s) => (
            <SliceBar key={s.id} slice={s} compact={scope === "day"} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-display text-sm text-fg">十二类事项（本{scope === "year" ? "年" : scope === "month" ? "月" : "日"}盘）</h3>
        <p className="mt-1 text-xs text-muted">用神仍按事项取宫，只是排盘时刻改为交节或午时。</p>
        <div className="mt-2">
          <EventRows events={f.events} />
        </div>
      </div>
      <h4 className="font-display text-sm text-fg">权重拆解</h4>
      <ul className="divide-y divide-border rounded-md border border-border bg-surface px-3">
        {f.factors.slice(0, 14).map((fac) => (
          <li key={fac.key} className="flex items-start justify-between gap-3 py-2">
            <div className="min-w-0">
              <p className="text-xs text-fg">
                {fac.label}
                <span className="ml-2 text-subtle">
                  {fac.phase === "start" ? "始" : fac.phase === "process" ? "中" : fac.phase === "end" ? "终" : "辅"}
                </span>
              </p>
              <p className="text-[11px] text-muted">{fac.detail}</p>
            </div>
            <span
              className={cn(
                "shrink-0 font-mono text-xs tabular-nums",
                fac.weight > 0 ? "text-auspicious-fg" : fac.weight < 0 ? "text-inauspicious-fg" : "text-muted",
              )}
            >
              {fac.weight > 0 ? "+" : ""}
              {fac.weight}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
