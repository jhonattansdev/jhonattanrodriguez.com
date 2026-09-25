"use client";

import { useCallback, useSyncExternalStore } from "react";
import { NIGHT_STORAGE_KEY } from "@/lib/night-init-script";

/**
 * Night: segundo tono del sitio (fondo #000 en Growth, Dev y Film; Home no cambia).
 * Es independiente del tema de `next-themes`, que sigue forzado a `dark`.
 * Fuente de verdad: atributo `data-night` en `<html>`; se persiste en `localStorage`.
 */

const listeners = new Set<() => void>();

function readNight(): boolean {
  return document.documentElement.dataset.night === "true";
}

function applyNight(on: boolean) {
  if (on) document.documentElement.dataset.night = "true";
  else delete document.documentElement.dataset.night;
}

function notify() {
  listeners.forEach((listener) => listener());
}

function setNight(on: boolean) {
  applyNight(on);
  try {
    if (on) localStorage.setItem(NIGHT_STORAGE_KEY, "1");
    else localStorage.removeItem(NIGHT_STORAGE_KEY);
  } catch {
    // Sin almacenamiento (modo privado, bloqueado): el cambio dura la sesión.
  }
  notify();
}

/** Sincroniza pestañas: `key === null` es `localStorage.clear()`. */
function onStorage(event: StorageEvent) {
  if (event.key !== null && event.key !== NIGHT_STORAGE_KEY) return;
  applyNight(event.key !== null && event.newValue === "1");
  notify();
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) window.addEventListener("storage", onStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

export function useNight() {
  // En servidor y en la hidratación es `false`; luego React lee el atributo real.
  const night = useSyncExternalStore(subscribe, readNight, () => false);
  const toggleNight = useCallback(() => setNight(!readNight()), []);
  return { night, toggleNight };
}
