"use client";

import Link from "next/link";
import type { NavIconComponent, NavItemConfig } from "@/lib/nav-items";
import type { NavPillSurface } from "@/lib/route-theme";

type NavPillLayout = "pill" | "row" | "tab";

type NavPillItemProps = {
  item: NavItemConfig;
  active: boolean;
  surface: NavPillSurface;
  layout?: NavPillLayout;
  onNavigate?: () => void;
};

function NavIcon({
  icon: Icon,
  active,
  size,
}: {
  icon: NavIconComponent;
  active: boolean;
  size: number;
}) {
  const strokeWidth = active ? 2 : 1.65;
  return <Icon size={size} strokeWidth={strokeWidth} aria-hidden />;
}

function layoutClasses(layout: NavPillLayout): string {
  switch (layout) {
    case "tab":
      return "flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full py-2 min-h-[52px] min-w-0 transition-all duration-200 ease-out active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";
    case "row":
      return "flex flex-row items-center gap-3 rounded-xl px-4 py-3 min-h-[48px] w-full transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2";
    default:
      return "flex flex-col items-center justify-center gap-0.5 rounded-full px-2.5 sm:px-3 py-1.5 min-h-[44px] min-w-[52px] sm:min-w-[56px] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";
  }
}

function iconSizeForLayout(layout: NavPillLayout): number {
  if (layout === "tab") return 20;
  if (layout === "row") return 20;
  return 18;
}

function labelClasses(layout: NavPillLayout): string {
  switch (layout) {
    case "tab":
      return "text-[10px] leading-none tracking-wide truncate max-w-full px-0.5";
    case "row":
      return "text-sm";
    default:
      return "text-[10px] sm:text-[11px] leading-none tracking-wide";
  }
}

export function NavPillItem({
  item,
  active,
  surface,
  layout = "pill",
  onNavigate,
}: NavPillItemProps) {
  const color = active ? surface.textPrimary : surface.textMuted;
  const ariaLabel = active ? `${item.label}, página actual` : item.label;

  const handleClick = () => {
    onNavigate?.();
    // Ya estás en esta sección (mismo href): Next.js no navega ni remonta la
    // página, así que sin esto tocar el tab activo no hacía nada. Igual que
    // en una tab bar nativa, debe devolverte al tope de la sección actual.
    if (active) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      href={item.href}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
      className={layoutClasses(layout)}
      style={{
        color,
        background: active ? surface.activeBg : "transparent",
        fontFamily: "var(--font-lato), 'Lato', sans-serif",
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.color = surface.textSecondary;
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.color = surface.textMuted;
      }}
    >
      <NavIcon icon={item.icon} active={active} size={iconSizeForLayout(layout)} />
      <span className={labelClasses(layout)}>{item.label}</span>
    </Link>
  );
}
