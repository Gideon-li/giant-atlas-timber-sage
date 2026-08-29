import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { i as signOut, t as authClient } from "./client-B40BzJxt.mjs";
import { C as STAR_BASE$1, D as STEM_ELEMENT, E as STEM_CHONG, O as STEM_HE, P as authMiddleware, S as SELF_XING, T as STEM_BASE, _ as OPPOSITE, a as CHANGSHENG_SCORE, c as EVENT_MAP, d as GODS_YANG, f as GODS_YIN, g as JU_BY_TERM, i as BRANCH_SIX_HE, j as XING_GROUPS, l as GATE_BASE$1, n as BRANCH_CHONG, p as GOD_BASE$1, r as BRANCH_HAI, s as EVENTS, u as GATE_ELEMENT, v as PALACE_META, w as STAR_ELEMENT, x as RING, y as QI_YI } from "./weather-model-DSA3cxeb.mjs";
import { i as SolarTime, n as HeavenStem, r as SolarTerm, t as EarthBranch } from "../_libs/tyme4ts.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/score-BWCAH8IQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function hourToZhiIndex(hour) {
	return Math.floor((hour + 1) % 24 / 2);
}
function pillarOf(cycle) {
	return {
		stem: cycle.getHeavenStem().getName(),
		branch: cycle.getEarthBranch().getName(),
		name: cycle.getName(),
		nayin: cycle.getSound().getName()
	};
}
function getFourPillars(civil) {
	const eight = SolarTime.fromYmdHms(civil.year, civil.month, civil.day, civil.hour, civil.minute, 0).getLunarHour().getEightChar();
	return {
		year: pillarOf(eight.getYear()),
		month: pillarOf(eight.getMonth()),
		day: pillarOf(eight.getDay()),
		hour: pillarOf(eight.getHour())
	};
}
function getHourCycle(civil) {
	return SolarTime.fromYmdHms(civil.year, civil.month, civil.day, civil.hour, civil.minute, 0).getLunarHour().getEightChar().getHour();
}
function getJu(civil) {
	const termDay = SolarTime.fromYmdHms(civil.year, civil.month, civil.day, civil.hour, civil.minute, 0).getSolarDay().getTermDay();
	const term = termDay.getSolarTerm();
	const index = term.getIndex();
	const dayIndex = termDay.getDayIndex();
	const yuan = dayIndex <= 4 ? "上元" : dayIndex <= 9 ? "中元" : "下元";
	const yuanIdx = yuan === "上元" ? 0 : yuan === "中元" ? 1 : 2;
	const ju = JU_BY_TERM[index][yuanIdx];
	const dun = index < 12 ? "yang" : "yin";
	const dunLabel = dun === "yang" ? "阳遁" : "阴遁";
	return {
		term: term.getName(),
		termDayIndex: dayIndex,
		yuan,
		dun,
		ju,
		label: `${term}${yuan} ${dunLabel}${ju}局`
	};
}
/** 以月份近似阴阳遁：冬至后至夏至前为阳遁（12–5月），夏至后至冬至前为阴遁（6–11月）。 */
function dunFromSolarMonth(month) {
	return month >= 6 && month <= 11 ? "yin" : "yang";
}
function getJuFromLots(month, ju) {
	const clamped = Math.min(9, Math.max(1, Math.round(ju)));
	const dun = dunFromSolarMonth(month);
	const dunLabel = dun === "yang" ? "阳遁" : "阴遁";
	return {
		term: `${month}月`,
		termDayIndex: 0,
		yuan: "中元",
		dun,
		ju: clamped,
		label: `求签 · ${month}月${dunLabel}${clamped}局`
	};
}
var MONTH_NAMES = [
	"正月",
	"二月",
	"三月",
	"四月",
	"五月",
	"六月",
	"七月",
	"八月",
	"九月",
	"十月",
	"十一月",
	"十二月"
];
function getXun(civil) {
	const hour = getHourCycle(civil);
	const xunShou = hour.getTen().getName();
	const extra = hour.getExtraEarthBranches().map((b) => b.getName());
	return {
		xunShou,
		xunYi: {
			甲子: "戊",
			甲戌: "己",
			甲申: "庚",
			甲午: "辛",
			甲辰: "壬",
			甲寅: "癸"
		}[xunShou] ?? "戊",
		xunKong: extra
	};
}
function changshengOf(stem, branch) {
	if (!stem || !branch) return null;
	try {
		return HeavenStem.fromName(stem).getTerrain(EarthBranch.fromName(branch)).getName();
	} catch {
		return null;
	}
}
function applyTrueSolar(civil, longitude) {
	const offsetMin = Math.round((longitude - 120) * 4);
	const date = new Date(Date.UTC(civil.year, civil.month - 1, civil.day, civil.hour, civil.minute));
	date.setUTCMinutes(date.getUTCMinutes() + offsetMin);
	return {
		year: date.getUTCFullYear(),
		month: date.getUTCMonth() + 1,
		day: date.getUTCDate(),
		hour: date.getUTCHours(),
		minute: date.getUTCMinutes()
	};
}
function beijingNow() {
	const parts = new Intl.DateTimeFormat("en-GB", {
		timeZone: "Asia/Shanghai",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23"
	}).formatToParts(/* @__PURE__ */ new Date());
	const g = (t) => Number(parts.find((p) => p.type === t)?.value ?? 0);
	return {
		year: g("year"),
		month: g("month"),
		day: g("day"),
		hour: g("hour"),
		minute: g("minute")
	};
}
function formatCivil(c) {
	const p = (n) => String(n).padStart(2, "0");
	return `${c.year}-${p(c.month)}-${p(c.day)} ${p(c.hour)}:${p(c.minute)}`;
}
function civilMs(c) {
	return Date.UTC(c.year, c.month - 1, c.day, c.hour, c.minute);
}
function addCivilDays(c, days) {
	const d = new Date(civilMs(c) + days * 864e5);
	return {
		year: d.getUTCFullYear(),
		month: d.getUTCMonth() + 1,
		day: d.getUTCDate(),
		hour: d.getUTCHours(),
		minute: d.getUTCMinutes()
	};
}
function addCivilMinutes(c, minutes) {
	const d = new Date(civilMs(c) + minutes * 6e4);
	return {
		year: d.getUTCFullYear(),
		month: d.getUTCMonth() + 1,
		day: d.getUTCDate(),
		hour: d.getUTCHours(),
		minute: d.getUTCMinutes()
	};
}
/** 二十四节气交节时刻（北京历面）。 */
function solarTermCivil(year, name) {
	const t = SolarTerm.fromName(year, name).getJulianDay().getSolarTime();
	return addCivilMinutes({
		year: t.getYear(),
		month: t.getMonth(),
		day: t.getDay(),
		hour: t.getHour(),
		minute: t.getMinute()
	}, 3);
}
/** 节（非气）起干支月：寅月立春 … 丑月小寒。 */
var MONTH_JIE = [
	{
		branch: "寅",
		term: "立春"
	},
	{
		branch: "卯",
		term: "惊蛰"
	},
	{
		branch: "辰",
		term: "清明"
	},
	{
		branch: "巳",
		term: "立夏"
	},
	{
		branch: "午",
		term: "芒种"
	},
	{
		branch: "未",
		term: "小暑"
	},
	{
		branch: "申",
		term: "立秋"
	},
	{
		branch: "酉",
		term: "白露"
	},
	{
		branch: "戌",
		term: "寒露"
	},
	{
		branch: "亥",
		term: "立冬"
	},
	{
		branch: "子",
		term: "大雪"
	},
	{
		branch: "丑",
		term: "小寒"
	}
];
/** 立春为年界。所选时刻若在立春前，年运属上一年。 */
function yearBoundary(civil) {
	const lichun = solarTermCivil(civil.year, "立春");
	if (civilMs(civil) < civilMs(lichun)) return {
		ganzhiYear: civil.year - 1,
		lichun: solarTermCivil(civil.year - 1, "立春")
	};
	return {
		ganzhiYear: civil.year,
		lichun
	};
}
/** 某干支年内十二节气交节（寅月立春至翌年丑月小寒）。 */
function yearMonthTerms(ganzhiYear) {
	return MONTH_JIE.map((m) => {
		const at = solarTermCivil(m.branch === "丑" ? ganzhiYear + 1 : ganzhiYear, m.term);
		return {
			...m,
			at,
			ganzhiYear
		};
	});
}
/** 当前干支月：最近一个已交的节。 */
function monthBoundary(civil) {
	const yb = yearBoundary(civil);
	const terms = [
		...yearMonthTerms(yb.ganzhiYear - 1),
		...yearMonthTerms(yb.ganzhiYear),
		...yearMonthTerms(yb.ganzhiYear + 1)
	];
	const now = civilMs(civil);
	return terms.filter((t) => civilMs(t.at) <= now).sort((a, b) => civilMs(b.at) - civilMs(a.at))[0] ?? yearMonthTerms(yb.ganzhiYear)[0];
}
/** 日家取午时（日之中）为当日代表盘。 */
function noonCivil(civil) {
	return {
		year: civil.year,
		month: civil.month,
		day: civil.day,
		hour: 12,
		minute: 0
	};
}
/** 十二时辰中点：子 0 时 … 亥 22 时。 */
var HOUR_MIDPOINTS = [
	0,
	2,
	4,
	6,
	8,
	10,
	12,
	14,
	16,
	18,
	20,
	22
];
function hourCivil(civil, hour) {
	return {
		year: civil.year,
		month: civil.month,
		day: civil.day,
		hour,
		minute: 0
	};
}
function wuxingRelation(a, b) {
	if (!a || !b) return null;
	if (a === b) return "同我";
	const order = [
		"木",
		"火",
		"土",
		"金",
		"水"
	];
	const i = order.indexOf(a);
	const j = order.indexOf(b);
	if (i < 0 || j < 0) return null;
	if ((i + 1) % 5 === j) return "我生";
	if ((j + 1) % 5 === i) return "生我";
	if ((i + 2) % 5 === j) return "我克";
	if ((j + 2) % 5 === i) return "克我";
	return "同我";
}
function rotatePalace(from, steps, yang) {
	if (from === 5) return 5;
	const i = RING.indexOf(from);
	return RING[(i + (yang ? 1 : -1) * steps + 16) % 8];
}
function stepsBetween(from, to, yang) {
	const a = from === 5 ? from : from;
	const b = to === 5 ? to : to;
	if (a === 5 || b === 5) return 0;
	const fi = RING.indexOf(a);
	const ti = RING.indexOf(b);
	if (yang) return (ti - fi + 8) % 8;
	return (fi - ti + 8) % 8;
}
function lodge(palace, yang) {
	if (palace !== 5) return palace;
	return yang ? 2 : 8;
}
function findStemPalace(earth, stem, yang) {
	for (const id of [
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9
	]) if (earth[id] === stem) return lodge(id, yang);
	return yang ? 2 : 8;
}
function maBranchOf(branch) {
	return {
		申: "寅",
		子: "寅",
		辰: "寅",
		寅: "申",
		午: "申",
		戌: "申",
		亥: "巳",
		卯: "巳",
		未: "巳",
		巳: "亥",
		酉: "亥",
		丑: "亥"
	}[branch] ?? "寅";
}
function palaceOfBranch(branch) {
	return {
		子: 1,
		未: 2,
		申: 2,
		卯: 3,
		辰: 4,
		巳: 4,
		戌: 6,
		亥: 6,
		酉: 7,
		丑: 8,
		寅: 8,
		午: 9
	}[branch] ?? null;
}
function palaceOfEarthBranch(branch) {
	return palaceOfBranch(branch) ?? 5;
}
function isXing$1(a, b) {
	if (a === b) return [
		"辰",
		"午",
		"酉",
		"亥"
	].includes(a);
	return [
		[
			"寅",
			"巳",
			"申"
		],
		[
			"丑",
			"戌",
			"未"
		],
		["子", "卯"]
	].some((g) => g.includes(a) && g.includes(b));
}
function wuxingKe(a, b) {
	const order = [
		"木",
		"火",
		"土",
		"金",
		"水"
	];
	const i = order.indexOf(a);
	const j = order.indexOf(b);
	if (i < 0 || j < 0) return false;
	return (i + 2) % 5 === j;
}
function buildChart(civil, juOverride) {
	const pillars = getFourPillars(civil);
	const ju = juOverride ?? getJu(civil);
	const { xunShou, xunYi, xunKong } = getXun(civil);
	const yang = ju.dun === "yang";
	const hourStem = pillars.hour.stem;
	const hourBranch = pillars.hour.branch;
	const earth = {};
	let p = ju.ju;
	for (let i = 0; i < 9; i++) {
		earth[p] = QI_YI[i];
		p = yang ? p === 9 ? 1 : p + 1 : p === 1 ? 9 : p - 1;
	}
	const zhiFuOrigin = findStemPalace(earth, xunYi, yang);
	let zhiFuPalace;
	if (hourStem === "甲") zhiFuPalace = zhiFuOrigin;
	else zhiFuPalace = findStemPalace(earth, hourStem, yang);
	const originRing = lodge(zhiFuOrigin, yang);
	const destRing = lodge(zhiFuPalace, yang);
	const steps = stepsBetween(originRing, destRing, yang);
	const heaven = {};
	heaven[5] = earth[5];
	for (const pal of RING) {
		const dest = rotatePalace(pal, steps, yang);
		heaven[dest] = earth[pal];
	}
	const stars = {};
	stars[5] = "天禽";
	for (const pal of RING) {
		const dest = rotatePalace(pal, steps, yang);
		stars[dest] = PALACE_META[pal].homeStar;
	}
	if (zhiFuOrigin === 5) stars[destRing] = "天禽";
	const gates = {};
	gates[5] = null;
	for (const pal of RING) {
		const dest = rotatePalace(pal, steps, yang);
		gates[dest] = PALACE_META[pal].homeGate;
	}
	const gods = {};
	gods[5] = null;
	const godSeq = yang ? GODS_YANG : GODS_YIN;
	const start = RING.indexOf(destRing);
	for (let i = 0; i < 8; i++) {
		const pal = RING[(start + i + 8) % 8];
		gods[pal] = godSeq[i];
	}
	const zhiFuStar = PALACE_META[zhiFuOrigin].homeStar;
	const zhiShiGate = PALACE_META[lodge(zhiFuOrigin, yang)].homeGate ?? "休门";
	const ma = maBranchOf(hourBranch);
	const maPalace = palaceOfBranch(ma);
	const fuYin = originRing === destRing;
	const fanYin = destRing === OPPOSITE[originRing];
	const palaces = {};
	for (const id of [
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9
	]) {
		const meta = PALACE_META[id];
		const hStem = heaven[id];
		const eStem = earth[id];
		const gate = gates[id] ?? null;
		const cs = meta.branch ? changshengOf(hStem, meta.branch) : null;
		const kong = meta.branches.some((b) => xunKong.includes(b));
		const menEl = gate ? GATE_ELEMENT[gate] : "";
		const palEl = meta.element;
		palaces[id] = {
			id,
			bagua: meta.bagua,
			direction: meta.direction,
			element: palEl,
			branch: meta.branch,
			branches: meta.branches,
			earthStem: eStem,
			heavenStem: hStem,
			star: stars[id],
			gate,
			god: gods[id] ?? null,
			changsheng: cs,
			isKong: kong,
			isZhiFu: id === destRing || id === 5 && zhiFuOrigin === 5,
			isZhiShi: gate === zhiShiGate && id !== 5,
			isMa: maPalace === id,
			fuYin: hStem === eStem,
			fanYin: Boolean(hStem && BRANCH_CHONG[meta.branch] && STEM_ELEMENT[hStem] && fanYin && id === destRing),
			menPo: Boolean(gate && wuxingKe(menEl, palEl)),
			gongPo: Boolean(gate && wuxingKe(palEl, menEl)),
			ruMu: cs === "墓" || cs === "死" || cs === "绝",
			jiXing: Boolean(gate && meta.branch && isXing$1(meta.branch, hourBranch))
		};
	}
	for (const id of RING) palaces[id].fanYin = palaces[id].heavenStem !== palaces[id].earthStem && fuYin === false && OPPOSITE[id] !== 5 && palaces[id].heavenStem === earth[OPPOSITE[id]];
	const meta = {
		zhiFuOrigin,
		zhiFuPalace: destRing,
		zhiFuStar,
		zhiShiGate,
		xunShou,
		xunYi,
		xunKong,
		maBranch: ma,
		maPalace,
		fuYin,
		fanYin
	};
	const zhi = [
		"子",
		"丑",
		"寅",
		"卯",
		"辰",
		"巳",
		"午",
		"未",
		"申",
		"酉",
		"戌",
		"亥"
	][hourToZhiIndex(civil.hour)];
	return {
		beijing: civil,
		timeLabel: formatCivil(civil),
		hourName: `${zhi}时`,
		pillars,
		ju,
		palaces,
		meta
	};
}
function findPalaceBy(chart, kind, name) {
	for (const id of RING) {
		const p = chart.palaces[id];
		if (kind === "gate" && p.gate === name) return id;
		if (kind === "star" && p.star === name) return id;
		if (kind === "god" && p.god === name) return id;
	}
	return chart.meta.zhiFuPalace;
}
function findStemOnHeaven(chart, stem) {
	if (stem === "甲") return chart.meta.zhiFuPalace;
	for (const id of [
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9
	]) if (chart.palaces[id].heavenStem === stem) return lodge(id, chart.ju.dun === "yang");
	return chart.meta.zhiFuPalace;
}
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/** Render children only when a user is present (real session, or the disabled-auth dev user). */
function SignedIn({ children }) {
	const { user } = useCurrentUserState();
	return user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children }) : null;
}
/**
* Render children only once we KNOW the visitor is signed out (`isPending` has
* cleared and there is no user). Hidden while the session is still loading.
*/
function SignedOut({ children }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending || user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of).
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var ensureProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("a0ec1d1bdda5c62a5dfd022570f55048695026105150e1c3748156982a5197da"));
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("19a93ccf262792baf4150111740d53b39c754c0d756bddfc22f13361cf8b5b79"));
var submitFeedback = createServerFn({ method: "POST" }).validator((d) => d).middleware([authMiddleware]).handler(createSsrRpc("df8dcfcb2cfb379e1270462e650c62ce1e5bba75977b5927c46de2df369caa6e"));
createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("bb88af8b2b58383634fe504efc9d5d8fd1873b87bc25554092364a7568e60f56"));
var adminListFeedback = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("b72261f7753148deed9c77e5c07e7381dd38592370589574eccdf5cdec3a0687"));
var adminListAccounts = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("69f99ee1172c0d5656b62ff61183be10dab05cac3657e9c37924f479e1a19c4a"));
var adminDeleteAccount = createServerFn({ method: "POST" }).validator((id) => id).middleware([authMiddleware]).handler(createSsrRpc("b45844c3329b982f6482e0c7b4054ffbdb5cef7860209285d9cb6266651b5ef1"));
var adminPurgeOtherAccounts = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("1054b1b9297494f7440b5d035424ee3b17562c0e520435a41e7bfeec13704ea5"));
var runWeatherTraining = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("de89ceb508318e989eb7eb43c0d78ff4a56c1d60f512160e3e1ceb83ab7ddecf"));
var getWeatherMetrics = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("d04e0484c40b5ec252a4b2eeee6bdb71cde9fa3b76501a77d79c65a2bf35e016"));
var cal = {
	method: "事项权重 = 刘伯温经典先验 × 全国区县天气逻辑回归|β|信度 × 全国旬准确率尺度。符号仍依人事吉凶，不把雨势符号直接抄到求财。",
	globalScale: 1.0482,
	meanXunAcc: .801,
	pooledLogit: [
		{
			"name": "神_值符",
			"logit": -.04603,
			"score": -1.0127
		},
		{
			"name": "神_腾蛇",
			"logit": .03026,
			"score": .6657
		},
		{
			"name": "神_太阴",
			"logit": .0109,
			"score": .2398
		},
		{
			"name": "神_六合",
			"logit": -.03159,
			"score": -.6951
		},
		{
			"name": "神_白虎",
			"logit": .00157,
			"score": .0345
		},
		{
			"name": "神_玄武",
			"logit": -.04534,
			"score": -.9975
		},
		{
			"name": "神_九地",
			"logit": -.01338,
			"score": -.2943
		},
		{
			"name": "神_九天",
			"logit": -.03404,
			"score": -.7489
		},
		{
			"name": "门_休门",
			"logit": -.02607,
			"score": -.5736
		},
		{
			"name": "门_生门",
			"logit": -.02681,
			"score": -.5897
		},
		{
			"name": "门_伤门",
			"logit": -.02507,
			"score": -.5516
		},
		{
			"name": "门_杜门",
			"logit": -.02252,
			"score": -.4954
		},
		{
			"name": "门_景门",
			"logit": -.02705,
			"score": -.5952
		},
		{
			"name": "门_死门",
			"logit": .0189,
			"score": .4158
		},
		{
			"name": "门_惊门",
			"logit": .00132,
			"score": .029
		},
		{
			"name": "门_开门",
			"logit": -.02036,
			"score": -.4478
		},
		{
			"name": "星_天蓬",
			"logit": -.02607,
			"score": -.5736
		},
		{
			"name": "星_天芮",
			"logit": .0189,
			"score": .4158
		},
		{
			"name": "星_天冲",
			"logit": -.02507,
			"score": -.5516
		},
		{
			"name": "星_天辅",
			"logit": -.02252,
			"score": -.4954
		},
		{
			"name": "星_天禽",
			"logit": 0,
			"score": 0
		},
		{
			"name": "星_天心",
			"logit": -.02036,
			"score": -.4478
		},
		{
			"name": "星_天柱",
			"logit": .00132,
			"score": .029
		},
		{
			"name": "星_天任",
			"logit": -.02681,
			"score": -.5897
		},
		{
			"name": "星_天英",
			"logit": -.02705,
			"score": -.5952
		},
		{
			"name": "阴遁",
			"logit": .07587,
			"score": 1.6692
		},
		{
			"name": "伏吟",
			"logit": -.02607,
			"score": -.5736
		},
		{
			"name": "反吟",
			"logit": -.02705,
			"score": -.5952
		},
		{
			"name": "坎空",
			"logit": .02597,
			"score": .5712
		},
		{
			"name": "年积日sin",
			"logit": -.04802,
			"score": -1.0565
		},
		{
			"name": "年积日cos",
			"logit": -.8466,
			"score": -18.6251
		}
	],
	god: {
		"值符": 20,
		"九天": 14,
		"九地": 9,
		"太阴": 10,
		"六合": 12,
		"腾蛇": -10,
		"白虎": -10,
		"玄武": -11
	},
	gate: {
		"生门": 21,
		"开门": 18,
		"休门": 13,
		"景门": 6,
		"杜门": -4,
		"惊门": -8,
		"伤门": -11,
		"死门": -18
	},
	star: {
		"天辅": 15,
		"天心": 15,
		"天任": 12,
		"天冲": 10,
		"天禽": 11,
		"天英": 2,
		"天柱": -6,
		"天芮": -11,
		"天蓬": -13
	},
	classic: {
		"god": {
			"值符": 18,
			"九天": 14,
			"九地": 10,
			"太阴": 12,
			"六合": 12,
			"腾蛇": -10,
			"白虎": -12,
			"玄武": -10
		},
		"gate": {
			"生门": 22,
			"开门": 20,
			"休门": 14,
			"景门": 6,
			"杜门": -4,
			"惊门": -10,
			"伤门": -12,
			"死门": -20
		},
		"star": {
			"天辅": 16,
			"天心": 16,
			"天任": 12,
			"天冲": 10,
			"天禽": 14,
			"天英": 2,
			"天柱": -8,
			"天芮": -12,
			"天蓬": -14
		}
	}
};
/** 全国区县天气逻辑回归校准后的事项权重（符号仍依人事吉凶）。 */
var GATE_BASE = cal.gate;
var GOD_BASE = cal.god;
var STAR_BASE = cal.star;
var EVENT_CALIBRATION = {
	...cal,
	classicGate: GATE_BASE$1,
	classicGod: GOD_BASE$1,
	classicStar: STAR_BASE$1
};
/** 三位数（或任意数字）连加至 1–9，即求签定局。168→1+6+8=15→1+5=6。 */
function digitRootToJu(raw) {
	const source = raw.replace(/\D/g, "").slice(0, 6);
	if (!source) return {
		ju: 1,
		steps: [],
		source: ""
	};
	const steps = [];
	let n = [...source].reduce((s, d) => s + Number(d), 0);
	steps.push(`${[...source].join("+")}=${n}`);
	while (n > 9) {
		const s = String(n);
		const next = [...s].reduce((a, d) => a + Number(d), 0);
		steps.push(`${[...s].join("+")}=${next}`);
		n = next;
	}
	return {
		ju: n === 0 ? 9 : n,
		steps,
		source
	};
}
var STEM_GE = {
	甲丙: {
		name: "青龙反首",
		weight: 18,
		detail: "甲加丙，动作无阻，求谋多遂（《烟波钓叟歌》）"
	},
	丙甲: {
		name: "飞鸟跌穴",
		weight: 18,
		detail: "丙加甲，运用有成，贵人提携"
	},
	戊丙: {
		name: "青龙反首",
		weight: 16,
		detail: "值符加丙，青龙返首，宜动不宜静"
	},
	丙戊: {
		name: "飞鸟跌穴",
		weight: 16,
		detail: "月奇加值符，谋为洞彻"
	},
	乙辛: {
		name: "青龙逃走",
		weight: -16,
		detail: "乙加辛，财物废坠、奴仆走失"
	},
	辛乙: {
		name: "白虎猖狂",
		weight: -16,
		detail: "辛加乙，身体毁伤、尊长不喜"
	},
	丁癸: {
		name: "朱雀投江",
		weight: -14,
		detail: "丁加癸，讼狱口舌、音信沉溺"
	},
	癸丁: {
		name: "螣蛇夭矫",
		weight: -14,
		detail: "癸加丁，忧惶怪异、文书官司"
	},
	庚丙: {
		name: "太白入荧",
		weight: -12,
		detail: "庚加丙，贼必来，客进主破"
	},
	丙庚: {
		name: "荧入太白",
		weight: -10,
		detail: "丙加庚，贼必去，门户破耗"
	},
	甲庚: {
		name: "值符飞宫",
		weight: -10,
		detail: "值符加庚，吉事不吉，凶事更凶"
	},
	庚甲: {
		name: "太白擒龙",
		weight: -12,
		detail: "庚加值符，百事不可谋为"
	},
	乙己: {
		name: "日奇入雾",
		weight: -6,
		detail: "乙加己，被土暗昧；得吉门则为地遁"
	},
	丁己: {
		name: "朱雀入墓",
		weight: -8,
		detail: "丁加己，文状词讼，先曲后直"
	},
	己丁: {
		name: "火入勾陈",
		weight: -7,
		detail: "己加丁，奸私仇冤，事因女人"
	}
};
function stemKey(h, e) {
	return `${h}${e}`;
}
/** 《秘笈》十干尅应 + 九遁三诈 + 反伏吟墓迫。 */
function detectClassicPatterns(chart, palace) {
	const out = [];
	const h = palace.heavenStem;
	const e = palace.earthStem;
	const gate = palace.gate;
	const god = palace.god;
	const star = palace.star;
	const hourBr = chart.pillars.hour.branch;
	const dayStem = chart.pillars.day.stem;
	const hourStem = chart.pillars.hour.stem;
	const ge = STEM_GE[stemKey(h, e)];
	if (ge) out.push(ge);
	if (h && [
		"乙",
		"丙",
		"丁"
	].includes(h) && gate && [
		"开门",
		"休门",
		"生门"
	].includes(gate)) out.push({
		name: "三奇吉门",
		weight: 14,
		detail: `${h}奇临${gate}，万事开三皆宜（《总序》）`
	});
	if (h === "丙" && gate === "生门" && (god === "九天" || e === "丁")) out.push({
		name: "天遁",
		weight: 14,
		detail: "生门六丙合六丁，得月精所蔽，宜进取名位"
	});
	if (h === "乙" && gate === "开门") out.push({
		name: "地遁",
		weight: 12,
		detail: "开门六乙合六己，得日精所蔽，宜置业藏形"
	});
	if (h === "丁" && god === "太阴" && gate === "休门") out.push({
		name: "人遁",
		weight: 12,
		detail: "休门六丁共太阴，宜密谋求人、合药祈禳"
	});
	if (gate && [
		"开门",
		"休门",
		"生门"
	].includes(gate) && god === "太阴") out.push({
		name: "真诈",
		weight: 8,
		detail: "三吉门临太阴，利隐遁、祈祷（《三诈法》）"
	});
	if (gate && [
		"开门",
		"休门",
		"生门"
	].includes(gate) && god === "六合") out.push({
		name: "休诈",
		weight: 8,
		detail: "三吉门临六合，宜合药、祭祀、和合"
	});
	if (gate && [
		"开门",
		"休门",
		"生门"
	].includes(gate) && god === "九地") out.push({
		name: "重诈",
		weight: 8,
		detail: "三吉门临九地，宜纳财、进人口、拜授"
	});
	const shi = {
		乙: "戌午",
		丙: "子申",
		丁: "辰寅"
	};
	if (h && shi[h] && shi[h].includes(hourBr)) out.push({
		name: "三奇得使",
		weight: 12,
		detail: `${h}奇得使（乙逢犬马、丙鼠猴、丁龙虎），事半功倍`
	});
	if (h === "丁" && (e === "戊" || e === "己" || e === "庚" || e === "辛" || e === "壬" || e === "癸")) {
		if (gate && [
			"开门",
			"休门",
			"生门"
		].includes(gate)) out.push({
			name: "玉女守门",
			weight: 6,
			detail: "三奇游六仪，阴私和合、密事可成"
		});
	}
	if (palace.fuYin) out.push({
		name: "伏吟",
		weight: -10,
		detail: "天蓬加着地天蓬，事多稽留反复，吉宿亦减（《烟波钓叟歌》）"
	});
	if (palace.fanYin) out.push({
		name: "反吟",
		weight: -8,
		detail: "天蓬若到天英上，变动大、难安定"
	});
	if (palace.menPo) out.push({
		name: "门迫",
		weight: -9,
		detail: "门制其宫是迫雄，行动受阻"
	});
	if (palace.gongPo) out.push({
		name: "宫迫",
		weight: -5,
		detail: "宫制其门不为迫，环境压过行动"
	});
	if (palace.ruMu) out.push({
		name: "入墓",
		weight: -10,
		detail: `三奇入墓或长生墓库，气收藏、难发用`
	});
	if (palace.jiXing) out.push({
		name: "击刑",
		weight: -12,
		detail: "六仪击刑，此时举动可惮惧"
	});
	if (palace.isKong) out.push({
		name: "空亡",
		weight: -8,
		detail: "旬空之力虚，事多空、宜缓"
	});
	if (palace.isMa) out.push({
		name: "驿马",
		weight: 4,
		detail: "太冲天马，主移动、出行、变动"
	});
	if (wuxingRelation(STEM_ELEMENT[hourStem] ?? "", STEM_ELEMENT[dayStem] ?? "") === "我克") out.push({
		name: "五不遇时",
		weight: -14,
		detail: `时干${hourStem}克日干${dayStem}，号日月损光明，百事不利`
	});
	if (star === "天辅" && gate === "景门") out.push({
		name: "文昌会景",
		weight: 8,
		detail: "天辅远行良，景上投书，利于考试文书"
	});
	if (star === "天心" && (gate === "开门" || gate === "休门")) out.push({
		name: "天心得门",
		weight: 6,
		detail: "天心求仙合药当，商途客旅财禄昌"
	});
	if (star === "天蓬" && gate === "休门") out.push({
		name: "蓬休同宫",
		weight: -2,
		detail: "天蓬本凶，得休门稍解，仍宜守不宜进"
	});
	const seen = /* @__PURE__ */ new Set();
	return out.filter((p) => seen.has(p.name) ? false : (seen.add(p.name), true));
}
var GATE_CLASSIC = {
	开门: {
		yi: "开张、远行、见贵、上官、求财、嫁娶、贸易",
		ji: "阴私、偷盗、逃亡（公开则泄）",
		song: "开门欲得照临来，奴婢牛羊百日廻。属金，天门，万物杀尽而复生。"
	},
	休门: {
		yi: "求财、进人口、谒贵、和合、治病、休息",
		ji: "争战、词讼强进",
		song: "休门最好聚资财，牛马猪羊自送来。属水，一阳复始，返本还源。"
	},
	生门: {
		yi: "求财、嫁娶、上官、修造、牧养、生产",
		ji: "吊丧、行刑",
		song: "生门临着吉星辰，人财资旺各称情。艮土开泰，万物皆生。"
	},
	伤门: {
		yi: "捕捉、渔猎、索债、赌博",
		ji: "上官、出行、嫁娶、商贾、修造、埋葬",
		song: "伤门不可说，夫妻主灾迍。木泄太过，以外华而内虚。"
	},
	杜门: {
		yi: "躲灾避难、塞穴、捕捉、隐形",
		ji: "求名、开张、远行张扬",
		song: "杜门原是木，犯者灾祸频。阳木力屈，宜藏形。"
	},
	景门: {
		yi: "上书献策、考试、破阵、火攻、封赏",
		ji: "远行、求财、嫁娶（次吉，不全吉）",
		song: "景门主血光，官符卖田庄。惟利文书之事。"
	},
	死门: {
		yi: "吊死、行刑、捕捉、畋猎、丧葬",
		ji: "求进、开张、嫁娶、上官",
		song: "元死之方最为凶。天地肃杀，顺天之序而用之。"
	},
	惊门: {
		yi: "词讼、捕捉、博戏、设疑、伏兵",
		ji: "出行、上官、求安稳",
		song: "惊门主争讼，瘟疫死人丁。气肃物老，不得已而杀。"
	}
};
var STAR_SONG = {
	天蓬: "讼庭争竞遇天蓬，春夏用之皆大吉，秋冬半凶。须得生门同丙乙。",
	天芮: "天芮授道结交宜，行方最不吉。贼盗惊惶忧小口。",
	天冲: "嫁娶安茔产女惊，出行移徙遇灾迍。宜决不宜拖。",
	天辅: "天辅之星远行良，修造埋葬福绵长，上官移徙皆吉利。",
	天禽: "天禽远行偏得利，坐贾行商皆称意，投谒贵人俱益怀。",
	天心: "天心求仙合药当，商途客旅财禄昌，迁葬皆吉。",
	天柱: "天柱藏形谨守宜，不须远行及营为。",
	天任: "天任吉宿事皆通，祭祀求官嫁娶同。",
	天英: "天英之星嫁娶凶，远行移徙不宜逢。"
};
var EVENT_ASSOC_HINT = {
	wealth: [
		"银钱入帐或回款",
		"铺面开张或改签",
		"贵人指路一笔生意",
		"破耗口舌争财"
	],
	career: [
		"见官谒贵、升迁文书",
		"岗位调动或改签",
		"小人掣肘、名实不符",
		"印绶到手"
	],
	job: [
		"面试得贵人",
		"聘书文书将至",
		"岗位与预期不符",
		"空亡则事成又散"
	],
	romance: [
		"会合订约、媒妁说合",
		"暗昧私情、反复猜疑",
		"家族长辈介入",
		"走失或冷淡"
	],
	study: [
		"投书献策、考场文书",
		"名次公布或录取",
		"心神不定、临场有惊",
		"贵人点拨"
	],
	health: [
		"求医合药、休养得生",
		"旧疾反复、小口不安",
		"血光筋骨之伤",
		"墓空则病势衰减"
	],
	travel: [
		"车马远行、见贵于途",
		"关梁阻滞、风雨相阻",
		"中途折返",
		"驿马发动则行路"
	],
	lawsuit: [
		"词讼得理或和解",
		"惊门口舌、官符到门",
		"先曲后直",
		"朱雀投江则音信沉"
	],
	partner: [
		"合伙订约、六合成事",
		"分产争执、伤门破财",
		"中间人说合",
		"杜门则信息不畅"
	],
	property: [
		"田宅文契、进产进人口",
		"宅中怪异、修造不宜",
		"地遁可成置业",
		"墓库则压着不成交"
	],
	negotiate: [
		"开门见贵、名正言顺",
		"太阴宜密谈",
		"反吟则条件大变",
		"五不遇时宜改期"
	],
	find: [
		"杜门玄武主走失隐藏",
		"开生则物现人归",
		"空亡入墓则难寻",
		"六合可因人得线索"
	]
};
/** 古法八门用事。据《烟波钓叟赋》《奇门法窍》门旨归纳。 */
var GATE_USES = {
	开门: {
		suit: [
			"开张经营",
			"求财放债",
			"远行见贵",
			"嫁娶入宅",
			"上官赴任"
		],
		avoid: ["安葬", "捕猎行刑"],
		classic: "开门为金，乾宫本门。宜开张、求财、远行、见贵、嫁娶、入宅。"
	},
	休门: {
		suit: [
			"休养治病",
			"求财婚姻",
			"公事谒贵",
			"修造安床"
		],
		avoid: ["出师征战", "词讼争斗"],
		classic: "休门为水，坎宫本门。宜治病、休息、求财、婚姻、公事。"
	},
	生门: {
		suit: [
			"求财开业",
			"种植生产",
			"嫁娶上官",
			"安葬造葬亦有生发"
		],
		avoid: ["词讼争斗", "出师血光"],
		classic: "生门为土，艮宫本门。八门最吉，宜求财、生产、开业、嫁娶。"
	},
	伤门: {
		suit: [
			"出师捕猎",
			"索债讨捕",
			"修造破土"
		],
		avoid: [
			"婚姻嫁娶",
			"安葬入宅",
			"求医疗病"
		],
		classic: "伤门为木，震宫本门。宜渔猎、捕捉、讨债；不宜婚姻、安葬。"
	},
	杜门: {
		suit: [
			"躲灾避难",
			"捕盗塞穴",
			"修筑隐藏",
			"遁迹不出"
		],
		avoid: ["求谋见贵", "开张远行"],
		classic: "杜门为木，巽宫本门。宜躲藏、避难、修筑；不宜求见、开张。"
	},
	景门: {
		suit: [
			"上书科甲",
			"文书谒贵",
			"火烛文明",
			"求名考试"
		],
		avoid: ["争讼动武", "安葬"],
		classic: "景门为火，离宫本门。宜上书、考试、求名、谒贵、文书。"
	},
	死门: {
		suit: [
			"丧葬安葬",
			"捕猎行刑",
			"破土修坟"
		],
		avoid: [
			"求财婚姻",
			"开张入宅",
			"求医疗病"
		],
		classic: "死门为土，坤宫本门。古法用于丧葬、行刑、捕猎；求财婚姻大忌。"
	},
	惊门: {
		suit: [
			"词讼捕捉",
			"惊扰出师",
			"口舌是非中取胜"
		],
		avoid: [
			"安床入宅",
			"婚姻嫁娶",
			"安葬"
		],
		classic: "惊门为金，兑宫本门。宜捕猎、词讼、惊扰；不宜安床、入宅。"
	}
};
var ACTIVITY_META = [
	{
		id: "commerce",
		name: "经商开张",
		prefer: [
			"开门",
			"生门",
			"休门"
		],
		avoid: [
			"死门",
			"杜门",
			"伤门"
		]
	},
	{
		id: "travel",
		name: "远行出门",
		prefer: [
			"开门",
			"生门",
			"景门"
		],
		avoid: ["杜门", "死门"]
	},
	{
		id: "exam",
		name: "考试求名",
		prefer: [
			"景门",
			"开门",
			"生门"
		],
		avoid: ["死门", "伤门"]
	},
	{
		id: "marriage",
		name: "嫁娶婚姻",
		prefer: [
			"生门",
			"休门",
			"开门"
		],
		avoid: [
			"伤门",
			"死门",
			"惊门"
		]
	},
	{
		id: "healing",
		name: "治病休养",
		prefer: ["休门", "生门"],
		avoid: [
			"伤门",
			"死门",
			"惊门"
		]
	},
	{
		id: "hide",
		name: "避难隐藏",
		prefer: ["杜门", "休门"],
		avoid: ["开门", "景门"]
	},
	{
		id: "funeral",
		name: "丧葬安葬",
		prefer: ["死门", "开门"],
		avoid: ["生门", "伤门"]
	},
	{
		id: "lawsuit",
		name: "词讼捕捉",
		prefer: ["惊门", "伤门"],
		avoid: ["休门", "生门"]
	},
	{
		id: "hunt",
		name: "捕猎出师",
		prefer: [
			"伤门",
			"死门",
			"惊门"
		],
		avoid: ["休门"]
	},
	{
		id: "build",
		name: "修造入宅",
		prefer: [
			"开门",
			"生门",
			"休门"
		],
		avoid: [
			"死门",
			"惊门",
			"伤门"
		]
	}
];
function gateScore(gate, activity) {
	if (!gate) return -4;
	const meta = ACTIVITY_META.find((a) => a.id === activity);
	if (meta.prefer.includes(gate)) return 16;
	if (meta.avoid.includes(gate)) return -16;
	return 0;
}
function extras(p) {
	let n = 0;
	if (p.god === "值符" || p.god === "九天" || p.god === "六合" || p.god === "太阴") n += 6;
	if (p.god === "白虎" || p.god === "玄武" || p.god === "腾蛇") n -= 5;
	if (p.star === "天心" || p.star === "天任" || p.star === "天辅") n += 4;
	if (p.star === "天蓬" || p.star === "天芮" || p.star === "天柱") n -= 4;
	if (p.isKong) n -= 8;
	if (p.menPo || p.gongPo) n -= 6;
	if (p.ruMu) n -= 5;
	if (p.fuYin) n -= 3;
	if (p.fanYin) n -= 4;
	return n;
}
function scoreDirections(chart, activity) {
	return RING.map((id) => {
		const p = chart.palaces[id];
		const gate = p.gate;
		const uses = gate ? GATE_USES[gate] : null;
		const score = gateScore(gate, activity) + extras(p);
		const level = score >= 16 ? "大宜" : score >= 6 ? "宜" : score >= -5 ? "平" : score >= -16 ? "不宜" : "大忌";
		const meta = PALACE_META[id];
		const note = `${meta.direction}${meta.bagua}宫临${gate ?? "无门"}、${p.star}、${p.god ?? "无神"}。${uses?.classic ?? "中宫寄宫，不以门论。"}`;
		return {
			palaceId: id,
			bagua: meta.bagua,
			direction: meta.direction,
			gate,
			star: p.star,
			god: p.god,
			score,
			level,
			suit: uses?.suit ?? [],
			avoid: uses?.avoid ?? [],
			classic: uses?.classic ?? "",
			note
		};
	}).sort((a, b) => b.score - a.score);
}
function bestDirection(chart) {
	return RING.map((id) => {
		const p = chart.palaces[id];
		const uses = p.gate ? GATE_USES[p.gate] : null;
		let score = 0;
		if (p.gate === "生门" || p.gate === "开门" || p.gate === "休门") score += 12;
		if (p.gate === "景门") score += 6;
		if (p.gate === "杜门") score += 2;
		if (p.gate === "伤门" || p.gate === "惊门") score -= 4;
		if (p.gate === "死门") score -= 10;
		score += extras(p);
		const meta = PALACE_META[id];
		const level = score >= 14 ? "大吉方" : score >= 6 ? "吉方" : score >= -4 ? "平" : "凶方";
		return {
			palaceId: id,
			bagua: meta.bagua,
			direction: meta.direction,
			gate: p.gate,
			star: p.star,
			god: p.god,
			score,
			level,
			suit: uses?.suit ?? [],
			avoid: uses?.avoid ?? [],
			classic: uses?.classic ?? "",
			note: `${meta.direction}宜：${(uses?.suit ?? ["中宫不论"]).slice(0, 3).join("、")}`
		};
	}).sort((a, b) => b.score - a.score);
}
var HOUR_OMEN = {
	天蓬: {
		子: "鸡鸣犬吠、宿鸟闹林，口舌官讼之象",
		午: "持刀上山、青衣童子，防破财人口",
		酉: "西方马行、群鸦飞噪，或有横财僧道作牙"
	},
	天芮: {
		子: "飞禽西南火光，春夏用凶秋冬差可",
		卯: "女人送物、贵人骑马，防产难",
		未: "捕猎人、白衣僧道，防瘟火"
	},
	天冲: {
		子: "仙禽鸣噪、钟声，田蚕或因口舌得财",
		午: "东方火起、白衣叫喊，或拾古器",
		亥: "跛足青衣、东方火光，进田契之象"
	},
	天辅: {
		子: "红衣大叫自西来，进商音财物、加官进职",
		卯: "女人持伞、师巫吹角，因女人公事进产",
		午: "僧人拿物、红衣女人，贵人送异物"
	},
	天禽: {
		子: "孕妇紫衣人至，因武得官、人丁财旺",
		午: "白衣女人、狗衔花，因赌戏公事得财",
		酉: "西方火起鼓声喧闹，年内生贵子"
	},
	天心: {
		子: "争斗鼓声西北，赤面人作牙进古器",
		午: "风雨骤至、蛇横路、红裙提酒",
		戌: "南方喊贼、小儿牵牛，或有科第之象"
	},
	天柱: {
		子: "风雨东方火起，蛇犬咬人、血光破财",
		申: "鹰捕鸟、青衣携盖，防火焚宅",
		亥: "西方钟声、山下人喊，或因救火得财"
	},
	天任: {
		子: "风雨水畔鸡鸣，妇人离异、水姓抵赖",
		午: "西方黄鸟、僧道儒士同行，得贵人财宝",
		酉: "僧尼持火、北方钟鼓，官员财物牛马"
	},
	天英: {
		子: "锣声西北、伐木掌火，残病人上门",
		午: "南方红衣骑马持文书，防木石人命",
		酉: "西方吵闹、白衣女人，唇舌得财或足疾"
	}
};
var GOD_OMEN = {
	值符: "天乙在门，贵人车马，长者欢欣",
	腾蛇: "虚惊怪异，半途而回，风雨相阻",
	太阴: "小求大得，阴私和合，音乐相随",
	六合: "路逢车马，阴人彩衣，儿童戏耍",
	白虎: "见死闻悲，官事惊迫，途逢兵革",
	玄武: "盗贼亡失，牙侩乞儿，暗昧走失",
	九地: "宜伏匿、守静、就地生发",
	九天: "宜扬兵、高举、公开进取"
};
function buildAssociations(chart, palace, eventId, level, patterns) {
	const hints = EVENT_ASSOC_HINT[eventId];
	const lucky = level.includes("吉");
	const bad = level.includes("凶");
	const hour = chart.pillars.hour.branch;
	const items = [];
	const omen = HOUR_OMEN[palace.star]?.[hour];
	if (omen) items.push(`时象：${palace.star}值${hour}时，${omen}。`);
	if (palace.god && GOD_OMEN[palace.god]) items.push(`神象：${GOD_OMEN[palace.god]}。`);
	const g = palace.gate ? GATE_CLASSIC[palace.gate] : null;
	if (g) items.push(lucky ? `门宜：${g.yi}。` : `门忌：${g.ji}。`);
	const ge = patterns.find((p) => [
		"青龙反首",
		"飞鸟跌穴",
		"青龙逃走",
		"白虎猖狂",
		"朱雀投江",
		"螣蛇夭矫",
		"太白入荧",
		"荧入太白",
		"五不遇时"
	].includes(p.name));
	if (ge) items.push(`格局：${ge.name}。${ge.detail}`);
	if (lucky) items.push(`此事较顺时，或见：${hints[0]}；亦可能：${hints[1]}。`);
	else if (bad) items.push(`此事多阻时，或见：${hints[2]}；亦须防：${hints[3]}。`);
	else items.push(`平局：可成可不成。若动，取吉门方位；若静，待值符得令。`);
	if (palace.isKong) items.push("用神空亡，事成亦虚，合同、款项、承诺宜留尾款、留字据。");
	if (chart.meta.fuYin) items.push("全盘伏吟，本旬宜守旧，改约、搬家、换岗多反复。");
	if (chart.meta.fanYin) items.push("全盘反吟，对面人、对冲地、反向条件忽然出现。");
	return items.slice(0, 6);
}
function composeClassicReading(chart, palace, eventName, score, level, phases, patterns, associations) {
	const who = eventName;
	const g = palace.gate ? GATE_CLASSIC[palace.gate] : null;
	const star = STAR_SONG[palace.star] ?? palace.star;
	const pat = patterns[0];
	const begin = phases.start >= 4 ? "起手先得神助" : phases.start <= -4 ? "起手已见惊疑或刚猛" : "起手平平";
	const mid = phases.process >= 4 ? "过程有谋有辅" : phases.process <= -4 ? "过程费力、宜防小人灾病" : "过程不疾不徐";
	const fin = phases.end >= 4 ? "收局门吉，事可落地" : phases.end <= -4 ? "收局门凶，宜止不宜进" : "收局含混，宜留余地";
	const cite = pat ? `《秘笈》格局见「${pat.name}」。` : "《烟波钓叟歌》：吉门偶合三奇，万事开三万事宜。";
	const assoc = associations[0] ? associations[0] : "";
	const sign = score > 0 ? `顺利倾向偏正（${score}）` : score < 0 ? `阻力偏显（${score}）` : "吉凶相抵";
	return [
		`问「${who}」，用神在${palace.bagua}${palace.id}宫，${palace.god ?? "无神"} / ${palace.star} / ${palace.gate ?? "无门"}。${sign}，总断${level}。`,
		`神应开始、星应过程、门应收局：${begin}；${mid}；${fin}。`,
		g ? `${g.song}` : star,
		cite,
		assoc
	].filter(Boolean).join("");
}
function enrichEventScore(chart, palace, eventId, base, patterns) {
	const associations = buildAssociations(chart, palace, eventId, base.level, patterns);
	const omen = HOUR_OMEN[palace.star]?.[chart.pillars.hour.branch] ?? (palace.god ? GOD_OMEN[palace.god] ?? "" : "");
	const classicCite = palace.gate ? GATE_CLASSIC[palace.gate].song : STAR_SONG[palace.star] ?? "刘基《奇门遁甲总序》";
	const reading = composeClassicReading(chart, palace, base.name, base.score, base.level, {
		start: base.phases.start.score,
		process: base.phases.process.score,
		end: base.phases.end.score
	}, patterns, associations);
	return {
		...base,
		reading,
		associations,
		omen,
		classicCite
	};
}
/** 只知出生年时，以该年立春后的年柱为生肖年命。 */
function natalPillar(birthYear) {
	return getFourPillars(solarTermCivil(birthYear, "立春")).year;
}
function baguaOf(id) {
	return PALACE_META[id].bagua;
}
function natalView(chart, birthYear) {
	const pillar = natalPillar(birthYear);
	const yearBr = chart.pillars.year.branch;
	const benming = pillar.branch === yearBr;
	const chongTaiSui = BRANCH_CHONG[pillar.branch] === yearBr;
	const heTaiSui = BRANCH_SIX_HE[pillar.branch] === yearBr;
	const stemPalace = findStemOnHeaven(chart, pillar.stem);
	const branchPalace = palaceOfEarthBranch(pillar.branch);
	const tags = [];
	if (benming) tags.push("本命年");
	if (chongTaiSui) tags.push("冲太岁");
	if (heTaiSui) tags.push("生肖合岁");
	tags.push(`命干${pillar.stem}·${baguaOf(stemPalace)}宫`);
	tags.push(`命支${pillar.branch}·${baguaOf(branchPalace)}宫`);
	let summary;
	if (benming) summary = `${birthYear} ${pillar.name}，生肖${pillar.branch}值年（本命年），太岁压身，宜守成、少开新。命干落${baguaOf(stemPalace)}宫，命支落${baguaOf(branchPalace)}宫。`;
	else if (chongTaiSui) summary = `${birthYear} ${pillar.name}，生肖${pillar.branch}冲太岁${yearBr}，一年多迁移、争执。命干落${baguaOf(stemPalace)}宫。`;
	else if (heTaiSui) summary = `${birthYear} ${pillar.name}，生肖${pillar.branch}合太岁${yearBr}，人事可借岁气。命干落${baguaOf(stemPalace)}宫。`;
	else summary = `${birthYear} ${pillar.name}，命干${pillar.stem}在${baguaOf(stemPalace)}宫、命支${pillar.branch}在${baguaOf(branchPalace)}宫。十二类用神已另计本命生克，不改原用神取宫。`;
	const marks = {};
	marks[stemPalace] = "命干";
	marks[branchPalace] = stemPalace === branchPalace ? "命干/命支" : "命支";
	return {
		year: birthYear,
		pillar,
		benming,
		chongTaiSui,
		heTaiSui,
		stemPalace,
		branchPalace,
		summary,
		tags,
		marks
	};
}
/** 本命对某一用神宫的加性分。符号仍依人事吉凶，不把岁运直接抄成事项吉凶。 */
function natalFactors(chart, yongShen, birthYear) {
	const n = natalView(chart, birthYear);
	const extra = [];
	if (n.benming) extra.push({
		key: "benming",
		label: "生肖本命年",
		detail: `属${n.pillar.branch}值年，太岁压身，宜检点、守成`,
		weight: -8,
		phase: "aux"
	});
	else if (n.chongTaiSui) extra.push({
		key: "chongtai",
		label: "生肖冲太岁",
		detail: `${n.pillar.branch}冲${chart.pillars.year.branch}，变动、远行、争执较多`,
		weight: -10,
		phase: "aux"
	});
	else if (n.heTaiSui) extra.push({
		key: "hetai",
		label: "生肖合太岁",
		detail: `${n.pillar.branch}合${chart.pillars.year.branch}，人事可借岁气`,
		weight: 6,
		phase: "aux"
	});
	if (n.stemPalace === yongShen) extra.push({
		key: "minggan",
		label: "命干临用神",
		detail: `命干${n.pillar.stem}落用神宫，事体与本人紧贴、可担`,
		weight: 8,
		phase: "aux"
	});
	if (n.branchPalace === yongShen) extra.push({
		key: "mingzhi",
		label: "命支临用神",
		detail: `生肖${n.pillar.branch}落用神宫，得地`,
		weight: 6,
		phase: "aux"
	});
	if (n.stemPalace !== yongShen && OPPOSITE[n.stemPalace] === yongShen && n.stemPalace !== 5) extra.push({
		key: "mingchong",
		label: "命干宫冲用神",
		detail: "命宫与用神对冲，本人与事体拉锯",
		weight: -6,
		phase: "aux"
	});
	return extra;
}
function mergeMarks(a = {}, b = {}) {
	const out = { ...a };
	for (const key of Object.keys(b)) {
		const id = Number(key);
		const v = b[id];
		if (!v) continue;
		out[id] = out[id] && out[id] !== v ? `${out[id]}/${v}` : v;
	}
	return out;
}
function clamp(n, a, b) {
	return Math.max(a, Math.min(b, n));
}
function luckLevel(score) {
	if (score >= 42) return "大吉";
	if (score >= 20) return "吉";
	if (score >= 6) return "小吉";
	if (score > -6) return "平";
	if (score > -20) return "小凶";
	if (score > -42) return "凶";
	return "大凶";
}
function probabilityOf(score) {
	const p = 1 / (1 + Math.exp(-score / 22));
	return Math.round(clamp(p, .04, .96) * 100);
}
function isXing(a, b) {
	if (!a || !b) return false;
	if (a === b) return SELF_XING.has(a);
	return XING_GROUPS.some((g) => g.includes(a) && g.includes(b));
}
function seasonWang(element, monthBranch) {
	const wang = {
		寅: "木",
		卯: "木",
		巳: "火",
		午: "火",
		申: "金",
		酉: "金",
		亥: "水",
		子: "水",
		辰: "土",
		戌: "土",
		丑: "土",
		未: "土"
	}[monthBranch];
	if (!wang || !element) return 0;
	if (element === wang) return 10;
	const rel = wuxingRelation(element, wang);
	if (rel === "我生") return -4;
	if (rel === "生我") return 5;
	if (rel === "我克") return -2;
	if (rel === "克我") return -8;
	return 0;
}
function ganzhiFlags(chart, palace) {
	const flags = [];
	const { year, month, day, hour } = chart.pillars;
	const stems = [
		year.stem,
		month.stem,
		day.stem,
		hour.stem
	];
	const branches = [
		year.branch,
		month.branch,
		day.branch,
		hour.branch
	];
	const names = [
		"年",
		"月",
		"日",
		"时"
	];
	const pStem = palace.heavenStem;
	const pBranch = palace.branch;
	stems.forEach((s, i) => {
		if (STEM_HE[s] === pStem) flags.push({
			label: `${names[i]}干合用神`,
			kind: "合",
			detail: `${s}${pStem}合，外助得力`,
			weight: i >= 2 ? 10 : 6
		});
		if (STEM_CHONG[s] === pStem) flags.push({
			label: `${names[i]}干冲用神`,
			kind: "冲",
			detail: `${s}${pStem}冲，阻力或变动`,
			weight: i >= 2 ? -12 : -7
		});
		const rel = wuxingRelation(STEM_ELEMENT[pStem] ?? "", STEM_ELEMENT[s] ?? "");
		if (rel === "生我" && i >= 2) flags.push({
			label: `${names[i]}干生用神`,
			kind: "生",
			detail: `${s}生${pStem}，得气`,
			weight: 6
		});
		if (rel === "克我" && i >= 2) flags.push({
			label: `${names[i]}干克用神`,
			kind: "克",
			detail: `${s}克${pStem}，受制`,
			weight: -7
		});
	});
	branches.forEach((b, i) => {
		if (!pBranch) return;
		if (BRANCH_SIX_HE[b] === pBranch) flags.push({
			label: `${names[i]}支合宫`,
			kind: "合",
			detail: `${b}${pBranch}六合，人事可成`,
			weight: i >= 2 ? 9 : 5
		});
		if (BRANCH_CHONG[b] === pBranch) flags.push({
			label: `${names[i]}支冲宫`,
			kind: "冲",
			detail: `${b}${pBranch}冲，波动、移动、反复`,
			weight: i >= 2 ? -11 : -6
		});
		if (isXing(b, pBranch)) flags.push({
			label: `${names[i]}支刑宫`,
			kind: "刑",
			detail: `${b}${pBranch}刑，纠葛、不顺`,
			weight: i >= 2 ? -9 : -5
		});
		if (BRANCH_HAI[b] === pBranch) flags.push({
			label: `${names[i]}支害宫`,
			kind: "害",
			detail: `${b}${pBranch}害，暗损、猜疑`,
			weight: i >= 2 ? -7 : -4
		});
	});
	const dayCs = changshengOf(day.stem, hour.branch);
	if (dayCs) {
		const w = CHANGSHENG_SCORE[dayCs] ?? 0;
		flags.push({
			label: `日干长生在时`,
			kind: dayCs === "墓" || dayCs === "死" || dayCs === "绝" ? "墓" : "生",
			detail: `${day.stem}在${hour.branch}为${dayCs}`,
			weight: Math.round(w * .45)
		});
	}
	const hourCs = changshengOf(hour.stem, day.branch);
	if (hourCs) {
		const w = CHANGSHENG_SCORE[hourCs] ?? 0;
		flags.push({
			label: `时干长生在日`,
			kind: hourCs === "墓" || hourCs === "死" || hourCs === "绝" ? "墓" : "生",
			detail: `${hour.stem}在${day.branch}为${hourCs}`,
			weight: Math.round(w * .35)
		});
	}
	if (palace.isKong) flags.push({
		label: "用神空亡",
		kind: "空",
		detail: `旬空${chart.meta.xunKong.join("")}，力量虚、事多空`,
		weight: -16
	});
	return flags;
}
function healthInvert(palace, eventId) {
	if (eventId !== "health") return 0;
	let n = 0;
	if (palace.star === "天芮" && (palace.isKong || palace.ruMu)) n += 12;
	if (palace.star === "天芮" && palace.changsheng === "帝旺") n -= 10;
	if (palace.gate === "生门") n += 8;
	if (palace.gate === "死门" && !palace.isKong) n -= 8;
	return n;
}
function romanceBath(palace, eventId) {
	if (eventId !== "romance") return 0;
	if (palace.changsheng === "沐浴") return 10;
	if (palace.god === "六合" || palace.god === "太阴") return 0;
	return 0;
}
function scoreEvent(chart, eventId, opts) {
	const def = EVENT_MAP[eventId];
	const palaceId = def.yongShen === "zhifu" ? chart.meta.zhiFuPalace : findPalaceBy(chart, def.yongShen, def.target);
	const palace = chart.palaces[palaceId];
	const factors = [];
	const godW = (palace.god ? GOD_BASE[palace.god] ?? 0 : 0) + (palace.god ? def.godBias[palace.god] ?? 0 : 0);
	factors.push({
		key: "god",
		label: "神 · 开始",
		detail: palace.god ? `${palace.god}临${palace.bagua}` : "中宫无神",
		weight: godW,
		phase: "start"
	});
	const starW = (STAR_BASE[palace.star] ?? 0) + (def.starBias[palace.star] ?? 0);
	factors.push({
		key: "star",
		label: "星 · 过程",
		detail: `${palace.star}（${STAR_ELEMENT[palace.star] ?? ""}）`,
		weight: starW,
		phase: "process"
	});
	const gateW = palace.gate ? (GATE_BASE[palace.gate] ?? 0) + (def.gateBias[palace.gate] ?? 0) : -4;
	factors.push({
		key: "gate",
		label: "门 · 结束",
		detail: palace.gate ? `${palace.gate}（${GATE_ELEMENT[palace.gate]}）` : "中宫无门",
		weight: gateW,
		phase: "end"
	});
	const stemW = STEM_BASE[palace.heavenStem] ?? 0;
	factors.push({
		key: "stem",
		label: "天盘干",
		detail: `${palace.heavenStem}临${palace.bagua}，地盘${palace.earthStem}`,
		weight: stemW,
		phase: "aux"
	});
	if (palace.changsheng) {
		let cs = CHANGSHENG_SCORE[palace.changsheng] ?? 0;
		if (eventId === "romance" && palace.changsheng === "沐浴") cs = 8;
		factors.push({
			key: "cs",
			label: "十二长生",
			detail: `${palace.heavenStem}在${palace.branch}为${palace.changsheng}`,
			weight: cs,
			phase: "process"
		});
	}
	const wang = seasonWang(GATE_ELEMENT[palace.gate ?? ""] ?? palace.element, chart.pillars.month.branch);
	if (wang) factors.push({
		key: "season",
		label: "月令旺衰",
		detail: `月支${chart.pillars.month.branch}，用神得令${wang > 0 ? "旺相" : "囚死"}`,
		weight: wang,
		phase: "aux"
	});
	const flags = ganzhiFlags(chart, palace);
	for (const f of flags) factors.push({
		key: `gz-${f.label}`,
		label: f.label,
		detail: f.detail,
		weight: f.weight,
		phase: "aux"
	});
	const patterns = detectClassicPatterns(chart, palace);
	for (const p of patterns) factors.push({
		key: `pt-${p.name}`,
		label: p.name,
		detail: p.detail,
		weight: p.weight,
		phase: p.name === "伏吟" || p.name === "反吟" ? "process" : "end"
	});
	const hi = healthInvert(palace, eventId);
	if (hi) factors.push({
		key: "health-inv",
		label: "病气旺衰",
		detail: hi > 0 ? "病星空墓，病气衰减，利于康复" : "病星得地，需防加重",
		weight: hi,
		phase: "process"
	});
	const rb = romanceBath(palace, eventId);
	if (rb) factors.push({
		key: "peach",
		label: "桃花沐浴",
		detail: "沐浴主桃花、情感流动",
		weight: rb,
		phase: "start"
	});
	if (opts?.gender && eventId === "romance") {
		const want = opts.gender === "male" ? "兑" : "乾";
		if (palace.bagua === want || palace.bagua === (opts.gender === "male" ? "坤" : "坎")) factors.push({
			key: "gender-gong",
			label: "宫位应人",
			detail: `${opts.gender === "male" ? "男测妻财看兑坤" : "女测官夫看乾坎"}，宫位相应`,
			weight: 6,
			phase: "aux"
		});
	}
	if (opts?.birthYear) factors.push(...natalFactors(chart, palaceId, opts.birthYear));
	const start = factors.filter((f) => f.phase === "start").reduce((s, f) => s + f.weight, 0);
	const process = factors.filter((f) => f.phase === "process").reduce((s, f) => s + f.weight, 0);
	const end = factors.filter((f) => f.phase === "end").reduce((s, f) => s + f.weight, 0);
	const aux = factors.filter((f) => f.phase === "aux").reduce((s, f) => s + f.weight, 0);
	const raw = start * .25 + process * .35 + end * .4 + aux * .55;
	const score = Math.round(clamp(raw, -100, 100));
	const reading = composeReading(chart, palace, def.name, factors, score, {
		start,
		process,
		end
	});
	return enrichEventScore(chart, palace, eventId, {
		eventId,
		name: def.name,
		brief: def.brief,
		palaceId,
		score,
		probability: probabilityOf(score),
		level: luckLevel(score),
		phases: {
			start: {
				score: Math.round(start),
				summary: phaseText("start", palace)
			},
			process: {
				score: Math.round(process),
				summary: phaseText("process", palace)
			},
			end: {
				score: Math.round(end),
				summary: phaseText("end", palace)
			}
		},
		factors: factors.sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight)),
		patterns: patterns.map((p) => p.name),
		reading
	}, patterns);
}
function phaseText(phase, palace) {
	if (phase === "start") {
		const g = palace.god ?? "中宫";
		return {
			值符: "起事得令，宜主动、见贵",
			腾蛇: "起事多疑惊、虚惊反复",
			太阴: "宜暗处谋划，不宜张扬",
			六合: "因人成事，适合会合订约",
			白虎: "起手见刚猛、伤灾或刑克",
			玄武: "起手有暗昧、遗失、盗耗",
			九地: "宜守、宜缓、宜就地生发",
			九天: "宜高举远行、公开进取",
			中宫: "气聚于中，起势不明"
		}[g] ?? g;
	}
	if (phase === "process") return {
		天蓬: "过程浊乱、费力、或有盗耗",
		天芮: "过程迟滞、病困、小人",
		天冲: "过程急躁冲动，宜决不宜拖",
		天辅: "过程得文昌、贵人、策略",
		天禽: "过程中正，枢纽在握",
		天心: "过程有谋、医、管理之象",
		天柱: "过程破耗、口舌、倒塌",
		天任: "过程稳实、可任可托",
		天英: "过程光鲜但火燥，宜防争"
	}[palace.star] ?? palace.star;
	const g = palace.gate ?? "无门";
	return {
		开门: "结局开畅，事业财路可成",
		休门: "结局得休息、贵人、求财平顺",
		生门: "结局有生机、财源、人口之喜",
		伤门: "结局见争伤、破耗，宜止不宜进",
		杜门: "结局闭藏、信息不通，或隐瞒",
		景门: "结局见文书、考试、名闻",
		死门: "结局阻滞、丧败，不宜求进",
		惊门: "结局惊扰反复、口舌不宁",
		无门: "收束于中，结果含混"
	}[g] ?? g;
}
function composeReading(chart, palace, eventName, factors, score, phases) {
	const level = luckLevel(score);
	const top = factors.filter((f) => Math.abs(f.weight) >= 8).slice(0, 4);
	const pos = top.filter((f) => f.weight > 0).map((f) => f.detail);
	const neg = top.filter((f) => f.weight < 0).map((f) => f.detail);
	const kong = palace.isKong ? "用神落空，事易有名无实，宜待填实或改时。" : "";
	const startTone = phases.start >= 4 ? "开始较顺" : phases.start <= -4 ? "起手不畅" : "起手平常";
	const midTone = phases.process >= 4 ? "过程可推进" : phases.process <= -4 ? "过程多阻" : "过程平平";
	const endTone = phases.end >= 4 ? "收局有望" : phases.end <= -4 ? "收局乏力" : "收局两可";
	const help = pos.length ? `有利：${pos.join("；")}。` : "";
	const harm = neg.length ? `不利：${neg.join("；")}。` : "";
	return `问「${eventName}」，用神在${palace.bagua}${palace.id}宫（${palace.direction}），天${palace.heavenStem}地${palace.earthStem}，${palace.god ?? "无神"}、${palace.star}、${palace.gate ?? "无门"}。综合${level}（${score > 0 ? "+" : ""}${score}）。神星门分看：${startTone}，${midTone}，${endTone}。日柱${chart.pillars.day.name}、时柱${chart.pillars.hour.name}。${help}${harm}${kong}此为盘面权重模型，宜作决策参考，勿当作唯一依据。`;
}
function scoreAllEvents(chart, opts) {
	return EVENTS.map((e) => scoreEvent(chart, e.id, opts)).sort((a, b) => b.score - a.score);
}
var KIND_LABEL = {
	lover: "恋人/配偶",
	teacher: "老师/贵人",
	partner: "合伙人",
	parent: "父母长辈",
	child: "晚辈子女",
	boss: "上司领导",
	peer: "同僚朋友",
	subordinate: "下属"
};
function peopleRelations(chart, gender) {
	const self = chart.palaces[chart.meta.zhiFuPalace];
	const selfEl = self.element;
	const links = [];
	for (const id of RING) {
		if (id === self.id) continue;
		const p = chart.palaces[id];
		const rel = wuxingRelation(selfEl, p.element) ?? "同我";
		const kinds = [];
		if (rel === "生我") kinds.push("teacher", "parent", "boss");
		if (rel === "我生") kinds.push("child", "subordinate");
		if (rel === "我克") kinds.push(gender === "male" ? "lover" : "subordinate", "partner");
		if (rel === "克我") kinds.push(gender === "female" ? "lover" : "boss");
		if (rel === "同我") kinds.push("peer", "partner");
		if (p.bagua === "兑" || p.bagua === "离" || p.bagua === "坤") {
			if (gender === "male" && !kinds.includes("lover")) kinds.push("lover");
		}
		if (p.bagua === "乾" || p.bagua === "坎" || p.bagua === "震") {
			if (gender === "female" && !kinds.includes("lover")) kinds.push("lover");
		}
		if (p.bagua === "巽") kinds.push("teacher");
		if (p.bagua === "乾") kinds.push("boss", "parent");
		const gateW = p.gate ? GATE_BASE[p.gate] ?? 0 : 0;
		const starW = STAR_BASE[p.star] ?? 0;
		const godW = p.god ? GOD_BASE[p.god] ?? 0 : 0;
		const extra = (p.isKong ? -14 : 0) + (p.ruMu ? -8 : 0) + (p.menPo ? -6 : 0) + (p.fuYin ? -4 : 0);
		const he = BRANCH_SIX_HE[self.branch] === p.branch ? 10 : 0;
		const chong = BRANCH_CHONG[self.branch] === p.branch ? -12 : 0;
		const score = Math.round(clamp((gateW + starW + godW) * .45 + extra + he + chong, -80, 80));
		const sixKin = rel === "生我" ? "父母" : rel === "我生" ? "子孙" : rel === "克我" ? "官鬼" : rel === "我克" ? "妻财" : "兄弟";
		const summary = `${p.bagua}宫${PALACE_META[id].people}。与值符${rel}，六亲属${sixKin}。见${p.god ?? "—"}、${p.star}、${p.gate ?? "无门"}，关系倾向${luckLevel(score)}。${p.isKong ? "落空，关系虚、难落实。" : ""}${he ? "支合，易亲近成事。" : ""}${chong ? "支冲，易争执分离。" : ""}`;
		links.push({
			palaceId: id,
			bagua: p.bagua,
			role: PALACE_META[id].people,
			sixKin,
			relation: rel,
			kinds: [...new Set(kinds)],
			score,
			level: luckLevel(score),
			summary
		});
	}
	return links.sort((a, b) => b.score - a.score);
}
//#endregion
export { ganzhiFlags as A, natalView as B, beijingNow as C, digitRootToJu as D, detectClassicPatterns as E, hourToZhiIndex as F, runWeatherTraining as G, palaceOfEarthBranch as H, luckLevel as I, scoreEvent as J, scoreAllEvents as K, mergeMarks as L, getMyProfile as M, getWeatherMetrics as N, dunFromSolarMonth as O, hourCivil as P, yearMonthTerms as Q, monthBoundary as R, applyTrueSolar as S, buildChart as T, peopleRelations as U, noonCivil as V, probabilityOf as W, useCurrentUserState as X, submitFeedback as Y, yearBoundary as Z, addCivilDays as _, GATE_USES as a, adminListFeedback as b, KIND_LABEL as c, STAR_BASE as d, STAR_SONG as f, UserButton as g, SignedOut as h, GATE_CLASSIC as i, getJuFromLots as j, ensureProfile as k, MONTH_NAMES as l, SignedIn as m, EVENT_CALIBRATION as n, GOD_BASE as o, STEM_GE as p, scoreDirections as q, GATE_BASE as r, HOUR_MIDPOINTS as s, ACTIVITY_META as t, RedirectToSignIn as u, adminDeleteAccount as v, bestDirection as w, adminPurgeOtherAccounts as x, adminListAccounts as y, natalFactors as z };
