import { create } from "zustand";
import { persist } from "zustand/middleware";
import { applyTrueSolar, beijingNow, getJuFromLots, type CivilTime } from "@/lib/qimen/calendar";
import { digitRootToJu } from "@/lib/qimen/classic";
import { CITIES, EVENTS } from "@/lib/qimen/constants";
import { buildChart } from "@/lib/qimen/chart";
import { peopleRelations, scoreAllEvents, scoreEvent } from "@/lib/qimen/score";
import { natalView, type NatalView } from "@/lib/qimen/natal";
import type { FortuneKind } from "@/lib/qimen/fortune";
import { areasOf, citiesOf, DEFAULT_LOCATION, locationLng, provinces } from "@/lib/qimen/china";
import { subjectName, type SubjectKind } from "@/lib/qimen/subject";
import { NATIONAL_BASES, type EventBases } from "@/lib/qimen/calibrated";
import type { EventId, EventScore, Gender, PalaceId, PeopleLink, QimenChart } from "@/lib/qimen/types";

export type Mode = "scan" | "ask";
export type ViewTab = "board" | "events" | "people" | "directions" | "weather" | "fortune" | "consult";
export type Casting = "chaibu" | "lots";

export type QueryState = {
  civil: CivilTime;
  trueSolar: boolean;
  cityId: string;
  casting: Casting;
  lotsMonth: number;
  lotsJu: number;
  lotsCode: string;
  elder: boolean;
  mode: Mode;
  tab: ViewTab;
  personName: string;
  gender: Gender;
  birthYear: string;
  eventId: EventId;
  selectedPalace: PalaceId | null;
  fortuneScope: FortuneKind;
  provinceCode: string;
  cityCode: string;
  districtCode: string;
  province: string;
  city: string;
  district: string;
  subjectKind: SubjectKind;
};

type AppStore = QueryState & {
  setCivil: (civil: CivilTime) => void;
  setField: <K extends keyof QueryState>(key: K, value: QueryState[K]) => void;
  useNow: () => void;
  setLotsMonth: (month: number) => void;
  drawLots: () => void;
  applyLotsCode: (code: string) => void;
  setLocation: (provinceCode: string, cityCode: string, districtCode: string) => void;
  districtBases: EventBases;
  setDistrictBases: (bases: EventBases) => void;
  resolvedCivil: () => CivilTime;
  compute: () => {
    chart: QimenChart;
    events: EventScore[];
    focus: EventScore;
    people: PeopleLink[];
    natal: NatalView | null;
  };
};

const defaultCivil: CivilTime = { year: 2026, month: 8, day: 28, hour: 12, minute: 0 };

function namesOf(provinceCode: string, cityCode: string, districtCode: string) {
  const p = provinces().find((x) => x.code === provinceCode);
  const c = citiesOf(provinceCode).find((x) => x.code === cityCode);
  const a = areasOf(provinceCode, cityCode).find((x) => x.code === districtCode);
  return {
    province: p?.n ?? DEFAULT_LOCATION.province,
    city: c?.n ?? DEFAULT_LOCATION.city,
    district: a?.n ?? DEFAULT_LOCATION.district,
  };
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      civil: defaultCivil,
      trueSolar: false,
      cityId: "beijing",
      casting: "chaibu",
      lotsMonth: defaultCivil.month,
      lotsJu: 5,
      lotsCode: "",
      elder: false,
      mode: "scan",
      tab: "events",
      personName: "",
      gender: "male",
      birthYear: "",
      eventId: "wealth",
      selectedPalace: null,
      fortuneScope: "year",
      provinceCode: DEFAULT_LOCATION.provinceCode,
      cityCode: DEFAULT_LOCATION.cityCode,
      districtCode: DEFAULT_LOCATION.districtCode,
      province: DEFAULT_LOCATION.province,
      city: DEFAULT_LOCATION.city,
      district: DEFAULT_LOCATION.district,
      subjectKind: "person",
      districtBases: NATIONAL_BASES,
      setDistrictBases: (bases) => set({ districtBases: bases }),
      setCivil: (civil) => set({ civil }),
      setField: (key, value) => set({ [key]: value } as Partial<QueryState>),
      useNow: () => {
        const now = beijingNow();
        set({ civil: now, lotsMonth: now.month });
      },
      setLotsMonth: (month) => {
        const { civil } = get();
        set({ lotsMonth: month, civil: { ...civil, month } });
      },
      drawLots: () => {
        const n = 1 + Math.floor(Math.random() * 9);
        set({ lotsJu: n, lotsCode: "" });
      },
      applyLotsCode: (code) => {
        const r = digitRootToJu(code);
        if (!r.source) {
          set({ lotsCode: code });
          return;
        }
        set({ lotsCode: r.source, lotsJu: r.ju });
      },
      setLocation: (provinceCode, cityCode, districtCode) => {
        set({
          provinceCode,
          cityCode,
          districtCode,
          ...namesOf(provinceCode, cityCode, districtCode),
        });
      },
      resolvedCivil: () => {
        const s = get();
        if (!s.trueSolar) return s.civil;
        const lng = locationLng(s.provinceCode, s.districtCode);
        const fallback = CITIES.find((c) => c.id === s.cityId)?.lng ?? lng;
        return applyTrueSolar(s.civil, lng || fallback);
      },
      compute: () => {
        const s = get();
        const juOverride =
          s.casting === "lots" ? getJuFromLots(s.lotsMonth || s.civil.month, s.lotsJu || 5) : undefined;
        const chart = buildChart(s.resolvedCivil(), juOverride);
        const place = s.subjectKind !== "person";
        const birthYear = !place && s.birthYear.trim() ? Number(s.birthYear) : null;
        const label = subjectName(s.subjectKind, {
          personName: s.personName,
          province: s.province,
          city: s.city,
          district: s.district,
        });
        const opts = {
          gender: s.gender,
          birthYear: birthYear && birthYear >= 1920 && birthYear <= 2030 ? birthYear : null,
          subjectKind: s.subjectKind,
          subjectLabel: label,
          bases: s.districtBases,
        };
        const events = scoreAllEvents(chart, opts);
        const focus = scoreEvent(chart, s.eventId, opts);
        const people = peopleRelations(chart, s.gender, s.districtBases);
        const natal = opts.birthYear ? natalView(chart, opts.birthYear) : null;
        return { chart, events, focus, people, natal };
      },
    }),
    {
      name: "qimen-weigh-query",
      partialize: (s) => ({
        civil: s.civil,
        trueSolar: s.trueSolar,
        cityId: s.cityId,
        casting: s.casting,
        lotsMonth: s.lotsMonth,
        lotsJu: s.lotsJu,
        lotsCode: s.lotsCode,
        elder: s.elder,
        mode: s.mode,
        personName: s.personName,
        gender: s.gender,
        birthYear: s.birthYear,
        eventId: s.eventId,
        fortuneScope: s.fortuneScope,
        provinceCode: s.provinceCode,
        cityCode: s.cityCode,
        districtCode: s.districtCode,
        province: s.province,
        city: s.city,
        district: s.district,
        subjectKind: s.subjectKind,
      }),
    },
  ),
);

export const EVENT_OPTIONS = EVENTS;
