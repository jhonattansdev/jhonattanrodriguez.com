import type { ReactNode } from "react";

/**
 * Se remonta en cada navegación: el contenido de la ruta entra con un fundido
 * corto (solo opacidad, ver `.route-enter` en globals.css). El navbar y el
 * footer viven en el layout y no participan.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="route-enter">{children}</div>;
}
