import weightsJson from "@/lib/qimen/weather-weights.json";
import { EVENT_CALIBRATION } from "@/lib/qimen/calibrated";
import { SCORE_SCALE } from "@/lib/qimen/unified";

const W = weightsJson as {
  method: string;
  ml: Record<string, string | number>;
  source: string;
  start: string;
  end: string;
  trainUntil: string;
  testFrom: string;
  nDays: number;
  nRegions: number;
  nTotalSamples: number;
  featureNames: string[];
  regions: {
    id: string;
    name: string;
    place: string;
    climate: string;
    n: number;
    rainDays: number;
    rainRate: number;
    trainN: number;
    testN: number;
    metrics: {
      rainAccTrain: number;
      rainAccTest: number;
      dailyAccTrain: number;
      dailyAccTest: number;
      xunAccTrain: number;
      xunAccTest: number;
      interceptScore: number;
    };
    scoreModel: { w: number[]; b: number; scale: number };
    daily3: { w: number[][]; b: number[]; classes: string[] };
    allFactors: { name: string; logit: number; score: number }[];
  }[];
  eventCalibration: {
    globalScale: number;
    meanXunAcc: number;
    method: string;
    pooledLogit: { name: string; logit: number; score: number }[];
    god: Record<string, number>;
    gate: Record<string, number>;
    star: Record<string, number>;
  };
};

function pct(x: number) {
  return `${(x * 100).toFixed(1)}%`;
}
function n4(x: number) {
  return x.toFixed(4);
}
function n3(x: number) {
  return x.toFixed(3);
}

