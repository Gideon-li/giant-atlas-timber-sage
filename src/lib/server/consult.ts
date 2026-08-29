import { createServerFn } from "@tanstack/react-start";
import { parseJsonObject, qwenChat } from "@/lib/qimen/qwen.server";

export type ConsultCompose = {
  scene: string;
  time: string;
  place: string;
  people: string;
  content: string;
  expansion: string[];
  caution: string;
};

export type ComposeInput = {
  question: string;
  eventName: string;
  level: string;
  score: number;
  pack: string;
  brief: string;
  person?: string;
  gender?: string;
  location?: string;
};

export type ChatInput = {
  question: string;
  pack: string;
  brief: string;
  history: { role: "user" | "assistant"; content: string }[];
  person?: string;
  location?: string;
};

const SYSTEM_COMPOSE = `你是奇门遁甲「联想断事」助手，不是算命实录。
规则：
1. 只能使用用户提供的象征库词条来组合一件最合理、相对具体的事情。
2. 必须包含时间、地点、人物、事情内容；可据象略作拓展，但不要引入库中没有的新象。
3. 吉则组吉象，凶则组凶象，平则写可成可不成的中间态。
4. 语气克制、文言白话夹用，像老师讲解，不要鸡汤，不要保证应验。
5. 只输出 JSON，字段：scene（一段总述），time，place，people，content，expansion（2-3条字符串），caution（一句提醒）。`;

const SYSTEM_CHAT = `你是奇门遁甲盘面咨询助手。依据用户给出的九宫摘要和象征库词条作答。
- 先点明用了哪些符号，再组合成相对具体的人事时空。
- 吉凶分说，不夸张，不保证。
- 若用户问的事与盘面用神不符，先说明用神在哪，再联想。
- 用中文，条理清楚，可分点。供学习，并非定论。`;

function clip(s: string, n: number) {
  return s.replace(/\s+/g, " ").trim().slice(0, n);
}

export const composeAssociation = createServerFn({ method: "POST" })
  .validator((d: ComposeInput) => d)
  .handler(async ({ data }) => {
    const question = clip(data.question || `请就「${data.eventName}」联想一件最可能发生的具体事情`, 400);
    const pack = clip(data.pack, 4500);
    const brief = clip(data.brief, 1200);
    const who = [data.person, data.gender === "female" ? "女" : data.gender === "male" ? "男" : ""]
      .filter(Boolean)
      .join("·");
    const loc = clip(data.location ?? "", 40);
    const user = [
      `问：${question}`,
      `事项 ${data.eventName}，分值 ${data.score > 0 ? "+" : ""}${data.score}，总断${data.level}。`,
      who ? `问事人：${who}` : "",
      loc ? `所在：${loc}` : "",
      `九宫摘要：${brief}`,
      pack,
    ]
      .filter(Boolean)
      .join("\n");
    const r = await qwenChat(
      [
        { role: "system", content: SYSTEM_COMPOSE },
        { role: "user", content: user },
      ],
      { json: true, maxTokens: 700 },
    );
    if (!r.ok) return { ok: false as const, error: r.error };
    const obj = parseJsonObject(r.text);
    if (!obj) return { ok: false as const, error: "模型返回无法解析" };
    const expansion = Array.isArray(obj.expansion)
      ? obj.expansion.map((x) => String(x)).filter(Boolean).slice(0, 4)
      : [];
    const result: ConsultCompose = {
      scene: String(obj.scene ?? "").slice(0, 800),
      time: String(obj.time ?? "").slice(0, 120),
      place: String(obj.place ?? "").slice(0, 120),
      people: String(obj.people ?? "").slice(0, 120),
      content: String(obj.content ?? "").slice(0, 400),
      expansion,
      caution: String(obj.caution ?? "").slice(0, 200),
    };
    if (!result.scene && !result.content) return { ok: false as const, error: "模型没有给出事情" };
    return { ok: true as const, result };
  });

export const consultChart = createServerFn({ method: "POST" })
  .validator((d: ChatInput) => d)
  .handler(async ({ data }) => {
    const question = clip(data.question, 400);
    if (!question) return { ok: false as const, error: "请先写下要问的事" };
    const pack = clip(data.pack, 4500);
    const brief = clip(data.brief, 1200);
    const history = (data.history ?? []).slice(-8).map((m) => ({
      role: m.role,
      content: clip(m.content, 1200),
    }));
    const header = [
      data.person ? `问事人：${clip(data.person, 40)}` : "",
      data.location ? `所在：${clip(data.location, 40)}` : "",
      `九宫摘要：${brief}`,
      pack,
    ]
      .filter(Boolean)
      .join("\n");
    const r = await qwenChat(
      [
        { role: "system", content: SYSTEM_CHAT },
        { role: "user", content: header },
        { role: "assistant", content: "已记住当前盘面与象征库。请提问。" },
        ...history,
        { role: "user", content: question },
      ],
      { maxTokens: 800 },
    );
    if (!r.ok) return { ok: false as const, error: r.error };
    return { ok: true as const, text: r.text.slice(0, 2500) };
  });
