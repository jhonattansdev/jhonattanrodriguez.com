"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { GlowButton } from "@/components/shared/glow-button";
import { VideoLightbox } from "@/components/filmmaker/video-lightbox";
import { FILM_PORTFOLIO_VIDEOS, filmYouTubeThumbnailUrl } from "@/lib/filmmaker-media";
import { FILM_PORTFOLIO_INTRO } from "@/lib/design-tokens";
import { getFilmPortfolioPlaylistLink } from "@/lib/cta-links";

type VideoPortfolioCarouselProps = {
  dark: boolean;
  tp: string;
  display: string;
  accent: string;
  accentSolid: string;
  border: string;
  cardBg: string;
  pageBg: string;
};

export function VideoPortfolioCarousel({
  dark,
  tp,
  display,
  accent,
  accentSolid,
  border,
  cardBg,
  pageBg,
}: VideoPortfolioCarouselProps) {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const selectedVideo = FILM_PORTFOLIO_VIDEOS.find((v) => v.id === selectedVideoId) ?? null;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateEdges = () => {
      setAtStart(track.scrollLeft <= 1);
      setAtEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - 1);
    };

    updateEdges();
    track.addEventListener("scroll", updateEdges, { passive: true });
    return () => track.removeEventListener("scroll", updateEdges);
  }, []);

  function scrollByPage(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: track.clientWidth * 0.9 * dir, behavior: "smooth" });
  }

  const arrowStyle = {
    background: cardBg,
    borderColor: border,
    color: accent,
  };

  return (
    <section
      id="portafolio"
      className="py-16 sm:py-24 relative scroll-mt-28"
      style={{ borderTop: `1px solid ${border}` }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12 sm:mb-16">
          <span
            className="film-display-kicker font-medium block mb-3"
            style={{ fontFamily: "var(--font-lato), sans-serif", color: display }}
          >
            {FILM_PORTFOLIO_INTRO.kicker}
          </span>
          <h2
            className="font-semibold text-2xl sm:text-3xl"
            style={{
              fontFamily: "var(--font-quicksand), sans-serif",
              color: tp,
              letterSpacing: "-0.02em",
            }}
          >
            {FILM_PORTFOLIO_INTRO.title}
          </h2>
        </div>

        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-proximity scroll-pl-6 -mx-6 px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {FILM_PORTFOLIO_VIDEOS.map((video) => (
            <div
              key={video.id}
              className="snap-center shrink-0 w-[55%] max-w-[230px] sm:w-[36%] sm:max-w-[260px] lg:w-[23%] lg:max-w-[280px]"
            >
              <button
                type="button"
                onClick={() => setSelectedVideoId(video.id)}
                className="group relative block w-full aspect-[9/16] overflow-hidden rounded-xl outline-none focus-visible:ring-2"
                style={{ background: cardBg, border: `1px solid ${border}` }}
                aria-label={`Ver video: ${video.title}`}
              >
                <img
                  src={filmYouTubeThumbnailUrl(video.id)}
                  alt={video.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)",
                  }}
                />
                <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110"
                    style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.4)" }}
                  >
                    <Play className="size-5 text-white" fill="white" aria-hidden />
                  </span>
                </span>
                <span className="absolute inset-x-0 bottom-0 px-3 py-3">
                  {/*
                    -webkit-line-clamp resultó poco confiable aquí: Chromium a veces
                    inserta el "…" pero no recorta el resto del texto, dejando una
                    tercera línea fantasma fuera de la tarjeta. Un recorte por altura
                    fija en px (2 líneas de 20px) es 100% predecible.
                  */}
                  <span
                    className="block text-left text-sm font-medium text-white"
                    style={{
                      fontFamily: "var(--font-lato), sans-serif",
                      lineHeight: "20px",
                      height: "40px",
                      overflow: "hidden",
                    }}
                  >
                    {video.title}
                  </span>
                </span>
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-6">
          <button
            type="button"
            aria-label="Anterior"
            disabled={atStart}
            onClick={() => scrollByPage(-1)}
            className="flex size-8 items-center justify-center rounded-full border transition-opacity disabled:opacity-40"
            style={arrowStyle}
          >
            <ArrowLeft className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            disabled={atEnd}
            onClick={() => scrollByPage(1)}
            className="flex size-8 items-center justify-center rounded-full border transition-opacity disabled:opacity-40"
            style={arrowStyle}
          >
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>

        <div className="flex justify-center mt-8">
          <GlowButton
            href={getFilmPortfolioPlaylistLink()}
            external
            variant="secondary"
            size="md"
            accentColor={accentSolid}
            secondaryColor={accent}
          >
            Ver todo el portafolio
          </GlowButton>
        </div>
      </div>

      <VideoLightbox
        videoId={selectedVideoId}
        title={selectedVideo?.title ?? null}
        onOpenChange={(open) => {
          if (!open) setSelectedVideoId(null);
        }}
        dark={dark}
        pageBg={pageBg}
        border={border}
        accent={accent}
      />
    </section>
  );
}
