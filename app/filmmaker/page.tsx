"use client";

import { useTheme } from "@teispace/next-themes";
import { useEffect, useLayoutEffect, useState, type CSSProperties } from "react";
import { RouteHeroStack } from "@/components/sections/route-hero-stack";
import { ThemedPageShell } from "@/components/sections/themed-page-shell";
import { GlowButton } from "@/components/shared/glow-button";
import { Reveal } from "@/components/shared/reveal";
import { FilmMediaFrame } from "@/components/filmmaker/film-media-frame";
import { FilmMethodSection } from "@/components/filmmaker/method-section";
import { NumberedList } from "@/components/filmmaker/numbered-list";
import { FilmPlansSection } from "@/components/filmmaker/plans-section";
import { VideoPortfolioCarousel } from "@/components/filmmaker/video-portfolio-carousel";
import { FILM_MEDIA } from "@/lib/filmmaker-media";
import { CTASection, CTAWhatsApp } from "@/components/cta-buttons";
import { getYouTubeLink, getYouTubeLabel } from "@/lib/cta-links";
import {
  THEMES,
  FILM_PROCESS,
  FILM_RESULTS,
  FILM_STACK,
} from "@/lib/design-tokens";
import { useNight } from "@/lib/night-mode";
import { hexToRgbTriplet, withNight } from "@/lib/route-theme";
import {
  ROUTE_HERO_CONTENT,
  ROUTE_HERO_INNER,
  ROUTE_HERO_SECTION,
} from "@/lib/route-hero-layout";

