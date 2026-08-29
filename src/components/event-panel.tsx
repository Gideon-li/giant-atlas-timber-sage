import { KIND_LABEL } from "@/lib/qimen/score";
import type { EventScore, PalaceId, PeopleLink, QimenChart } from "@/lib/qimen/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { FeedbackForm } from "@/components/feedback-form";

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

export function EventList({
  events,
  activeId,
  onPick,
}: {
  events: EventScore[];
  activeId: string;
  onPick: (id: EventScore["eventId"]) => void;
}) {
  return (
    <ul className="flex flex-col gap-1.5">
      {events.map((ev) => (
        <li key={ev.eventId}>
          <button
            type="button"
            onClick={() => onPick(ev.eventId)}
            className={cn(
              "flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-colors",
              activeId === ev.eventId
                ? "border-primary bg-elevated"
                : "border-border bg-surface hover:border-border-strong",
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
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

export function EventDetail({
  score,
  chart,
  personName,
}: {
  score: EventScore;
  chart: QimenChart;
  personName?: string;
}) {
  const palace = chart.palaces[score.palaceId];
  const who = personName?.trim() ? `${personName} · ` : "";
  return (
    <article className="rounded-lg border border-border bg-surface p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg text-fg">
            {who}
            {score.name}
          </h3>
          <p className="mt-1 text-xs text-muted">{score.brief}</p>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl tabular-nums text-fg">
            {score.score > 0 ? "+" : ""}
            {score.score}
          </p>
          <p className="text-xs text-muted">顺利倾向 {score.probability}%</p>
          <Badge tone={toneOf(score.level)} className="mt-1">
            {score.level}
          </Badge>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted">
        用神 {palace.bagua}
        {palace.id}宫 · {palace.god ?? "无神"} / {palace.star} / {palace.gate ?? "无门"}
      </p>

      <div className="fit-phases mt-4">
        {(
          [
            ["开始 · 神", score.phases.start],
            ["过程 · 星", score.phases.process],
            ["收局 · 门", score.phases.end],
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

      {score.patterns.length ? (
        <div className="mt-3 flex flex-wrap gap-1">
          {score.patterns.map((p) => (
            <Badge key={p} tone="warn">
              {p}
            </Badge>
          ))}
        </div>
      ) : null}

      <p className="mt-4 text-sm leading-7 text-fg">{score.reading}</p>

      {score.associations?.length ? (
        <div className="mt-4 rounded-md border border-border bg-elevated p-3">
          <p className="font-display text-sm text-fg">联想预测</p>
          <p className="mt-1 text-xs text-subtle">据《奇门遁甲秘笈大全》门星神时象，合理推想可能发生的具体情形，不是实录。</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted">
            {score.associations.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          {score.omen ? <p className="mt-2 text-xs text-subtle">时应：{score.omen}</p> : null}
          {score.classicCite ? <p className="mt-1 text-xs leading-5 text-subtle">{score.classicCite}</p> : null}
        </div>
      ) : null}

      <h4 className="mt-5 font-display text-sm text-fg">权重拆解</h4>
      <ul className="mt-2 divide-y divide-border">
        {score.factors.map((f) => (
          <li key={f.key} className="flex items-start justify-between gap-3 py-2">
            <div className="min-w-0">
              <p className="text-xs text-fg">
                {f.label}
                <span className="ml-2 text-subtle">
                  {f.phase === "start" ? "始" : f.phase === "process" ? "中" : f.phase === "end" ? "终" : "辅"}
                </span>
              </p>
              <p className="text-[11px] text-muted">{f.detail}</p>
            </div>
            <span
              className={cn(
                "shrink-0 font-mono text-xs tabular-nums",
                f.weight > 0 ? "text-auspicious-fg" : f.weight < 0 ? "text-inauspicious-fg" : "text-muted",
              )}
            >
              {f.weight > 0 ? "+" : ""}
              {f.weight}
            </span>
          </li>
        ))}
      </ul>
      <FeedbackForm score={score} chart={chart} />
    </article>
  );
}

export function PeoplePanel({
  people,
  chart,
  onSelectPalace,
}: {
  people: PeopleLink[];
  chart: QimenChart;
  onSelectPalace: (id: PalaceId) => void;
}) {
  const self = chart.palaces[chart.meta.zhiFuPalace];
  return (
    <div>
      <p className="text-sm text-fg">
        值符在{self.bagua}
        {self.id}宫，以此为「我」。周围宫位按生克定六亲，再以门星神权衡当下关系。
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {people.map((p) => (
          <li key={p.palaceId}>
            <button
              type="button"
              onClick={() => onSelectPalace(p.palaceId)}
              className="w-full rounded-md border border-border bg-surface px-3 py-3 text-left hover:border-border-strong"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-display text-sm text-fg">
                  {p.bagua}宫 · {p.sixKin}
                  <span className="ml-2 text-xs font-sans text-muted">{p.relation}</span>
                </span>
                <Badge tone={toneOf(p.level)}>
                  {p.level} {p.score > 0 ? "+" : ""}
                  {p.score}
                </Badge>
              </div>
              <p className="mt-1 text-[11px] text-muted">{p.role}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {p.kinds.map((k) => (
                  <Badge key={k}>{KIND_LABEL[k]}</Badge>
                ))}
              </div>
              <p className="mt-2 text-xs leading-5 text-muted">{p.summary}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
