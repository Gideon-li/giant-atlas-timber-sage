import { BOARD_ORDER, JI_MEN, PALACE_META, XIONG_MEN } from "@/lib/qimen/constants";
import type { Palace, PalaceId, QimenChart } from "@/lib/qimen/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

function gateTone(gate: string | null): "good" | "bad" | "neutral" {
  if (!gate) return "neutral";
  if (JI_MEN.has(gate)) return "good";
  if (XIONG_MEN.has(gate)) return "bad";
  return "neutral";
}

function Cell({
  palace,
  active,
  onSelect,
  mark,
}: {
  palace: Palace;
  active: boolean;
  onSelect: (id: PalaceId) => void;
  mark?: string;
}) {
  const isCenter = palace.id === 5;
  return (
    <button
      type="button"
      onClick={() => onSelect(palace.id)}
      className={cn(
        "luoshu-grid luoshu-cell relative flex flex-col items-stretch rounded-md border p-2 text-left transition-[border-color,background-color] sm:p-2.5",
        active ? "border-primary bg-elevated" : "border-border bg-surface hover:border-border-strong",
        palace.isZhiFu && "ring-1 ring-primary/40",
        isCenter && "bg-elevated",
      )}
    >
      <div className="flex items-center justify-between gap-1">
        <span className="font-display text-sm text-fg">
          {palace.bagua}
          <span className="ml-1 text-xs text-muted">{palace.id}</span>
        </span>
        <span className="text-[10px] text-subtle">{palace.direction}</span>
      </div>
      <div className="mt-1 flex flex-wrap gap-1">
        {palace.god ? <Badge>{palace.god}</Badge> : null}
        {palace.isZhiFu ? <Badge tone="warn">值符</Badge> : null}
        {mark ? <Badge tone="warn">{mark}</Badge> : null}
        {palace.isKong ? <Badge tone="bad">空</Badge> : null}
        {palace.isMa ? <Badge tone="warn">马</Badge> : null}
      </div>
      <div className="mt-auto grid grid-cols-2 gap-x-2 pt-2 text-[11px] leading-5">
        <span className="text-muted">
          星 <span className="text-fg">{palace.star}</span>
        </span>
        <span className="text-muted">
          门{" "}
          <span
            className={cn(
              gateTone(palace.gate) === "good" && "text-auspicious-fg",
              gateTone(palace.gate) === "bad" && "text-inauspicious-fg",
              gateTone(palace.gate) === "neutral" && "text-fg",
            )}
          >
            {palace.gate ?? "—"}
          </span>
        </span>
        <span className="text-muted">
          天 <span className="font-display text-fg">{palace.heavenStem}</span>
        </span>
        <span className="text-muted">
          地 <span className="font-display text-fg">{palace.earthStem}</span>
        </span>
      </div>
      {palace.changsheng ? (
        <span className="absolute right-2 bottom-2 text-[10px] text-subtle">{palace.changsheng}</span>
      ) : null}
    </button>
  );
}

export function QimenBoard({
  chart,
  selected,
  onSelect,
  caption,
  marks,
}: {
  chart: QimenChart;
  selected: PalaceId | null;
  onSelect: (id: PalaceId) => void;
  caption?: string;
  marks?: Partial<Record<PalaceId, string>>;
}) {
  return (
    <div>
      <div className="mb-3 flex min-w-0 flex-wrap items-end justify-between gap-2">
        <div className="min-w-0">
          <h2 className="font-display text-lg text-fg">洛书九宫</h2>
          <p className="text-xs leading-5 text-muted">
            {caption ? `${caption} · ` : ""}
            {chart.ju.label} · 旬首{chart.meta.xunShou}（{chart.meta.xunYi}）· 空亡
            {chart.meta.xunKong.join("")} · 值使{chart.meta.zhiShiGate}
            {chart.meta.fuYin ? " · 伏吟" : ""}
            {chart.meta.fanYin ? " · 反吟" : ""}
          </p>
        </div>
        <p className="shrink-0 text-[11px] text-subtle">南上北下 · 点宫查看</p>
      </div>
      <div className="luoshu grid grid-cols-3 gap-1.5 sm:gap-2">
        {BOARD_ORDER.map((id) => (
          <Cell
            key={id}
            palace={chart.palaces[id]}
            active={selected === id}
            onSelect={onSelect}
            mark={marks?.[id]}
          />
        ))}
      </div>
      {selected ? (
        <PalaceDetail palace={chart.palaces[selected]} />
      ) : null}
    </div>
  );
}

function PalaceDetail({ palace }: { palace: Palace }) {
  const meta = PALACE_META[palace.id];
  const flags = [
    palace.fuYin && "伏吟",
    palace.fanYin && "反吟",
    palace.menPo && "门迫",
    palace.gongPo && "宫迫",
    palace.ruMu && "入墓",
    palace.isKong && "空亡",
    palace.isMa && "驿马",
    palace.isZhiFu && "值符",
    palace.isZhiShi && "值使",
  ].filter(Boolean) as string[];
  return (
    <div className="mt-3 rounded-lg border border-border bg-elevated p-3 text-sm">
      <p className="font-display text-fg">
        {palace.bagua}
        {palace.id}宫 · {palace.direction} · {palace.element}
      </p>
      <p className="mt-1 text-xs text-muted">{meta.people}</p>
      <p className="mt-2 text-xs leading-6 text-muted">
        神 {palace.god ?? "—"}　星 {palace.star}　门 {palace.gate ?? "—"}　天
        {palace.heavenStem} 地{palace.earthStem}
        {palace.changsheng ? `　长生 ${palace.changsheng}` : ""}
      </p>
      {flags.length ? (
        <div className="mt-2 flex flex-wrap gap-1">
          {flags.map((f) => (
            <Badge key={f} tone={["空亡", "门迫", "入墓", "反吟", "伏吟"].includes(f) ? "bad" : "warn"}>
              {f}
            </Badge>
          ))}
        </div>
      ) : null}
    </div>
  );
}
