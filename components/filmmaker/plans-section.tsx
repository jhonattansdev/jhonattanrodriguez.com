"use client";

import { useEffect, useRef, useState } from "react";
import { PlanCard } from "@/components/filmmaker/plan-card";
import { getPlanSurface, type PlanSurface } from "@/lib/filmmaker-plan-surface";
import { FILM_PLANS, FILM_PLANS_INTRO } from "@/lib/design-tokens";

type PlanTheme = Parameters<typeof getPlanSurface>[0];

/**
 * `Element.scrollIntoView()` recorre TODOS los ancestros con scroll, incluida
 * la página completa, no solo el carrusel — con la tarjeta fuera de vista
 * verticalmente arrastraba el scroll del documento entero hasta "Planes".
 * Esto centra la tarjeta moviendo únicamente `track.scrollLeft`.
 */
function centerCardInTrack(
  track: HTMLDivElement,
  card: HTMLDivElement,
  behavior: ScrollBehavior,
) {
  const trackRect = track.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const offset = cardRect.left - trackRect.left - (trackRect.width - cardRect.width) / 2;
  track.scrollTo({ left: track.scrollLeft + offset, behavior });
}

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
 * Ownership of `selectedPlan`/`activePlanIndex` is scoped to this component
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
  const [activePlanIndex, setActivePlanIndex] = useState(() =>
    Math.max(
      FILM_PLANS.findIndex((p) => p.featured),
      0,
    ),
  );
  const planTrackRef = useRef<HTMLDivElement | null>(null);
  const planCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const planRatiosRef = useRef<number[]>([]);

  useEffect(() => {
    const track = planTrackRef.current;
    if (!track) return;

    const sprintIndex = FILM_PLANS.findIndex((p) => p.featured);
    const sprintCard = planCardRefs.current[sprintIndex];
    if (sprintCard && track.scrollWidth > track.clientWidth) {
      centerCardInTrack(track, sprintCard, "auto");
    }

    planRatiosRef.current = FILM_PLANS.map(() => 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = planCardRefs.current.findIndex((el) => el === entry.target);
          if (idx === -1) return;
          planRatiosRef.current[idx] = entry.intersectionRatio;
        });

        let bestIndex = 0;
        let bestRatio = -1;
        planRatiosRef.current.forEach((ratio, idx) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = idx;
          }
        });
        setActivePlanIndex(bestIndex);
      },
      { root: track, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    planCardRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
        <div className="text-center mb-12 sm:mb-16">
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
        </div>

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
          ref={planTrackRef}
          className="flex gap-5 overflow-x-auto snap-x snap-proximity scroll-pl-6 -mx-6 px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:snap-none lg:px-0 lg:pb-0 items-stretch"
        >
          {FILM_PLANS.map((plan, i) => (
            <div
              key={plan.id}
              ref={(el) => {
                planCardRefs.current[i] = el;
              }}
              className="snap-center shrink-0 w-[78vw] max-w-[340px] lg:w-auto lg:max-w-none"
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

        <div className="flex justify-center gap-2 mt-5 lg:hidden">
          {FILM_PLANS.map((plan, i) => (
            <button
              key={plan.id}
              type="button"
              aria-label={`Ver ${plan.name}`}
              aria-current={activePlanIndex === i ? "true" : undefined}
              onClick={() => {
                const track = planTrackRef.current;
                const card = planCardRefs.current[i];
                if (track && card) centerCardInTrack(track, card, "smooth");
              }}
              className="h-2 rounded-full transition-all duration-250"
              style={{
                width: activePlanIndex === i ? "20px" : "8px",
                background: activePlanIndex === i ? accent : border,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
