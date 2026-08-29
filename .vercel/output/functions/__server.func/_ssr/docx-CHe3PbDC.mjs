import { E as STEM_CHONG, H as weather_weights_default, O as STEM_HE, T as STEM_BASE, a as CHANGSHENG_SCORE, s as EVENTS, u as GATE_ELEMENT, w as STAR_ELEMENT } from "./weather-model-DSA3cxeb.mjs";
import { J as scoreAllEvents, K as probabilityOf, R as luckLevel, T as buildChart, X as scoreEvent, a as GATE_USES, d as STAR_BASE, n as EVENT_CALIBRATION, o as GOD_BASE, p as STEM_GE, r as GATE_BASE, t as ACTIVITY_META } from "./score-CH7wR16K.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/docx-CHe3PbDC.js
var district_summary_default = {
	method: "全国每个区县行政中心经纬度，对 NOAA CPC Unified Gauge 0.5° 日降水做双线性插值，再对该区县自己的 2020–2026 序列独立做 L2 逻辑回归（有雨）与 softmax（晴/阴/雨）。原生分辨率 0.5°，相邻区县序列相关，但每区单独拟合，不共享 w、b。",
	ml: {
		"primary": "Bernoulli logistic regression with L2",
		"auxiliary": "Multinomial logistic regression (softmax, 3-class)",
		"optimizer": "full-batch gradient descent (all districts in one matrix)",
		"epochs": 120,
		"learningRate": .35,
		"l2": .002,
		"scoreScale": 22,
		"grid": "NOAA CPC Unified Gauge 0.5 degree, bilinear to district centroid",
		"probability": "P = 1 / (1 + exp(-S / 22))"
	},
	source: "Xie, P., Chen, M., et al. CPC Unified Gauge-Based Analysis of Global Daily Precipitation. NOAA PSL. Centroids: Aliyun DataV areas_v3.",
	start: "2020-01-01",
	end: "2026-08-27",
	trainUntil: "2024-12-31",
	testFrom: "2025-01-01",
	nDays: 2431,
	nTrainDays: 1827,
	nTestDays: 604,
	nDistricts: 3143,
	nCities: 332,
	nProvinces: 34,
	nCells: 3509,
	nTotalSamples: 7640633,
	featureNames: [
		"神_值符",
		"神_腾蛇",
		"神_太阴",
		"神_六合",
		"神_白虎",
		"神_玄武",
		"神_九地",
		"神_九天",
		"门_休门",
		"门_生门",
		"门_伤门",
		"门_杜门",
		"门_景门",
		"门_死门",
		"门_惊门",
		"门_开门",
		"星_天蓬",
		"星_天芮",
		"星_天冲",
		"星_天辅",
		"星_天禽",
		"星_天心",
		"星_天柱",
		"星_天任",
		"星_天英",
		"阴遁",
		"伏吟",
		"反吟",
		"坎空",
		"年积日sin",
		"年积日cos"
	],
	meanXunAcc: .801,
	meanRainAccTest: .6795,
	globalScale: 1.0482,
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
	provinceMetrics: [
		{
			"province": "上海市",
			"n": 16,
			"rainAccTest": .5888,
			"xunAccTest": .6656,
			"rainRate": .4975
		},
		{
			"province": "云南省",
			"n": 129,
			"rainAccTest": .7542,
			"xunAccTest": .8457,
			"rainRate": .541
		},
		{
			"province": "内蒙古自治区",
			"n": 109,
			"rainAccTest": .7261,
			"xunAccTest": .8235,
			"rainRate": .3263
		},
		{
			"province": "北京市",
			"n": 16,
			"rainAccTest": .7375,
			"xunAccTest": .8042,
			"rainRate": .3421
		},
		{
			"province": "台湾省",
			"n": 48,
			"rainAccTest": .6854,
			"xunAccTest": .8667,
			"rainRate": .601
		},
		{
			"province": "吉林省",
			"n": 69,
			"rainAccTest": .6764,
			"xunAccTest": .7886,
			"rainRate": .4501
		},
		{
			"province": "四川省",
			"n": 186,
			"rainAccTest": .6993,
			"xunAccTest": .8223,
			"rainRate": .6343
		},
		{
			"province": "天津市",
			"n": 16,
			"rainAccTest": .7354,
			"xunAccTest": .8469,
			"rainRate": .3233
		},
		{
			"province": "宁夏回族自治区",
			"n": 22,
			"rainAccTest": .7313,
			"xunAccTest": .7712,
			"rainRate": .2869
		},
		{
			"province": "安徽省",
			"n": 120,
			"rainAccTest": .6047,
			"xunAccTest": .7179,
			"rainRate": .4784
		},
		{
			"province": "山东省",
			"n": 156,
			"rainAccTest": .6557,
			"xunAccTest": .7712,
			"rainRate": .3558
		},
		{
			"province": "山西省",
			"n": 122,
			"rainAccTest": .6964,
			"xunAccTest": .7971,
			"rainRate": .3577
		},
		{
			"province": "广东省",
			"n": 181,
			"rainAccTest": .7258,
			"xunAccTest": .8092,
			"rainRate": .5488
		},
		{
			"province": "广西壮族自治区",
			"n": 111,
			"rainAccTest": .684,
			"xunAccTest": .7986,
			"rainRate": .6117
		},
		{
			"province": "新疆维吾尔自治区",
			"n": 102,
			"rainAccTest": .7777,
			"xunAccTest": .86,
			"rainRate": .2478
		},
		{
			"province": "江苏省",
			"n": 107,
			"rainAccTest": .616,
			"xunAccTest": .7285,
			"rainRate": .4472
		},
		{
			"province": "江西省",
			"n": 100,
			"rainAccTest": .6381,
			"xunAccTest": .781,
			"rainRate": .5753
		},
		{
			"province": "河北省",
			"n": 191,
			"rainAccTest": .7168,
			"xunAccTest": .8059,
			"rainRate": .3354
		},
		{
			"province": "河南省",
			"n": 182,
			"rainAccTest": .6336,
			"xunAccTest": .7299,
			"rainRate": .3715
		},
		{
			"province": "浙江省",
			"n": 91,
			"rainAccTest": .6155,
			"xunAccTest": .7348,
			"rainRate": .5746
		},
		{
			"province": "海南省",
			"n": 44,
			"rainAccTest": .6954,
			"xunAccTest": .7826,
			"rainRate": .5577
		},
		{
			"province": "湖北省",
			"n": 105,
			"rainAccTest": .5838,
			"xunAccTest": .6802,
			"rainRate": .5012
		},
		{
			"province": "湖南省",
			"n": 138,
			"rainAccTest": .6298,
			"xunAccTest": .7825,
			"rainRate": .6091
		},
		{
			"province": "澳门特别行政区",
			"n": 8,
			"rainAccTest": .7276,
			"xunAccTest": .85,
			"rainRate": .5228
		},
		{
			"province": "甘肃省",
			"n": 88,
			"rainAccTest": .6871,
			"xunAccTest": .7977,
			"rainRate": .4291
		},
		{
			"province": "福建省",
			"n": 85,
			"rainAccTest": .6655,
			"xunAccTest": .8147,
			"rainRate": .5713
		},
		{
			"province": "西藏自治区",
			"n": 78,
			"rainAccTest": .7692,
			"xunAccTest": .8526,
			"rainRate": .468
		},
		{
			"province": "贵州省",
			"n": 88,
			"rainAccTest": .6889,
			"xunAccTest": .8527,
			"rainRate": .6652
		},
		{
			"province": "辽宁省",
			"n": 100,
			"rainAccTest": .6825,
			"xunAccTest": .7688,
			"rainRate": .3824
		},
		{
			"province": "重庆市",
			"n": 38,
			"rainAccTest": .6383,
			"xunAccTest": .7899,
			"rainRate": .6167
		},
		{
			"province": "陕西省",
			"n": 107,
			"rainAccTest": .6668,
			"xunAccTest": .776,
			"rainRate": .4337
		},
		{
			"province": "青海省",
			"n": 45,
			"rainAccTest": .7069,
			"xunAccTest": .8019,
			"rainRate": .471
		},
		{
			"province": "香港特别行政区",
			"n": 18,
			"rainAccTest": .7342,
			"xunAccTest": .8787,
			"rainRate": .5089
		},
		{
			"province": "黑龙江省",
			"n": 127,
			"rainAccTest": .6685,
			"xunAccTest": .8101,
			"rainRate": .4553
		}
	],
	samples: [
		{
			"code": "330304",
			"name": "瓯海区",
			"province": "浙江省",
			"city": "温州市",
			"lat": 28.00644,
			"lng": 120.63715,
			"rainDays": 1466,
			"rainRate": .603,
			"metrics": {
				"rainAccTrain": .6294,
				"rainAccTest": .6126,
				"dailyAccTrain": .434,
				"dailyAccTest": .4189,
				"xunAccTrain": .7033,
				"xunAccTest": .7667,
				"interceptScore": 7.6729
			},
			"scoreModel": {
				"w": [
					.16097,
					.07402,
					.04941,
					-.10277,
					.08503,
					-.04337,
					.14272,
					-.04179,
					-.00542,
					-.02495,
					-.05187,
					-.00383,
					-.00937,
					.25617,
					.04444,
					.11906,
					-.00542,
					.25617,
					-.05187,
					-.00383,
					0,
					.11906,
					.04444,
					-.02495,
					-.00937,
					-.00443,
					-.00542,
					-.00937,
					.08421,
					.27684,
					-.41098
				],
				"b": .34877,
				"scale": 22
			},
			"daily3": {
				"w": [
					[
						-.07024,
						-.01517,
						-.00178,
						.11519,
						-.01581,
						.06552,
						-.0582,
						.06149,
						.03471,
						.04985,
						.07707,
						.04598,
						.04228,
						-.13112,
						.00917,
						-.04693,
						.03471,
						-.13112,
						.07707,
						.04598,
						0,
						-.04693,
						.00917,
						.04985,
						.04228,
						.08472,
						.03471,
						.04228,
						-.02669,
						-.14393,
						.31935
					],
					[
						.01054,
						-.00126,
						-.03243,
						-.00744,
						.05572,
						.00879,
						.07134,
						-.05144,
						-.00337,
						.00705,
						-.03457,
						.01174,
						.03653,
						.04098,
						-.01612,
						.01159,
						-.00337,
						.04098,
						-.03457,
						.01174,
						0,
						.01159,
						-.01612,
						.00705,
						.03653,
						.07743,
						-.00337,
						.03653,
						.0195,
						.07345,
						.11848
					],
					[
						.0597,
						.01643,
						.03421,
						-.10775,
						-.03991,
						-.07432,
						-.01314,
						-.01006,
						-.03134,
						-.05689,
						-.04249,
						-.05772,
						-.07882,
						.09014,
						.00695,
						.03534,
						-.03134,
						.09014,
						-.04249,
						-.05772,
						0,
						.03534,
						.00695,
						-.05689,
						-.07882,
						-.16214,
						-.03134,
						-.07882,
						.00719,
						.07048,
						-.43783
					]
				],
				"b": [
					.08528,
					.05679,
					-.14207
				],
				"classes": [
					"晴",
					"阴",
					"雨"
				]
			}
		},
		{
			"code": "110108",
			"name": "海淀区",
			"province": "北京市",
			"city": "市辖区",
			"lat": 39.95607,
			"lng": 116.31032,
			"rainDays": 830,
			"rainRate": .3414,
			"metrics": {
				"rainAccTrain": .7384,
				"rainAccTest": .7384,
				"dailyAccTrain": .682,
				"dailyAccTest": .6341,
				"xunAccTrain": .8407,
				"xunAccTest": .8,
				"interceptScore": -14.9435
			},
			"scoreModel": {
				"w": [
					-.11435,
					.02349,
					.08117,
					-.20994,
					-.07848,
					-.26676,
					-.04554,
					-.02466,
					-.10809,
					-.08465,
					-.03677,
					-.13965,
					-.08586,
					-.03513,
					.02376,
					-.16869,
					-.10809,
					-.03513,
					-.03677,
					-.13965,
					0,
					-.16869,
					.02376,
					-.08465,
					-.08586,
					.19541,
					-.10809,
					-.08586,
					-.01191,
					-.26261,
					-1.32959
				],
				"b": -.67925,
				"scale": 22
			},
			"daily3": {
				"w": [
					[
						.12205,
						.01626,
						-.00862,
						.19091,
						.09979,
						.2116,
						.07084,
						.06153,
						.10643,
						.09229,
						.07042,
						.13095,
						.09286,
						.08027,
						.04209,
						.14903,
						.10643,
						.08027,
						.07042,
						.13095,
						0,
						.14903,
						.04209,
						.09229,
						.09286,
						-.05704,
						.10643,
						.09286,
						.06039,
						.26737,
						.92811
					],
					[
						-.01031,
						-.02305,
						.10431,
						-.04292,
						.05155,
						-.15988,
						-.02385,
						.04486,
						-.02489,
						-.02356,
						.01213,
						-.08279,
						-.00712,
						.05187,
						.09312,
						-.07805,
						-.02489,
						.05187,
						.01213,
						-.08279,
						0,
						-.07805,
						.09312,
						-.02356,
						-.00712,
						-.03062,
						-.02489,
						-.00712,
						.12253,
						.03717,
						-.29181
					],
					[
						-.11174,
						.00679,
						-.09569,
						-.14799,
						-.15134,
						-.05172,
						-.04699,
						-.10639,
						-.08154,
						-.06873,
						-.08256,
						-.04816,
						-.08574,
						-.13214,
						-.13521,
						-.07099,
						-.08154,
						-.13214,
						-.08256,
						-.04816,
						0,
						-.07099,
						-.13521,
						-.06873,
						-.08574,
						.08766,
						-.08154,
						-.08574,
						-.18292,
						-.30453,
						-.63631
					]
				],
				"b": [
					.80021,
					-.0644,
					-.73581
				],
				"classes": [
					"晴",
					"阴",
					"雨"
				]
			}
		},
		{
			"code": "440106",
			"name": "天河区",
			"province": "广东省",
			"city": "广州市",
			"lat": 23.13559,
			"lng": 113.33537,
			"rainDays": 1323,
			"rainRate": .5442,
			"metrics": {
				"rainAccTrain": .6995,
				"rainAccTest": .755,
				"dailyAccTrain": .555,
				"dailyAccTest": .5679,
				"xunAccTrain": .7912,
				"xunAccTest": .8167,
				"interceptScore": 3.2145
			},
			"scoreModel": {
				"w": [
					-.03028,
					-.02276,
					.11438,
					-.00356,
					.08085,
					-.15036,
					.09134,
					.05827,
					.01748,
					-.02471,
					-.0586,
					.03031,
					.01998,
					.06011,
					.01932,
					.07398,
					.01748,
					.06011,
					-.0586,
					.03031,
					0,
					.07398,
					.01932,
					-.02471,
					.01998,
					-.09286,
					.01748,
					.01998,
					-.03164,
					-.02537,
					-1.26097
				],
				"b": .14612,
				"scale": 22
			},
			"daily3": {
				"w": [
					[
						.05848,
						.04901,
						-.03865,
						.05018,
						-.0156,
						.13418,
						-.02661,
						-.00447,
						.02499,
						.04651,
						.08089,
						.0208,
						.01647,
						.00611,
						.02678,
						-.01602,
						.02499,
						.00611,
						.08089,
						.0208,
						0,
						-.01602,
						.02678,
						.04651,
						.01647,
						.15042,
						.02499,
						.01647,
						.04981,
						.05876,
						.88449
					],
					[
						-.06993,
						-.06565,
						.10599,
						.08954,
						.0175,
						-.10853,
						-.03699,
						.00969,
						.03769,
						-.04543,
						-.07825,
						-.01233,
						.00681,
						.02826,
						-.0049,
						.00976,
						.03769,
						.02826,
						-.07825,
						-.01233,
						0,
						.00976,
						-.0049,
						-.04543,
						.00681,
						.06853,
						.03769,
						.00681,
						-.06296,
						-.07923,
						-.09364
					],
					[
						.01145,
						.01664,
						-.06733,
						-.13971,
						-.0019,
						-.02565,
						.06359,
						-.00521,
						-.06268,
						-.00108,
						-.00264,
						-.00847,
						-.02328,
						-.03437,
						-.02188,
						.00626,
						-.06268,
						-.03437,
						-.00264,
						-.00847,
						0,
						.00626,
						-.02188,
						-.00108,
						-.02328,
						-.21894,
						-.06268,
						-.02328,
						.01315,
						.02048,
						-.79085
					]
				],
				"b": [
					.21799,
					-.06212,
					-.15588
				],
				"classes": [
					"晴",
					"阴",
					"雨"
				]
			}
		},
		{
			"code": "310115",
			"name": "浦东新区",
			"province": "上海市",
			"city": "市辖区",
			"lat": 31.24594,
			"lng": 121.56771,
			"rainDays": 1170,
			"rainRate": .4813,
			"metrics": {
				"rainAccTrain": .5807,
				"rainAccTest": .5712,
				"dailyAccTrain": .514,
				"dailyAccTest": .5464,
				"xunAccTrain": .6648,
				"xunAccTest": .6167,
				"interceptScore": -.4413
			},
			"scoreModel": {
				"w": [
					-.05164,
					.04576,
					.03328,
					-.11992,
					.07248,
					-.06355,
					.08329,
					-.01895,
					-.05399,
					-.02059,
					-.01455,
					-.07706,
					-.02443,
					.07546,
					.04074,
					.05518,
					-.05399,
					.07546,
					-.01455,
					-.07706,
					0,
					.05518,
					.04074,
					-.02059,
					-.02443,
					.0571,
					-.05399,
					-.02443,
					.05937,
					.1852,
					-.53962
				],
				"b": -.02006,
				"scale": 22
			},
			"daily3": {
				"w": [
					[
						.07889,
						.00858,
						.0106,
						.12266,
						-.01108,
						.07679,
						-.01675,
						.05001,
						.06241,
						.04636,
						.05226,
						.09254,
						.04782,
						-.00167,
						.0223,
						-.00234,
						.06241,
						-.00167,
						.05226,
						.09254,
						0,
						-.00234,
						.0223,
						.04636,
						.04782,
						.03673,
						.06241,
						.04782,
						-.00881,
						-.06639,
						.39953
					],
					[
						.01502,
						.0694,
						-.02207,
						-.03897,
						-.008,
						-.04127,
						.03954,
						.00628,
						-.05562,
						-34e-5,
						-.00524,
						-.03893,
						.00264,
						.04836,
						.06238,
						.00668,
						-.05562,
						.04836,
						-.00524,
						-.03893,
						0,
						.00668,
						.06238,
						-34e-5,
						.00264,
						-.00996,
						-.05562,
						.00264,
						.01878,
						.10052,
						.00154
					],
					[
						-.0939,
						-.07798,
						.01147,
						-.08368,
						.01908,
						-.03552,
						-.02279,
						-.05629,
						-.00678,
						-.04603,
						-.04702,
						-.05361,
						-.05047,
						-.04669,
						-.08468,
						-.00434,
						-.00678,
						-.04669,
						-.04702,
						-.05361,
						0,
						-.00434,
						-.08468,
						-.04603,
						-.05047,
						-.02677,
						-.00678,
						-.05047,
						-.00997,
						-.03413,
						-.40107
					]
				],
				"b": [
					.33552,
					.02027,
					-.35579
				],
				"classes": [
					"晴",
					"阴",
					"雨"
				]
			}
		},
		{
			"code": "510104",
			"name": "锦江区",
			"province": "四川省",
			"city": "成都市",
			"lat": 30.65769,
			"lng": 104.08099,
			"rainDays": 1703,
			"rainRate": .7005,
			"metrics": {
				"rainAccTrain": .717,
				"rainAccTest": .7119,
				"dailyAccTrain": .5638,
				"dailyAccTest": .5646,
				"xunAccTrain": .8352,
				"xunAccTest": .85,
				"interceptScore": 12.2571
			},
			"scoreModel": {
				"w": [
					-.05485,
					.06805,
					.06832,
					.21879,
					.10221,
					.18524,
					-.0154,
					-.05506,
					.05606,
					.01816,
					.04235,
					.03374,
					.07898,
					.08429,
					.19058,
					.01314,
					.05606,
					.08429,
					.04235,
					.03374,
					0,
					.01314,
					.19058,
					.01816,
					.07898,
					.25787,
					.05606,
					.07898,
					.13963,
					.03141,
					-.88388
				],
				"b": .55714,
				"scale": 22
			},
			"daily3": {
				"w": [
					[
						.0884,
						.01626,
						.015,
						-.08448,
						-.01047,
						-.07554,
						.04924,
						.08489,
						.01111,
						.03226,
						.01422,
						.03551,
						-.00824,
						.02036,
						-.05949,
						.03758,
						.01111,
						.02036,
						.01422,
						.03551,
						0,
						.03758,
						-.05949,
						.03226,
						-.00824,
						-.10238,
						.01111,
						-.00824,
						-.02155,
						.11899,
						.81967
					],
					[
						-.00178,
						.12165,
						.11101,
						.08066,
						.1045,
						.10729,
						-.0479,
						.0154,
						.05053,
						.03729,
						.00749,
						.04905,
						.05519,
						.11021,
						.14545,
						.03563,
						.05053,
						.11021,
						.00749,
						.04905,
						0,
						.03563,
						.14545,
						.03729,
						.05519,
						-17e-5,
						.05053,
						.05519,
						.12347,
						.16554,
						.22073
					],
					[
						-.08663,
						-.13792,
						-.12601,
						.00382,
						-.09403,
						-.03175,
						-.00134,
						-.10029,
						-.06164,
						-.06956,
						-.02171,
						-.08456,
						-.04695,
						-.13056,
						-.08596,
						-.0732,
						-.06164,
						-.13056,
						-.02171,
						-.08456,
						0,
						-.0732,
						-.08596,
						-.06956,
						-.04695,
						.10255,
						-.06164,
						-.04695,
						-.10191,
						-.28453,
						-1.0404
					]
				],
				"b": [
					.08514,
					.51325,
					-.59839
				],
				"classes": [
					"晴",
					"阴",
					"雨"
				]
			}
		},
		{
			"code": "230103",
			"name": "南岗区",
			"province": "黑龙江省",
			"city": "哈尔滨市",
			"lat": 45.75597,
			"lng": 126.6521,
			"rainDays": 1038,
			"rainRate": .427,
			"metrics": {
				"rainAccTrain": .682,
				"rainAccTest": .6623,
				"dailyAccTrain": .5829,
				"dailyAccTest": .5894,
				"xunAccTrain": .7582,
				"xunAccTest": .8333,
				"interceptScore": -4.7037
			},
			"scoreModel": {
				"w": [
					-.0317,
					-.08246,
					-.15489,
					.03746,
					.02351,
					.01812,
					.06416,
					-.07208,
					-.02406,
					.03853,
					-.08093,
					-.01245,
					-.09108,
					-.06004,
					.0212,
					.01096,
					-.02406,
					-.06004,
					-.08093,
					-.01245,
					0,
					.01096,
					.0212,
					.03853,
					-.09108,
					-.01882,
					-.02406,
					-.09108,
					-.01598,
					-.20522,
					-.96294
				],
				"b": -.2138,
				"scale": 22
			},
			"daily3": {
				"w": [
					[
						.06803,
						.09089,
						.15494,
						.02844,
						.0418,
						.02375,
						.01349,
						.086,
						.06769,
						.01357,
						.10134,
						.05469,
						.0989,
						.09477,
						.04309,
						.0333,
						.06769,
						.09477,
						.10134,
						.05469,
						0,
						.0333,
						.04309,
						.01357,
						.0989,
						.09229,
						.06769,
						.0989,
						.06322,
						.23899,
						.7652
					],
					[
						-.00433,
						-.05475,
						.03193,
						.01171,
						.09818,
						-.01852,
						.13047,
						-.04613,
						.0437,
						.04114,
						-.02224,
						.01545,
						.00294,
						.00799,
						.05805,
						.00153,
						.0437,
						.00799,
						-.02224,
						.01545,
						0,
						.00153,
						.05805,
						.04114,
						.00294,
						-.01447,
						.0437,
						.00294,
						.0576,
						.0713,
						.01839
					],
					[
						-.0637,
						-.03615,
						-.18687,
						-.04015,
						-.13998,
						-.00522,
						-.14396,
						-.03987,
						-.11139,
						-.05471,
						-.0791,
						-.07014,
						-.10183,
						-.10277,
						-.10114,
						-.03482,
						-.11139,
						-.10277,
						-.0791,
						-.07014,
						0,
						-.03482,
						-.10114,
						-.05471,
						-.10183,
						-.07782,
						-.11139,
						-.10183,
						-.12082,
						-.31029,
						-.78359
					]
				],
				"b": [
					.53195,
					.15323,
					-.68518
				],
				"classes": [
					"晴",
					"阴",
					"雨"
				]
			}
		},
		{
			"code": "460105",
			"name": "秀英区",
			"province": "海南省",
			"city": "海口市",
			"lat": 20.00814,
			"lng": 110.28239,
			"rainDays": 1339,
			"rainRate": .5508,
			"metrics": {
				"rainAccTrain": .6404,
				"rainAccTest": .6887,
				"dailyAccTrain": .4773,
				"dailyAccTest": .5265,
				"xunAccTrain": .7692,
				"xunAccTest": .8,
				"interceptScore": 2.2185
			},
			"scoreModel": {
				"w": [
					-.05653,
					-.01787,
					.06834,
					.02527,
					.0685,
					.06481,
					-.06111,
					.00267,
					.00848,
					-.01464,
					-.02046,
					.11497,
					-.0644,
					-.0542,
					.07897,
					.04535,
					.00848,
					-.0542,
					-.02046,
					.11497,
					0,
					.04535,
					.07897,
					-.01464,
					-.0644,
					.17588,
					.00848,
					-.0644,
					.09289,
					-.41131,
					-.64885
				],
				"b": .10084,
				"scale": 22
			},
			"daily3": {
				"w": [
					[
						.08463,
						.049,
						-.0078,
						.02905,
						-.00404,
						-.00715,
						.07923,
						.03252,
						.02989,
						.04487,
						.0595,
						-.0317,
						.06939,
						.08714,
						-.01028,
						.00663,
						.02989,
						.08714,
						.0595,
						-.0317,
						0,
						.00663,
						-.01028,
						.04487,
						.06939,
						-.05144,
						.02989,
						.06939,
						-.02645,
						.35698,
						.48628
					],
					[
						.04351,
						.0124,
						.08062,
						.01062,
						-.01061,
						-.00579,
						-.07694,
						-.01619,
						.0187,
						.00959,
						.03006,
						.06243,
						-.05876,
						-.02413,
						9e-4,
						-.00119,
						.0187,
						-.02413,
						.03006,
						.06243,
						0,
						-.00119,
						9e-4,
						.00959,
						-.05876,
						.01929,
						.0187,
						-.05876,
						.06229,
						.08912,
						.06627
					],
					[
						-.12814,
						-.0614,
						-.07281,
						-.03966,
						.01465,
						.01294,
						-.00229,
						-.01633,
						-.04859,
						-.05446,
						-.08957,
						-.03072,
						-.01064,
						-.06301,
						.00938,
						-.00544,
						-.04859,
						-.06301,
						-.08957,
						-.03072,
						0,
						-.00544,
						.00938,
						-.05446,
						-.01064,
						.03215,
						-.04859,
						-.01064,
						-.03584,
						-.4461,
						-.55255
					]
				],
				"b": [
					.26819,
					.03864,
					-.30683
				],
				"classes": [
					"晴",
					"阴",
					"雨"
				]
			}
		},
		{
			"code": "540102",
			"name": "城关区",
			"province": "西藏自治区",
			"city": "拉萨市",
			"lat": 29.65947,
			"lng": 91.13291,
			"rainDays": 894,
			"rainRate": .3677,
			"metrics": {
				"rainAccTrain": .7838,
				"rainAccTest": .7401,
				"dailyAccTrain": .7044,
				"dailyAccTest": .6755,
				"xunAccTrain": .8462,
				"xunAccTest": .8333,
				"interceptScore": -13.2836
			},
			"scoreModel": {
				"w": [
					-.07196,
					-.07105,
					-.09448,
					-.1056,
					.02482,
					-.02218,
					-.09051,
					-.13516,
					-.03134,
					-.09826,
					-.19895,
					-.15781,
					-.12002,
					.1033,
					-.00945,
					-.05358,
					-.03134,
					.1033,
					-.19895,
					-.15781,
					0,
					-.05358,
					-.00945,
					-.09826,
					-.12002,
					.19905,
					-.03134,
					-.12002,
					-.06501,
					-.30287,
					-1.91721
				],
				"b": -.6038,
				"scale": 22
			},
			"daily3": {
				"w": [
					[
						.08842,
						.09844,
						.10205,
						.12953,
						.03042,
						.06101,
						.09769,
						.12788,
						.08193,
						.09918,
						.17025,
						.15798,
						.1128,
						-.01282,
						.05466,
						.07145,
						.08193,
						-.01282,
						.17025,
						.15798,
						0,
						.07145,
						.05466,
						.09918,
						.1128,
						-.04585,
						.08193,
						.1128,
						.09082,
						.29947,
						1.31337
					],
					[
						-.04649,
						.04997,
						-.03615,
						.00979,
						.05948,
						.07575,
						-.03432,
						-.04105,
						.06291,
						-.02521,
						-.09512,
						.01012,
						-.03254,
						.09331,
						.03259,
						-.00907,
						.06291,
						.09331,
						-.09512,
						.01012,
						0,
						-.00907,
						.03259,
						-.02521,
						-.03254,
						.01317,
						.06291,
						-.03254,
						.03624,
						.0105,
						-.50611
					],
					[
						-.04193,
						-.1484,
						-.0659,
						-.13932,
						-.0899,
						-.13676,
						-.06337,
						-.08683,
						-.14485,
						-.07396,
						-.07514,
						-.16809,
						-.08026,
						-.08049,
						-.08725,
						-.06238,
						-.14485,
						-.08049,
						-.07514,
						-.16809,
						0,
						-.06238,
						-.08725,
						-.07396,
						-.08026,
						.03268,
						-.14485,
						-.08026,
						-.12706,
						-.30997,
						-.80725
					]
				],
				"b": [
					.7692,
					.03666,
					-.80586
				],
				"classes": [
					"晴",
					"阴",
					"雨"
				]
			}
		}
	]
};
function n3$1(x) {
	return x.toFixed(3);
}
function mdTable$1(headers, rows) {
	return [
		`| ${headers.join(" | ")} |`,
		`|${headers.map(() => "---").join("|")}|`,
		...rows.map((r) => `| ${r.join(" | ")} |`)
	].join("\n");
}
function recTable(title, rec) {
	return `### ${title}\n\n${mdTable$1(["名", "分值"], Object.entries(rec).map(([k, v]) => [k, String(v)]))}`;
}
var PATTERN_CATALOG = [
	{
		name: "青龙反首",
		weight: 18,
		source: "《烟波钓叟歌》甲加丙",
		when: "天盘甲/戊加地盘丙"
	},
	{
		name: "飞鸟跌穴",
		weight: 18,
		source: "《烟波钓叟歌》丙加甲",
		when: "天盘丙加地盘甲/戊"
	},
	{
		name: "青龙逃走",
		weight: -16,
		source: "乙加辛",
		when: "天盘乙加地盘辛"
	},
	{
		name: "白虎猖狂",
		weight: -16,
		source: "辛加乙",
		when: "天盘辛加地盘乙"
	},
	{
		name: "朱雀投江",
		weight: -14,
		source: "丁加癸",
		when: "天盘丁加地盘癸"
	},
	{
		name: "螣蛇夭矫",
		weight: -14,
		source: "癸加丁",
		when: "天盘癸加地盘丁"
	},
	{
		name: "太白入荧",
		weight: -12,
		source: "庚加丙",
		when: "天盘庚加地盘丙"
	},
	{
		name: "荧入太白",
		weight: -10,
		source: "丙加庚",
		when: "天盘丙加地盘庚"
	},
	{
		name: "值符飞宫",
		weight: -10,
		source: "甲加庚",
		when: "天盘甲加地盘庚"
	},
	{
		name: "太白擒龙",
		weight: -12,
		source: "庚加甲",
		when: "天盘庚加地盘甲"
	},
	{
		name: "日奇入雾",
		weight: -6,
		source: "乙加己",
		when: "天盘乙加地盘己"
	},
	{
		name: "朱雀入墓",
		weight: -8,
		source: "丁加己",
		when: "天盘丁加地盘己"
	},
	{
		name: "火入勾陈",
		weight: -7,
		source: "己加丁",
		when: "天盘己加地盘丁"
	},
	{
		name: "三奇吉门",
		weight: 14,
		source: "《总序》开三",
		when: "乙丙丁临开休生"
	},
	{
		name: "天遁",
		weight: 14,
		source: "九遁",
		when: "丙+生门+九天或丁"
	},
	{
		name: "地遁",
		weight: 12,
		source: "九遁",
		when: "乙+开门"
	},
	{
		name: "人遁",
		weight: 12,
		source: "九遁",
		when: "丁+太阴+休门"
	},
	{
		name: "真诈",
		weight: 8,
		source: "三诈法",
		when: "开休生临太阴"
	},
	{
		name: "休诈",
		weight: 8,
		source: "三诈法",
		when: "开休生临六合"
	},
	{
		name: "重诈",
		weight: 8,
		source: "三诈法",
		when: "开休生临九地"
	},
	{
		name: "三奇得使",
		weight: 12,
		source: "乙逢犬马、丙鼠猴、丁龙虎",
		when: "奇干逢使支"
	},
	{
		name: "玉女守门",
		weight: 6,
		source: "三奇游六仪",
		when: "丁临六仪且吉门"
	},
	{
		name: "伏吟",
		weight: -10,
		source: "《烟波钓叟歌》",
		when: "天盘=地盘"
	},
	{
		name: "反吟",
		weight: -8,
		source: "天蓬到天英",
		when: "宫冲"
	},
	{
		name: "门迫",
		weight: -9,
		source: "门克宫",
		when: "门五行克宫"
	},
	{
		name: "宫迫",
		weight: -5,
		source: "宫克门",
		when: "宫五行克门"
	},
	{
		name: "入墓",
		weight: -10,
		source: "长生墓库",
		when: "用神入墓"
	},
	{
		name: "击刑",
		weight: -12,
		source: "六仪击刑",
		when: "仪星击刑"
	},
	{
		name: "空亡",
		weight: -8,
		source: "旬空",
		when: "用神宫旬空"
	},
	{
		name: "驿马",
		weight: 4,
		source: "太冲天马",
		when: "驿马入宫"
	},
	{
		name: "五不遇时",
		weight: -14,
		source: "时干克日干",
		when: "时克日"
	},
	{
		name: "文昌会景",
		weight: 8,
		source: "天辅+景门",
		when: "考试文书"
	},
	{
		name: "天心得门",
		weight: 6,
		source: "天心+开/休",
		when: "求谋医药"
	},
	{
		name: "蓬休同宫",
		weight: -2,
		source: "天蓬+休门",
		when: "凶星得吉门稍解"
	}
];
var GANZHI_WEIGHTS = [
	[
		"年/月干合用神",
		"+6",
		"STEM_HE，日时以外"
	],
	[
		"日/时干合用神",
		"+10",
		"STEM_HE，日时权重大"
	],
	[
		"年/月干冲用神",
		"−7",
		"STEM_CHONG"
	],
	[
		"日/时干冲用神",
		"−12",
		"STEM_CHONG"
	],
	[
		"日/时干生用神",
		"+6",
		"五行生我"
	],
	[
		"日/时干克用神",
		"−7",
		"五行克我"
	],
	[
		"年/月支六合宫",
		"+5",
		"BRANCH_SIX_HE"
	],
	[
		"日/时支六合宫",
		"+9",
		"BRANCH_SIX_HE"
	],
	[
		"年/月支冲宫",
		"−6",
		"BRANCH_CHONG"
	],
	[
		"日/时支冲宫",
		"−11",
		"BRANCH_CHONG"
	],
	[
		"年/月支刑宫",
		"−5",
		"三刑/自刑"
	],
	[
		"日/时支刑宫",
		"−9",
		"三刑/自刑"
	],
	[
		"年/月支害宫",
		"−4",
		"BRANCH_HAI"
	],
	[
		"日/时支害宫",
		"−7",
		"BRANCH_HAI"
	],
	[
		"日干长生在时",
		"0.45×十二长生分",
		"四舍五入"
	],
	[
		"时干长生在日",
		"0.35×十二长生分",
		"四舍五入"
	],
	[
		"用神空亡",
		"−16",
		"旬空落用神宫"
	]
];
var SEASON_WANG = [
	[
		"月支旺与用神同五行",
		"+10",
		"得令"
	],
	[
		"用神生月旺",
		"−4",
		"我生，泄气"
	],
	[
		"月旺生用神",
		"+5",
		"生我，得气"
	],
	[
		"用神克月旺",
		"−2",
		"我克，耗力"
	],
	[
		"月旺克用神",
		"−8",
		"克我，受制"
	]
];
var PHASE = {
	start: .25,
	process: .35,
	end: .4,
	aux: .55
};
var SAMPLE_CIVIL = {
	year: 2026,
	month: 8,
	day: 29,
	hour: 12,
	minute: 0
};
function biasRows(base, bias, names) {
	return names.filter((k) => k in base || k in bias).map((k) => {
		const b0 = base[k] ?? 0;
		const d = bias[k] ?? 0;
		return [
			k,
			String(b0),
			d ? d > 0 ? `+${d}` : String(d) : "0",
			String(b0 + d)
		];
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

${mdTable$1([
			"门",
			"基础分（校准后）",
			"事项偏置",
			"合计"
		], biasRows(GATE_BASE, ev.gateBias, gates))}

**九星偏置**

${mdTable$1([
			"星",
			"基础分（校准后）",
			"事项偏置",
			"合计"
		], biasRows(STAR_BASE, ev.starBias, stars))}

**八神偏置**

${mdTable$1([
			"神",
			"基础分（校准后）",
			"事项偏置",
			"合计"
		], biasRows(GOD_BASE, ev.godBias, gods))}

特殊规则：${ev.id === "health" ? "病星天芮空亡或入墓 +12（病气衰减）；天芮帝旺 −10；生门 +8；死门非空 −8。填写出生年则用神宫改取年干天盘宫。" : ev.id === "romance" ? "沐浴改作 +8（桃花）；男测兑/坤宫 +6，女测乾/坎宫 +6。" : ev.id === "job" || ev.id === "career" ? "若填写出生年，用神宫改取年干在天盘所落宫（以年命代值符/开门宫）。" : "无额外翻转规则。"}`;
	}).join("\n\n");
}
function sampleDump() {
	const chart = buildChart(SAMPLE_CIVIL);
	const all = scoreAllEvents(chart);
	const wealth = scoreEvent(chart, "wealth");
	const ranked = mdTable$1([
		"事项",
		"用神宫",
		"神/星/门",
		"开始分",
		"过程分",
		"收局分",
		"综合 S",
		"百分比",
		"总断"
	], all.map((ev) => {
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
			ev.level
		];
	}));
	const factors = mdTable$1([
		"阶段",
		"因子",
		"说明",
		"分值"
	], wealth.factors.map((f) => [
		f.phase,
		f.label,
		f.detail,
		(f.weight > 0 ? "+" : "") + String(f.weight)
	]));
	const start = wealth.factors.filter((f) => f.phase === "start").reduce((s, f) => s + f.weight, 0);
	const process = wealth.factors.filter((f) => f.phase === "process").reduce((s, f) => s + f.weight, 0);
	const end = wealth.factors.filter((f) => f.phase === "end").reduce((s, f) => s + f.weight, 0);
	const aux = wealth.factors.filter((f) => f.phase === "aux").reduce((s, f) => s + f.weight, 0);
	return {
		chart,
		ranked,
		wealth,
		factors,
		mix: {
			start,
			process,
			end,
			aux,
			raw: start * PHASE.start + process * PHASE.process + end * PHASE.end + aux * PHASE.aux,
			score: wealth.score,
			p: wealth.probability
		}
	};
}
var SAMPLE = sampleDump();
var EVENT_MODEL_SPEC = {
	title: "十二类日常事项加性分值模型",
	method: "拆补法转盘排盘后，按事项取用神宫，神/星/门基础分（天气校准后）加事项偏置，再加干支、长生、月令、格局；四阶段加权得 S，P=σ(S/22)。",
	scoreScale: 22,
	probability: "P = clip(sigmoid(S/22), 0.04, 0.96)，界面为百分数",
	phaseWeights: PHASE,
	luckBands: {
		大吉: "S≥42",
		吉: "20≤S<42",
		小吉: "6≤S<20",
		平: "-6<S<6",
		小凶: "-20<S≤-6",
		凶: "-42<S≤-20",
		大凶: "S≤-42"
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
			meanXunAcc: EVENT_CALIBRATION.meanXunAcc
		}
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
		godBias: e.godBias
	})),
	patterns: PATTERN_CATALOG,
	stemGe: Object.entries(STEM_GE).map(([k, v]) => ({
		stems: k,
		...v
	})),
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
			weight: f.weight
		}))
	}))
};
function yongShenTable() {
	return mdTable$1([
		"事项",
		"用神种类",
		"主用神",
		"次看",
		"取宫规则"
	], EVENTS.map((e) => [
		e.name,
		e.yongShen === "zhifu" ? "值符宫" : e.yongShen === "gate" ? "八门" : e.yongShen === "star" ? "九星" : "八神",
		e.target,
		e.secondary ? `${e.secondary.name}` : "—",
		e.yongShen === "zhifu" ? "值符飞宫；填出生年则改年干天盘宫" : `找「${e.target}」所在宫；求职/事业/健康填年命则改年干天盘宫`
	]));
}
function eventChapters() {
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

与天气完全相同：SCORE_SCALE = 22。

${mdTable$1(["条件", "总断"], [
		["S ≥ 42", "大吉"],
		["20 ≤ S < 42", "吉"],
		["6 ≤ S < 20", "小吉"],
		["−6 < S < 6", "平"],
		["−20 < S ≤ −6", "小凶"],
		["−42 < S ≤ −20", "凶"],
		["S ≤ −42", "大凶"]
	])}

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

${mdTable$1([
		"关系",
		"分值",
		"含义"
	], SEASON_WANG)}

月支旺气：寅卯木、巳午火、申酉金、亥子水、辰戌丑未土。

### 8.6 四柱干支加分（ganzhiFlags）

年、月、日、时四柱分别与用神宫天盘干、宫支比较。日时权重大于年月。

${mdTable$1([
		"规则",
		"分值",
		"出处"
	], GANZHI_WEIGHTS)}

天干五合：${Object.entries(STEM_HE).filter((_, i) => i % 2 === 0).map(([a, b]) => `${a}${b}`).join("、")}。天干相冲：${Object.entries(STEM_CHONG).filter((_, i) => i % 2 === 0).map(([a, b]) => `${a}${b}`).join("、")}。

---

## 第 9 章 十二类事项的用神与全部偏置

用神决定「看哪一宫」。偏置 δ 决定「同一个开门，求财与求医含义不同」。下表是软件 EVENT 表的完整导出。

${yongShenTable()}

五行：门 ${Object.entries(GATE_ELEMENT).map(([k, v]) => `${k}=${v}`).join("，")}；星 ${Object.entries(STAR_ELEMENT).map(([k, v]) => `${k}=${v}`).join("，")}。

${eventBiasChapters()}

---

## 第 10 章 格局、人事、方位、求签

### 10.1 经典格局权重全表

格局在用神宫（及部分全局条件）触发，写入辅项或收局。同一格局名只计一次。十干克应来自《烟波钓叟歌》；九遁三诈来自《秘笈》。

${mdTable$1([
		"格局",
		"分值",
		"触发",
		"文献"
	], PATTERN_CATALOG.map((p) => [
		p.name,
		String(p.weight),
		p.when,
		p.source
	]))}

十干克应键（天盘+地盘）数值备份：

${mdTable$1([
		"天盘+地盘",
		"格局",
		"分值",
		"断语"
	], Object.entries(STEM_GE).map(([k, v]) => [
		k,
		v.name,
		String(v.weight),
		v.detail
	]))}

### 10.2 人事关系（peopleRelations）

以值符宫为「我」，其余八宫按五行生克定六亲，再给关系分：

\\\\[ S_{人} = \\mathrm{round}\\big(\\mathrm{clip}(0.45(w_门+w_星+w_神)+e+h+c,\\ -80,\\ 80)\\big) \\\\]

其中 e = 空亡 −14 + 入墓 −8 + 门迫 −6 + 伏吟 −4；支合 +10，支冲 −12。六亲：生我=父母，我生=子孙，克我=官鬼，我克=妻财，同我=兄弟。男测兑离坤偏妻财，女测乾坎震偏官夫。百分比仍用 σ(S/22)，档位与事项相同。

### 10.3 方位用事（scoreDirections）

十类活动各有宜忌门。宫分：

\\\\[ S_{方} = s_{门}(活动) + e_{神星格局} \\\\]

宜门 +16，忌门 −16，其余门 0；无门 −4。附加：值符/九天/六合/太阴 +6，白虎/玄武/腾蛇 −5；天心/天任/天辅 +4，天蓬/天芮/天柱 −4；空 −8，迫 −6，墓 −5，伏吟 −3，反吟 −4。档位：≥16 大宜，≥6 宜，≥−5 平，≥−16 不宜，否则大忌。

${mdTable$1([
		"活动",
		"宜门（+16）",
		"忌门（−16）"
	], ACTIVITY_META.map((a) => [
		a.name,
		a.prefer.join("、"),
		a.avoid.join("、")
	]))}

八门古法宜忌（《烟波钓叟赋》门旨）：

${mdTable$1([
		"门",
		"宜",
		"忌",
		"歌诀摘要"
	], Object.entries(GATE_USES).map(([k, v]) => [
		k,
		v.suit.join("、"),
		v.avoid.join("、"),
		v.classic
	]))}

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

阶段合计：始 ${n3$1(mix.start)}，中 ${n3$1(mix.process)}，终 ${n3$1(mix.end)}，辅 ${n3$1(mix.aux)}。

加权：

\\\\[ S_{raw}=0.25\\times ${n3$1(mix.start)}+0.35\\times ${n3$1(mix.process)}+0.40\\times ${n3$1(mix.end)}+0.55\\times ${n3$1(mix.aux)}=${n3$1(mix.raw)} \\\\]

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
var W = weather_weights_default;
var D = district_summary_default;
function pct(x) {
	return `${(x * 100).toFixed(1)}%`;
}
function n4(x) {
	return x.toFixed(4);
}
function n3(x) {
	return x.toFixed(3);
}
function mdTable(headers, rows) {
	return [
		`| ${headers.join(" | ")} |`,
		`|${headers.map(() => "---").join("|")}|`,
		...rows.map((r) => `| ${r.join(" | ")} |`)
	].join("\n");
}
function regionSummaryTable() {
	return mdTable([
		"区",
		"气候",
		"样本日",
		"训练",
		"检验",
		"雨日",
		"雨日比",
		"有雨训练",
		"有雨检验",
		"旬训练",
		"旬检验",
		"截距分值"
	], W.regions.map((r) => {
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
			n3(m.interceptScore)
		];
	}));
}
function oneRegionWeightTable(r) {
	const rows = [[
		"截距 b",
		n4(r.scoreModel.b),
		n3(r.metrics.interceptScore),
		"无对应特征，吸收该区气候雨日基线"
	]];
	for (let j = 0; j < W.featureNames.length; j++) {
		const beta = r.scoreModel.w[j] ?? 0;
		rows.push([
			W.featureNames[j],
			n4(beta),
			n3(beta * 22),
			contribNote(W.featureNames[j], beta)
		]);
	}
	return mdTable([
		"特征",
		"logit β",
		`分值 22β`,
		"产生方式"
	], rows);
}
function contribNote(name, beta) {
	if (name === "星_天禽") return "坎宫不出现天禽（寄坤宫），该列恒为 0，梯度为 0";
	if (Math.abs(beta) < 1e-8) return "训练后近 0";
	if (name.startsWith("神_") || name.startsWith("门_") || name.startsWith("星_")) return "坎宫 one-hot=1 时对该区 logit 的加项；由 1827 日交叉熵梯度下降得到";
	if (name === "阴遁") return "阴遁日取 1，阳遁取 0";
	if (name === "伏吟" || name === "反吟") return "盘面格局 0/1";
	if (name === "坎空") return "坎宫旬空为 1";
	if (name === "年积日sin" || name === "年积日cos") return "节气气候学三角项，非奇门符号";
	return "逻辑回归系数";
}
function allRegionChapters() {
	return W.regions.map((r, i) => {
		const m = r.metrics;
		const topLine = [...r.allFactors].slice(0, 5).map((f) => `${f.name} ${f.score >= 0 ? "+" : ""}${n3(f.score)}`).join("；");
		const b3 = r.daily3.b.map((v, k) => `${r.daily3.classes[k]}=${n4(v)}`).join("，");
		return `### 6.10.${i + 1} 对照 ${r.name}（${r.place}）

气候带：${r.climate}。样本 ${r.n} 日（训练 ${r.trainN} = ${W.start}–${W.trainUntil}；检验 ${r.testN} = ${W.testFrom}–${W.end}）。雨日 ${r.rainDays}，雨日比 ${pct(r.rainRate)}。

主模型（Bernoulli 有雨）准确率：训练 ${pct(m.rainAccTrain)}，检验 ${pct(m.rainAccTest)}。旬阴晴：训练 ${pct(m.xunAccTrain)}，检验 ${pct(m.xunAccTest)}。辅模型 softmax 晴/阴/雨：训练 ${pct(m.dailyAccTrain)}，检验 ${pct(m.dailyAccTest)}。

分值最大的五项（S=22β）：${topLine}。

Softmax 三类截距：${b3}。主模型截距 b=${n4(r.scoreModel.b)}，对应分值 ${n3(m.interceptScore)}。

该区完整 31 维权重如下。每一行的 β 都是在该区 1827 个训练日上，以交叉熵 + L2 全批梯度下降 120 轮得到的最终值；分值列与事项预测同一单位。

${oneRegionWeightTable(r)}`;
	}).join("\n\n");
}
function pooledMedianAbs() {
	const abs = EVENT_CALIBRATION.pooledLogit.map((p) => Math.abs(p.logit)).sort((a, b) => a - b);
	return abs[Math.floor(abs.length / 2)] || .01;
}
function reliability(beta, med) {
	return Math.max(.55, Math.min(1.35, .75 + .5 * (Math.abs(beta) / (med * 3 + 1e-6))));
}
function pooledOf(prefix, name) {
	return EVENT_CALIBRATION.pooledLogit.find((p) => p.name === `${prefix}_${name}`)?.logit ?? 0;
}
function eventDeriveTable(title, prefix, classic, now) {
	const med = pooledMedianAbs();
	const g = EVENT_CALIBRATION.globalScale;
	return `### ${title}\n\n${mdTable([
		"名",
		"经典先验 w0",
		"全国区县平均 β",
		"分值 22β",
		"信度 r",
		"尺度 g",
		"w0·r·g",
		"四舍五入后"
	], Object.keys(classic).map((k) => {
		const w0 = classic[k];
		const beta = pooledOf(prefix, k);
		const r = reliability(beta, med);
		const prod = w0 * r * g;
		return [
			k,
			String(w0),
			n4(beta),
			n3(beta * 22),
			n3(r),
			n3(g),
			n3(prod),
			String(now[k])
		];
	}))}`;
}
function workedExamples() {
	const med = pooledMedianAbs();
	const g = EVENT_CALIBRATION.globalScale;
	return [
		{
			name: "死门",
			prefix: "门",
			classic: EVENT_CALIBRATION.classicGate["死门"],
			now: EVENT_CALIBRATION.gate["死门"],
			why: "刘伯温以死门为凶门。天气回归里该 one-hot 的 |β| 相对中位数偏大，故幅度加大，符号仍为负。"
		},
		{
			name: "生门",
			prefix: "门",
			classic: EVENT_CALIBRATION.classicGate["生门"],
			now: EVENT_CALIBRATION.gate["生门"],
			why: "生门为吉门。天气 |β| 未显著高于中位数，乘 g 后略降，避免把雨日气候学误写成求财加分。"
		},
		{
			name: "开门",
			prefix: "门",
			classic: EVENT_CALIBRATION.classicGate["开门"],
			now: EVENT_CALIBRATION.gate["开门"],
			why: "开门人事主官贵。校准后仍为 +20，尺度被 g 与 r 抵消。"
		},
		{
			name: "值符",
			prefix: "神",
			classic: EVENT_CALIBRATION.classicGod["值符"],
			now: EVENT_CALIBRATION.god["值符"],
			why: "值符为八神之首。天气坎宫上该列 |β| 偏小，信度下调。"
		},
		{
			name: "玄武",
			prefix: "神",
			classic: EVENT_CALIBRATION.classicGod["玄武"],
			now: EVENT_CALIBRATION.god["玄武"],
			why: "古法玄武主雨。人事仍作凶神，不把雨势正号抄到求财。"
		},
		{
			name: "天芮",
			prefix: "星",
			classic: EVENT_CALIBRATION.classicStar["天芮"],
			now: EVENT_CALIBRATION.star["天芮"],
			why: "天芮寄死门宫。天气 |β| 与死门共线，人事凶星幅度加大。"
		}
	].map((it, i) => {
		const beta = pooledOf(it.prefix, it.name);
		const r = reliability(beta, med);
		const prod = it.classic * r * g;
		return `例 ${i + 1}　${it.name}

