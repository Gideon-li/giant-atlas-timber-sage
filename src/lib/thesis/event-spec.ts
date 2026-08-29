import { buildChart } from "@/lib/qimen/chart";
import {
  CHANGSHENG_SCORE,
  EVENTS,
  GATE_ELEMENT,
  SCORE_SCALE,
  STAR_ELEMENT,
  STEM_BASE,
  STEM_CHONG,
  STEM_HE,
} from "@/lib/qimen/constants";
import { EVENT_CALIBRATION, GATE_BASE, GOD_BASE, STAR_BASE } from "@/lib/qimen/calibrated";
import { STEM_GE } from "@/lib/qimen/classic";
import { ACTIVITY_META, GATE_USES } from "@/lib/qimen/direction";
import { luckLevel, probabilityOf, scoreAllEvents, scoreEvent } from "@/lib/qimen/score";

function n3(x: number) {
  return x.toFixed(3);
}

function mdTable(headers: string[], rows: string[][]) {
  const head = `| ${headers.join(" | ")} |`;
  const sep = `|${headers.map(() => "---").join("|")}|`;
  return [head, sep, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");
}

function recTable(title: string, rec: Record<string, number>) {
  return `### ${title}\n\n${mdTable(
    ["名", "分值"],
    Object.entries(rec).map(([k, v]) => [k, String(v)]),
  )}`;
}

const PATTERN_CATALOG: { name: string; weight: number; source: string; when: string }[] = [
  { name: "青龙反首", weight: 18, source: "《烟波钓叟歌》甲加丙", when: "天盘甲/戊加地盘丙" },
  { name: "飞鸟跌穴", weight: 18, source: "《烟波钓叟歌》丙加甲", when: "天盘丙加地盘甲/戊" },
  { name: "青龙逃走", weight: -16, source: "乙加辛", when: "天盘乙加地盘辛" },
  { name: "白虎猖狂", weight: -16, source: "辛加乙", when: "天盘辛加地盘乙" },
  { name: "朱雀投江", weight: -14, source: "丁加癸", when: "天盘丁加地盘癸" },
  { name: "螣蛇夭矫", weight: -14, source: "癸加丁", when: "天盘癸加地盘丁" },
  { name: "太白入荧", weight: -12, source: "庚加丙", when: "天盘庚加地盘丙" },
  { name: "荧入太白", weight: -10, source: "丙加庚", when: "天盘丙加地盘庚" },
  { name: "值符飞宫", weight: -10, source: "甲加庚", when: "天盘甲加地盘庚" },
  { name: "太白擒龙", weight: -12, source: "庚加甲", when: "天盘庚加地盘甲" },
  { name: "日奇入雾", weight: -6, source: "乙加己", when: "天盘乙加地盘己" },
  { name: "朱雀入墓", weight: -8, source: "丁加己", when: "天盘丁加地盘己" },
  { name: "火入勾陈", weight: -7, source: "己加丁", when: "天盘己加地盘丁" },
  { name: "三奇吉门", weight: 14, source: "《总序》开三", when: "乙丙丁临开休生" },
  { name: "天遁", weight: 14, source: "九遁", when: "丙+生门+九天或丁" },
  { name: "地遁", weight: 12, source: "九遁", when: "乙+开门" },
  { name: "人遁", weight: 12, source: "九遁", when: "丁+太阴+休门" },
  { name: "真诈", weight: 8, source: "三诈法", when: "开休生临太阴" },
  { name: "休诈", weight: 8, source: "三诈法", when: "开休生临六合" },
  { name: "重诈", weight: 8, source: "三诈法", when: "开休生临九地" },
  { name: "三奇得使", weight: 12, source: "乙逢犬马、丙鼠猴、丁龙虎", when: "奇干逢使支" },
  { name: "玉女守门", weight: 6, source: "三奇游六仪", when: "丁临六仪且吉门" },
  { name: "伏吟", weight: -10, source: "《烟波钓叟歌》", when: "天盘=地盘" },
  { name: "反吟", weight: -8, source: "天蓬到天英", when: "宫冲" },
  { name: "门迫", weight: -9, source: "门克宫", when: "门五行克宫" },
  { name: "宫迫", weight: -5, source: "宫克门", when: "宫五行克门" },
  { name: "入墓", weight: -10, source: "长生墓库", when: "用神入墓" },
  { name: "击刑", weight: -12, source: "六仪击刑", when: "仪星击刑" },
  { name: "空亡", weight: -8, source: "旬空", when: "用神宫旬空" },
  { name: "驿马", weight: 4, source: "太冲天马", when: "驿马入宫" },
  { name: "五不遇时", weight: -14, source: "时干克日干", when: "时克日" },
  { name: "文昌会景", weight: 8, source: "天辅+景门", when: "考试文书" },
  { name: "天心得门", weight: 6, source: "天心+开/休", when: "求谋医药" },
  { name: "蓬休同宫", weight: -2, source: "天蓬+休门", when: "凶星得吉门稍解" },
];

const GANZHI_WEIGHTS = [
  ["年/月干合用神", "+6", "STEM_HE，日时以外"],
  ["日/时干合用神", "+10", "STEM_HE，日时权重大"],
  ["年/月干冲用神", "−7", "STEM_CHONG"],
  ["日/时干冲用神", "−12", "STEM_CHONG"],
  ["日/时干生用神", "+6", "五行生我"],
  ["日/时干克用神", "−7", "五行克我"],
  ["年/月支六合宫", "+5", "BRANCH_SIX_HE"],
  ["日/时支六合宫", "+9", "BRANCH_SIX_HE"],
  ["年/月支冲宫", "−6", "BRANCH_CHONG"],
  ["日/时支冲宫", "−11", "BRANCH_CHONG"],
  ["年/月支刑宫", "−5", "三刑/自刑"],
  ["日/时支刑宫", "−9", "三刑/自刑"],
  ["年/月支害宫", "−4", "BRANCH_HAI"],
  ["日/时支害宫", "−7", "BRANCH_HAI"],
  ["日干长生在时", "0.45×十二长生分", "四舍五入"],
  ["时干长生在日", "0.35×十二长生分", "四舍五入"],
  ["用神空亡", "−16", "旬空落用神宫"],
];

const SEASON_WANG = [
  ["月支旺与用神同五行", "+10", "得令"],
  ["用神生月旺", "−4", "我生，泄气"],
  ["月旺生用神", "+5", "生我，得气"],
  ["用神克月旺", "−2", "我克，耗力"],
  ["月旺克用神", "−8", "克我，受制"],
];

const PHASE = { start: 0.25, process: 0.35, end: 0.4, aux: 0.55 };

const SAMPLE_CIVIL = { year: 2026, month: 8, day: 29, hour: 12, minute: 0 };

function biasRows(
  base: Record<string, number>,
  bias: Record<string, number>,
  names: string[],
) {
  return names
    .filter((k) => k in base || k in bias)
    .map((k) => {
      const b0 = base[k] ?? 0;
      const d = bias[k] ?? 0;
      return [k, String(b0), d ? (d > 0 ? `+${d}` : String(d)) : "0", String(b0 + d)];
    });
}

function eventBiasChapters() {
  return EVENTS.map((ev, i) => {
    const gates = Object.keys(GATE_BASE);
    const stars = Object.keys(STAR_BASE);
    const gods = Object.keys(GOD_BASE);
    const sec = ev.secondary ? `${ev.secondary.kind}=${ev.secondary.name}` : "无";
    return `### 9.${i + 1} ${ev.name}（id=${ev.id}）

用神取法：${ev.yongShen === "zhifu" ? "值符所落宫（为自己）" : `${ev.yongShen}「${ev.target}」所落宫`}。次看 ${sec}。

古法说明：${ev.brief}

临用神宫时，门/星/神的贡献 = 天气校准后的基础分 + 本事项偏置。下表「合计」即该符号落在用神宫时写入 S 的加项（尚未乘阶段权重）。

**八门偏置**

${mdTable(["门", "基础分（校准后）", "事项偏置", "合计"], biasRows(GATE_BASE, ev.gateBias, gates))}

**九星偏置**

${mdTable(["星", "基础分（校准后）", "事项偏置", "合计"], biasRows(STAR_BASE, ev.starBias, stars))}

**八神偏置**

${mdTable(["神", "基础分（校准后）", "事项偏置", "合计"], biasRows(GOD_BASE, ev.godBias, gods))}

特殊规则：${
      ev.id === "health"
        ? "病星天芮空亡或入墓 +12（病气衰减）；天芮帝旺 −10；生门 +8；死门非空 −8。填写出生年则用神宫改取年干天盘宫。"
        : ev.id === "romance"
          ? "沐浴改作 +8（桃花）；男测兑/坤宫 +6，女测乾/坎宫 +6。"
          : ev.id === "job" || ev.id === "career"
            ? "若填写出生年，用神宫改取年干在天盘所落宫（以年命代值符/开门宫）。"
            : "无额外翻转规则。"
    }`;
  }).join("\n\n");
}

function sampleDump() {
  const chart = buildChart(SAMPLE_CIVIL);
  const all = scoreAllEvents(chart);
  const wealth = scoreEvent(chart, "wealth");
  const ranked = mdTable(
    ["事项", "用神宫", "神/星/门", "开始分", "过程分", "收局分", "综合 S", "百分比", "总断"],
    all.map((ev) => {
      const p = chart.palaces[ev.palaceId];
      return [
        ev.name,
        `${p.bagua}${ev.palaceId}`,
        `${p.god ?? "—"}/${p.star}/${p.gate ?? "—"}`,
        String(ev.phases.start.score),
        String(ev.phases.process.score),
        String(ev.phases.end.score),
        (ev.score > 0 ? "+" : "") + String(ev.score),
        `${ev.probability}%`,
        ev.level,
      ];
    }),
  );
  const factors = mdTable(
    ["阶段", "因子", "说明", "分值"],
    wealth.factors.map((f) => [f.phase, f.label, f.detail, (f.weight > 0 ? "+" : "") + String(f.weight)]),
  );
  const start = wealth.factors.filter((f) => f.phase === "start").reduce((s, f) => s + f.weight, 0);
  const process = wealth.factors.filter((f) => f.phase === "process").reduce((s, f) => s + f.weight, 0);
  const end = wealth.factors.filter((f) => f.phase === "end").reduce((s, f) => s + f.weight, 0);
  const aux = wealth.factors.filter((f) => f.phase === "aux").reduce((s, f) => s + f.weight, 0);
  const raw = start * PHASE.start + process * PHASE.process + end * PHASE.end + aux * PHASE.aux;
  return {
    chart,
    ranked,
    wealth,
    factors,
    mix: { start, process, end, aux, raw, score: wealth.score, p: wealth.probability },
  };
}

const SAMPLE = sampleDump();

export const EVENT_MODEL_SPEC = {
  title: "十二类日常事项加性分值模型",
  method:
    "拆补法转盘排盘后，按事项取用神宫，神/星/门基础分（天气校准后）加事项偏置，再加干支、长生、月令、格局；四阶段加权得 S，P=σ(S/22)。",
  scoreScale: SCORE_SCALE,
  probability: "P = clip(sigmoid(S/22), 0.04, 0.96)，界面为百分数",
  phaseWeights: PHASE,
  luckBands: {
    大吉: "S≥42",
    吉: "20≤S<42",
    小吉: "6≤S<20",
    平: "-6<S<6",
    小凶: "-20<S≤-6",
    凶: "-42<S≤-20",
    大凶: "S≤-42",
  },
  bases: {
    god: { ...GOD_BASE },
    gate: { ...GATE_BASE },
    star: { ...STAR_BASE },
    stem: { ...STEM_BASE },
    changsheng: { ...CHANGSHENG_SCORE },
    calibration: {
      method: EVENT_CALIBRATION.method,
      globalScale: EVENT_CALIBRATION.globalScale,
      meanXunAcc: EVENT_CALIBRATION.meanXunAcc,
    },
  },
  events: EVENTS.map((e) => ({
    id: e.id,
    name: e.name,
    brief: e.brief,
    yongShen: e.yongShen,
    target: e.target,
    secondary: e.secondary ?? null,
    gateBias: e.gateBias,
    starBias: e.starBias,
    godBias: e.godBias,
  })),
  patterns: PATTERN_CATALOG,
  stemGe: Object.entries(STEM_GE).map(([k, v]) => ({ stems: k, ...v })),
  sampleCivil: SAMPLE_CIVIL,
  sampleJu: SAMPLE.chart.ju.label,
  sampleEvents: scoreAllEvents(SAMPLE.chart).map((ev) => ({
    id: ev.eventId,
    name: ev.name,
    palaceId: ev.palaceId,
    score: ev.score,
    probability: ev.probability,
    level: ev.level,
    phases: ev.phases,
    topFactors: ev.factors.slice(0, 8).map((f) => ({
      phase: f.phase,
      label: f.label,
      detail: f.detail,
      weight: f.weight,
    })),
  })),
};

function yongShenTable() {
  return mdTable(
    ["事项", "用神种类", "主用神", "次看", "取宫规则"],
    EVENTS.map((e) => [
      e.name,
      e.yongShen === "zhifu" ? "值符宫" : e.yongShen === "gate" ? "八门" : e.yongShen === "star" ? "九星" : "八神",
      e.target,
      e.secondary ? `${e.secondary.name}` : "—",
      e.yongShen === "zhifu"
        ? "值符飞宫；填出生年则改年干天盘宫"
        : `找「${e.target}」所在宫；求职/事业/健康填年命则改年干天盘宫`,
    ]),
  );
}

export function eventChapters(): string {
  const { chart, ranked, wealth, factors, mix } = SAMPLE;
  const p = chart.palaces[wealth.palaceId];
  return `
## 第 8 章 十二类日常事项预测：完整数学模型

本章给出软件里「事项」页实际执行的算法。它不是神经网络，而是**可加、可导出、与天气同一 sigmoid** 的分值模型。每一个数字都来自：刘伯温《秘笈》吉凶先验 → 第 7 章天气信度校准后的基础分 → 事项专用偏置 → 干支/长生/月令/格局辅项 → 阶段加权。

### 8.1 一次预测的计算顺序

1. 以北京时间（或真太阳时、求签定局）排拆补法转盘，得到九宫的天盘干、九星、八门、八神、空亡、马星、伏吟反吟、门迫宫迫、入墓击刑。
2. 按事项定义取**用神宫** \(u\)（见第 9 章表）。
3. 在宫 \(u\) 上读取神、星、门、天盘干，查基础分与事项偏置，得到开始/过程/收局三项。
4. 叠加辅项：十二长生、月令旺衰、四柱合冲刑害、空亡、经典格局。
5. 按阶段加权合成综合分 \(S\\)，再变成百分比。

### 8.2 主公式

记用神宫上神、星、门的基础分为 \(w^{神},w^{星},w^{门}\)（第 7 章校准后），事项偏置为 \(\\delta\)，辅项集合为 \(\\mathcal{A}\)：

\\\\[ S_{始} = w^{神}+\\delta^{神},\\quad S_{中}=w^{星}+\\delta^{星}+w_{长生},\\quad S_{终}=w^{门}+\\delta^{门}+w_{格局} \\\\]

\\\\[ S_{辅} = w_{天干}+w_{月令}+\\sum w_{干支}+\\sum_{a\\in\\mathcal{A}} w_a \\\\]

\\\\[ S_{raw} = 0.25\\,S_{始} + 0.35\\,S_{中} + 0.40\\,S_{终} + 0.55\\,S_{辅} \\\\]

\\\\[ S = \\mathrm{round}\\big(\\mathrm{clip}(S_{raw},-100,100)\\big),\\qquad P=\\mathrm{round}\\big(100\\cdot\\mathrm{clip}(\\sigma(S/22),0.04,0.96)\\big)\\% \\\\]

阶段权重 0.25 / 0.35 / 0.40 对应古法「神应开始、星应过程、门应收局」：收局门最重。辅项系数 0.55 大于 1 的阶段平均，是因为合冲空亡往往决定事能否落地，需足够拉动 S。

### 8.3 百分比与总断档

与天气完全相同：SCORE_SCALE = ${SCORE_SCALE}。

${mdTable(
  ["条件", "总断"],
  [
    ["S ≥ 42", "大吉"],
    ["20 ≤ S < 42", "吉"],
    ["6 ≤ S < 20", "小吉"],
    ["−6 < S < 6", "平"],
    ["−20 < S ≤ −6", "小凶"],
    ["−42 < S ≤ −20", "凶"],
    ["S ≤ −42", "大凶"],
  ],
)}

对照：σ(6/22)≈57%，σ(20/22)≈71%，σ(42/22)≈87%。界面把概率夹在 4%–96%，避免 0/100 的过度自信。

### 8.4 基础分（天气校准后，全盘共用）

这些是**所有十二类事项共用**的神星门底分，来自第 7 章。事项再叠加各自 δ。

${recTable("八神基础分 GOD_BASE", GOD_BASE)}

${recTable("八门基础分 GATE_BASE", GATE_BASE)}

${recTable("九星基础分 STAR_BASE", STAR_BASE)}

${recTable("天盘干 STEM_BASE（乙丙丁为三奇）", STEM_BASE)}

${recTable("十二长生 CHANGSHENG_SCORE（临用神宫时写入过程）", CHANGSHENG_SCORE)}

天盘干不经天气校准：乙丙丁三奇为正，庚为金克、负，来自《秘笈》三奇六仪，不是雨日回归。

### 8.5 月令旺衰

取用神门的五行（无门则用宫五行），与月支旺气相生克：

${mdTable(["关系", "分值", "含义"], SEASON_WANG)}

月支旺气：寅卯木、巳午火、申酉金、亥子水、辰戌丑未土。

### 8.6 四柱干支加分（ganzhiFlags）

年、月、日、时四柱分别与用神宫天盘干、宫支比较。日时权重大于年月。

${mdTable(["规则", "分值", "出处"], GANZHI_WEIGHTS)}

天干五合：${Object.entries(STEM_HE)
    .filter((_, i) => i % 2 === 0)
    .map(([a, b]) => `${a}${b}`)
    .join("、")}。天干相冲：${Object.entries(STEM_CHONG)
    .filter((_, i) => i % 2 === 0)
    .map(([a, b]) => `${a}${b}`)
    .join("、")}。

---

## 第 9 章 十二类事项的用神与全部偏置

用神决定「看哪一宫」。偏置 δ 决定「同一个开门，求财与求医含义不同」。下表是软件 EVENT 表的完整导出。

${yongShenTable()}

五行：门 ${Object.entries(GATE_ELEMENT)
    .map(([k, v]) => `${k}=${v}`)
    .join("，")}；星 ${Object.entries(STAR_ELEMENT)
    .map(([k, v]) => `${k}=${v}`)
    .join("，")}。

${eventBiasChapters()}

---

## 第 10 章 格局、人事、方位、求签

### 10.1 经典格局权重全表

格局在用神宫（及部分全局条件）触发，写入辅项或收局。同一格局名只计一次。十干克应来自《烟波钓叟歌》；九遁三诈来自《秘笈》。

${mdTable(
  ["格局", "分值", "触发", "文献"],
  PATTERN_CATALOG.map((p) => [p.name, String(p.weight), p.when, p.source]),
)}

十干克应键（天盘+地盘）数值备份：

${mdTable(
  ["天盘+地盘", "格局", "分值", "断语"],
  Object.entries(STEM_GE).map(([k, v]) => [k, v.name, String(v.weight), v.detail]),
)}

### 10.2 人事关系（peopleRelations）

以值符宫为「我」，其余八宫按五行生克定六亲，再给关系分：

\\\\[ S_{人} = \\mathrm{round}\\big(\\mathrm{clip}(0.45(w_门+w_星+w_神)+e+h+c,\\ -80,\\ 80)\\big) \\\\]

其中 e = 空亡 −14 + 入墓 −8 + 门迫 −6 + 伏吟 −4；支合 +10，支冲 −12。六亲：生我=父母，我生=子孙，克我=官鬼，我克=妻财，同我=兄弟。男测兑离坤偏妻财，女测乾坎震偏官夫。百分比仍用 σ(S/22)，档位与事项相同。

### 10.3 方位用事（scoreDirections）

十类活动各有宜忌门。宫分：

\\\\[ S_{方} = s_{门}(活动) + e_{神星格局} \\\\]

宜门 +16，忌门 −16，其余门 0；无门 −4。附加：值符/九天/六合/太阴 +6，白虎/玄武/腾蛇 −5；天心/天任/天辅 +4，天蓬/天芮/天柱 −4；空 −8，迫 −6，墓 −5，伏吟 −3，反吟 −4。档位：≥16 大宜，≥6 宜，≥−5 平，≥−16 不宜，否则大忌。

${mdTable(
  ["活动", "宜门（+16）", "忌门（−16）"],
  ACTIVITY_META.map((a) => [a.name, a.prefer.join("、"), a.avoid.join("、")]),
)}

八门古法宜忌（《烟波钓叟赋》门旨）：

${mdTable(
  ["门", "宜", "忌", "歌诀摘要"],
  Object.entries(GATE_USES).map(([k, v]) => [k, v.suit.join("、"), v.avoid.join("、"), v.classic]),
)}

无特定活动时，bestDirection 以开休生 +12、景 +6、杜 +2、伤惊 −4、死 −10，再加同一套附加项，档位改为大吉方/吉方/平/凶方。

### 10.4 求签定局

不问时时，而问「数字局」。将输入数字（默认三位数，最多六位）连加至 1–9，得局数。例：168 → 1+6+8=15 → 1+5=6，即 6 局。0 归一为 9。再按当月阴阳遁排该局。这是数根（digital root），不是机器学习。

---

## 第 11 章 数值算例（${SAMPLE_CIVIL.year}-${String(SAMPLE_CIVIL.month).padStart(2, "0")}-${String(SAMPLE_CIVIL.day).padStart(2, "0")} ${String(SAMPLE_CIVIL.hour).padStart(2, "0")}:${String(SAMPLE_CIVIL.minute).padStart(2, "0")} 北京时间）

排盘结果：${chart.ju.label}。日柱 ${chart.pillars.day.name}，时柱 ${chart.pillars.hour.name}。值符在 ${chart.meta.zhiFuPalace} 宫，值使 ${chart.meta.zhiShiGate}。

### 11.1 十二类事项一次扫描

软件事项页即下表，按 S 从高到低排序。百分比与天气同一公式。

${ranked}

### 11.2 求财经营逐步拆开

用神：生门所落 ${p.bagua}${wealth.palaceId} 宫（${p.direction}）。临 ${p.god ?? "无神"} / ${p.star} / ${p.gate ?? "无门"}，天盘 ${p.heavenStem}，地盘 ${p.earthStem}。总断 ${wealth.level}，S=${wealth.score > 0 ? "+" : ""}${wealth.score}，顺利倾向 ${wealth.probability}%。

全部因子（即界面「权重明细」的完整导出）：

${factors}

阶段合计：始 ${n3(mix.start)}，中 ${n3(mix.process)}，终 ${n3(mix.end)}，辅 ${n3(mix.aux)}。

加权：

\\\\[ S_{raw}=0.25\\times ${n3(mix.start)}+0.35\\times ${n3(mix.process)}+0.40\\times ${n3(mix.end)}+0.55\\times ${n3(mix.aux)}=${n3(mix.raw)} \\\\]

四舍五入并截断到 [−100,100] 得 S=${mix.score}。百分比

\\\\[ P=\\mathrm{round}(100\\cdot\\sigma(${mix.score}/22))=${mix.p}\\% \\\\]

总断档 ${luckLevel(mix.score)}，与 probabilityOf(${mix.score})=${probabilityOf(mix.score)}% 一致。

### 11.3 这一天说明了什么

十二类事项**共用一盘、共用一套基础分**，差别只在用神宫与 δ。所以同一时刻求财与求医可以一吉一凶：生门宫与天芮宫不是同一宫。这不是两套机器学习，是两套用神。

---

## 第 12 章 事项模型如何与天气模型衔接

1. 天气只改写神星门**基础分的幅度**（第 7 章），不改用神取宫，不改 δ，不改格局表。
2. 事项 S 与天气 S 单位相同，都进 σ(·/22)。用户在天气页看到「有雨倾向 70%」，在事项页看到「顺利倾向 62%」，读法一致。
3. 事项没有 2020–2026 的吉凶标签（人事无法像降水那样每日标注），因此**不能**对十二类事项再做一次逻辑回归。天气回归的作用是：用可观测的雨日残差，约束不可观测的人事权重尺度。
4. 完整事项模型（基础分、十二类 δ、格局表、本算例）随 JSON 一并导出，字段与本章表格一一对应。
`;
}
