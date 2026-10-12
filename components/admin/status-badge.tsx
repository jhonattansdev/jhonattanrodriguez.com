import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

export type StatusTone = "critical" | "warning" | "success" | "info";

const TONE_VAR: Record<StatusTone, string> = {
  critical: "var(--cm-critical)",
  warning: "var(--cm-warning)",
  success: "var(--cm-success)",
  info: "var(--cm-info)",
};

/** Badge de color por `tone`, inspirado en StatusBadge de Coach Manager. */
export function StatusBadge({ tone, children }: { tone: StatusTone; children: ReactNode }) {
  const color = TONE_VAR[tone];
  return (
    <Badge
      variant="outline"
      style={{
        color,
        borderColor: `color-mix(in srgb, ${color} 45%, transparent)`,
        background: `color-mix(in srgb, ${color} 18%, transparent)`,
      }}
    >
      {children}
    </Badge>
  );
}
