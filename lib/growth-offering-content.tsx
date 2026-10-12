import type { ComponentType } from "react";
import { GrowthMetaAdsPresenciaOfferingContent } from "@/components/growth/offerings/growth-metaads-presencia-offering-content";
import { GrowthPlanInicialOfferingContent } from "@/components/growth/offerings/growth-plan-inicial-offering-content";
import { GrowthPlanProfesionalOfferingContent } from "@/components/growth/offerings/growth-plan-profesional-offering-content";
import type { GrowthOfferingContentProps } from "@/components/growth/growth-offering-types";
import type { GrowthOfferingId } from "@/lib/growth-data";

export const GROWTH_OFFERING_CONTENT: Record<
  GrowthOfferingId,
  ComponentType<GrowthOfferingContentProps>
> = {
  metaads: GrowthPlanInicialOfferingContent,
  "presencia-rrss": GrowthMetaAdsPresenciaOfferingContent,
  "control-marca-rrss": GrowthPlanProfesionalOfferingContent,
};
