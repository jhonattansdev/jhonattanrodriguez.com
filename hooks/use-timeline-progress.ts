"use client";

import { useEffect, type RefObject } from "react";

/** Debe coincidir con `top-8` / `bottom-8` de la línea en `historia-section.tsx`. */
const LINE_INSET_PX = 32;
/** Punto de la pantalla (fracción del alto) que la línea "alcanza". */
const REFERENCE_Y = 0.6;

/**
 * Línea de tiempo que se dibuja con el scroll: escribe `--tl-progress` (0 a 1)
 * en el contenedor y marca `data-lit` en cada `[data-tl-dot]` que la línea ya
 * pasó. Un solo listener pasivo con rAF, activo únicamente mientras la lista
 * está cerca del viewport; solo escribe variables CSS y atributos (sin layout).
 * Con "reducir movimiento" queda dibujada del todo, sin seguir el scroll.
 */
export function useTimelineProgress(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dots = Array.from(container.querySelectorAll<HTMLElement>("[data-tl-dot]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      container.style.setProperty("--tl-progress", "1");
      for (const dot of dots) dot.dataset.lit = "true";
      return;
    }

    const wide = window.matchMedia("(min-width: 40rem)");
    let frame = 0;
    let listening = false;

    const update = () => {
      frame = 0;
      // Por debajo de `sm` la línea y los puntos no se muestran.
      if (!wide.matches) return;
      const rect = container.getBoundingClientRect();
      const reference = window.innerHeight * REFERENCE_Y;
      const lineHeight = rect.height - LINE_INSET_PX * 2;
      const progress =
        lineHeight > 0
          ? Math.min(1, Math.max(0, (reference - (rect.top + LINE_INSET_PX)) / lineHeight))
          : 0;
      container.style.setProperty("--tl-progress", progress.toFixed(4));
      for (const dot of dots) {
        const box = dot.getBoundingClientRect();
        const lit = box.top + box.height / 2 <= reference;
        if ((dot.dataset.lit === "true") !== lit) dot.dataset.lit = String(lit);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const listen = () => {
      if (listening) return;
      listening = true;
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
    };

    const unlisten = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          listen();
          update();
        } else {
          unlisten();
          // Fuera de pantalla: deja el estado final coherente con la posición.
          update();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      unlisten();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [containerRef]);
}
