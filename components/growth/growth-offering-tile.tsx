"use client";

import type { KeyboardEvent, Ref } from "react";
import type { GrowthPageTheme } from "@/components/growth/growth-offering-types";
import type { GrowthOfferingMeta } from "@/lib/growth-data";

type GrowthOfferingTileProps = {
  meta: GrowthOfferingMeta;
  selected: boolean;
  pageTheme: GrowthPageTheme;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  buttonRef: Ref<HTMLButtonElement>;
};

export const growthTabId = (id: string) => `growth-tab-${id}`;
export const GROWTH_PANEL_ID = "growth-offering-panel";

/** Mini-card de resumen del selector de servicios (pestaña ARIA). */
export function GrowthOfferingTile({
  meta,
  selected,
  pageTheme,
  onSelect,
  onKeyDown,
  buttonRef,
}: GrowthOfferingTileProps) {
  const { accent, accentSolid, border, card, text } = pageTheme;

  return (
    <button
      ref={buttonRef}
      type="button"
      role="tab"
      id={growthTabId(meta.id)}
      aria-selected={selected}
      aria-controls={GROWTH_PANEL_ID}
      tabIndex={selected ? 0 : -1}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className="snap-center shrink-0 w-[46vw] max-w-[220px] md:w-auto md:max-w-none md:basis-[calc(33.333%-0.5rem)] lg:basis-[calc(25%-0.5625rem)] min-h-[44px] rounded-2xl px-4 py-4 text-center border transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--growth-tab-focus)]"
      style={{
        ["--growth-tab-focus" as string]: accent,
        background: selected ? `${accent}14` : card,
        borderColor: selected ? accent : border,
        boxShadow: selected
          ? `inset 0 0 0 1px ${accent}, 0 10px 30px -14px ${accentSolid}66`
          : "none",
      }}
    >
      <span
        className="block font-semibold text-sm sm:text-base leading-snug"
        style={{ fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif", color: text.primary }}
      >
        {meta.tabTitle}
      </span>
      <span
        className="block font-bold mt-1.5 text-base sm:text-lg leading-tight"
        style={{ fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif", color: accent }}
      >
        {meta.priceCop}
      </span>
      <span
        className="block text-xs mt-1.5"
        style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif", color: text.secondary }}
      >
        {meta.tabFacts}
      </span>
    </button>
  );
}
