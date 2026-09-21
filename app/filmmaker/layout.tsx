import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filmmaker | Jhonattan Rodriguez",
  description:
    "Producción de video para founders y marcas. Planes Editor, Sprint y Mensual con estrategia, producción y postproducción incluida. Desde Bogotá para LATAM.",
  keywords: [
    "Producción de Video",
    "Filmmaker",
    "Video Marketing",
    "Contenido para Redes",
    "Bogotá",
    "Colombia",
    "Video Corporativo",
    "Reels",
    "TikTok",
  ],
  openGraph: {
    title: "Filmmaker | Jhonattan Rodriguez",
    description:
      "Producción de video para founders y marcas. Planes Editor, Sprint y Mensual con estrategia incluida.",
    type: "website",
    locale: "es_CO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filmmaker | Jhonattan Rodriguez",
    description:
      "Producción de video para founders y marcas. Planes Editor, Sprint y Mensual con estrategia incluida.",
  },
};

export default function FilmmakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
