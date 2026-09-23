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
    src: "/filmmaker/foto-proceso-edicion.webp",
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

export function filmYouTubeThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

/** Videos reales del portafolio en YouTube, mostrados en el carrusel de /filmmaker */
export const FILM_PORTFOLIO_VIDEOS: { id: string; title: string }[] = [
  { id: "XXiIMR0RZtM", title: "Posicionamiento de Marca | Edificios Centro Internacional de Bogotá" },
  { id: "bIiBEYCBmOI", title: "Viral | Ayudar desde nuestro rol" },
  { id: "4BinZZhfl20", title: "Video promocional | Expofitness 2025 Group Fit" },
  { id: "-0CE9m-mgIY", title: "Viral - Aspiracional | Mansión Homes Provento" },
  { id: "EV1PgdGWDRI", title: "Video Promocional | Daniel Bilbao IA Summit 2025" },
  { id: "d2JrLwkvV_M", title: "Valor | Abogado sancionado por el uso de IA NextLeap" },
  { id: "gzSJd4KAGpk", title: "Valor | NXLP | Doctor Carlos Conde | Contenido Jurídico" },
  { id: "DTDO5v55HG8", title: "Testimonial | Comunidad de Gladwell en el Moneycon" },
  { id: "lulj24uJGLI", title: "Viral | Comprar apartamento antes o después de las elecciones en Colombia" },
  { id: "1I4UK7jqb_Q", title: "Posicionamiento de marca | Más de 100 builders construyendo juntos con IA" },
  { id: "0kJebs8-HqY", title: "Testimonial | Terapia Organizacional Gladwell" },
  { id: "N-Q8anuBdjM", title: "Video promocional Apartaestudio en Clubhouse" },
];
