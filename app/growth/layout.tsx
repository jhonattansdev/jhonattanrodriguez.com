import type { Metadata } from "next";

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
  openGraph: {
    title: "Growth Hacker | Jhonattan Rodriguez",
    description:
      "Aprende a dominar Meta Ads y operar tu marca con sistemas ágiles. Entrenamientos y mentorías 1:1.",
    type: "website",
    locale: "es_CO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth Hacker | Jhonattan Rodriguez",
    description:
      "Aprende a dominar Meta Ads y operar tu marca con sistemas ágiles. Entrenamientos y mentorías 1:1.",
  },
};

export default function GrowthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
