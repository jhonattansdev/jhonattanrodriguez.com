/** Label + número grande + unidad chica, inspirado en CmStat de Coach Manager. */
export function Stat({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="shrink-0 whitespace-nowrap text-center">
      <p
        className="text-xs font-semibold uppercase tracking-wider mb-1"
        style={{ fontFamily: "var(--font-barlow-condensed), sans-serif", color: "var(--muted-foreground)" }}
      >
        {label}
      </p>
      <p className="leading-none">
        <span className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--foreground)" }}>
          {value}
        </span>
        {unit ? (
          <span className="text-sm font-medium ml-1" style={{ color: "var(--muted-foreground)" }}>
            {unit}
          </span>
        ) : null}
      </p>
    </div>
  );
}
