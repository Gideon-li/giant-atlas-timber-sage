const QWEN_BASE = "https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1";
const QWEN_MODEL = "qwen3.8-flash";
const FALLBACK_KEY =
  "sk-sp-H.DLPXYX.8dEa.MEYCIQD9PLJBWlSjpU3fST0yLg2oMGeFbNLx9JRWt0bR0YZ2jwIhAKSdg467g9FaluXCIuFKDAHw9tgWKmFyO4E6B-sdnTnm";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function qwenChat(
  messages: ChatMessage[],
  opts?: { json?: boolean; maxTokens?: number },
): Promise<{ ok: true; text: string } | { ok: false; error: string }> {
  const key = process.env.QWEN_API_KEY || process.env.DASHSCOPE_API_KEY || FALLBACK_KEY;
  if (!key) return { ok: false, error: "智断服务未配置" };
  const res = await fetch(`${QWEN_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: QWEN_MODEL,
      messages,
      max_tokens: opts?.maxTokens ?? 700,
      temperature: 0.7,
      enable_thinking: false,
      ...(opts?.json ? { response_format: { type: "json_object" } } : {}),
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return { ok: false, error: `模型接口 ${res.status}${body ? "：" + body.slice(0, 120) : ""}` };
  }
  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = data.choices?.[0]?.message?.content?.trim() ?? "";
  if (!text) return { ok: false, error: "模型没有返回文字" };
  return { ok: true, text };
}

export function parseJsonObject(text: string): Record<string, unknown> | null {
  const raw = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "");
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    const v = JSON.parse(raw.slice(start, end + 1)) as unknown;
    return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}
