import { create } from "zustand";
import { persist } from "zustand/middleware";
import { applyTrueSolar, beijingNow, type CivilTime } from "@/lib/qimen/calendar";
import { CITIES, EVENTS } from "@/lib/qimen/constants";
import { buildChart } from "@/lib/qimen/chart";
import { peopleRelations, scoreAllEvents, scoreEvent } from "@/lib/qimen/score";
import type { EventId, EventScore, Gender, PalaceId, PeopleLink, QimenChart } from "@/lib/qimen/types";

export type Mode = "scan" | "ask";
export type ViewTab = "board" | "events" | "people";

export type QueryState = {
  civil: CivilTime;
  trueSolar: boolean;
  cityId: string;
  mode: Mode;
  tab: ViewTab;
  personName: string;
  gender: Gender;
  birthYear: string;
  eventId: EventId;
  selectedPalace: PalaceId | null;
};

type AppStore = QueryState & {
  setCivil: (civil: CivilTime) => void;
  setField: <K extends keyof QueryState>(key: K, value: QueryState[K]) => void;
  useNow: () => void;
  resolvedCivil: () => CivilTime;
  compute: () => {
    chart: QimenChart;
    events: EventScore[];
    focus: EventScore;
    people: PeopleLink[];
  };
};

const defaultCivil: CivilTime = { year: 2026, month: 8, day: 28, hour: 12, minute: 0 };

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      civil: defaultCivil,
      trueSolar: false,
      cityId: "beijing",
      mode: "scan",
      tab: "events",
      personName: "",
      gender: "male",
      birthYear: "",
      eventId: "wealth",
      selectedPalace: null,
      setCivil: (civil) => set({ civil }),
      setField: (key, value) => set({ [key]: value } as Partial<QueryState>),
      useNow: () => set({ civil: beijingNow() }),
      resolvedCivil: () => {
        const { civil, trueSolar, cityId } = get();
        if (!trueSolar) return civil;
        const city = CITIES.find((c) => c.id === cityId) ?? CITIES[0];
        return applyTrueSolar(civil, city.lng);
      },
      compute: () => {
        const s = get();
        const chart = buildChart(s.resolvedCivil());
        const birthYear = s.birthYear.trim() ? Number(s.birthYear) : null;
        const opts = {
          gender: s.gender,
          birthYear: birthYear && birthYear >= 1920 && birthYear <= 2030 ? birthYear : null,
        };
        const events = scoreAllEvents(chart, opts);
        const focus = scoreEvent(chart, s.eventId, opts);
        const people = peopleRelations(chart, s.gender);
        return { chart, events, focus, people };
      },
    }),
    {
      name: "qimen-weigh-query",
      partialize: (s) => ({
        civil: s.civil,
        trueSolar: s.trueSolar,
        cityId: s.cityId,
        mode: s.mode,
        personName: s.personName,
        gender: s.gender,
        birthYear: s.birthYear,
        eventId: s.eventId,
      }),
    },
  ),
);

export const EVENT_OPTIONS = EVENTS;
