"use client";

import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/shared/reveal";
import {
  filmImageOverlay,
  filmPlaceholderBackground,
  filmYouTubeEmbedUrl,
} from "@/lib/filmmaker-media";

type FilmMediaFrameProps = {
  variant: "image" | "video" | "placeholder";
  pageBg: string;
  dark: boolean;
  className?: string;
  imageSrc?: string;
  imagePosition?: string;
  imageFilter?: string;
  videoId?: string;
  /** Proporción del video/placeholder; por defecto 16:9. */
  videoAspect?: "16:9" | "9:16";
  children?: ReactNode;
  /** Entrada al hacer scroll (solo variante `image`). */
  reveal?: boolean;
  "aria-hidden"?: boolean;
};

const frameStyle = (pageBg: string): CSSProperties => ({
  ["--film-media-bg" as string]: pageBg,
});

function RatioBox({
  children,
  aspect = "16:9",
}: {
  children: ReactNode;
  aspect?: "16:9" | "9:16";
}) {
  const paddingBottom = aspect === "9:16" ? "177.78%" : "56.25%";
  return (
    <div className="relative w-full" style={{ paddingBottom }}>
      {children}
    </div>
  );
}

export function FilmMediaFrame({
  variant,
  pageBg,
  dark,
  className = "",
  imageSrc,
  imagePosition = "center",
  imageFilter,
  videoId,
  videoAspect = "16:9",
  children,
  reveal = false,
  "aria-hidden": ariaHidden,
}: FilmMediaFrameProps) {
  const baseClass = `film-media-frame w-full ${className}`.trim();

  if (variant === "video" && videoId) {
    return (
      <div className={baseClass} style={frameStyle(pageBg)}>
        <RatioBox aspect={videoAspect}>
          <iframe
            title="Reel destacado: jhonattansfilm"
            src={filmYouTubeEmbedUrl(videoId)}
            className="film-media-iframe absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </RatioBox>
      </div>
    );
  }

  if (variant === "placeholder") {
    return (
      <div className={baseClass} style={frameStyle(pageBg)}>
        <RatioBox>
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: filmPlaceholderBackground(dark) }}
          >
            {children}
          </div>
        </RatioBox>
      </div>
    );
  }

  if (variant === "image" && imageSrc) {
    const imageStyle: CSSProperties = {
      ...frameStyle(pageBg),
      backgroundImage: `${filmImageOverlay(dark)}, url('${imageSrc}')`,
      backgroundSize: "cover",
      backgroundPosition: imagePosition,
      filter: imageFilter,
    };
    if (reveal) {
      return <Reveal className={baseClass} style={imageStyle} aria-hidden={ariaHidden} />;
    }
    return <div className={baseClass} style={imageStyle} aria-hidden={ariaHidden} />;
  }

  return null;
}
