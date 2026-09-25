"use client";

import { MoonIcon } from "@/components/shared/icons";

type NightToggleProps = {
  night: boolean;
  onToggle: () => void;
  /** Color del icono en reposo. */
  color: string;
  /** Color del icono y tinte de fondo cuando Night está activo. */
  activeColor: string;
  activeBg: string;
  className?: string;
};

/** Botón del modo Night: luna vacía en reposo, luna rellena cuando está activo. */
export function NightToggle({
  night,
  onToggle,
  color,
  activeColor,
  activeBg,
  className = "",
}: NightToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={night}
      aria-label={night ? "Desactivar modo night" : "Activar modo night"}
      className={`p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-[opacity,background-color,color] duration-200 hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 ${
        night ? "[&_svg]:fill-current" : ""
      } ${className}`}
      style={{ color: night ? activeColor : color, background: night ? activeBg : "transparent" }}
    >
      <MoonIcon />
    </button>
  );
}
