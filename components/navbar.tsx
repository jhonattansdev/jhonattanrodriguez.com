"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@teispace/next-themes";
import { THEMES } from "@/lib/design-tokens";
import { NAV_ITEMS } from "@/lib/nav-items";
import { useNight } from "@/lib/night-mode";
import { hexToRgba, navPillSurface, resolveRouteThemeId, withNight } from "@/lib/route-theme";
import { LIGHT_MODE_UI_ENABLED } from "@/lib/site-theme";
import { MobileTabBar } from "@/components/nav/mobile-tab-bar";
import { NavPillItem } from "@/components/nav/nav-pill-item";
import { NightToggle } from "@/components/nav/night-toggle";
import { SunIcon, MoonIcon } from "./shared/icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { night, toggleNight } = useNight();

  const dark = theme === "dark";

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const routeId = resolveRouteThemeId(pathname);
  const paletteDark = !mounted ? true : dark;
  // Home (`index`) no cambia con Night.
  const pt = withNight(
    THEMES[routeId][paletteDark ? "dark" : "light"],
    night && paletteDark && routeId !== "index",
  );
  const surface = navPillSurface(pt);
  const navScrolledBg = hexToRgba(pt.bg, 0.82);
  const textC = pt.text.muted;
  const nightToggle = {
    night,
    onToggle: toggleNight,
    color: pt.text.secondary,
    activeColor: pt.accent,
    activeBg: surface.activeBg,
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-[background,backdrop-filter,border-color] duration-300 ease-out"
        style={{
          background: scrolled ? navScrolledBg : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${pt.border}` : "none",
        }}
      >
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-center md:justify-between">
          <Link
            href="/"
            className="md:relative absolute left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 z-10 shrink-0 transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-current rounded-md"
            style={{
              fontFamily: "var(--font-engagement), 'Engagement', cursive",
              color: pt.text.primary,
              letterSpacing: 1,
            }}
          >
            <span className="text-2xl sm:text-3xl font-bold">JR</span>
          </Link>

          {/* Móvil: el logo va centrado, el lado derecho queda libre para Night */}
          <div className="md:hidden absolute right-1 top-1/2 -translate-y-1/2 z-10">
            <NightToggle {...nightToggle} />
          </div>

          {/* Desktop / tablet: píldora centrada */}
          <div
            className="route-nav-pill hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 rounded-full px-1 py-1 transition-[background,border-color,box-shadow] duration-300 ease-out"
            style={{
              background: surface.pillBg,
              border: `1px solid ${surface.pillBorder}`,
              boxShadow: surface.shadow,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <NavPillItem
                key={item.href}
                item={item}
                active={isActive(item.href)}
                surface={surface}
                layout="pill"
              />
            ))}
          </div>

          <div className="hidden md:flex items-center shrink-0 w-[52px] sm:w-[60px] justify-end">
            <NightToggle {...nightToggle} />
            {LIGHT_MODE_UI_ENABLED && (
              <button
                type="button"
                onClick={() => setTheme(paletteDark ? "light" : "dark")}
                aria-label={paletteDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-opacity duration-200 hover:opacity-75 focus-visible:outline-none focus-visible:ring-2"
                style={{ color: textC }}
              >
                {paletteDark ? <SunIcon /> : <MoonIcon />}
              </button>
            )}
          </div>
        </div>
      </nav>

      <MobileTabBar items={NAV_ITEMS} surface={surface} isActive={isActive} />
    </>
  );
}
