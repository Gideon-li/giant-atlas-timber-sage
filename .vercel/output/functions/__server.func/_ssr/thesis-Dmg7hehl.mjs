import { _ as Link, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as WEATHER_META } from "./weather-model-J6X1ULVT.mjs";
import { t as Button } from "./button-Yi4zxPuq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/thesis-Dmg7hehl.js
var import_jsx_runtime = require_jsx_runtime();
var PAPER_TITLE = "基于拆补法转盘奇门的时空权重模型及其在瓯海区天气旬候预测中的校准研究";
var PAPER_MD = `# ${PAPER_TITLE}

博士学位论文（学习用研究报告，非正式学位授予文本）

学科：应用统计学 / 中国术数文献的可计算建模

研究地点：浙江省温州市瓯海区

数据时段：2025-01-01 至 2026-08-28

---

## 摘要

本文将时家奇门遁甲拆补法转盘排盘，改写为可计算的决策树—权重模型，使天干、地支、十二长生、八门、八神、九星、刑冲克害合与值符飞宫均映射为实数贡献，从而对十二类人事事项给出有符号的顺利倾向。为避免权重停留在经验赋值，本文引入两类校准数据：（一）用户在预测事后提交的结构化反馈问卷；（二）瓯海区 2025–2026 年逐日地面气象再分析。气象部分不以“单日小时级预报击败数值天气模式”自居，而依古法“以旬候论阴晴”设立主任务：对十日滑动窗口的雨势大类进行监督学习，并以 2025 年样本训练、2026 年样本作时间外推检验。模型为带 L2 正则的多项逻辑回归（softmax），特征同时包含节气—阴阳遁等古法时令变量与八神八门九星的宫位编码。研究明确报告日值三分类（晴/阴/雨）与旬阴晴两项指标；后者更贴近古典测天尺度。全部训练数据、权重与混淆矩阵随文导出，供复核。

关键词：奇门遁甲；拆补法；转盘；权重校准；旬候；Open-Meteo；ERA5；逻辑回归

Abstract. This study recasts Chao-bu rotating Qimen Dunjia as a weighted decision model over stems, branches, the twelve qi-phases, the eight gates, eight gods, nine stars, and branch interactions. Two calibration streams are introduced: structured post-hoc user feedback, and daily reanalysis weather for Ouhai, Wenzhou, 2025–2026. The primary meteorological target follows the classical dekadal (xun) horizon rather than hourly NWP skill. A softmax classifier with L2 penalty is trained on 2025 and tested on 2026. Data, weights, and metrics are released with the paper.

---

## 第 1 章 绪论

### 1.1 问题

奇门遁甲长期以口诀与盘面经验传习。当代应用若止于“吉凶二字”，则无法与观测对照，也无法把失误反馈回盘。本文要回答三个可检验的问题：

1. 能否把拆补法转盘盘面写成有限维特征向量，使事项吉凶成为可加权重之和？
2. 用户事后反馈（准度、实况吉凶、应验与否）能否作为监督信号，供管理员导出并迭代权重？
3. 在单一地点（瓯海）上，把古法测天要素与节气编码送入线性分类器，旬阴晴大势能否稳定高于朴素气候学基线，并接近 90% 的旬尺度阈值？

### 1.2 范围与不作之保证

- 人事事项权重是辅助决策，不是因果推断，更不是命运决定论。
- 天气模型只在瓯海区再分析序列上训练。迁到其他区县时，只保留古法规则，不宣称当地精度。
- 日值晴阴雨三分类受梅雨、台风与沿海对流的高频变率制约，不作为 90% 承诺的对象。90% 针对旬候阴晴大势（十日雨日是否过半）。
- 本研究不是气象业务预报系统，不替代 ECMWF / CMA 数值预报。

### 1.3 技术路线

排盘（tyme4ts 节气与四柱 → 阴阳遁与局数 → 地盘三奇六仪 → 值符值使 → 天盘旋转）→ 特征抽取 → 事项加权求和；天气则另接 softmax。反馈入库（Postgres / PGLite），管理员下载 CSV。论文、权重 JSON 与原始日值一并导出。

---

## 第 2 章 文献与古法依据

### 2.1 术数文献

奇门文献的核心结构是：以节气定阴阳遁，以元（上中下）定局数，以时干定值符值使，以门应人事、以神应天时。本文人事模块采用：

- 神应开始、星应过程、门应收局（时家通行读法）。
- 开门宜开张、远行、见贵；生门宜求财、生产；休门宜治病、休息；景门宜文书科甲；杜门宜避藏；伤门宜捕捉索债；惊门宜词讼；死门宜丧葬、行刑。归纳自《烟波钓叟赋》门旨及后世《奇门法窍》类注释，而非晚清坊本的无限推衍。
- 测天：玄武主雨，腾蛇主雷电，白虎主风，九天主晴霁，九地主雾露卑湿；休门、天芮助阴雨，景门、天英助晴热。这是把八神、八门、九星读作天气示象，而不是把奇门当成大气动力学。

主要文本传统包括《遁甲演义》（程道生）、《烟波钓叟赋》、以及当代整理如张志春《神奇之门》。术数文本真伪混杂，本文只取其可操作的结构，不把晚出秘本当作观测事实。

### 2.2 气象与统计

瓯海地处浙南沿海，属中亚热带季风气候，梅汛（6 月）与台汛（7–9 月）降水集中，冬季相对少雨。这种年循环使“节气 / 阴阳遁”这类时令变量对旬雨势具有很强的气候学信息。Hersbach 等（2020）给出的 ERA5 再分析，以及 Open-Meteo 对再分析与站点的拼接，使单点逐日序列可以公开获取。Wilks《Statistical Methods in the Atmospheric Sciences》把逻辑回归作为天气事件概率预报的标准工具；本文采用其最简形式，以便权重可解释、可导出。

### 2.3 相关工作

把术数符号化并与数据对照的研究，在学术期刊中很少以“奇门测雨 90%”为题出现，这本身是一个警示：若有人只报告训练集准确率、不报告时间外推，则结果不可信。本文强制 2025 训练 / 2026 检验的切分，并同时报告日值与旬值。

---

## 第 3 章 排盘与事项权重

### 3.1 拆补法定局

节气序列以冬至为阳遁之始、夏至为阴遁之始。每个节气十五日，按上元（0–4 日）、中元（5–9 日）、下元（10 日以后）取局。局数表见程序 \`JU_BY_TERM\`。求签模式则按公历月份近似阴阳遁（12–5 月阳遁，6–11 月阴遁），局数由使用者抽 1–9，时辰仍定时干与值符。

### 3.2 转盘

地盘自局数宫顺（阳）或逆（阴）布三奇六仪。值符原在旬仪宫，飞往时干所在宫；天盘、九星、八门、八神按同一跨度旋转。中五宫寄坤（阳）或艮（阴）。空亡取时辰旬空。

### 3.3 事项决策树

对十二类事项（求财、事业、求职、婚姻、考试、健康、出行、诉讼、合伙、置业、谈判、寻物）指定用神宫。得分

\\\\[ S = w_{神} + w_{星} + w_{门} + w_{干支刑冲} + w_{长生} + w_{格局} + w_{空亡墓迫} \\\\]

再经平滑函数映射到 0–100 的顺利倾向。神、星、门分别对应开始、过程、收局。刑冲克害合只作辅助项，避免四柱盖过用神。

### 3.4 方位用事

八宫按所临门给出宜忌。死门用于丧葬、捕猎、行刑一类古典职事，不是鼓励伤害；开张、嫁娶等从开门、生门、休门。空亡、门迫、入墓、白虎玄武降低该方分数。

---

## 第 4 章 数据

### 4.1 气象数据

来源：Open-Meteo Historical Weather API（\`archive-api.open-meteo.com/v1/archive\`）。

地点：北纬 28.014°，东经 120.677°，高程约 5 m，时区 Asia/Shanghai，对应瓯海区。

时段：2025-01-01 至 2026-08-28，共 605 个日历日，无缺测。

变量：WMO 天气代码、日最高/最低/平均气温、日降水量、日降雨量、10 m 最大风速、平均云量、平均相对湿度。

引用：Zippenfenig, P. (2023). Open-Meteo.com Weather API. Zenodo. https://doi.org/10.5281/zenodo.7970649 ；底层再分析参见 Hersbach et al., 2020, Q. J. R. Meteorol. Soc.

### 4.2 标签定义

- 日值三类：降水量 ≥ 0.1 mm 或 WMO 代码 ≥ 51 → 雨；代码 0 或 1 → 晴；其余 → 阴。
- 日值有雨：降水量 ≥ 0.1 mm。
- 旬阴晴：连续十日中雨日 ≥ 5 记为旬雨势，否则旬晴势。此定义对应古法“一旬阴晴”，而不是 10 天滚动预报竞赛。

样本中雨日约占 63.8%。7–9 月雨日比率超过 90%，12–1 月显著偏低。因此任何只用月份的模型在夏季都会偏向“有雨”。奇门特征必须在控制节气之后仍能提供增量，才算有术数信息。

### 4.3 反馈数据

字段：用户标识、起盘时间、局名、事项、预测分与等级、准度五档、实况吉凶、应验四档、省市区、备注、盘面摘要。仅登录用户可写，管理员可读全表并下载 CSV。第一份注册账号自动成为管理员，可修改密码。

### 4.4 伦理

反馈含自由文本，只在登录会话下写入，按 user_id 隔离普通查询。管理员导出应用于调权，不应把个人备注公开发表。气象再分析不含个人身份。

---

## 第 5 章 天气模型

### 5.1 特征

25 维，全部落在 [0,1] 或标准三角：阳遁指示、局数、节气内序、月份、年积日正弦余弦、值符宫、玄武/腾蛇/白虎/九天/九地所在宫、休门/景门/死门/开门/生门所在宫、天芮/天蓬/天英所在宫、坎宫空亡、伏吟、反吟、古法雨势、古法晴势。古法雨势由玄武、九地、休门、死门、天芮、阴遁线性相加，晴势由九天、景门、开门、天英、阳遁相加，再压缩到单位区间。这样 softmax 可以学习“相信古法还是相信节气”。

### 5.2 分类器

多项逻辑回归。对类 c、特征 x：

\\\\[ P(y=c\\mid x) = \\mathrm{softmax}(W x + b)_c \\\\]

目标为平均交叉熵加 L2（系数 0.002）。全批梯度下降，学习率 0.35，默认 280 轮。无隐藏层，是为了让管理员导出的权重矩阵可以直接阅读：某一神临某宫，对“雨”类的贡献是多少。

### 5.3 切分

以 2026-01-01 为界。2025 全年为训练，2026-01-01 至 2026-08-28 为检验。这是时间外推，不是随机打乱。随机打乱会把同一梅雨过程的相邻日分进两侧，虚高准确率。

### 5.4 基线

- 恒预测雨：日值准确率约 63.8%。
- 月份阈值（4–9 月报雨）：反映气候学。
- 古法符号规则（雨势>晴势则报雨）：可解释基线。
- 完整 softmax：节气 + 奇门宫位。

### 5.5 为何旬尺度才谈 90%

沿海单日对流使晴阴雨标签噪声很大。古法测天的传统单位是候（五日）与旬（十日）。把 90% 放在旬阴晴上，既对得起文献，也不与现代 NWP 抢“明天 14 时是否下雨”的任务。若旬检验仍低于 90%，论文如实记录，不倒推改标签。管理员后台的“重新训练”会写出新一轮指标，形成可审计的训练日志。

---

## 第 6 章 实验与结果

实验在应用内即时训练。管理员后台展示：

- 日值三分类：训练准确率、检验准确率、3×3 混淆矩阵；
- 日值有雨无雨；
- 旬阴晴训练 / 检验。

预期结构（随每次训练刷新，以后台数字为准）：

1. 日值三分类检验显著低于旬任务，因为晴类样本稀少（约 7–8%），模型倾向把晴并入阴或雨。
2. 日值有雨无雨检验高于三分类，接近气候学季节模型。
3. 旬阴晴因标签平滑，训练或检验中至少一端可以接近或超过 90%。若两端都超过，则声明“在瓯海 2025–2026 旬尺度上达到预设阈值”；否则只报告实数。

混淆矩阵导出见权重 JSON 中的 metrics 字段。原始 605 日标签随 \`ouhai-weather.json\` 发布。

---

## 第 7 章 讨论

### 7.1 节气泄漏

阴阳遁与月份高度共线。模型可能主要在学“夏雨冬干”。这不是作弊：古法本来就把夏至后定为阴遁，阴主水。要证明八神有额外技巧，需要在同一节气内部比较玄武临坎与临离的差异。605 日对 24 个节气而言偏短，本文不作过度因果声明。

### 7.2 再分析不是雨量筒

ERA5 与站点雨量在复杂地形上有偏差。瓯海平原与西部山地降水不同。单格点代表全区，会平滑局地阵雨。这会让日值更“阴”，旬值相对稳健。

### 7.3 反馈闭环

事项权重目前仍是专家初值。反馈 CSV 提供准度与实况吉凶后，可用有序 logit 或简单的按事项平均残差去加减门星神的偏置。样本不足时不要更新，以免把个例写成法则。

### 7.4 可重复性

排盘库、特征名、超参数、数据 DOI 全部固定。任何人用同一 JSON 与同一 \`trainWeatherModel()\` 应得到同一权重（浮点误差除外）。

---

## 第 8 章 结论

1. 拆补法转盘可以完全程序化，事项吉凶可以写成有符号权重之和，并配神—星—门三段。
2. 登录反馈与管理员导出，构成可审计的人工校准通道。
3. 瓯海 2025–2026 再分析上的 softmax，把古法测天变量与节气变量一齐纳入；主任务是旬阴晴大势。日值预报不与数值模式争 90%。
4. 模型、数据、训练日志与本文一并导出。

后续工作：把反馈残差写回事项权重；在温州其他区县做空间外推；用候（五日）作为第二平滑尺度；与 CMA 站点实况而不仅是再分析对照。

---

## 参考文献

[1] 程道生. 遁甲演义. 明；文渊阁四库全书本.

[2] 烟波钓叟赋（奇门经典赋文，诸本互校）.

[3] 张志春. 神奇之门. 北京：中国文联出版社，2003.

[4] Hersbach, H., Bell, B., Berrisford, P., et al. (2020). The ERA5 global reanalysis. Quarterly Journal of the Royal Meteorological Society, 146, 1999–2049. https://doi.org/10.1002/qj.3803

[5] Zippenfenig, P. (2023). Open-Meteo.com Weather API. Zenodo. https://doi.org/10.5281/zenodo.7970649

[6] Wilks, D. S. (2019). Statistical Methods in the Atmospheric Sciences (4th ed.). Elsevier.

[7] Hastie, T., Tibshirani, R., Friedman, J. (2009). The Elements of Statistical Learning (2nd ed.). Springer.

[8] World Meteorological Organization. WMO codeset 4677: Present weather. WMO.

[9] 中国气象局. 地面气象观测规范. 北京：气象出版社.

[10] 温州市气象局 / 浙江省气候中心. 温州气候相关公报与年鉴（2025–2026 年降水年循环参照）.

[11] Bishop, C. M. (2006). Pattern Recognition and Machine Learning. Springer. （softmax 与正则化）

[12] Gneiting, T., Raftery, A. E. (2007). Strictly proper scoring rules, prediction, and estimation. Journal of the American Statistical Association, 102, 359–378.

[13] 任铁樵 注, 刘伯温 撰. 滴天髓辑要. （干支五行生克的术数语境，仅作旁证，不入天气模型）

[14] Open-Meteo Documentation. Historical Weather API. https://open-meteo.com/en/docs/historical-weather-api

[15] Copernicus Climate Change Service. ERA5 hourly data on single levels. CDS.

---

## 附录 A 数据字典

日值 JSON 字段：d 日期，w WMO 代码，tmax/tmin/t 气温，p 降水，r 降雨，wind 风速，cloud 云量，rh 湿度。

特征顺序见程序 \`FEATURE_NAMES\`。

反馈表见 \`migrations/0002_app.sql\`。

## 附录 B 复现命令

在管理后台点击“重新训练”。或在应用内打开天气页，客户端会惰性训练并缓存。导出文件：

- qimen-weather-weights.json
- qimen-feedback-YYYY-MM-DD.csv
- 本文 Markdown

## 附录 C 声明

本文是软件内置的研究说明，用于公开训练数据、模型与误差，不构成学位授予，也不构成对具体日期天气或人事的保证。
`;
function ThesisPage() {
	const downloadMd = () => {
		const blob = new Blob([PAPER_MD], { type: "text/markdown;charset=utf-8" });
		const a = document.createElement("a");
		a.href = URL.createObjectURL(blob);
		a.download = "qimen-ouhai-weather-thesis.md";
		a.click();
	};
	const downloadData = () => {
		const blob = new Blob([JSON.stringify(WEATHER_META, null, 2)], { type: "application/json" });
		const a = document.createElement("a");
		a.href = URL.createObjectURL(blob);
		a.download = "ouhai-weather-2025-2026.json";
		a.click();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-xs text-muted hover:text-fg",
					children: "返回起盘"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						size: "sm",
						onClick: downloadData,
						children: "下载训练数据"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						onClick: downloadMd,
						children: "下载论文"
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "mx-auto max-w-3xl px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-subtle",
					children: "博士学位论文体例 · 学习研究文本"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-2xl leading-snug text-fg",
					children: PAPER_TITLE
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-muted",
					children: [
						WEATHER_META.place,
						" · ",
						WEATHER_META.start,
						" – ",
						WEATHER_META.end,
						" · ",
						WEATHER_META.n,
						" 日 ·",
						" ",
						WEATHER_META.citation
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
function renderMd(src) {
	const lines = src.split("\n");
	const nodes = [];
	let buf = [];
	let list = [];
	let key = 0;
	const flushP = () => {
		if (!buf.length) return;
		const t = buf.join(" ").trim();
		buf = [];
		if (t) nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t }, key++));
	};
	const flushL = () => {
		if (!list.length) return;
		nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "my-3 list-disc space-y-1 pl-5 text-muted",
			children: list.map((li, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: li }, i))
		}, key++));
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
	flushL();
	flushP();
	return nodes;
}
//#endregion
export { ThesisPage as component };
