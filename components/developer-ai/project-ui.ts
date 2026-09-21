import type { BuilderProject, THEMES } from "@/lib/design-tokens";

export type BuilderTheme = (typeof THEMES)["builder"]["dark"];

export function getStatusColor(status: BuilderProject["status"], t: BuilderTheme): string {
  switch (status) {
    case "Activo":
      return t.teal;
    case "En construcción":
      return t.accent;
    case "En beta":
      return "#f59e0b";
    default:
      return t.text.muted;
  }
}

export function getNeutralChipBackground(dark: boolean): string {
  return dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
}
