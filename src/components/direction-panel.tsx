import { useState } from "react";
import { ACTIVITY_META, bestDirection, scoreDirections, type DirectionActivity } from "@/lib/qimen/direction";
import type { QimenChart } from "@/lib/qimen/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function tone(level: string): "good" | "bad" | "warn" | "neutral" {
  if (level.includes("宜") || level.includes("吉")) return "good";
  if (level.includes("忌") || level.includes("凶")) return "bad";
  return "warn";
}

export function DirectionPanel({ chart }: { chart: QimenChart }) {
  const [activity, setActivity] = useState<DirectionActivity | "overview">("overview");
  const rows = activity === "overview" ? bestDirection(chart) : scoreDirections(chart, activity);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-display text-lg text-fg">古法方位用事</h2>
        <p className="text-xs text-muted">
          开门宜经商远行，生门宜求财生产，休门宜治病，景门宜考试，杜门宜避藏，伤门宜捕捉，惊门宜词讼，死门宜丧葬行刑。
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Chip active={activity === "overview"} onClick={() => setActivity("overview")}>
          八方总览
        </Chip>
        {ACTIVITY_META.map((a) => (
          <Chip key={a.id} active={activity === a.id} onClick={() => setActivity(a.id)}>
            {a.name}
          </Chip>
        ))}
      </div>

      <ul className="flex flex-col gap-2">
        {rows.map((r) => (
          <li key={r.palaceId} className="rounded-md border border-border bg-surface px-3 py-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-sm text-fg">
                  {r.direction}
                  {r.bagua} · {r.gate ?? "无门"}
                </p>
                <p className="mt-1 text-[11px] text-muted">
                  {r.god ?? "无神"} / {r.star}
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs tabular-nums text-muted">
                  {r.score > 0 ? "+" : ""}
                  {r.score}
                </p>
                <Badge tone={tone(r.level)}>{r.level}</Badge>
              </div>
            </div>
            <p className="mt-2 text-xs leading-5 text-fg">{r.note}</p>
            {r.suit.length ? (
              <p className="mt-1 text-[11px] text-auspicious-fg">宜 {r.suit.slice(0, 4).join("、")}</p>
            ) : null}
            {r.avoid.length ? (
              <p className="text-[11px] text-inauspicious-fg">忌 {r.avoid.slice(0, 3).join("、")}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 rounded-md border px-3 text-xs",
        active ? "border-primary bg-primary text-primary-fg" : "border-border bg-elevated text-muted hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}
