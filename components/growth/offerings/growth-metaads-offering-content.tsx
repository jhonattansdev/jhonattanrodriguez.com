"use client";

import { GrowthAccordionItem } from "@/components/growth/growth-accordion-item";
import type { GrowthOfferingContentProps } from "@/components/growth/growth-offering-types";
import { GrowthHighlightBlock } from "@/components/growth/growth-highlight-block";
import { CTACalendar, CTAWhatsApp } from "@/components/cta-buttons";
import {
  GROWTH_METAADS_RESULTADO,
  GROWTH_METAADS_SESSIONS,
} from "@/lib/growth-data";
import { growthContentAlign, growthRowCenter } from "@/lib/growth-layout";

export function GrowthMetaAdsOfferingContent({
  offeringId,
  pageTheme,
  accordionTheme,
  innerExpanded,
  onInnerToggle,
  /** false cuando este contenido va anidado dentro de otra oferta (plan inicial), cuyo panel de precio ya trae su propio CTA. */
  showOwnCta = true,
}: GrowthOfferingContentProps & { showOwnCta?: boolean }) {
  const { dark, accent, border, accentSolid, text } = pageTheme;
  const bodyStyle = {
    fontFamily: "var(--font-lato), 'Lato', sans-serif",
    color: text.secondary,
  };
  const expandedIndex = innerExpanded[offeringId] ?? null;

  return (
    <>
      <div className="space-y-3">
        {GROWTH_METAADS_SESSIONS.map((session, i) => (
          <GrowthAccordionItem
            key={session.num}
            itemId={`growth-metaads-session-${i}`}
            title={session.title}
            subtitle={session.duration}
            badge={session.num}
            isOpen={expandedIndex === i}
            onToggle={() => onInnerToggle(i)}
            theme={accordionTheme}
          >
            <p
              className={`text-sm sm:text-base leading-relaxed mb-4 text-pretty ${growthContentAlign}`}
              style={bodyStyle}
            >
              {session.desc}
            </p>
            {session.reto ? (
              <div
                className="p-3 rounded-xl"
                style={{
                  background: dark ? `${accent}08` : `${accent}06`,
                  border: `1px solid ${border}`,
                }}
              >
                <span
                  className="text-xs font-semibold uppercase tracking-wider block mb-1"
                  style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif", color: accent }}
                >
                  Reto
                </span>
                <p
                  className={`text-sm sm:text-base ${growthContentAlign}`}
                  style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif", color: text.primary }}
                >
                  {session.reto}
                </p>
              </div>
            ) : null}
          </GrowthAccordionItem>
        ))}
      </div>

      <GrowthHighlightBlock
        title="Resultado"
        dark={dark}
        accent={accent}
        border={border}
        textPrimary={text.primary}
        className="mt-6"
      >
        {GROWTH_METAADS_RESULTADO}
      </GrowthHighlightBlock>

      {showOwnCta ? (
        <div className={`mt-6 flex flex-col sm:flex-row gap-3 ${growthRowCenter}`}>
          <CTACalendar
            variant="primary"
            dark={dark}
            accentColor={accent}
            accentSolidColor={accentSolid}
          />
          <CTAWhatsApp
            variant="secondary"
            context="growth"
            dark={dark}
            accentColor={accent}
            label="Tengo preguntas"
          />
        </div>
      ) : null}
    </>
  );
}
