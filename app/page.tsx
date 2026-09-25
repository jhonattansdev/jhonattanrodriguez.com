"use client";

import Link from "next/link";
import { useTheme } from "@teispace/next-themes";
import { useEffect, useState, type CSSProperties } from "react";
import { GlowButton, ArrowRightIcon } from "@/components/shared/glow-button";
import { Reveal } from "@/components/shared/reveal";
import { CTASection } from "@/components/cta-buttons";
import { ThemeImageBackground } from "@/components/home/theme-image-background";
import { HistoriaSection } from "@/components/home/historia-section";
import { THEMES } from "@/lib/design-tokens";

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

  const services = [
    {
      label: "Developer AI",
      color: dark ? "#93c5fd" : "#2563eb",
      gradient: dark ? "from-blue-500/20 to-cyan-500/5" : "from-blue-100 to-cyan-50",
      border: dark ? "border-blue-500/20" : "border-blue-200",
      desc: "Arquitectura, orquestación y desarrollo de plataformas propias con sistemas integrados con IA para resolver problemas reales.",
      href: "/developer-ai",
    },
    {
      label: "Growth Hacker",
      color: dark ? "#86efac" : "#16a34a",
      gradient: dark ? "from-green-500/20 to-emerald-500/5" : "from-green-100 to-emerald-50",
      border: dark ? "border-green-500/20" : "border-green-200",
      desc: "Sistemas, IA y metodologías ágiles para founders que quieren operar sin depender de nadie.",
      href: "/growth",
    },
    {
      label: "Filmmaker",
      color: dark ? "#fdba74" : "#ea580c",
      gradient: dark ? "from-orange-500/20 to-amber-500/5" : "from-orange-100 to-amber-50",
      border: dark ? "border-orange-500/20" : "border-orange-200",
      desc: "Producción de contenido en video con estrategia integrada para marcas que necesitan presencia real.",
      href: "/filmmaker",
    },
  ];

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
          {/* Location badge */}
          <Reveal
            className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase mb-8 px-4 py-2.5 rounded-full backdrop-blur-sm transition-all duration-300"
            style={{
              fontFamily: "var(--font-lato), 'Lato', sans-serif",
              color: t.text.muted,
              border: `1px solid ${t.border}`,
              background: t.card,
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: dark ? "#4ade80" : "#16a34a" }}
            />
            Bogotá, Colombia
          </Reveal>

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
            {services.map((item, i) => (
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
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12"
            style={{
              fontFamily: "var(--font-lato), 'Lato', sans-serif",
              color: t.text.secondary,
            }}
          >
            Desde el año 2019, a raíz de la pandemia, he logrado desarrollar un perfil
            multidisciplinario que le puede aportar demasiado valor a tu estrategia empresarial.
            La perspectiva 360 que tengo en los modelos de negocio me convierte en un aliado
            estratégico de CEOs & equipos fundadores en su proceso de expansión digital y tecnológico.
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

      {/* Services cards */}
      <section id="disciplinas" className="relative">
          <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
          <Reveal className="mb-16 text-center discipline-surface px-5 py-10 sm:px-8 sm:py-12 md:px-10">
            <span
              className="inline-block text-xs tracking-[0.22em] uppercase font-medium mb-4 px-4 py-2 rounded-full"
              style={{
                fontFamily: "var(--font-lato), 'Lato', sans-serif",
                color: t.accent,
                background: dark ? `${t.accent}15` : `${t.accent}10`,
              }}
            >
              Lo que hago
            </span>
            <h2
              className="font-bold text-balance leading-tight md:leading-normal"
              style={{
                fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                fontSize: "clamp(18px, 4.5vw, 40px)",
                letterSpacing: "-0.02em",
                color: t.text.primary,
              }}
            >
              «ESTRATEGIA, NARRATIVA E IA:
              <br className="md:hidden" />
              CADA UNA CON SU RUTA»
            </h2>
          </Reveal>

          <Reveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((card, i) => (
              <Link
                key={i}
                href={card.href}
                className={`group relative text-center p-8 rounded-3xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 overflow-hidden border ${card.border}`}
                style={{
                  background: t.card,
                  backdropFilter: "blur(20px)",
                  boxShadow: dark
                    ? `0 4px 40px ${card.color}08`
                    : "0 4px 40px rgba(0,0,0,0.04)",
                }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon placeholder */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: dark ? `${card.color}15` : `${card.color}12`,
                      border: `1px solid ${card.color}30`,
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-lg"
                      style={{ background: card.color }}
                    />
                  </div>

                  <div
                    className="font-bold text-xl mb-3"
                    style={{
                      fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                      color: card.color,
                    }}
                  >
                    {card.label}
                  </div>
                  <p
                    className="text-sm leading-relaxed mb-6 text-pretty max-w-prose"
                    style={{
                      fontFamily: "var(--font-lato), 'Lato', sans-serif",
                      color: t.text.secondary,
                    }}
                  >
                    {card.desc}
                  </p>
                  <div
                    className="flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                    style={{
                      color: card.color,
                      fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
                    }}
                  >
                    Explorar <ArrowRightIcon />
                  </div>
                </div>
              </Link>
            ))}
          </Reveal>
          </div>
        </section>

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
