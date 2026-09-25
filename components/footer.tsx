"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@teispace/next-themes";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Youtube, Instagram, Linkedin, Github } from "lucide-react";
import { GlowButton } from "./shared/glow-button";
import { getCalendarLink, getGitHubProfileLink, getInstagramLink, getLinkedInLink, getYouTubeLink } from "@/lib/cta-links";
import { THEMES } from "@/lib/design-tokens";
import { useNight } from "@/lib/night-mode";
import { glowSecondaryForRoute, resolveRouteThemeId, withNight } from "@/lib/route-theme";

const FOOTER_LINKS = [
  { href: "/developer-ai", label: "Developer AI" },
  { href: "/growth", label: "Growth" },
  { href: "/filmmaker", label: "Filmmaker" },
];

const SOCIAL_LINKS: { href: string; label: string; Icon: LucideIcon }[] = [
  { href: getYouTubeLink(), label: "Canal de YouTube", Icon: Youtube },
  { href: getInstagramLink(), label: "Instagram", Icon: Instagram },
  { href: getLinkedInLink(), label: "LinkedIn", Icon: Linkedin },
  { href: getGitHubProfileLink(), label: "Perfil de GitHub", Icon: Github },
];

export function Footer() {
  const { theme } = useTheme();
  const { night } = useNight();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to dark during SSR to match the initial HTML
  const dark = mounted ? theme === "dark" : true;
  const routeId = resolveRouteThemeId(pathname);
  const mode = dark ? "dark" : "light";
  // Home (`index`) no cambia con Night.
  const t = withNight(THEMES[routeId][mode], night && dark && routeId !== "index");
  const secondaryGlow = glowSecondaryForRoute(routeId, mode);

  return (
    <footer
      // Bajo `md` la barra de pestañas es fija: el margen inferior va aquí, no en
      // `main`, para que el copyright (lo último de la página) quede por encima.
      className="relative pt-12 pb-[calc(3rem+var(--mobile-tab-bar-height)+var(--mobile-tab-bar-offset)+env(safe-area-inset-bottom,0px))] md:pb-12"
      style={{
        background: t.bg,
        borderTop: `1px solid ${t.border}`,
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-md"
            style={{
              fontFamily: "'Engagement', cursive",
              fontSize: 24,
              color: t.text.primary,
            }}
          >
            JR
          </Link>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm transition-colors duration-200 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded px-1"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  color: t.text.secondary,
                }}
              >
                {label}
              </Link>
            ))}
            <Link
              href={getCalendarLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors duration-200 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded px-1"
              style={{
                fontFamily: "'Lato', sans-serif",
                color: t.text.secondary,
              }}
            >
              Contacto
            </Link>
          </div>

          {/* Redes: mismo GlowButton secondary que CTASection */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <GlowButton
                key={href}
                href={href}
                external
                variant="secondary"
                size="md"
                accentColor={t.accent}
                secondaryColor={secondaryGlow}
                icon={<Icon size={18} strokeWidth={2} aria-hidden />}
                iconPosition="left"
                className="!px-3 !py-3 min-w-[48px] min-h-[48px] !gap-0 shrink-0"
              >
                <span className="sr-only">{label}</span>
              </GlowButton>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t text-center" style={{ borderColor: t.border }}>
          <p
            className="text-sm"
            style={{ fontFamily: "'Lato', sans-serif", color: t.text.secondary }}
          >
            {new Date().getFullYear()} Jhonattan Rodriguez - Bogotá, Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