- 经典先验（刘伯温人事吉凶）w0 = ${it.classic}。
- 全国区县 Bernoulli 系数算术平均 β̄ = ${n4(beta)}，对应分值 22β̄ = ${n3(beta * 22)}。
- 中位数 |β|med = ${n4(med)}。
- 信度 r = clip(0.75 + 0.5 × |β̄| / (3 med), 0.55, 1.35) = ${n3(r)}。
- 全国旬准确率尺度 g = 0.92 + 0.16 × ${n3(EVENT_CALIBRATION.meanXunAcc)} = ${n3(g)}。
- 乘积 w0 × r × g = ${it.classic} × ${n3(r)} × ${n3(g)} = ${n3(prod)}。
- 四舍五入得最终事项权重 ${it.now}。${it.why}`;
	}).join("\n\n");
}
function crossRegionKeyTable() {
	const keys = [
		"神_玄武",
		"神_九天",
		"门_死门",
		"门_生门",
		"门_开门",
		"星_天芮",
		"阴遁",
		"年积日cos"
	];
	return mdTable([
		"区",
		"截距分",
		...keys
	], W.regions.map((r) => {
		const cells = [r.name, n3(r.metrics.interceptScore)];
		for (const k of keys) {
			const j = W.featureNames.indexOf(k);
			const v = (r.scoreModel.w[j] ?? 0) * 22;
			cells.push(n3(v));
		}
		return cells;
	}));
}
var gz = W.regions.find((r) => r.id === "guangzhou");
var hk = W.regions.find((r) => r.id === "haikou");
W.regions.find((r) => r.id === "ouhai");
var med = pooledMedianAbs();
var ouhaiD = D.samples.find((s) => s.code === "330304");
var haidian = D.samples.find((s) => s.code === "110108");
var tianhe = D.samples.find((s) => s.code === "440106");
function provinceTable() {
	return mdTable([
		"省",
		"区县数",
		"雨日比",
		"有雨检验",
		"旬检验"
	], D.provinceMetrics.map((r) => [
		r.province,
		String(r.n),
		pct(r.rainRate),
		pct(r.rainAccTest),
		pct(r.xunAccTest)
	]));
}
function oneDistrictWeightTable(s) {
	const rows = [[
		"截距 b",
		n4(s.scoreModel.b),
		n3(s.metrics.interceptScore),
		"吸收该区雨日基线"
	]];
	for (let j = 0; j < D.featureNames.length; j++) {
		const beta = s.scoreModel.w[j] ?? 0;
		rows.push([
			D.featureNames[j],
			n4(beta),
			n3(beta * 22),
			contribNote(D.featureNames[j], beta)
		]);
	}
	return mdTable([
		"特征",
		"logit β",
		`分值 22β`,
		"产生方式"
	], rows);
}
function sampleDistrictChapters() {
	return D.samples.map((s, i) => {
		const m = s.metrics;
		const b3 = s.daily3.b.map((v, k) => `${s.daily3.classes[k]}=${n4(v)}`).join("，");
		return `### 6.${i + 1} ${s.province}${s.city}${s.name}（${s.code}）

