/** Clave de `localStorage` donde se guarda la preferencia de Night ("1" = activo). */
export const NIGHT_STORAGE_KEY = "jr-night";

/**
 * Script inline para el `<head>`: marca `<html data-night="true">` antes del primer
 * pintado si Night estaba activo, así las páginas no arrancan con el tono actual.
 * Vive aparte de `night-mode.ts` porque `layout.tsx` (server) lo importa como string.
 */
export const NIGHT_INIT_SCRIPT = `(function(){try{if(localStorage.getItem("${NIGHT_STORAGE_KEY}")==="1")document.documentElement.setAttribute("data-night","true")}catch(e){}})();`;
