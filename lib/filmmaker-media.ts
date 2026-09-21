/** Rutas y overlays para contenedores media en /filmmaker */

export const FILM_MEDIA = {
  problema: {
    src: "/filmmaker/foto-el-problema.jpg",
    position: "center 35%",
  },
  proceso: {
    src: "/filmmaker/foto-proceso-produccion.jpg",
    position: "center right",
  },
  procesoEditor: {
    src: "/filmmaker/foto-proceso-produccion-2.webp",
    position: "center",
  },
} as const;

export function filmImageOverlay(dark: boolean): string {
  return dark
    ? `linear-gradient(180deg, rgba(60,36,18,0.17), rgba(10,7,4,0.25))`
    : `linear-gradient(180deg, rgba(10,7,4,0.08), rgba(10,7,4,0.02))`;
}

export function filmPlaceholderBackground(dark: boolean): string {
  return dark
    ? "linear-gradient(145deg, rgba(40,24,12,0.6), rgba(10,7,4,0.95))"
    : "linear-gradient(145deg, rgba(251,146,60,0.12), rgba(255,252,250,1))";
}

export function filmYouTubeEmbedUrl(videoId: string): string {
  const params = new URLSearchParams({
    modestbranding: "1",
    rel: "0",
    color: "white",
  });
  return `https://www.youtube.com/embed/${videoId}?${params}`;
}