中心 ${s.lat.toFixed(4)}°N ${s.lng.toFixed(4)}°E。样本 ${D.nDays} 日（训练 ${D.nTrainDays} = ${D.start}–${D.trainUntil}；检验 ${D.nTestDays} = ${D.testFrom}–${D.end}）。雨日 ${s.rainDays}，雨日比 ${pct(s.rainRate)}。

主模型有雨准确率：训练 ${pct(m.rainAccTrain)}，检验 ${pct(m.rainAccTest)}。旬阴晴：训练 ${pct(m.xunAccTrain)}，检验 ${pct(m.xunAccTest)}。softmax 晴/阴/雨：训练 ${pct(m.dailyAccTrain)}，检验 ${pct(m.dailyAccTest)}。

Softmax 三类截距：${b3}。主模型截距 b=${n4(s.scoreModel.b)}，对应分值 ${n3(m.interceptScore)}。该区 31 维权重由本区 ${D.nTrainDays} 个训练日交叉熵 + L2 全批梯度下降 ${D.ml.epochs} 轮得到，不与邻区共享。

${oneDistrictWeightTable(s)}`;
	}).join("\n\n");
}
var PAPER_TITLE = "基于拆补法转盘奇门的统一分值模型：十二类日常事项加性评分与 2020–2026 中国区县天气逻辑回归校准";
var PAPER_MD = `# ${PAPER_TITLE}

