import { Reveal } from "@/components/shared/reveal";

export type NumberedListVariant = "card" | "flat" | "step";

export type NumberedListItem = {
  title: string;
  desc?: string;
  items?: string[];
};

export type NumberedListTheme = {
  tp: string;
  ts: string;
  accent: string;
  chipBg: string;
  chipBorder: string;
  cardBg?: string;
  border?: string;
};

type NumberedListProps = {
  items: NumberedListItem[];
  variant: NumberedListVariant;
  theme: NumberedListTheme;
  gridClassName?: string;
  startIndex?: number;
  ariaLabelledBy?: string;
  uppercaseTitle?: boolean;
};

export function NumberedList({
  items,
  variant,
  theme: t,
  gridClassName,
  startIndex = 0,
  ariaLabelledBy,
  uppercaseTitle = false,
}: NumberedListProps) {
  return (
    <Reveal
      as="ol"
      stagger
      className={gridClassName ?? "space-y-6 min-w-0"}
      aria-labelledby={ariaLabelledBy}
    >
      {items.map((item, i) => {
        const chip = (
          <div
            className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center font-bold text-sm"
            style={{
              fontFamily: "var(--font-quicksand), sans-serif",
              background: t.chipBg,
              color: t.accent,
              border: `1px solid ${t.chipBorder}`,
            }}
          >
            {String(startIndex + i + 1).padStart(2, "0")}
          </div>
        );

        const title = (
          <h3
            className={`font-semibold text-base mb-2 ${uppercaseTitle ? "uppercase tracking-wide" : ""}`}
            style={{ fontFamily: "var(--font-quicksand), sans-serif", color: t.tp }}
          >
            {item.title}
          </h3>
        );

        if (variant === "step") {
          return (
            <li key={i} className="flex flex-col items-center gap-3 md:flex-row md:items-start md:gap-4">
              {chip}
              <div className="min-w-0 flex-1">
                {title}
                <ul className="space-y-1.5">
                  {item.items?.map((sub, j) => (
                    <li
                      key={j}
                      className="text-sm leading-relaxed text-pretty"
                      style={{ fontFamily: "var(--font-lato), sans-serif", color: t.ts }}
                    >
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        }

        const desc = item.desc && (
          <p
            className="text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-lato), sans-serif", color: t.ts, lineHeight: 1.65 }}
          >
            {item.desc}
          </p>
        );

        if (variant === "flat") {
          return (
            <li key={i} className="border-t pt-6" style={{ borderColor: t.border }}>
              <div className="mb-4 flex justify-center">{chip}</div>
              {title}
              {desc}
            </li>
          );
        }

        return (
          <li
            key={i}
            className="p-5 sm:p-6 rounded-2xl"
            style={{ background: t.cardBg, border: `1px solid ${t.border}` }}
          >
            <div className="mb-4">{chip}</div>
            {title}
            {desc}
          </li>
        );
      })}
    </Reveal>
  );
}
