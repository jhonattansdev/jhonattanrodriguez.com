"use client";

import { useEffect } from "react";
import { parseGrowthOfferingHash, type GrowthOfferingId } from "@/lib/growth-data";

const SERVICES_SECTION_ID = "servicios";

// La página no pinta su contenido hasta montarse: se reintenta hasta que exista.
function scrollToServices(tries = 30) {
  const el = document.getElementById(SERVICES_SECTION_ID);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if (tries > 0) requestAnimationFrame(() => scrollToServices(tries - 1));
}

// La primera vez que se monta la página ya pasó el arranque del documento: los montajes siguientes son navegación interna.
let entryPageMounted = false;

/**
 * Recarga o "atrás" sobre la página con la que arrancó el documento: el navegador
 * restaura el scroll y no se fuerza otro. En una navegación interna (p. ej. el
 * enlace desde /filmmaker) `scrollY` es el de la página anterior, no una
 * restauración, y sí hay que llevar al selector.
 */
function browserRestoresScroll(): boolean {
  if (entryPageMounted) return false;
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  if (!nav || (nav.type !== "reload" && nav.type !== "back_forward")) return false;
  return new URL(nav.name).pathname === window.location.pathname;
}

/**
 * Enlaces `#metaads`, `#presencia-rrss`, `#control-marca-rrss`: seleccionan ese
 * servicio y llevan al selector. En la carga inicial no se fuerza el scroll si
 * el navegador ya restauró una posición (recarga a media página).
 */
export function useGrowthOfferingHash(onSelect: (id: GrowthOfferingId) => void) {
  useEffect(() => {
    const syncFromHash = (initial: boolean) => {
      const id = parseGrowthOfferingHash();
      if (id) onSelect(id);
      // `#servicios` (o un servicio) no lo resuelve el ancla nativa: al cargar,
      // el contenido aún no existe.
      if (!id && window.location.hash !== `#${SERVICES_SECTION_ID}`) return;
      if (initial && window.scrollY >= 200 && browserRestoresScroll()) return;
      // Dos frames: que el panel nuevo ya esté pintado (ver nota en GrowthOfferings).
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToServices()));
    };

    syncFromHash(true);
    // En un timeout: StrictMode ejecuta el efecto dos veces seguidas y ambas deben contar como el arranque.
    setTimeout(() => {
      entryPageMounted = true;
    }, 0);
    const onHashChange = () => syncFromHash(false);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [onSelect]);
}
