import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { toAuthEmail } from "@/lib/admin-ids";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onEmail = async (e: FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      if (mode === "up") {
        const { error } = await authClient.signUp.email({
          email: toAuthEmail(email),
          password,
          name: name.trim() || email.trim(),
        });
        if (error) throw new Error(error.message);
      } else {
        const { error } = await authClient.signIn.email({
          email: toAuthEmail(email),
          password,
          callbackURL: "/",
        });
        if (error) throw new Error(error.message);
      }
      window.location.href = "/";
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "登录失败");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="grid min-h-dvh place-items-center bg-bg px-[max(1rem,env(safe-area-inset-left,0px))] py-10 pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] text-fg">
      <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-[var(--shadow-panel)]">
        <p className="font-display text-xl">奇门权衡</p>
        <p className="mt-1 text-xs text-muted">可用手机号或邮箱。指定管理员手机号登录后进入后台，下载论文与数据。</p>

        {authEnabled ? (
          <div className="mt-5 flex flex-col gap-2">
            {GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="secondary"
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              >
                使用 {p.label} 继续
              </Button>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted">登录未开启。</p>
        )}

        <div className="my-5 flex items-center gap-3 text-[11px] text-subtle">
          <span className="h-px flex-1 bg-border" />
          邮箱密码
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="mb-3 flex rounded-md border border-border bg-elevated p-0.5">
          {(
            [
              ["in", "登录"],
              ["up", "注册"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              className={`h-10 flex-1 rounded-sm text-sm ${mode === id ? "bg-primary text-primary-fg" : "text-muted"}`}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={onEmail} className="flex flex-col gap-3">
          {mode === "up" ? (
            <label className="flex flex-col gap-1 text-xs text-muted">
              称呼
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
              />
            </label>
          ) : null}
          <label className="flex flex-col gap-1 text-xs text-muted">
            手机号或邮箱
            <input
              type="text"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="18858839671 或邮箱"
              className="h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none placeholder:text-subtle focus:border-ring"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-muted">
            密码（至少 8 位）
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
            />
          </label>
          {err ? <p className="text-xs text-inauspicious-fg">{err}</p> : null}
          <Button type="submit" disabled={busy} className="w-full">
            {busy ? "请稍候" : mode === "up" ? "注册并进入" : "登录"}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-subtle">
          <Link to="/" className="hover:text-fg">
            返回起盘
          </Link>
        </p>
      </div>
    </main>
  );
}
