import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as authClient } from "./client-B40BzJxt.mjs";
import { E as WEATHER_META } from "./weather-model-J6X1ULVT.mjs";
import { a as adminListFeedback, c as runWeatherTraining, n as SignedIn, o as ensureProfile, s as getWeatherMetrics, t as RedirectToSignIn, u as useCurrentUserState } from "./app-DMG5my4a.mjs";
import { t as Button } from "./button-Yi4zxPuq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DBC2lAkl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPage() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-dvh bg-bg p-6 text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto h-10 w-48 animate-pulse rounded-md bg-elevated" })
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInner, {}) });
}
function AdminInner() {
	const { user } = useCurrentUserState();
	const [role, setRole] = (0, import_react.useState)(null);
	const [rows, setRows] = (0, import_react.useState)([]);
	const [err, setErr] = (0, import_react.useState)(null);
	const [metrics, setMetrics] = (0, import_react.useState)(null);
	const [pw, setPw] = (0, import_react.useState)({
		current: "",
		next: "",
		confirm: ""
	});
	const [pwMsg, setPwMsg] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		ensureProfile().then((p) => {
			setRole(p.role);
			if (p.role === "admin") return Promise.all([adminListFeedback(), getWeatherMetrics()]).then(([list, m]) => {
				setRows(list);
				setMetrics(m);
			});
		}).catch(() => setErr("无法读取权限。"));
	}, []);
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
			"note"
		];
		const lines = [header.join(",")].concat(rows.map((r) => header.map((k) => {
			return `"${String(r[k] ?? "").replaceAll("\"", "\"\"")}"`;
		}).join(",")));
		const blob = new Blob(["﻿" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
		const a = document.createElement("a");
		a.href = URL.createObjectURL(blob);
		a.download = `qimen-feedback-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
		a.click();
	};
	const downloadWeights = () => {
		if (!metrics) return;
		const blob = new Blob([metrics.weights], { type: "application/json" });
		const a = document.createElement("a");
		a.href = URL.createObjectURL(blob);
		a.download = "qimen-weather-weights.json";
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
	const onPassword = async (e) => {
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
			revokeOtherSessions: true
		});
		setPwMsg(error ? error.message ?? "密码修改失败" : "密码已更新");
		if (!error) setPw({
			current: "",
			next: "",
			confirm: ""
		});
	};
	if (role && role !== "admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-bg p-6 text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: "当前账号不是管理员。第一个注册的账号才是管理员。"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-3 inline-block text-xs underline",
			children: "返回"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-5xl items-center justify-between px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg",
					children: "管理后台"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: user?.primaryEmail
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-xs text-muted hover:text-fg",
					children: "返回起盘"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-5xl flex-col gap-8 px-4 py-6",
			children: [
				err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-inauspicious-fg",
					children: err
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-sm",
						children: "修改密码"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: onPassword,
						className: "mt-3 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								placeholder: "当前密码",
								value: pw.current,
								onChange: (e) => setPw({
									...pw,
									current: e.target.value
								}),
								className: "h-11 rounded-md border border-border bg-elevated px-3 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								placeholder: "新密码",
								value: pw.next,
								onChange: (e) => setPw({
									...pw,
									next: e.target.value
								}),
								className: "h-11 rounded-md border border-border bg-elevated px-3 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								placeholder: "确认新密码",
								value: pw.confirm,
								onChange: (e) => setPw({
									...pw,
									confirm: e.target.value
								}),
								className: "h-11 rounded-md border border-border bg-elevated px-3 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								children: "保存密码"
							}),
							pwMsg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "self-center text-xs text-muted",
								children: pwMsg
							}) : null
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-sm",
							children: "预测反馈"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [rows.length, " 条。用于对照吉凶、调权。"]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							onClick: downloadCsv,
							disabled: !rows.length,
							children: "下载 CSV"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 overflow-x-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[720px] text-left text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "text-subtle",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
									"时间",
									"事项",
									"预测",
									"准度",
									"实况",
									"地点"
								].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "border-b border-border py-2 pr-3 font-medium",
									children: h
								}, h)) })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border/60",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 pr-3",
										children: r.civil_time
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 pr-3",
										children: r.event_name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-2 pr-3",
										children: [
											r.predicted_level,
											" ",
											r.predicted_score
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 pr-3",
										children: r.accuracy
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-2 pr-3",
										children: [
											r.realized_luck,
											" · ",
											r.happened
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-2 pr-3",
										children: [
											r.province,
											r.city,
											r.district
										]
									})
								]
							}, r.id)) })]
						}), !rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-6 text-center text-xs text-subtle",
							children: "暂无反馈"
						}) : null]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-sm",
								children: "天气模型"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									WEATHER_META.place,
									" · ",
									WEATHER_META.n,
									" 日 · ",
									WEATHER_META.source
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "secondary",
									onClick: downloadWeights,
									disabled: !metrics,
									children: "导出权重"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									onClick: onTrain,
									disabled: busy,
									children: busy ? "训练中" : "重新训练"
								})]
							})]
						}),
						metrics ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									k: "日值训练",
									v: pct(metrics.dailyAccTrain)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									k: "日值检验",
									v: pct(metrics.dailyAccTest)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									k: "旬训练",
									v: pct(metrics.xunAccTrain)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									k: "旬检验",
									v: pct(metrics.xunAccTest)
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-subtle",
							children: "读取指标中…"
						}),
						metrics?.notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs leading-5 text-muted",
							children: n
						}, n)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/thesis",
							className: "mt-3 inline-block text-xs underline",
							children: "打开研究论文"
						})
					]
				})
			]
		})]
	});
}
function Metric({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-md border border-border bg-elevated p-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-subtle",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-mono text-sm",
			children: v
		})]
	});
}
function pct(x) {
	return `${(x * 100).toFixed(1)}%`;
}
//#endregion
export { AdminPage as component };
