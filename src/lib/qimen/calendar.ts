import { HeavenStem, EarthBranch, SolarTime } from "tyme4ts";
import { JU_BY_TERM } from "./constants";
import type { FourPillars, JuInfo, Pillar, Yuan } from "./types";

export type CivilTime = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

export function hourToZhiIndex(hour: number): number {
  return Math.floor(((hour + 1) % 24) / 2);
}

function pillarOf(cycle: {
  getName: () => string;
  getHeavenStem: () => { getName: () => string };
  getEarthBranch: () => { getName: () => string };
  getSound: () => { getName: () => string };
}): Pillar {
  return {
    stem: cycle.getHeavenStem().getName(),
    branch: cycle.getEarthBranch().getName(),
    name: cycle.getName(),
    nayin: cycle.getSound().getName(),
  };
}

export function getFourPillars(civil: CivilTime): FourPillars {
  const t = SolarTime.fromYmdHms(civil.year, civil.month, civil.day, civil.hour, civil.minute, 0);
  const eight = t.getLunarHour().getEightChar();
  return {
    year: pillarOf(eight.getYear()),
    month: pillarOf(eight.getMonth()),
    day: pillarOf(eight.getDay()),
    hour: pillarOf(eight.getHour()),
  };
}

export function getHourCycle(civil: CivilTime) {
  const t = SolarTime.fromYmdHms(civil.year, civil.month, civil.day, civil.hour, civil.minute, 0);
  return t.getLunarHour().getEightChar().getHour();
}

export function getJu(civil: CivilTime): JuInfo {
  const t = SolarTime.fromYmdHms(civil.year, civil.month, civil.day, civil.hour, civil.minute, 0);
  const termDay = t.getSolarDay().getTermDay();
  const term = termDay.getSolarTerm();
  const index = term.getIndex();
  const dayIndex = termDay.getDayIndex();
  const yuan: Yuan = dayIndex <= 4 ? "上元" : dayIndex <= 9 ? "中元" : "下元";
  const yuanIdx = yuan === "上元" ? 0 : yuan === "中元" ? 1 : 2;
  const ju = JU_BY_TERM[index][yuanIdx];
  const dun = index < 12 ? "yang" : "yin";
  const dunLabel = dun === "yang" ? "阳遁" : "阴遁";
  return {
    term: term.getName(),
    termDayIndex: dayIndex,
    yuan,
    dun,
    ju,
    label: `${term}${yuan} ${dunLabel}${ju}局`,
  };
}

export function getXun(civil: CivilTime): { xunShou: string; xunYi: string; xunKong: string[] } {
  const hour = getHourCycle(civil);
  const xunShou = hour.getTen().getName();
  const extra = hour.getExtraEarthBranches().map((b) => b.getName());
  const xunYiMap: Record<string, string> = {
    甲子: "戊",
    甲戌: "己",
    甲申: "庚",
    甲午: "辛",
    甲辰: "壬",
    甲寅: "癸",
  };
  return { xunShou, xunYi: xunYiMap[xunShou] ?? "戊", xunKong: extra };
}

export function changshengOf(stem: string, branch: string): string | null {
  if (!stem || !branch) return null;
  try {
    return HeavenStem.fromName(stem).getTerrain(EarthBranch.fromName(branch)).getName();
  } catch {
    return null;
  }
}

export function yearStemOf(year: number): string {
  const t = SolarTime.fromYmdHms(year, 6, 15, 12, 0, 0);
  return t.getLunarHour().getEightChar().getYear().getHeavenStem().getName();
}

export function applyTrueSolar(civil: CivilTime, longitude: number): CivilTime {
  const offsetMin = Math.round((longitude - 120) * 4);
  const date = new Date(Date.UTC(civil.year, civil.month - 1, civil.day, civil.hour, civil.minute));
  date.setUTCMinutes(date.getUTCMinutes() + offsetMin);
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
  };
}

export function beijingNow(): CivilTime {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const g = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return { year: g("year"), month: g("month"), day: g("day"), hour: g("hour"), minute: g("minute") };
}

export function formatCivil(c: CivilTime): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${c.year}-${p(c.month)}-${p(c.day)} ${p(c.hour)}:${p(c.minute)}`;
}

export function wuxingRelation(
  a: string,
  b: string,
): "生我" | "我生" | "克我" | "我克" | "同我" | null {
  if (!a || !b) return null;
  if (a === b) return "同我";
  const order = ["木", "火", "土", "金", "水"];
  const i = order.indexOf(a);
  const j = order.indexOf(b);
  if (i < 0 || j < 0) return null;
  if ((i + 1) % 5 === j) return "我生";
  if ((j + 1) % 5 === i) return "生我";
  if ((i + 2) % 5 === j) return "我克";
  if ((j + 2) % 5 === i) return "克我";
  return "同我";
}
