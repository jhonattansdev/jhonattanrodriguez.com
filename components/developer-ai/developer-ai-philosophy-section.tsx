import type { CSSProperties } from "react";
import { Reveal } from "@/components/shared/reveal";
import { TypedText } from "@/components/shared/typed-text";
import type { DeveloperAIPhilosophySection } from "@/lib/developer-ai-data";
import type { THEMES } from "@/lib/design-tokens";

type BuilderTheme = (typeof THEMES)["builder"]["dark"];

type DeveloperAIPhilosophySectionProps = {
  data: DeveloperAIPhilosophySection;
  theme: BuilderTheme;
  terminalLabelClass: string;
  terminalLabelStyle: CSSProperties;
};

export function DeveloperAIPhilosophySection({
  data,
  theme: t,
  terminalLabelClass,
  terminalLabelStyle,
}: DeveloperAIPhilosophySectionProps) {
  return (
    <section
      id="filosofia"
      className="py-16 relative"
      style={{ borderTop: `1px solid ${t.border}` }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <span className={`${terminalLabelClass} mb-6`} style={terminalLabelStyle}>
          <TypedText text={data.terminalLabel} />
        </span>

        <Reveal delay={150} className="max-w-2xl mx-auto text-center text-pretty text-balance">
          <blockquote className="mb-10 m-0">
            <p
              className="text-base md:text-lg font-normal m-0"
              style={{
                fontFamily: "var(--font-lato), 'Lato', sans-serif",
                color: t.text.primary,
                lineHeight: 1.7,
              }}
            >
              «{data.quote}»
            </p>
            <footer
              className="mt-4 text-[13px] sm:text-sm leading-snug max-w-xl mx-auto"
              style={{
                fontFamily: "var(--font-lato), sans-serif",
                color: t.text.muted,
                fontWeight: 500,
              }}
            >
              {data.attribution}
            </footer>
          </blockquote>

          <div className="space-y-6">
            {data.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[15px] sm:text-base leading-relaxed text-center text-pretty m-0"
                style={{
                  fontFamily: "var(--font-lato), 'Lato', sans-serif",
                  color: t.text.secondary,
                }}
              >
                {paragraph}
              </p>
            ))}
            <p
              className="text-base font-semibold leading-relaxed text-center text-pretty m-0"
              style={{
                fontFamily: "var(--font-lato), 'Lato', sans-serif",
                color: t.accent,
              }}
            >
              {data.closingLine}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
