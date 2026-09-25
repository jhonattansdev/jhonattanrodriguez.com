"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
} from "react";
import { CTACalendar } from "@/components/cta-buttons";
import type { GrowthAccordionTheme } from "@/components/growth/growth-accordion-item";
import {
  GROWTH_PANEL_ID,
  GrowthOfferingTile,
  growthTabId,
} from "@/components/growth/growth-offering-tile";
import type {
  GrowthOfferingContentProps,
  GrowthPageTheme,
} from "@/components/growth/growth-offering-types";
import { GrowthPricePanel } from "@/components/growth/growth-price-panel";
import { GrowthSectionKicker } from "@/components/growth/growth-section-kicker";
import { Reveal } from "@/components/shared/reveal";
import { GROWTH_OFFERING_CONTENT } from "@/lib/growth-offering-content";
import {
  GROWTH_OFFERING_ORDER,
  GROWTH_OFFERINGS,
  toggleInnerExpanded,
  type GrowthInnerExpanded,
  type GrowthOfferingId,
} from "@/lib/growth-data";
import { growthContentAlign, growthDetailsWrap, growthProseWrap } from "@/lib/growth-layout";

export const GROWTH_SECTION_ID = "servicios";

type GrowthOfferingsProps = {
  selectedId: GrowthOfferingId;
  onSelect: (id: GrowthOfferingId) => void;
  pageTheme: GrowthPageTheme;
  accordionTheme: GrowthAccordionTheme;
  innerExpanded: GrowthInnerExpanded;
  setInnerExpanded: Dispatch<SetStateAction<GrowthInnerExpanded>>;
};

/**
 * Selector de servicios (mini-cards) + un solo panel con el detalle. La fila es
 * scroll nativo en mobile (rueda, trackpad y touch funcionan sin código extra) y
 * se envuelve centrada desde `md`, así que soporta hasta 7 servicios.
 */
