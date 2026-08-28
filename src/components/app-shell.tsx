import { useEffect, useMemo, useState } from "react";
import { Compass, LayoutGrid, Users } from "lucide-react";
import { QueryForm } from "@/components/query-form";
import { QimenBoard } from "@/components/qimen-board";
import { EventDetail, EventList, PeoplePanel } from "@/components/event-panel";
import { useAppStore } from "@/lib/store";
import { beijingNow } from "@/lib/qimen/calendar";
import { cn } from "@/lib/utils";
import type { PalaceId } from "@/lib/qimen/types";

export function AppShell() {
  const [hydrated, setHydrated] = useState(false);
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

  useEffect(() => {
    const unsub = useAppStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
    if (useAppStore.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (civil.year === 2026 && civil.month === 8 && civil.day === 28 && civil.hour === 12) {
      setCivil(beijingNow());
    }
  }, [hydrated, civil.year, civil.month, civil.day, civil.hour, setCivil]);

  const result = useMemo(
    () => compute(),
    [civil, trueSolar, cityId, eventId, compute, personName, gender, birthYear, hydrated],
  );

  const { chart, events, focus, people } = result;

  const onSelectPalace = (id: PalaceId) => {
    setField("selectedPalace", selectedPalace === id ? null : id);
    setField("tab", "board");
  };

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="font-display text-xl tracking-wide text-fg">奇门权衡</p>
            <p className="text-xs text-muted">以数权衡时空 · 以盘决断人事</p>
          </div>
          <div className="hidden text-right text-xs text-subtle sm:block">
            <p>
              {chart.timeLabel} 北京时间 · {chart.hourName}
            </p>
            <p>
              {chart.pillars.year.name} {chart.pillars.month.name} {chart.pillars.day.name}{" "}
              {chart.pillars.hour.name}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-8">
        <QueryForm />

        <div className="mt-4 rounded-lg border border-border bg-elevated px-4 py-3 text-sm text-muted sm:hidden">
          {chart.timeLabel} · {chart.hourName} · {chart.ju.label}
          <br />
          {chart.pillars.year.name} {chart.pillars.month.name} {chart.pillars.day.name}{" "}
          {chart.pillars.hour.name}
        </div>

        <nav className="mt-5 flex gap-1 rounded-md border border-border bg-surface p-1 lg:hidden">
          {(
            [
              ["events", "事项", LayoutGrid],
              ["board", "九宫", Compass],
              ["people", "人事", Users],
            ] as const
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => setField("tab", id)}
              className={cn(
                "flex h-11 flex-1 items-center justify-center gap-1.5 rounded-sm text-sm",
                tab === id ? "bg-primary text-primary-fg" : "text-muted",
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <section className={cn(tab === "board" ? "block" : "hidden lg:block")}>
            <QimenBoard chart={chart} selected={selectedPalace} onSelect={onSelectPalace} />
          </section>

          <section className={cn(tab === "board" ? "hidden lg:block" : "block")}>
            <div className="mb-4 hidden gap-1 rounded-md border border-border bg-surface p-1 lg:flex">
              {(
                [
                  ["events", "事项"],
                  ["people", "人事"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setField("tab", id === "people" ? "people" : "events")}
                  className={cn(
                    "h-10 flex-1 rounded-sm text-sm",
                    (id === "people" ? tab === "people" : tab !== "people")
                      ? "bg-primary text-primary-fg"
                      : "text-muted hover:text-fg",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {tab === "people" ? (
              <PeoplePanel people={people} chart={chart} onSelectPalace={onSelectPalace} />
            ) : mode === "ask" ? (
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setField("mode", "scan")}
                  className="self-start text-xs text-muted hover:text-fg"
                >
                  返回十二类扫描
                </button>
                <EventDetail score={focus} chart={chart} personName={personName} />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="font-display text-lg text-fg">十二类事项</h2>
                  <p className="text-xs text-muted">按权重排序。点一项看神星门三段与刑冲克害合。</p>
                </div>
                <EventList
                  events={events}
                  activeId={eventId}
                  onPick={(id) => {
                    setField("eventId", id);
                    setField("mode", "ask");
                    setField("tab", "events");
                  }}
                />
              </div>
            )}
          </section>
        </div>

        <p className="mt-10 mb-6 text-center text-xs leading-5 text-subtle">
          拆补法转盘奇门。神应开始、星应过程、门应收局；日时干支刑冲克害合为辅助权重。
          本工具将传统盘面结构化为可计算模型，供学习与辅助决策，并非定论。
        </p>
      </main>
    </div>
  );
}
