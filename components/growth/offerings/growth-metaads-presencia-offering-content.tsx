"use client";

import { GrowthAccordionItem } from "@/components/growth/growth-accordion-item";
import type { GrowthOfferingContentProps } from "@/components/growth/growth-offering-types";
import { GrowthHighlightBlock } from "@/components/growth/growth-highlight-block";
import {
  GROWTH_METAADS_PRESENCIA_RESULTADO,
  GROWTH_METAADS_PRESENCIA_SESSIONS,
} from "@/lib/growth-data";
import { growthContentAlign } from "@/lib/growth-layout";

/**
 * Plan "Meta Ads + Marca Personal": a diferencia del plan inicial (que elige
 * UNO de los dos enfoques), aquí van los dos incluidos, en una sola lista de
 * 6 sesiones consecutivas — sin selector, porque no hay nada que elegir. El
 * CTA es el del panel de precio (ya trae `calendarLabel`); este componente no
 * agrega uno propio.
 */
export function GrowthMetaAdsPresenciaOfferingContent({
  offeringId,
  pageTheme,
  accordionTheme,
  innerExpanded,
  onInnerToggle,
}: GrowthOfferingContentProps) {
  const { dark, accent, border, text } = pageTheme;
  const bodyStyle = {
    fontFamily: "var(--font-lato), 'Lato', sans-serif",
    color: text.secondary,
  };
  const expandedIndex = innerExpanded[offeringId] ?? null;

  return (
    <>
      <div className="space-y-3">
        {GROWTH_METAADS_PRESENCIA_SESSIONS.map((session, i) => (
          <GrowthAccordionItem
            key={session.num}
            itemId={`growth-metaads-presencia-session-${i}`}
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
        {GROWTH_METAADS_PRESENCIA_RESULTADO}
      </GrowthHighlightBlock>
    </>
  );
}