博士学位论文（学习用研究报告，非正式学位授予文本）

学科：应用统计学 / 中国术数文献的可计算建模

数据时段：${D.start} 至 ${D.end}

训练 / 检验：${D.trainUntil} 以前为训练（每区县 ${D.nTrainDays} 日），${D.testFrom} 起为时间外推检验（每区县 ${D.nTestDays} 日）

区县：${D.nDistricts}；地级回退 ${D.nCities}；省级回退 ${D.nProvinces}；合计 ${D.nCells} 套独立权重；每套 ${D.nDays} 日；总样本 ${D.nTotalSamples.toLocaleString()} 条（区县 × 日）

机器学习：Bernoulli 逻辑回归（主）+ 三项 multinomial softmax（辅）；全批梯度下降 ${D.ml.epochs} 轮（softmax 80 轮）；学习率 ${D.ml.learningRate}；L2 λ=${D.ml.l2}

---

## 摘要

本文将时家奇门遁甲拆补法转盘排盘，改写为事项与天气共用的加性分值模型。人事十二类（求财、事业、求职、婚姻、考试、健康、出行、诉讼、合伙、置业、谈判、寻人）与天气共用

\\\\[ P = \\sigma(S/22),\\quad S_{天气} = 22\\,(b + w^{\\top} x) \\\\]

