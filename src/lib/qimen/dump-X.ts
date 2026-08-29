/**
 * Dump shared Qimen 31-d features for 2020–2026 dates.
 * Run: npx tsx src/lib/qimen/dump-X.ts
 */
import { writeFileSync } from "node:fs";
import { buildChart } from "./chart";
import { SCORE_FEATURE_NAMES, extractScoreFeatures } from "./unified";
import regionsJson from "./weather-regions.json";

type Pack = { regions: { days: { d: string }[] }[] };
const dates = (regionsJson as Pack).regions[0]!.days.map((d) => d.d);

function dayOfYear(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = Date.UTC(y, m - 1, d);
  return Math.floor((dt - Date.UTC(y, 0, 1)) / 86400000) + 1;
}

console.log("dumping X", dates.length, dates[0], dates[dates.length - 1]);
const X: number[][] = [];
for (const iso of dates) {
  const [y, m, d] = iso.split("-").map(Number);
  const chart = buildChart({ year: y, month: m, day: d, hour: 12, minute: 0 });
  X.push(extractScoreFeatures(chart, dayOfYear(iso)));
}
writeFileSync("/tmp/qimen-X.json", JSON.stringify({ dates, featureNames: [...SCORE_FEATURE_NAMES], X }));
console.log("wrote /tmp/qimen-X.json", X.length, "x", X[0]!.length);
