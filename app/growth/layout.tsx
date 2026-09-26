import type { Metadata, Viewport } from "next";
import { THEMES } from "@/lib/design-tokens";
import { shareMetadata } from "@/lib/site-metadata";

export const viewport: Viewport = {
  themeColor: THEMES.growth.dark.bg,
};

export const metadata: Metadata = {
  title: "Growth Hacker | Jhonattan Rodriguez",
  description:
    "Aprende a dominar Meta Ads, construir tu marca y operar tus redes sociales con sistemas ágiles. Entrenamientos y mentorías 1:1 en Bogotá y remoto.",
  keywords: [
    "Growth Hacking",
    "Meta Ads",
    "Facebook Ads",
    "Instagram Ads",
    "Marketing Digital",
    "Mentoría",
    "Bogotá",
    "Colombia",
  ],
  ...shareMetadata({
    path: "/growth",
    slug: "growth",
    title: "Growth Hacker | Jhonattan Rodriguez",
    description:
      "Aprende a dominar Meta Ads y operar tu marca con sistemas ágiles. Entrenamientos y mentorías 1:1.",
    alt: "Jhonattan Rodriguez, Growth Hacker: Meta Ads, marca y sistemas ágiles",
  }),
};

export default function GrowthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
