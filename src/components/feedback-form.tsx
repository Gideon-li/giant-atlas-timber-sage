import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { SignedIn, SignedOut } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { submitFeedback } from "@/lib/server/app";
import { useAppStore } from "@/lib/store";
import type { EventScore, QimenChart } from "@/lib/qimen/types";
import { Button } from "@/components/ui/button";

const ACCURACY = ["很准", "大体准", "一半", "不准", "完全相反"] as const;
const LUCK = ["吉", "平", "凶"] as const;
const HAPPENED = ["已应验", "部分发生", "尚未发生", "未发生"] as const;

export function FeedbackForm({ score, chart }: { score: EventScore; chart: QimenChart }) {
  const { user, isPending } = useCurrentUserState();
  const province = useAppStore((s) => s.province);
  const city = useAppStore((s) => s.city);
  const district = useAppStore((s) => s.district);
  const casting = useAppStore((s) => s.casting);
  const [accuracy, setAccuracy] = useState<(typeof ACCURACY)[number]>("大体准");
  const [realizedLuck, setRealizedLuck] = useState<(typeof LUCK)[number]>("平");
  const [happened, setHappened] = useState<(typeof HAPPENED)[number]>("尚未发生");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async () => {
    if (!user) return;
    setBusy(true);
    setStatus(null);
    try {
      await submitFeedback({
        data: {
          civilTime: chart.timeLabel,
          juLabel: chart.ju.label,
          eventId: score.eventId,
          eventName: score.name,
          predictedScore: score.score,
          predictedLevel: score.level,
          predictedProb: score.probability,
          accuracy,
          realizedLuck,
          happened,
          note,
          province,
          city,
          district,
          casting,
          chartSnapshot: JSON.stringify({
            ju: chart.ju,
            pillars: chart.pillars,
            zhiFu: chart.meta.zhiFuPalace,
          }),
        },
      });
      setStatus("已记入后台，管理员可下载用于调权。");
      setNote("");
    } catch {
      setStatus("提交失败，请重新登录后再试。");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mt-4 rounded-lg border border-border bg-surface p-4">
      <h4 className="font-display text-sm text-fg">预测反馈</h4>
      <p className="mt-1 text-xs text-muted">事后对照吉凶与应验，供模型调权。不替代亲测。</p>

      {isPending ? <div className="mt-3 h-10 animate-pulse rounded-md bg-elevated" /> : null}

      <SignedOut>
        <p className="mt-3 text-sm text-muted">
          请先{" "}
          <Link to="/login" className="text-fg underline">
            登录
          </Link>{" "}
          再提交问卷。
        </p>
      </SignedOut>

      <SignedIn>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Field label="准度" value={accuracy} onChange={setAccuracy} options={ACCURACY} />
          <Field label="实际吉凶" value={realizedLuck} onChange={setRealizedLuck} options={LUCK} />
          <Field label="应验" value={happened} onChange={setHappened} options={HAPPENED} />
        </div>
        <label className="mt-3 flex flex-col gap-1 text-xs text-muted">
          补充（可空）
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 500))}
            rows={3}
            className="rounded-md border border-border bg-elevated px-3 py-2 text-sm text-fg outline-none focus:border-ring"
            placeholder="例如：开张三日后客流明显，或行程因雨改期。"
          />
        </label>
        <div className="mt-3 flex items-center gap-3">
          <Button type="button" onClick={onSubmit} disabled={busy}>
            {busy ? "提交中" : "提交反馈"}
          </Button>
          {status ? <p className="text-xs text-muted">{status}</p> : null}
        </div>
      </SignedIn>
    </section>
  );
}

function Field<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: readonly T[];
}) {
  return (
    <label className="flex flex-col gap-1 text-xs text-muted">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
