import { useEffect, useMemo, useState } from "react";
import { Compass, CloudSun, LayoutGrid, MapPin, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { QueryForm } from "@/components/query-form";
import { QimenBoard } from "@/components/qimen-board";
import { EventDetail, EventList, PeoplePanel } from "@/components/event-panel";
import { DirectionPanel } from "@/components/direction-panel";
import { WeatherPanel } from "@/components/weather-panel";
import { useAppStore } from "@/lib/store";
import { beijingNow } from "@/lib/qimen/calendar";
import { cn } from "@/lib/utils";
import type { PalaceId } from "@/lib/qimen/types";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { ensureProfile } from "@/lib/server/app";

function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (!user) {
      setAdmin(false);
      return;
    }
    ensureProfile()
      .then((p) => setAdmin(p.role === "admin"))
      .catch(() => setAdmin(false));
  }, [user]);
  if (isPending) return <div className="size-10 animate-pulse rounded-full bg-elevated" />;
  if (user) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        {admin ? (
          <>
            <Link to="/admin" className="flex h-10 items-center px-2 text-xs text-muted hover:text-fg">
              管理
            </Link>
            <Link to="/thesis" className="flex h-10 items-center px-2 text-xs text-muted hover:text-fg">
              论文
            </Link>
          </>
        ) : null}
        <UserButton />
      </div>
    );
  }
  return (
    <Link
      to="/login"
      className="flex h-10 items-center rounded-md border border-border bg-elevated px-3 text-sm text-fg"
    >
      登录
    </Link>
  );
}

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
  const casting = useAppStore((s) => s.casting);
  const lotsMonth = useAppStore((s) => s.lotsMonth);
  const lotsJu = useAppStore((s) => s.lotsJu);
  const elder = useAppStore((s) => s.elder);
  const provinceCode = useAppStore((s) => s.provinceCode);
  const districtCode = useAppStore((s) => s.districtCode);

  useEffect(() => {
    const unsub = useAppStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
    if (useAppStore.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.elder = elder ? "1" : "0";
  }, [elder]);

  useEffect(() => {
    if (!hydrated) return;
    if (civil.year === 2026 && civil.month === 8 && civil.day === 28 && civil.hour === 12) {
      setCivil(beijingNow());
    }
  }, [hydrated, civil.year, civil.month, civil.day, civil.hour, setCivil]);

  const result = useMemo(
    () => compute(),
    [
      civil,
      trueSolar,
      cityId,
      eventId,
      compute,
      personName,
      gender,
      birthYear,
      hydrated,
      casting,
      lotsMonth,
      lotsJu,
      provinceCode,
      districtCode,
    ],
  );

  const { chart, events, focus, people } = result;

  const onSelectPalace = (id: PalaceId) => {
    setField("selectedPalace", selectedPalace === id ? null : id);
    setField("tab", "board");
  };

  const tabs = [
    ["events", "事项", LayoutGrid],
    ["board", "九宫", Compass],
    ["people", "人事", Users],
    ["directions", "方位", MapPin],
    ["weather", "天气", CloudSun],
  ] as const;

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="font-display text-xl tracking-wide text-fg">奇门权衡</p>
            <p className="text-xs text-muted">以数权衡时空 · 以盘决断人事</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right text-xs text-subtle sm:block">
              <p>
                {chart.timeLabel} 北京时间 · {chart.hourName}
              </p>
              <p>
                {chart.pillars.year.name} {chart.pillars.month.name} {chart.pillars.day.name}{" "}
                {chart.pillars.hour.name}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setField("elder", !elder)}
              className={cn(
                "flex h-10 items-center rounded-md border px-3 text-xs",
                elder ? "border-primary bg-primary text-primary-fg" : "border-border bg-elevated text-muted",
              )}
            >
              {elder ? "长辈开" : "长辈"}
            </button>
            <AuthSlot />
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

        <nav className="mt-5 flex gap-1 overflow-x-auto rounded-md border border-border bg-surface p-1 lg:hidden">
          {tabs.map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => setField("tab", id)}
              className={cn(
                "flex h-11 min-w-16 flex-1 items-center justify-center gap-1.5 rounded-sm px-2 text-sm",
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
                  ["directions", "方位"],
                  ["weather", "天气"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setField("tab", id)}
                  className={cn(
                    "h-10 flex-1 rounded-sm text-sm",
                    tab === id ? "bg-primary text-primary-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {tab === "people" ? (
              <PeoplePanel people={people} chart={chart} onSelectPalace={onSelectPalace} />
            ) : tab === "directions" ? (
              <DirectionPanel chart={chart} />
            ) : tab === "weather" ? (
              <WeatherPanel chart={chart} />
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
          拆补时盘或求签定局。神应开始、星应过程、门应收局。方位用事从八门古法。天气权重用瓯海 2025–2026
          再分析校准。论文与训练数据需管理员登录后，在右上角「管理」或「论文」下载。供学习，并非定论。
        </p>
      </main>
    </div>
  );
}
