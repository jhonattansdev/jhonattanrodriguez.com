import type { BuilderTheme } from "@/components/developer-ai/project-ui";

type GroupedListRow = { term: string; detail: string };

type GroupedListProps = {
  rows: GroupedListRow[];
  theme: BuilderTheme;
  monoTerms?: boolean;
};

export function GroupedList({ rows, theme: t, monoTerms = false }: GroupedListProps) {
  return (
    <dl
      className="m-0 overflow-hidden rounded-2xl"
      style={{ background: t.card, border: `1px solid ${t.border}` }}
    >
      {rows.map((row, i) => (
        <div
          key={row.term}
          className="grid grid-cols-1 gap-1.5 px-5 py-4 md:grid-cols-[minmax(200px,30%)_1fr] md:gap-x-8"
          style={{ borderTop: i === 0 ? "none" : `1px solid ${t.border}` }}
        >
          <dt
            className={
              monoTerms
                ? "font-mono text-[13px] leading-relaxed break-words"
                : "text-[15px] font-semibold leading-relaxed break-words"
            }
            style={{
              color: t.text.primary,
              fontFamily: monoTerms ? undefined : "var(--font-quicksand), 'Quicksand', sans-serif",
            }}
          >
            {row.term}
          </dt>
          <dd
            className="m-0 min-w-0 text-[15px] leading-relaxed"
            style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif", color: t.text.secondary }}
          >
            {row.detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}
