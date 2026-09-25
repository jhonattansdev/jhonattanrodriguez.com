/** Tokens de superficie para tarjetas de plan (mismo color y mismo borde de acento en las 3; la destacada se distingue por el badge y el brillo en plan-card.tsx). */

export type PlanSurface = {
  bg: string;
  border: string;
  title: string;
  body: string;
  price: string;
  muted: string;
  chipBg: string;
  chipBorder: string;
  chipText: string;
  detailBorder: string;
  detailPanelBg: string;
  detailLabel: string;
  detailBody: string;
  detailAccent: string;
  detailPanelBorder: string;
  paymentPanelBg: string;
  chevron: string;
  ctaVariant: "primary" | "secondary";
  ctaDark: boolean;
  ctaAccent: string;
  ctaAccentSolid: string;
  badgeBg: string;
  badgeText: string;
};

type SurfaceTheme = {
  tp: string;
  ts: string;
  tm: string;
  accent: string;
  accentSolid: string;
  cardBg: string;
  div: string;
  ab: string;
  gb: string;
  badgeText: string;
};

export function getPlanSurface(theme: SurfaceTheme): PlanSurface {
  const { tp, ts, tm, accent, accentSolid, cardBg, div, ab, gb, badgeText } = theme;

  return {
    bg: cardBg,
    border: `2px solid ${accent}`,
    title: tp,
    body: ts,
    price: accent,
    muted: tm,
    chipBg: gb,
    chipBorder: ab,
    chipText: accent,
    detailBorder: div,
    detailPanelBg: gb,
    detailLabel: tm,
    detailBody: ts,
    detailAccent: accent,
    detailPanelBorder: ab,
    paymentPanelBg: cardBg,
    chevron: accent,
    ctaVariant: "primary",
    ctaDark: false,
    ctaAccent: accent,
    ctaAccentSolid: accentSolid,
    badgeBg: accent,
    badgeText,
  };
}
