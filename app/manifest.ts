import type { MetadataRoute } from "next";
import { THEMES } from "@/lib/design-tokens";
import { SITE_NAME } from "@/lib/site-metadata";

/** App web instalable (Android/Chrome y "Añadir a pantalla de inicio"). Servido en /manifest.webmanifest. */
export default function manifest(): MetadataRoute.Manifest {
  const background = THEMES.index.dark.bg;

  return {
    id: "/",
    name: SITE_NAME,
    short_name: "Jhonattan",
    description: "Growth Hacker, Filmmaker y Developer AI. Metodologías ágiles, contenido e IA para escalar tu negocio.",
    lang: "es-CO",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: background,
    theme_color: background,
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Developer AI", url: "/developer-ai" },
      { name: "Growth", url: "/growth" },
      { name: "Filmmaker", url: "/filmmaker" },
    ],
  };
}
