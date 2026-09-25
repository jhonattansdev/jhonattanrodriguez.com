"use client";

import type { NavItemConfig } from "@/lib/nav-items";
import type { NavPillSurface } from "@/lib/route-theme";
import { NavPillItem } from "@/components/nav/nav-pill-item";

type MobileTabBarProps = {
  items: NavItemConfig[];
  surface: NavPillSurface;
  isActive: (href: string) => boolean;
};

/**
 * Píldora flotante: mismo diseño que la del navbar de escritorio (glass redondeado,
 * borde fino, item activo en píldora), centrada abajo. El propio `<nav>` es la píldora,
 * así que no queda ninguna capa invisible capturando toques fuera de ella.
 */
export function MobileTabBar({ items, surface, isActive }: MobileTabBarProps) {
  return (
    <nav
      className="mobile-tab-bar md:hidden fixed inset-x-4 mx-auto max-w-[21rem] z-50 rounded-full p-1 transition-[background,border-color] duration-300 ease-out"
      style={{
        bottom: "calc(var(--mobile-tab-bar-offset) + env(safe-area-inset-bottom, 0px))",
        background: surface.floatingBg,
        border: `1px solid ${surface.pillBorder}`,
        boxShadow: "0 8px 28px rgba(0,0,0,0.35)",
        minHeight: "var(--mobile-tab-bar-height)",
      }}
      aria-label="Navegación principal"
    >
      <div className="flex items-stretch gap-0.5 w-full">
        {items.map((item) => (
          <NavPillItem
            key={item.href}
            item={item}
            active={isActive(item.href)}
            surface={surface}
            layout="tab"
          />
        ))}
      </div>
    </nav>
  );
}
