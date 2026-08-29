import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { PAPER_MD, PAPER_TITLE } from "@/lib/thesis/paper";
import { downloadThesisDocx } from "@/lib/thesis/docx";
import { WEATHER_META, REGIONS_PACK } from "@/lib/qimen/weather-model";
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
    a.download = "weather-regions-2025-2026.json";
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
          {WEATHER_META.place} · {WEATHER_META.start} – {WEATHER_META.end} · {WEATHER_META.n} 日 ·{" "}
          {WEATHER_META.citation}
        </p>
        <div className="thesis-body mt-8 text-sm leading-7 text-fg">{renderMd(PAPER_MD)}</div>
      </article>
    </main>
  );
}

function renderMd(src: string) {
  const lines = src.split("\n");
  const nodes: ReactNode[] = [];
  let buf: string[] = [];
  let list: string[] = [];
  let key = 0;
  const flushP = () => {
    if (!buf.length) return;
    const t = buf.join(" ").trim();
    buf = [];
    if (t) nodes.push(<p key={key++}>{t}</p>);
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
  for (const line of lines) {
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
  flushL();
  flushP();
  return nodes;
}