事项侧的综合分不是简单相加，而是神始、星中、门终再加辅项后按 0.25 / 0.35 / 0.40 / 0.55 加权（第 8 章给出逐步公式与全部偏置）。天气部分以坎宫为用神，对「当日降水量 ≥ 0.1 mm」做 Bernoulli 逻辑回归，并以三项 softmax 辅助输出晴/阴/雨。特征 31 维：坎宫所临八神、八门、九星的 one-hot，加上阴遁、伏吟、反吟、坎空与年积日正弦余弦。

训练窗口为 ${D.start} 至 ${D.end}，共 ${D.nDays} 日 × ${D.nDistricts} 区县 = ${D.nTotalSamples.toLocaleString()} 条。全国旬准确率均值 ${pct(D.meanXunAcc)}，有雨日值检验均值 ${pct(D.meanRainAccTest)}。瓯海旬检验 ${pct(ouhaiD.metrics.xunAccTest)}，海淀旬检验 ${pct(haidian.metrics.xunAccTest)}，天河旬检验 ${pct(tianhe.metrics.xunAccTest)}。事项门星神基础分按全国区县平均 |β| 信度与旬准确率尺度重新分配，符号仍依刘伯温人事吉凶。各省与样例区县权重见第 6 章；十二气候区仅作对照；事项基础分改写见第 7 章；十二类事项用神、偏置、格局、人事方位求签与一份完整数值算例见第 8–11 章。

