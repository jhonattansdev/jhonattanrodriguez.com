import type { Metadata, Viewport } from "next";
import { THEMES } from "@/lib/design-tokens";
import { shareMetadata } from "@/lib/site-metadata";

export const viewport: Viewport = {
  themeColor: THEMES.builder.dark.bg,
};

export const metadata: Metadata = {
  title: "Developer AI | Jhonattan Rodriguez",
  description:
    "Sistemas integrados con IA para salud: MurphyIA, agentes para pacientes y MVPs en semanas. Developer AI enfocado en ecosistemas clínicos y arquitectura.",
  keywords: [
    "Developer AI",
    "Salud digital",
    "Automatización",
    "Agentes IA",
    "Sistemas integrados",
    "n8n",
    "Make",
    "Inteligencia Artificial",
    "No Code",
    "Low Code",
    "Bogotá",
    "Colombia",
  ],
  ...shareMetadata({
    path: "/developer-ai",
    slug: "developer-ai",
    title: "Developer AI | Jhonattan Rodriguez",
    description:
      "Sistemas integrados con IA para salud, agentes para el paciente y MVPs rápidos. Orquestación con Claude, Cursor, Supabase y Vercel.",
    alt: "Jhonattan Rodriguez, Developer AI: sistemas con IA, agentes y MVPs en semanas",
  }),
};

export default function DeveloperAILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
