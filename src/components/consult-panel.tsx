import { useEffect, useMemo, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { extractSymbolPack } from "@/lib/qimen/extract";
import {
  displayEvent,
  isPlaceSubject,
  subjectName,
  subjectPrompt,
  subjectScope,
  visibleEventIds,
} from "@/lib/qimen/subject";
import { composeAssociation, consultChart, type ConsultCompose } from "@/lib/server/consult";
import { useAppStore } from "@/lib/store";
import { CareerSwitch } from "@/components/career-switch";
import { stripModelMarkup } from "@/lib/text";
import type { EventScore, QimenChart } from "@/lib/qimen/types";
import { cn } from "@/lib/utils";

function toneOf(level: string): "good" | "bad" | "warn" | "neutral" {
  if (level.includes("吉")) return "good";
  if (level.includes("凶")) return "bad";
  return "warn";
}

function SceneCard({ scene, place }: { scene: ConsultCompose; place?: boolean }) {
  return (
    <article className="rounded-lg border border-border bg-surface p-3 sm:p-4">
      <p className="text-sm leading-7 text-fg">{scene.scene || scene.content}</p>
      <div className="fit-phases mt-3">
        {[
          ["时间", scene.time],
          ["地点", scene.place],
          [place ? "人事" : "人物", scene.people],
        ].map(([k, v]) =>
          v ? (
            <div key={k} className="rounded-md border border-border bg-elevated p-2.5">
              <p className="text-[11px] text-subtle">{k}</p>
              <p className="mt-1 text-xs leading-5 text-fg">{v}</p>
            </div>
          ) : null,
        )}
      </div>
      {scene.content ? (
        <p className="mt-3 text-sm leading-6 text-muted">
          <span className="text-fg">事情　</span>
          {scene.content}
        </p>
      ) : null}
      {scene.expansion.length ? (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-xs leading-5 text-muted">
          {scene.expansion.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      ) : null}
      {scene.caution ? <p className="mt-3 text-xs leading-5 text-subtle">{scene.caution}</p> : null}
    </article>
  );
}

export function ComposeBox({
  chart,
  score,
}: {
  chart: QimenChart;
  score: EventScore;
}) {
  const personName = useAppStore((s) => s.personName);
  const gender = useAppStore((s) => s.gender);
  const province = useAppStore((s) => s.province);
  const city = useAppStore((s) => s.city);
  const district = useAppStore((s) => s.district);
  const subjectKind = useAppStore((s) => s.subjectKind);
  const careerTrack = useAppStore((s) => s.careerTrack);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [scene, setScene] = useState<ConsultCompose | null>(null);

  const loc = { personName, province, city, district };
  const who = subjectName(subjectKind, loc);
  const scope = subjectScope(subjectKind, loc);
  const subLine = subjectPrompt(subjectKind, who, scope);

  const pack = useMemo(
    () =>
      extractSymbolPack(chart, chart.palaces[score.palaceId], score.eventId, score.level, {
        subjectLine: subLine,
        eventTitle: score.name,
      }),
    [chart, score.palaceId, score.eventId, score.level, score.name, subLine],
  );

  const onCompose = async () => {
    setBusy(true);
    setErr(null);
    try {
      const r = await composeAssociation({
        data: {
          question: `请就「${score.name}」根据盘面象征库，围绕「${who}」联想一件最合理的具体事情。`,
          eventName: score.name,
          level: score.level,
          score: score.score,
          pack: pack.prompt,
          brief: pack.brief,
          person: personName.trim() || undefined,
          gender,
          location: scope,
          subjectLine: subLine,
        },
      });
      if (!r.ok) setErr(r.error);
      else setScene(r.result);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "智断暂时不可用");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-4 rounded-lg border border-border bg-elevated p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-display text-sm text-fg">智断联想</p>
        <Button type="button" size="sm" onClick={onCompose} disabled={busy}>
          {busy ? "推演中" : scene ? "再推一象" : "组合成一件事"}
        </Button>
      </div>
      <p className="mt-1 text-[11px] leading-5 text-subtle">
        先从象征库按吉凶取词，再交给模型组合成相对具体的时间、地点、人物、事情。供学习，并非实录。
      </p>
      {err ? <p className="mt-2 text-xs text-inauspicious-fg">{err}</p> : null}
      {scene ? <div className="mt-3">{<SceneCard scene={scene} place={isPlaceSubject(subjectKind)} />}</div> : null}
    </div>
  );
}

export function ConsultPanel({
  chart,
  events,
  focus,
}: {
  chart: QimenChart;
  events: EventScore[];
  focus: EventScore;
}) {
  const personName = useAppStore((s) => s.personName);
  const gender = useAppStore((s) => s.gender);
  const eventId = useAppStore((s) => s.eventId);
  const setField = useAppStore((s) => s.setField);
  const province = useAppStore((s) => s.province);
  const city = useAppStore((s) => s.city);
  const district = useAppStore((s) => s.district);
  const subjectKind = useAppStore((s) => s.subjectKind);
  const careerTrack = useAppStore((s) => s.careerTrack);
  const score = events.find((e) => e.eventId === eventId) ?? focus;
  const loc = { personName, province, city, district };
  const who = subjectName(subjectKind, loc);
  const scope = subjectScope(subjectKind, loc);
  const subLine = subjectPrompt(subjectKind, who, scope);
  const pack = useMemo(
    () =>
      extractSymbolPack(chart, chart.palaces[score.palaceId], score.eventId, score.level, {
        subjectLine: subLine,
        eventTitle: score.name,
      }),
    [chart, score.palaceId, score.eventId, score.level, score.name, subLine],
  );
  const [question, setQuestion] = useState(`就「${who}」的「${score.name}」可能发生什么具体的事？`);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [scene, setScene] = useState<ConsultCompose | null>(null);
  const [chat, setChat] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuestion(`就「${who}」的「${score.name}」可能发生什么具体的事？`);
    setScene(null);
    setChat([]);
    setErr(null);
  }, [who, score.name, subjectKind, careerTrack]);

  useEffect(() => {
    if (scene || chat.length) resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [scene, chat.length]);

  const onCompose = async () => {
    setBusy(true);
    setErr(null);
    try {
      const r = await composeAssociation({
        data: {
          question: question.trim() || `请就「${score.name}」围绕「${who}」联想一件最合理的具体事情。`,
          eventName: score.name,
          level: score.level,
          score: score.score,
          pack: pack.prompt,
          brief: pack.brief,
          person: personName.trim() || undefined,
          gender,
          location: scope,
          subjectLine: subLine,
        },
      });
      if (!r.ok) setErr(r.error);
      else setScene(r.result);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "智断暂时不可用");
    } finally {
      setBusy(false);
    }
  };

  const onAsk = async () => {
    const q = question.trim();
    if (!q) return;
    setBusy(true);
    setErr(null);
    const next = [...chat, { role: "user" as const, content: q }];
    setChat(next);
    try {
      const r = await consultChart({
        data: {
          question: q,
          pack: pack.prompt,
          brief: pack.brief,
          history: chat,
          person: personName.trim() || undefined,
          location: scope,
          subjectLine: subLine,
        },
      });
      if (!r.ok) {
        setErr(r.error);
        setChat(chat);
      } else {
        setChat([...next, { role: "assistant", content: stripModelMarkup(r.text) }]);
        setQuestion("");
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "智断暂时不可用");
      setChat(chat);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-display text-lg text-fg">智断咨询</h2>
        <p className="text-xs text-muted">
          对象是「{who}」。先从象征库抽词，再组合成一件最合理的事。追问用纯文本，不用井号星号。供学习，并非定论。
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={toneOf(score.level)}>{score.name}</Badge>
        <Badge>
          {score.score > 0 ? "+" : ""}
          {score.score} · {score.level}
        </Badge>
        <Badge>{who}</Badge>
      </div>

      <div>
        <p className="text-xs text-muted">用神宫已提取的符号</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {pack.tokens.map((t) => (
            <Badge key={`${t.kind}-${t.name}`} tone="warn">
              {t.name}
            </Badge>
          ))}
        </div>
        <p className="mt-2 text-[11px] leading-5 text-subtle">
          人物 {pack.people.slice(0, 6).join("、")}　地点 {pack.places.slice(0, 6).join("、")}
        </p>
      </div>

      <label className="flex flex-col gap-1 text-xs text-muted">
        所问之事
        <div className="flex items-center gap-2">
          <select
            value={visibleEventIds(careerTrack).includes(score.eventId) ? score.eventId : careerTrack === "study" ? "study" : "career"}
            onChange={(e) => {
              setField("eventId", e.target.value as typeof eventId);
              const name = displayEvent(e.target.value as typeof eventId, subjectKind, careerTrack).name;
              setQuestion(`就「${who}」的「${name}」可能发生什么具体的事？`);
            }}
            className="h-11 min-w-0 flex-1 rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
          >
            {visibleEventIds(careerTrack).map((id) => (
              <option key={id} value={id}>
                {displayEvent(id, subjectKind, careerTrack).name}
              </option>
            ))}
          </select>
          <CareerSwitch />
        </div>
      </label>

      <label className="flex flex-col gap-1 text-xs text-muted">
        咨询内容
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value.slice(0, 400))}
          rows={3}
          className="w-full rounded-md border border-border bg-elevated px-3 py-2 text-sm text-fg outline-none focus:border-ring"
          placeholder="可写具体问题，如：本周回款会不会到、见谁、在何处"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={onCompose} disabled={busy} className="min-w-0 flex-1">
          <Sparkles className="size-4" />
          {busy ? "推演中" : "联想一件具体的事"}
        </Button>
        <Button type="button" variant="secondary" onClick={onAsk} disabled={busy || !question.trim()} className="min-w-0 flex-1">
          {busy ? "请稍候" : "追问盘面"}
        </Button>
      </div>
      {err ? <p className="text-xs text-inauspicious-fg">{err}</p> : null}

      <div ref={resultRef} className="flex flex-col gap-3">
      {scene ? <SceneCard scene={scene} place={isPlaceSubject(subjectKind)} /> : null}

      {chat.length ? (
        <ul className="flex flex-col gap-2">
          {chat.map((m, i) => (
            <li
              key={`${m.role}-${i}`}
              className={cn(
                "rounded-md border px-3 py-2 text-sm leading-6",
                m.role === "user" ? "border-border bg-elevated text-fg" : "border-border bg-surface text-muted",
              )}
            >
              <p className="text-[11px] text-subtle">{m.role === "user" ? "问" : "断"}</p>
              <p className="mt-1 whitespace-pre-wrap">{m.content}</p>
            </li>
          ))}
        </ul>
      ) : null}
      </div>
    </div>
  );
}
