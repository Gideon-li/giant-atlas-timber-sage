import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/consult-Ch91_E99.js
var QWEN_BASE = "https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1";
var QWEN_MODEL = "qwen3.8-flash";
var FALLBACK_KEY = "sk-sp-H.DLPXYX.8dEa.MEYCIQD9PLJBWlSjpU3fST0yLg2oMGeFbNLx9JRWt0bR0YZ2jwIhAKSdg467g9FaluXCIuFKDAHw9tgWKmFyO4E6B-sdnTnm";
async function qwenChat(messages, opts) {
	const key = process.env.QWEN_API_KEY || process.env.DASHSCOPE_API_KEY || FALLBACK_KEY;
	if (!key) return {
		ok: false,
		error: "智断服务未配置"
	};
	const res = await fetch(`${QWEN_BASE}/chat/completions`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${key}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			model: QWEN_MODEL,
			messages,
			max_tokens: opts?.maxTokens ?? 700,
			temperature: .7,
			enable_thinking: false,
			...opts?.json ? { response_format: { type: "json_object" } } : {}
		})
	});
	if (!res.ok) {
		const body = await res.text().catch(() => "");
		return {
			ok: false,
			error: `模型接口 ${res.status}${body ? "：" + body.slice(0, 120) : ""}`
		};
	}
	const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
	if (!text) return {
		ok: false,
		error: "模型没有返回文字"
	};
	return {
		ok: true,
		text
	};
}
function parseJsonObject(text) {
	const raw = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "");
	const start = raw.indexOf("{");
	const end = raw.lastIndexOf("}");
	if (start < 0 || end <= start) return null;
	try {
		const v = JSON.parse(raw.slice(start, end + 1));
		return v && typeof v === "object" && !Array.isArray(v) ? v : null;
	} catch {
		return null;
	}
}
var SYSTEM_COMPOSE = `你是奇门遁甲「联想断事」助手，不是算命实录。
规则：
1. 只能使用用户提供的象征库词条来组合一件最合理、相对具体的事情。
2. 必须包含时间、地点、人物、事情内容；可据象略作拓展，但不要引入库中没有的新象。
3. 吉则组吉象，凶则组凶象，平则写可成可不成的中间态。
4. 语气克制、文言白话夹用，像老师讲解，不要鸡汤，不要保证应验。
5. 只输出 JSON，字段：scene（一段总述），time，place，people，content，expansion（2-3条字符串），caution（一句提醒）。`;
var SYSTEM_CHAT = `你是奇门遁甲盘面咨询助手。依据用户给出的九宫摘要和象征库词条作答。
- 先点明用了哪些符号，再组合成相对具体的人事时空。
- 吉凶分说，不夸张，不保证。
- 若用户问的事与盘面用神不符，先说明用神在哪，再联想。
- 用中文，条理清楚，可分点。供学习，并非定论。`;
function clip(s, n) {
	return s.replace(/\s+/g, " ").trim().slice(0, n);
}
var composeAssociation_createServerFn_handler = createServerRpc({
	id: "11ece6034d50e158f69f94251efe632775481398c3e77775e6eb83ff59de5be5",
	name: "composeAssociation",
	filename: "src/lib/server/consult.ts"
}, (opts) => composeAssociation.__executeServer(opts));
var composeAssociation = createServerFn({ method: "POST" }).validator((d) => d).handler(composeAssociation_createServerFn_handler, async ({ data }) => {
	const question = clip(data.question || `请就「${data.eventName}」联想一件最可能发生的具体事情`, 400);
	const pack = clip(data.pack, 4500);
	const brief = clip(data.brief, 1200);
	const who = [data.person, data.gender === "female" ? "女" : data.gender === "male" ? "男" : ""].filter(Boolean).join("·");
	const loc = clip(data.location ?? "", 40);
	const user = [
		`问：${question}`,
		`事项 ${data.eventName}，分值 ${data.score > 0 ? "+" : ""}${data.score}，总断${data.level}。`,
		who ? `问事人：${who}` : "",
		loc ? `所在：${loc}` : "",
		`九宫摘要：${brief}`,
		pack
	].filter(Boolean).join("\n");
	const r = await qwenChat([{
		role: "system",
		content: SYSTEM_COMPOSE
	}, {
		role: "user",
		content: user
	}], {
		json: true,
		maxTokens: 700
	});
	if (!r.ok) return {
		ok: false,
		error: r.error
	};
	const obj = parseJsonObject(r.text);
	if (!obj) return {
		ok: false,
		error: "模型返回无法解析"
	};
	const expansion = Array.isArray(obj.expansion) ? obj.expansion.map((x) => String(x)).filter(Boolean).slice(0, 4) : [];
	const result = {
		scene: String(obj.scene ?? "").slice(0, 800),
		time: String(obj.time ?? "").slice(0, 120),
		place: String(obj.place ?? "").slice(0, 120),
		people: String(obj.people ?? "").slice(0, 120),
		content: String(obj.content ?? "").slice(0, 400),
		expansion,
		caution: String(obj.caution ?? "").slice(0, 200)
	};
	if (!result.scene && !result.content) return {
		ok: false,
		error: "模型没有给出事情"
	};
	return {
		ok: true,
		result
	};
});
var consultChart_createServerFn_handler = createServerRpc({
	id: "c3db7672ee45eee46948382584fc267f0f857f91a58e2923fc8af8c3b4878e37",
	name: "consultChart",
	filename: "src/lib/server/consult.ts"
}, (opts) => consultChart.__executeServer(opts));
var consultChart = createServerFn({ method: "POST" }).validator((d) => d).handler(consultChart_createServerFn_handler, async ({ data }) => {
	const question = clip(data.question, 400);
	if (!question) return {
		ok: false,
		error: "请先写下要问的事"
	};
	const pack = clip(data.pack, 4500);
	const brief = clip(data.brief, 1200);
	const history = (data.history ?? []).slice(-8).map((m) => ({
		role: m.role,
		content: clip(m.content, 1200)
	}));
	const header = [
		data.person ? `问事人：${clip(data.person, 40)}` : "",
		data.location ? `所在：${clip(data.location, 40)}` : "",
		`九宫摘要：${brief}`,
		pack
	].filter(Boolean).join("\n");
	const r = await qwenChat([
		{
			role: "system",
			content: SYSTEM_CHAT
		},
		{
			role: "user",
			content: header
		},
		{
			role: "assistant",
			content: "已记住当前盘面与象征库。请提问。"
		},
		...history,
		{
			role: "user",
			content: question
		}
	], { maxTokens: 800 });
	if (!r.ok) return {
		ok: false,
		error: r.error
	};
	return {
		ok: true,
		text: r.text.slice(0, 2500)
	};
});
//#endregion
export { composeAssociation_createServerFn_handler, consultChart_createServerFn_handler };
