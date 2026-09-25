/**
 * false = solo oscuro en UI; tokens THEMES.*.light y ramas dark/light en páginas se conservan.
 * Para reactivar modo claro: true, quitar forcedTheme condicional en layout y mostrar toggle en navbar.
 * El modo Night (`lib/night-mode.ts`) es independiente de este flag: es un segundo tono dentro del oscuro.
 */
export const LIGHT_MODE_UI_ENABLED = false;
