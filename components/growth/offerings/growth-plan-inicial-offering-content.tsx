"use client";

import { useState } from "react";
import type { GrowthOfferingContentProps } from "@/components/growth/growth-offering-types";
import { GrowthMetaAdsOfferingContent } from "@/components/growth/offerings/growth-metaads-offering-content";
import { GrowthPresenciaRrssOfferingContent } from "@/components/growth/offerings/growth-presencia-rrss-offering-content";
import { growthTabButton, growthTabList } from "@/lib/growth-layout";

type GrowthPlanInicialTrack = "metaads" | "marca-personal";

const PLAN_INICIAL_TRACKS: { id: GrowthPlanInicialTrack; label: string; panelId: string }[] = [
  { id: "metaads", label: "Meta Ads", panelId: "growth-plan-inicial-metaads" },
  { id: "marca-personal", label: "Marca Personal", panelId: "growth-plan-inicial-marca-personal" },
];

/**
 * Plan de $480.000: el cliente elige UNO de los dos enfoques (Meta Ads o
 * Marca Personal), con el mismo patrón visual de pestañas que ya usa Marca
 * Personal para elegir entre LinkedIn e Instagram (`growthTabList`/
 * `growthTabButton`; no se reutiliza `GrowthPlatformTabs` porque ese
 * componente está tipado a "linkedin" | "instagram"). El contenido de cada
 * enfoque es exactamente el de su oferta original, sin texto nuevo. El CTA
 * del panel de precio (en `growth-offerings.tsx`) ya cubre a ambos enfoques,
 * así que el de Meta Ads se oculta aquí para no duplicar botones.
 */
export function GrowthPlanInicialOfferingContent(props: GrowthOfferingContentProps) {
  const { dark, accent, border, text } = props.pageTheme;
  const [track, setTrack] = useState<GrowthPlanInicialTrack>("metaads");
  const activePanel = PLAN_INICIAL_TRACKS.find((t) => t.id === track)!;

  return (
    <>
      <div role="tablist" aria-label="Enfoque" className={`${growthTabList} mb-6`}>
        {PLAN_INICIAL_TRACKS.map((t) => {
          const selected = track === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`${t.panelId}-tab`}
              aria-selected={selected}
              aria-controls={t.panelId}
              onClick={() => setTrack(t.id)}
              className={`text-sm px-4 py-2 ${growthTabButton} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
              style={{
                fontFamily: "var(--font-lato), 'Lato', sans-serif",
                background: selected
                  ? dark
                    ? `${accent}20`
                    : `${accent}12`
                  : dark
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(0,0,0,0.03)",
                border: `1px solid ${selected ? accent : border}`,
                color: selected ? accent : text.muted,
                ["--tw-ring-color" as string]: accent,
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div id={activePanel.panelId} role="tabpanel" aria-labelledby={`${activePanel.panelId}-tab`}>
        {track === "metaads" ? (
          <GrowthMetaAdsOfferingContent {...props} showOwnCta={false} />
        ) : (
          <GrowthPresenciaRrssOfferingContent {...props} />
        )}
      </div>
    </>
  );
}
