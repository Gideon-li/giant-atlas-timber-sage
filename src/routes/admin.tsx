import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RedirectToSignIn, SignedIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { authClient } from "@/lib/auth/client";
import {
  adminDeleteAccount,
  adminListAccounts,
  adminListFeedback,
  adminPurgeOtherAccounts,
  ensureProfile,
  getWeatherMetrics,
  runWeatherTraining,
  type AccountRow,
  type FeedbackRow,
} from "@/lib/server/app";
import { ADMIN_PHONES } from "@/lib/admin-ids";
import { downloadThesisDocx } from "@/lib/thesis/docx";
import { EVENT_MODEL_SPEC } from "@/lib/thesis/event-spec";
import { Button } from "@/components/ui/button";
import { TRAINED_WEIGHTS, REGIONS_PACK } from "@/lib/qimen/weather-model";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return (
      <main className="min-h-dvh bg-bg p-6 text-fg">
        <div className="mx-auto h-10 w-48 animate-pulse rounded-md bg-elevated" />
      </main>
    );
  }
  if (!user) return <RedirectToSignIn />;
  return (
    <SignedIn>
      <AdminInner />
    </SignedIn>
  );
}

function AdminInner() {
  const { user } = useCurrentUserState();
  const [role, setRole] = useState<string | null>(null);
  const [rows, setRows] = useState<FeedbackRow[]>([]);
  const [accounts, setAccounts] = useState<AccountRow[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<Awaited<ReturnType<typeof getWeatherMetrics>> | null>(null);
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    ensureProfile()
      .then((p) => {
        setRole(p.role);
        if (p.role === "admin") {
          return Promise.all([adminListFeedback(), getWeatherMetrics(), adminListAccounts()]).then(
            ([list, m, acc]) => {
              setRows(list);
              setMetrics(m);
              setAccounts(acc);
            },
          );
        }
        return undefined;
      })
      .catch(() => setErr("无法读取权限。"));
  }, []);

  const downloadPaper = () => downloadThesisDocx();
  const downloadData = () => {
    const blob = new Blob([JSON.stringify(REGIONS_PACK, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "weather-regions-2020-2026.json";
    a.click();
  };

  const refreshAccounts = () =>
    adminListAccounts()
      .then(setAccounts)
      .catch(() => setErr("无法读取账号"));

  const onDeleteAccount = async (id: string) => {
    if (!window.confirm("确定删除该账号？")) return;
    try {
      await adminDeleteAccount({ data: id });
      await refreshAccounts();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "删除失败");
    }
  };

  const onPurge = async () => {
    if (!window.confirm(`删除除管理员 ${ADMIN_PHONES[0]} 以外的全部账号？`)) return;
    try {
      const r = await adminPurgeOtherAccounts();
      await refreshAccounts();
      setErr(null);
      setPwMsg(`已删除 ${r.removed} 个误注册账号`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "清理失败");
    }
  };

  const downloadCsv = () => {
    const header = [
      "id",
      "user_id",
      "created_at",
      "civil_time",
      "ju_label",
      "event_name",
      "predicted_score",
      "predicted_level",
      "accuracy",
      "realized_luck",
      "happened",
      "province",
      "city",
      "district",
      "note",
    ];
    const lines = [header.join(",")].concat(
      rows.map((r) =>
        header
          .map((k) => {
            const v = String((r as Record<string, unknown>)[k] ?? "").replaceAll('"', '""');
            return `"${v}"`;
          })
          .join(","),
      ),
    );
    const blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `qimen-feedback-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const downloadWeights = () => {
    if (!metrics) return;
    const blob = new Blob([metrics.weights], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "weather-weights-2020-2026.json";
    a.click();
  };

  const downloadEventModel = () => {
    const blob = new Blob([JSON.stringify(EVENT_MODEL_SPEC, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "qimen-event-daily-model.json";
    a.click();
  };

  const onTrain = async () => {
    setBusy(true);
    setErr(null);
    try {
      const m = await runWeatherTraining();
      setMetrics(m);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "训练失败");
    } finally {
      setBusy(false);
    }
  };

  const onPassword = async (e: FormEvent) => {
    e.preventDefault();
    setPwMsg(null);
    if (pw.next.length < 8) {
      setPwMsg("新密码至少 8 位");
      return;
    }
    if (pw.next !== pw.confirm) {
      setPwMsg("两次新密码不一致");
      return;
    }
    const { error } = await authClient.changePassword({
      currentPassword: pw.current,
      newPassword: pw.next,
      revokeOtherSessions: true,
    });
    setPwMsg(error ? error.message ?? "密码修改失败" : "密码已更新");
    if (!error) setPw({ current: "", next: "", confirm: "" });
  };

  if (role && role !== "admin") {
    return (
      <main className="min-h-dvh bg-bg p-6 text-fg">
        <p className="text-sm">当前账号不是管理员。请用手机号 {ADMIN_PHONES[0]} 登录。</p>
        <Link to="/" className="mt-3 inline-block text-xs underline">
          返回
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div>
            <p className="font-display text-lg">管理后台</p>
            <p className="text-xs text-muted">{user?.primaryEmail}</p>
          </div>
          <Link to="/" className="text-xs text-muted hover:text-fg">
            返回起盘
          </Link>
        </div>
      </header>

      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-6">
        {err ? <p className="text-sm text-inauspicious-fg">{err}</p> : null}

        <section className="rounded-xl border border-border bg-surface p-4">
          <h2 className="font-display text-base">论文与训练数据</h2>
          <p className="mt-1 text-xs text-muted">
            仅管理员可下载。论文 Word 含十二类事项完整公式与偏置、十二区天气权重、校准过程。数据为 2020–2026 共{" "}
            {TRAINED_WEIGHTS.nTotalSamples} 条。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" onClick={downloadPaper}>
              下载论文 Word
            </Button>
            <Button type="button" variant="secondary" onClick={downloadData}>
              下载训练数据
            </Button>
            <Button type="button" variant="secondary" onClick={downloadWeights} disabled={!metrics}>
              导出天气权重
            </Button>
            <Button type="button" variant="secondary" onClick={downloadEventModel}>
              导出事项模型
            </Button>
            <Link
              to="/thesis"
              className="inline-flex h-11 items-center rounded-md border border-border bg-elevated px-4 text-sm"
            >
              在线阅读论文
            </Link>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-surface p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-sm">账号</h2>
              <p className="text-xs text-muted">
                指定管理员 {ADMIN_PHONES[0]}。可删除此前误注册的账号。
              </p>
            </div>
            <Button type="button" variant="secondary" onClick={onPurge}>
              删除其他账号
            </Button>
          </div>
          <ul className="mt-3 divide-y divide-border">
            {accounts.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
                <div>
                  <p className="text-fg">
                    {a.name || "未命名"}
                    {a.role === "admin" ? (
                      <span className="ml-2 text-[11px] text-auspicious-fg">管理员</span>
                    ) : null}
                  </p>
                  <p className="text-xs text-muted">{a.email}</p>
                </div>
                {a.id !== user?.id && a.role !== "admin" ? (
                  <Button type="button" variant="ghost" size="sm" onClick={() => onDeleteAccount(a.id)}>
                    删除
                  </Button>
                ) : null}
              </li>
            ))}
            {!accounts.length ? <li className="py-4 text-center text-xs text-subtle">暂无账号</li> : null}
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-surface p-4">
          <h2 className="font-display text-sm">修改密码</h2>
          <form onSubmit={onPassword} className="mt-3 grid gap-3 sm:grid-cols-3">
            <input
              type="password"
              placeholder="当前密码"
              value={pw.current}
              onChange={(e) => setPw({ ...pw, current: e.target.value })}
              className="h-11 rounded-md border border-border bg-elevated px-3 text-sm"
            />
            <input
              type="password"
              placeholder="新密码"
              value={pw.next}
              onChange={(e) => setPw({ ...pw, next: e.target.value })}
              className="h-11 rounded-md border border-border bg-elevated px-3 text-sm"
            />
            <input
              type="password"
              placeholder="确认新密码"
              value={pw.confirm}
              onChange={(e) => setPw({ ...pw, confirm: e.target.value })}
              className="h-11 rounded-md border border-border bg-elevated px-3 text-sm"
            />
            <Button type="submit">保存密码</Button>
            {pwMsg ? <p className="self-center text-xs text-muted">{pwMsg}</p> : null}
          </form>
        </section>

        <section className="rounded-xl border border-border bg-surface p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-sm">预测反馈</h2>
              <p className="text-xs text-muted">{rows.length} 条。用于对照吉凶、调权。</p>
            </div>
            <Button type="button" variant="secondary" onClick={downloadCsv} disabled={!rows.length}>
              下载 CSV
            </Button>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-xs">
              <thead className="text-subtle">
                <tr>
                  {["时间", "事项", "预测", "准度", "实况", "地点"].map((h) => (
                    <th key={h} className="border-b border-border py-2 pr-3 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-border/60">
                    <td className="py-2 pr-3">{r.civil_time}</td>
                    <td className="py-2 pr-3">{r.event_name}</td>
                    <td className="py-2 pr-3">
                      {r.predicted_level} {r.predicted_score}
                    </td>
                    <td className="py-2 pr-3">{r.accuracy}</td>
                    <td className="py-2 pr-3">
                      {r.realized_luck} · {r.happened}
                    </td>
                    <td className="py-2 pr-3">
                      {r.province}
                      {r.city}
                      {r.district}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!rows.length ? <p className="py-6 text-center text-xs text-subtle">暂无反馈</p> : null}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-surface p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-sm">天气模型</h2>
              <p className="text-xs text-muted">
                十二气候区 · {TRAINED_WEIGHTS.start}–{TRAINED_WEIGHTS.end} · 总样本 {TRAINED_WEIGHTS.nTotalSamples} ·{" "}
                {String(TRAINED_WEIGHTS.ml.primary)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="secondary" onClick={downloadWeights} disabled={!metrics}>
                导出权重
              </Button>
              <Button type="button" onClick={onTrain} disabled={busy}>
                {busy ? "训练中" : "重新训练"}
              </Button>
            </div>
          </div>
          {metrics ? (
            <ul className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
              <Metric k="日值训练" v={pct(metrics.dailyAccTrain)} />
              <Metric k="日值检验" v={pct(metrics.dailyAccTest)} />
              <Metric k="旬训练" v={pct(metrics.xunAccTrain)} />
              <Metric k="旬检验" v={pct(metrics.xunAccTest)} />
            </ul>
          ) : (
            <p className="mt-3 text-xs text-subtle">读取指标中…</p>
          )}
          {metrics?.regions?.length ? (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-[11px]">
                <thead className="text-subtle">
                  <tr>
                    {["区", "样本", "有雨检验", "旬检验", "旬≥90%"].map((h) => (
                      <th key={h} className="border-b border-border py-1.5 pr-3 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {metrics.regions.map((r) => (
                    <tr key={r.id} className="border-b border-border/60">
                      <td className="py-1.5 pr-3">{r.name}</td>
                      <td className="py-1.5 pr-3 tabular-nums">{r.n}</td>
                      <td className="py-1.5 pr-3 tabular-nums">{pct(r.rainAccTest)}</td>
                      <td className="py-1.5 pr-3 tabular-nums">{pct(r.xunAccTest)}</td>
                      <td className="py-1.5 pr-3">{r.reachedXun90 ? "是" : "否"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
          {metrics?.notes.map((n) => (
            <p key={n} className="mt-2 text-xs leading-5 text-muted">
              {n}
            </p>
          ))}
          <Link to="/thesis" className="mt-3 inline-block text-xs underline">
            打开研究论文
          </Link>
        </section>
      </div>
    </main>
  );
}

function Metric({ k, v }: { k: string; v: string }) {
  return (
    <li className="rounded-md border border-border bg-elevated p-2.5">
      <p className="text-subtle">{k}</p>
      <p className="mt-1 font-mono text-sm">{v}</p>
    </li>
  );
}

function pct(x: number) {
  return `${(x * 100).toFixed(1)}%`;
}