关键词：奇门遁甲；加性分值；十二类事项；逻辑回归；softmax；NOAA CPC；区县独立训练

Abstract. Twelve everyday event classes and rainfall share one scoring map: P = sigmoid(S/22). Event luck is an additive score on the yong-shen palace (god / star / gate + biases + ganzhi + patterns), mixed with phase weights 0.25/0.35/0.40/0.55. One Bernoulli logistic weather model is trained per China district on NOAA CPC daily precipitation bilinearly interpolated to the administrative centroid, ${D.start} to ${D.end} (${D.nDays.toLocaleString()} days × ${D.nDistricts.toLocaleString()} districts = ${D.nTotalSamples.toLocaleString()} samples). Mean xun-scale accuracy is ${pct(D.meanXunAcc)}; this paper does not claim 90%. Gate/star/god bases are rescaled by nationwide |β| reliability without copying rain signs into career or wealth. Full per-district coefficients are in the accompanying JSON; this thesis tabulates all provinces and eight sample districts.

---

## 第 1 章 绪论

### 1.1 问题

1. 事项吉凶与天气能否写成同一套加性分值，再用同一 sigmoid 变成百分比？
2. 十二类日常事项各自的用神、偏置、格局权重、阶段加权公式是什么？每一步的数值如何从盘面算到百分比？
3. 把训练窗口扩到 2020–2026 后，中国每个省每个市每个区县各自的逻辑回归权重如何产生，检验准确率是多少？
4. 天气 β 如何回头调整八门、九星、八神的人事基础分，而不把「雨」误写成「凶」？
5. 每个权重从古法先验到梯度下降再到四舍五入，中间每一步的数值是什么？

### 1.2 范围

- 人事分值是辅助决策，不是因果推断。
- 天气模型是 CPC 日降水场上的统计对照，不替代 ECMWF / CMA。
- 全国区县旬准确率均值如实报告为 ${pct(D.meanXunAcc)}，有雨日值检验 ${pct(D.meanRainAccTest)}；不虚报 90%。十二气候区对照中广州旬检验 ${pct(gz.metrics.xunAccTest)}、海口旬训练 ${pct(hk.metrics.xunAccTrain)} 仍可单独查看。

### 1.3 技术路线

排盘 → 事项按用神取宫，神星门+偏置+干支格局加权得 S → P=σ(S/22)。天气：坎宫 31 维 one-hot 与三角特征（全国共用 X）→ 每个区县用自己的日降水标签 y 独立逻辑回归学 w、b → S=22(b+w⊤x) → 同一 P。事项基础分改为全国区县天气校准后的门星神表。

---

## 第 2 章 文献与古法依据

测天：玄武主雨，腾蛇主雷，白虎主风，九天主晴，九地主雾湿。人事：神始、星中、门终；开休生为吉门。标准文本为明刘基《奇门遁甲秘笈大全》《烟波钓叟歌》、程道生《遁甲演义》。气象统计以 Wilks 的逻辑回归与 Hastie 的多项 logit 为方法来源。区县标签为 NOAA CPC Unified Gauge 全球日降水（Xie 等），按各区行政中心双线性插值；十二气候区对照仍用 Open-Meteo / ERA5。

转盘拆补法：值符值使随时家而飞，八门、九星同环。坎一宫为水、为北，故测天用神固定取坎。天禽寄坤二宫，坎宫 one-hot 中「星_天禽」恒为 0，见第 6 章各区该行。又因八门与九星同宫而飞，坎宫上门、星 one-hot 近乎共线（休门↔天蓬，死门↔天芮，等），故两列 β 接近，人事侧仍分别赋权，因为事项用神宫可以取到天禽寄宫。

---

## 第 3 章 统一分值与数学模型

事项与天气共用加性分值。事项：

\\\\[ S = w_{神} + w_{星} + w_{门} + w_{辅},\\qquad P=\\frac{1}{1+e^{-S/22}} \\\\]

天气把同一变换写成因变量为「有雨」的线性逻辑回归：

\\\\[ z = b + w^{\\top} x,\\qquad p=\\sigma(z)=\\frac{1}{1+e^{-z}},\\qquad S=22\\,z \\\\]

于是 P_事项(S) 与 P_有雨(z) 是同一函数：界面都显示 4%–96% 的百分比。分值刻度 22 来自事项经验：|S|≈42 约对应大吉/大凶边界，σ(42/22)≈87%。事项 S 的内部构成（用神、偏置、阶段加权 0.25/0.35/0.40/0.55）见第 8–11 章，不是简单的神+星+门四项相加。

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

