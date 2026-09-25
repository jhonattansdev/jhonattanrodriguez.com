"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { PlanCard } from "@/components/filmmaker/plan-card";
import { Reveal } from "@/components/shared/reveal";
import { getPlanSurface, type PlanSurface } from "@/lib/filmmaker-plan-surface";
import { FILM_PLANS, FILM_PLANS_INTRO } from "@/lib/design-tokens";

type PlanTheme = Parameters<typeof getPlanSurface>[0];

const FEATURED_INDEX = Math.max(
  FILM_PLANS.findIndex((p) => p.featured),
  0,
);

/**
 * Bucle infinito en mobile/tablet; desde `lg` (64rem) Embla se desactiva y las
 * 3 tarjetas quedan en la cuadrícula estática. Embla desactiva `loop` en
 * silencio si (resto de slides + márgenes) < ancho del viewport, por eso las
 * slides no usan CSS `gap` (solo se mide el `margin-right`) ni topes de ancho
 * en tablet, y `containScroll` va apagado para que sigan centradas.
 */
const EMBLA_OPTIONS: NonNullable<Parameters<typeof useEmblaCarousel>[0]> = {
  loop: true,
  align: "center",
  startIndex: FEATURED_INDEX,
  containScroll: false,
  slidesToScroll: 1,
  dragFree: false,
  skipSnaps: false,
  breakpoints: { "(min-width: 64rem)": { active: false } },
};

type FilmPlansSectionProps = {
  dark: boolean;
  tp: string;
  ts: string;
  display: string;
  accent: string;
  border: string;
  planTheme: PlanTheme;
};

/**
 * Ownership of `selectedPlan`/`selectedIndex` is scoped to this component
 * (not the page) so that expanding a plan or swiping the mobile carousel
 * only re-renders this section, not the entire /filmmaker page.
 */
export function FilmPlansSection({
  dark,
  tp,
  ts,
  display,
  accent,
  border,
  planTheme,
}: FilmPlansSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(FEATURED_INDEX);
  const [ready, setReady] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel(EMBLA_OPTIONS);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    // Sin esto, arrastrar con mouse (ventanas angostas, tablets con mouse)
    // selecciona el texto de la página; se bloquea solo mientras dura el arrastre.
    const root = emblaApi.rootNode();
    const lock = () => {
      root.style.userSelect = "none";
      root.style.setProperty("-webkit-user-select", "none");
    };
    const unlock = () => {
      root.style.userSelect = "";
      root.style.removeProperty("-webkit-user-select");
    };
    // WebKit desplaza el viewport `overflow:hidden` para mostrar un control
    // enfocado (p. ej. al recorrerlo con VoiceOver); Embla mueve con transform,
    // así que ese scroll dejaría el carrusel corrido y desincronizado.
    const resetScroll = () => {
      if (root.scrollLeft !== 0) root.scrollLeft = 0;
    };
    sync();
    setReady(true);
    emblaApi.on("select", sync).on("reInit", sync).on("pointerDown", lock).on("pointerUp", unlock);
    root.addEventListener("scroll", resetScroll, { passive: true });
    return () => {
      emblaApi.off("select", sync).off("reInit", sync).off("pointerDown", lock).off("pointerUp", unlock);
      root.removeEventListener("scroll", resetScroll);
      unlock();
    };
  }, [emblaApi]);

  // Embla no escucha la rueda/trackpad: un gesto horizontal avanza una tarjeta y
  // el bloqueo dura hasta que cesa la inercia; la rueda vertical sigue siendo
  // scroll de página.
  useEffect(() => {
    if (!emblaApi) return;
    const node = emblaApi.rootNode();
    const desktop = window.matchMedia("(min-width: 64rem)");
    let acc = 0;
    let locked = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const onWheel = (e: WheelEvent) => {
      if (desktop.matches || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      clearTimeout(timer);
      timer = setTimeout(() => {
        locked = false;
        acc = 0;
      }, 140);
      if (locked) return;
      acc += e.deltaX;
      if (Math.abs(acc) >= 40) {
        if (acc > 0) emblaApi.scrollNext();
        else emblaApi.scrollPrev();
        locked = true;
        acc = 0;
      }
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      node.removeEventListener("wheel", onWheel);
      clearTimeout(timer);
    };
  }, [emblaApi]);

  const surfacesByPlanId = new Map<string, PlanSurface>(
    FILM_PLANS.map((plan) => [plan.id, getPlanSurface(planTheme)]),
  );

  return (
    <section
      id="planes"
      className="py-16 sm:py-24 relative scroll-mt-28"
      style={{ borderTop: `1px solid ${border}` }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="text-center mb-12 sm:mb-16">
          <span
            className="film-display-kicker font-medium block mb-3"
            style={{ fontFamily: "var(--font-lato), sans-serif", color: display }}
          >
            Nuestros planes
          </span>
          <h2
            className="font-semibold text-2xl sm:text-3xl"
            style={{
              fontFamily: "var(--font-quicksand), sans-serif",
              color: tp,
              letterSpacing: "-0.02em",
            }}
          >
            Elige el plan que se adapta a tu ritmo
          </h2>
          <p
            className="text-base max-w-2xl mx-auto mt-6 leading-relaxed text-pretty"
            style={{ fontFamily: "var(--font-lato), sans-serif", color: ts, lineHeight: 1.7 }}
          >
            {FILM_PLANS_INTRO}
          </p>
        </Reveal>

        <div
          className="flex items-center justify-center gap-2 mb-4 lg:hidden"
          style={{ fontFamily: "var(--font-lato), sans-serif", color: ts }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: accent }}
            aria-hidden
          >
            <path d="M8 7l-4 5 4 5M16 7l4 5-4 5" />
          </svg>
          <span className="text-xs">Desliza para comparar planes</span>
        </div>

        <div
          ref={emblaRef}
          className={`-mx-6 overflow-hidden pb-2 cursor-grab active:cursor-grabbing lg:mx-0 lg:overflow-visible lg:pb-0 lg:cursor-auto ${
            ready ? "" : "invisible lg:visible"
          }`}
          role="group"
          aria-label="Planes"
        >
          <div className="flex touch-pan-y touch-pinch-zoom items-stretch lg:grid lg:grid-cols-3 lg:gap-8">
            {FILM_PLANS.map((plan) => (
              <div
                key={plan.id}
                className="mr-5 shrink-0 w-[78vw] max-w-[340px] sm:w-[52vw] sm:max-w-none lg:mr-0 lg:w-auto"
              >
                <PlanCard
                  plan={plan}
                  surface={surfacesByPlanId.get(plan.id)!}
                  siteDark={dark}
                  accent={accent}
                  accentSolid={planTheme.accentSolid}
                  selected={selectedPlan === plan.id}
                  onToggle={() =>
                    setSelectedPlan(selectedPlan === plan.id ? null : plan.id)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-5 lg:hidden">
          {FILM_PLANS.map((plan, i) => (
            <button
              key={plan.id}
              type="button"
              aria-label={`Ver ${plan.name}`}
              aria-current={selectedIndex === i ? "true" : undefined}
              onClick={() => emblaApi?.scrollTo(i)}
              className="h-2 rounded-full transition-colors"
              style={{
                width: selectedIndex === i ? "20px" : "8px",
                background: selectedIndex === i ? accent : border,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