export default function FilmmakerPage() {
  const { theme } = useTheme();
  const { night } = useNight();
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // El contenido real (incluido `id="planes"`) recién existe en el DOM cuando
  // `mounted` pasa a true. Si la URL llegó con #planes (p. ej. tras recargar
  // después de tocar "Ver planes"), el navegador puede saltar al ancla justo
  // en ese momento; se corrige de inmediato en el mismo ciclo de pintado.
  // (No se toca `history.scrollRestoration`: es un estado global del navegador
  // para toda la sesión de historial, no de esta página — fijarlo en "manual"
  // rompía el scroll-to-top nativo de Next.js en otras navegaciones y la
  // restauración de scroll con el botón "atrás" en cualquier ruta.)
  useLayoutEffect(() => {
    if (!mounted) return;
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [mounted]);

  if (!mounted) {
    return (
      <div
        className="min-h-screen"
        data-route-placeholder="vertical"
        style={{ background: THEMES.filmmaker.dark.bg }}
      />
    );
  }

  const dark = theme === "dark";
  const t = withNight(dark ? THEMES.filmmaker.dark : THEMES.filmmaker.light, night && dark);
  const display = t.display;
  /** RGB de t.bg: dark #0a0704 | light #fffcfa | Night #000000 */
  const heroBgRgb = hexToRgbTriplet(t.bg);

  // Los velos cálidos (marrón) del tono actual pasan a negro neutro en Night.
  const heroToneOverlay = !dark
    ? "linear-gradient(160deg, rgba(251,146,60,0.1) 0%, rgba(255,252,250,0.46) 55%, rgba(255,252,250,0.5) 100%)"
    : night
      ? "linear-gradient(160deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.44) 45%, rgba(0,0,0,0.5) 100%)"
      : "linear-gradient(160deg, rgba(50,28,14,0.28) 0%, rgba(20,12,8,0.44) 45%, rgba(10,7,4,0.5) 100%)";
  const ctaOverlay = !dark
    ? "linear-gradient(120deg, rgba(251,146,60,0.2), rgba(255,252,250,0.98))"
    : night
      ? "linear-gradient(120deg, rgba(0,0,0,0.85), rgba(0,0,0,0.95))"
      : "linear-gradient(120deg, rgba(40,22,10,0.85), rgba(10,7,4,0.95))";

  const tp = t.text.primary;
  const ts = t.text.secondary;
  const tm = t.text.muted;
  const ab = dark ? "rgba(253,186,116,0.20)" : "rgba(194,65,12,0.18)";
  const gb = dark ? "rgba(253,186,116,0.08)" : "rgba(194,65,12,0.08)";
  const div = t.border;
  const cardBg = t.card;

  const planTheme = {
    tp,
    ts,
    tm,
    accent: t.accent,
    accentSolid: t.accentSolid,
    cardBg,
    div,
    ab,
    gb,
    badgeText: dark ? t.bg : "#ffffff",
  };

  return (
    <ThemedPageShell pageBackground={t.bg} accentColor={t.accent} secondaryColor={t.secondary} dark={dark}>
      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        data-route-hero
        data-theme={dark ? "dark" : "light"}
        className={`${ROUTE_HERO_SECTION} filmmaker-hero`}
        style={{ "--hero-fade-color": t.bg, backgroundColor: t.bg } as CSSProperties}
      >
        <div
          className="absolute inset-0 pointer-events-none filmmaker-hero-gif"
          style={{
            backgroundImage: "url('/filmmaker/filmmaker-hero-bg.gif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: heroToneOverlay,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: dark
              ? `linear-gradient(135deg, rgba(${heroBgRgb},0.44) 0%, rgba(${heroBgRgb},0.36) 45%, rgba(${heroBgRgb},0.41) 100%)`
              : `linear-gradient(135deg, rgba(${heroBgRgb},0.46) 0%, rgba(${heroBgRgb},0.42) 55%, rgba(${heroBgRgb},0.45) 100%)`,
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: dark
              ? `linear-gradient(to bottom, rgba(${heroBgRgb},0.04) 0%, rgba(${heroBgRgb},0.24) 55%, ${t.bg} 100%)`
              : `linear-gradient(to bottom, rgba(${heroBgRgb},0.03) 0%, rgba(${heroBgRgb},0.18) 55%, ${t.bg} 100%)`,
          }}
          aria-hidden
        />

        <div className={ROUTE_HERO_CONTENT}>
          <div className={ROUTE_HERO_INNER}>
          <Reveal className="mb-4 flex justify-center">
            <GlowButton
              href={getYouTubeLink()}
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
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.42a2.78 2.78 0 0 0-1.95 2 2.87 2.87 0 0 0 0 1.07v3.09a2.87 2.87 0 0 0 1.03 2.2 2.78 2.78 0 0 0 1.95.43C5.12 20 12 20 12 20s6.88 0 8.59-.42a2.78 2.78 0 0 0 1.95-2 2.87 2.87 0 0 0 0-1.07V7.49a2.87 2.87 0 0 0-1.03-2.07z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
                </svg>
                {getYouTubeLabel()}
              </span>
            </GlowButton>
          </Reveal>
          <Reveal
            as="p"
            delay={90}
            className="film-display-kicker font-semibold mb-4"
            style={{ fontFamily: "var(--font-lato), sans-serif", color: display }}
          >
            Filmmaker
          </Reveal>
          <Reveal
            as="h1"
            delay={180}
            className="font-bold leading-tight mb-4 text-center"
            style={{
              fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
              fontSize: "clamp(32px, 5vw, 56px)",
              color: tp,
            }}
          >
            <span className="md:hidden">
              <span className="block">Un sistema de producción</span>
              <span className="block">de contenido</span>
              <span className="block" style={{ color: t.accent }}>
                eficiente y efectivo.
              </span>
            </span>
            <span className="hidden md:block">
              <span className="block">Un sistema de producción</span>
              <span className="block">
                de contenido{" "}
                <span style={{ color: t.accent }}>eficiente y efectivo.</span>
              </span>
            </span>
          </Reveal>
          <Reveal
            as="p"
            delay={270}
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6 text-pretty"
            style={{
              fontFamily: "var(--font-lato), 'Lato', sans-serif",
              color: ts,
              lineHeight: 1.7,
            }}
          >
            Este sistema se ha implementado con más de 30 marcas personales, comunidades y empresas,
            siendo ágiles en la producción sin perder la calidad siempre que ejecutemos el paso a paso
            de la metodología.
          </Reveal>
          <Reveal
            delay={360}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center"
          >
            <GlowButton
              href="#portafolio"
              variant="primary"
              size="md"
              accentColor={t.accentSolid}
              secondaryColor={t.accent}
            >
              Ver portafolio
            </GlowButton>
            <CTAWhatsApp variant="secondary" context="filmmaker" dark={dark} accentColor={t.accent} />
            <GlowButton
              href="#planes"
              variant="ghost"
              size="md"
              accentColor={t.accent}
              secondaryColor={t.accent}
              className="text-sm"
            >
              Ver planes
            </GlowButton>
          </Reveal>
          <RouteHeroStack
            stackLabel="> stack --filmmaker"
            items={FILM_STACK}
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
        <div className="hero-bottom-fade hero-bottom-fade--filmmaker" aria-hidden />
      </section>

      {/* ─── FOTO (solo móvil) ────────────────────────────────────────────────────
          Se retiró el texto "El problema": junto a la foto podía leerse como un mensaje equivocado.
          La foto queda solo en móvil (< 768 px) hasta definir su integración. */}
      <section className="py-16 relative md:hidden" style={{ borderTop: `1px solid ${t.border}` }}>
        <div className="max-w-5xl mx-auto px-6">
          <FilmMediaFrame
            reveal
            variant="image"
            imageSrc={FILM_MEDIA.problema.src}
            imagePosition={FILM_MEDIA.problema.position}
            pageBg={t.bg}
            dark={dark}
            className="min-h-[280px] sm:min-h-[360px] w-full"
            aria-hidden
          />
        </div>
      </section>

      {/* ─── PLANES ───────────────────────────────────────────────────────────── */}
      <FilmPlansSection
        dark={dark}
        tp={tp}
        ts={ts}
        display={display}
        accent={t.accent}
        border={t.border}
        planTheme={planTheme}
      />

      {/* ─── PROCESO ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 relative" style={{ borderTop: `1px solid ${t.border}` }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <span
              className="film-display-kicker font-medium block mb-3"
              style={{ fontFamily: "var(--font-lato), sans-serif", color: display }}
            >
              Cómo trabajamos
            </span>
            <h2
              id="film-process-heading"
              className="font-semibold text-2xl sm:text-3xl mb-8 md:mb-10"
              style={{ fontFamily: "var(--font-quicksand), sans-serif", color: tp }}
            >
              Proceso de producción
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-14 items-stretch">
            <FilmMediaFrame
              reveal
              variant="image"
              imageSrc={FILM_MEDIA.proceso.src}
              imagePosition={FILM_MEDIA.proceso.position}
              pageBg={t.bg}
              dark={dark}
              className="min-h-[280px] md:min-h-[320px] w-full h-full order-1"
              aria-hidden
            />
            <NumberedList
              variant="step"
              items={FILM_PROCESS.slice(0, 2)}
              startIndex={0}
              ariaLabelledBy="film-process-heading"
              gridClassName="space-y-6 min-w-0 order-2 md:text-left"
              theme={{ tp, ts, accent: t.accent, chipBg: gb, chipBorder: ab }}
            />
            {/* En mobile, la foto de edición se ubica entre "Producción" y "Post-producción" para acompañar la transición al deslizar; en desktop mantiene su lugar original (abajo a la derecha). */}
            <FilmMediaFrame
              reveal
              variant="image"
              imageSrc={FILM_MEDIA.procesoEditor.src}
              imagePosition={FILM_MEDIA.procesoEditor.position}
              imageFilter="grayscale(80%)"
              pageBg={t.bg}
              dark={dark}
              className="min-h-[280px] md:min-h-[320px] w-full h-full order-3 md:order-4"
              aria-hidden
            />
            <NumberedList
              variant="step"
              items={FILM_PROCESS.slice(2, 4)}
              startIndex={2}
              ariaLabelledBy="film-process-heading"
              gridClassName="space-y-6 min-w-0 order-4 md:order-3 md:text-left"
              theme={{ tp, ts, accent: t.accent, chipBg: gb, chipBorder: ab }}
            />
          </div>
        </div>
      </section>

      {/* ─── PORTAFOLIO (carrusel de videos) ────────────────────────────────────── */}
      <VideoPortfolioCarousel
        dark={dark}
        tp={tp}
        display={display}
        accent={t.accent}
        accentSolid={t.accentSolid}
        border={t.border}
        cardBg={cardBg}
        pageBg={t.bg}
      />

      {/* ─── METODOLOGÍA (producción + pauta) ─────────────────────────────────── */}
      <FilmMethodSection
        tp={tp}
        ts={ts}
        display={display}
        accent={t.accent}
        border={t.border}
        chipBg={gb}
        chipBorder={ab}
        cardBg={cardBg}
      />

      {/* ─── RESULTADOS ───────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 relative" style={{ borderTop: `1px solid ${t.border}` }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <span
              className="film-display-kicker font-medium block mb-3"
              style={{ fontFamily: "var(--font-lato), sans-serif", color: display }}
            >
              Resultados
            </span>
            <h2
              className="font-semibold text-2xl sm:text-3xl mb-12"
              style={{ fontFamily: "var(--font-quicksand), sans-serif", color: tp }}
            >
              Lo que puedes esperar
            </h2>
          </Reveal>

          <Reveal stagger className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
            {FILM_RESULTS.map((item, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-3xl sm:text-4xl font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-quicksand), sans-serif", color: t.accent }}
                >
                  {item.metric}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ─── CTA FINAL ────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 relative" style={{ borderTop: `1px solid ${t.border}` }}>
        <div className="max-w-5xl mx-auto px-6">
          <Reveal
            className="relative rounded-3xl overflow-hidden px-6 py-12 sm:px-10 sm:py-14"
            style={{ border: `1px solid ${div}` }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: ctaOverlay }}
              aria-hidden
            />
            <div className="relative z-10">
              <CTASection
                dark={dark}
                accentColor={t.accent}
                accentSolidColor={t.accentSolid}
                context="filmmaker"
                title="¿Listo para producir?"
                description="Agenda una llamada estratégica (30 min) para evaluar tu marca y objetivos. Confirmamos fechas y arrancamos la pre-producción."
              />
            </div>
          </Reveal>
        </div>
      </section>
    </ThemedPageShell>
  );
}