export function GrowthOfferings({
  selectedId,
  onSelect,
  pageTheme,
  accordionTheme,
  innerExpanded,
  setInnerExpanded,
}: GrowthOfferingsProps) {
  const { dark, accent, accentSolid, border, card, display, text } = pageTheme;
  const tabRefs = useRef<Partial<Record<GrowthOfferingId, HTMLButtonElement | null>>>({});
  const firstCenter = useRef(true);
  const scrollToSelectorOnSelect = useRef(false);

  const select = useCallback(
    (id: GrowthOfferingId) => {
      onSelect(id);
      window.history.replaceState(null, "", `#${id}`);
    },
    [onSelect],
  );

  // Centra la pestaña activa moviendo solo el scroll de la fila (el `tablist`,
  // padre de las pestañas): `scrollIntoView` arrastraría también el de la página.
  useEffect(() => {
    const tab = tabRefs.current[selectedId];
    const strip = tab?.parentElement;
    if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return;
    const s = strip.getBoundingClientRect();
    const t = tab.getBoundingClientRect();
    const offset = t.left - s.left - (s.width - t.width) / 2;
    strip.scrollTo({
      left: strip.scrollLeft + offset,
      behavior: firstCenter.current ? "auto" : "smooth",
    });
    firstCenter.current = false;
  }, [selectedId]);

  // El scroll va DESPUÉS de que el nuevo panel esté pintado: si la página se
  // encoge al cambiar de panel, WebKit cancela un scroll suave iniciado antes.
  useEffect(() => {
    if (!scrollToSelectorOnSelect.current) return;
    scrollToSelectorOnSelect.current = false;
    document.getElementById(GROWTH_SECTION_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedId]);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = GROWTH_OFFERING_ORDER.length - 1;
    const current = GROWTH_OFFERING_ORDER.indexOf(selectedId);
    let next: number | null = null;
    if (event.key === "ArrowRight") next = current === last ? 0 : current + 1;
    else if (event.key === "ArrowLeft") next = current === 0 ? last : current - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    const id = GROWTH_OFFERING_ORDER[next];
    select(id);
    tabRefs.current[id]?.focus({ preventScroll: true });
  };

  const meta = GROWTH_OFFERINGS[selectedId];
  const Content = GROWTH_OFFERING_CONTENT[selectedId];
  const nextId =
    GROWTH_OFFERING_ORDER[(GROWTH_OFFERING_ORDER.indexOf(selectedId) + 1) % GROWTH_OFFERING_ORDER.length];
  const nextMeta = GROWTH_OFFERINGS[nextId];

  const contentProps: GrowthOfferingContentProps = {
    offeringId: selectedId,
    pageTheme,
    accordionTheme,
    innerExpanded,
    onInnerToggle: (index: number) => {
      setInnerExpanded((prev) => toggleInnerExpanded(prev, selectedId, index));
    },
    isOfferingExpanded: true,
  };

  return (
    <section id={GROWTH_SECTION_ID} className="py-16 sm:py-20 relative scroll-mt-28">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal
          stagger
          role="tablist"
          aria-label="Servicios de Growth"
          className="flex gap-3 overflow-x-auto snap-x snap-proximity -mx-6 px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:pb-0 md:overflow-visible md:snap-none md:flex-wrap md:justify-center"
        >
          {GROWTH_OFFERING_ORDER.map((id) => (
            <GrowthOfferingTile
              key={id}
              meta={GROWTH_OFFERINGS[id]}
              selected={id === selectedId}
              pageTheme={pageTheme}
              onSelect={() => select(id)}
              onKeyDown={onTabKeyDown}
              buttonRef={(el) => {
                tabRefs.current[id] = el;
              }}
            />
          ))}
        </Reveal>

        <div
          key={selectedId}
          role="tabpanel"
          id={GROWTH_PANEL_ID}
          aria-labelledby={growthTabId(selectedId)}
          className="mt-6 sm:mt-8 p-6 sm:p-8 lg:p-10 rounded-3xl animate-in fade-in-0 slide-in-from-bottom-2 duration-300 motion-reduce:animate-none"
          style={{ background: card, border: `1px solid ${border}` }}
        >
          <div className="flex flex-col items-center text-center gap-6">
            <div className="w-full max-w-3xl flex flex-col items-center gap-3">
              <div className="flex justify-center w-full">
                <GrowthSectionKicker
                  label={meta.kicker}
                  variant={meta.kickerVariant}
                  accent={accent}
                  dark={dark}
                  displayColor={display}
                />
              </div>
              <h2
                className="font-bold mb-4 text-center w-full"
                style={{
                  fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                  color: text.primary,
                  fontSize: "clamp(24px, 3.5vw, 36px)",
                }}
              >
                {meta.title}
              </h2>
              <p
                className={`text-sm sm:text-base leading-relaxed ${growthProseWrap} ${growthContentAlign}`}
                style={{
                  fontFamily: "var(--font-lato), 'Lato', sans-serif",
                  color: text.secondary,
                }}
              >
                {meta.intro}
              </p>
            </div>
            <div className="w-full flex justify-center">
              <GrowthPricePanel
                priceCop={meta.priceCop}
                duration={meta.duration}
                priceNote={meta.priceNote}
                priceSize={meta.priceSize ?? "lg"}
                dark={dark}
                accent={accent}
                border={border}
                textMuted={text.muted}
              >
                {meta.calendarLabel ? (
                  <CTACalendar
                    variant="primary"
                    dark={dark}
                    accentColor={accent}
                    accentSolidColor={accentSolid}
                    label={meta.calendarLabel}
                    className="mt-4 w-full max-w-xs mx-auto"
                  />
                ) : null}
              </GrowthPricePanel>
            </div>
          </div>

          <div className={`${growthDetailsWrap} mt-8`}>
            <Content {...contentProps} />
          </div>

          {GROWTH_OFFERING_ORDER.length > 1 ? (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  scrollToSelectorOnSelect.current = true;
                  select(nextId);
                }}
                className="min-h-[44px] rounded-full px-5 py-2.5 text-sm font-medium border transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--growth-next-focus)]"
                style={{
                  ["--growth-next-focus" as string]: accent,
                  fontFamily: "var(--font-lato), 'Lato', sans-serif",
                  color: accent,
                  borderColor: border,
                  background: dark ? `${accent}0a` : `${accent}08`,
                }}
              >
                Siguiente servicio: {nextMeta.tabTitle} <span aria-hidden>→</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