function mdTable(headers: string[], rows: string[][]) {
  const head = `| ${headers.join(" | ")} |`;
  const sep = `|${headers.map(() => "---").join("|")}|`;
  return [head, sep, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");
}

function regionSummaryTable() {
  return mdTable(
    ["区", "气候", "样本日", "训练", "检验", "雨日", "雨日比", "有雨训练", "有雨检验", "旬训练", "旬检验", "截距分值"],
    W.regions.map((r) => {
      const m = r.metrics;
      return [
        r.name,
        r.climate,
        String(r.n),
        String(r.trainN),
        String(r.testN),
        String(r.rainDays),
        pct(r.rainRate),
        pct(m.rainAccTrain),
        pct(m.rainAccTest),
        pct(m.xunAccTrain),
        pct(m.xunAccTest),
        n3(m.interceptScore),
      ];
    }),
  );
}

function oneRegionWeightTable(r: (typeof W.regions)[number]) {
  const rows: string[][] = [
    ["截距 b", n4(r.scoreModel.b), n3(r.metrics.interceptScore), "无对应特征，吸收该区气候雨日基线"],
  ];
  for (let j = 0; j < W.featureNames.length; j++) {
    const beta = r.scoreModel.w[j] ?? 0;
    rows.push([W.featureNames[j]!, n4(beta), n3(beta * SCORE_SCALE), contribNote(W.featureNames[j]!, beta)]);
  }
  return mdTable(["特征", "logit β", `分值 ${SCORE_SCALE}β`, "产生方式"], rows);
}

function contribNote(name: string, beta: number) {
  if (name === "星_天禽") return "坎宫不出现天禽（寄坤宫），该列恒为 0，梯度为 0";
  if (Math.abs(beta) < 1e-8) return "训练后近 0";
  if (name.startsWith("神_") || name.startsWith("门_") || name.startsWith("星_"))
    return "坎宫 one-hot=1 时对该区 logit 的加项；由 1827 日交叉熵梯度下降得到";
  if (name === "阴遁") return "阴遁日取 1，阳遁取 0";
  if (name === "伏吟" || name === "反吟") return "盘面格局 0/1";
  if (name === "坎空") return "坎宫旬空为 1";
  if (name === "年积日sin" || name === "年积日cos") return "节气气候学三角项，非奇门符号";
  return "逻辑回归系数";
}

function allRegionChapters() {
  return W.regions
    .map((r, i) => {
      const m = r.metrics;
      const top = [...r.allFactors].slice(0, 5);
      const topLine = top.map((f) => `${f.name} ${f.score >= 0 ? "+" : ""}${n3(f.score)}`).join("；");
      const b3 = r.daily3.b.map((v, k) => `${r.daily3.classes[k]}=${n4(v)}`).join("，");
      return `### 6.${i + 1} ${r.name}（${r.place}）

气候带：${r.climate}。样本 ${r.n} 日（训练 ${r.trainN} = ${W.start}–${W.trainUntil}；检验 ${r.testN} = ${W.testFrom}–${W.end}）。雨日 ${r.rainDays}，雨日比 ${pct(r.rainRate)}。

主模型（Bernoulli 有雨）准确率：训练 ${pct(m.rainAccTrain)}，检验 ${pct(m.rainAccTest)}。旬阴晴：训练 ${pct(m.xunAccTrain)}，检验 ${pct(m.xunAccTest)}。辅模型 softmax 晴/阴/雨：训练 ${pct(m.dailyAccTrain)}，检验 ${pct(m.dailyAccTest)}。

分值最大的五项（S=22β）：${topLine}。

Softmax 三类截距：${b3}。主模型截距 b=${n4(r.scoreModel.b)}，对应分值 ${n3(m.interceptScore)}。

该区完整 31 维权重如下。每一行的 β 都是在该区 1827 个训练日上，以交叉熵 + L2 全批梯度下降 120 轮得到的最终值；分值列与事项预测同一单位。

${oneRegionWeightTable(r)}`;
    })
    .join("\n\n");
}

function pooledMedianAbs() {
  const abs = W.eventCalibration.pooledLogit.map((p) => Math.abs(p.logit)).sort((a, b) => a - b);
  return abs[Math.floor(abs.length / 2)] || 0.01;
}

function reliability(beta: number, med: number) {
  return Math.max(0.55, Math.min(1.35, 0.75 + 0.5 * (Math.abs(beta) / (med * 3 + 1e-6))));
}

function pooledOf(prefix: string, name: string) {
  return W.eventCalibration.pooledLogit.find((p) => p.name === `${prefix}_${name}`)?.logit ?? 0;
}

function eventDeriveTable(
  title: string,
  prefix: string,
  classic: Record<string, number>,
  now: Record<string, number>,
) {
  const med = pooledMedianAbs();
  const g = EVENT_CALIBRATION.globalScale;
  const rows = Object.keys(classic).map((k) => {
    const w0 = classic[k]!;
    const beta = pooledOf(prefix, k);
    const r = reliability(beta, med);
    const prod = w0 * r * g;
    return [
      k,
      String(w0),
      n4(beta),
      n3(beta * SCORE_SCALE),
      n3(r),
      n3(g),
      n3(prod),
      String(now[k]!),
    ];
  });
  return `### ${title}\n\n${mdTable(
    ["名", "经典先验 w0", "十二区平均 β", "分值 22β", "信度 r", "尺度 g", "w0·r·g", "四舍五入后"],
    rows,
  )}`;
}

function workedExamples() {
  const med = pooledMedianAbs();
  const g = EVENT_CALIBRATION.globalScale;
  const items: { name: string; prefix: string; classic: number; now: number; why: string }[] = [
    {
      name: "死门",
      prefix: "门",
      classic: EVENT_CALIBRATION.classicGate["死门"]!,
      now: EVENT_CALIBRATION.gate["死门"]!,
      why: "刘伯温以死门为凶门。天气回归里该 one-hot 的 |β| 相对中位数偏大，故幅度加大，符号仍为负。",
    },
    {
      name: "生门",
      prefix: "门",
      classic: EVENT_CALIBRATION.classicGate["生门"]!,
      now: EVENT_CALIBRATION.gate["生门"]!,
      why: "生门为吉门。天气 |β| 未显著高于中位数，乘 g 后略降，避免把雨日气候学误写成求财加分。",
    },
    {
      name: "开门",
      prefix: "门",
      classic: EVENT_CALIBRATION.classicGate["开门"]!,
      now: EVENT_CALIBRATION.gate["开门"]!,
      why: "开门人事主官贵。校准后仍为 +20，尺度被 g 与 r 抵消。",
    },
    {
      name: "值符",
      prefix: "神",
      classic: EVENT_CALIBRATION.classicGod["值符"]!,
      now: EVENT_CALIBRATION.god["值符"]!,
      why: "值符为八神之首。天气坎宫上该列 |β| 偏小，信度下调。",
    },
    {
      name: "玄武",
      prefix: "神",
      classic: EVENT_CALIBRATION.classicGod["玄武"]!,
      now: EVENT_CALIBRATION.god["玄武"]!,
      why: "古法玄武主雨。人事仍作凶神，不把雨势正号抄到求财。",
    },
    {
      name: "天芮",
      prefix: "星",
      classic: EVENT_CALIBRATION.classicStar["天芮"]!,
      now: EVENT_CALIBRATION.star["天芮"]!,
      why: "天芮寄死门宫。天气 |β| 与死门共线，人事凶星幅度加大。",
    },
  ];
  return items
    .map((it, i) => {
      const beta = pooledOf(it.prefix, it.name);
      const r = reliability(beta, med);
      const prod = it.classic * r * g;
      return `例 ${i + 1}　${it.name}

- 经典先验（刘伯温人事吉凶）w0 = ${it.classic}。
- 十二区 Bernoulli 系数算术平均 β̄ = ${n4(beta)}，对应分值 22β̄ = ${n3(beta * SCORE_SCALE)}。
- 中位数 |β|med = ${n4(med)}。
- 信度 r = clip(0.75 + 0.5 × |β̄| / (3 med), 0.55, 1.35) = ${n3(r)}。
- 全国旬准确率尺度 g = 0.92 + 0.16 × ${n3(W.eventCalibration.meanXunAcc)} = ${n3(g)}。
- 乘积 w0 × r × g = ${it.classic} × ${n3(r)} × ${n3(g)} = ${n3(prod)}。
- 四舍五入得最终事项权重 ${it.now}。${it.why}`;
    })
    .join("\n\n");
}

function crossRegionKeyTable() {
  const keys = ["神_玄武", "神_九天", "门_死门", "门_生门", "门_开门", "星_天芮", "阴遁", "年积日cos"];
  const headers = ["区", "截距分", ...keys];
  const rows = W.regions.map((r) => {
    const cells = [r.name, n3(r.metrics.interceptScore)];
    for (const k of keys) {
      const j = W.featureNames.indexOf(k);
      const v = (r.scoreModel.w[j] ?? 0) * SCORE_SCALE;
      cells.push(n3(v));
    }
    return cells;
  });
  return mdTable(headers, rows);
}

const gz = W.regions.find((r) => r.id === "guangzhou")!;
const hk = W.regions.find((r) => r.id === "haikou")!;
const ouhai = W.regions.find((r) => r.id === "ouhai")!;
const med = pooledMedianAbs();

export const PAPER_TITLE =
  "基于拆补法转盘奇门的统一分值模型：2020–2026 中国十二气候区天气逻辑回归校准与事项权重更新";

export const PAPER_MD = `# ${PAPER_TITLE}

博士学位论文（学习用研究报告，非正式学位授予文本）

学科：应用统计学 / 中国术数文献的可计算建模

数据时段：${W.start} 至 ${W.end}

训练 / 检验：${W.trainUntil} 以前为训练（每区 ${ouhai.trainN} 日），${W.testFrom} 起为时间外推检验（每区 ${ouhai.testN} 日）

气候区：${W.nRegions}；每区 ${W.nDays} 日；总样本 ${W.nTotalSamples} 条（区 × 日）

机器学习：Bernoulli 逻辑回归（主）+ 三项 multinomial softmax（辅）；全批梯度下降 ${W.ml.epochs} 轮；学习率 ${W.ml.learningRate}；L2 λ=${W.ml.l2}

---

## 摘要

本文将时家奇门遁甲拆补法转盘排盘，改写为与事项预测相同的加性分值模型。人事与天气共用

\\\\[ P = \\sigma(S/${SCORE_SCALE}),\\quad S = ${SCORE_SCALE}\\,(b + w^{\\top} x) \\\\]

其中 σ 为 logistic sigmoid，界面百分比落在 4%–96%。天气部分以坎宫为用神，对「当日降水量 ≥ 0.1 mm」做 Bernoulli 逻辑回归，并以三项 softmax 辅助输出晴/阴/雨。特征 31 维：坎宫所临八神、八门、九星的 one-hot，加上阴遁、伏吟、反吟、坎空与年积日正弦余弦。

训练窗口由原先的 2025–2026 延长为 ${W.start} 至 ${W.end}，共 ${W.nDays} 日 × ${W.nRegions} 区 = ${W.nTotalSamples} 条。广州旬检验 ${pct(gz.metrics.xunAccTest)}，海口旬训练 ${pct(hk.metrics.xunAccTrain)}，全国旬准确率均值 ${pct(W.eventCalibration.meanXunAcc)}。事项门星神权重按各特征 |β| 信度与该均值重新分配，符号仍依刘伯温人事吉凶，不把雨势符号抄到求财。十二区全部 w、b 与分值见第 6 章；事项最终权重见第 7 章。

关键词：奇门遁甲；逻辑回归；softmax；统一分值；Open-Meteo；ERA5；十二气候区

Abstract. Event luck and rainfall share one scoring map: S = ${SCORE_SCALE}·logit, P = sigmoid(S/${SCORE_SCALE}). Twelve independent Bernoulli logistic models are trained on Open-Meteo daily series ${W.start} to ${W.end} (${W.nDays.toLocaleString()} days × ${W.nRegions} regions = ${W.nTotalSamples.toLocaleString()} samples), using 2020–2024 for training and 2025–2026 for temporal testing. Gate/star/god bases for human events are rescaled by the absolute weather coefficients and the mean dekadal accuracy, without copying rain signs into career or wealth.

---

## 第 1 章 绪论

### 1.1 问题

1. 事项吉凶与天气能否写成同一套加性分值，再用同一 sigmoid 变成百分比？
2. 把训练窗口扩到 2020–2026 后，十二个气候区各自的逻辑回归权重是多少，检验准确率是多少？
3. 天气 β 如何回头调整八门、九星、八神的人事权重，而不把「雨」误写成「凶」？
4. 每个权重从古法先验到梯度下降再到四舍五入，中间每一步的数值是什么？

### 1.2 范围

- 人事分值是辅助决策，不是因果推断。
- 天气模型是再分析格点上的统计对照，不替代 ECMWF / CMA。
- 90% 只在部分气候区的旬尺度上达到（广州检验 ${pct(gz.metrics.xunAccTest)}、海口训练 ${pct(hk.metrics.xunAccTrain)}）；全国均值如实报告为 ${pct(W.eventCalibration.meanXunAcc)}，不倒推改标签。

### 1.3 技术路线

排盘 → 坎宫 31 维 one-hot 与三角特征 → 每区独立逻辑回归学 w、b → S=${SCORE_SCALE}(b+w⊤x) → P=σ(S/${SCORE_SCALE})。事项用神仍按事件取宫，权重改为天气校准后的门星神表。

---

## 第 2 章 文献与古法依据

测天：玄武主雨，腾蛇主雷，白虎主风，九天主晴，九地主雾湿。人事：神始、星中、门终；开休生为吉门。标准文本为明刘基《奇门遁甲秘笈大全》《烟波钓叟歌》、程道生《遁甲演义》。气象统计以 Wilks 的逻辑回归与 Hastie 的多项 logit 为方法来源。数据为 Open-Meteo 对 ERA5 再分析的公开接口（Zippenfenig 2023；Hersbach 2020）。

转盘拆补法：值符值使随时家而飞，八门、九星同环。坎一宫为水、为北，故测天用神固定取坎。天禽寄坤二宫，坎宫 one-hot 中「星_天禽」恒为 0，见第 6 章各区该行。又因八门与九星同宫而飞，坎宫上门、星 one-hot 近乎共线（休门↔天蓬，死门↔天芮，等），故两列 β 接近，人事侧仍分别赋权，因为事项用神宫可以取到天禽寄宫。

---

## 第 3 章 统一分值与数学模型

事项与天气共用加性分值。事项：

\\\\[ S = w_{神} + w_{星} + w_{门} + w_{辅},\\qquad P=\\frac{1}{1+e^{-S/${SCORE_SCALE}}} \\\\]

天气把同一变换写成因变量为「有雨」的线性逻辑回归：

\\\\[ z = b + w^{\\top} x,\\qquad p=\\sigma(z)=\\frac{1}{1+e^{-z}},\\qquad S=${SCORE_SCALE}\\,z \\\\]

于是 P_事项(S) 与 P_有雨(z) 是同一函数：界面都显示 4%–96% 的百分比。分值刻度 ${SCORE_SCALE} 来自事项经验：|S|≈42 约对应大吉/大凶边界，σ(42/22)≈87%。

x 为 31 维，顺序固定为：${W.featureNames.join("，")}。

坎宫神、门、星各取一个 one-hot；阴遁/伏吟/反吟/坎空为 0/1；年积日

\\\\[ x_{sin}=\\sin(2\\pi d/365.25),\\quad x_{cos}=\\cos(2\\pi d/365.25) \\\\]

吸收「夏雨冬干」的气候学，避免把节气相关伪造成奇门符号。

---

## 第 4 章 机器学习类型、损失与优化

### 4.1 选择哪种机器学习

主模型选择 **Bernoulli logistic regression（二项逻辑回归）**，不是随机森林、GBDT 或深度网络。理由：

1. 可解释：每个奇门符号对应一个 β，可直接写入论文与界面分值。
2. 与事项公式同构：事项本就是加性分值，逻辑回归是其概率化。
3. 样本结构是「每日一盘 × 十二区」，树模型极易记住节气，无法把 w 公开成一张表。

辅模型选择 **多项逻辑回归 softmax**，三类 {晴, 阴, 雨}，W ∈ R^{3×31}，b ∈ R^3，仅作界面三分类，不参与事项校准。

未采用的方法：SVM（对 one-hot 与逻辑回归等价或近似）、朴素贝叶斯（特征共线）、神经网络（隐藏层使 β 不可导出）。

### 4.2 损失函数

有雨标签 y∈{0,1}，p=σ(b+w⊤x)，L2 系数 λ=${W.ml.l2}：

\\\\[ L = -\\frac{1}{n}\\sum_{i=1}^{n}\\big[y_i\\log p_i+(1-y_i)\\log(1-p_i)\\big] + \\frac{\\lambda}{2}\\|w\\|_2^2 \\\\]

三项 softmax 为标准交叉熵，同类 L2。

### 4.3 优化器与超参数

- 优化器：全批梯度下降（full-batch GD），无 mini-batch，保证可复现。
- 轮数 epochs = ${W.ml.epochs}。
- 学习率 η = ${W.ml.learningRate}。
- L2 λ = ${W.ml.l2}，不惩罚截距 b。
- 初始化：w=0，b=0。
- 更新：

\\\\[ b \\leftarrow b - \\eta \\cdot \\frac{1}{n}\\sum_i (p_i-y_i),\\qquad w_j \\leftarrow w_j - \\eta\\Big(\\frac{1}{n}\\sum_i (p_i-y_i)x_{ij} + \\lambda w_j\\Big) \\\\]

十二区各自独立跑上述循环，不共享 w（截距必须吸收当地雨日基线，例如海口雨日比 ${pct(hk.rainRate)}，哈尔滨 ${pct(W.regions[0]!.rainRate)}）。

### 4.4 参数量

每区 Bernoulli：31 + 1 = 32。每区 softmax：3×(31+1)=96。每区合计 128。十二区合计 1,536 个自由参数。训练样本 ${W.nTotalSamples}，训练段 12×${ouhai.trainN}=${12 * ouhai.trainN}，约 14 条/参数，属于可识别的小模型。

---

## 第 5 章 数据、标签与样本数量

来源：Open-Meteo Historical Weather API（ERA5 再分析）。引用：${W.source}。

时段 ${W.start}–${W.end}。切分以日历为准，禁止随机打乱，以免未来节气泄漏。

- 有雨：日降水量 ≥ 0.1 mm。
- 旬雨势：连续十日中雨日 ≥ 5。
- 三项：雨（降水≥0.1 mm 或 WMO 码 ≥51）；晴（码 ≤1）；其余为阴。

${regionSummaryTable()}

总样本 ${W.nTotalSamples} = ${W.nRegions} 区 × ${W.nDays} 日。训练 ${W.nRegions}×${ouhai.trainN}=${W.nRegions * ouhai.trainN} 条，检验 ${W.nRegions}×${ouhai.testN}=${W.nRegions * ouhai.testN} 条。

排盘特征全国共用（历法相同），标签按区不同，因此 X 只排一次 2432×31，再对十二组 y 分别回归。

---

## 第 6 章 十二区最终训练结果与完整权重

全国旬准确率均值 ${pct(W.eventCalibration.meanXunAcc)}。广州旬检验 ${pct(gz.metrics.xunAccTest)}、海口旬训练 ${pct(hk.metrics.xunAccTrain)} 达到 90%；其余区如实低于该阈值。最强特征普遍是年积日 cos（气候学），奇门 one-hot 提供区内增量。

关键特征跨区对照（单位：分值 22β）：

${crossRegionKeyTable()}

以下每一小节是该区数学模型的最终数值。主模型

\\\\[ z = b + \\sum_{j=1}^{31} w_j x_j,\\quad S=22z,\\quad P=\\sigma(S/22) \\\\]

的 b 与全部 w_j 均列出。

${allRegionChapters()}

十二区平均 logit（用于第 7 章事项信度，不是预报模型）：

${mdTable(
  ["特征", "平均 logit β̄", "分值 22β̄"],
  W.eventCalibration.pooledLogit.map((f) => [f.name, n4(f.logit), n3(f.score)]),
)}

---

## 第 7 章 事项权重如何被天气改写

事项不能直接用雨的符号：玄武主雨在气象上可为正，人事上玄武仍是盗神。因此只借用 |β| 当「这个符号在可观测的天气残差里有多稳定」，再去缩放刘伯温先验的幅度，符号不翻转。

### 7.1 公式

记经典先验为 w0（见 constants.ts 中 GATE_BASE / GOD_BASE / STAR_BASE，来自《秘笈》开休生吉、死惊伤凶等）。十二区平均系数为

\\\\[ \\bar\\beta_k = \\frac{1}{12}\\sum_{r=1}^{12} w_{r,k} \\\\]

中位数 med = median_k |β̄_k| = ${n4(med)}。信度

\\\\[ r_k = \\mathrm{clip}\\Big(0.75 + 0.5\\frac{|\\bar\\beta_k|}{3\\,\\mathrm{med}},\\ 0.55,\\ 1.35\\Big) \\\\]

全国旬准确率尺度

\\\\[ g = 0.92 + 0.16\\,\\bar a_{旬} = 0.92 + 0.16\\times ${n4(W.eventCalibration.meanXunAcc)} = ${n4(EVENT_CALIBRATION.globalScale)} \\\\]

最终事项权重

\\\\[ w^{新}_k = \\mathrm{round}(w0_k \\cdot r_k \\cdot g) \\\\]

### 7.2 逐步数值（每一个权重）

${eventDeriveTable("八神：从经典到天气校准", "神", EVENT_CALIBRATION.classicGod, EVENT_CALIBRATION.god)}

${eventDeriveTable("八门：从经典到天气校准", "门", EVENT_CALIBRATION.classicGate, EVENT_CALIBRATION.gate)}

${eventDeriveTable("九星：从经典到天气校准", "星", EVENT_CALIBRATION.classicStar, EVENT_CALIBRATION.star)}

### 7.3 六个典型权重的产生过程

${workedExamples()}

### 7.4 最终事项权重（软件实际使用）

软件 score.ts 不再读经典表，而读校准后的 GATE_BASE / GOD_BASE / STAR_BASE：

${mdTable(
  ["类", "名", "最终权重"],
  [
    ...Object.entries(EVENT_CALIBRATION.god).map(([k, v]) => ["八神", k, String(v)]),
    ...Object.entries(EVENT_CALIBRATION.gate).map(([k, v]) => ["八门", k, String(v)]),
    ...Object.entries(EVENT_CALIBRATION.star).map(([k, v]) => ["九星", k, String(v)]),
  ],
)}

事项百分比仍为 P=σ(S/22)，与天气同一变换。例如求财遇生门 ${EVENT_CALIBRATION.gate["生门"]} 分、死门 ${EVENT_CALIBRATION.gate["死门"]} 分，再加星神与格局辅项后过 sigmoid。

---

## 第 8 章 结论

1. 事项与天气已统一为 S 与 P=σ(S/22)，界面都以分值与百分比同时给出。
2. 2020–2026、十二区、${W.nTotalSamples} 条样本上的 L2 逻辑回归权重全部写入本文第 6 章，不再只给瓯海。
3. 事项门星神已按天气 |β| 信度与全国旬准确率尺度更新，逐步计算见第 7 章。
4. 旬 90% 只在部分区达到；全国均值 ${pct(W.eventCalibration.meanXunAcc)}，本文不虚报。
5. 年积日 cos 是最强特征，说明气候学季节项必须显式放入，否则会把夏天的雨算进玄武。

---

## 参考文献

[1] 刘基（伯温）. 奇门遁甲总序；奇门遁甲秘笈大全. 题明洪武四年。

[2] 程道生. 遁甲演义. 明；文渊阁四库全书本.

[3] 烟波钓叟赋（奇门经典赋文，诸本互校）.

[4] 张志春. 神奇之门. 北京：中国文联出版社，2003.

[5] Hersbach, H., Bell, B., Berrisford, P., et al. (2020). The ERA5 global reanalysis. Q. J. R. Meteorol. Soc., 146, 1999–2049.

[6] Zippenfenig, P. (2023). Open-Meteo.com Weather API. Zenodo. https://doi.org/10.5281/zenodo.7970649

[7] Wilks, D. S. (2019). Statistical Methods in the Atmospheric Sciences (4th ed.). Elsevier.

[8] Hastie, T., Tibshirani, R., Friedman, J. (2009). The Elements of Statistical Learning (2nd ed.). Springer.

[9] World Meteorological Organization. WMO codeset 4677.

[10] 中国气象局. 地面气象观测规范.

[11] Bishop, C. M. (2006). Pattern Recognition and Machine Learning. Springer.

[12] Gneiting, T., Raftery, A. E. (2007). Strictly proper scoring rules. JASA, 102, 359–378.

[13] Open-Meteo Documentation. Historical Weather API. https://open-meteo.com/en/docs/historical-weather-api

[14] Copernicus Climate Change Service. ERA5 hourly data on single levels. CDS.

---

## 附录 A 复现

- 原始日值：weather-regions.json（${W.start}–${W.end}，十二区，每区 ${W.nDays} 日）
- 最终模型：weather-weights.json（每区 scoreModel.w/b 与 daily3.w/b，以及 eventCalibration）
- 训练脚本：全批 GD，epochs=${W.ml.epochs}，η=${W.ml.learningRate}，λ=${W.ml.l2}
- 公式：P = 1/(1+exp(-S/22))，S = 22*(b + w·x)
- 机器学习：Bernoulli logistic regression + multinomial softmax
- 事项校准：w_new = round(w_classic × r(|β|) × g(meanXun))，g=${n4(EVENT_CALIBRATION.globalScale)}，meanXun=${n4(W.eventCalibration.meanXunAcc)}

## 附录 B 声明

本文是软件内置研究说明，用于公开训练数据、模型与误差，不构成学位授予，也不构成对具体日期天气或人事的保证。
`;
