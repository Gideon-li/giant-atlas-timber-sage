import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { t as Button } from "./button-Yi4zxPuq.mjs";
import { t as GROK_PROVIDERS } from "./server-CqRAn7m7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CY4_nJVT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const [mode, setMode] = (0, import_react.useState)("in");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const onEmail = async (e) => {
		e.preventDefault();
		setErr(null);
		setBusy(true);
		try {
			if (mode === "up") {
				const { error } = await authClient.signUp.email({
					email: email.trim(),
					password,
					name: name.trim() || email.trim()
				});
				if (error) throw new Error(error.message);
			} else {
				const { error } = await authClient.signIn.email({
					email: email.trim(),
					password,
					callbackURL: "/"
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-bg px-4 py-10 text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-[var(--shadow-panel)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl",
					children: "奇门权衡"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: "登录后可提交预测反馈。第一个注册的账号自动成为管理员。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 flex flex-col gap-2",
					children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "secondary",
						className: "w-full",
						onClick: () => signIn(p.providerId, { callbackURL: "/" }),
						children: [
							"使用 ",
							p.label,
							" 继续"
						]
					}, p.providerId))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-5 flex items-center gap-3 text-[11px] text-subtle",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
						"邮箱密码",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 flex rounded-md border border-border bg-elevated p-0.5",
					children: [["in", "登录"], ["up", "注册"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMode(id),
						className: `h-10 flex-1 rounded-sm text-sm ${mode === id ? "bg-primary text-primary-fg" : "text-muted"}`,
						children: label
					}, id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: onEmail,
					className: "flex flex-col gap-3",
					children: [
						mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1 text-xs text-muted",
							children: ["称呼", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: name,
								onChange: (e) => setName(e.target.value),
								className: "h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1 text-xs text-muted",
							children: ["邮箱", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1 text-xs text-muted",
							children: ["密码（至少 8 位）", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								required: true,
								minLength: 8,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
							})]
						}),
						err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-inauspicious-fg",
							children: err
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy,
							className: "w-full",
							children: busy ? "请稍候" : mode === "up" ? "注册并进入" : "登录"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-center text-xs text-subtle",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-fg",
						children: "返回起盘"
					})
				})
			]
		})
	});
}
//#endregion
export { Login as component };
