import type { LucideIcon } from "lucide-react";
import { Clapperboard, Home, Monitor } from "lucide-react";
import { ChessIcon } from "@/components/nav/chess-icon";

export type NavIconComponent = LucideIcon | typeof ChessIcon;

export type NavItemConfig = {
  href: string;
  label: string;
  icon: NavIconComponent;
};

export const NAV_ITEMS: NavItemConfig[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/developer-ai", label: "Dev", icon: Monitor },
  { href: "/growth", label: "Growth", icon: ChessIcon },
  { href: "/filmmaker", label: "Film", icon: Clapperboard },
];