十二区各自独立跑上述循环，不共享 w（截距必须吸收当地雨日基线，例如海口雨日比 ${pct(hk.rainRate)}，哈尔滨 ${pct(W.regions[0].rainRate)}）。全国区县训练把同一循环并行到 ${D.nDistricts} 个 y 向量：X 仍是 ${D.nTrainDays}×31，Y 是 ${D.nTrainDays}×${D.nDistricts}，一次矩阵梯度同时更新所有区县的 w、b。

### 4.4 参数量

每区县 Bernoulli：31 + 1 = 32。每区县 softmax：3×(31+1)=96。每区县合计 128。${D.nDistricts} 区县合计 ${D.nDistricts * 128} 个自由参数。训练样本 ${D.nDistricts}×${D.nTrainDays}=${D.nDistricts * D.nTrainDays}，约 ${(D.nDistricts * D.nTrainDays / (D.nDistricts * 128)).toFixed(1)} 条/参数。十二气候区对照另有 1,536 个参数，见 6.9 节。

---

## 第 5 章 数据、标签与样本数量

主数据：NOAA CPC Unified Gauge 全球日降水（0.5°），按区县行政中心双线性插值到点。引用：${D.source}。Open-Meteo 历史接口在全国拉取时触发 429，故区县训练改用一次下载的 CPC 年文件，避免伪造逐区噪声。CPC 原生分辨率 0.5°，相邻区县序列高度相关，但每区单独拟合 (w, b)，不共享。

时段 ${D.start}–${D.end}（2026 年 CPC 文件止于 08-27）。切分以日历为准，禁止随机打乱，以免未来节气泄漏。

- 有雨：日降水量 ≥ 0.1 mm。
- 旬雨势：连续十日中雨日 ≥ 5。
- 三项（无 WMO 码）：晴 p<0.1 mm；阴 0.1≤p<5；雨 p≥5 mm。

区县 ${D.nDistricts}，日 ${D.nDays}，总样本 ${D.nTotalSamples.toLocaleString()}。训练 ${D.nDistricts}×${D.nTrainDays}=${(D.nDistricts * D.nTrainDays).toLocaleString()} 条，检验 ${D.nDistricts}×${D.nTestDays}=${(D.nDistricts * D.nTestDays).toLocaleString()} 条。

排盘特征全国共用（历法相同），标签按区县不同，因此 X 只排一次 ${D.nDays}×31，再对 ${D.nDistricts} 组 y 分别回归。

十二气候区对照数据仍为 Open-Meteo / ERA5，样本表：

${regionSummaryTable()}

---

## 第 6 章 全国区县最终训练结果与完整权重

方法：${D.method}

机器学习：${D.ml.primary}；${D.ml.auxiliary}；优化器 ${D.ml.optimizer}；epochs=${D.ml.epochs}（softmax 80）；η=${D.ml.learningRate}；λ=${D.ml.l2}；P=σ(S/22)，S=22(b+w⊤x)。

全国旬准确率均值 ${pct(D.meanXunAcc)}，有雨日值检验均值 ${pct(D.meanRainAccTest)}。不把任何省份改写成 90%。最强特征普遍是年积日 cos（气候学季节项），奇门 one-hot 提供区内增量。

### 6.0 分省汇总

${provinceTable()}

${D.nDistricts} 套完整 31 维权重无法全部排进 Word（约 ${D.nDistricts}×32 行）。软件实际使用的全部系数在管理员下载的 qimen-district-weights-2020-2026.json。下文给出八个样例区县的完整 β，覆盖东南沿海、华北、华南、西南、东北、海南、高原。

主模型

\\\\[ z = b + \\sum_{j=1}^{31} w_j x_j,\\quad S=22z,\\quad P=\\sigma(S/22) \\\\]

${sampleDistrictChapters()}

### 6.9 全国区县平均 logit（用于第 7 章事项信度）

${mdTable([
	"特征",
	"平均 logit β̄",
	"分值 22β̄"
], D.pooledLogit.map((f) => [
	f.name,
	n4(f.logit),
	n3(f.score)
]))}

### 6.10 十二气候区对照（Open-Meteo / ERA5）

以下十二区不是运行时天气模型，仅保留为方法对照。运行时选点浙江省温州市瓯海区与北京市海淀区使用各自区县权重，不再落入同一「华东」或「华北」模型。

全国对照旬均值 ${pct(W.eventCalibration.meanXunAcc)}。广州旬检验 ${pct(gz.metrics.xunAccTest)}、海口旬训练 ${pct(hk.metrics.xunAccTrain)}。

${crossRegionKeyTable()}

${allRegionChapters()}

---

## 第 7 章 事项权重如何被天气改写

事项不能直接用雨的符号：玄武主雨在气象上可为正，人事上玄武仍是盗神。因此只借用 |β| 当「这个符号在可观测的天气残差里有多稳定」，再去缩放刘伯温先验的幅度，符号不翻转。

### 7.1 公式

记经典先验为 w0（见 constants.ts 中 GATE_BASE / GOD_BASE / STAR_BASE，来自《秘笈》开休生吉、死惊伤凶等）。全国 ${D.nDistricts} 个区县平均系数为

\\\\[ \\bar\\beta_k = \\frac{1}{${D.nDistricts}}\\sum_{r=1}^{${D.nDistricts}} w_{r,k} \\\\]

中位数 med = median_k |β̄_k| = ${n4(med)}。信度

\\\\[ r_k = \\mathrm{clip}\\Big(0.75 + 0.5\\frac{|\\bar\\beta_k|}{3\\,\\mathrm{med}},\\ 0.55,\\ 1.35\\Big) \\\\]

全国旬准确率尺度

\\\\[ g = 0.92 + 0.16\\,\\bar a_{旬} = 0.92 + 0.16\\times ${n4(EVENT_CALIBRATION.meanXunAcc)} = ${n4(EVENT_CALIBRATION.globalScale)} \\\\]

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

${mdTable([
	"类",
	"名",
	"最终权重"
], [
	...Object.entries(EVENT_CALIBRATION.god).map(([k, v]) => [
		"八神",
		k,
		String(v)
	]),
	...Object.entries(EVENT_CALIBRATION.gate).map(([k, v]) => [
		"八门",
		k,
		String(v)
	]),
	...Object.entries(EVENT_CALIBRATION.star).map(([k, v]) => [
		"九星",
		k,
		String(v)
	])
])}

事项百分比仍为 P=σ(S/22)，与天气同一变换。例如求财遇生门 ${EVENT_CALIBRATION.gate["生门"]} 分、死门 ${EVENT_CALIBRATION.gate["死门"]} 分，再加事项偏置、星神与格局辅项后按第 8 章加权过 sigmoid。

${eventChapters()}

---

## 第 13 章 结论

1. 十二类日常事项与天气已统一为 S 与 P=σ(S/22)，界面都以分值与百分比同时给出。
2. 事项算法是可加评分而非黑箱：用神取宫、基础分、十二类偏置、干支、长生、月令、格局、阶段权重 0.25/0.35/0.40/0.55 全部在第 8–11 章列表导出，并附一份真实起盘的逐步算例。
3. 2020–2026、全国 ${D.nDistricts} 区县、${D.nTotalSamples.toLocaleString()} 条样本上的 L2 逻辑回归按区县独立训练；各省汇总与八个样例区县完整权重写入第 6 章，其余区县见 JSON。
4. 事项门星神基础分已按全国区县天气 |β| 信度与旬准确率尺度更新，逐步计算见第 7 章；偏置 δ 与格局表不随天气改写。
5. 全国旬准确率均值 ${pct(D.meanXunAcc)}，有雨日值检验 ${pct(D.meanRainAccTest)}，本文不虚报 90%。
6. 年积日 cos 是天气最强特征，说明气候学季节项必须显式放入，否则会把夏天的雨算进玄武。
7. 人事没有逐日吉凶标签，故事项不能再做一次逻辑回归；天气回归只约束基础分尺度。
8. 选点换区即换模型：瓯海与海淀、天河各自有独立 (w, b)。

---

## 参考文献

[1] 刘基（伯温）. 奇门遁甲总序；奇门遁甲秘笈大全. 题明洪武四年。

[2] 程道生. 遁甲演义. 明；文渊阁四库全书本.

[3] 烟波钓叟赋（奇门经典赋文，诸本互校）.

[4] 张志春. 神奇之门. 北京：中国文联出版社，2003.

[5] Hersbach, H., Bell, B., Berrisford, P., et al. (2020). The ERA5 global reanalysis. Q. J. R. Meteorol. Soc., 146, 1999–2049.

[6] Zippenfenig, P. (2023). Open-Meteo.com Weather API. Zenodo. https://doi.org/10.5281/zenodo.7970649

[6a] Xie, P., Chen, M., Yang, S., et al. CPC Unified Gauge-Based Analysis of Global Daily Precipitation. NOAA PSL.

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

- 区县日值标签：NOAA CPC precip.YYYY.nc，${D.start}–${D.end}，按区县中心双线性插值
- 区县最终模型：qimen-district-weights-2020-2026.json（${D.nCells} 套 scoreModel.w/b 与 daily3.w/b，以及 eventCalibration）
- 十二气候区对照：weather-regions.json / weather-weights.json
- 训练脚本：全批 GD，epochs=${D.ml.epochs}，η=${D.ml.learningRate}，λ=${D.ml.l2}
- 公式：P = 1/(1+exp(-S/22))，S = 22*(b + w·x)
- 机器学习：Bernoulli logistic regression + multinomial softmax
- 事项公式：S_raw = 0.25 S始 + 0.35 S中 + 0.40 S终 + 0.55 S辅，P = 1/(1+exp(-S/22))
- 事项模型导出：十二类用神、偏置、格局、算例见第 8–11 章；JSON 字段与 EVENT_MODEL_SPEC 一致（events、bases、patterns、sampleEvents）
- 人事：S人 = round(clip(0.45(门+星+神)+附加+合冲, −80, 80))
- 方位：宜门 +16，忌门 −16，再加神星空亡迫墓
- 求签：数根定局，168→6

## 附录 B 声明

本文是软件内置研究说明，用于公开训练数据、模型与误差，不构成学位授予，也不构成对具体日期天气或人事的保证。

## 附录 C 事项模型导出字段

