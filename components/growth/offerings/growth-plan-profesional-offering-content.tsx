"use client";

import { GrowthAccordionItem } from "@/components/growth/growth-accordion-item";
import type { GrowthOfferingContentProps } from "@/components/growth/growth-offering-types";
import { GrowthHighlightBlock } from "@/components/growth/growth-highlight-block";
import {
  GROWTH_PLAN_PROFESIONAL_RESULTADO,
  GROWTH_PLAN_PROFESIONAL_SESSIONS,
} from "@/lib/growth-data";
import { growthContentAlign } from "@/lib/growth-layout";

/**
 * Plan profesional: las 12 sesiones en un solo acordeón continuo — mismo
 * patrón que `growth-metaads-presencia-offering-content.tsx` (del que toma
 * las 6 primeras tal cual). Las sesiones 7-12 no tienen "reto": es trabajo
 * libre, a la medida de cada perfil, no una tarea estándar. El CTA es el del
 * panel de precio (ya trae `calendarLabel`); este componente no agrega uno
 * propio.
 */
export function GrowthPlanProfesionalOfferingContent({
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
        {GROWTH_PLAN_PROFESIONAL_SESSIONS.map((session, i) => (
          <GrowthAccordionItem
            key={session.num}
            itemId={`growth-plan-profesional-session-${i}`}
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
        {GROWTH_PLAN_PROFESIONAL_RESULTADO}
      </GrowthHighlightBlock>
    </>
  );
}
