"use client";

export type SegmentedOption = {
  value: string;
  label: string;
};

/** Píldora de pestañas controlada, inspirada en CmSegmented de Coach Manager. */
export function Segmented({
  options,
  value,
  onChange,
}: {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div
      role="tablist"
      className="inline-flex gap-1 rounded-full p-1"
      style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
            style={{
              background: active
                ? "linear-gradient(135deg, var(--cm-violet-600), var(--cm-violet-500))"
                : "transparent",
              color: active ? "var(--foreground)" : "var(--muted-foreground)",
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
