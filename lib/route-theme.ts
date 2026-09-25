import { NIGHT_BG, THEMES } from "@/lib/design-tokens";

export type RouteThemeId = keyof typeof THEMES;

/** Tema visual según la ruta (vertical del sitio). */
export function resolveRouteThemeId(pathname: string | null): RouteThemeId {
  if (!pathname) return "index";
  if (pathname.startsWith("/growth")) return "growth";
  if (pathname.startsWith("/filmmaker")) return "filmmaker";
  if (pathname.startsWith("/developer-ai")) return "builder";
  return "index";
}

function parseHex(hex: string): [number, number, number] | null {
  const raw = hex.trim().replace("#", "");
  const full = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw.slice(0, 6);
  const n = parseInt(full, 16);
  if (Number.isNaN(n) || full.length !== 6) return null;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Convierte `#RRGGBB` en `rgba` con opacidad (tokens de página usan hex de 6 dígitos). */
export function hexToRgba(hex: string, alpha: number): string {
  const rgb = parseHex(hex);
  if (!rgb) return `rgba(0,0,0,${alpha})`;
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
}

/** `#RRGGBB` → `"r, g, b"`, para componer `rgba(${...}, alpha)`. */
export function hexToRgbTriplet(hex: string): string {
  const rgb = parseHex(hex);
  return rgb ? rgb.join(", ") : "0, 0, 0";
}

/** Night: la misma paleta de la vertical con el fondo en negro absoluto. */
export function withNight<T extends { bg: string }>(palette: T, active: boolean): T {
  return active ? { ...palette, bg: NIGHT_BG } : palette;
}

type ThemeMode = "dark" | "light";

export type NavPillSurface = {
  pillBg: string;
  /** Fondo más denso para la píldora móvil, que flota sobre contenido en scroll. */
  floatingBg: string;
  pillBorder: string;
  activeBg: string;
  shadow: string;
  textPrimary: string;
  textMuted: string;
  textSecondary: string;
};

/** Superficie glass de la píldora de navegación: teñida por la vertical actual */
export function navPillSurface(pt: {
  bg: string;
  accent: string;
  border: string;
  text: { primary: string; secondary: string; muted: string };
}): NavPillSurface {
  return {
    pillBg: hexToRgba(pt.bg, 0.42),
    floatingBg: hexToRgba(pt.bg, 0.72),
    pillBorder: pt.border,
    activeBg: hexToRgba(pt.accent, 0.12),
    shadow: "0 4px 24px rgba(0,0,0,0.14)",
    textPrimary: pt.text.primary,
    textMuted: pt.text.muted,
    textSecondary: pt.text.secondary,
  };
}

/** Secundario para GlowButton: en Developer AI se usa `teal` como en el resto de la página. */
export function glowSecondaryForRoute(themeId: RouteThemeId, mode: ThemeMode): string {
  const palette = THEMES[themeId][mode];
  if (themeId === "builder" && "teal" in palette) return palette.teal;
  return palette.secondary;
}
