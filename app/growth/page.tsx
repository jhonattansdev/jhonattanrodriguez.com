"use client";

import { useTheme } from "@teispace/next-themes";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import type { GrowthAccordionTheme } from "@/components/growth/growth-accordion-item";
import { GrowthOfferingsList } from "@/components/growth/growth-offerings-list";
import { ThemedPageShell } from "@/components/sections/themed-page-shell";
import { CTASection, CTACalendar, CTAWhatsApp } from "@/components/cta-buttons";
import { getLinkedInLink, getLinkedInLabel } from "@/lib/cta-links";
import { GlowButton } from "@/components/shared/glow-button";
import { RouteHeroStack } from "@/components/sections/route-hero-stack";
import { useGrowthOfferingHash } from "@/hooks/use-growth-offering-hash";
import { GROWTH_STACK, THEMES } from "@/lib/design-tokens";
import {
  GROWTH_INITIAL_INNER_EXPANDED,
  toggleOffering,
  type GrowthInnerExpanded,
  type GrowthOfferingId,
} from "@/lib/growth-data";
import {
  ROUTE_HERO_CONTENT,
  ROUTE_HERO_INNER,
  ROUTE_HERO_SECTION,
} from "@/lib/route-hero-layout";

export default function GrowthPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [expandedOffering, setExpandedOffering] = useState<GrowthOfferingId | null>(null);
  const [innerExpanded, setInnerExpanded] = useState<GrowthInnerExpanded>(GROWTH_INITIAL_INNER_EXPANDED);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGrowthOfferingHash(setExpandedOffering);

  const handleToggleOffering = useCallback((id: GrowthOfferingId) => {
    setExpandedOffering((prev) => toggleOffering(prev, id));
  }, []);

  if (!mounted) {
    return <div className="min-h-screen" style={{ background: THEMES.growth.dark.bg }} />;
  }

  const dark = theme === "dark";
  const t = dark ? THEMES.growth.dark : THEMES.growth.light;
  const display = t.display;
  const heroBgRgb = dark ? "6, 13, 4" : "250, 253, 251";

  const pageTheme = {
    dark,
    accent: t.accent,
    accentSolid: t.accentSolid,
    border: t.border,
    card: t.card,
    display,
    text: t.text,
  };

  const accordionTheme: GrowthAccordionTheme = {
    accent: t.accent,
    border: t.border,
    dark,
    textPrimary: t.text.primary,
    textSecondary: t.text.secondary,
    textMuted: t.text.muted,
  };

  const bodyStyle = {
    fontFamily: "var(--font-lato), 'Lato', sans-serif",
    color: t.text.secondary,
  };

  return (
    <ThemedPageShell pageBackground={t.bg} accentColor={t.accent} secondaryColor={t.secondary} dark={dark}>
      <section
        data-route-hero
        className={ROUTE_HERO_SECTION}
        style={{ "--hero-fade-color": t.bg, backgroundColor: t.bg } as CSSProperties}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/growth/growth-hero-bg.gif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: dark ? 0.55 : 0.28,
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: dark
              ? `linear-gradient(135deg, rgba(${heroBgRgb},0.82) 0%, rgba(${heroBgRgb},0.68) 45%, rgba(${heroBgRgb},0.76) 100%)`
              : `linear-gradient(135deg, rgba(${heroBgRgb},0.88) 0%, rgba(${heroBgRgb},0.80) 55%, rgba(${heroBgRgb},0.86) 100%)`,
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: dark
              ? `linear-gradient(to bottom, rgba(${heroBgRgb},0.05) 0%, rgba(${heroBgRgb},0.42) 48%, rgba(${heroBgRgb},0.82) 70%, ${t.bg} 100%)`
              : `linear-gradient(to bottom, rgba(${heroBgRgb},0.04) 0%, rgba(${heroBgRgb},0.22) 48%, rgba(${heroBgRgb},0.76) 72%, ${t.bg} 100%)`,
          }}
          aria-hidden
        />
        <div className={ROUTE_HERO_CONTENT}>
          <div className={ROUTE_HERO_INNER}>
            <div className="mb-4 flex justify-center">
              <GlowButton
                href={getLinkedInLink()}
                external
                variant="secondary"
                size="md"
                accentColor={t.accentSolid}
                secondaryColor={t.accent}
              >
                <span className="inline-flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-11h4" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  {getLinkedInLabel()}
                </span>
              </GlowButton>
            </div>
            <p
              className="film-display-kicker font-semibold mb-4 text-center"
              style={{ fontFamily: "var(--font-lato), sans-serif", color: display }}
            >
              Growth Hacker
            </p>
            <h1
              className="font-bold leading-[1.1] mb-4 text-center"
              style={{
                fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                fontSize: "clamp(28px,4.5vw,52px)",
                color: t.text.primary,
              }}
            >
              <span className="md:hidden">
                <span className="block">El founder que domina</span>
                <span className="block">sus propias herramientas</span>
                <span className="block" style={{ color: t.accent }}>
                  no necesita permiso
                </span>
                <span className="block" style={{ color: t.accent }}>
                  de nadie para crecer.
                </span>
              </span>
              <span className="hidden md:block">
                <span className="block">El founder que domina</span>
                <span className="block">
                  sus propias herramientas{" "}
                  <span style={{ color: t.accent }}>no necesita</span>
                </span>
                <span className="block" style={{ color: t.accent }}>
                  permiso de nadie para crecer.
                </span>
              </span>
            </h1>
            <p
              className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6 text-pretty"
              style={{ ...bodyStyle, lineHeight: 1.7 }}
            >
              Es imposible delegar bien lo que no entiendes. Te entreno en pensamiento sistémico,
              posicionamiento de marca y metodologías ágiles para que lideres tu operación con estrategia
              y la cedas cuando quieras, no porque no te quede otra.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center">
              <CTACalendar
                variant="primary"
                dark={dark}
                accentColor={t.accent}
                accentSolidColor={t.accentSolid}
              />
              <CTAWhatsApp
                variant="secondary"
                context="growth"
                dark={dark}
                accentColor={t.accent}
                label="Hablemos de tu operación"
              />
              <GlowButton
                href="#metaads"
                variant="ghost"
                size="md"
                accentColor={t.accent}
                secondaryColor={t.accent}
                className="text-sm"
              >
                Ver ofertas
              </GlowButton>
            </div>
            <RouteHeroStack
              stackLabel="> stack --growth"
              items={GROWTH_STACK}
              dark={dark}
              theme={{
                card: t.card,
                border: t.border,
                accent: t.accent,
                textSecondary: t.text.secondary,
              }}
            />
          </div>
        </div>
        <div className="hero-bottom-fade hero-bottom-fade--growth" aria-hidden />
      </section>

      <section className="py-16 sm:py-20 relative">
        <div className="max-w-5xl mx-auto px-6 space-y-4 sm:space-y-6">
          <GrowthOfferingsList
            expandedOffering={expandedOffering}
            onToggleOffering={handleToggleOffering}
            pageTheme={pageTheme}
            accordionTheme={accordionTheme}
            innerExpanded={innerExpanded}
            setInnerExpanded={setInnerExpanded}
          />
        </div>
      </section>

      <section className="py-16 sm:py-20 relative" style={{ borderTop: `1px solid ${t.border}` }}>
        <div className="max-w-5xl mx-auto px-6">
          <CTASection
            dark={dark}
            accentColor={t.accent}
            accentSolidColor={t.accentSolid}
            context="growth"
            title="¿Listo para tomar el control?"
            description="Agenda una sesión de diagnóstico o escríbeme directamente para conocer tu caso."
          />
        </div>
      </section>
    </ThemedPageShell>
  );
}
