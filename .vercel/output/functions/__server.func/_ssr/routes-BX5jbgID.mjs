import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Compass, r as LayoutGrid, t as Users } from "../_libs/lucide-react.mjs";
import { n as HeavenStem, r as SolarTime, t as EarthBranch } from "../_libs/tyme4ts.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BX5jbgID.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var QI_YI = [
	"戊",
	"己",
	"庚",
	"辛",
	"壬",
	"癸",
	"丁",
	"丙",
	"乙"
];
var RING = [
	1,
	8,
	3,
	4,
	9,
	2,
	7,
	6
];
var OPPOSITE = {
	1: 9,
	9: 1,
	2: 8,
	8: 2,
	3: 7,
	7: 3,
	4: 6,
	6: 4,
	5: 5
};
var GODS_YANG = [
	"值符",
	"腾蛇",
	"太阴",
	"六合",
	"白虎",
	"玄武",
	"九地",
	"九天"
];
var GODS_YIN = [
	"值符",
	"九天",
	"九地",
	"玄武",
	"白虎",
	"六合",
	"太阴",
	"腾蛇"
];
var PALACE_META = {
	1: {
		bagua: "坎",
		direction: "北",
		element: "水",
		branch: "子",
		branches: ["子"],
		homeStar: "天蓬",
		homeGate: "休门",
		people: "中男、流动、酒水"
	},
	2: {
		bagua: "坤",
		direction: "西南",
		element: "土",
		branch: "申",
		branches: ["未", "申"],
		homeStar: "天芮",
		homeGate: "死门",
		people: "母亲、妻、众人"
	},
	3: {
		bagua: "震",
		direction: "东",
		element: "木",
		branch: "卯",
		branches: ["卯"],
		homeStar: "天冲",
		homeGate: "伤门",
		people: "长男、上司、开创"
	},
	4: {
		bagua: "巽",
		direction: "东南",
		element: "木",
		branch: "巳",
		branches: ["辰", "巳"],
		homeStar: "天辅",
		homeGate: "杜门",
		people: "长女、老师、文书"
	},
	5: {
		bagua: "中",
		direction: "中",
		element: "土",
		branch: "",
		branches: [],
		homeStar: "天禽",
		homeGate: null,
		people: "自己、核心、枢纽"
	},
	6: {
		bagua: "乾",
		direction: "西北",
		element: "金",
		branch: "亥",
		branches: ["戌", "亥"],
		homeStar: "天心",
		homeGate: "开门",
		people: "父亲、领导、老人"
	},
	7: {
		bagua: "兑",
		direction: "西",
		element: "金",
		branch: "酉",
		branches: ["酉"],
		homeStar: "天柱",
		homeGate: "惊门",
		people: "少女、口舌、朋友"
	},
	8: {
		bagua: "艮",
		direction: "东北",
		element: "土",
		branch: "寅",
		branches: ["丑", "寅"],
		homeStar: "天任",
		homeGate: "生门",
		people: "少男、山止、晚辈"
	},
	9: {
		bagua: "离",
		direction: "南",
		element: "火",
		branch: "午",
		branches: ["午"],
		homeStar: "天英",
		homeGate: "景门",
		people: "中女、文书、名誉"
	}
};
var BOARD_ORDER = [
	4,
	9,
	2,
	3,
	5,
	7,
	8,
	1,
	6
];
/** 拆补法：节气 index 0=冬至 … 23=大雪 → [上元, 中元, 下元] */
var JU_BY_TERM = {
	0: [
		1,
		7,
		4
	],
	1: [
		2,
		8,
		5
	],
	2: [
		3,
		9,
		6
	],
	3: [
		8,
		5,
		2
	],
	4: [
		9,
		6,
		3
	],
	5: [
		1,
		7,
		4
	],
	6: [
		3,
		9,
		6
	],
	7: [
		4,
		1,
		7
	],
	8: [
		5,
		2,
		8
	],
	9: [
		4,
		1,
		7
	],
	10: [
		5,
		2,
		8
	],
	11: [
		6,
		3,
		9
	],
	12: [
		9,
		3,
		6
	],
	13: [
		8,
		2,
		5
	],
	14: [
		7,
		1,
		4
	],
	15: [
		2,
		5,
		8
	],
	16: [
		1,
		4,
		7
	],
	17: [
		9,
		3,
		6
	],
	18: [
		7,
		1,
		4
	],
	19: [
		6,
		9,
		3
	],
	20: [
		5,
		8,
		2
	],
	21: [
		6,
		9,
		3
	],
	22: [
		5,
		8,
		2
	],
	23: [
		4,
		7,
		1
	]
};
var STEM_ELEMENT = {
	甲: "木",
	乙: "木",
	丙: "火",
	丁: "火",
	戊: "土",
	己: "土",
	庚: "金",
	辛: "金",
	壬: "水",
	癸: "水"
};
var GATE_ELEMENT = {
	休门: "水",
	生门: "土",
	伤门: "木",
	杜门: "木",
	景门: "火",
	死门: "土",
	惊门: "金",
	开门: "金"
};
var STAR_ELEMENT = {
	天蓬: "水",
	天芮: "土",
	天冲: "木",
	天辅: "木",
	天禽: "土",
	天心: "金",
	天柱: "金",
	天任: "土",
	天英: "火"
};
var BRANCH_SIX_HE = {
	子: "丑",
	丑: "子",
	寅: "亥",
	亥: "寅",
	卯: "戌",
	戌: "卯",
	辰: "酉",
	酉: "辰",
	巳: "申",
	申: "巳",
	午: "未",
	未: "午"
};
var BRANCH_CHONG = {
	子: "午",
	午: "子",
	丑: "未",
	未: "丑",
	寅: "申",
	申: "寅",
	卯: "酉",
	酉: "卯",
	辰: "戌",
	戌: "辰",
	巳: "亥",
	亥: "巳"
};
var BRANCH_HAI = {
	子: "未",
	未: "子",
	丑: "午",
	午: "丑",
	寅: "巳",
	巳: "寅",
	卯: "辰",
	辰: "卯",
	申: "亥",
	亥: "申",
	酉: "戌",
	戌: "酉"
};
var XING_GROUPS = [
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
];
var SELF_XING = /* @__PURE__ */ new Set([
	"辰",
	"午",
	"酉",
	"亥"
]);
var STEM_HE = {
	甲: "己",
	己: "甲",
	乙: "庚",
	庚: "乙",
	丙: "辛",
	辛: "丙",
	丁: "壬",
	壬: "丁",
	戊: "癸",
	癸: "戊"
};
var STEM_CHONG = {
	甲: "庚",
	庚: "甲",
	乙: "辛",
	辛: "乙",
	丙: "壬",
	壬: "丙",
	丁: "癸",
	癸: "丁"
};
var CHANGSHENG_SCORE = {
	长生: 10,
	沐浴: -3,
	冠带: 5,
	临官: 12,
	帝旺: 14,
	衰: -2,
	病: -8,
	死: -12,
	墓: -10,
	绝: -14,
	胎: 2,
	养: 4
};
var GATE_BASE = {
	生门: 22,
	开门: 20,
	休门: 14,
	景门: 6,
	杜门: -4,
	惊门: -10,
	伤门: -12,
	死门: -20
};
var STAR_BASE = {
	天辅: 16,
	天心: 16,
	天任: 12,
	天冲: 10,
	天禽: 14,
	天英: 2,
	天柱: -8,
	天芮: -12,
	天蓬: -14
};
var GOD_BASE = {
	值符: 18,
	九天: 14,
	九地: 10,
	太阴: 12,
	六合: 12,
	腾蛇: -10,
	白虎: -12,
	玄武: -10
};
var STEM_BASE = {
	乙: 12,
	丙: 14,
	丁: 13,
	戊: 8,
	己: 4,
	庚: -8,
	辛: 0,
	壬: 2,
	癸: -2,
	甲: 10
};
var JI_MEN = /* @__PURE__ */ new Set([
	"开门",
	"休门",
	"生门"
]);
var XIONG_MEN = /* @__PURE__ */ new Set([
	"伤门",
	"杜门",
	"死门",
	"惊门"
]);
var JI_GOD = /* @__PURE__ */ new Set([
	"值符",
	"九天",
	"九地",
	"太阴",
	"六合"
]);
var SAN_QI = /* @__PURE__ */ new Set([
	"乙",
	"丙",
	"丁"
]);
var HOUR_NAMES = [
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
];
var CITIES = [
	{
		id: "beijing",
		name: "北京",
		lng: 116.4
	},
	{
		id: "shanghai",
		name: "上海",
		lng: 121.47
	},
	{
		id: "guangzhou",
		name: "广州",
		lng: 113.27
	},
	{
		id: "chengdu",
		name: "成都",
		lng: 104.07
	},
	{
		id: "xian",
		name: "西安",
		lng: 108.94
	},
	{
		id: "wuhan",
		name: "武汉",
		lng: 114.31
	},
	{
		id: "nanjing",
		name: "南京",
		lng: 118.8
	},
	{
		id: "hangzhou",
		name: "杭州",
		lng: 120.16
	},
	{
		id: "shenyang",
		name: "沈阳",
		lng: 123.43
	},
	{
		id: "haerbin",
		name: "哈尔滨",
		lng: 126.53
	},
	{
		id: "wulumuqi",
		name: "乌鲁木齐",
		lng: 87.62
	},
	{
		id: "lasa",
		name: "拉萨",
		lng: 91.11
	},
	{
		id: "hongkong",
		name: "香港",
		lng: 114.17
	},
	{
		id: "taipei",
		name: "台北",
		lng: 121.57
	},
	{
		id: "frankfurt",
		name: "法兰克福",
		lng: 8.68
	}
];
var EVENTS = [
	{
		id: "wealth",
		name: "求财经营",
		brief: "生门主财，开门主经营。看财来得正不正、过门顺不顺。",
		yongShen: "gate",
		target: "生门",
		secondary: {
			kind: "gate",
			name: "开门"
		},
		gateBias: {
			生门: 14,
			开门: 10,
			休门: 4,
			景门: 2,
			死门: -10,
			杜门: -6
		},
		starBias: {
			天任: 8,
			天心: 6,
			天芮: -6,
			天蓬: -8
		},
		godBias: {
			六合: 8,
			太阴: 6,
			九地: 4,
			白虎: -8,
			玄武: -6
		}
	},
	{
		id: "career",
		name: "事业官运",
		brief: "开门、值符、九天主事业与名位，宜见天心、天辅。",
		yongShen: "gate",
		target: "开门",
		secondary: {
			kind: "god",
			name: "值符"
		},
		gateBias: {
			开门: 14,
			休门: 6,
			生门: 6,
			伤门: -6,
			死门: -10
		},
		starBias: {
			天心: 10,
			天辅: 8,
			天冲: 4,
			天柱: -8
		},
		godBias: {
			值符: 10,
			九天: 10,
			白虎: -4,
			腾蛇: -6
		}
	},
	{
		id: "job",
		name: "求职升迁",
		brief: "以值符为自己，开门为出路。贵人看九天、天辅。",
		yongShen: "zhifu",
		target: "值符",
		secondary: {
			kind: "gate",
			name: "开门"
		},
		gateBias: {
			开门: 12,
			休门: 8,
			生门: 6,
			杜门: -8,
			死门: -10
		},
		starBias: {
			天辅: 10,
			天心: 10,
			天冲: 6,
			天芮: -8
		},
		godBias: {
			值符: 8,
			九天: 12,
			太阴: 4,
			玄武: -6
		}
	},
	{
		id: "romance",
		name: "婚姻感情",
		brief: "六合主婚姻，太阴主私情。兑离坤宫看男女。沐浴反为桃花。",
		yongShen: "god",
		target: "六合",
		secondary: {
			kind: "god",
			name: "太阴"
		},
		gateBias: {
			休门: 8,
			生门: 8,
			开门: 6,
			景门: 4,
			伤门: -8,
			惊门: -8,
			死门: -12
		},
		starBias: {
			天任: 6,
			天英: 6,
			天冲: 4,
			天蓬: -8,
			天柱: -6
		},
		godBias: {
			六合: 14,
			太阴: 12,
			腾蛇: -8,
			白虎: -10,
			玄武: -6
		}
	},
	{
		id: "study",
		name: "考试学业",
		brief: "天辅主文昌，景门主文书考试，值符主本人状态。",
		yongShen: "star",
		target: "天辅",
		secondary: {
			kind: "gate",
			name: "景门"
		},
		gateBias: {
			景门: 12,
			开门: 8,
			休门: 6,
			杜门: -4,
			伤门: -6
		},
		starBias: {
			天辅: 14,
			天心: 10,
			天英: 6,
			天蓬: -8,
			天柱: -6
		},
		godBias: {
			值符: 8,
			九天: 8,
			太阴: 6,
			腾蛇: -4
		}
	},
	{
		id: "health",
		name: "健康疾病",
		brief: "天芮主病，死门主危。病星入墓、空亡则衰；生门旺则复。",
		yongShen: "star",
		target: "天芮",
		secondary: {
			kind: "gate",
			name: "死门"
		},
		gateBias: {
			生门: 10,
			休门: 8,
			开门: 6,
			死门: -14,
			伤门: -8,
			惊门: -6
		},
		starBias: {
			天任: 8,
			天禽: 6,
			天芮: -10,
			天蓬: -8,
			天英: -4
		},
		godBias: {
			九地: 6,
			值符: 4,
			白虎: -10,
			玄武: -6,
			腾蛇: -6
		}
	},
	{
		id: "travel",
		name: "出行远行",
		brief: "开门、九天主出行。杜门滞留，死门不宜远行。",
		yongShen: "gate",
		target: "开门",
		secondary: {
			kind: "god",
			name: "九天"
		},
		gateBias: {
			开门: 14,
			生门: 8,
			景门: 6,
			休门: 4,
			杜门: -10,
			死门: -12
		},
		starBias: {
			天冲: 8,
			天心: 6,
			天辅: 4,
			天柱: -6,
			天芮: -6
		},
		godBias: {
			九天: 14,
			值符: 6,
			九地: -4,
			玄武: -6,
			白虎: -8
		}
	},
	{
		id: "lawsuit",
		name: "诉讼纠纷",
		brief: "伤门主争，白虎主刑。己方宜值符、九天制住伤门。",
		yongShen: "gate",
		target: "伤门",
		secondary: {
			kind: "god",
			name: "白虎"
		},
		gateBias: {
			开门: 8,
			休门: 6,
			伤门: -6,
			死门: -10,
			惊门: -8
		},
		starBias: {
			天心: 8,
			天冲: 4,
			天柱: -8,
			天蓬: -8,
			天芮: -6
		},
		godBias: {
			值符: 10,
			九天: 8,
			白虎: -10,
			玄武: -6,
			腾蛇: -8
		}
	},
	{
		id: "partner",
		name: "合作合伙",
		brief: "六合主合作，生门主共利。宜合不宜冲，忌白虎、惊门。",
		yongShen: "god",
		target: "六合",
		secondary: {
			kind: "gate",
			name: "生门"
		},
		gateBias: {
			生门: 12,
			开门: 8,
			休门: 6,
			惊门: -10,
			伤门: -8,
			杜门: -6
		},
		starBias: {
			天任: 8,
			天辅: 6,
			天心: 6,
			天蓬: -6,
			天柱: -6
		},
		godBias: {
			六合: 14,
			太阴: 6,
			值符: 4,
			白虎: -10,
			腾蛇: -6
		}
	},
	{
		id: "property",
		name: "置业搬家",
		brief: "生门主房产生机，九地主田宅。宜生开，忌死杜。",
		yongShen: "gate",
		target: "生门",
		secondary: {
			kind: "god",
			name: "九地"
		},
		gateBias: {
			生门: 14,
			开门: 8,
			休门: 4,
			死门: -12,
			杜门: -8,
			伤门: -6
		},
		starBias: {
			天任: 10,
			天芮: -4,
			天禽: 6,
			天冲: 2
		},
		godBias: {
			九地: 12,
			六合: 6,
			太阴: 4,
			白虎: -8,
			玄武: -4
		}
	},
	{
		id: "negotiate",
		name: "谈判签约",
		brief: "六合、太阴主密约成事，开门主公开协议。忌惊门反复。",
		yongShen: "god",
		target: "六合",
		secondary: {
			kind: "god",
			name: "太阴"
		},
		gateBias: {
			开门: 10,
			休门: 8,
			生门: 6,
			惊门: -10,
			伤门: -8,
			杜门: -4
		},
		starBias: {
			天辅: 8,
			天心: 8,
			天任: 4,
			天冲: 2,
			天柱: -6
		},
		godBias: {
			六合: 12,
			太阴: 10,
			值符: 6,
			腾蛇: -8,
			白虎: -6
		}
	},
	{
		id: "find",
		name: "寻人寻物",
		brief: "杜门主隐藏，玄武主走失。落空、入墓则难寻；生开则现。",
		yongShen: "gate",
		target: "杜门",
		secondary: {
			kind: "god",
			name: "玄武"
		},
		gateBias: {
			开门: 8,
			生门: 6,
			景门: 4,
			杜门: -4,
			死门: -8,
			休门: 2
		},
		starBias: {
			天辅: 6,
			天冲: 4,
			天蓬: -6,
			天芮: -6
		},
		godBias: {
			九天: 8,
			值符: 6,
			玄武: -8,
			腾蛇: -6,
			太阴: 4
		}
	}
];
var EVENT_MAP = Object.fromEntries(EVENTS.map((e) => [e.id, e]));
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
function yearStemOf(year) {
	return SolarTime.fromYmdHms(year, 6, 15, 12, 0, 0).getLunarHour().getEightChar().getYear().getHeavenStem().getName();
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
	return RING[(RING.indexOf(from) + (yang ? 1 : -1) * steps + 16) % 8];
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
function buildChart(civil) {
	const pillars = getFourPillars(civil);
	const ju = getJu(civil);
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
function detectPatterns(palace) {
	const out = [];
	const { heavenStem: gan, gate, god, star } = palace;
	if (gan && SAN_QI.has(gan) && gate && JI_MEN.has(gate) && god && JI_GOD.has(god)) out.push({
		name: "三奇得使",
		weight: 16,
		detail: `${gan}奇临${gate}、${god}，贵气成格`
	});
	if (gan === "丙" && gate === "开门" && god === "九天") out.push({
		name: "天遁",
		weight: 14,
		detail: "丙奇开门九天，利于公开进取、名位"
	});
	if (gan === "乙" && (gate === "生门" || god === "九地")) out.push({
		name: "地遁",
		weight: 10,
		detail: "乙奇得地，利于置业、藏形、求财落地"
	});
	if (gan === "丁" && god === "太阴" && (gate === "休门" || gate === "开门")) out.push({
		name: "人遁",
		weight: 12,
		detail: "丁奇太阴，利于密谋、文书、求人"
	});
	if (palace.fuYin) out.push({
		name: "伏吟",
		weight: -8,
		detail: "天盘地盘同，事多稽留反复"
	});
	if (palace.fanYin) out.push({
		name: "反吟",
		weight: -6,
		detail: "对冲之象，变动大、难安定"
	});
	if (palace.menPo) out.push({
		name: "门迫",
		weight: -9,
		detail: "门克宫，行动受阻、力不从心"
	});
	if (palace.gongPo) out.push({
		name: "宫迫",
		weight: -5,
		detail: "宫克门，环境压过行动"
	});
	if (palace.ruMu) out.push({
		name: "入墓",
		weight: -10,
		detail: `${palace.changsheng}，气收藏、难发用`
	});
	if (palace.isMa) out.push({
		name: "驿马",
		weight: 4,
		detail: "马星入宫，主移动、出行、变动"
	});
	if (star === "天辅" && gate === "景门") out.push({
		name: "文昌会景",
		weight: 8,
		detail: "利于考试、文书、发表"
	});
	return out;
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
	let palaceId = def.yongShen === "zhifu" ? chart.meta.zhiFuPalace : findPalaceBy(chart, def.yongShen, def.target);
	if (opts?.birthYear) {
		const ys = yearStemOf(opts.birthYear);
		if (eventId === "job" || eventId === "career" || eventId === "health") palaceId = findStemOnHeaven(chart, ys);
	}
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
	const patterns = detectPatterns(palace);
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
	return {
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
	};
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
var defaultCivil = {
	year: 2026,
	month: 8,
	day: 28,
	hour: 12,
	minute: 0
};
var useAppStore = create()(persist((set, get) => ({
	civil: defaultCivil,
	trueSolar: false,
	cityId: "beijing",
	mode: "scan",
	tab: "events",
	personName: "",
	gender: "male",
	birthYear: "",
	eventId: "wealth",
	selectedPalace: null,
	setCivil: (civil) => set({ civil }),
	setField: (key, value) => set({ [key]: value }),
	useNow: () => set({ civil: beijingNow() }),
	resolvedCivil: () => {
		const { civil, trueSolar, cityId } = get();
		if (!trueSolar) return civil;
		return applyTrueSolar(civil, (CITIES.find((c) => c.id === cityId) ?? CITIES[0]).lng);
	},
	compute: () => {
		const s = get();
		const chart = buildChart(s.resolvedCivil());
		const birthYear = s.birthYear.trim() ? Number(s.birthYear) : null;
		const opts = {
			gender: s.gender,
			birthYear: birthYear && birthYear >= 1920 && birthYear <= 2030 ? birthYear : null
		};
		return {
			chart,
			events: scoreAllEvents(chart, opts),
			focus: scoreEvent(chart, s.eventId, opts),
			people: peopleRelations(chart, s.gender)
		};
	}
}), {
	name: "qimen-weigh-query",
	partialize: (s) => ({
		civil: s.civil,
		trueSolar: s.trueSolar,
		cityId: s.cityId,
		mode: s.mode,
		personName: s.personName,
		gender: s.gender,
		birthYear: s.birthYear,
		eventId: s.eventId
	})
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,border-color] duration-150 ease-out disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg hover:opacity-90 active:scale-[0.98]",
			secondary: "bg-elevated text-fg border border-border hover:border-border-strong",
			ghost: "text-muted hover:text-fg hover:bg-elevated",
			outline: "border border-border bg-transparent text-fg hover:bg-elevated"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function pad(n) {
	return String(n).padStart(2, "0");
}
function QueryForm() {
	const civil = useAppStore((s) => s.civil);
	const setCivil = useAppStore((s) => s.setCivil);
	const trueSolar = useAppStore((s) => s.trueSolar);
	const cityId = useAppStore((s) => s.cityId);
	const mode = useAppStore((s) => s.mode);
	const setField = useAppStore((s) => s.setField);
	const useNow = useAppStore((s) => s.useNow);
	const personName = useAppStore((s) => s.personName);
	const gender = useAppStore((s) => s.gender);
	const birthYear = useAppStore((s) => s.birthYear);
	const eventId = useAppStore((s) => s.eventId);
	const dateValue = `${civil.year}-${pad(civil.month)}-${pad(civil.day)}`;
	const timeValue = `${pad(civil.hour)}:${pad(civil.minute)}`;
	const zhiIdx = hourToZhiIndex(civil.hour);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-[var(--shadow-panel)] sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-sm text-fg",
					children: "起盘"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-xs text-muted",
					children: "时间用北京时间。时辰一换，盘面与权重即变。"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex rounded-md border border-border bg-elevated p-0.5",
					children: [["scan", "全盘扫描"], ["ask", "定向问事"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setField("mode", id),
						className: cn("h-10 rounded-sm px-3 text-sm transition-colors", mode === id ? "bg-primary text-primary-fg" : "text-muted hover:text-fg"),
						children: label
					}, id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "col-span-2 flex min-h-11 flex-col gap-1 text-xs text-muted sm:col-span-1",
						children: ["日期", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: dateValue,
							onChange: (e) => {
								const [y, m, d] = e.target.value.split("-").map(Number);
								if (y && m && d) setCivil({
									...civil,
									year: y,
									month: m,
									day: d
								});
							},
							className: "h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 flex-col gap-1 text-xs text-muted",
						children: ["时刻", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "time",
							value: timeValue,
							onChange: (e) => {
								const [h, mi] = e.target.value.split(":").map(Number);
								if (Number.isFinite(h) && Number.isFinite(mi)) setCivil({
									...civil,
									hour: h,
									minute: mi
								});
							},
							className: "h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							className: "w-full",
							onClick: useNow,
							children: "此刻"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: trueSolar,
							onChange: (e) => setField("trueSolar", e.target.checked),
							className: "size-4 accent-primary"
						}), "真太阳时"]
					})
				]
			}),
			trueSolar ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 flex flex-col gap-1 text-xs text-muted",
				children: ["城市经度（近似真太阳时，未计均时差）", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: cityId,
					onChange: (e) => setField("cityId", e.target.value),
					className: "h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring",
					children: CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: c.id,
						children: [
							c.name,
							" · ",
							c.lng,
							"°E"
						]
					}, c.id))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs text-muted",
					children: "时辰"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-6 gap-1.5 sm:grid-cols-12",
					children: HOUR_NAMES.map((name, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setCivil({
							...civil,
							hour: (i * 2 + 23) % 24,
							minute: 30
						}),
						className: cn("h-10 rounded-md border font-display text-sm transition-colors", zhiIdx === i ? "border-primary bg-primary text-primary-fg" : "border-border bg-elevated text-muted hover:text-fg"),
						children: name
					}, name))
				})]
			}),
			mode === "ask" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1 text-xs text-muted",
						children: ["称呼", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: personName,
							onChange: (e) => setField("personName", e.target.value),
							placeholder: "可空",
							className: "h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none placeholder:text-subtle focus:border-ring"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1 text-xs text-muted",
						children: ["性别", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: gender,
							onChange: (e) => setField("gender", e.target.value),
							className: "h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "male",
								children: "男"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "female",
								children: "女"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1 text-xs text-muted",
						children: ["出生年（年命）", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							inputMode: "numeric",
							value: birthYear,
							onChange: (e) => setField("birthYear", e.target.value.replace(/[^\d]/g, "").slice(0, 4)),
							placeholder: "如 1992",
							className: "h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none placeholder:text-subtle focus:border-ring"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1 text-xs text-muted",
						children: ["所问之事", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: eventId,
							onChange: (e) => setField("eventId", e.target.value),
							className: "h-11 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring",
							children: EVENTS.map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: ev.id,
								children: ev.name
							}, ev.id))
						})]
					})
				]
			}) : null
		]
	});
}
function Badge({ className, tone = "neutral", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-sm px-1.5 py-0.5 text-[11px] font-medium tracking-wide", tone === "neutral" && "bg-elevated text-muted", tone === "good" && "bg-auspicious/15 text-auspicious-fg", tone === "bad" && "bg-inauspicious/15 text-inauspicious-fg", tone === "warn" && "bg-warn/15 text-warn", className),
		children
	});
}
function gateTone(gate) {
	if (!gate) return "neutral";
	if (JI_MEN.has(gate)) return "good";
	if (XIONG_MEN.has(gate)) return "bad";
	return "neutral";
}
function Cell({ palace, active, onSelect }) {
	const isCenter = palace.id === 5;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onSelect(palace.id),
		className: cn("luoshu-grid relative flex min-h-[118px] flex-col items-stretch rounded-md border p-2 text-left transition-[border-color,background-color] sm:min-h-[132px] sm:p-2.5", active ? "border-primary bg-elevated" : "border-border bg-surface hover:border-border-strong", palace.isZhiFu && "ring-1 ring-primary/40", isCenter && "bg-elevated"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-display text-sm text-fg",
					children: [palace.bagua, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1 text-xs text-muted",
						children: palace.id
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] text-subtle",
					children: palace.direction
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex flex-wrap gap-1",
				children: [
					palace.god ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: palace.god }) : null,
					palace.isZhiFu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "warn",
						children: "值符"
					}) : null,
					palace.isKong ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "bad",
						children: "空"
					}) : null,
					palace.isMa ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "warn",
						children: "马"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto grid grid-cols-2 gap-x-2 pt-2 text-[11px] leading-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: ["星 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: palace.star
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: [
							"门",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn(gateTone(palace.gate) === "good" && "text-auspicious-fg", gateTone(palace.gate) === "bad" && "text-inauspicious-fg", gateTone(palace.gate) === "neutral" && "text-fg"),
								children: palace.gate ?? "—"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: ["天 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-fg",
							children: palace.heavenStem
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: ["地 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-fg",
							children: palace.earthStem
						})]
					})
				]
			}),
			palace.changsheng ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute right-2 bottom-2 text-[10px] text-subtle",
				children: palace.changsheng
			}) : null
		]
	});
}
function QimenBoard({ chart, selected, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex flex-wrap items-end justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg text-fg",
				children: "洛书九宫"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					chart.ju.label,
					" · 旬首",
					chart.meta.xunShou,
					"（",
					chart.meta.xunYi,
					"）· 空亡",
					chart.meta.xunKong.join(""),
					" · 值使",
					chart.meta.zhiShiGate,
					chart.meta.fuYin ? " · 伏吟" : "",
					chart.meta.fanYin ? " · 反吟" : ""
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-subtle",
				children: "南上北下 · 点宫查看"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 gap-1.5 sm:gap-2",
			children: BOARD_ORDER.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
				palace: chart.palaces[id],
				active: selected === id,
				onSelect
			}, id))
		}),
		selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PalaceDetail, { palace: chart.palaces[selected] }) : null
	] });
}
function PalaceDetail({ palace }) {
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
		palace.isZhiShi && "值使"
	].filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 rounded-lg border border-border bg-elevated p-3 text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-fg",
				children: [
					palace.bagua,
					palace.id,
					"宫 · ",
					palace.direction,
					" · ",
					palace.element
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: meta.people
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs leading-6 text-muted",
				children: [
					"神 ",
					palace.god ?? "—",
					"　星 ",
					palace.star,
					"　门 ",
					palace.gate ?? "—",
					"　天",
					palace.heavenStem,
					" 地",
					palace.earthStem,
					palace.changsheng ? `　长生 ${palace.changsheng}` : ""
				]
			}),
			flags.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex flex-wrap gap-1",
				children: flags.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: [
						"空亡",
						"门迫",
						"入墓",
						"反吟",
						"伏吟"
					].includes(f) ? "bad" : "warn",
					children: f
				}, f))
			}) : null
		]
	});
}
function toneOf(level) {
	if (level.includes("吉")) return "good";
	if (level.includes("凶")) return "bad";
	return "warn";
}
function ScoreMeter({ score }) {
	const pct = Math.round((score + 100) / 200 * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-1.5 w-full overflow-hidden rounded-full bg-elevated",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full transition-[width] duration-300", score >= 6 ? "bg-auspicious" : score <= -6 ? "bg-inauspicious" : "bg-warn"),
			style: { width: `${pct}%` }
		})
	});
}
function EventList({ events, activeId, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-col gap-1.5",
		children: events.map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onPick(ev.eventId),
			className: cn("flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-colors", activeId === ev.eventId ? "border-primary bg-elevated" : "border-border bg-surface hover:border-border-strong"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-fg",
						children: ev.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs tabular-nums text-muted",
						children: [ev.score > 0 ? "+" : "", ev.score]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1.5 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreMeter, { score: ev.score }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: toneOf(ev.level),
						children: ev.level
					})]
				})]
			})
		}) }, ev.eventId))
	});
}
function EventDetail({ score, chart, personName }) {
	const palace = chart.palaces[score.palaceId];
	const who = personName?.trim() ? `${personName} · ` : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-display text-lg text-fg",
					children: [who, score.name]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: score.brief
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-2xl tabular-nums text-fg",
							children: [score.score > 0 ? "+" : "", score.score]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								"顺利倾向 ",
								score.probability,
								"%"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: toneOf(score.level),
							className: "mt-1",
							children: score.level
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs text-muted",
				children: [
					"用神 ",
					palace.bagua,
					palace.id,
					"宫 · ",
					palace.god ?? "无神",
					" / ",
					palace.star,
					" / ",
					palace.gate ?? "无门"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-3 gap-2",
				children: [
					["开始 · 神", score.phases.start],
					["过程 · 星", score.phases.process],
					["收局 · 门", score.phases.end]
				].map(([label, ph]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-border bg-elevated p-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-subtle",
							children: label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: cn("mt-1 font-mono text-sm tabular-nums", ph.score >= 4 ? "text-auspicious-fg" : ph.score <= -4 ? "text-inauspicious-fg" : "text-fg"),
							children: [ph.score > 0 ? "+" : "", ph.score]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[11px] leading-4 text-muted",
							children: ph.summary
						})
					]
				}, label))
			}),
			score.patterns.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-1",
				children: score.patterns.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "warn",
					children: p
				}, p))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-7 text-fg",
				children: score.reading
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "mt-5 font-display text-sm text-fg",
				children: "权重拆解"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 divide-y divide-border",
				children: score.factors.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start justify-between gap-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-fg",
							children: [f.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-subtle",
								children: f.phase === "start" ? "始" : f.phase === "process" ? "中" : f.phase === "end" ? "终" : "辅"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted",
							children: f.detail
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: cn("shrink-0 font-mono text-xs tabular-nums", f.weight > 0 ? "text-auspicious-fg" : f.weight < 0 ? "text-inauspicious-fg" : "text-muted"),
						children: [f.weight > 0 ? "+" : "", f.weight]
					})]
				}, f.key))
			})
		]
	});
}
function PeoplePanel({ people, chart, onSelectPalace }) {
	const self = chart.palaces[chart.meta.zhiFuPalace];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm text-fg",
		children: [
			"值符在",
			self.bagua,
			self.id,
			"宫，以此为「我」。周围宫位按生克定六亲，再以门星神权衡当下关系。"
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-3 flex flex-col gap-2",
		children: people.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => onSelectPalace(p.palaceId),
			className: "w-full rounded-md border border-border bg-surface px-3 py-3 text-left hover:border-border-strong",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-sm text-fg",
						children: [
							p.bagua,
							"宫 · ",
							p.sixKin,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-xs font-sans text-muted",
								children: p.relation
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						tone: toneOf(p.level),
						children: [
							p.level,
							" ",
							p.score > 0 ? "+" : "",
							p.score
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[11px] text-muted",
					children: p.role
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-1",
					children: p.kinds.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: KIND_LABEL[k] }, k))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs leading-5 text-muted",
					children: p.summary
				})
			]
		}) }, p.palaceId))
	})] });
}
function AppShell() {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const civil = useAppStore((s) => s.civil);
	const setCivil = useAppStore((s) => s.setCivil);
	const mode = useAppStore((s) => s.mode);
	const tab = useAppStore((s) => s.tab);
	const setField = useAppStore((s) => s.setField);
	const eventId = useAppStore((s) => s.eventId);
	const selectedPalace = useAppStore((s) => s.selectedPalace);
	const personName = useAppStore((s) => s.personName);
	const gender = useAppStore((s) => s.gender);
	const birthYear = useAppStore((s) => s.birthYear);
	const compute = useAppStore((s) => s.compute);
	const trueSolar = useAppStore((s) => s.trueSolar);
	const cityId = useAppStore((s) => s.cityId);
	(0, import_react.useEffect)(() => {
		const unsub = useAppStore.persist.onFinishHydration(() => {
			setHydrated(true);
		});
		if (useAppStore.persist.hasHydrated()) setHydrated(true);
		return unsub;
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		if (civil.year === 2026 && civil.month === 8 && civil.day === 28 && civil.hour === 12) setCivil(beijingNow());
	}, [
		hydrated,
		civil.year,
		civil.month,
		civil.day,
		civil.hour,
		setCivil
	]);
	const { chart, events, focus, people } = (0, import_react.useMemo)(() => compute(), [
		civil,
		trueSolar,
		cityId,
		eventId,
		compute,
		personName,
		gender,
		birthYear,
		hydrated
	]);
	const onSelectPalace = (id) => {
		setField("selectedPalace", selectedPalace === id ? null : id);
		setField("tab", "board");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl tracking-wide text-fg",
					children: "奇门权衡"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "以数权衡时空 · 以盘决断人事"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden text-right text-xs text-subtle sm:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						chart.timeLabel,
						" 北京时间 · ",
						chart.hourName
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						chart.pillars.year.name,
						" ",
						chart.pillars.month.name,
						" ",
						chart.pillars.day.name,
						" ",
						chart.pillars.hour.name
					] })]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryForm, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-lg border border-border bg-elevated px-4 py-3 text-sm text-muted sm:hidden",
					children: [
						chart.timeLabel,
						" · ",
						chart.hourName,
						" · ",
						chart.ju.label,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						chart.pillars.year.name,
						" ",
						chart.pillars.month.name,
						" ",
						chart.pillars.day.name,
						" ",
						chart.pillars.hour.name
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mt-5 flex gap-1 rounded-md border border-border bg-surface p-1 lg:hidden",
					children: [
						[
							"events",
							"事项",
							LayoutGrid
						],
						[
							"board",
							"九宫",
							Compass
						],
						[
							"people",
							"人事",
							Users
						]
					].map(([id, label, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setField("tab", id),
						className: cn("flex h-11 flex-1 items-center justify-center gap-1.5 rounded-sm text-sm", tab === id ? "bg-primary text-primary-fg" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), label]
					}, id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: cn(tab === "board" ? "block" : "hidden lg:block"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QimenBoard, {
							chart,
							selected: selectedPalace,
							onSelect: onSelectPalace
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: cn(tab === "board" ? "hidden lg:block" : "block"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4 hidden gap-1 rounded-md border border-border bg-surface p-1 lg:flex",
							children: [["events", "事项"], ["people", "人事"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setField("tab", id === "people" ? "people" : "events"),
								className: cn("h-10 flex-1 rounded-sm text-sm", (id === "people" ? tab === "people" : tab !== "people") ? "bg-primary text-primary-fg" : "text-muted hover:text-fg"),
								children: label
							}, id))
						}), tab === "people" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeoplePanel, {
							people,
							chart,
							onSelectPalace
						}) : mode === "ask" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setField("mode", "scan"),
								className: "self-start text-xs text-muted hover:text-fg",
								children: "返回十二类扫描"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventDetail, {
								score: focus,
								chart,
								personName
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg text-fg",
								children: "十二类事项"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: "按权重排序。点一项看神星门三段与刑冲克害合。"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventList, {
								events,
								activeId: eventId,
								onPick: (id) => {
									setField("eventId", id);
									setField("mode", "ask");
									setField("tab", "events");
								}
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-10 mb-6 text-center text-xs leading-5 text-subtle",
					children: "拆补法转盘奇门。神应开始、星应过程、门应收局；日时干支刑冲克害合为辅助权重。 本工具将传统盘面结构化为可计算模型，供学习与辅助决策，并非定论。"
				})
			]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { Home as component };
