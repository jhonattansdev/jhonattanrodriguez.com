import { FILM_PLANS } from "@/lib/design-tokens";
import { GROWTH_OFFERINGS, GROWTH_OFFERING_ORDER } from "@/lib/growth-data";

export const CLIENT_STAGES = ["prospecto", "activo", "pausado", "terminado"] as const;
export type ClientStage = (typeof CLIENT_STAGES)[number];

export const CLIENT_STAGE_LABELS: Record<ClientStage, string> = {
  prospecto: "Prospecto",
  activo: "Activo",
  pausado: "Pausado",
  terminado: "Terminado",
};

/** Tono de StatusBadge por etapa (components/admin/status-badge.tsx). */
export const CLIENT_STAGE_TONE: Record<ClientStage, "critical" | "warning" | "success" | "info"> = {
  prospecto: "info",
  activo: "success",
  pausado: "warning",
  terminado: "critical",
};

/** COP por 1 USD, usada como default al registrar un pago en COP. */
export const DEFAULT_COP_USD_RATE = 3200;

export type PaymentCurrency = "COP" | "USD";

export type Client = {
  id: string;
  client_code: string;
  name: string;
  objective: string | null;
  phone: string | null;
  email: string | null;
  location: string | null;
  role: string | null;
  niche: string | null;
  stage: ClientStage;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type ClientObjectiveHistoryEntry = {
  id: string;
  client_id: string;
  objective: string;
  changed_at: string;
};

export type ClientPayment = {
  id: string;
  client_id: string;
  /** Id de un plan de Growth (lib/growth-data.ts) o de Filmmaker (FILM_PLANS en lib/design-tokens.ts). */
  plan_id: string;
  currency: PaymentCurrency;
  amount: number;
  exchange_rate: number | null;
  amount_usd: number;
  payment_method: string | null;
  paid_at: string;
  created_at: string;
};

export type ClientSession = {
  id: string;
  client_id: string;
  session_number: number;
  session_date: string;
  comments: string | null;
  reto: string | null;
  duration_minutes: number | null;
  created_at: string;
};

/** Fecha desde la que el cliente trabaja con nosotros: la de su primera sesión, o la de creación del registro si todavía no tiene ninguna. */
export function getClientSinceDate(sessionDates: string[], createdAt: string): Date {
  const earliest = sessionDates.reduce<string | null>((acc, date) => (acc === null || date < acc ? date : acc), null);
  return earliest ? new Date(`${earliest}T00:00:00`) : new Date(createdAt);
}

/** "05/10/2026", formato día/mes/año de getClientSinceDate para mostrar en el CRM. */
export function formatClientSinceDate(sessionDates: string[], createdAt: string): string {
  return getClientSinceDate(sessionDates, createdAt).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/** "1h 30m" / "45 min", para el stat de tiempo invertido total. */
export function formatMinutes(totalMinutes: number): string {
  if (totalMinutes <= 0) return "0 min";
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

export type PlanOption = {
  id: string;
  label: string;
  priceCop: string;
  priceUsd: string;
  group: "Growth" | "Filmmaker";
};

/** Todos los planes que se pueden cobrar, de los dos servicios (para el selector de pagos del CRM). */
export function getAllPlanOptions(): PlanOption[] {
  const growthOptions: PlanOption[] = GROWTH_OFFERING_ORDER.map((id) => ({
    id,
    label: GROWTH_OFFERINGS[id].tabTitle,
    priceCop: GROWTH_OFFERINGS[id].priceCop,
    priceUsd: GROWTH_OFFERINGS[id].priceUsd,
    group: "Growth",
  }));
  const filmOptions: PlanOption[] = FILM_PLANS.map((plan) => ({
    id: plan.id,
    label: plan.name,
    priceCop: plan.price,
    priceUsd: plan.priceUsd,
    group: "Filmmaker",
  }));
  return [...growthOptions, ...filmOptions];
}

/** Nombre a mostrar de un plan por su id, sin importar de qué servicio venga. */
export function resolvePlanLabel(planId: string): string {
  return getAllPlanOptions().find((option) => option.id === planId)?.label ?? planId;
}