EVENT_MODEL_SPEC 含：scoreScale=${EVENT_MODEL_SPEC.scoreScale}；phaseWeights 始/中/终/辅 = ${EVENT_MODEL_SPEC.phaseWeights.start}/${EVENT_MODEL_SPEC.phaseWeights.process}/${EVENT_MODEL_SPEC.phaseWeights.end}/${EVENT_MODEL_SPEC.phaseWeights.aux}；events ${EVENT_MODEL_SPEC.events.length} 类；patterns ${EVENT_MODEL_SPEC.patterns.length} 条；sampleJu「${EVENT_MODEL_SPEC.sampleJu}」。下载的 JSON 与论文表格同一数据源，避免手抄误差。
`;
var enc = new TextEncoder();
function crc32(buf) {
	let c = 4294967295;
	for (let i = 0; i < buf.length; i++) {
		c ^= buf[i];
		for (let k = 0; k < 8; k++) c = c >>> 1 ^ 3988292384 & -(c & 1);
	}
	return (c ^ 4294967295) >>> 0;
}
function u16(n) {
	const b = /* @__PURE__ */ new Uint8Array(2);
	new DataView(b.buffer).setUint16(0, n, true);
	return b;
}
function u32(n) {
	const b = /* @__PURE__ */ new Uint8Array(4);
	new DataView(b.buffer).setUint32(0, n, true);
	return b;
}
function zipStore(files) {
	const locals = [];
	const centrals = [];
	let offset = 0;
	for (const f of files) {
		const name = enc.encode(f.name);
		const crc = crc32(f.data);
		const local = concat(u32(67324752), u16(20), u16(0), u16(0), u16(0), u16(0), u32(crc), u32(f.data.length), u32(f.data.length), u16(name.length), u16(0), name, f.data);
		locals.push(local);
		centrals.push(concat(u32(33639248), u16(20), u16(20), u16(0), u16(0), u16(0), u16(0), u32(crc), u32(f.data.length), u32(f.data.length), u16(name.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset), name));
		offset += local.length;
	}
	const central = concat(...centrals);
	const eocd = concat(u32(101010256), u16(0), u16(0), u16(files.length), u16(files.length), u32(central.length), u32(offset), u16(0));
	return concat(...locals, central, eocd);
}
function concat(...parts) {
	const n = parts.reduce((s, p) => s + p.length, 0);
	const out = new Uint8Array(n);
	let o = 0;
	for (const p of parts) {
		out.set(p, o);
		o += p.length;
	}
	return out;
}
function xml(s) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function run(text, opts) {
	const size = opts?.size ?? 24;
	const east = opts?.east ?? "宋体";
	const ascii = opts?.font ?? "Times New Roman";
	const rPr = [
		`<w:rFonts w:ascii="${ascii}" w:hAnsi="${ascii}" w:eastAsia="${east}" w:cs="${ascii}"/>`,
		`<w:sz w:val="${size}"/><w:szCs w:val="${size}"/>`,
		opts?.bold ? "<w:b/><w:bCs/>" : "",
		opts?.italic ? "<w:i/><w:iCs/>" : ""
	].join("");
	const pieces = [];
	const parts = text.split(/(`[^`]+`)/g);
	for (const part of parts) {
		if (!part) continue;
		if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
			const code = xml(part.slice(1, -1));
			pieces.push(`<w:r><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:eastAsia="宋体"/><w:sz w:val="${size}"/></w:rPr><w:t xml:space="preserve">${code}</w:t></w:r>`);
			continue;
		}
		pieces.push(`<w:r><w:rPr>${rPr}</w:rPr><w:t xml:space="preserve">${xml(part)}</w:t></w:r>`);
	}
	return pieces.join("");
}
function p(inner, extraPr = "") {
	return `<w:p><w:pPr>${extraPr}<w:spacing w:line="360" w:lineRule="auto"/></w:pPr>${inner}</w:p>`;
}
function parseBlocks(md) {
	const lines = md.replaceAll("\r\n", "\n").split("\n");
	const blocks = [];
	let para = [];
	let table = null;
	const flush = () => {
		const t = para.join(" ").trim();
		para = [];
		if (t) blocks.push({
			type: "p",
			text: t
		});
	};
	const flushTable = () => {
		if (!table?.length) {
			table = null;
			return;
		}
		const rows = table.filter((r) => !r.every((c) => /^[-:]+$/.test(c)));
		table = null;
		if (rows.length) blocks.push({
			type: "table",
			text: "",
			rows
		});
	};
	const isTableLine = (line) => {
		const t = line.trim();
		return t.startsWith("|") && t.includes("|", 1);
	};
	const splitRow = (line) => {
		return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
	};
	for (const raw of lines) {
		const line = raw.trimEnd();
		if (isTableLine(line)) {
			flush();
			table = table ?? [];
			table.push(splitRow(line));
			continue;
		}
		if (table) flushTable();
		if (line.startsWith("# ")) {
			flush();
			continue;
		}
		if (line.startsWith("## ")) {
			flush();
			blocks.push({
				type: "h1",
				text: line.slice(3).trim()
			});
			continue;
		}
		if (line.startsWith("### ")) {
			flush();
			blocks.push({
				type: "h2",
				text: line.slice(4).trim()
			});
			continue;
		}
		if (line.trim() === "---") {
			flush();
			continue;
		}
		if (/^[-*]\s+/.test(line.trim())) {
			flush();
			blocks.push({
				type: "li",
				text: line.trim().replace(/^[-*]\s+/, "")
			});
			continue;
		}
		if (/^\d+\.\s+/.test(line.trim())) {
			flush();
			blocks.push({
				type: "ol",
				text: line.trim().replace(/^\d+\.\s+/, "")
			});
			continue;
		}
		if (line.trim() === "") {
			flush();
			continue;
		}
		para.push(line.trim());
	}
	if (table) flushTable();
	flush();
	return blocks;
}
function formulaXml(src) {
	return p(run(src.replaceAll("\\mathrm{", "").replaceAll("\\mid", "|").replaceAll("{", "").replaceAll("}", "").replaceAll("\\", "").trim(), {
		italic: true,
		size: 24
	}), `<w:jc w:val="center"/>`);
}
function tableXml(rows) {
	if (!rows.length) return "";
	const cols = Math.max(...rows.map((r) => r.length));
	const header = rows[0];
	const body = rows.slice(1);
	const borders = [
		"top",
		"left",
		"bottom",
		"right",
		"insideH",
		"insideV"
	].map((k) => `<w:${k} w:val="single" w:sz="4" w:space="0" w:color="666666"/>`).join("");
	const cell = (text, headerCell) => {
		return `<w:tc><w:tcPr><w:tcW w:w="0" w:type="auto"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:spacing w:before="20" w:after="20" w:line="240" w:lineRule="auto"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体"/><w:sz w:val="16"/><w:szCs w:val="16"/>${headerCell ? "<w:b/><w:bCs/>" : ""}</w:rPr><w:t xml:space="preserve">${xml(text)}</w:t></w:r></w:p></w:tc>`;
	};
	const tr = (row, headerRow) => {
		return `<w:tr>${Array.from({ length: cols }, (_, i) => cell(row[i] ?? "", headerRow)).join("")}</w:tr>`;
	};
	return `<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblBorders>${borders}</w:tblBorders><w:tblLayout w:type="autofit"/><w:tblLook w:val="04A0"/></w:tblPr>${tr(header, true)}${body.map((r) => tr(r, false)).join("")}</w:tbl><w:p><w:pPr><w:spacing w:after="120"/></w:pPr></w:p>`;
}
function bodyXml(md) {
	const chunks = [];
	chunks.push(p(run("博士学位论文（学习用研究报告）", {
		east: "黑体",
		size: 28,
		bold: true
	}), `<w:jc w:val="center"/>`));
	chunks.push(p(run(PAPER_TITLE, {
		east: "黑体",
		size: 36,
		bold: true
	}), `<w:jc w:val="center"/>`));
	chunks.push(p(run("学科：应用统计学 / 中国术数文献的可计算建模    中国区县独立天气模型    数据：2020-01-01 至 2026-08-27", { size: 21 }), `<w:jc w:val="center"/>`));
	chunks.push(`<w:p><w:pPr><w:spacing w:before="240" w:after="240"/></w:pPr></w:p>`);
	for (const b of parseBlocks(md)) {
		if (b.type === "table" && b.rows) {
			chunks.push(tableXml(b.rows));
			continue;
		}
		const math = b.text.match(/^\\\[([\s\S]+)\\\]$/);
		if (math) {
			chunks.push(formulaXml(math[1]));
			continue;
		}
		if (b.text.includes("\\[")) {
			const split = b.text.split(/\\\[|\\\]/);
			for (let i = 0; i < split.length; i++) {
				const t = split[i].trim();
				if (!t) continue;
				if (i % 2 === 1) chunks.push(formulaXml(t));
				else chunks.push(p(run(t, { size: 24 }), `<w:ind w:firstLine="480"/>`));
			}
			continue;
		}
		if (b.type === "h1") {
			chunks.push(p(run(b.text, {
				east: "黑体",
				size: 32,
				bold: true
			}), `<w:outlineLvl w:val="0"/><w:spacing w:before="360" w:after="120"/>`));
			continue;
		}
		if (b.type === "h2") {
			chunks.push(p(run(b.text, {
				east: "黑体",
				size: 28,
				bold: true
			}), `<w:outlineLvl w:val="1"/><w:spacing w:before="240" w:after="80"/>`));
			continue;
		}
		if (b.type === "li") {
			chunks.push(p(run("· " + b.text, { size: 24 }), `<w:ind w:left="420"/>`));
			continue;
		}
		if (b.type === "ol") {
			chunks.push(p(run(b.text, { size: 24 }), `<w:ind w:left="420" w:firstLine="0"/>`));
			continue;
		}
		const isKw = b.text.startsWith("关键词") || b.text.startsWith("Abstract.");
		chunks.push(p(run(b.text, {
			size: 24,
			italic: b.text.startsWith("Abstract.")
		}), isKw ? "" : `<w:ind w:firstLine="480"/>`));
	}
	chunks.push(`<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1800" w:header="720" w:footer="720"/></w:sectPr>`);
	return chunks.join("");
}
var CONTENT_TYPES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>`;
var RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;
var DOC_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
var STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体" w:cs="Times New Roman"/>
        <w:sz w:val="24"/><w:szCs w:val="24"/>
        <w:lang w:val="en-US" w:eastAsia="zh-CN"/>
      </w:rPr>
    </w:rPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:qFormat/>
  </w:style>
</w:styles>`;
var THESIS_DOCX_NAME = "qimen-twelve-regions-2020-2026-thesis.docx";
function thesisDocxBytes(md = PAPER_MD) {
	const document = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>${bodyXml(md)}</w:body>
</w:document>`;
	return zipStore([
		{
			name: "[Content_Types].xml",
			data: enc.encode(CONTENT_TYPES)
		},
		{
			name: "_rels/.rels",
			data: enc.encode(RELS)
		},
		{
			name: "word/_rels/document.xml.rels",
			data: enc.encode(DOC_RELS)
		},
		{
			name: "word/styles.xml",
			data: enc.encode(STYLES)
		},
		{
			name: "word/document.xml",
			data: enc.encode(document)
		}
	]);
}
function downloadThesisDocx() {
	const bytes = thesisDocxBytes();
	const copy = new Uint8Array(bytes.byteLength);
	copy.set(bytes);
	const blob = new Blob([copy], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
	const a = document.createElement("a");
	a.href = URL.createObjectURL(blob);
	a.download = THESIS_DOCX_NAME;
	a.click();
	URL.revokeObjectURL(a.href);
}
//#endregion
export { downloadThesisDocx as a, district_summary_default as i, PAPER_MD as n, PAPER_TITLE as r, EVENT_MODEL_SPEC as t };
