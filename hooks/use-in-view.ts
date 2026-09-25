"use client";

/**
 * Observa un elemento una sola vez. Un `IntersectionObserver` compartido evita
 * uno por elemento. `skip` es true cuando el elemento ya quedó por encima del
 * viewport (salto por ancla, scroll restaurado o fling rápido): se muestra sin
 * animar, porque nadie lo va a ver aparecer.
 */
type InViewCallback = (skip: boolean) => void;

let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, InViewCallback>();

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const passed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
          if (!entry.isIntersecting && !passed) continue;
          const callback = callbacks.get(entry.target);
          if (!callback) continue;
          observer?.unobserve(entry.target);
          callbacks.delete(entry.target);
          callback(passed);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
  }
  return observer;
}

/** Devuelve la función de limpieza. Sin `IntersectionObserver`, muestra al instante. */
export function observeInView(element: Element, callback: InViewCallback): () => void {
  if (typeof IntersectionObserver === "undefined") {
    callback(true);
    return () => {};
  }
  const io = getObserver();
  callbacks.set(element, callback);
  io.observe(element);
  return () => {
    io.unobserve(element);
    callbacks.delete(element);
  };
}
