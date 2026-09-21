import type { Metadata } from "next";

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
  openGraph: {
    title: "Developer AI | Jhonattan Rodriguez",
    description:
      "Sistemas integrados con IA para salud, agentes para el paciente y MVPs rápidos. Orquestación con Claude, Cursor, Supabase y Vercel.",
    type: "website",
    locale: "es_CO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer AI | Jhonattan Rodriguez",
    description:
      "Sistemas integrados con IA para salud y MVPs en semanas. Ecosistemas clínicos sin agencias ni equipos enormes.",
  },
};

export default function DeveloperAILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
