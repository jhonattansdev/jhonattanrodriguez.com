"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { ThemeImageBackground } from "@/components/home/theme-image-background";
import { Reveal } from "@/components/shared/reveal";
import { useTimelineProgress } from "@/hooks/use-timeline-progress";
import { HISTORIA_TIMELINE } from "@/lib/historia-data";
import type { THEMES } from "@/lib/design-tokens";

type IndexTheme = (typeof THEMES)["index"]["dark"];

type HistoriaSectionProps = {
  dark: boolean;
  t: IndexTheme;
};

function getTimelineCardBackground(dark: boolean, isOpen: boolean) {
  if (dark) {
    return isOpen ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)";
  }
  return isOpen ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.58)";
}

function getTimelineToggleBackground(dark: boolean) {
  return dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.5)";
}

function getMediaFrameBackground(dark: boolean, mediaSrc: string | undefined, mediaFit: string) {
  if (mediaSrc && mediaFit === "contain") return "#ffffff";
  return dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.35)";
}

export function HistoriaSection({ dark, t }: HistoriaSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  useTimelineProgress(timelineRef);

  return (
    <div
      id="historia"
      data-theme={dark ? "dark" : "light"}
      className="relative overflow-hidden"
      style={{ "--hero-fade-color": t.bg } as CSSProperties}
    >
      <ThemeImageBackground dark={dark} />
      <div className="historia-story-scrim pointer-events-none absolute inset-0 z-0" aria-hidden />
      <div className="hero-top-fade--historia" aria-hidden />

      <section className="relative z-10 flex flex-col justify-center overflow-x-hidden pt-10 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto px-6 w-full text-center flex flex-col items-center">
          <Reveal
            as="span"
            className="inline-block text-[11px] sm:text-xs tracking-[0.14em] sm:tracking-[0.22em] uppercase font-semibold mb-6 px-4 py-2 rounded-full backdrop-blur-sm"
            style={{
              fontFamily: "var(--font-lato), 'Lato', sans-serif",
              color: t.accent,
              background: dark ? `${t.accent}18` : `${t.accent}12`,
            }}
          >
            CV | Storytelling
          </Reveal>

          <Reveal
            as="h2"
            delay={90}
            className="font-bold leading-tight mb-5 text-center text-balance max-w-4xl mx-auto"
            style={{
              fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
              fontSize: "clamp(28px, 4.5vw, 48px)",
              color: t.text.primary,
            }}
          >
            <span className="md:hidden">
              <span className="block">En 2026 me encuentro</span>
              <span className="block">conectando los puntos</span>
              <span className="block" style={{ color: t.accent }}>
                mirando hacia el pasado.
              </span>
            </span>
            <span className="hidden md:block">
              <span className="block">En 2026 me encuentro conectando los puntos</span>
              <span className="block" style={{ color: t.accent }}>
                mirando hacia el pasado.
              </span>
            </span>
          </Reveal>

          <Reveal delay={180}>
            <blockquote
              cite="https://news.stanford.edu/news/2005/june15/jobs-061505.html"
              className="max-w-2xl mx-auto mb-8 text-center text-pretty"
            >
              <p
                className="text-base md:text-lg font-normal m-0"
                style={{
                  fontFamily: "var(--font-lato), 'Lato', sans-serif",
                  color: t.text.secondary,
                  lineHeight: 1.7,
                }}
              >
                «No puedes conectar los puntos mirando hacia el futuro; solo puedes conectarlos mirando hacia el
                pasado. Así que tienes que confiar en que los puntos, de algún modo, se conectarán en tu futuro.»
              </p>
              <footer
                className="mt-3 text-[15px] leading-snug"
                style={{
                  fontFamily: "var(--font-lato), sans-serif",
                  color: t.text.muted,
                  fontWeight: 500,
                }}
              >
                Steve Jobs
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 pt-4 pb-28">
        <div className="max-w-3xl mx-auto px-6">
          <div ref={timelineRef} className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-[19px] top-8 bottom-8 w-px hidden sm:block"
              style={{
                background: dark
                  ? "linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.03))"
                  : `linear-gradient(to bottom, ${t.accent}30, ${t.accent}05)`,
              }}
            />
            {/* Progreso: se dibuja con el scroll (hooks/use-timeline-progress.ts) */}
            <div
              aria-hidden
              className="tl-progress absolute left-[19px] top-8 bottom-8 w-px hidden sm:block"
              style={{ background: `linear-gradient(to bottom, ${t.accent}, ${t.accent}55)` }}
            />

            <div className="flex flex-col gap-6">
              {HISTORIA_TIMELINE.map((item, i) => {
                const isOpen = expandedIndex === i;
                const titleId = `historia-timeline-title-${i}`;
                const panelId = `historia-timeline-panel-${i}`;
                const mediaSrc = item.expandedMedia?.src?.trim();
                const mediaFit = item.expandedMedia?.fit ?? "cover";

                return (
                  <div
                    key={`${item.year}-${item.title}`}
                    className="flex gap-4 sm:gap-6 relative group w-full"
                  >
                    {/* Dot */}
                    <div className="shrink-0 z-10 mt-1 hidden sm:block">
                      <div
                        data-tl-dot
                        className="tl-dot w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: dark ? `${item.color}20` : `${item.color}15`,
                          border: `2px solid ${item.color}`,
                          boxShadow: isOpen ? `0 0 24px ${item.color}40` : `0 0 16px ${item.color}20`,
                        }}
                      >
                        <div
                          className="w-3 h-3 rounded-full transition-transform duration-300"
                          style={{
                            background: item.color,
                            transform: isOpen ? "scale(1.3)" : "scale(1)",
                          }}
                        />
                      </div>
                    </div>

                    {/* Card */}
                    <Reveal
                      className="flex-1 p-6 rounded-2xl transition-all duration-300 backdrop-blur-md"
                      style={{
                        background: getTimelineCardBackground(dark, isOpen),
                        border: `1px solid ${isOpen ? item.color + "40" : t.border}`,
                        boxShadow: isOpen ? `0 8px 32px ${item.color}15` : "none",
                      }}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setExpandedIndex(isOpen ? null : i)}
                        className="w-full text-left cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-[color:var(--timeline-focus)]"
                        style={{ ["--timeline-focus" as string]: item.color }}
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <span
                            className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                            style={{
                              fontFamily: "var(--font-lato), sans-serif",
                              color: item.color,
                              background: dark ? `${item.color}20` : `${item.color}12`,
                            }}
                          >
                            {item.year}
                          </span>
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 backdrop-blur-sm"
                            style={{
                              background: getTimelineToggleBackground(dark),
                              border: `1px solid ${t.border}`,
                              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                            }}
                            aria-hidden
                          >
                            <span style={{ color: t.text.muted, fontSize: 14 }}>+</span>
                          </div>
                        </div>

                        <h3
                          id={titleId}
                          className="font-semibold text-lg mb-3"
                          style={{
                            fontFamily: "var(--font-quicksand), sans-serif",
                            color: t.text.primary,
                          }}
                        >
                          {item.title}
                        </h3>

                        <p
                          className="text-sm leading-relaxed"
                          style={{
                            fontFamily: "var(--font-lato), sans-serif",
                            color: t.text.secondary,
                          }}
                        >
                          {item.desc}
                        </p>
                      </button>

                      {/* Expanded content: fuera del botón (enlaces / media sin HTML inválido) */}
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={titleId}
                        aria-hidden={!isOpen}
                        className="overflow-hidden transition-all duration-500"
                        style={{
                          maxHeight: isOpen ? "1600px" : "0px",
                          opacity: isOpen ? 1 : 0,
                          marginTop: isOpen ? "16px" : "0px",
                        }}
                      >
                        <div
                          className="pt-4"
                          style={{ borderTop: `1px solid ${t.border}` }}
                        >
                          <p
                            className="text-sm leading-relaxed"
                            style={{
                              fontFamily: "var(--font-lato), sans-serif",
                              color: t.text.secondary,
                            }}
                          >
                            {item.expanded}
                          </p>

                          {/* Contenedor 16:9 fijo; con `expandedMedia.src` se muestra la imagen, si no hay src el placeholder con borde punteado */}
                          <div className="relative mx-auto mt-4 w-full max-w-2xl">
                            <div
                              className="relative aspect-video w-full overflow-hidden rounded-xl"
                              style={{
                                border: `1px solid ${t.border}`,
                                background: getMediaFrameBackground(dark, mediaSrc, mediaFit),
                              }}
                            >
                              {mediaSrc ? (
                                <Image
                                  src={mediaSrc}
                                  alt={item.expandedMedia?.alt ?? ""}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 672px"
                                  className={
                                    mediaFit === "contain"
                                      ? "object-contain object-center"
                                      : "object-cover object-center"
                                  }
                                />
                              ) : (
                                <div
                                  className="absolute inset-0 flex items-center justify-center p-2"
                                  aria-hidden
                                >
                                  <div
                                    className="h-full w-full rounded-lg border border-dashed"
                                    style={{ borderColor: t.text.muted + "55" }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div
        className="hero-bottom-fade hero-bottom-fade--historia pointer-events-none absolute inset-x-0 bottom-0 z-[1]"
        aria-hidden
      />
    </div>
  );
}
