import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { PAPER_MD, PAPER_TITLE } from "@/lib/thesis/paper";
import { downloadThesisDocx } from "@/lib/thesis/docx";
import { REGIONS_PACK, TRAINED_WEIGHTS } from "@/lib/qimen/weather-model";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMyProfile } from "@/lib/server/app";

export const Route = createFileRoute("/thesis")({ component: ThesisPage });

function ThesisPage() {
  const { user, isPending } = useCurrentUserState();
  const [role, setRole] = useState<string | null>(null);
  const [roleErr, setRoleErr] = useState(false);

  useEffect(() => {
    if (!user) return;
    getMyProfile()
      .then((p) => setRole(p.role))
      .catch(() => setRoleErr(true));
  }, [user]);

  const downloadPaper = () => downloadThesisDocx();
  const downloadData = () => {
    const blob = new Blob([JSON.stringify(REGIONS_PACK, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "weather-regions-2020-2026.json";
    a.click();
  };
  const downloadWeights = () => {
    const blob = new Blob([JSON.stringify(TRAINED_WEIGHTS, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "weather-weights-2020-2026.json";
    a.click();
  };

  if (isPending || (user && role === null && !roleErr)) {
    return (
      <main className="min-h-dvh bg-bg p-6 text-fg">
        <div className="mx-auto h-10 w-48 animate-pulse rounded-md bg-elevated" />
      </main>
    );
  }
  if (!user) return <RedirectToSignIn />;
  if (role !== "admin") {
    return (
      <main className="grid min-h-dvh place-items-center bg-bg px-4 text-fg">
        <div className="max-w-sm text-center">
          <p className="font-display text-lg">论文与数据仅管理员可下载</p>
          <p className="mt-2 text-sm text-muted">请用管理员手机号登录后，在管理后台下载。</p>
          <Link to="/" className="mt-4 inline-block text-xs underline">
            返回起盘
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div className="flex gap-3 text-xs">
            <Link to="/" className="text-muted hover:text-fg">
              返回起盘
            </Link>
            <Link to="/admin" className="text-muted hover:text-fg">
              管理后台
            </Link>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={downloadData}>
              下载训练数据
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={downloadWeights}>
              下载十二区权重
            </Button>
            <Button type="button" size="sm" onClick={downloadPaper}>
              下载 Word
            </Button>
          </div>
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-xs text-subtle">博士学位论文体例 · 仅管理员可见</p>
        <h1 className="mt-2 font-display text-2xl leading-snug text-fg">{PAPER_TITLE}</h1>
        <p className="mt-3 text-xs text-muted">
          {TRAINED_WEIGHTS.nRegions} 气候区 · {TRAINED_WEIGHTS.start} – {TRAINED_WEIGHTS.end} · 总样本{" "}
          {TRAINED_WEIGHTS.nTotalSamples} · 训练至 {TRAINED_WEIGHTS.trainUntil} · Bernoulli 逻辑回归 + softmax
        </p>
        <div className="thesis-body mt-8 text-sm leading-7 text-fg">{renderMd(PAPER_MD)}</div>
      </article>
    </main>
  );
}

function splitRow(line: string) {
  const t = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return t.split("|").map((c) => c.trim());
}

function isSepRow(cells: string[]) {
  return cells.every((c) => /^[-:]+$/.test(c));
}

function prettyFormula(s: string) {
  return s
    .replaceAll("\\mathrm{", "")
    .replaceAll("\\mid", "|")
    .replaceAll("\\sigma", "σ")
    .replaceAll("\\bar", "")
    .replaceAll("\\mathrm", "")
    .replaceAll("\\quad", "  ")
    .replaceAll("\\,", " ")
    .replaceAll("\\top", "T")
    .replaceAll("\\frac", "")
    .replaceAll("{", "")
    .replaceAll("}", "")
    .replaceAll("\\", "")
    .trim();
}

function renderMd(src: string) {
  const lines = src.split("\n");
  const nodes: ReactNode[] = [];
  let buf: string[] = [];
  let list: string[] = [];
  let table: string[][] = [];
  let key = 0;
  const flushP = () => {
    if (!buf.length) return;
    const t = buf.join(" ").trim();
    buf = [];
    if (!t) return;
    const math = t.match(/^\\\[([\s\S]+)\\\]$/);
    if (math) {
      nodes.push(
        <p key={key++} className="formula my-4 text-center italic text-fg">
          {prettyFormula(math[1])}
        </p>,
      );
      return;
    }
    if (t.includes("\\[")) {
      const split = t.split(/\\\[|\\\]/);
      nodes.push(
        <div key={key++}>
          {split.map((piece, i) => {
            const s = piece.trim();
            if (!s) return null;
            if (i % 2 === 1)
              return (
                <p key={i} className="formula my-4 text-center italic">
                  {prettyFormula(s)}
                </p>
              );
            return <p key={i}>{s}</p>;
          })}
        </div>,
      );
      return;
    }
    nodes.push(<p key={key++}>{t}</p>);
  };
  const flushL = () => {
    if (!list.length) return;
    nodes.push(
      <ul key={key++} className="my-3 list-disc space-y-1 pl-5 text-muted">
        {list.map((li, i) => (
          <li key={i}>{li}</li>
        ))}
      </ul>,
    );
    list = [];
  };
  const flushT = () => {
    if (!table.length) return;
    const rows = table.filter((r) => !isSepRow(r));
    table = [];
    if (!rows.length) return;
    const head = rows[0]!;
    const body = rows.slice(1);
    nodes.push(
      <div key={key++} className="my-4 overflow-x-auto">
        <table className="thesis-table w-full min-w-[32rem] border-collapse text-[11px] leading-5">
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={i} className="border border-border bg-elevated px-2 py-1 text-left font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((r, ri) => (
              <tr key={ri}>
                {head.map((_, ci) => (
                  <td key={ci} className="border border-border px-2 py-1 tabular-nums">
                    {r[ci] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>,
    );
  };
  for (const line of lines) {
    if (line.trim().startsWith("|") && line.includes("|", 1)) {
      flushL();
      flushP();
      table.push(splitRow(line));
      continue;
    }
    if (table.length) flushT();
    if (line.startsWith("# ")) {
      flushL();
      flushP();
      continue;
    }
    if (line.startsWith("## ")) {
      flushL();
      flushP();
      nodes.push(
        <h2 key={key++} className="mt-8 font-display text-lg text-fg">
          {line.slice(3)}
        </h2>,
      );
      continue;
    }
    if (line.startsWith("### ")) {
      flushL();
      flushP();
      nodes.push(
        <h3 key={key++} className="mt-5 font-display text-base text-fg">
          {line.slice(4)}
        </h3>,
      );
      continue;
    }
    if (line.startsWith("- ")) {
      flushP();
      list.push(line.slice(2));
      continue;
    }
    if (line.trim() === "" || line.trim() === "---") {
      flushL();
      flushP();
      continue;
    }
    if (line.startsWith("[") || /^\[[0-9]+\]/.test(line)) {
      flushL();
      flushP();
      nodes.push(
        <p key={key++} className="text-xs leading-6 text-muted">
          {line}
        </p>,
      );
      continue;
    }
    buf.push(line);
  }
  if (table.length) flushT();
  flushL();
  flushP();
  return nodes;
}
