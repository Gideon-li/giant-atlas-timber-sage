import {
  GATE_BASE as CLASSIC_GATE_BASE,
  GOD_BASE as CLASSIC_GOD_BASE,
  STAR_BASE as CLASSIC_STAR_BASE,
} from "./constants";
import weightsJson from "./weather-weights.json";

type Cal = {
  eventCalibration: {
    globalScale: number;
    meanXunAcc: number;
    method: string;
    god: Record<string, number>;
    gate: Record<string, number>;
    star: Record<string, number>;
  };
};

const cal = (weightsJson as Cal).eventCalibration;

/** 天气逻辑回归校准后的事项权重（符号仍依人事吉凶）。 */
export const GATE_BASE = cal.gate;
export const GOD_BASE = cal.god;
export const STAR_BASE = cal.star;

export const EVENT_CALIBRATION = {
  ...cal,
  classicGate: CLASSIC_GATE_BASE,
  classicGod: CLASSIC_GOD_BASE,
  classicStar: CLASSIC_STAR_BASE,
};
