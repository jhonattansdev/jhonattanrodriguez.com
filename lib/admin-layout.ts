/** Tarjeta "glass" compartida del panel interno (dashboard, lista y perfil de cliente). */
export const adminGlassCardClass = "rounded-xl border backdrop-blur-xl";
export const adminGlassCardStyle = { background: "var(--cm-card-glass)", borderColor: "var(--border)" };

/** Mayúscula solo en la primera letra ("octubre de 2026" -> "Octubre de 2026"); la clase `capitalize` de Tailwind pone mayúscula en cada palabra ("De" incluido). */
export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
