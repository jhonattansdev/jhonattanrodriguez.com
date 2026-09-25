"use client";

import type { ReactNode } from "react";
import { ModernBg } from "@/components/shared/modern-bg";
import { useNight } from "@/lib/night-mode";

export type ThemedPageShellProps = {
  pageBackground: string;
  accentColor: string;
  secondaryColor: string;
  dark: boolean;
  children: ReactNode;
};

/**
 * Contenedor común de páginas con tema: fondo de página + `ModernBg`.
 * En Night (solo oscuro) no se pinta `ModernBg`: sus resplandores de acento
 * tiñen el fondo y ahí debe quedar negro absoluto.
 */
export function ThemedPageShell({
  pageBackground,
  accentColor,
  secondaryColor,
  dark,
  children,
}: ThemedPageShellProps) {
  const { night } = useNight();

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: pageBackground }}>
      {!(dark && night) && (
        <ModernBg accentColor={accentColor} secondaryColor={secondaryColor} dark={dark} />
      )}
      {children}
    </div>
  );
}
