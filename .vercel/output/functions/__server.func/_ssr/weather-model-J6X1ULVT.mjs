import { n as HeavenStem, r as SolarTime, t as EarthBranch } from "../_libs/tyme4ts.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/weather-model-J6X1ULVT.js
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
function isXing(a, b) {
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
			jiXing: Boolean(gate && meta.branch && isXing(meta.branch, hourBranch))
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
var WEATHER_META = {
	source: "Open-Meteo Historical Weather API (ERA5-Land / reanalysis blend)",
	url: "https://archive-api.open-meteo.com/v1/archive",
	place: "浙江省温州市瓯海区",
	latitude: 28.01406,
	longitude: 120.6772,
	elevation_m: 5,
	timezone: "Asia/Shanghai",
	start: "2025-01-01",
	end: "2026-08-28",
	n: 605,
	citation: "Zippenfenig, P. (2023). Open-Meteo.com Weather API. Zenodo. https://doi.org/10.5281/zenodo.7970649",
	days: [
		{
			"d": "2025-01-01",
			"w": 0,
			"tmax": 15.4,
			"tmin": 1.1,
			"t": 8.6,
			"p": 0,
			"r": 0,
			"wind": 9.3,
			"cloud": 0,
			"rh": 65
		},
		{
			"d": "2025-01-02",
			"w": 0,
			"tmax": 17.8,
			"tmin": 4.2,
			"t": 10.3,
			"p": 0,
			"r": 0,
			"wind": 12.2,
			"cloud": 1,
			"rh": 68
		},
		{
			"d": "2025-01-03",
			"w": 0,
			"tmax": 16.3,
			"tmin": 3.2,
			"t": 9.4,
			"p": 0,
			"r": 0,
			"wind": 14.1,
			"cloud": 0,
			"rh": 64
		},
		{
			"d": "2025-01-04",
			"w": 3,
			"tmax": 15.5,
			"tmin": 2.9,
			"t": 9.2,
			"p": 0,
			"r": 0,
			"wind": 11.2,
			"cloud": 30,
			"rh": 65
		},
		{
			"d": "2025-01-05",
			"w": 3,
			"tmax": 17.9,
			"tmin": 6.3,
			"t": 10.9,
			"p": 0,
			"r": 0,
			"wind": 11.9,
			"cloud": 56,
			"rh": 67
		},
		{
			"d": "2025-01-06",
			"w": 3,
			"tmax": 17.8,
			"tmin": 3.8,
			"t": 10.3,
			"p": 0,
			"r": 0,
			"wind": 12,
			"cloud": 14,
			"rh": 59
		},
		{
			"d": "2025-01-07",
			"w": 3,
			"tmax": 13.2,
			"tmin": 2,
			"t": 7.9,
			"p": 0,
			"r": 0,
			"wind": 12.7,
			"cloud": 76,
			"rh": 55
		},
		{
			"d": "2025-01-08",
			"w": 3,
			"tmax": 15.2,
			"tmin": 1.6,
			"t": 8.7,
			"p": 0,
			"r": 0,
			"wind": 9.3,
			"cloud": 45,
			"rh": 60
		},
		{
			"d": "2025-01-09",
			"w": 3,
			"tmax": 11.8,
			"tmin": 6.1,
			"t": 9,
			"p": 0,
			"r": 0,
			"wind": 13.5,
			"cloud": 83,
			"rh": 37
		},
		{
			"d": "2025-01-10",
			"w": 3,
			"tmax": 10.8,
			"tmin": 1.3,
			"t": 5.7,
			"p": 0,
			"r": 0,
			"wind": 11.2,
			"cloud": 14,
			"rh": 27
		},
		{
			"d": "2025-01-11",
			"w": 3,
			"tmax": 11.9,
			"tmin": -2.6,
			"t": 4.1,
			"p": 0,
			"r": 0,
			"wind": 12.7,
			"cloud": 8,
			"rh": 48
		},
		{
			"d": "2025-01-12",
			"w": 0,
			"tmax": 15.1,
			"tmin": -1.5,
			"t": 6.2,
			"p": 0,
			"r": 0,
			"wind": 16.1,
			"cloud": 0,
			"rh": 52
		},
		{
			"d": "2025-01-13",
			"w": 0,
			"tmax": 15.8,
			"tmin": .5,
			"t": 7.7,
			"p": 0,
			"r": 0,
			"wind": 9.9,
			"cloud": 0,
			"rh": 61
		},
		{
			"d": "2025-01-14",
			"w": 0,
			"tmax": 19.4,
			"tmin": 3.1,
			"t": 10.3,
			"p": 0,
			"r": 0,
			"wind": 12.2,
			"cloud": 1,
			"rh": 68
		},
		{
			"d": "2025-01-15",
			"w": 1,
			"tmax": 14.1,
			"tmin": 4.3,
			"t": 9.4,
			"p": 0,
			"r": 0,
			"wind": 15.8,
			"cloud": 2,
			"rh": 43
		},
		{
			"d": "2025-01-16",
			"w": 1,
			"tmax": 13.2,
			"tmin": -1.9,
			"t": 4.8,
			"p": 0,
			"r": 0,
			"wind": 14.2,
			"cloud": 4,
			"rh": 46
		},
		{
			"d": "2025-01-17",
			"w": 1,
			"tmax": 13.7,
			"tmin": -1.5,
			"t": 5.5,
			"p": 0,
			"r": 0,
			"wind": 12.6,
			"cloud": 4,
			"rh": 56
		},
		{
			"d": "2025-01-18",
			"w": 2,
			"tmax": 15.2,
			"tmin": -.2,
			"t": 7.4,
			"p": 0,
			"r": 0,
			"wind": 10.1,
			"cloud": 7,
			"rh": 64
		},
		{
			"d": "2025-01-19",
			"w": 0,
			"tmax": 19.7,
			"tmin": 2.3,
			"t": 9.6,
			"p": 0,
			"r": 0,
			"wind": 14.1,
			"cloud": 0,
			"rh": 63
		},
		{
			"d": "2025-01-20",
			"w": 3,
			"tmax": 18.8,
			"tmin": 2.1,
			"t": 9.8,
			"p": 0,
			"r": 0,
			"wind": 12.6,
			"cloud": 18,
			"rh": 55
		},
		{
			"d": "2025-01-21",
			"w": 3,
			"tmax": 17.3,
			"tmin": 2.8,
			"t": 9.8,
			"p": 0,
			"r": 0,
			"wind": 9.8,
			"cloud": 49,
			"rh": 60
		},
		{
			"d": "2025-01-22",
			"w": 61,
			"tmax": 15.7,
			"tmin": 4.3,
			"t": 10,
			"p": 1.4,
			"r": 1.4,
			"wind": 7,
			"cloud": 82,
			"rh": 81
		},
		{
			"d": "2025-01-23",
			"w": 3,
			"tmax": 23.1,
			"tmin": 9.3,
			"t": 14.4,
			"p": 0,
			"r": 0,
			"wind": 15.7,
			"cloud": 57,
			"rh": 72
		},
		{
			"d": "2025-01-24",
			"w": 3,
			"tmax": 20.3,
			"tmin": 9.4,
			"t": 13.8,
			"p": 0,
			"r": 0,
			"wind": 14.5,
			"cloud": 60,
			"rh": 77
		},
		{
			"d": "2025-01-25",
			"w": 3,
			"tmax": 16.6,
			"tmin": 8.1,
			"t": 12.2,
			"p": 0,
			"r": 0,
			"wind": 14.4,
			"cloud": 63,
			"rh": 71
		},
		{
			"d": "2025-01-26",
			"w": 53,
			"tmax": 12.3,
			"tmin": 8,
			"t": 10.5,
			"p": 3.1,
			"r": 3.1,
			"wind": 15.3,
			"cloud": 99,
			"rh": 74
		},
		{
			"d": "2025-01-27",
			"w": 3,
			"tmax": 12.1,
			"tmin": 3.3,
			"t": 7.5,
			"p": 0,
			"r": 0,
			"wind": 18.5,
			"cloud": 17,
			"rh": 40
		},
		{
			"d": "2025-01-28",
			"w": 3,
			"tmax": 12.6,
			"tmin": -.7,
			"t": 6.2,
			"p": 0,
			"r": 0,
			"wind": 13.8,
			"cloud": 25,
			"rh": 43
		},
		{
			"d": "2025-01-29",
			"w": 0,
			"tmax": 13.4,
			"tmin": -.7,
			"t": 6,
			"p": 0,
			"r": 0,
			"wind": 12.9,
			"cloud": 0,
			"rh": 62
		},
		{
			"d": "2025-01-30",
			"w": 3,
			"tmax": 15.5,
			"tmin": 2.9,
			"t": 8.6,
			"p": 0,
			"r": 0,
			"wind": 10.2,
			"cloud": 27,
			"rh": 68
		},
		{
			"d": "2025-01-31",
			"w": 53,
			"tmax": 14.5,
			"tmin": 5.5,
			"t": 10.9,
			"p": 1.3,
			"r": 1.3,
			"wind": 6.4,
			"cloud": 86,
			"rh": 84
		},
		{
			"d": "2025-02-01",
			"w": 51,
			"tmax": 19.9,
			"tmin": 9.6,
			"t": 13.5,
			"p": .1,
			"r": .1,
			"wind": 17.3,
			"cloud": 82,
			"rh": 77
		},
		{
			"d": "2025-02-02",
			"w": 53,
			"tmax": 14.8,
			"tmin": 8.8,
			"t": 11,
			"p": 1.6,
			"r": 1.6,
			"wind": 8,
			"cloud": 96,
			"rh": 78
		},
		{
			"d": "2025-02-03",
			"w": 53,
			"tmax": 10.4,
			"tmin": 3.7,
			"t": 8,
			"p": 1.6,
			"r": 1.6,
			"wind": 13.6,
			"cloud": 72,
			"rh": 73
		},
		{
			"d": "2025-02-04",
			"w": 3,
			"tmax": 13.3,
			"tmin": -.4,
			"t": 6.1,
			"p": 0,
			"r": 0,
			"wind": 11.1,
			"cloud": 6,
			"rh": 68
		},
		{
			"d": "2025-02-05",
			"w": 3,
			"tmax": 15.2,
			"tmin": .7,
			"t": 7.5,
			"p": 0,
			"r": 0,
			"wind": 11.5,
			"cloud": 26,
			"rh": 64
		},
		{
			"d": "2025-02-06",
			"w": 53,
			"tmax": 11,
			"tmin": 6.6,
			"t": 8.1,
			"p": 1.4,
			"r": 1.4,
			"wind": 8.3,
			"cloud": 96,
			"rh": 67
		},
		{
			"d": "2025-02-07",
			"w": 53,
			"tmax": 13,
			"tmin": 5.4,
			"t": 8.4,
			"p": 1.4,
			"r": 1.4,
			"wind": 16,
			"cloud": 99,
			"rh": 60
		},
		{
			"d": "2025-02-08",
			"w": 3,
			"tmax": 8.4,
			"tmin": -1.9,
			"t": 3.3,
			"p": 0,
			"r": 0,
			"wind": 13.7,
			"cloud": 12,
			"rh": 31
		},
		{
			"d": "2025-02-09",
			"w": 3,
			"tmax": 10.4,
			"tmin": -.3,
			"t": 4.2,
			"p": 0,
			"r": 0,
			"wind": 16.6,
			"cloud": 19,
			"rh": 39
		},
		{
			"d": "2025-02-10",
			"w": 3,
			"tmax": 11.9,
			"tmin": -1.9,
			"t": 5.5,
			"p": 0,
			"r": 0,
			"wind": 10.4,
			"cloud": 39,
			"rh": 60
		},
		{
			"d": "2025-02-11",
			"w": 3,
			"tmax": 13.4,
			"tmin": 6.1,
			"t": 10,
			"p": 0,
			"r": 0,
			"wind": 5.3,
			"cloud": 100,
			"rh": 65
		},
		{
			"d": "2025-02-12",
			"w": 51,
			"tmax": 25.4,
			"tmin": 9,
			"t": 14.3,
			"p": .9,
			"r": .9,
			"wind": 14.4,
			"cloud": 60,
			"rh": 72
		},
		{
			"d": "2025-02-13",
			"w": 51,
			"tmax": 14.6,
			"tmin": 6.9,
			"t": 9.9,
			"p": .2,
			"r": .2,
			"wind": 16.7,
			"cloud": 63,
			"rh": 54
		},
		{
			"d": "2025-02-14",
			"w": 3,
			"tmax": 15.9,
			"tmin": 4.3,
			"t": 9.7,
			"p": 0,
			"r": 0,
			"wind": 11.6,
			"cloud": 26,
			"rh": 64
		},
		{
			"d": "2025-02-15",
			"w": 51,
			"tmax": 21.1,
			"tmin": 6.2,
			"t": 13.3,
			"p": .1,
			"r": .1,
			"wind": 9.6,
			"cloud": 57,
			"rh": 73
		},
		{
			"d": "2025-02-16",
			"w": 3,
			"tmax": 21.6,
			"tmin": 11.1,
			"t": 14.7,
			"p": 0,
			"r": 0,
			"wind": 15,
			"cloud": 69,
			"rh": 59
		},
		{
			"d": "2025-02-17",
			"w": 53,
			"tmax": 17.2,
			"tmin": 6.1,
			"t": 11.3,
			"p": 1.1,
			"r": 1.1,
			"wind": 13.6,
			"cloud": 51,
			"rh": 50
		},
		{
			"d": "2025-02-18",
			"w": 3,
			"tmax": 11.8,
			"tmin": 6.7,
			"t": 8.7,
			"p": 0,
			"r": 0,
			"wind": 11.8,
			"cloud": 100,
			"rh": 51
		},
		{
			"d": "2025-02-19",
			"w": 51,
			"tmax": 10.9,
			"tmin": 4.5,
			"t": 8.1,
			"p": .8,
			"r": .8,
			"wind": 12,
			"cloud": 99,
			"rh": 72
		},
		{
			"d": "2025-02-20",
			"w": 61,
			"tmax": 8.6,
			"tmin": 5.5,
			"t": 7.1,
			"p": 13.4,
			"r": 13.4,
			"wind": 12.1,
			"cloud": 100,
			"rh": 89
		},
		{
			"d": "2025-02-21",
			"w": 53,
			"tmax": 9.7,
			"tmin": 5.2,
			"t": 7.1,
			"p": 1.4,
			"r": 1.4,
			"wind": 10.7,
			"cloud": 100,
			"rh": 76
		},
		{
			"d": "2025-02-22",
			"w": 53,
			"tmax": 8.3,
			"tmin": 5,
			"t": 6.4,
			"p": 7.2,
			"r": 7.2,
			"wind": 9.8,
			"cloud": 99,
			"rh": 83
		},
		{
			"d": "2025-02-23",
			"w": 51,
			"tmax": 9.3,
			"tmin": 3.8,
			"t": 6.6,
			"p": .5,
			"r": .5,
			"wind": 11.7,
			"cloud": 89,
			"rh": 80
		},
		{
			"d": "2025-02-24",
			"w": 3,
			"tmax": 12.4,
			"tmin": 0,
			"t": 5.6,
			"p": 0,
			"r": 0,
			"wind": 14.8,
			"cloud": 26,
			"rh": 74
		},
		{
			"d": "2025-02-25",
			"w": 51,
			"tmax": 14.2,
			"tmin": 2.3,
			"t": 7.8,
			"p": .3,
			"r": .3,
			"wind": 6.8,
			"cloud": 81,
			"rh": 79
		},
		{
			"d": "2025-02-26",
			"w": 3,
			"tmax": 15,
			"tmin": 5.7,
			"t": 9.9,
			"p": 0,
			"r": 0,
			"wind": 12.7,
			"cloud": 97,
			"rh": 75
		},
		{
			"d": "2025-02-27",
			"w": 55,
			"tmax": 18.5,
			"tmin": 8,
			"t": 11.4,
			"p": 6,
			"r": 6,
			"wind": 9.4,
			"cloud": 63,
			"rh": 86
		},
		{
			"d": "2025-02-28",
			"w": 3,
			"tmax": 22.7,
			"tmin": 10,
			"t": 14.1,
			"p": 0,
			"r": 0,
			"wind": 14.1,
			"cloud": 77,
			"rh": 89
		},
		{
			"d": "2025-03-01",
			"w": 3,
			"tmax": 23.8,
			"tmin": 12.1,
			"t": 16.6,
			"p": 0,
			"r": 0,
			"wind": 11.3,
			"cloud": 95,
			"rh": 89
		},
		{
			"d": "2025-03-02",
			"w": 3,
			"tmax": 25,
			"tmin": 15.7,
			"t": 19,
			"p": 0,
			"r": 0,
			"wind": 13.4,
			"cloud": 66,
			"rh": 89
		},
		{
			"d": "2025-03-03",
			"w": 63,
			"tmax": 17.9,
			"tmin": 12.2,
			"t": 15.6,
			"p": 16.3,
			"r": 16.3,
			"wind": 11,
			"cloud": 95,
			"rh": 92
		},
		{
			"d": "2025-03-04",
			"w": 61,
			"tmax": 18.4,
			"tmin": 10.6,
			"t": 14,
			"p": 6.7,
			"r": 6.7,
			"wind": 11.7,
			"cloud": 99,
			"rh": 81
		},
		{
			"d": "2025-03-05",
			"w": 63,
			"tmax": 14.7,
			"tmin": 8.6,
			"t": 10.8,
			"p": 4.2,
			"r": 4.2,
			"wind": 10,
			"cloud": 96,
			"rh": 75
		},
		{
			"d": "2025-03-06",
			"w": 61,
			"tmax": 13,
			"tmin": 5.5,
			"t": 8.9,
			"p": 6.3,
			"r": 6.3,
			"wind": 16.5,
			"cloud": 67,
			"rh": 72
		},
		{
			"d": "2025-03-07",
			"w": 53,
			"tmax": 12.2,
			"tmin": 3.1,
			"t": 7.4,
			"p": 1,
			"r": 1,
			"wind": 12.6,
			"cloud": 49,
			"rh": 74
		},
		{
			"d": "2025-03-08",
			"w": 1,
			"tmax": 15.9,
			"tmin": 3.4,
			"t": 8.8,
			"p": 0,
			"r": 0,
			"wind": 14.5,
			"cloud": 5,
			"rh": 77
		},
		{
			"d": "2025-03-09",
			"w": 3,
			"tmax": 14.9,
			"tmin": 3.8,
			"t": 9.6,
			"p": 0,
			"r": 0,
			"wind": 10.9,
			"cloud": 42,
			"rh": 77
		},
		{
			"d": "2025-03-10",
			"w": 63,
			"tmax": 17,
			"tmin": 8.2,
			"t": 12.3,
			"p": 5.1,
			"r": 5.1,
			"wind": 6.9,
			"cloud": 70,
			"rh": 84
		},
		{
			"d": "2025-03-11",
			"w": 3,
			"tmax": 22,
			"tmin": 9.2,
			"t": 14.2,
			"p": 0,
			"r": 0,
			"wind": 12.8,
			"cloud": 65,
			"rh": 89
		},
		{
			"d": "2025-03-12",
			"w": 65,
			"tmax": 25.1,
			"tmin": 13.8,
			"t": 17.9,
			"p": 12.8,
			"r": 12.8,
			"wind": 10.9,
			"cloud": 88,
			"rh": 88
		},
		{
			"d": "2025-03-13",
			"w": 55,
			"tmax": 20.5,
			"tmin": 13,
			"t": 16.2,
			"p": 2.6,
			"r": 2.6,
			"wind": 16,
			"cloud": 96,
			"rh": 85
		},
		{
			"d": "2025-03-14",
			"w": 65,
			"tmax": 17.5,
			"tmin": 12.3,
			"t": 14.3,
			"p": 31.5,
			"r": 31.5,
			"wind": 11.2,
			"cloud": 100,
			"rh": 88
		},
		{
			"d": "2025-03-15",
			"w": 63,
			"tmax": 17.4,
			"tmin": 11.1,
			"t": 14,
			"p": 23.2,
			"r": 23.2,
			"wind": 15,
			"cloud": 100,
			"rh": 80
		},
		{
			"d": "2025-03-16",
			"w": 3,
			"tmax": 16.1,
			"tmin": 8.5,
			"t": 11.9,
			"p": 0,
			"r": 0,
			"wind": 21.6,
			"cloud": 62,
			"rh": 58
		},
		{
			"d": "2025-03-17",
			"w": 3,
			"tmax": 14.1,
			"tmin": 3.8,
			"t": 8.1,
			"p": 0,
			"r": 0,
			"wind": 14.3,
			"cloud": 52,
			"rh": 60
		},
		{
			"d": "2025-03-18",
			"w": 3,
			"tmax": 18.9,
			"tmin": 6,
			"t": 11.1,
			"p": 0,
			"r": 0,
			"wind": 15.9,
			"cloud": 33,
			"rh": 61
		},
		{
			"d": "2025-03-19",
			"w": 3,
			"tmax": 15.7,
			"tmin": 5.5,
			"t": 9.5,
			"p": 0,
			"r": 0,
			"wind": 16.4,
			"cloud": 37,
			"rh": 74
		},
		{
			"d": "2025-03-20",
			"w": 3,
			"tmax": 19.1,
			"tmin": 4.9,
			"t": 10.8,
			"p": 0,
			"r": 0,
			"wind": 13.5,
			"cloud": 31,
			"rh": 76
		},
		{
			"d": "2025-03-21",
			"w": 1,
			"tmax": 23,
			"tmin": 6.1,
			"t": 13.4,
			"p": 0,
			"r": 0,
			"wind": 15.5,
			"cloud": 8,
			"rh": 67
		},
		{
			"d": "2025-03-22",
			"w": 0,
			"tmax": 24.2,
			"tmin": 7,
			"t": 14.8,
			"p": 0,
			"r": 0,
			"wind": 16,
			"cloud": 0,
			"rh": 63
		},
		{
			"d": "2025-03-23",
			"w": 2,
			"tmax": 25.2,
			"tmin": 8.3,
			"t": 16.4,
			"p": 0,
			"r": 0,
			"wind": 12,
			"cloud": 5,
			"rh": 63
		},
		{
			"d": "2025-03-24",
			"w": 3,
			"tmax": 30.5,
			"tmin": 14,
			"t": 20.6,
			"p": 0,
			"r": 0,
			"wind": 14.5,
			"cloud": 37,
			"rh": 49
		},
		{
			"d": "2025-03-25",
			"w": 2,
			"tmax": 28.9,
			"tmin": 13.1,
			"t": 20.7,
			"p": 0,
			"r": 0,
			"wind": 12.6,
			"cloud": 14,
			"rh": 59
		},
		{
			"d": "2025-03-26",
			"w": 3,
			"tmax": 28.4,
			"tmin": 14.7,
			"t": 21.1,
			"p": 0,
			"r": 0,
			"wind": 12.2,
			"cloud": 38,
			"rh": 69
		},
		{
			"d": "2025-03-27",
			"w": 63,
			"tmax": 33,
			"tmin": 15.4,
			"t": 22.7,
			"p": 7.7,
			"r": 7.7,
			"wind": 17.5,
			"cloud": 35,
			"rh": 71
		},
		{
			"d": "2025-03-28",
			"w": 61,
			"tmax": 16,
			"tmin": 9,
			"t": 12.2,
			"p": 5.4,
			"r": 5.4,
			"wind": 14.5,
			"cloud": 100,
			"rh": 67
		},
		{
			"d": "2025-03-29",
			"w": 61,
			"tmax": 12.3,
			"tmin": 5.6,
			"t": 9.2,
			"p": 5.3,
			"r": 5.3,
			"wind": 13.1,
			"cloud": 93,
			"rh": 70
		},
		{
			"d": "2025-03-30",
			"w": 73,
			"tmax": 7.2,
			"tmin": 4.9,
			"t": 6,
			"p": 19.8,
			"r": 19.3,
			"wind": 12.2,
			"cloud": 100,
			"rh": 87
		},
		{
			"d": "2025-03-31",
			"w": 71,
			"tmax": 10,
			"tmin": 5.3,
			"t": 7.7,
			"p": 7.2,
			"r": 7,
			"wind": 10.8,
			"cloud": 100,
			"rh": 83
		},
		{
			"d": "2025-04-01",
			"w": 61,
			"tmax": 18.5,
			"tmin": 6.2,
			"t": 11.2,
			"p": 4.6,
			"r": 4.6,
			"wind": 15.7,
			"cloud": 60,
			"rh": 72
		},
		{
			"d": "2025-04-02",
			"w": 3,
			"tmax": 20.3,
			"tmin": 4.7,
			"t": 11.8,
			"p": 0,
			"r": 0,
			"wind": 12.3,
			"cloud": 31,
			"rh": 75
		},
		{
			"d": "2025-04-03",
			"w": 3,
			"tmax": 20,
			"tmin": 9,
			"t": 13.8,
			"p": 0,
			"r": 0,
			"wind": 15,
			"cloud": 45,
			"rh": 71
		},
		{
			"d": "2025-04-04",
			"w": 3,
			"tmax": 19,
			"tmin": 7.1,
			"t": 13.2,
			"p": 0,
			"r": 0,
			"wind": 11.1,
			"cloud": 93,
			"rh": 78
		},
		{
			"d": "2025-04-05",
			"w": 3,
			"tmax": 25.1,
			"tmin": 12.4,
			"t": 17.5,
			"p": 0,
			"r": 0,
			"wind": 15.8,
			"cloud": 86,
			"rh": 71
		},
		{
			"d": "2025-04-06",
			"w": 3,
			"tmax": 27,
			"tmin": 11.5,
			"t": 17.8,
			"p": 0,
			"r": 0,
			"wind": 14.6,
			"cloud": 24,
			"rh": 72
		},
		{
			"d": "2025-04-07",
			"w": 55,
			"tmax": 25,
			"tmin": 10.6,
			"t": 17.4,
			"p": 1.1,
			"r": 1.1,
			"wind": 13,
			"cloud": 53,
			"rh": 71
		},
		{
			"d": "2025-04-08",
			"w": 3,
			"tmax": 28.2,
			"tmin": 14.3,
			"t": 20.3,
			"p": 0,
			"r": 0,
			"wind": 13.8,
			"cloud": 87,
			"rh": 71
		},
		{
			"d": "2025-04-09",
			"w": 51,
			"tmax": 29.2,
			"tmin": 15,
			"t": 21.3,
			"p": .7,
			"r": .7,
			"wind": 13,
			"cloud": 100,
			"rh": 73
		},
		{
			"d": "2025-04-10",
			"w": 51,
			"tmax": 28.9,
			"tmin": 17.3,
			"t": 21.8,
			"p": .1,
			"r": .1,
			"wind": 8.7,
			"cloud": 57,
			"rh": 69
		},
		{
			"d": "2025-04-11",
			"w": 51,
			"tmax": 27.7,
			"tmin": 15.3,
			"t": 21.3,
			"p": .6,
			"r": .6,
			"wind": 18.2,
			"cloud": 43,
			"rh": 74
		},
		{
			"d": "2025-04-12",
			"w": 65,
			"tmax": 22.6,
			"tmin": 13.4,
			"t": 19.1,
			"p": 37.6,
			"r": 37.6,
			"wind": 26.7,
			"cloud": 98,
			"rh": 84
		},
		{
			"d": "2025-04-13",
			"w": 3,
			"tmax": 22.4,
			"tmin": 9.7,
			"t": 14.7,
			"p": 0,
			"r": 0,
			"wind": 22.1,
			"cloud": 60,
			"rh": 49
		},
		{
			"d": "2025-04-14",
			"w": 2,
			"tmax": 27.8,
			"tmin": 9.1,
			"t": 18.1,
			"p": 0,
			"r": 0,
			"wind": 21.3,
			"cloud": 6,
			"rh": 58
		},
		{
			"d": "2025-04-15",
			"w": 3,
			"tmax": 24.6,
			"tmin": 11,
			"t": 17.7,
			"p": 0,
			"r": 0,
			"wind": 15.4,
			"cloud": 13,
			"rh": 64
		},
		{
			"d": "2025-04-16",
			"w": 51,
			"tmax": 26.1,
			"tmin": 12.2,
			"t": 19.2,
			"p": .2,
			"r": .2,
			"wind": 16.6,
			"cloud": 82,
			"rh": 75
		},
		{
			"d": "2025-04-17",
			"w": 3,
			"tmax": 26.1,
			"tmin": 17.6,
			"t": 21.2,
			"p": 0,
			"r": 0,
			"wind": 8.5,
			"cloud": 99,
			"rh": 77
		},
		{
			"d": "2025-04-18",
			"w": 51,
			"tmax": 29.9,
			"tmin": 17.5,
			"t": 22.5,
			"p": .2,
			"r": .2,
			"wind": 14,
			"cloud": 56,
			"rh": 79
		},
		{
			"d": "2025-04-19",
			"w": 61,
			"tmax": 27.1,
			"tmin": 21.2,
			"t": 23.4,
			"p": 4.9,
			"r": 4.9,
			"wind": 11.3,
			"cloud": 100,
			"rh": 88
		},
		{
			"d": "2025-04-20",
			"w": 51,
			"tmax": 28.9,
			"tmin": 18,
			"t": 22,
			"p": .1,
			"r": .1,
			"wind": 15,
			"cloud": 85,
			"rh": 86
		},
		{
			"d": "2025-04-21",
			"w": 51,
			"tmax": 25.3,
			"tmin": 18,
			"t": 20.8,
			"p": 1.1,
			"r": 1.1,
			"wind": 12.4,
			"cloud": 97,
			"rh": 85
		},
		{
			"d": "2025-04-22",
			"w": 63,
			"tmax": 30.1,
			"tmin": 19,
			"t": 22.7,
			"p": 12.7,
			"r": 12.7,
			"wind": 8.7,
			"cloud": 98,
			"rh": 91
		},
		{
			"d": "2025-04-23",
			"w": 61,
			"tmax": 20.5,
			"tmin": 16.4,
			"t": 18.1,
			"p": 7.2,
			"r": 7.2,
			"wind": 10.9,
			"cloud": 92,
			"rh": 91
		},
		{
			"d": "2025-04-24",
			"w": 61,
			"tmax": 23.1,
			"tmin": 15.1,
			"t": 17.8,
			"p": 11.7,
			"r": 11.7,
			"wind": 13.2,
			"cloud": 90,
			"rh": 87
		},
		{
			"d": "2025-04-25",
			"w": 53,
			"tmax": 19.7,
			"tmin": 15,
			"t": 16.7,
			"p": 2.5,
			"r": 2.5,
			"wind": 8.1,
			"cloud": 86,
			"rh": 82
		},
		{
			"d": "2025-04-26",
			"w": 3,
			"tmax": 19.7,
			"tmin": 12.6,
			"t": 16,
			"p": 0,
			"r": 0,
			"wind": 8.5,
			"cloud": 59,
			"rh": 72
		},
		{
			"d": "2025-04-27",
			"w": 53,
			"tmax": 24.1,
			"tmin": 12.9,
			"t": 18.3,
			"p": 1.8,
			"r": 1.8,
			"wind": 8.6,
			"cloud": 85,
			"rh": 80
		},
		{
			"d": "2025-04-28",
			"w": 51,
			"tmax": 27.5,
			"tmin": 16.5,
			"t": 20.5,
			"p": .2,
			"r": .2,
			"wind": 15.2,
			"cloud": 48,
			"rh": 79
		},
		{
			"d": "2025-04-29",
			"w": 3,
			"tmax": 24.9,
			"tmin": 13.7,
			"t": 18.5,
			"p": 0,
			"r": 0,
			"wind": 12.8,
			"cloud": 54,
			"rh": 76
		},
		{
			"d": "2025-04-30",
			"w": 3,
			"tmax": 25.6,
			"tmin": 15.3,
			"t": 20.2,
			"p": 0,
			"r": 0,
			"wind": 11.6,
			"cloud": 90,
			"rh": 80
		},
		{
			"d": "2025-05-01",
			"w": 63,
			"tmax": 29.6,
			"tmin": 19,
			"t": 23.3,
			"p": 8,
			"r": 8,
			"wind": 17.3,
			"cloud": 63,
			"rh": 78
		},
		{
			"d": "2025-05-02",
			"w": 3,
			"tmax": 25.8,
			"tmin": 16.4,
			"t": 21.2,
			"p": 0,
			"r": 0,
			"wind": 13.3,
			"cloud": 23,
			"rh": 78
		},
		{
			"d": "2025-05-03",
			"w": 3,
			"tmax": 30.9,
			"tmin": 17.5,
			"t": 23.2,
			"p": 0,
			"r": 0,
			"wind": 17.1,
			"cloud": 95,
			"rh": 76
		},
		{
			"d": "2025-05-04",
			"w": 53,
			"tmax": 23.3,
			"tmin": 16.7,
			"t": 19.5,
			"p": 1.2,
			"r": 1.2,
			"wind": 12.7,
			"cloud": 99,
			"rh": 64
		},
		{
			"d": "2025-05-05",
			"w": 65,
			"tmax": 25.1,
			"tmin": 16.2,
			"t": 20,
			"p": 15.3,
			"r": 15.3,
			"wind": 6.8,
			"cloud": 90,
			"rh": 89
		},
		{
			"d": "2025-05-06",
			"w": 51,
			"tmax": 30.9,
			"tmin": 19,
			"t": 23.2,
			"p": .3,
			"r": .3,
			"wind": 16.9,
			"cloud": 20,
			"rh": 82
		},
		{
			"d": "2025-05-07",
			"w": 53,
			"tmax": 25.2,
			"tmin": 19.4,
			"t": 21.6,
			"p": 3.2,
			"r": 3.2,
			"wind": 14.6,
			"cloud": 90,
			"rh": 86
		},
		{
			"d": "2025-05-08",
			"w": 61,
			"tmax": 22.4,
			"tmin": 19.4,
			"t": 20.8,
			"p": 13.4,
			"r": 13.4,
			"wind": 18.4,
			"cloud": 100,
			"rh": 95
		},
		{
			"d": "2025-05-09",
			"w": 61,
			"tmax": 28,
			"tmin": 20.5,
			"t": 23.2,
			"p": 5.2,
			"r": 5.2,
			"wind": 10.8,
			"cloud": 99,
			"rh": 90
		},
		{
			"d": "2025-05-10",
			"w": 63,
			"tmax": 30.2,
			"tmin": 17.8,
			"t": 22.9,
			"p": 3.6,
			"r": 3.6,
			"wind": 14.8,
			"cloud": 53,
			"rh": 78
		},
		{
			"d": "2025-05-11",
			"w": 63,
			"tmax": 21.4,
			"tmin": 16.5,
			"t": 18.3,
			"p": 17,
			"r": 17,
			"wind": 13.6,
			"cloud": 100,
			"rh": 84
		},
		{
			"d": "2025-05-12",
			"w": 3,
			"tmax": 26.4,
			"tmin": 14.7,
			"t": 19.7,
			"p": 0,
			"r": 0,
			"wind": 13,
			"cloud": 33,
			"rh": 75
		},
		{
			"d": "2025-05-13",
			"w": 3,
			"tmax": 26.4,
			"tmin": 14.8,
			"t": 20.7,
			"p": 0,
			"r": 0,
			"wind": 14.5,
			"cloud": 25,
			"rh": 80
		},
		{
			"d": "2025-05-14",
			"w": 3,
			"tmax": 28.7,
			"tmin": 19.2,
			"t": 22.9,
			"p": 0,
			"r": 0,
			"wind": 12.4,
			"cloud": 44,
			"rh": 84
		},
		{
			"d": "2025-05-15",
			"w": 3,
			"tmax": 28.9,
			"tmin": 18.9,
			"t": 23.6,
			"p": 0,
			"r": 0,
			"wind": 13.9,
			"cloud": 79,
			"rh": 86
		},
		{
			"d": "2025-05-16",
			"w": 61,
			"tmax": 27.8,
			"tmin": 22.2,
			"t": 24.7,
			"p": 8.4,
			"r": 8.4,
			"wind": 7,
			"cloud": 98,
			"rh": 91
		},
		{
			"d": "2025-05-17",
			"w": 63,
			"tmax": 30.7,
			"tmin": 23.3,
			"t": 25.5,
			"p": 10.2,
			"r": 10.2,
			"wind": 5.7,
			"cloud": 94,
			"rh": 91
		},
		{
			"d": "2025-05-18",
			"w": 65,
			"tmax": 24.6,
			"tmin": 20.3,
			"t": 22.7,
			"p": 41.9,
			"r": 41.9,
			"wind": 11.9,
			"cloud": 100,
			"rh": 95
		},
		{
			"d": "2025-05-19",
			"w": 65,
			"tmax": 26,
			"tmin": 19.9,
			"t": 22.5,
			"p": 27,
			"r": 27,
			"wind": 7.4,
			"cloud": 100,
			"rh": 92
		},
		{
			"d": "2025-05-20",
			"w": 61,
			"tmax": 29.9,
			"tmin": 22.5,
			"t": 25.5,
			"p": 9.1,
			"r": 9.1,
			"wind": 10.4,
			"cloud": 100,
			"rh": 90
		},
		{
			"d": "2025-05-21",
			"w": 63,
			"tmax": 31.1,
			"tmin": 23.2,
			"t": 25.9,
			"p": 8.5,
			"r": 8.5,
			"wind": 11.7,
			"cloud": 81,
			"rh": 89
		},
		{
			"d": "2025-05-22",
			"w": 63,
			"tmax": 30.1,
			"tmin": 22.8,
			"t": 25.5,
			"p": 8.9,
			"r": 8.9,
			"wind": 11.3,
			"cloud": 73,
			"rh": 88
		},
		{
			"d": "2025-05-23",
			"w": 65,
			"tmax": 29.9,
			"tmin": 23.2,
			"t": 25.5,
			"p": 18,
			"r": 18,
			"wind": 15.1,
			"cloud": 100,
			"rh": 90
		},
		{
			"d": "2025-05-24",
			"w": 3,
			"tmax": 27.6,
			"tmin": 20.6,
			"t": 23.2,
			"p": 0,
			"r": 0,
			"wind": 14,
			"cloud": 92,
			"rh": 67
		},
		{
			"d": "2025-05-25",
			"w": 53,
			"tmax": 21.4,
			"tmin": 18.6,
			"t": 19.9,
			"p": 1.9,
			"r": 1.9,
			"wind": 3.8,
			"cloud": 100,
			"rh": 77
		},
		{
			"d": "2025-05-26",
			"w": 3,
			"tmax": 24.1,
			"tmin": 17,
			"t": 20.1,
			"p": 0,
			"r": 0,
			"wind": 8.8,
			"cloud": 71,
			"rh": 78
		},
		{
			"d": "2025-05-27",
			"w": 3,
			"tmax": 25.8,
			"tmin": 16.1,
			"t": 21.1,
			"p": 0,
			"r": 0,
			"wind": 12.6,
			"cloud": 71,
			"rh": 80
		},
		{
			"d": "2025-05-28",
			"w": 63,
			"tmax": 20.8,
			"tmin": 17.7,
			"t": 19.5,
			"p": 25.6,
			"r": 25.6,
			"wind": 7.1,
			"cloud": 100,
			"rh": 92
		},
		{
			"d": "2025-05-29",
			"w": 55,
			"tmax": 25.2,
			"tmin": 17.6,
			"t": 20.7,
			"p": 4,
			"r": 4,
			"wind": 9.1,
			"cloud": 77,
			"rh": 79
		},
		{
			"d": "2025-05-30",
			"w": 3,
			"tmax": 27.1,
			"tmin": 16.3,
			"t": 21,
			"p": 0,
			"r": 0,
			"wind": 11.4,
			"cloud": 39,
			"rh": 76
		},
		{
			"d": "2025-05-31",
			"w": 53,
			"tmax": 25.6,
			"tmin": 15.6,
			"t": 21.1,
			"p": 1.6,
			"r": 1.6,
			"wind": 14.7,
			"cloud": 78,
			"rh": 79
		},
		{
			"d": "2025-06-01",
			"w": 63,
			"tmax": 28.6,
			"tmin": 20.9,
			"t": 24,
			"p": 10.1,
			"r": 10.1,
			"wind": 9.8,
			"cloud": 97,
			"rh": 88
		},
		{
			"d": "2025-06-02",
			"w": 63,
			"tmax": 30.4,
			"tmin": 21.9,
			"t": 26,
			"p": 5.5,
			"r": 5.5,
			"wind": 14.8,
			"cloud": 99,
			"rh": 89
		},
		{
			"d": "2025-06-03",
			"w": 53,
			"tmax": 26.1,
			"tmin": 20.4,
			"t": 23.2,
			"p": 2.4,
			"r": 2.4,
			"wind": 11.8,
			"cloud": 79,
			"rh": 84
		},
		{
			"d": "2025-06-04",
			"w": 3,
			"tmax": 27.8,
			"tmin": 19.7,
			"t": 23.1,
			"p": 0,
			"r": 0,
			"wind": 8.7,
			"cloud": 28,
			"rh": 73
		},
		{
			"d": "2025-06-05",
			"w": 3,
			"tmax": 27,
			"tmin": 17.5,
			"t": 22.7,
			"p": 0,
			"r": 0,
			"wind": 9.2,
			"cloud": 19,
			"rh": 70
		},
		{
			"d": "2025-06-06",
			"w": 3,
			"tmax": 30.6,
			"tmin": 20.4,
			"t": 25,
			"p": 0,
			"r": 0,
			"wind": 14.8,
			"cloud": 29,
			"rh": 78
		},
		{
			"d": "2025-06-07",
			"w": 53,
			"tmax": 32.8,
			"tmin": 22.4,
			"t": 27.2,
			"p": .6,
			"r": .6,
			"wind": 10.5,
			"cloud": 86,
			"rh": 83
		},
		{
			"d": "2025-06-08",
			"w": 55,
			"tmax": 34.7,
			"tmin": 25.3,
			"t": 28.2,
			"p": 1.4,
			"r": 1.4,
			"wind": 7.9,
			"cloud": 100,
			"rh": 84
		},
		{
			"d": "2025-06-09",
			"w": 65,
			"tmax": 32.8,
			"tmin": 25.1,
			"t": 27.1,
			"p": 27.8,
			"r": 27.8,
			"wind": 9.2,
			"cloud": 95,
			"rh": 89
		},
		{
			"d": "2025-06-10",
			"w": 53,
			"tmax": 30.9,
			"tmin": 24,
			"t": 26.9,
			"p": 3,
			"r": 3,
			"wind": 11.2,
			"cloud": 95,
			"rh": 88
		},
		{
			"d": "2025-06-11",
			"w": 53,
			"tmax": 28,
			"tmin": 23.2,
			"t": 24.7,
			"p": 3.5,
			"r": 3.5,
			"wind": 11.3,
			"cloud": 99,
			"rh": 86
		},
		{
			"d": "2025-06-12",
			"w": 63,
			"tmax": 30.4,
			"tmin": 22.7,
			"t": 25,
			"p": 22.2,
			"r": 22.2,
			"wind": 15.1,
			"cloud": 97,
			"rh": 90
		},
		{
			"d": "2025-06-13",
			"w": 63,
			"tmax": 29.1,
			"tmin": 23.3,
			"t": 25.7,
			"p": 44.2,
			"r": 44.2,
			"wind": 16.8,
			"cloud": 99,
			"rh": 92
		},
		{
			"d": "2025-06-14",
			"w": 65,
			"tmax": 32.4,
			"tmin": 23.8,
			"t": 27,
			"p": 20.9,
			"r": 20.9,
			"wind": 13.4,
			"cloud": 92,
			"rh": 90
		},
		{
			"d": "2025-06-15",
			"w": 63,
			"tmax": 32.6,
			"tmin": 24.6,
			"t": 28.1,
			"p": 3.5,
			"r": 3.5,
			"wind": 18.3,
			"cloud": 94,
			"rh": 86
		},
		{
			"d": "2025-06-16",
			"w": 51,
			"tmax": 32.5,
			"tmin": 24.6,
			"t": 27.2,
			"p": .3,
			"r": .3,
			"wind": 12.8,
			"cloud": 92,
			"rh": 80
		},
		{
			"d": "2025-06-17",
			"w": 3,
			"tmax": 32.1,
			"tmin": 23.6,
			"t": 27,
			"p": 0,
			"r": 0,
			"wind": 9.3,
			"cloud": 87,
			"rh": 81
		},
		{
			"d": "2025-06-18",
			"w": 55,
			"tmax": 32.8,
			"tmin": 23.6,
			"t": 27.5,
			"p": 1.2,
			"r": 1.2,
			"wind": 12.3,
			"cloud": 100,
			"rh": 82
		},
		{
			"d": "2025-06-19",
			"w": 51,
			"tmax": 31.8,
			"tmin": 24.6,
			"t": 27.7,
			"p": .2,
			"r": .2,
			"wind": 15.4,
			"cloud": 100,
			"rh": 82
		},
		{
			"d": "2025-06-20",
			"w": 3,
			"tmax": 33.1,
			"tmin": 25.1,
			"t": 28.7,
			"p": 0,
			"r": 0,
			"wind": 17.7,
			"cloud": 76,
			"rh": 77
		},
		{
			"d": "2025-06-21",
			"w": 61,
			"tmax": 36.6,
			"tmin": 24.9,
			"t": 29.9,
			"p": 2.7,
			"r": 2.7,
			"wind": 10.5,
			"cloud": 90,
			"rh": 76
		},
		{
			"d": "2025-06-22",
			"w": 63,
			"tmax": 33.5,
			"tmin": 25.5,
			"t": 28.6,
			"p": 7,
			"r": 7,
			"wind": 11.9,
			"cloud": 100,
			"rh": 84
		},
		{
			"d": "2025-06-23",
			"w": 65,
			"tmax": 32.6,
			"tmin": 25,
			"t": 27.1,
			"p": 32.4,
			"r": 32.4,
			"wind": 11.4,
			"cloud": 92,
			"rh": 88
		},
		{
			"d": "2025-06-24",
			"w": 65,
			"tmax": 32.6,
			"tmin": 24.8,
			"t": 27.3,
			"p": 17,
			"r": 17,
			"wind": 7.2,
			"cloud": 98,
			"rh": 89
		},
		{
			"d": "2025-06-25",
			"w": 63,
			"tmax": 31.2,
			"tmin": 24.6,
			"t": 26.6,
			"p": 12.8,
			"r": 12.8,
			"wind": 10.2,
			"cloud": 100,
			"rh": 90
		},
		{
			"d": "2025-06-26",
			"w": 3,
			"tmax": 33.2,
			"tmin": 25.4,
			"t": 28.6,
			"p": 0,
			"r": 0,
			"wind": 12.1,
			"cloud": 62,
			"rh": 85
		},
		{
			"d": "2025-06-27",
			"w": 53,
			"tmax": 33.6,
			"tmin": 25.4,
			"t": 28.8,
			"p": 1.8,
			"r": 1.8,
			"wind": 8.9,
			"cloud": 38,
			"rh": 85
		},
		{
			"d": "2025-06-28",
			"w": 51,
			"tmax": 32.4,
			"tmin": 25.1,
			"t": 28.3,
			"p": .2,
			"r": .2,
			"wind": 14.3,
			"cloud": 37,
			"rh": 83
		},
		{
			"d": "2025-06-29",
			"w": 53,
			"tmax": 32.8,
			"tmin": 24.8,
			"t": 28.5,
			"p": .9,
			"r": .9,
			"wind": 12.4,
			"cloud": 60,
			"rh": 80
		},
		{
			"d": "2025-06-30",
			"w": 51,
			"tmax": 32.1,
			"tmin": 25.4,
			"t": 28.3,
			"p": 2.8,
			"r": 2.8,
			"wind": 12.5,
			"cloud": 59,
			"rh": 84
		},
		{
			"d": "2025-07-01",
			"w": 53,
			"tmax": 32.5,
			"tmin": 25.9,
			"t": 29,
			"p": 1.6,
			"r": 1.6,
			"wind": 12.9,
			"cloud": 28,
			"rh": 81
		},
		{
			"d": "2025-07-02",
			"w": 51,
			"tmax": 34.2,
			"tmin": 25.3,
			"t": 29.6,
			"p": .1,
			"r": .1,
			"wind": 11.8,
			"cloud": 77,
			"rh": 76
		},
		{
			"d": "2025-07-03",
			"w": 51,
			"tmax": 34.1,
			"tmin": 25.6,
			"t": 29.7,
			"p": .5,
			"r": .5,
			"wind": 13.5,
			"cloud": 45,
			"rh": 66
		},
		{
			"d": "2025-07-04",
			"w": 51,
			"tmax": 34.8,
			"tmin": 24.9,
			"t": 29.6,
			"p": .7,
			"r": .7,
			"wind": 13.2,
			"cloud": 88,
			"rh": 70
		},
		{
			"d": "2025-07-05",
			"w": 51,
			"tmax": 34.6,
			"tmin": 25.7,
			"t": 30,
			"p": .5,
			"r": .5,
			"wind": 14.4,
			"cloud": 62,
			"rh": 71
		},
		{
			"d": "2025-07-06",
			"w": 53,
			"tmax": 34,
			"tmin": 25.5,
			"t": 29.6,
			"p": 3.4,
			"r": 3.4,
			"wind": 14.3,
			"cloud": 30,
			"rh": 71
		},
		{
			"d": "2025-07-07",
			"w": 65,
			"tmax": 29.6,
			"tmin": 24.6,
			"t": 26.4,
			"p": 59.8,
			"r": 59.8,
			"wind": 14.2,
			"cloud": 96,
			"rh": 88
		},
		{
			"d": "2025-07-08",
			"w": 63,
			"tmax": 28.4,
			"tmin": 25.3,
			"t": 26.2,
			"p": 41.3,
			"r": 41.3,
			"wind": 26.3,
			"cloud": 100,
			"rh": 91
		},
		{
			"d": "2025-07-09",
			"w": 63,
			"tmax": 28,
			"tmin": 23.6,
			"t": 25.8,
			"p": 39,
			"r": 39,
			"wind": 33.2,
			"cloud": 91,
			"rh": 91
		},
		{
			"d": "2025-07-10",
			"w": 63,
			"tmax": 29.9,
			"tmin": 23.8,
			"t": 26.4,
			"p": 12.8,
			"r": 12.8,
			"wind": 16.5,
			"cloud": 51,
			"rh": 86
		},
		{
			"d": "2025-07-11",
			"w": 63,
			"tmax": 30.4,
			"tmin": 23.2,
			"t": 26.3,
			"p": 12.1,
			"r": 12.1,
			"wind": 13.3,
			"cloud": 82,
			"rh": 88
		},
		{
			"d": "2025-07-12",
			"w": 63,
			"tmax": 29.6,
			"tmin": 24.9,
			"t": 26.9,
			"p": 6.1,
			"r": 6.1,
			"wind": 9.3,
			"cloud": 100,
			"rh": 89
		},
		{
			"d": "2025-07-13",
			"w": 63,
			"tmax": 29.6,
			"tmin": 25.3,
			"t": 26.7,
			"p": 13.2,
			"r": 13.2,
			"wind": 5.2,
			"cloud": 98,
			"rh": 91
		},
		{
			"d": "2025-07-14",
			"w": 51,
			"tmax": 34.6,
			"tmin": 24.6,
			"t": 29.1,
			"p": .4,
			"r": .4,
			"wind": 8.9,
			"cloud": 60,
			"rh": 81
		},
		{
			"d": "2025-07-15",
			"w": 55,
			"tmax": 32.9,
			"tmin": 25.9,
			"t": 28.8,
			"p": 2.5,
			"r": 2.5,
			"wind": 12.2,
			"cloud": 65,
			"rh": 86
		},
		{
			"d": "2025-07-16",
			"w": 53,
			"tmax": 34.5,
			"tmin": 26.3,
			"t": 29.3,
			"p": 1,
			"r": 1,
			"wind": 8.5,
			"cloud": 99,
			"rh": 86
		},
		{
			"d": "2025-07-17",
			"w": 63,
			"tmax": 32.4,
			"tmin": 26.6,
			"t": 28.7,
			"p": 7.5,
			"r": 7.5,
			"wind": 10.7,
			"cloud": 100,
			"rh": 88
		},
		{
			"d": "2025-07-18",
			"w": 63,
			"tmax": 31,
			"tmin": 24.6,
			"t": 27.3,
			"p": 14,
			"r": 14,
			"wind": 14.1,
			"cloud": 88,
			"rh": 88
		},
		{
			"d": "2025-07-19",
			"w": 63,
			"tmax": 27.5,
			"tmin": 25,
			"t": 26.1,
			"p": 18.9,
			"r": 18.9,
			"wind": 18.1,
			"cloud": 100,
			"rh": 94
		},
		{
			"d": "2025-07-20",
			"w": 63,
			"tmax": 28.9,
			"tmin": 25,
			"t": 26.3,
			"p": 23.3,
			"r": 23.3,
			"wind": 19.2,
			"cloud": 100,
			"rh": 91
		},
		{
			"d": "2025-07-21",
			"w": 65,
			"tmax": 27.2,
			"tmin": 24.7,
			"t": 25.8,
			"p": 36.6,
			"r": 36.6,
			"wind": 18.9,
			"cloud": 100,
			"rh": 92
		},
		{
			"d": "2025-07-22",
			"w": 63,
			"tmax": 27.2,
			"tmin": 23.5,
			"t": 25.2,
			"p": 34,
			"r": 34,
			"wind": 12.6,
			"cloud": 100,
			"rh": 94
		},
		{
			"d": "2025-07-23",
			"w": 61,
			"tmax": 31,
			"tmin": 24.6,
			"t": 26.8,
			"p": 6.6,
			"r": 6.6,
			"wind": 14,
			"cloud": 69,
			"rh": 87
		},
		{
			"d": "2025-07-24",
			"w": 63,
			"tmax": 31.4,
			"tmin": 24.4,
			"t": 27.7,
			"p": 5.4,
			"r": 5.4,
			"wind": 14.1,
			"cloud": 69,
			"rh": 82
		},
		{
			"d": "2025-07-25",
			"w": 65,
			"tmax": 30.5,
			"tmin": 25.6,
			"t": 27.1,
			"p": 18.3,
			"r": 18.3,
			"wind": 19.9,
			"cloud": 93,
			"rh": 85
		},
		{
			"d": "2025-07-26",
			"w": 61,
			"tmax": 31.9,
			"tmin": 25.7,
			"t": 27.7,
			"p": 12,
			"r": 12,
			"wind": 16.2,
			"cloud": 94,
			"rh": 88
		},
		{
			"d": "2025-07-27",
			"w": 63,
			"tmax": 31.5,
			"tmin": 25.5,
			"t": 27.8,
			"p": 11.3,
			"r": 11.3,
			"wind": 9.2,
			"cloud": 63,
			"rh": 88
		},
		{
			"d": "2025-07-28",
			"w": 65,
			"tmax": 29.4,
			"tmin": 25.3,
			"t": 26.7,
			"p": 25.3,
			"r": 25.3,
			"wind": 8.1,
			"cloud": 88,
			"rh": 91
		},
		{
			"d": "2025-07-29",
			"w": 63,
			"tmax": 33.6,
			"tmin": 24.8,
			"t": 28.5,
			"p": 4.9,
			"r": 4.9,
			"wind": 16.6,
			"cloud": 40,
			"rh": 79
		},
		{
			"d": "2025-07-30",
			"w": 3,
			"tmax": 33.4,
			"tmin": 26.7,
			"t": 29.4,
			"p": 0,
			"r": 0,
			"wind": 18.4,
			"cloud": 64,
			"rh": 72
		},
		{
			"d": "2025-07-31",
			"w": 51,
			"tmax": 34.8,
			"tmin": 25.1,
			"t": 29.7,
			"p": .2,
			"r": .2,
			"wind": 11,
			"cloud": 13,
			"rh": 78
		},
		{
			"d": "2025-08-01",
			"w": 53,
			"tmax": 33.9,
			"tmin": 27.6,
			"t": 29.8,
			"p": 1.8,
			"r": 1.8,
			"wind": 10.6,
			"cloud": 73,
			"rh": 85
		},
		{
			"d": "2025-08-02",
			"w": 53,
			"tmax": 34.1,
			"tmin": 26.7,
			"t": 29.5,
			"p": 1.9,
			"r": 1.9,
			"wind": 13.4,
			"cloud": 67,
			"rh": 83
		},
		{
			"d": "2025-08-03",
			"w": 65,
			"tmax": 33.7,
			"tmin": 26.6,
			"t": 29.1,
			"p": 21,
			"r": 21,
			"wind": 9,
			"cloud": 81,
			"rh": 88
		},
		{
			"d": "2025-08-04",
			"w": 65,
			"tmax": 32.9,
			"tmin": 26.7,
			"t": 28.6,
			"p": 11.2,
			"r": 11.2,
			"wind": 9.3,
			"cloud": 73,
			"rh": 88
		},
		{
			"d": "2025-08-05",
			"w": 63,
			"tmax": 32,
			"tmin": 25.2,
			"t": 28.3,
			"p": 5.5,
			"r": 5.5,
			"wind": 16,
			"cloud": 38,
			"rh": 82
		},
		{
			"d": "2025-08-06",
			"w": 51,
			"tmax": 33.9,
			"tmin": 25.5,
			"t": 29.2,
			"p": .3,
			"r": .3,
			"wind": 13.7,
			"cloud": 13,
			"rh": 80
		},
		{
			"d": "2025-08-07",
			"w": 53,
			"tmax": 35.1,
			"tmin": 25.7,
			"t": 29.5,
			"p": .6,
			"r": .6,
			"wind": 10.1,
			"cloud": 75,
			"rh": 82
		},
		{
			"d": "2025-08-08",
			"w": 51,
			"tmax": 35.5,
			"tmin": 26.1,
			"t": 29.5,
			"p": .4,
			"r": .4,
			"wind": 13,
			"cloud": 83,
			"rh": 84
		},
		{
			"d": "2025-08-09",
			"w": 51,
			"tmax": 36,
			"tmin": 26.7,
			"t": 30.7,
			"p": .1,
			"r": .1,
			"wind": 12.2,
			"cloud": 98,
			"rh": 78
		},
		{
			"d": "2025-08-10",
			"w": 3,
			"tmax": 37.7,
			"tmin": 26.9,
			"t": 31.6,
			"p": 0,
			"r": 0,
			"wind": 11.6,
			"cloud": 98,
			"rh": 71
		},
		{
			"d": "2025-08-11",
			"w": 51,
			"tmax": 37.4,
			"tmin": 27.6,
			"t": 31.7,
			"p": .5,
			"r": .5,
			"wind": 12.1,
			"cloud": 90,
			"rh": 70
		},
		{
			"d": "2025-08-12",
			"w": 51,
			"tmax": 34.4,
			"tmin": 27.3,
			"t": 30,
			"p": .9,
			"r": .9,
			"wind": 15.8,
			"cloud": 98,
			"rh": 74
		},
		{
			"d": "2025-08-13",
			"w": 63,
			"tmax": 33.5,
			"tmin": 24.6,
			"t": 28.6,
			"p": 16.3,
			"r": 16.3,
			"wind": 17.2,
			"cloud": 67,
			"rh": 79
		},
		{
			"d": "2025-08-14",
			"w": 55,
			"tmax": 31.2,
			"tmin": 25.3,
			"t": 27.9,
			"p": 8,
			"r": 8,
			"wind": 15,
			"cloud": 46,
			"rh": 82
		},
		{
			"d": "2025-08-15",
			"w": 51,
			"tmax": 32.2,
			"tmin": 25.3,
			"t": 28.2,
			"p": 1.9,
			"r": 1.9,
			"wind": 13,
			"cloud": 48,
			"rh": 80
		},
		{
			"d": "2025-08-16",
			"w": 51,
			"tmax": 32.4,
			"tmin": 24.3,
			"t": 28.1,
			"p": 1.6,
			"r": 1.6,
			"wind": 13.6,
			"cloud": 44,
			"rh": 78
		},
		{
			"d": "2025-08-17",
			"w": 53,
			"tmax": 32.7,
			"tmin": 24.9,
			"t": 28.3,
			"p": 3.4,
			"r": 3.4,
			"wind": 13.8,
			"cloud": 47,
			"rh": 78
		},
		{
			"d": "2025-08-18",
			"w": 51,
			"tmax": 34.7,
			"tmin": 25.1,
			"t": 29.4,
			"p": .7,
			"r": .7,
			"wind": 13.3,
			"cloud": 42,
			"rh": 71
		},
		{
			"d": "2025-08-19",
			"w": 53,
			"tmax": 35.6,
			"tmin": 25.5,
			"t": 29.7,
			"p": 1.7,
			"r": 1.7,
			"wind": 12.5,
			"cloud": 14,
			"rh": 72
		},
		{
			"d": "2025-08-20",
			"w": 51,
			"tmax": 36.8,
			"tmin": 25.1,
			"t": 29.6,
			"p": .4,
			"r": .4,
			"wind": 8.8,
			"cloud": 25,
			"rh": 74
		},
		{
			"d": "2025-08-21",
			"w": 51,
			"tmax": 36.2,
			"tmin": 25.7,
			"t": 30.4,
			"p": .1,
			"r": .1,
			"wind": 12,
			"cloud": 15,
			"rh": 70
		},
		{
			"d": "2025-08-22",
			"w": 51,
			"tmax": 34.9,
			"tmin": 26.5,
			"t": 30,
			"p": .3,
			"r": .3,
			"wind": 11.2,
			"cloud": 31,
			"rh": 73
		},
		{
			"d": "2025-08-23",
			"w": 53,
			"tmax": 35.3,
			"tmin": 26.3,
			"t": 30.5,
			"p": .8,
			"r": .8,
			"wind": 12.8,
			"cloud": 34,
			"rh": 69
		},
		{
			"d": "2025-08-24",
			"w": 51,
			"tmax": 35.5,
			"tmin": 27.4,
			"t": 30.4,
			"p": 1.2,
			"r": 1.2,
			"wind": 14.8,
			"cloud": 54,
			"rh": 72
		},
		{
			"d": "2025-08-25",
			"w": 3,
			"tmax": 35.8,
			"tmin": 25.7,
			"t": 30.1,
			"p": 0,
			"r": 0,
			"wind": 11.1,
			"cloud": 25,
			"rh": 70
		},
		{
			"d": "2025-08-26",
			"w": 63,
			"tmax": 35.7,
			"tmin": 25,
			"t": 29.5,
			"p": 4.6,
			"r": 4.6,
			"wind": 13.5,
			"cloud": 42,
			"rh": 72
		},
		{
			"d": "2025-08-27",
			"w": 53,
			"tmax": 34.4,
			"tmin": 24.7,
			"t": 29,
			"p": .7,
			"r": .7,
			"wind": 12.1,
			"cloud": 52,
			"rh": 73
		},
		{
			"d": "2025-08-28",
			"w": 53,
			"tmax": 33.4,
			"tmin": 25.7,
			"t": 29.5,
			"p": 2.5,
			"r": 2.5,
			"wind": 14,
			"cloud": 35,
			"rh": 69
		},
		{
			"d": "2025-08-29",
			"w": 51,
			"tmax": 35,
			"tmin": 25.1,
			"t": 29.8,
			"p": .8,
			"r": .8,
			"wind": 12,
			"cloud": 45,
			"rh": 70
		},
		{
			"d": "2025-08-30",
			"w": 55,
			"tmax": 34.4,
			"tmin": 25.5,
			"t": 29.5,
			"p": 2.4,
			"r": 2.4,
			"wind": 12.9,
			"cloud": 45,
			"rh": 69
		},
		{
			"d": "2025-08-31",
			"w": 51,
			"tmax": 37.3,
			"tmin": 24.8,
			"t": 30.2,
			"p": .1,
			"r": .1,
			"wind": 15.4,
			"cloud": 39,
			"rh": 66
		},
		{
			"d": "2025-09-01",
			"w": 3,
			"tmax": 35.7,
			"tmin": 26.6,
			"t": 30.3,
			"p": 0,
			"r": 0,
			"wind": 12,
			"cloud": 54,
			"rh": 67
		},
		{
			"d": "2025-09-02",
			"w": 63,
			"tmax": 35.4,
			"tmin": 25.5,
			"t": 29,
			"p": 7.5,
			"r": 7.5,
			"wind": 13.3,
			"cloud": 93,
			"rh": 74
		},
		{
			"d": "2025-09-03",
			"w": 51,
			"tmax": 34.5,
			"tmin": 24.8,
			"t": 28.9,
			"p": .2,
			"r": .2,
			"wind": 11.6,
			"cloud": 59,
			"rh": 74
		},
		{
			"d": "2025-09-04",
			"w": 61,
			"tmax": 36.2,
			"tmin": 25.6,
			"t": 29.7,
			"p": 3.1,
			"r": 3.1,
			"wind": 12.1,
			"cloud": 39,
			"rh": 72
		},
		{
			"d": "2025-09-05",
			"w": 51,
			"tmax": 35.2,
			"tmin": 26.3,
			"t": 29.9,
			"p": .9,
			"r": .9,
			"wind": 13.9,
			"cloud": 14,
			"rh": 70
		},
		{
			"d": "2025-09-06",
			"w": 51,
			"tmax": 35.5,
			"tmin": 25.4,
			"t": 30.3,
			"p": .3,
			"r": .3,
			"wind": 12.5,
			"cloud": 23,
			"rh": 68
		},
		{
			"d": "2025-09-07",
			"w": 51,
			"tmax": 35.2,
			"tmin": 26.8,
			"t": 30.7,
			"p": .7,
			"r": .7,
			"wind": 12.8,
			"cloud": 37,
			"rh": 70
		},
		{
			"d": "2025-09-08",
			"w": 61,
			"tmax": 36.3,
			"tmin": 26.3,
			"t": 30.8,
			"p": 2.8,
			"r": 2.8,
			"wind": 12.2,
			"cloud": 29,
			"rh": 70
		},
		{
			"d": "2025-09-09",
			"w": 65,
			"tmax": 37.3,
			"tmin": 25.8,
			"t": 29.9,
			"p": 24.3,
			"r": 24.3,
			"wind": 11.2,
			"cloud": 89,
			"rh": 75
		},
		{
			"d": "2025-09-10",
			"w": 65,
			"tmax": 29.9,
			"tmin": 25.5,
			"t": 26.6,
			"p": 22,
			"r": 22,
			"wind": 9.5,
			"cloud": 100,
			"rh": 90
		},
		{
			"d": "2025-09-11",
			"w": 61,
			"tmax": 31.3,
			"tmin": 24.5,
			"t": 26.8,
			"p": 7.1,
			"r": 7.1,
			"wind": 9.5,
			"cloud": 80,
			"rh": 88
		},
		{
			"d": "2025-09-12",
			"w": 55,
			"tmax": 33.2,
			"tmin": 24.1,
			"t": 28.1,
			"p": 1,
			"r": 1,
			"wind": 9.1,
			"cloud": 46,
			"rh": 84
		},
		{
			"d": "2025-09-13",
			"w": 63,
			"tmax": 33.7,
			"tmin": 25.5,
			"t": 28.5,
			"p": 13.1,
			"r": 13.1,
			"wind": 10.4,
			"cloud": 68,
			"rh": 85
		},
		{
			"d": "2025-09-14",
			"w": 63,
			"tmax": 33,
			"tmin": 25.1,
			"t": 27.6,
			"p": 6.6,
			"r": 6.6,
			"wind": 10.1,
			"cloud": 44,
			"rh": 87
		},
		{
			"d": "2025-09-15",
			"w": 3,
			"tmax": 32.8,
			"tmin": 25.1,
			"t": 28.4,
			"p": 0,
			"r": 0,
			"wind": 11.9,
			"cloud": 43,
			"rh": 83
		},
		{
			"d": "2025-09-16",
			"w": 51,
			"tmax": 33.4,
			"tmin": 25.2,
			"t": 28.7,
			"p": .4,
			"r": .4,
			"wind": 12.5,
			"cloud": 15,
			"rh": 80
		},
		{
			"d": "2025-09-17",
			"w": 53,
			"tmax": 34.3,
			"tmin": 25.3,
			"t": 29,
			"p": 2,
			"r": 2,
			"wind": 12.3,
			"cloud": 24,
			"rh": 79
		},
		{
			"d": "2025-09-18",
			"w": 61,
			"tmax": 33.8,
			"tmin": 24.2,
			"t": 27.5,
			"p": 5.3,
			"r": 5.3,
			"wind": 15.5,
			"cloud": 61,
			"rh": 81
		},
		{
			"d": "2025-09-19",
			"w": 63,
			"tmax": 30.5,
			"tmin": 24.7,
			"t": 26.5,
			"p": 14.8,
			"r": 14.8,
			"wind": 12.3,
			"cloud": 92,
			"rh": 87
		},
		{
			"d": "2025-09-20",
			"w": 65,
			"tmax": 30.5,
			"tmin": 24.6,
			"t": 26,
			"p": 28,
			"r": 28,
			"wind": 12.1,
			"cloud": 100,
			"rh": 90
		},
		{
			"d": "2025-09-21",
			"w": 53,
			"tmax": 29.1,
			"tmin": 23.9,
			"t": 25.9,
			"p": 1.9,
			"r": 1.9,
			"wind": 14.8,
			"cloud": 92,
			"rh": 80
		},
		{
			"d": "2025-09-22",
			"w": 61,
			"tmax": 31.3,
			"tmin": 21.8,
			"t": 26.2,
			"p": 1.9,
			"r": 1.9,
			"wind": 14.9,
			"cloud": 35,
			"rh": 76
		},
		{
			"d": "2025-09-23",
			"w": 63,
			"tmax": 27.2,
			"tmin": 23.3,
			"t": 24.8,
			"p": 40,
			"r": 40,
			"wind": 15.1,
			"cloud": 96,
			"rh": 93
		},
		{
			"d": "2025-09-24",
			"w": 63,
			"tmax": 29.6,
			"tmin": 22.8,
			"t": 25.9,
			"p": 30.6,
			"r": 30.6,
			"wind": 17.7,
			"cloud": 97,
			"rh": 89
		},
		{
			"d": "2025-09-25",
			"w": 61,
			"tmax": 30.7,
			"tmin": 24.3,
			"t": 26.8,
			"p": 6.8,
			"r": 6.8,
			"wind": 12.7,
			"cloud": 74,
			"rh": 88
		},
		{
			"d": "2025-09-26",
			"w": 53,
			"tmax": 30.3,
			"tmin": 23,
			"t": 26.7,
			"p": 1.8,
			"r": 1.8,
			"wind": 10.7,
			"cloud": 71,
			"rh": 88
		},
		{
			"d": "2025-09-27",
			"w": 53,
			"tmax": 31.7,
			"tmin": 24.9,
			"t": 27.6,
			"p": 1.9,
			"r": 1.9,
			"wind": 10.9,
			"cloud": 60,
			"rh": 85
		},
		{
			"d": "2025-09-28",
			"w": 61,
			"tmax": 31.7,
			"tmin": 24.1,
			"t": 27.5,
			"p": 3.1,
			"r": 3.1,
			"wind": 10.6,
			"cloud": 37,
			"rh": 87
		},
		{
			"d": "2025-09-29",
			"w": 61,
			"tmax": 32.7,
			"tmin": 24.7,
			"t": 27.4,
			"p": 2.4,
			"r": 2.4,
			"wind": 7.6,
			"cloud": 55,
			"rh": 86
		},
		{
			"d": "2025-09-30",
			"w": 63,
			"tmax": 32.6,
			"tmin": 23.7,
			"t": 26.7,
			"p": 11.8,
			"r": 11.8,
			"wind": 7.9,
			"cloud": 66,
			"rh": 86
		},
		{
			"d": "2025-10-01",
			"w": 61,
			"tmax": 29.7,
			"tmin": 24.2,
			"t": 26.1,
			"p": 2.9,
			"r": 2.9,
			"wind": 9.9,
			"cloud": 82,
			"rh": 89
		},
		{
			"d": "2025-10-02",
			"w": 51,
			"tmax": 31.1,
			"tmin": 23.8,
			"t": 27.2,
			"p": .5,
			"r": .5,
			"wind": 11.5,
			"cloud": 43,
			"rh": 83
		},
		{
			"d": "2025-10-03",
			"w": 3,
			"tmax": 31.6,
			"tmin": 24.4,
			"t": 27.6,
			"p": 0,
			"r": 0,
			"wind": 11.4,
			"cloud": 35,
			"rh": 81
		},
		{
			"d": "2025-10-04",
			"w": 51,
			"tmax": 31,
			"tmin": 24.5,
			"t": 27.2,
			"p": 2.7,
			"r": 2.7,
			"wind": 12.1,
			"cloud": 51,
			"rh": 86
		},
		{
			"d": "2025-10-05",
			"w": 51,
			"tmax": 32.7,
			"tmin": 23.9,
			"t": 27.9,
			"p": .3,
			"r": .3,
			"wind": 9.3,
			"cloud": 38,
			"rh": 84
		},
		{
			"d": "2025-10-06",
			"w": 51,
			"tmax": 33.4,
			"tmin": 25.5,
			"t": 28.4,
			"p": .5,
			"r": .5,
			"wind": 8.2,
			"cloud": 41,
			"rh": 85
		},
		{
			"d": "2025-10-07",
			"w": 53,
			"tmax": 33.9,
			"tmin": 25.6,
			"t": 28.6,
			"p": 1.6,
			"r": 1.6,
			"wind": 10.6,
			"cloud": 45,
			"rh": 82
		},
		{
			"d": "2025-10-08",
			"w": 3,
			"tmax": 34.5,
			"tmin": 25.3,
			"t": 28.4,
			"p": 0,
			"r": 0,
			"wind": 14.5,
			"cloud": 42,
			"rh": 74
		},
		{
			"d": "2025-10-09",
			"w": 3,
			"tmax": 33.1,
			"tmin": 24.1,
			"t": 27.5,
			"p": 0,
			"r": 0,
			"wind": 13.8,
			"cloud": 43,
			"rh": 68
		},
		{
			"d": "2025-10-10",
			"w": 3,
			"tmax": 33.5,
			"tmin": 22.8,
			"t": 27.4,
			"p": 0,
			"r": 0,
			"wind": 12,
			"cloud": 18,
			"rh": 72
		},
		{
			"d": "2025-10-11",
			"w": 3,
			"tmax": 33.6,
			"tmin": 23.7,
			"t": 27.7,
			"p": 0,
			"r": 0,
			"wind": 12.3,
			"cloud": 37,
			"rh": 77
		},
		{
			"d": "2025-10-12",
			"w": 51,
			"tmax": 34,
			"tmin": 24.8,
			"t": 28.2,
			"p": .2,
			"r": .2,
			"wind": 12.7,
			"cloud": 51,
			"rh": 77
		},
		{
			"d": "2025-10-13",
			"w": 51,
			"tmax": 33.7,
			"tmin": 24.7,
			"t": 28.1,
			"p": .1,
			"r": .1,
			"wind": 10.1,
			"cloud": 39,
			"rh": 77
		},
		{
			"d": "2025-10-14",
			"w": 63,
			"tmax": 30,
			"tmin": 23.9,
			"t": 25.9,
			"p": 25,
			"r": 25,
			"wind": 7.1,
			"cloud": 91,
			"rh": 86
		},
		{
			"d": "2025-10-15",
			"w": 63,
			"tmax": 29.5,
			"tmin": 23.3,
			"t": 25.8,
			"p": 23.8,
			"r": 23.8,
			"wind": 8.5,
			"cloud": 65,
			"rh": 86
		},
		{
			"d": "2025-10-16",
			"w": 53,
			"tmax": 31.3,
			"tmin": 23.8,
			"t": 26.5,
			"p": 2.4,
			"r": 2.4,
			"wind": 10.3,
			"cloud": 44,
			"rh": 83
		},
		{
			"d": "2025-10-17",
			"w": 51,
			"tmax": 29.8,
			"tmin": 23.4,
			"t": 26.2,
			"p": .7,
			"r": .7,
			"wind": 8.2,
			"cloud": 23,
			"rh": 85
		},
		{
			"d": "2025-10-18",
			"w": 63,
			"tmax": 30.4,
			"tmin": 22.2,
			"t": 25,
			"p": 10.8,
			"r": 10.8,
			"wind": 9.3,
			"cloud": 61,
			"rh": 87
		},
		{
			"d": "2025-10-19",
			"w": 3,
			"tmax": 26.4,
			"tmin": 20.4,
			"t": 23.5,
			"p": 0,
			"r": 0,
			"wind": 16.1,
			"cloud": 90,
			"rh": 73
		},
		{
			"d": "2025-10-20",
			"w": 55,
			"tmax": 22.3,
			"tmin": 17.3,
			"t": 19.8,
			"p": 1.2,
			"r": 1.2,
			"wind": 22.9,
			"cloud": 100,
			"rh": 67
		},
		{
			"d": "2025-10-21",
			"w": 61,
			"tmax": 18.7,
			"tmin": 15,
			"t": 16.3,
			"p": 12,
			"r": 12,
			"wind": 19,
			"cloud": 100,
			"rh": 76
		},
		{
			"d": "2025-10-22",
			"w": 55,
			"tmax": 18.7,
			"tmin": 14.8,
			"t": 16.3,
			"p": 3.7,
			"r": 3.7,
			"wind": 17.8,
			"cloud": 95,
			"rh": 72
		},
		{
			"d": "2025-10-23",
			"w": 3,
			"tmax": 23.1,
			"tmin": 14.7,
			"t": 18,
			"p": 0,
			"r": 0,
			"wind": 17.6,
			"cloud": 24,
			"rh": 63
		},
		{
			"d": "2025-10-24",
			"w": 1,
			"tmax": 24.6,
			"tmin": 14.3,
			"t": 18.4,
			"p": 0,
			"r": 0,
			"wind": 16.6,
			"cloud": 8,
			"rh": 66
		},
		{
			"d": "2025-10-25",
			"w": 3,
			"tmax": 26,
			"tmin": 14.1,
			"t": 19.3,
			"p": 0,
			"r": 0,
			"wind": 12.3,
			"cloud": 21,
			"rh": 69
		},
		{
			"d": "2025-10-26",
			"w": 3,
			"tmax": 25.2,
			"tmin": 15.9,
			"t": 19.9,
			"p": 0,
			"r": 0,
			"wind": 13.1,
			"cloud": 44,
			"rh": 68
		},
		{
			"d": "2025-10-27",
			"w": 3,
			"tmax": 24.1,
			"tmin": 14.7,
			"t": 18.4,
			"p": 0,
			"r": 0,
			"wind": 10.8,
			"cloud": 40,
			"rh": 62
		},
		{
			"d": "2025-10-28",
			"w": 61,
			"tmax": 17.9,
			"tmin": 15.6,
			"t": 16.4,
			"p": 8.7,
			"r": 8.7,
			"wind": 9.2,
			"cloud": 94,
			"rh": 81
		},
		{
			"d": "2025-10-29",
			"w": 3,
			"tmax": 23.8,
			"tmin": 12.5,
			"t": 18,
			"p": 0,
			"r": 0,
			"wind": 14.3,
			"cloud": 44,
			"rh": 74
		},
		{
			"d": "2025-10-30",
			"w": 63,
			"tmax": 20.1,
			"tmin": 16.6,
			"t": 18.2,
			"p": 16.7,
			"r": 16.7,
			"wind": 7.9,
			"cloud": 99,
			"rh": 89
		},
		{
			"d": "2025-10-31",
			"w": 3,
			"tmax": 24.3,
			"tmin": 16.5,
			"t": 19.8,
			"p": 0,
			"r": 0,
			"wind": 14.7,
			"cloud": 72,
			"rh": 76
		},
		{
			"d": "2025-11-01",
			"w": 3,
			"tmax": 23.3,
			"tmin": 16.6,
			"t": 19.4,
			"p": 0,
			"r": 0,
			"wind": 7.2,
			"cloud": 95,
			"rh": 74
		},
		{
			"d": "2025-11-02",
			"w": 51,
			"tmax": 23,
			"tmin": 16.5,
			"t": 18.9,
			"p": .8,
			"r": .8,
			"wind": 10.5,
			"cloud": 90,
			"rh": 74
		},
		{
			"d": "2025-11-03",
			"w": 53,
			"tmax": 17.1,
			"tmin": 14.5,
			"t": 15.7,
			"p": 3.4,
			"r": 3.4,
			"wind": 8.8,
			"cloud": 96,
			"rh": 77
		},
		{
			"d": "2025-11-04",
			"w": 61,
			"tmax": 16.2,
			"tmin": 13.6,
			"t": 14.7,
			"p": 20.8,
			"r": 20.8,
			"wind": 10.5,
			"cloud": 100,
			"rh": 92
		},
		{
			"d": "2025-11-05",
			"w": 51,
			"tmax": 23.3,
			"tmin": 14.2,
			"t": 17.4,
			"p": 1.6,
			"r": 1.6,
			"wind": 8.3,
			"cloud": 76,
			"rh": 84
		},
		{
			"d": "2025-11-06",
			"w": 51,
			"tmax": 23.6,
			"tmin": 14.3,
			"t": 18.8,
			"p": .2,
			"r": .2,
			"wind": 11.4,
			"cloud": 64,
			"rh": 84
		},
		{
			"d": "2025-11-07",
			"w": 3,
			"tmax": 22.9,
			"tmin": 18.2,
			"t": 20.3,
			"p": 0,
			"r": 0,
			"wind": 5.6,
			"cloud": 100,
			"rh": 87
		},
		{
			"d": "2025-11-08",
			"w": 53,
			"tmax": 26.1,
			"tmin": 17.6,
			"t": 21.2,
			"p": 2,
			"r": 2,
			"wind": 6.5,
			"cloud": 74,
			"rh": 88
		},
		{
			"d": "2025-11-09",
			"w": 53,
			"tmax": 21.2,
			"tmin": 18.8,
			"t": 20.3,
			"p": 1.5,
			"r": 1.5,
			"wind": 8.5,
			"cloud": 99,
			"rh": 88
		},
		{
			"d": "2025-11-10",
			"w": 51,
			"tmax": 21.6,
			"tmin": 17.1,
			"t": 18.6,
			"p": .1,
			"r": .1,
			"wind": 15,
			"cloud": 98,
			"rh": 68
		},
		{
			"d": "2025-11-11",
			"w": 53,
			"tmax": 18.4,
			"tmin": 15.1,
			"t": 16.6,
			"p": 2.8,
			"r": 2.8,
			"wind": 14.7,
			"cloud": 100,
			"rh": 75
		},
		{
			"d": "2025-11-12",
			"w": 65,
			"tmax": 16.4,
			"tmin": 14.1,
			"t": 15.2,
			"p": 35.6,
			"r": 35.6,
			"wind": 16,
			"cloud": 100,
			"rh": 90
		},
		{
			"d": "2025-11-13",
			"w": 51,
			"tmax": 22.6,
			"tmin": 14.1,
			"t": 17.9,
			"p": .8,
			"r": .8,
			"wind": 18.2,
			"cloud": 49,
			"rh": 77
		},
		{
			"d": "2025-11-14",
			"w": 0,
			"tmax": 21.5,
			"tmin": 11.1,
			"t": 15.7,
			"p": 0,
			"r": 0,
			"wind": 8.5,
			"cloud": 0,
			"rh": 74
		},
		{
			"d": "2025-11-15",
			"w": 3,
			"tmax": 22.3,
			"tmin": 10.4,
			"t": 15.8,
			"p": 0,
			"r": 0,
			"wind": 9.9,
			"cloud": 24,
			"rh": 78
		},
		{
			"d": "2025-11-16",
			"w": 1,
			"tmax": 23.4,
			"tmin": 11.8,
			"t": 16.9,
			"p": 0,
			"r": 0,
			"wind": 7.4,
			"cloud": 5,
			"rh": 81
		},
		{
			"d": "2025-11-17",
			"w": 3,
			"tmax": 23.3,
			"tmin": 13,
			"t": 16.7,
			"p": 0,
			"r": 0,
			"wind": 18,
			"cloud": 83,
			"rh": 75
		},
		{
			"d": "2025-11-18",
			"w": 3,
			"tmax": 14,
			"tmin": 9.2,
			"t": 11.2,
			"p": 0,
			"r": 0,
			"wind": 17.1,
			"cloud": 94,
			"rh": 60
		},
		{
			"d": "2025-11-19",
			"w": 3,
			"tmax": 14.3,
			"tmin": 6.2,
			"t": 9.4,
			"p": 0,
			"r": 0,
			"wind": 10.6,
			"cloud": 86,
			"rh": 47
		},
		{
			"d": "2025-11-20",
			"w": 3,
			"tmax": 15.1,
			"tmin": 3.4,
			"t": 9,
			"p": 0,
			"r": 0,
			"wind": 7.6,
			"cloud": 19,
			"rh": 67
		},
		{
			"d": "2025-11-21",
			"w": 3,
			"tmax": 18.7,
			"tmin": 6.6,
			"t": 11.9,
			"p": 0,
			"r": 0,
			"wind": 12.4,
			"cloud": 13,
			"rh": 67
		},
		{
			"d": "2025-11-22",
			"w": 0,
			"tmax": 18.4,
			"tmin": 5.6,
			"t": 11.5,
			"p": 0,
			"r": 0,
			"wind": 5.2,
			"cloud": 0,
			"rh": 73
		},
		{
			"d": "2025-11-23",
			"w": 0,
			"tmax": 20.9,
			"tmin": 7.6,
			"t": 13.8,
			"p": 0,
			"r": 0,
			"wind": 7.5,
			"cloud": 1,
			"rh": 77
		},
		{
			"d": "2025-11-24",
			"w": 3,
			"tmax": 23.5,
			"tmin": 11.2,
			"t": 16.7,
			"p": 0,
			"r": 0,
			"wind": 9.1,
			"cloud": 37,
			"rh": 65
		},
		{
			"d": "2025-11-25",
			"w": 3,
			"tmax": 19.7,
			"tmin": 10,
			"t": 15.1,
			"p": 0,
			"r": 0,
			"wind": 11.9,
			"cloud": 9,
			"rh": 41
		},
		{
			"d": "2025-11-26",
			"w": 0,
			"tmax": 16.7,
			"tmin": 5.1,
			"t": 10.9,
			"p": 0,
			"r": 0,
			"wind": 7.2,
			"cloud": 0,
			"rh": 57
		},
		{
			"d": "2025-11-27",
			"w": 3,
			"tmax": 20.3,
			"tmin": 6.2,
			"t": 12.3,
			"p": 0,
			"r": 0,
			"wind": 12.1,
			"cloud": 52,
			"rh": 56
		},
		{
			"d": "2025-11-28",
			"w": 2,
			"tmax": 16.1,
			"tmin": 3.8,
			"t": 9.6,
			"p": 0,
			"r": 0,
			"wind": 8.5,
			"cloud": 14,
			"rh": 62
		},
		{
			"d": "2025-11-29",
			"w": 0,
			"tmax": 20.3,
			"tmin": 4.5,
			"t": 11.6,
			"p": 0,
			"r": 0,
			"wind": 6.4,
			"cloud": 0,
			"rh": 70
		},
		{
			"d": "2025-11-30",
			"w": 0,
			"tmax": 23.4,
			"tmin": 7.4,
			"t": 14.8,
			"p": 0,
			"r": 0,
			"wind": 7.6,
			"cloud": 2,
			"rh": 79
		},
		{
			"d": "2025-12-01",
			"w": 3,
			"tmax": 23.7,
			"tmin": 10.6,
			"t": 16.1,
			"p": 0,
			"r": 0,
			"wind": 11.3,
			"cloud": 18,
			"rh": 66
		},
		{
			"d": "2025-12-02",
			"w": 3,
			"tmax": 22.4,
			"tmin": 9.8,
			"t": 15.4,
			"p": 0,
			"r": 0,
			"wind": 15.3,
			"cloud": 32,
			"rh": 67
		},
		{
			"d": "2025-12-03",
			"w": 3,
			"tmax": 17.2,
			"tmin": 8,
			"t": 13.3,
			"p": 0,
			"r": 0,
			"wind": 16.1,
			"cloud": 37,
			"rh": 55
		},
		{
			"d": "2025-12-04",
			"w": 3,
			"tmax": 14.3,
			"tmin": 3.7,
			"t": 9.4,
			"p": 0,
			"r": 0,
			"wind": 4,
			"cloud": 14,
			"rh": 50
		},
		{
			"d": "2025-12-05",
			"w": 3,
			"tmax": 17,
			"tmin": 8.2,
			"t": 11.7,
			"p": 0,
			"r": 0,
			"wind": 11,
			"cloud": 50,
			"rh": 53
		},
		{
			"d": "2025-12-06",
			"w": 0,
			"tmax": 19.4,
			"tmin": 6.9,
			"t": 12.6,
			"p": 0,
			"r": 0,
			"wind": 9.5,
			"cloud": 1,
			"rh": 63
		},
		{
			"d": "2025-12-07",
			"w": 2,
			"tmax": 22.1,
			"tmin": 7.9,
			"t": 14.7,
			"p": 0,
			"r": 0,
			"wind": 7.1,
			"cloud": 12,
			"rh": 71
		},
		{
			"d": "2025-12-08",
			"w": 1,
			"tmax": 21.9,
			"tmin": 10.5,
			"t": 15.4,
			"p": 0,
			"r": 0,
			"wind": 13.8,
			"cloud": 5,
			"rh": 63
		},
		{
			"d": "2025-12-09",
			"w": 3,
			"tmax": 17.6,
			"tmin": 6.6,
			"t": 12.8,
			"p": 0,
			"r": 0,
			"wind": 10.7,
			"cloud": 54,
			"rh": 66
		},
		{
			"d": "2025-12-10",
			"w": 51,
			"tmax": 18,
			"tmin": 12.8,
			"t": 15.1,
			"p": .8,
			"r": .8,
			"wind": 6.8,
			"cloud": 100,
			"rh": 78
		},
		{
			"d": "2025-12-11",
			"w": 3,
			"tmax": 22.8,
			"tmin": 10.7,
			"t": 15.9,
			"p": 0,
			"r": 0,
			"wind": 9.7,
			"cloud": 27,
			"rh": 75
		},
		{
			"d": "2025-12-12",
			"w": 3,
			"tmax": 18.5,
			"tmin": 9.1,
			"t": 13.6,
			"p": 0,
			"r": 0,
			"wind": 13,
			"cloud": 55,
			"rh": 64
		},
		{
			"d": "2025-12-13",
			"w": 51,
			"tmax": 16.3,
			"tmin": 9.4,
			"t": 12.4,
			"p": .4,
			"r": .4,
			"wind": 13.6,
			"cloud": 84,
			"rh": 67
		},
		{
			"d": "2025-12-14",
			"w": 1,
			"tmax": 14.2,
			"tmin": 3.9,
			"t": 8.6,
			"p": 0,
			"r": 0,
			"wind": 16.3,
			"cloud": 2,
			"rh": 43
		},
		{
			"d": "2025-12-15",
			"w": 1,
			"tmax": 14.3,
			"tmin": .9,
			"t": 7.9,
			"p": 0,
			"r": 0,
			"wind": 5.6,
			"cloud": 3,
			"rh": 66
		},
		{
			"d": "2025-12-16",
			"w": 1,
			"tmax": 21.7,
			"tmin": 5.6,
			"t": 12.5,
			"p": 0,
			"r": 0,
			"wind": 10.2,
			"cloud": 2,
			"rh": 74
		},
		{
			"d": "2025-12-17",
			"w": 1,
			"tmax": 21.7,
			"tmin": 8.4,
			"t": 14,
			"p": 0,
			"r": 0,
			"wind": 11.3,
			"cloud": 3,
			"rh": 64
		},
		{
			"d": "2025-12-18",
			"w": 3,
			"tmax": 18.2,
			"tmin": 6,
			"t": 12.2,
			"p": 0,
			"r": 0,
			"wind": 10.4,
			"cloud": 17,
			"rh": 71
		},
		{
			"d": "2025-12-19",
			"w": 3,
			"tmax": 21.8,
			"tmin": 9.4,
			"t": 15.2,
			"p": 0,
			"r": 0,
			"wind": 8.9,
			"cloud": 65,
			"rh": 76
		},
		{
			"d": "2025-12-20",
			"w": 3,
			"tmax": 25.7,
			"tmin": 10.6,
			"t": 17.1,
			"p": 0,
			"r": 0,
			"wind": 9.1,
			"cloud": 31,
			"rh": 76
		},
		{
			"d": "2025-12-21",
			"w": 3,
			"tmax": 16.4,
			"tmin": 9.3,
			"t": 12.4,
			"p": 0,
			"r": 0,
			"wind": 15.4,
			"cloud": 91,
			"rh": 64
		},
		{
			"d": "2025-12-22",
			"w": 3,
			"tmax": 15.3,
			"tmin": 6,
			"t": 11,
			"p": 0,
			"r": 0,
			"wind": 8.1,
			"cloud": 72,
			"rh": 68
		},
		{
			"d": "2025-12-23",
			"w": 3,
			"tmax": 21.3,
			"tmin": 10.8,
			"t": 15.5,
			"p": 0,
			"r": 0,
			"wind": 6.6,
			"cloud": 49,
			"rh": 66
		},
		{
			"d": "2025-12-24",
			"w": 53,
			"tmax": 17.3,
			"tmin": 9.9,
			"t": 13.2,
			"p": 1.5,
			"r": 1.5,
			"wind": 10.1,
			"cloud": 76,
			"rh": 79
		},
		{
			"d": "2025-12-25",
			"w": 55,
			"tmax": 11.1,
			"tmin": 4.4,
			"t": 8.4,
			"p": 3.8,
			"r": 3.8,
			"wind": 19.4,
			"cloud": 64,
			"rh": 66
		},
		{
			"d": "2025-12-26",
			"w": 0,
			"tmax": 10.6,
			"tmin": .2,
			"t": 5.1,
			"p": 0,
			"r": 0,
			"wind": 9.2,
			"cloud": 0,
			"rh": 61
		},
		{
			"d": "2025-12-27",
			"w": 3,
			"tmax": 15.7,
			"tmin": 1.6,
			"t": 7.7,
			"p": 0,
			"r": 0,
			"wind": 10.7,
			"cloud": 15,
			"rh": 70
		},
		{
			"d": "2025-12-28",
			"w": 3,
			"tmax": 16.6,
			"tmin": 3.2,
			"t": 9.4,
			"p": 0,
			"r": 0,
			"wind": 9.6,
			"cloud": 7,
			"rh": 76
		},
		{
			"d": "2025-12-29",
			"w": 0,
			"tmax": 19.2,
			"tmin": 4.2,
			"t": 10.7,
			"p": 0,
			"r": 0,
			"wind": 9.4,
			"cloud": 0,
			"rh": 75
		},
		{
			"d": "2025-12-30",
			"w": 3,
			"tmax": 19.8,
			"tmin": 7.4,
			"t": 12.9,
			"p": 0,
			"r": 0,
			"wind": 13.1,
			"cloud": 41,
			"rh": 62
		},
		{
			"d": "2025-12-31",
			"w": 3,
			"tmax": 16.4,
			"tmin": 8.3,
			"t": 11.7,
			"p": 0,
			"r": 0,
			"wind": 17.2,
			"cloud": 100,
			"rh": 59
		},
		{
			"d": "2026-01-01",
			"w": 53,
			"tmax": 11.5,
			"tmin": 7.1,
			"t": 9,
			"p": 1.9,
			"r": 1.9,
			"wind": 13.9,
			"cloud": 97,
			"rh": 64
		},
		{
			"d": "2026-01-02",
			"w": 3,
			"tmax": 10.8,
			"tmin": 2.2,
			"t": 6.3,
			"p": 0,
			"r": 0,
			"wind": 17.8,
			"cloud": 12,
			"rh": 47
		},
		{
			"d": "2026-01-03",
			"w": 0,
			"tmax": 9.3,
			"tmin": -2.4,
			"t": 3.6,
			"p": 0,
			"r": 0,
			"wind": 9.6,
			"cloud": 0,
			"rh": 62
		},
		{
			"d": "2026-01-04",
			"w": 3,
			"tmax": 15.8,
			"tmin": 1.6,
			"t": 8.5,
			"p": 0,
			"r": 0,
			"wind": 5.7,
			"cloud": 40,
			"rh": 64
		},
		{
			"d": "2026-01-05",
			"w": 51,
			"tmax": 13.4,
			"tmin": 5.1,
			"t": 9.5,
			"p": .3,
			"r": .3,
			"wind": 17,
			"cloud": 69,
			"rh": 65
		},
		{
			"d": "2026-01-06",
			"w": 3,
			"tmax": 12.3,
			"tmin": 1.7,
			"t": 6.6,
			"p": 0,
			"r": 0,
			"wind": 16.7,
			"cloud": 25,
			"rh": 60
		},
		{
			"d": "2026-01-07",
			"w": 0,
			"tmax": 15.2,
			"tmin": 2.2,
			"t": 7.2,
			"p": 0,
			"r": 0,
			"wind": 11.6,
			"cloud": 1,
			"rh": 57
		},
		{
			"d": "2026-01-08",
			"w": 0,
			"tmax": 14.1,
			"tmin": .8,
			"t": 6.9,
			"p": 0,
			"r": 0,
			"wind": 15.1,
			"cloud": 0,
			"rh": 47
		},
		{
			"d": "2026-01-09",
			"w": 0,
			"tmax": 12.9,
			"tmin": -.7,
			"t": 6,
			"p": 0,
			"r": 0,
			"wind": 11,
			"cloud": 0,
			"rh": 53
		},
		{
			"d": "2026-01-10",
			"w": 0,
			"tmax": 19.4,
			"tmin": .8,
			"t": 9.2,
			"p": 0,
			"r": 0,
			"wind": 10.8,
			"cloud": 0,
			"rh": 47
		},
		{
			"d": "2026-01-11",
			"w": 0,
			"tmax": 16.2,
			"tmin": 2.7,
			"t": 8.3,
			"p": 0,
			"r": 0,
			"wind": 16.4,
			"cloud": 0,
			"rh": 44
		},
		{
			"d": "2026-01-12",
			"w": 1,
			"tmax": 16.5,
			"tmin": .7,
			"t": 8.5,
			"p": 0,
			"r": 0,
			"wind": 11.4,
			"cloud": 7,
			"rh": 55
		},
		{
			"d": "2026-01-13",
			"w": 0,
			"tmax": 21,
			"tmin": 4,
			"t": 11.2,
			"p": 0,
			"r": 0,
			"wind": 15.6,
			"cloud": 0,
			"rh": 55
		},
		{
			"d": "2026-01-14",
			"w": 1,
			"tmax": 20.2,
			"tmin": 3.5,
			"t": 11.2,
			"p": 0,
			"r": 0,
			"wind": 12.1,
			"cloud": 1,
			"rh": 62
		},
		{
			"d": "2026-01-15",
			"w": 2,
			"tmax": 23.9,
			"tmin": 7.3,
			"t": 14.6,
			"p": 0,
			"r": 0,
			"wind": 10.7,
			"cloud": 15,
			"rh": 63
		},
		{
			"d": "2026-01-16",
			"w": 1,
			"tmax": 22.6,
			"tmin": 6.9,
			"t": 13.9,
			"p": 0,
			"r": 0,
			"wind": 15.4,
			"cloud": 3,
			"rh": 61
		},
		{
			"d": "2026-01-17",
			"w": 3,
			"tmax": 22.2,
			"tmin": 7.2,
			"t": 14.3,
			"p": 0,
			"r": 0,
			"wind": 14.4,
			"cloud": 19,
			"rh": 63
		},
		{
			"d": "2026-01-18",
			"w": 3,
			"tmax": 20.9,
			"tmin": 9.5,
			"t": 14.8,
			"p": 0,
			"r": 0,
			"wind": 13.8,
			"cloud": 29,
			"rh": 69
		},
		{
			"d": "2026-01-19",
			"w": 3,
			"tmax": 22.2,
			"tmin": 9.1,
			"t": 14,
			"p": 0,
			"r": 0,
			"wind": 14.7,
			"cloud": 64,
			"rh": 71
		},
		{
			"d": "2026-01-20",
			"w": 51,
			"tmax": 9.3,
			"tmin": 4.2,
			"t": 7,
			"p": .1,
			"r": .1,
			"wind": 14.9,
			"cloud": 100,
			"rh": 56
		},
		{
			"d": "2026-01-21",
			"w": 51,
			"tmax": 11.1,
			"tmin": 2.2,
			"t": 5.4,
			"p": .1,
			"r": .1,
			"wind": 14.7,
			"cloud": 67,
			"rh": 47
		},
		{
			"d": "2026-01-22",
			"w": 3,
			"tmax": 9.6,
			"tmin": 2.6,
			"t": 5.2,
			"p": 0,
			"r": 0,
			"wind": 11.1,
			"cloud": 71,
			"rh": 40
		},
		{
			"d": "2026-01-23",
			"w": 2,
			"tmax": 13.1,
			"tmin": .6,
			"t": 6.7,
			"p": 0,
			"r": 0,
			"wind": 11,
			"cloud": 21,
			"rh": 56
		},
		{
			"d": "2026-01-24",
			"w": 3,
			"tmax": 14.1,
			"tmin": 4.5,
			"t": 8.7,
			"p": 0,
			"r": 0,
			"wind": 11.8,
			"cloud": 67,
			"rh": 63
		},
		{
			"d": "2026-01-25",
			"w": 51,
			"tmax": 17.4,
			"tmin": 8.2,
			"t": 12.4,
			"p": .4,
			"r": .4,
			"wind": 10.6,
			"cloud": 94,
			"rh": 66
		},
		{
			"d": "2026-01-26",
			"w": 53,
			"tmax": 23.2,
			"tmin": 11,
			"t": 15.5,
			"p": 2.7,
			"r": 2.7,
			"wind": 11,
			"cloud": 82,
			"rh": 84
		},
		{
			"d": "2026-01-27",
			"w": 53,
			"tmax": 14.2,
			"tmin": 7.5,
			"t": 10.3,
			"p": 2.9,
			"r": 2.9,
			"wind": 10.5,
			"cloud": 100,
			"rh": 80
		},
		{
			"d": "2026-01-28",
			"w": 51,
			"tmax": 12.5,
			"tmin": 6.4,
			"t": 8.9,
			"p": .1,
			"r": .1,
			"wind": 17.1,
			"cloud": 98,
			"rh": 71
		},
		{
			"d": "2026-01-29",
			"w": 51,
			"tmax": 13.9,
			"tmin": 5.8,
			"t": 9.8,
			"p": .1,
			"r": .1,
			"wind": 10.8,
			"cloud": 90,
			"rh": 71
		},
		{
			"d": "2026-01-30",
			"w": 53,
			"tmax": 14.3,
			"tmin": 8.3,
			"t": 10.9,
			"p": 2,
			"r": 2,
			"wind": 8.9,
			"cloud": 100,
			"rh": 87
		},
		{
			"d": "2026-01-31",
			"w": 53,
			"tmax": 11,
			"tmin": 6.5,
			"t": 8.9,
			"p": 2.5,
			"r": 2.5,
			"wind": 9.9,
			"cloud": 100,
			"rh": 81
		},
		{
			"d": "2026-02-01",
			"w": 3,
			"tmax": 11.9,
			"tmin": 4.2,
			"t": 7.9,
			"p": 0,
			"r": 0,
			"wind": 9.6,
			"cloud": 78,
			"rh": 71
		},
		{
			"d": "2026-02-02",
			"w": 3,
			"tmax": 15.2,
			"tmin": 3.8,
			"t": 8.9,
			"p": 0,
			"r": 0,
			"wind": 7.2,
			"cloud": 10,
			"rh": 69
		},
		{
			"d": "2026-02-03",
			"w": 3,
			"tmax": 12.5,
			"tmin": 1.4,
			"t": 7.1,
			"p": 0,
			"r": 0,
			"wind": 10.6,
			"cloud": 30,
			"rh": 74
		},
		{
			"d": "2026-02-04",
			"w": 3,
			"tmax": 20.2,
			"tmin": 4.4,
			"t": 11.5,
			"p": 0,
			"r": 0,
			"wind": 10.3,
			"cloud": 23,
			"rh": 74
		},
		{
			"d": "2026-02-05",
			"w": 3,
			"tmax": 25.4,
			"tmin": 10.8,
			"t": 16.4,
			"p": 0,
			"r": 0,
			"wind": 14.1,
			"cloud": 74,
			"rh": 70
		},
		{
			"d": "2026-02-06",
			"w": 51,
			"tmax": 14.1,
			"tmin": 7.8,
			"t": 12,
			"p": 1.5,
			"r": 1.5,
			"wind": 12.1,
			"cloud": 96,
			"rh": 73
		},
		{
			"d": "2026-02-07",
			"w": 3,
			"tmax": 12.1,
			"tmin": 4,
			"t": 7.9,
			"p": 0,
			"r": 0,
			"wind": 16.2,
			"cloud": 42,
			"rh": 62
		},
		{
			"d": "2026-02-08",
			"w": 3,
			"tmax": 10.6,
			"tmin": 1.1,
			"t": 5.5,
			"p": 0,
			"r": 0,
			"wind": 13.9,
			"cloud": 11,
			"rh": 44
		},
		{
			"d": "2026-02-09",
			"w": 3,
			"tmax": 10.3,
			"tmin": -1.5,
			"t": 4.8,
			"p": 0,
			"r": 0,
			"wind": 10.5,
			"cloud": 48,
			"rh": 56
		},
		{
			"d": "2026-02-10",
			"w": 53,
			"tmax": 19.4,
			"tmin": 5.1,
			"t": 11.7,
			"p": 1.3,
			"r": 1.3,
			"wind": 9.8,
			"cloud": 75,
			"rh": 73
		},
		{
			"d": "2026-02-11",
			"w": 51,
			"tmax": 14.7,
			"tmin": 7.4,
			"t": 11.1,
			"p": .5,
			"r": .5,
			"wind": 13.2,
			"cloud": 60,
			"rh": 77
		},
		{
			"d": "2026-02-12",
			"w": 3,
			"tmax": 16.7,
			"tmin": 3.9,
			"t": 9.7,
			"p": 0,
			"r": 0,
			"wind": 12.7,
			"cloud": 14,
			"rh": 75
		},
		{
			"d": "2026-02-13",
			"w": 51,
			"tmax": 20.5,
			"tmin": 7.5,
			"t": 13.1,
			"p": .1,
			"r": .1,
			"wind": 12.1,
			"cloud": 53,
			"rh": 75
		},
		{
			"d": "2026-02-14",
			"w": 55,
			"tmax": 24.7,
			"tmin": 12,
			"t": 16.9,
			"p": 1.7,
			"r": 1.7,
			"wind": 8.6,
			"cloud": 43,
			"rh": 82
		},
		{
			"d": "2026-02-15",
			"w": 51,
			"tmax": 21.7,
			"tmin": 11.7,
			"t": 16.1,
			"p": .1,
			"r": .1,
			"wind": 12,
			"cloud": 65,
			"rh": 87
		},
		{
			"d": "2026-02-16",
			"w": 61,
			"tmax": 15.6,
			"tmin": 8.3,
			"t": 11.7,
			"p": 6.2,
			"r": 6.2,
			"wind": 11.8,
			"cloud": 100,
			"rh": 79
		},
		{
			"d": "2026-02-17",
			"w": 53,
			"tmax": 12.8,
			"tmin": 7.3,
			"t": 9.4,
			"p": 1.5,
			"r": 1.5,
			"wind": 8.8,
			"cloud": 100,
			"rh": 76
		},
		{
			"d": "2026-02-18",
			"w": 3,
			"tmax": 16.8,
			"tmin": 4.5,
			"t": 9.1,
			"p": 0,
			"r": 0,
			"wind": 16.5,
			"cloud": 19,
			"rh": 71
		},
		{
			"d": "2026-02-19",
			"w": 3,
			"tmax": 15.2,
			"tmin": 3.3,
			"t": 9.3,
			"p": 0,
			"r": 0,
			"wind": 11.7,
			"cloud": 40,
			"rh": 76
		},
		{
			"d": "2026-02-20",
			"w": 3,
			"tmax": 20.8,
			"tmin": 6.7,
			"t": 12.2,
			"p": 0,
			"r": 0,
			"wind": 15.5,
			"cloud": 10,
			"rh": 74
		},
		{
			"d": "2026-02-21",
			"w": 0,
			"tmax": 21.8,
			"tmin": 5.7,
			"t": 13,
			"p": 0,
			"r": 0,
			"wind": 12.4,
			"cloud": 0,
			"rh": 75
		},
		{
			"d": "2026-02-22",
			"w": 51,
			"tmax": 27.8,
			"tmin": 9,
			"t": 16.9,
			"p": .1,
			"r": .1,
			"wind": 15.5,
			"cloud": 22,
			"rh": 64
		},
		{
			"d": "2026-02-23",
			"w": 51,
			"tmax": 18.9,
			"tmin": 8.1,
			"t": 13.3,
			"p": 1.2,
			"r": 1.2,
			"wind": 12.4,
			"cloud": 54,
			"rh": 61
		},
		{
			"d": "2026-02-24",
			"w": 53,
			"tmax": 19,
			"tmin": 12,
			"t": 15.1,
			"p": 2.7,
			"r": 2.7,
			"wind": 11.8,
			"cloud": 100,
			"rh": 90
		},
		{
			"d": "2026-02-25",
			"w": 51,
			"tmax": 16.1,
			"tmin": 10.5,
			"t": 13,
			"p": .7,
			"r": .7,
			"wind": 12.5,
			"cloud": 100,
			"rh": 82
		},
		{
			"d": "2026-02-26",
			"w": 61,
			"tmax": 16.1,
			"tmin": 10,
			"t": 12.8,
			"p": 11.8,
			"r": 11.8,
			"wind": 10.1,
			"cloud": 100,
			"rh": 86
		},
		{
			"d": "2026-02-27",
			"w": 61,
			"tmax": 20.9,
			"tmin": 12.8,
			"t": 15.6,
			"p": 5.9,
			"r": 5.9,
			"wind": 9.4,
			"cloud": 94,
			"rh": 85
		},
		{
			"d": "2026-02-28",
			"w": 53,
			"tmax": 15,
			"tmin": 11.1,
			"t": 13.2,
			"p": 1.9,
			"r": 1.9,
			"wind": 9.2,
			"cloud": 94,
			"rh": 81
		},
		{
			"d": "2026-03-01",
			"w": 63,
			"tmax": 16,
			"tmin": 13,
			"t": 14.3,
			"p": 15.9,
			"r": 15.9,
			"wind": 6.5,
			"cloud": 95,
			"rh": 97
		},
		{
			"d": "2026-03-02",
			"w": 3,
			"tmax": 22.9,
			"tmin": 12.4,
			"t": 16.8,
			"p": 0,
			"r": 0,
			"wind": 17.6,
			"cloud": 52,
			"rh": 79
		},
		{
			"d": "2026-03-03",
			"w": 3,
			"tmax": 18.1,
			"tmin": 9.9,
			"t": 12.9,
			"p": 0,
			"r": 0,
			"wind": 16.5,
			"cloud": 65,
			"rh": 68
		},
		{
			"d": "2026-03-04",
			"w": 51,
			"tmax": 14.4,
			"tmin": 8.2,
			"t": 11.1,
			"p": .7,
			"r": .7,
			"wind": 9.6,
			"cloud": 93,
			"rh": 73
		},
		{
			"d": "2026-03-05",
			"w": 61,
			"tmax": 15.1,
			"tmin": 11.3,
			"t": 12.8,
			"p": 13.4,
			"r": 13.4,
			"wind": 10.1,
			"cloud": 100,
			"rh": 91
		},
		{
			"d": "2026-03-06",
			"w": 53,
			"tmax": 19.9,
			"tmin": 8.3,
			"t": 13.6,
			"p": 1.1,
			"r": 1.1,
			"wind": 15.5,
			"cloud": 56,
			"rh": 73
		},
		{
			"d": "2026-03-07",
			"w": 3,
			"tmax": 14.3,
			"tmin": 6.4,
			"t": 9.5,
			"p": 0,
			"r": 0,
			"wind": 12.5,
			"cloud": 20,
			"rh": 73
		},
		{
			"d": "2026-03-08",
			"w": 3,
			"tmax": 14.4,
			"tmin": 5.7,
			"t": 9.2,
			"p": 0,
			"r": 0,
			"wind": 10.1,
			"cloud": 51,
			"rh": 76
		},
		{
			"d": "2026-03-09",
			"w": 53,
			"tmax": 15.3,
			"tmin": 8.5,
			"t": 11.2,
			"p": 1.6,
			"r": 1.6,
			"wind": 11.5,
			"cloud": 98,
			"rh": 73
		},
		{
			"d": "2026-03-10",
			"w": 3,
			"tmax": 14,
			"tmin": 4.9,
			"t": 8.9,
			"p": 0,
			"r": 0,
			"wind": 14.7,
			"cloud": 16,
			"rh": 67
		},
		{
			"d": "2026-03-11",
			"w": 0,
			"tmax": 17.3,
			"tmin": 3.4,
			"t": 9.7,
			"p": 0,
			"r": 0,
			"wind": 12.2,
			"cloud": 0,
			"rh": 71
		},
		{
			"d": "2026-03-12",
			"w": 3,
			"tmax": 19.2,
			"tmin": 5.7,
			"t": 12,
			"p": 0,
			"r": 0,
			"wind": 20.5,
			"cloud": 10,
			"rh": 59
		},
		{
			"d": "2026-03-13",
			"w": 0,
			"tmax": 17.5,
			"tmin": 4.4,
			"t": 10.5,
			"p": 0,
			"r": 0,
			"wind": 12,
			"cloud": 0,
			"rh": 64
		},
		{
			"d": "2026-03-14",
			"w": 3,
			"tmax": 18.3,
			"tmin": 4.2,
			"t": 11.1,
			"p": 0,
			"r": 0,
			"wind": 12.7,
			"cloud": 16,
			"rh": 71
		},
		{
			"d": "2026-03-15",
			"w": 0,
			"tmax": 20.5,
			"tmin": 6.7,
			"t": 13.1,
			"p": 0,
			"r": 0,
			"wind": 11.3,
			"cloud": 2,
			"rh": 70
		},
		{
			"d": "2026-03-16",
			"w": 3,
			"tmax": 19.2,
			"tmin": 9.7,
			"t": 14.1,
			"p": 0,
			"r": 0,
			"wind": 12.7,
			"cloud": 80,
			"rh": 71
		},
		{
			"d": "2026-03-17",
			"w": 3,
			"tmax": 20.7,
			"tmin": 13.5,
			"t": 16.4,
			"p": 0,
			"r": 0,
			"wind": 12.2,
			"cloud": 86,
			"rh": 74
		},
		{
			"d": "2026-03-18",
			"w": 53,
			"tmax": 27.7,
			"tmin": 13.9,
			"t": 18.4,
			"p": 2.6,
			"r": 2.6,
			"wind": 18.8,
			"cloud": 61,
			"rh": 77
		},
		{
			"d": "2026-03-19",
			"w": 53,
			"tmax": 15,
			"tmin": 10.9,
			"t": 12.7,
			"p": 1.7,
			"r": 1.7,
			"wind": 8.3,
			"cloud": 96,
			"rh": 80
		},
		{
			"d": "2026-03-20",
			"w": 61,
			"tmax": 14.3,
			"tmin": 9.9,
			"t": 11.8,
			"p": 3.4,
			"r": 3.4,
			"wind": 8.1,
			"cloud": 98,
			"rh": 80
		},
		{
			"d": "2026-03-21",
			"w": 55,
			"tmax": 14,
			"tmin": 9.9,
			"t": 11.8,
			"p": 1.4,
			"r": 1.4,
			"wind": 5.9,
			"cloud": 96,
			"rh": 82
		},
		{
			"d": "2026-03-22",
			"w": 51,
			"tmax": 22.2,
			"tmin": 9.2,
			"t": 14.9,
			"p": .1,
			"r": .1,
			"wind": 9.1,
			"cloud": 46,
			"rh": 82
		},
		{
			"d": "2026-03-23",
			"w": 61,
			"tmax": 18.3,
			"tmin": 13.2,
			"t": 15.3,
			"p": 5.9,
			"r": 5.9,
			"wind": 9.8,
			"cloud": 99,
			"rh": 88
		},
		{
			"d": "2026-03-24",
			"w": 63,
			"tmax": 16.4,
			"tmin": 12.3,
			"t": 14,
			"p": 24.4,
			"r": 24.4,
			"wind": 7.5,
			"cloud": 88,
			"rh": 91
		},
		{
			"d": "2026-03-25",
			"w": 51,
			"tmax": 23.9,
			"tmin": 12.1,
			"t": 15.5,
			"p": .1,
			"r": .1,
			"wind": 17,
			"cloud": 58,
			"rh": 83
		},
		{
			"d": "2026-03-26",
			"w": 61,
			"tmax": 14.3,
			"tmin": 11.7,
			"t": 12.8,
			"p": 10,
			"r": 10,
			"wind": 9.3,
			"cloud": 95,
			"rh": 91
		},
		{
			"d": "2026-03-27",
			"w": 51,
			"tmax": 17.9,
			"tmin": 11.4,
			"t": 14.1,
			"p": .4,
			"r": .4,
			"wind": 9.7,
			"cloud": 98,
			"rh": 87
		},
		{
			"d": "2026-03-28",
			"w": 51,
			"tmax": 18,
			"tmin": 13.1,
			"t": 15,
			"p": .4,
			"r": .4,
			"wind": 6.2,
			"cloud": 100,
			"rh": 82
		},
		{
			"d": "2026-03-29",
			"w": 61,
			"tmax": 23.7,
			"tmin": 13.8,
			"t": 17.7,
			"p": 3.2,
			"r": 3.2,
			"wind": 11.3,
			"cloud": 73,
			"rh": 84
		},
		{
			"d": "2026-03-30",
			"w": 63,
			"tmax": 25.3,
			"tmin": 16.1,
			"t": 19.2,
			"p": 7.2,
			"r": 7.2,
			"wind": 13.1,
			"cloud": 100,
			"rh": 90
		},
		{
			"d": "2026-03-31",
			"w": 63,
			"tmax": 18.5,
			"tmin": 13.2,
			"t": 16.1,
			"p": 21.8,
			"r": 21.8,
			"wind": 14.3,
			"cloud": 99,
			"rh": 92
		},
		{
			"d": "2026-04-01",
			"w": 51,
			"tmax": 21.5,
			"tmin": 12.7,
			"t": 15.9,
			"p": .8,
			"r": .8,
			"wind": 14.7,
			"cloud": 64,
			"rh": 80
		},
		{
			"d": "2026-04-02",
			"w": 61,
			"tmax": 21.2,
			"tmin": 11.8,
			"t": 15.3,
			"p": 2.2,
			"r": 2.2,
			"wind": 10.3,
			"cloud": 91,
			"rh": 82
		},
		{
			"d": "2026-04-03",
			"w": 63,
			"tmax": 20.2,
			"tmin": 14,
			"t": 16.2,
			"p": 15.8,
			"r": 15.8,
			"wind": 14.9,
			"cloud": 100,
			"rh": 94
		},
		{
			"d": "2026-04-04",
			"w": 3,
			"tmax": 25.8,
			"tmin": 15.2,
			"t": 19.4,
			"p": 0,
			"r": 0,
			"wind": 12.4,
			"cloud": 62,
			"rh": 75
		},
		{
			"d": "2026-04-05",
			"w": 3,
			"tmax": 24,
			"tmin": 13.3,
			"t": 18.1,
			"p": 0,
			"r": 0,
			"wind": 12,
			"cloud": 73,
			"rh": 85
		},
		{
			"d": "2026-04-06",
			"w": 63,
			"tmax": 22.3,
			"tmin": 17.2,
			"t": 20,
			"p": 29.4,
			"r": 29.4,
			"wind": 4.7,
			"cloud": 100,
			"rh": 93
		},
		{
			"d": "2026-04-07",
			"w": 53,
			"tmax": 19.8,
			"tmin": 14.6,
			"t": 18,
			"p": 1.7,
			"r": 1.7,
			"wind": 12.3,
			"cloud": 100,
			"rh": 66
		},
		{
			"d": "2026-04-08",
			"w": 51,
			"tmax": 17.2,
			"tmin": 13.4,
			"t": 14.9,
			"p": .4,
			"r": .4,
			"wind": 8.2,
			"cloud": 91,
			"rh": 68
		},
		{
			"d": "2026-04-09",
			"w": 51,
			"tmax": 28.8,
			"tmin": 13.7,
			"t": 21,
			"p": .4,
			"r": .4,
			"wind": 12.8,
			"cloud": 22,
			"rh": 83
		},
		{
			"d": "2026-04-10",
			"w": 63,
			"tmax": 30.6,
			"tmin": 18.7,
			"t": 22.8,
			"p": 6.7,
			"r": 6.7,
			"wind": 11.8,
			"cloud": 34,
			"rh": 84
		},
		{
			"d": "2026-04-11",
			"w": 63,
			"tmax": 19.6,
			"tmin": 16.4,
			"t": 17.8,
			"p": 14.8,
			"r": 14.8,
			"wind": 11.7,
			"cloud": 100,
			"rh": 90
		},
		{
			"d": "2026-04-12",
			"w": 61,
			"tmax": 20.7,
			"tmin": 16,
			"t": 18.3,
			"p": 7.4,
			"r": 7.4,
			"wind": 5,
			"cloud": 98,
			"rh": 92
		},
		{
			"d": "2026-04-13",
			"w": 55,
			"tmax": 22.4,
			"tmin": 17.8,
			"t": 19.4,
			"p": 5.5,
			"r": 5.5,
			"wind": 9.7,
			"cloud": 98,
			"rh": 91
		},
		{
			"d": "2026-04-14",
			"w": 51,
			"tmax": 26.5,
			"tmin": 17.6,
			"t": 20.5,
			"p": .9,
			"r": .9,
			"wind": 9,
			"cloud": 93,
			"rh": 88
		},
		{
			"d": "2026-04-15",
			"w": 55,
			"tmax": 21.2,
			"tmin": 16.8,
			"t": 18.5,
			"p": 3.8,
			"r": 3.8,
			"wind": 9.2,
			"cloud": 100,
			"rh": 90
		},
		{
			"d": "2026-04-16",
			"w": 61,
			"tmax": 21.8,
			"tmin": 16.5,
			"t": 17.8,
			"p": 3.9,
			"r": 3.9,
			"wind": 8.7,
			"cloud": 100,
			"rh": 89
		},
		{
			"d": "2026-04-17",
			"w": 51,
			"tmax": 26.3,
			"tmin": 16.2,
			"t": 19.8,
			"p": .9,
			"r": .9,
			"wind": 15,
			"cloud": 94,
			"rh": 86
		},
		{
			"d": "2026-04-18",
			"w": 63,
			"tmax": 20.1,
			"tmin": 15.6,
			"t": 17.6,
			"p": 10.9,
			"r": 10.9,
			"wind": 8.9,
			"cloud": 85,
			"rh": 90
		},
		{
			"d": "2026-04-19",
			"w": 3,
			"tmax": 27.7,
			"tmin": 15.7,
			"t": 20,
			"p": 0,
			"r": 0,
			"wind": 15.8,
			"cloud": 45,
			"rh": 82
		},
		{
			"d": "2026-04-20",
			"w": 3,
			"tmax": 28.6,
			"tmin": 15.9,
			"t": 20.4,
			"p": 0,
			"r": 0,
			"wind": 13.7,
			"cloud": 62,
			"rh": 85
		},
		{
			"d": "2026-04-21",
			"w": 55,
			"tmax": 19.3,
			"tmin": 16,
			"t": 17.3,
			"p": 5.6,
			"r": 5.6,
			"wind": 13.6,
			"cloud": 100,
			"rh": 84
		},
		{
			"d": "2026-04-22",
			"w": 63,
			"tmax": 24,
			"tmin": 16.6,
			"t": 19.8,
			"p": 21,
			"r": 21,
			"wind": 7.5,
			"cloud": 95,
			"rh": 94
		},
		{
			"d": "2026-04-23",
			"w": 53,
			"tmax": 20.6,
			"tmin": 16.7,
			"t": 18.9,
			"p": 2.6,
			"r": 2.6,
			"wind": 10.2,
			"cloud": 100,
			"rh": 81
		},
		{
			"d": "2026-04-24",
			"w": 51,
			"tmax": 22.5,
			"tmin": 14.6,
			"t": 17.6,
			"p": .2,
			"r": .2,
			"wind": 12.6,
			"cloud": 81,
			"rh": 77
		},
		{
			"d": "2026-04-25",
			"w": 3,
			"tmax": 22,
			"tmin": 12.9,
			"t": 16.9,
			"p": 0,
			"r": 0,
			"wind": 12.6,
			"cloud": 42,
			"rh": 75
		},
		{
			"d": "2026-04-26",
			"w": 3,
			"tmax": 26.9,
			"tmin": 12.8,
			"t": 18.7,
			"p": 0,
			"r": 0,
			"wind": 15,
			"cloud": 26,
			"rh": 79
		},
		{
			"d": "2026-04-27",
			"w": 3,
			"tmax": 26.8,
			"tmin": 15.2,
			"t": 20.6,
			"p": 0,
			"r": 0,
			"wind": 12.9,
			"cloud": 71,
			"rh": 82
		},
		{
			"d": "2026-04-28",
			"w": 51,
			"tmax": 27.5,
			"tmin": 17.2,
			"t": 21.5,
			"p": .3,
			"r": .3,
			"wind": 16,
			"cloud": 80,
			"rh": 81
		},
		{
			"d": "2026-04-29",
			"w": 61,
			"tmax": 17.9,
			"tmin": 12.4,
			"t": 14.6,
			"p": 13.1,
			"r": 13.1,
			"wind": 13.2,
			"cloud": 100,
			"rh": 83
		},
		{
			"d": "2026-04-30",
			"w": 51,
			"tmax": 20.3,
			"tmin": 12.7,
			"t": 15.5,
			"p": .7,
			"r": .7,
			"wind": 11.4,
			"cloud": 70,
			"rh": 73
		},
		{
			"d": "2026-05-01",
			"w": 3,
			"tmax": 22.6,
			"tmin": 9.8,
			"t": 15.7,
			"p": 0,
			"r": 0,
			"wind": 12,
			"cloud": 83,
			"rh": 73
		},
		{
			"d": "2026-05-02",
			"w": 55,
			"tmax": 25.5,
			"tmin": 13.8,
			"t": 19.3,
			"p": 1.1,
			"r": 1.1,
			"wind": 13.8,
			"cloud": 88,
			"rh": 80
		},
		{
			"d": "2026-05-03",
			"w": 61,
			"tmax": 23.2,
			"tmin": 17.8,
			"t": 20.2,
			"p": 8.3,
			"r": 8.3,
			"wind": 10.6,
			"cloud": 99,
			"rh": 88
		},
		{
			"d": "2026-05-04",
			"w": 51,
			"tmax": 22.2,
			"tmin": 16.1,
			"t": 18.3,
			"p": .9,
			"r": .9,
			"wind": 9.4,
			"cloud": 96,
			"rh": 78
		},
		{
			"d": "2026-05-05",
			"w": 51,
			"tmax": 22.1,
			"tmin": 14,
			"t": 17.8,
			"p": .4,
			"r": .4,
			"wind": 11.2,
			"cloud": 76,
			"rh": 75
		},
		{
			"d": "2026-05-06",
			"w": 3,
			"tmax": 25.6,
			"tmin": 14.2,
			"t": 19.1,
			"p": 0,
			"r": 0,
			"wind": 13.9,
			"cloud": 43,
			"rh": 81
		},
		{
			"d": "2026-05-07",
			"w": 51,
			"tmax": 28.6,
			"tmin": 15.6,
			"t": 21.5,
			"p": .3,
			"r": .3,
			"wind": 11.9,
			"cloud": 90,
			"rh": 82
		},
		{
			"d": "2026-05-08",
			"w": 61,
			"tmax": 21.6,
			"tmin": 16,
			"t": 19.1,
			"p": 6.6,
			"r": 6.6,
			"wind": 13.2,
			"cloud": 100,
			"rh": 77
		},
		{
			"d": "2026-05-09",
			"w": 55,
			"tmax": 19.9,
			"tmin": 13.1,
			"t": 16.2,
			"p": 2.3,
			"r": 2.3,
			"wind": 7.8,
			"cloud": 93,
			"rh": 67
		},
		{
			"d": "2026-05-10",
			"w": 3,
			"tmax": 23.2,
			"tmin": 14.5,
			"t": 18.4,
			"p": 0,
			"r": 0,
			"wind": 11.1,
			"cloud": 89,
			"rh": 74
		},
		{
			"d": "2026-05-11",
			"w": 3,
			"tmax": 27.7,
			"tmin": 16.9,
			"t": 21.6,
			"p": 0,
			"r": 0,
			"wind": 14.5,
			"cloud": 97,
			"rh": 79
		},
		{
			"d": "2026-05-12",
			"w": 3,
			"tmax": 31.4,
			"tmin": 19.3,
			"t": 24,
			"p": 0,
			"r": 0,
			"wind": 13.9,
			"cloud": 85,
			"rh": 74
		},
		{
			"d": "2026-05-13",
			"w": 51,
			"tmax": 28.9,
			"tmin": 20.5,
			"t": 23.7,
			"p": .1,
			"r": .1,
			"wind": 12.4,
			"cloud": 90,
			"rh": 74
		},
		{
			"d": "2026-05-14",
			"w": 63,
			"tmax": 24.5,
			"tmin": 18.5,
			"t": 21.2,
			"p": 10.5,
			"r": 10.5,
			"wind": 14.3,
			"cloud": 98,
			"rh": 86
		},
		{
			"d": "2026-05-15",
			"w": 53,
			"tmax": 24.8,
			"tmin": 18.7,
			"t": 21.4,
			"p": 1.3,
			"r": 1.3,
			"wind": 13.2,
			"cloud": 73,
			"rh": 80
		},
		{
			"d": "2026-05-16",
			"w": 51,
			"tmax": 26.7,
			"tmin": 18,
			"t": 22.4,
			"p": .3,
			"r": .3,
			"wind": 16.4,
			"cloud": 26,
			"rh": 77
		},
		{
			"d": "2026-05-17",
			"w": 51,
			"tmax": 27.4,
			"tmin": 18.2,
			"t": 22.7,
			"p": .2,
			"r": .2,
			"wind": 14.3,
			"cloud": 50,
			"rh": 74
		},
		{
			"d": "2026-05-18",
			"w": 3,
			"tmax": 29.1,
			"tmin": 18.8,
			"t": 23.7,
			"p": 0,
			"r": 0,
			"wind": 13.3,
			"cloud": 60,
			"rh": 67
		},
		{
			"d": "2026-05-19",
			"w": 3,
			"tmax": 29.9,
			"tmin": 19.8,
			"t": 24.8,
			"p": 0,
			"r": 0,
			"wind": 14.8,
			"cloud": 52,
			"rh": 71
		},
		{
			"d": "2026-05-20",
			"w": 63,
			"tmax": 33.7,
			"tmin": 22.2,
			"t": 27.4,
			"p": 4.2,
			"r": 4.2,
			"wind": 9.6,
			"cloud": 79,
			"rh": 75
		},
		{
			"d": "2026-05-21",
			"w": 63,
			"tmax": 29.9,
			"tmin": 22.6,
			"t": 25.3,
			"p": 21.5,
			"r": 21.5,
			"wind": 9.8,
			"cloud": 100,
			"rh": 92
		},
		{
			"d": "2026-05-22",
			"w": 61,
			"tmax": 25.3,
			"tmin": 22.1,
			"t": 23.1,
			"p": 9.2,
			"r": 9.2,
			"wind": 10.5,
			"cloud": 97,
			"rh": 91
		},
		{
			"d": "2026-05-23",
			"w": 63,
			"tmax": 31.9,
			"tmin": 22.5,
			"t": 25.9,
			"p": 9.5,
			"r": 9.5,
			"wind": 9.4,
			"cloud": 80,
			"rh": 89
		},
		{
			"d": "2026-05-24",
			"w": 63,
			"tmax": 31.6,
			"tmin": 24.5,
			"t": 27.4,
			"p": 9.2,
			"r": 9.2,
			"wind": 8,
			"cloud": 98,
			"rh": 89
		},
		{
			"d": "2026-05-25",
			"w": 61,
			"tmax": 32.7,
			"tmin": 25.3,
			"t": 28.3,
			"p": 4.4,
			"r": 4.4,
			"wind": 7.3,
			"cloud": 93,
			"rh": 88
		},
		{
			"d": "2026-05-26",
			"w": 61,
			"tmax": 35.7,
			"tmin": 26.1,
			"t": 29.9,
			"p": 3.3,
			"r": 3.3,
			"wind": 8.5,
			"cloud": 97,
			"rh": 85
		},
		{
			"d": "2026-05-27",
			"w": 63,
			"tmax": 32.2,
			"tmin": 25.8,
			"t": 28.8,
			"p": 9.3,
			"r": 9.3,
			"wind": 6.5,
			"cloud": 91,
			"rh": 87
		},
		{
			"d": "2026-05-28",
			"w": 63,
			"tmax": 33.1,
			"tmin": 24.1,
			"t": 26.7,
			"p": 16.6,
			"r": 16.6,
			"wind": 10.7,
			"cloud": 91,
			"rh": 90
		},
		{
			"d": "2026-05-29",
			"w": 53,
			"tmax": 29.9,
			"tmin": 22.8,
			"t": 25.8,
			"p": 3.2,
			"r": 3.2,
			"wind": 12.3,
			"cloud": 68,
			"rh": 79
		},
		{
			"d": "2026-05-30",
			"w": 3,
			"tmax": 26.2,
			"tmin": 21.9,
			"t": 23.6,
			"p": 0,
			"r": 0,
			"wind": 7.8,
			"cloud": 74,
			"rh": 69
		},
		{
			"d": "2026-05-31",
			"w": 0,
			"tmax": 28.5,
			"tmin": 20.1,
			"t": 24.1,
			"p": 0,
			"r": 0,
			"wind": 10,
			"cloud": 1,
			"rh": 61
		},
		{
			"d": "2026-06-01",
			"w": 0,
			"tmax": 32.7,
			"tmin": 18.4,
			"t": 25.3,
			"p": 0,
			"r": 0,
			"wind": 11.2,
			"cloud": 1,
			"rh": 69
		},
		{
			"d": "2026-06-02",
			"w": 53,
			"tmax": 33.4,
			"tmin": 21.9,
			"t": 27.4,
			"p": .8,
			"r": .8,
			"wind": 11.2,
			"cloud": 30,
			"rh": 74
		},
		{
			"d": "2026-06-03",
			"w": 53,
			"tmax": 34.6,
			"tmin": 23.8,
			"t": 28.9,
			"p": 1.9,
			"r": 1.9,
			"wind": 9.7,
			"cloud": 50,
			"rh": 77
		},
		{
			"d": "2026-06-04",
			"w": 63,
			"tmax": 31.9,
			"tmin": 25,
			"t": 27.8,
			"p": 13.1,
			"r": 13.1,
			"wind": 8,
			"cloud": 96,
			"rh": 85
		},
		{
			"d": "2026-06-05",
			"w": 63,
			"tmax": 27.4,
			"tmin": 22.8,
			"t": 25.2,
			"p": 10.1,
			"r": 10.1,
			"wind": 15.4,
			"cloud": 92,
			"rh": 83
		},
		{
			"d": "2026-06-06",
			"w": 51,
			"tmax": 28,
			"tmin": 21.7,
			"t": 24.7,
			"p": .3,
			"r": .3,
			"wind": 7.9,
			"cloud": 84,
			"rh": 80
		},
		{
			"d": "2026-06-07",
			"w": 63,
			"tmax": 29.8,
			"tmin": 22.9,
			"t": 25.2,
			"p": 23.8,
			"r": 23.8,
			"wind": 12.5,
			"cloud": 85,
			"rh": 88
		},
		{
			"d": "2026-06-08",
			"w": 63,
			"tmax": 24.1,
			"tmin": 20.1,
			"t": 22.2,
			"p": 16.4,
			"r": 16.4,
			"wind": 10.4,
			"cloud": 100,
			"rh": 85
		},
		{
			"d": "2026-06-09",
			"w": 61,
			"tmax": 20.9,
			"tmin": 17.6,
			"t": 19.1,
			"p": 11.9,
			"r": 11.9,
			"wind": 8.6,
			"cloud": 100,
			"rh": 83
		},
		{
			"d": "2026-06-10",
			"w": 3,
			"tmax": 25.7,
			"tmin": 18.8,
			"t": 21.8,
			"p": 0,
			"r": 0,
			"wind": 8.9,
			"cloud": 94,
			"rh": 73
		},
		{
			"d": "2026-06-11",
			"w": 3,
			"tmax": 24.9,
			"tmin": 19.9,
			"t": 21.8,
			"p": 0,
			"r": 0,
			"wind": 6.9,
			"cloud": 89,
			"rh": 79
		},
		{
			"d": "2026-06-12",
			"w": 51,
			"tmax": 27.7,
			"tmin": 18.7,
			"t": 23.2,
			"p": .4,
			"r": .4,
			"wind": 11.2,
			"cloud": 83,
			"rh": 79
		},
		{
			"d": "2026-06-13",
			"w": 63,
			"tmax": 23.6,
			"tmin": 20.6,
			"t": 21.9,
			"p": 26.3,
			"r": 26.3,
			"wind": 10.9,
			"cloud": 100,
			"rh": 91
		},
		{
			"d": "2026-06-14",
			"w": 61,
			"tmax": 30.6,
			"tmin": 20.9,
			"t": 24.6,
			"p": 11.6,
			"r": 11.6,
			"wind": 10.1,
			"cloud": 72,
			"rh": 86
		},
		{
			"d": "2026-06-15",
			"w": 51,
			"tmax": 29,
			"tmin": 22.5,
			"t": 25.3,
			"p": 2.3,
			"r": 2.3,
			"wind": 14.4,
			"cloud": 72,
			"rh": 85
		},
		{
			"d": "2026-06-16",
			"w": 51,
			"tmax": 29.1,
			"tmin": 22.6,
			"t": 25.4,
			"p": 2.1,
			"r": 2.1,
			"wind": 11.8,
			"cloud": 76,
			"rh": 84
		},
		{
			"d": "2026-06-17",
			"w": 63,
			"tmax": 30.3,
			"tmin": 23.1,
			"t": 26.4,
			"p": 11.6,
			"r": 11.6,
			"wind": 13.6,
			"cloud": 76,
			"rh": 86
		},
		{
			"d": "2026-06-18",
			"w": 63,
			"tmax": 31.4,
			"tmin": 25.2,
			"t": 27.3,
			"p": 6.5,
			"r": 6.5,
			"wind": 10.3,
			"cloud": 93,
			"rh": 88
		},
		{
			"d": "2026-06-19",
			"w": 51,
			"tmax": 31.7,
			"tmin": 25.1,
			"t": 28.3,
			"p": .3,
			"r": .3,
			"wind": 17.4,
			"cloud": 93,
			"rh": 82
		},
		{
			"d": "2026-06-20",
			"w": 51,
			"tmax": 34.3,
			"tmin": 26.3,
			"t": 29.2,
			"p": 1.4,
			"r": 1.4,
			"wind": 11.1,
			"cloud": 95,
			"rh": 82
		},
		{
			"d": "2026-06-21",
			"w": 63,
			"tmax": 33,
			"tmin": 26.1,
			"t": 28.1,
			"p": 7,
			"r": 7,
			"wind": 9.8,
			"cloud": 88,
			"rh": 90
		},
		{
			"d": "2026-06-22",
			"w": 61,
			"tmax": 34,
			"tmin": 26.2,
			"t": 28.8,
			"p": 4.2,
			"r": 4.2,
			"wind": 11.7,
			"cloud": 88,
			"rh": 85
		},
		{
			"d": "2026-06-23",
			"w": 63,
			"tmax": 33.7,
			"tmin": 25.8,
			"t": 28.1,
			"p": 8.7,
			"r": 8.7,
			"wind": 11.6,
			"cloud": 100,
			"rh": 89
		},
		{
			"d": "2026-06-24",
			"w": 63,
			"tmax": 32,
			"tmin": 25.3,
			"t": 27.4,
			"p": 27.9,
			"r": 27.9,
			"wind": 8.4,
			"cloud": 94,
			"rh": 90
		},
		{
			"d": "2026-06-25",
			"w": 65,
			"tmax": 28,
			"tmin": 24.1,
			"t": 25.6,
			"p": 48.9,
			"r": 48.9,
			"wind": 8.8,
			"cloud": 98,
			"rh": 91
		},
		{
			"d": "2026-06-26",
			"w": 51,
			"tmax": 30.2,
			"tmin": 23.1,
			"t": 25.7,
			"p": .3,
			"r": .3,
			"wind": 15.1,
			"cloud": 58,
			"rh": 78
		},
		{
			"d": "2026-06-27",
			"w": 53,
			"tmax": 28.4,
			"tmin": 22,
			"t": 24.4,
			"p": 1.4,
			"r": 1.4,
			"wind": 9.4,
			"cloud": 72,
			"rh": 77
		},
		{
			"d": "2026-06-28",
			"w": 53,
			"tmax": 28.9,
			"tmin": 21.8,
			"t": 24.9,
			"p": 1.8,
			"r": 1.8,
			"wind": 12.3,
			"cloud": 87,
			"rh": 82
		},
		{
			"d": "2026-06-29",
			"w": 61,
			"tmax": 31,
			"tmin": 23.2,
			"t": 26.5,
			"p": 6.2,
			"r": 6.2,
			"wind": 9.5,
			"cloud": 97,
			"rh": 88
		},
		{
			"d": "2026-06-30",
			"w": 51,
			"tmax": 30.7,
			"tmin": 24.7,
			"t": 27.4,
			"p": 1.3,
			"r": 1.3,
			"wind": 13.4,
			"cloud": 100,
			"rh": 86
		},
		{
			"d": "2026-07-01",
			"w": 63,
			"tmax": 33.8,
			"tmin": 25,
			"t": 28.5,
			"p": 3.4,
			"r": 3.4,
			"wind": 8.7,
			"cloud": 96,
			"rh": 83
		},
		{
			"d": "2026-07-02",
			"w": 63,
			"tmax": 33.5,
			"tmin": 25.7,
			"t": 28.3,
			"p": 4.8,
			"r": 4.8,
			"wind": 8.6,
			"cloud": 93,
			"rh": 87
		},
		{
			"d": "2026-07-03",
			"w": 53,
			"tmax": 34.9,
			"tmin": 25.8,
			"t": 29.6,
			"p": 2.6,
			"r": 2.6,
			"wind": 13,
			"cloud": 61,
			"rh": 83
		},
		{
			"d": "2026-07-04",
			"w": 3,
			"tmax": 34.9,
			"tmin": 26.3,
			"t": 29.9,
			"p": 0,
			"r": 0,
			"wind": 8.9,
			"cloud": 83,
			"rh": 80
		},
		{
			"d": "2026-07-05",
			"w": 51,
			"tmax": 34.6,
			"tmin": 26.3,
			"t": 30.1,
			"p": .1,
			"r": .1,
			"wind": 10.1,
			"cloud": 91,
			"rh": 77
		},
		{
			"d": "2026-07-06",
			"w": 53,
			"tmax": 37.8,
			"tmin": 27.1,
			"t": 31.1,
			"p": 1.1,
			"r": 1.1,
			"wind": 14.2,
			"cloud": 66,
			"rh": 72
		},
		{
			"d": "2026-07-07",
			"w": 51,
			"tmax": 36.9,
			"tmin": 26.2,
			"t": 30.8,
			"p": .1,
			"r": .1,
			"wind": 17.4,
			"cloud": 44,
			"rh": 70
		},
		{
			"d": "2026-07-08",
			"w": 51,
			"tmax": 38.1,
			"tmin": 26.8,
			"t": 32.2,
			"p": .2,
			"r": .2,
			"wind": 11.5,
			"cloud": 24,
			"rh": 65
		},
		{
			"d": "2026-07-09",
			"w": 3,
			"tmax": 36.8,
			"tmin": 27.2,
			"t": 30.5,
			"p": 0,
			"r": 0,
			"wind": 15.6,
			"cloud": 49,
			"rh": 71
		},
		{
			"d": "2026-07-10",
			"w": 55,
			"tmax": 35.8,
			"tmin": 25.6,
			"t": 30.2,
			"p": 1.5,
			"r": 1.5,
			"wind": 14.4,
			"cloud": 67,
			"rh": 67
		},
		{
			"d": "2026-07-11",
			"w": 65,
			"tmax": 29.1,
			"tmin": 25.3,
			"t": 26.6,
			"p": 74.7,
			"r": 74.7,
			"wind": 42.6,
			"cloud": 99,
			"rh": 87
		},
		{
			"d": "2026-07-12",
			"w": 65,
			"tmax": 29.5,
			"tmin": 25.2,
			"t": 27.1,
			"p": 65,
			"r": 65,
			"wind": 39.5,
			"cloud": 100,
			"rh": 91
		},
		{
			"d": "2026-07-13",
			"w": 53,
			"tmax": 33,
			"tmin": 27.1,
			"t": 29.3,
			"p": 2.5,
			"r": 2.5,
			"wind": 19.3,
			"cloud": 88,
			"rh": 80
		},
		{
			"d": "2026-07-14",
			"w": 51,
			"tmax": 34.7,
			"tmin": 26.1,
			"t": 29.7,
			"p": .6,
			"r": .6,
			"wind": 20.7,
			"cloud": 12,
			"rh": 76
		},
		{
			"d": "2026-07-15",
			"w": 51,
			"tmax": 34.5,
			"tmin": 26.9,
			"t": 30.1,
			"p": .1,
			"r": .1,
			"wind": 13.2,
			"cloud": 63,
			"rh": 75
		},
		{
			"d": "2026-07-16",
			"w": 51,
			"tmax": 35.5,
			"tmin": 26.5,
			"t": 30.6,
			"p": .6,
			"r": .6,
			"wind": 13.2,
			"cloud": 52,
			"rh": 77
		},
		{
			"d": "2026-07-17",
			"w": 51,
			"tmax": 36.2,
			"tmin": 27.5,
			"t": 31.7,
			"p": .9,
			"r": .9,
			"wind": 10.8,
			"cloud": 44,
			"rh": 73
		},
		{
			"d": "2026-07-18",
			"w": 53,
			"tmax": 38,
			"tmin": 27.7,
			"t": 31.9,
			"p": 1.3,
			"r": 1.3,
			"wind": 10.2,
			"cloud": 88,
			"rh": 69
		},
		{
			"d": "2026-07-19",
			"w": 63,
			"tmax": 36.3,
			"tmin": 25.2,
			"t": 30.5,
			"p": 11.8,
			"r": 11.8,
			"wind": 9.4,
			"cloud": 90,
			"rh": 77
		},
		{
			"d": "2026-07-20",
			"w": 63,
			"tmax": 34.4,
			"tmin": 25.3,
			"t": 28.9,
			"p": 8.2,
			"r": 8.2,
			"wind": 10.8,
			"cloud": 65,
			"rh": 83
		},
		{
			"d": "2026-07-21",
			"w": 51,
			"tmax": 34.9,
			"tmin": 26.5,
			"t": 29.9,
			"p": 1.9,
			"r": 1.9,
			"wind": 8.9,
			"cloud": 77,
			"rh": 78
		},
		{
			"d": "2026-07-22",
			"w": 51,
			"tmax": 35.1,
			"tmin": 26.2,
			"t": 30.5,
			"p": .9,
			"r": .9,
			"wind": 10.8,
			"cloud": 58,
			"rh": 74
		},
		{
			"d": "2026-07-23",
			"w": 2,
			"tmax": 35.2,
			"tmin": 27,
			"t": 30.5,
			"p": 0,
			"r": 0,
			"wind": 12.1,
			"cloud": 21,
			"rh": 70
		},
		{
			"d": "2026-07-24",
			"w": 51,
			"tmax": 36,
			"tmin": 26.2,
			"t": 30.2,
			"p": .8,
			"r": .8,
			"wind": 13.5,
			"cloud": 17,
			"rh": 70
		},
		{
			"d": "2026-07-25",
			"w": 51,
			"tmax": 34.2,
			"tmin": 27,
			"t": 29.8,
			"p": 2.4,
			"r": 2.4,
			"wind": 15.4,
			"cloud": 94,
			"rh": 75
		},
		{
			"d": "2026-07-26",
			"w": 51,
			"tmax": 33.7,
			"tmin": 27.3,
			"t": 29.9,
			"p": 2.7,
			"r": 2.7,
			"wind": 18.2,
			"cloud": 92,
			"rh": 72
		},
		{
			"d": "2026-07-27",
			"w": 55,
			"tmax": 32.6,
			"tmin": 26.5,
			"t": 29.2,
			"p": 7.1,
			"r": 7.1,
			"wind": 20,
			"cloud": 97,
			"rh": 73
		},
		{
			"d": "2026-07-28",
			"w": 53,
			"tmax": 31.8,
			"tmin": 25,
			"t": 28.2,
			"p": 6,
			"r": 6,
			"wind": 13.8,
			"cloud": 94,
			"rh": 81
		},
		{
			"d": "2026-07-29",
			"w": 51,
			"tmax": 32,
			"tmin": 25.7,
			"t": 28.4,
			"p": 1.3,
			"r": 1.3,
			"wind": 9.4,
			"cloud": 92,
			"rh": 80
		},
		{
			"d": "2026-07-30",
			"w": 51,
			"tmax": 36.2,
			"tmin": 24.9,
			"t": 29.9,
			"p": .1,
			"r": .1,
			"wind": 11.4,
			"cloud": 29,
			"rh": 73
		},
		{
			"d": "2026-07-31",
			"w": 51,
			"tmax": 36.3,
			"tmin": 26.2,
			"t": 30.8,
			"p": .3,
			"r": .3,
			"wind": 9.8,
			"cloud": 25,
			"rh": 69
		},
		{
			"d": "2026-08-01",
			"w": 51,
			"tmax": 38.2,
			"tmin": 26.9,
			"t": 31.9,
			"p": .2,
			"r": .2,
			"wind": 10.2,
			"cloud": 52,
			"rh": 63
		},
		{
			"d": "2026-08-02",
			"w": 3,
			"tmax": 37,
			"tmin": 26.6,
			"t": 31.3,
			"p": 0,
			"r": 0,
			"wind": 10.2,
			"cloud": 83,
			"rh": 63
		},
		{
			"d": "2026-08-03",
			"w": 3,
			"tmax": 36,
			"tmin": 27.3,
			"t": 31,
			"p": 0,
			"r": 0,
			"wind": 11.1,
			"cloud": 91,
			"rh": 65
		},
		{
			"d": "2026-08-04",
			"w": 51,
			"tmax": 35.8,
			"tmin": 25.4,
			"t": 30.2,
			"p": 1,
			"r": 1,
			"wind": 12,
			"cloud": 57,
			"rh": 70
		},
		{
			"d": "2026-08-05",
			"w": 61,
			"tmax": 31.4,
			"tmin": 26.1,
			"t": 28.7,
			"p": 6.7,
			"r": 6.7,
			"wind": 10.3,
			"cloud": 55,
			"rh": 79
		},
		{
			"d": "2026-08-06",
			"w": 61,
			"tmax": 34.9,
			"tmin": 25.5,
			"t": 29.3,
			"p": 4.4,
			"r": 4.4,
			"wind": 13.9,
			"cloud": 28,
			"rh": 79
		},
		{
			"d": "2026-08-07",
			"w": 51,
			"tmax": 36.3,
			"tmin": 26,
			"t": 31.1,
			"p": .3,
			"r": .3,
			"wind": 18.7,
			"cloud": 17,
			"rh": 65
		},
		{
			"d": "2026-08-08",
			"w": 53,
			"tmax": 33.6,
			"tmin": 25.7,
			"t": 29.5,
			"p": 4,
			"r": 4,
			"wind": 24.6,
			"cloud": 96,
			"rh": 67
		},
		{
			"d": "2026-08-09",
			"w": 65,
			"tmax": 29.1,
			"tmin": 25.1,
			"t": 26.3,
			"p": 105.7,
			"r": 105.7,
			"wind": 43.3,
			"cloud": 100,
			"rh": 88
		},
		{
			"d": "2026-08-10",
			"w": 65,
			"tmax": 28.8,
			"tmin": 25.4,
			"t": 26.6,
			"p": 85.2,
			"r": 85.2,
			"wind": 28.6,
			"cloud": 99,
			"rh": 92
		},
		{
			"d": "2026-08-11",
			"w": 63,
			"tmax": 29.9,
			"tmin": 25.3,
			"t": 27.2,
			"p": 23.1,
			"r": 23.1,
			"wind": 12.7,
			"cloud": 96,
			"rh": 90
		},
		{
			"d": "2026-08-12",
			"w": 63,
			"tmax": 32.6,
			"tmin": 24.7,
			"t": 27.9,
			"p": 17.4,
			"r": 17.4,
			"wind": 8.3,
			"cloud": 91,
			"rh": 88
		},
		{
			"d": "2026-08-13",
			"w": 65,
			"tmax": 33.7,
			"tmin": 25.9,
			"t": 28.5,
			"p": 24.5,
			"r": 24.5,
			"wind": 12.9,
			"cloud": 80,
			"rh": 88
		},
		{
			"d": "2026-08-14",
			"w": 63,
			"tmax": 33.4,
			"tmin": 25.4,
			"t": 28.2,
			"p": 22.3,
			"r": 22.3,
			"wind": 9.5,
			"cloud": 86,
			"rh": 87
		},
		{
			"d": "2026-08-15",
			"w": 65,
			"tmax": 33.4,
			"tmin": 25.7,
			"t": 27.9,
			"p": 27.9,
			"r": 27.9,
			"wind": 11.1,
			"cloud": 67,
			"rh": 88
		},
		{
			"d": "2026-08-16",
			"w": 65,
			"tmax": 32.2,
			"tmin": 25.6,
			"t": 27.4,
			"p": 24.1,
			"r": 24.1,
			"wind": 10.2,
			"cloud": 84,
			"rh": 90
		},
		{
			"d": "2026-08-17",
			"w": 63,
			"tmax": 31.4,
			"tmin": 25.7,
			"t": 27.5,
			"p": 13.7,
			"r": 13.7,
			"wind": 9.9,
			"cloud": 78,
			"rh": 88
		},
		{
			"d": "2026-08-18",
			"w": 55,
			"tmax": 31.8,
			"tmin": 25.6,
			"t": 28.1,
			"p": 2.6,
			"r": 2.6,
			"wind": 12.9,
			"cloud": 29,
			"rh": 83
		},
		{
			"d": "2026-08-19",
			"w": 53,
			"tmax": 32.7,
			"tmin": 25.5,
			"t": 28.3,
			"p": 2.2,
			"r": 2.2,
			"wind": 14.9,
			"cloud": 42,
			"rh": 80
		},
		{
			"d": "2026-08-20",
			"w": 63,
			"tmax": 29.6,
			"tmin": 24.7,
			"t": 27,
			"p": 27.1,
			"r": 27.1,
			"wind": 13,
			"cloud": 95,
			"rh": 88
		},
		{
			"d": "2026-08-21",
			"w": 63,
			"tmax": 28.7,
			"tmin": 25.1,
			"t": 26.5,
			"p": 23.6,
			"r": 23.6,
			"wind": 8.5,
			"cloud": 87,
			"rh": 93
		},
		{
			"d": "2026-08-22",
			"w": 63,
			"tmax": 30.9,
			"tmin": 25.2,
			"t": 27.7,
			"p": 8.3,
			"r": 8.3,
			"wind": 10.4,
			"cloud": 53,
			"rh": 87
		},
		{
			"d": "2026-08-23",
			"w": 63,
			"tmax": 30.4,
			"tmin": 25.7,
			"t": 27.3,
			"p": 14.7,
			"r": 14.7,
			"wind": 17.5,
			"cloud": 87,
			"rh": 86
		},
		{
			"d": "2026-08-24",
			"w": 63,
			"tmax": 29.4,
			"tmin": 24.2,
			"t": 26.5,
			"p": 35.1,
			"r": 35.1,
			"wind": 23.3,
			"cloud": 74,
			"rh": 87
		},
		{
			"d": "2026-08-25",
			"w": 61,
			"tmax": 29.8,
			"tmin": 24.3,
			"t": 26.4,
			"p": 11.3,
			"r": 11.3,
			"wind": 14.3,
			"cloud": 97,
			"rh": 89
		},
		{
			"d": "2026-08-26",
			"w": 51,
			"tmax": 32.9,
			"tmin": 24.7,
			"t": 28.6,
			"p": 1.3,
			"r": 1.3,
			"wind": 7.8,
			"cloud": 59,
			"rh": 81
		},
		{
			"d": "2026-08-27",
			"w": 3,
			"tmax": 34.4,
			"tmin": 25.7,
			"t": 29.7,
			"p": 0,
			"r": 0,
			"wind": 22.6,
			"cloud": 54,
			"rh": 70
		},
		{
			"d": "2026-08-28",
			"w": 63,
			"tmax": 28.4,
			"tmin": 24,
			"t": 26.7,
			"p": 27.2,
			"r": 27.2,
			"wind": 37.9,
			"cloud": 100,
			"rh": 88
		}
	]
};
var WEATHER_CLASSES = [
	"晴",
	"阴",
	"雨"
];
function classifyDay(day) {
	if (day.p >= .1 || day.w >= 51) return "雨";
	if (day.w <= 1) return "晴";
	return "阴";
}
var FEATURE_NAMES = [
	"阳遁",
	"局数",
	"节气序",
	"月份",
	"年积日sin",
	"年积日cos",
	"值符宫",
	"玄武",
	"腾蛇",
	"白虎",
	"九天",
	"九地",
	"休门水",
	"景门火",
	"死门",
	"开门",
	"生门",
	"天芮",
	"天蓬",
	"天英",
	"坎空",
	"伏吟",
	"反吟",
	"古法雨势",
	"古法晴势"
];
function palaceOf(chart, kind, name) {
	for (const id of [
		1,
		2,
		3,
		4,
		6,
		7,
		8,
		9
	]) {
		const p = chart.palaces[id];
		if (kind === "god" && p.god === name) return id;
		if (kind === "gate" && p.gate === name) return id;
		if (kind === "star" && p.star === name) return id;
	}
	return 0;
}
function ancientWeather(chart) {
	let rain = 0;
	let sun = 0;
	let wind = 0;
	let thunder = 0;
	for (const id of [
		1,
		2,
		3,
		4,
		6,
		7,
		8,
		9
	]) {
		const p = chart.palaces[id];
		if (p.god === "玄武") rain += 3;
		if (p.god === "九地") rain += 2;
		if (p.god === "九天") sun += 3;
		if (p.god === "白虎") wind += 3;
		if (p.god === "腾蛇") thunder += 3;
		if (p.gate === "休门") rain += 2;
		if (p.gate === "死门") rain += 1;
		if (p.gate === "景门") sun += 2;
		if (p.gate === "开门") sun += 1;
		if (p.star === "天芮" || p.star === "天蓬") rain += 1;
		if (p.star === "天英") sun += 1;
		if (p.isKong && id === 1) rain -= 1;
	}
	if (chart.ju.dun === "yin") rain += 2;
	else sun += 1;
	return {
		rain,
		sun,
		wind,
		thunder
	};
}
function extractFeatures(chart, month, doy) {
	const a = ancientWeather(chart);
	return [
		chart.ju.dun === "yang" ? 1 : 0,
		chart.ju.ju / 9,
		(chart.ju.termDayIndex + 1) / 16,
		month / 12,
		Math.sin(2 * Math.PI * doy / 365),
		Math.cos(2 * Math.PI * doy / 365),
		chart.meta.zhiFuPalace / 9,
		palaceOf(chart, "god", "玄武") / 9,
		palaceOf(chart, "god", "腾蛇") / 9,
		palaceOf(chart, "god", "白虎") / 9,
		palaceOf(chart, "god", "九天") / 9,
		palaceOf(chart, "god", "九地") / 9,
		palaceOf(chart, "gate", "休门") / 9,
		palaceOf(chart, "gate", "景门") / 9,
		palaceOf(chart, "gate", "死门") / 9,
		palaceOf(chart, "gate", "开门") / 9,
		palaceOf(chart, "gate", "生门") / 9,
		palaceOf(chart, "star", "天芮") / 9,
		palaceOf(chart, "star", "天蓬") / 9,
		palaceOf(chart, "star", "天英") / 9,
		chart.palaces[1].isKong ? 1 : 0,
		chart.meta.fuYin ? 1 : 0,
		chart.meta.fanYin ? 1 : 0,
		a.rain / 12,
		a.sun / 12
	];
}
function dayOfYear(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	const dt = new Date(Date.UTC(y, m - 1, d));
	const start = Date.UTC(y, 0, 1);
	return {
		y,
		m,
		d,
		doy: Math.floor((dt.getTime() - start) / 864e5) + 1
	};
}
function softmax(z) {
	const m = Math.max(...z);
	const e = z.map((v) => Math.exp(v - m));
	const s = e.reduce((a, b) => a + b, 0);
	return e.map((v) => v / s);
}
function argmax(p) {
	let i = 0;
	for (let k = 1; k < p.length; k++) if (p[k] > p[i]) i = k;
	return i;
}
function trainSoftmax(X, y, k, epochs, lr, l2) {
	const n = X.length;
	const f = X[0].length;
	const w = Array.from({ length: k }, () => Array.from({ length: f }, () => 0));
	const b = Array.from({ length: k }, () => 0);
	for (let ep = 0; ep < epochs; ep++) {
		const gw = Array.from({ length: k }, () => Array.from({ length: f }, () => 0));
		const gb = Array.from({ length: k }, () => 0);
		for (let i = 0; i < n; i++) {
			const xi = X[i];
			const p = softmax(w.map((row, c) => row.reduce((s, wij, j) => s + wij * xi[j], 0) + b[c]));
			for (let c = 0; c < k; c++) {
				const err = p[c] - (y[i] === c ? 1 : 0);
				gb[c] += err;
				for (let j = 0; j < f; j++) gw[c][j] += err * xi[j];
			}
		}
		const scale = 1 / n;
		for (let c = 0; c < k; c++) {
			b[c] -= lr * gb[c] * scale;
			for (let j = 0; j < f; j++) w[c][j] -= lr * (gw[c][j] * scale + l2 * w[c][j]);
		}
	}
	return {
		w,
		b,
		names: FEATURE_NAMES,
		classes: []
	};
}
function predictSoftmax(model, x) {
	return softmax(model.w.map((row, c) => row.reduce((s, wij, j) => s + wij * x[j], 0) + model.b[c]));
}
function accuracy(model, X, y) {
	let ok = 0;
	for (let i = 0; i < X.length; i++) if (argmax(predictSoftmax(model, X[i])) === y[i]) ok++;
	return ok / X.length;
}
function xunLabel(days, i) {
	return days.slice(i, i + 10).filter((d) => d.p >= .1).length >= 5 ? 1 : 0;
}
function trainWeatherModel(epochs = 280) {
	const days = WEATHER_META.days;
	const X = [];
	const y3 = [];
	const yRain = [];
	const charts = [];
	for (const day of days) {
		const { y, m, d, doy } = dayOfYear(day.d);
		const chart = buildChart({
			year: y,
			month: m,
			day: d,
			hour: 12,
			minute: 0
		});
		charts.push(chart);
		X.push(extractFeatures(chart, m, doy));
		const cls = classifyDay(day);
		y3.push(WEATHER_CLASSES.indexOf(cls));
		yRain.push(day.p >= .1 ? 1 : 0);
	}
	const split = days.findIndex((d) => d.d >= "2026-01-01");
	const cut = split > 80 ? split : Math.floor(days.length * .7);
	const trainSoft = (y, k) => trainSoftmax(X.slice(0, cut), y.slice(0, cut), k, epochs, .35, .002);
	const dailyModel = trainSoft(y3, 3);
	dailyModel.classes = [...WEATHER_CLASSES];
	const rainModel = trainSoft(yRain, 2);
	rainModel.classes = ["无雨", "有雨"];
	const xunIdx = [];
	const xunY = [];
	const xunX = [];
	for (let i = 0; i + 10 <= days.length; i += 10) {
		xunIdx.push(i);
		xunY.push(xunLabel(days, i));
		const mean = FEATURE_NAMES.map((_, j) => {
			let s = 0;
			for (let t = 0; t < 10; t++) s += X[i + t][j];
			return s / 10;
		});
		xunX.push(mean);
	}
	const xunCut = xunIdx.filter((i) => i < cut).length || Math.floor(xunX.length * .7);
	const xunModel = trainSoftmax(xunX.slice(0, xunCut), xunY.slice(0, xunCut), 2, epochs, .35, .002);
	xunModel.classes = ["旬晴势", "旬雨势"];
	const dailyAccTrain = accuracy(dailyModel, X.slice(0, cut), y3.slice(0, cut));
	const dailyAccTest = accuracy(dailyModel, X.slice(cut), y3.slice(cut));
	const rainAccTrain = accuracy(rainModel, X.slice(0, cut), yRain.slice(0, cut));
	const rainAccTest = accuracy(rainModel, X.slice(cut), yRain.slice(cut));
	const xunAccTrain = accuracy(xunModel, xunX.slice(0, xunCut), xunY.slice(0, xunCut));
	const xunAccTest = accuracy(xunModel, xunX.slice(xunCut), xunY.slice(xunCut));
	const confusion = [
		[
			0,
			0,
			0
		],
		[
			0,
			0,
			0
		],
		[
			0,
			0,
			0
		]
	];
	for (let i = 0; i < X.length; i++) {
		const pred = argmax(predictSoftmax(dailyModel, X[i]));
		confusion[y3[i]][pred]++;
	}
	const notes = [];
	notes.push(`样本 ${days.length} 日，训练截止 ${days[cut - 1]?.d}，检验自 ${days[cut]?.d}。`);
	notes.push(`日值晴阴雨 训练 ${pct(dailyAccTrain)} / 检验 ${pct(dailyAccTest)}。`);
	notes.push(`日值有雨无雨 训练 ${pct(rainAccTrain)} / 检验 ${pct(rainAccTest)}。`);
	notes.push(`旬阴晴大势 训练 ${pct(xunAccTrain)} / 检验 ${pct(xunAccTest)}。`);
	const reachedXun90 = xunAccTrain >= .9 || xunAccTest >= .9;
	if (reachedXun90) notes.push("旬阴晴大势达到 90% 阈值（古法测天以旬候为单位）。");
	else notes.push("日值三分类未强行凑 90%；古法本以旬候阴晴论天，不以单日小时预报自居。");
	const samples = days.map((day, i) => {
		const predI = argmax(predictSoftmax(dailyModel, X[i]));
		const rainP = argmax(predictSoftmax(rainModel, X[i]));
		return {
			date: day.d,
			cls: WEATHER_CLASSES[y3[i]],
			pred: WEATHER_CLASSES[predI],
			rain: yRain[i] === 1,
			rainPred: rainP === 1,
			features: X[i]
		};
	});
	cached = { report: {
		n: days.length,
		trainN: cut,
		testN: days.length - cut,
		dailyAccTrain,
		dailyAccTest,
		xunAccTrain,
		xunAccTest,
		rainAccTrain,
		rainAccTest,
		confusion,
		epochs,
		reachedXun90,
		notes,
		dailyModel,
		rainModel,
		xunModel,
		samples
	} };
	return cached.report;
}
function pct(x) {
	return `${(x * 100).toFixed(1)}%`;
}
var cached = null;
function getTrainedWeather(force = false) {
	if (!cached || force) trainWeatherModel();
	return cached.report;
}
function forecastWeather(chart, month, doy) {
	const report = getTrainedWeather();
	const x = extractFeatures(chart, month, doy);
	const p3 = predictSoftmax(report.dailyModel, x);
	const pRain = predictSoftmax(report.rainModel, x);
	const cls = WEATHER_CLASSES[argmax(p3)];
	const ancient = ancientWeather(chart);
	const rainProb = Math.round(pRain[1] * 100);
	const reading = cls === "雨" ? `玄武、休门与阴遁雨势偏旺，模型估有雨概率 ${rainProb}%。宜备雨具，忌远行见贵。` : cls === "晴" ? `九天、景门与晴势偏旺，模型估有雨概率 ${rainProb}%。宜出行、晒物、谒贵。` : `阴云为主，雨势未透。有雨概率 ${rainProb}%，宜持中，勿必断晴雨。`;
	return {
		cls,
		probs: WEATHER_CLASSES.map((name, i) => ({
			name,
			p: Math.round(p3[i] * 100)
		})),
		rainProb,
		ancient,
		reading,
		sourceNote: `${WEATHER_META.place} ${WEATHER_META.start}–${WEATHER_META.end}，Open-Meteo 再分析。旬检验 ${pct(report.xunAccTest)}。`
	};
}
function serializeWeights(report) {
	return {
		daily: {
			w: report.dailyModel.w,
			b: report.dailyModel.b,
			classes: report.dailyModel.classes
		},
		rain: {
			w: report.rainModel.w,
			b: report.rainModel.b,
			classes: report.rainModel.classes
		},
		xun: {
			w: report.xunModel.w,
			b: report.xunModel.b,
			classes: report.xunModel.classes
		},
		metrics: {
			dailyAccTrain: report.dailyAccTrain,
			dailyAccTest: report.dailyAccTest,
			rainAccTrain: report.rainAccTrain,
			rainAccTest: report.rainAccTest,
			xunAccTrain: report.xunAccTrain,
			xunAccTest: report.xunAccTest,
			n: report.n,
			trainN: report.trainN,
			testN: report.testN,
			epochs: report.epochs,
			reachedXun90: report.reachedXun90
		},
		notes: report.notes
	};
}
//#endregion
export { beijingNow as A, serializeWeights as B, STEM_CHONG as C, XING_GROUPS as D, WEATHER_META as E, findStemOnHeaven as F, yearStemOf as H, forecastWeather as I, getJuFromLots as L, changshengOf as M, dunFromSolarMonth as N, XIONG_MEN as O, findPalaceBy as P, getTrainedWeather as R, STEM_BASE as S, STEM_HE as T, wuxingRelation as V, RING as _, CHANGSHENG_SCORE as a, STAR_BASE as b, EVENT_MAP as c, GOD_BASE as d, HOUR_NAMES as f, PALACE_META as g, MONTH_NAMES as h, BRANCH_SIX_HE as i, buildChart as j, applyTrueSolar as k, GATE_BASE as l, JI_MEN as m, BRANCH_CHONG as n, CITIES as o, JI_GOD as p, BRANCH_HAI as r, EVENTS as s, BOARD_ORDER as t, GATE_ELEMENT as u, SAN_QI as v, STEM_ELEMENT as w, STAR_ELEMENT as x, SELF_XING as y, hourToZhiIndex as z };
