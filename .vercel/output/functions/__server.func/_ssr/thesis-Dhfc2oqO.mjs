import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as REGIONS_PACK, k as TRAINED_WEIGHTS } from "./weather-model-DSA3cxeb.mjs";
import { M as getMyProfile, X as useCurrentUserState, u as RedirectToSignIn } from "./score-BWCAH8IQ.mjs";
import { a as downloadThesisDocx, i as district_summary_default, n as PAPER_MD, r as PAPER_TITLE, t as EVENT_MODEL_SPEC } from "./docx-q2aPKf0A.mjs";
import { t as Button } from "./button-Yi4zxPuq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/thesis-Dhfc2oqO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ThesisPage() {
	const { user, isPending } = useCurrentUserState();
	const [role, setRole] = (0, import_react.useState)(null);
	const [roleErr, setRoleErr] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		getMyProfile().then((p) => setRole(p.role)).catch(() => setRoleErr(true));
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
	const downloadDistrictWeights = async () => {
		const blob = await (await fetch("/qimen-district-weights-2020-2026.json")).blob();
		const a = document.createElement("a");
		a.href = URL.createObjectURL(blob);
		a.download = "qimen-district-weights-2020-2026.json";
		a.click();
	};
	const downloadEventModel = () => {
		const blob = new Blob([JSON.stringify(EVENT_MODEL_SPEC, null, 2)], { type: "application/json" });
		const a = document.createElement("a");
		a.href = URL.createObjectURL(blob);
		a.download = "qimen-event-daily-model.json";
		a.click();
	};
	if (isPending || user && role === null && !roleErr) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-dvh bg-bg p-6 text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto h-10 w-48 animate-pulse rounded-md bg-elevated" })
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (role !== "admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-bg px-4 text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-sm text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg",
					children: "论文与数据仅管理员可下载"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "请用管理员手机号登录后，在管理后台下载。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-4 inline-block text-xs underline",
					children: "返回起盘"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-shell flex max-w-3xl flex-wrap items-center justify-between gap-3 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-muted hover:text-fg",
						children: "返回起盘"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin",
						className: "text-muted hover:text-fg",
						children: "管理后台"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							size: "sm",
							onClick: downloadData,
							children: "下载训练数据"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							size: "sm",
							onClick: downloadDistrictWeights,
							children: "下载全国区县权重"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							size: "sm",
							onClick: downloadWeights,
							children: "下载十二区对照"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							size: "sm",
							onClick: downloadEventModel,
							children: "下载事项模型"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							onClick: downloadPaper,
							children: "下载 Word"
						})
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "page-shell max-w-3xl py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-subtle",
					children: "博士学位论文体例 · 仅管理员可见"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-2xl leading-snug text-fg",
					children: PAPER_TITLE
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-muted",
					children: [
						district_summary_default.nDistricts,
						" 区县独立训练 · ",
						district_summary_default.start,
						" – ",
						district_summary_default.end,
						" · 总样本",
						" ",
						district_summary_default.nTotalSamples.toLocaleString(),
						" · 旬检验均 ",
						(district_summary_default.meanXunAcc * 100).toFixed(1),
						"% · 十二类事项加性评分 · Bernoulli 逻辑回归 + softmax"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "thesis-body mt-8 text-sm leading-7 text-fg",
					children: renderMd(PAPER_MD)
				})
			]
		})]
	});
}
function splitRow(line) {
	return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
}
function isSepRow(cells) {
	return cells.every((c) => /^[-:]+$/.test(c));
}
function prettyFormula(s) {
	return s.replaceAll("\\mathrm{", "").replaceAll("\\mid", "|").replaceAll("\\sigma", "σ").replaceAll("\\bar", "").replaceAll("\\mathrm", "").replaceAll("\\quad", "  ").replaceAll("\\,", " ").replaceAll("\\top", "T").replaceAll("\\frac", "").replaceAll("{", "").replaceAll("}", "").replaceAll("\\", "").trim();
}
function renderMd(src) {
	const lines = src.split("\n");
	const nodes = [];
	let buf = [];
	let list = [];
	let table = [];
	let key = 0;
	const flushP = () => {
		if (!buf.length) return;
		const t = buf.join(" ").trim();
		buf = [];
		if (!t) return;
		const math = t.match(/^\\\[([\s\S]+)\\\]$/);
		if (math) {
			nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "formula my-4 text-center italic text-fg",
				children: prettyFormula(math[1])
			}, key++));
			return;
		}
		if (t.includes("\\[")) {
			const split = t.split(/\\\[|\\\]/);
			nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: split.map((piece, i) => {
				const s = piece.trim();
				if (!s) return null;
				if (i % 2 === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "formula my-4 text-center italic",
					children: prettyFormula(s)
				}, i);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: s }, i);
			}) }, key++));
			return;
		}
		nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t }, key++));
	};
	const flushL = () => {
		if (!list.length) return;
		nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "my-3 list-disc space-y-1 pl-5 text-muted",
			children: list.map((li, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: li }, i))
		}, key++));
		list = [];
	};
	const flushT = () => {
		if (!table.length) return;
		const rows = table.filter((r) => !isSepRow(r));
		table = [];
		if (!rows.length) return;
		const head = rows[0];
		const body = rows.slice(1);
		nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "my-4 overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "thesis-table w-full min-w-[32rem] border-collapse text-[11px] leading-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: head.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "border border-border bg-elevated px-2 py-1 text-left font-medium",
					children: h
				}, i)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: body.map((r, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: head.map((_, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "border border-border px-2 py-1 tabular-nums",
					children: r[ci] ?? ""
				}, ci)) }, ri)) })]
			})
		}, key++));
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
			nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 font-display text-lg text-fg",
				children: line.slice(3)
			}, key++));
			continue;
		}
		if (line.startsWith("### ")) {
			flushL();
			flushP();
			nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-5 font-display text-base text-fg",
				children: line.slice(4)
			}, key++));
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
			nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-6 text-muted",
				children: line
			}, key++));
			continue;
		}
		buf.push(line);
	}
	if (table.length) flushT();
	flushL();
	flushP();
	return nodes;
}
//#endregion
export { ThesisPage as component };
