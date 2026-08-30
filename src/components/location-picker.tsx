import { areasOf, citiesOf, DEFAULT_LOCATION, provinces } from "@/lib/qimen/china";
import { useAppStore } from "@/lib/store";

export function LocationPicker() {
  const provinceCode = useAppStore((s) => s.provinceCode);
  const cityCode = useAppStore((s) => s.cityCode);
  const districtCode = useAppStore((s) => s.districtCode);
  const setLocation = useAppStore((s) => s.setLocation);

  const cities = citiesOf(provinceCode);
  const areas = areasOf(provinceCode, cityCode);

  return (
    <div className="mt-4 border-t border-border pt-4">
      <p className="text-xs text-muted">地理位置（中国）· 选对象为区县/城市/省份/国家时，以下即预测对象</p>
      <div className="fit-fields mt-2">
        <label className="flex flex-col gap-1 text-xs text-muted">
          省 / 直辖市
          <select
            value={provinceCode}
            onChange={(e) => {
              const p = e.target.value;
              const cs = citiesOf(p);
              const c = cs[0]?.code ?? "";
              const a = areasOf(p, c)[0]?.code ?? "";
              setLocation(p, c, a);
            }}
            className="h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
          >
            {provinces().map((p) => (
              <option key={p.code} value={p.code}>
                {p.n}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted">
          市
          <select
            value={cityCode}
            onChange={(e) => {
              const c = e.target.value;
              const a = areasOf(provinceCode, c)[0]?.code ?? "";
              setLocation(provinceCode, c, a);
            }}
            className="h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
          >
            {cities.map((c) => (
              <option key={c.code} value={c.code}>
                {c.n}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted">
          区 / 县
          <select
            value={districtCode}
            onChange={(e) => setLocation(provinceCode, cityCode, e.target.value)}
            className="h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg outline-none focus:border-ring"
          >
            {areas.map((a) => (
              <option key={a.code} value={a.code}>
                {a.n}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-2 text-[11px] text-subtle">
        默认 {DEFAULT_LOCATION.province}
        {DEFAULT_LOCATION.city}
        {DEFAULT_LOCATION.district}。天气按所选区县中心点单独训练（2020–2026，全国每个区各一套权重）。
      </p>
    </div>
  );
}
