"use client";

import type { CSSProperties } from "react";
import { NumberChip } from "@/components/filmmaker/numbered-list";
import { ArrowRightIcon, GlowButton } from "@/components/shared/glow-button";
import { Reveal } from "@/components/shared/reveal";
import { FILM_METHOD_STEPS, FILM_METHOD_VISION, FILM_PLANS } from "@/lib/design-tokens";

// El framework estratégico (Valor, Ventas, Blockbuster) ya vive en el Plan Sprint: se reutiliza para no repetir copy.
const FRAMEWORK = FILM_PLANS.find((plan) => plan.id === "sprint")?.framework ?? [];

const HEADING_ID = "film-method-heading";

type FilmMethodSectionProps = {
  tp: string;
  ts: string;
  display: string;
  accent: string;
  border: string;
  chipBg: string;
  chipBorder: string;
  cardBg: string;
};

/**
 * Metodología: producción de video y pauta como un solo sistema. Tres pasos
 * enlazados por un trazo fino (horizontal desde `lg`, vertical debajo) y un
 * panel con la visión estratégica que los une.
 */
export function FilmMethodSection({
  tp,
  ts,
  display,
  accent,
  border,
  chipBg,
  chipBorder,
  cardBg,
}: FilmMethodSectionProps) {
  const chipTheme = { accent, chipBg, chipBorder };
  const quicksand = "var(--font-quicksand), sans-serif";
  const lato = "var(--font-lato), sans-serif";

  return (
    <section className="py-16 sm:py-24 relative" style={{ borderTop: `1px solid ${border}` }}>
      <div className="max-w-5xl mx-auto px-6 text-center">
        <Reveal>
          <span
            className="film-display-kicker font-medium block mb-3"
            style={{ fontFamily: lato, color: display }}
          >
            Metodología
          </span>
          <h2
            id={HEADING_ID}
            className="font-semibold text-2xl sm:text-3xl mb-10 sm:mb-14 max-w-2xl mx-auto text-balance"
            style={{ fontFamily: quicksand, color: tp }}
          >
            Del rodaje a la pauta, un solo sistema
          </h2>
        </Reveal>

        <Reveal
          as="ol"
          stagger
          aria-labelledby={HEADING_ID}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10"
          style={{ "--method-line": chipBorder } as CSSProperties}
        >
          {FILM_METHOD_STEPS.map((step, i) => (
            <li
              key={step.title}
              className={
                i < FILM_METHOD_STEPS.length - 1
                  ? // Trazo hacia el paso siguiente: vertical en el hueco entre pasos apilados, horizontal entre chips desde `lg`.
                    "relative after:absolute after:left-1/2 after:top-full after:h-8 after:w-px after:-translate-x-1/2 after:bg-[var(--method-line)] lg:after:left-[calc(50%+1.75rem)] lg:after:top-5 lg:after:h-px lg:after:w-[calc(100%-1rem)] lg:after:translate-x-0"
                  : "relative"
              }
            >
              <div className="mb-4 flex justify-center">
                <NumberChip n={i + 1} theme={chipTheme} />
              </div>
              <h3
                className="text-sm font-semibold uppercase tracking-wide mb-2"
                style={{ fontFamily: quicksand, color: tp }}
              >
                {step.title}
              </h3>
              <p
                className="text-xl sm:text-2xl font-bold leading-snug mb-3 text-balance"
                style={{ fontFamily: quicksand, color: accent }}
              >
                {step.highlight}
              </p>
              <p
                className="text-sm leading-relaxed text-pretty max-w-xs mx-auto"
                style={{ fontFamily: lato, color: ts, lineHeight: 1.65 }}
              >
                {step.desc}
              </p>
            </li>
          ))}
        </Reveal>

        <Reveal
          className="mt-12 sm:mt-16 rounded-2xl p-6 sm:p-8 text-center md:text-left"
          style={{ background: cardBg, border: `1px solid ${border}` }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-10 items-start">
            <div>
              <h3
                className="font-semibold text-xl sm:text-2xl mb-3 text-balance"
                style={{ fontFamily: quicksand, color: tp }}
              >
                {FILM_METHOD_VISION.title}
              </h3>
              <p
                className="text-base leading-relaxed text-pretty"
                style={{ fontFamily: lato, color: ts, lineHeight: 1.7 }}
              >
                {FILM_METHOD_VISION.desc}
              </p>
            </div>
            <ul aria-label="Framework estratégico">
              {FRAMEWORK.map((item, k) => (
                <li
                  key={item.type}
                  className="py-3 md:grid md:grid-cols-[6.5rem_1fr] md:gap-4"
                  style={k > 0 ? { borderTop: `1px solid ${border}` } : undefined}
                >
                  <span
                    className="block font-semibold text-sm"
                    style={{ fontFamily: quicksand, color: accent }}
                  >
                    {item.type}
                  </span>
                  <span
                    className="block text-sm leading-relaxed text-balance"
                    style={{ fontFamily: lato, color: ts }}
                  >
                    {item.goal}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
            style={{ borderTop: `1px solid ${border}` }}
          >
            <p className="text-sm" style={{ fontFamily: lato, color: ts }}>
              {FILM_METHOD_VISION.ctaPrompt}
            </p>
            <GlowButton
              href={FILM_METHOD_VISION.ctaHref}
              variant="ghost"
              size="md"
              accentColor={accent}
              secondaryColor={accent}
              className="text-sm"
              icon={<ArrowRightIcon />}
            >
              {FILM_METHOD_VISION.ctaLabel}
            </GlowButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
