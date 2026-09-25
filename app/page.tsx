"use client";

import Link from "next/link";
import { useTheme } from "@teispace/next-themes";
import { useEffect, useState, type CSSProperties } from "react";
import { GlowButton, ArrowRightIcon } from "@/components/shared/glow-button";
import { Reveal } from "@/components/shared/reveal";
import { CTASection } from "@/components/cta-buttons";
import { DisciplinesSection } from "@/components/home/disciplines-section";
import { HeroAvatar } from "@/components/home/hero-avatar";
import { ThemeImageBackground } from "@/components/home/theme-image-background";
import { HistoriaSection } from "@/components/home/historia-section";
import { THEMES } from "@/lib/design-tokens";
import { getHomeDisciplines } from "@/lib/home-disciplines";

export default function HomePage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen" style={{ background: THEMES.index.dark.bg }} />;
  }

  const dark = theme === "dark";
  const t = dark ? THEMES.index.dark : THEMES.index.light;

  const disciplines = getHomeDisciplines(dark);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: t.bg }}>
      {/* Hero: image + gradients scoped to this section only */}
      <section
        className="relative min-h-screen overflow-hidden flex flex-col pt-24 pb-8"
        style={{ "--hero-fade-color": t.bg } as CSSProperties}
      >
        <ThemeImageBackground dark={dark} />
        <div className="hero-bottom-fade" aria-hidden />

        <div className="flex flex-1 items-center justify-center relative z-10">
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10 w-full">
          {/* Foto de perfil (ocupa el lugar de la etiqueta de ubicación) */}
          <HeroAvatar dark={dark} accent={t.accent} secondary={t.secondary} />

          {/* Name */}
          <Reveal
            as="h1"
            delay={90}
            className="mb-6 leading-none"
            style={{
              fontFamily: "var(--font-engagement), 'Engagement', cursive",
              fontSize: "clamp(52px,10vw,96px)",
              color: t.text.primary,
            }}
          >
            Jhonattan Rodriguez
          </Reveal>

          {/* Roles */}
          <Reveal delay={180} className="flex items-center justify-center gap-2 md:gap-5 mb-8 flex-wrap">
            {disciplines.map((item, i) => (
              <span key={i} className="flex items-center gap-2 md:gap-3">
                {i > 0 && (
                  <span style={{ color: t.text.muted, fontSize: 20 }}>·</span>
                )}
                <Link
                  href={item.href}
                  className="font-semibold text-base md:text-lg uppercase tracking-[0.18em] transition-all duration-200 hover:opacity-70"
                  style={{
                    fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                    color: item.color,
                  }}
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </Reveal>

          {/* Description */}
          <Reveal
            as="p"
            delay={270}
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12 text-pretty"
            style={{
              fontFamily: "var(--font-lato), 'Lato', sans-serif",
              color: t.text.secondary,
            }}
          >
            {/* &nbsp; antes del "&": evita que una línea empiece con el símbolo */}
            Desde el año 2019, a raíz de la pandemia, he logrado desarrollar un perfil
            multidisciplinario adaptado a la cuarta revolución industrial. La perspectiva 360
            estratégica y técnica que he formado en diferentes modelos de negocio me convierte en un
            aliado estratégico de CEOs, profesionales independientes&nbsp;& equipos fundadores en su
            proceso de posicionamiento de marca digital e implementación tecnológica.
          </Reveal>

          {/* CTA buttons */}
          <Reveal delay={360} className="flex gap-4 justify-center flex-wrap">
            <GlowButton
              href="#disciplinas"
              variant="primary"
              accentColor={t.accent}
              secondaryColor={t.secondary}
              icon={<ArrowRightIcon />}
            >
              Conoce lo que hago
            </GlowButton>
            <GlowButton
              href="#historia"
              variant="secondary"
              accentColor={t.accent}
              secondaryColor={t.secondary}
            >
              CV
            </GlowButton>
          </Reveal>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center relative z-10">
            <div
              className="w-px h-16"
              style={{
                background: dark
                  ? "linear-gradient(to bottom,rgba(255,255,255,0.18),transparent)"
                  : `linear-gradient(to bottom,${t.accent}40,transparent)`,
              }}
            />
          </div>
        </section>

      {/* Historia / CV */}
      <HistoriaSection dark={dark} t={t} />

      {/* Lo que hago: una tarjeta por servicio */}
      <DisciplinesSection dark={dark} t={t} disciplines={disciplines} />

      {/* CTA Section */}
      <section style={{ borderTop: `1px solid ${t.border}` }}>
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <CTASection
              dark={dark}
              accentColor={t.accent}
              accentSolidColor={t.accentSolid}
              title="¿Listo para empezar?"
              description="Agenda una llamada para conocer tu proyecto o escríbeme directamente por WhatsApp."
            />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
