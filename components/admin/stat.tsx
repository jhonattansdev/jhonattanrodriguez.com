/** Label + número grande + unidad chica, inspirado en CmStat de Coach Manager. `progress` (0-1) pinta una barra fina debajo, para stats tipo meta/avance. */
export function Stat({
  label,
  value,
  unit,
  progress,
}: {
  label: string;
  value: string;
  unit?: string;
  progress?: number;
}) {
  const clampedProgress = progress === undefined ? undefined : Math.min(1, Math.max(0, progress));

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
      {clampedProgress !== undefined ? (
        <div className="mt-2 h-1 w-full rounded-full overflow-hidden" style={{ background: "var(--secondary)" }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${clampedProgress * 100}%`,
              background: "linear-gradient(90deg, var(--cm-violet-500), var(--cm-violet-400))",
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
