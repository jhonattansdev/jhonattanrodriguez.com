import type { Metadata, Viewport } from "next";
import { THEMES } from "@/lib/design-tokens";
import { shareMetadata } from "@/lib/site-metadata";

export const viewport: Viewport = {
  themeColor: THEMES.filmmaker.dark.bg,
};

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
  ...shareMetadata({
    path: "/filmmaker",
    slug: "filmmaker",
    title: "Filmmaker | Jhonattan Rodriguez",
    description:
      "Producción de video para founders y marcas. Planes Editor, Sprint y Mensual con estrategia incluida.",
    alt: "Jhonattan Rodriguez, Filmmaker: producción de video para founders y marcas",
  }),
};

export default function FilmmakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
