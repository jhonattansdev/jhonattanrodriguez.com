"use client";

import type { ReactNode } from "react";
import { CTACalendar } from "@/components/cta-buttons";
import type { PlanSurface } from "@/lib/filmmaker-plan-surface";
import type { FILM_PLANS } from "@/lib/design-tokens";

type FilmPlan = (typeof FILM_PLANS)[number];

type PlanCardProps = {
  plan: FilmPlan;
  surface: PlanSurface;
  siteDark: boolean;
  accent: string;
  accentSolid: string;
  selected: boolean;
  onToggle: () => void;
};

export function PlanCard({
  plan,
  surface,
  siteDark,
  accent,
  accentSolid,
  selected,
  onToggle,
}: PlanCardProps) {
  const isOpen = selected;

  return (
    <article
      className="relative rounded-2xl p-6 sm:p-8 transition-shadow duration-250 flex flex-col"
      style={{
        background: surface.bg,
        border: surface.border,
        boxShadow: plan.featured
          ? siteDark
            ? "0 24px 48px rgba(251,146,60,0.12)"
            : "0 24px 48px rgba(0,0,0,0.25)"
          : "none",
        outline: isOpen ? `2px solid ${accent}` : "none",
        outlineOffset: isOpen ? 2 : 0,
      }}
    >
      {plan.featured && (
        <div className="mb-4 flex justify-center sm:justify-start">
          <span
            className="inline-flex text-[10px] sm:text-xs font-semibold px-4 py-1.5 rounded-full"
            style={{
              fontFamily: "var(--font-lato), sans-serif",
              background: surface.badgeBg,
              color: surface.badgeText,
            }}
          >
            Más popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3
          id={`plan-${plan.id}-title`}
          className="font-semibold text-xl mb-2"
          style={{ fontFamily: "var(--font-quicksand), sans-serif", color: surface.title }}
        >
          {plan.name}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-lato), sans-serif", color: surface.body }}
        >
          {plan.tagline}
        </p>
      </div>

      <div className="mb-6">
        <div
          className="font-bold text-2xl sm:text-3xl tracking-tight"
          style={{ fontFamily: "var(--font-quicksand), sans-serif", color: surface.price }}
        >
          {plan.price}
        </div>
      </div>

      {plan.production && (
        <div
          className="text-xs font-medium px-3 py-1.5 rounded-lg inline-block mb-6"
          style={{
            fontFamily: "var(--font-lato), sans-serif",
            background: surface.chipBg,
            color: surface.chipText,
            border: `1px solid ${surface.chipBorder}`,
          }}
        >
          {plan.production}
        </div>
      )}

      {plan.includes && (
        <ul className="space-y-2.5 mb-6">
          {plan.includes.slice(0, 4).map((item, j) => (
            <li
              key={j}
              className="flex items-start gap-3 text-sm"
              style={{ fontFamily: "var(--font-lato), sans-serif", color: surface.body }}
            >
              <span className="mt-0.5 shrink-0" style={{ color: surface.price }}>
                <CheckIcon />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <CTACalendar
        variant={surface.ctaVariant}
        dark={surface.ctaDark}
        accentColor={surface.ctaAccent}
        accentSolidColor={surface.ctaAccentSolid}
        className="w-full justify-center text-sm"
      />

      <button
        type="button"
        onClick={onToggle}
        className="w-full mt-4 min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 focus-visible:ring-offset-2"
        style={{
          fontFamily: "var(--font-lato), sans-serif",
          border: `1px solid ${surface.detailPanelBorder}`,
          color: surface.title,
          background: surface.detailPanelBg,
        }}
        aria-expanded={isOpen}
        aria-controls={`plan-${plan.id}-details`}
      >
        <span>{isOpen ? "Ocultar detalles" : "Ver detalles"}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 12 12"
          fill="none"
          className="shrink-0 transition-transform duration-250 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          style={{
            color: surface.chevron,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
          aria-hidden
        >
          <path
            d="M2.5 4.5L6 8L9.5 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        id={`plan-${plan.id}-details`}
        role="region"
        aria-labelledby={`plan-${plan.id}-title`}
        hidden={!isOpen}
      >
        {isOpen && (
          <div
            className="mt-6 pt-6 space-y-6"
            style={{ borderTop: `1px solid ${surface.detailBorder}` }}
          >
            {"framework" in plan && plan.framework && (
              <DetailSection title="Framework estratégico" surface={surface}>
                <div className="space-y-3">
                  {plan.framework.map((f, k) => (
                    <PlanFrameworkRow
                      key={k}
                      count={f.count}
                      type={f.type}
                      goal={f.goal}
                      surface={surface}
                    />
                  ))}
                </div>
              </DetailSection>
            )}

            {"payment" in plan && plan.payment && (
              <DetailSection title="Estructura de pago" surface={surface}>
                <div className="space-y-3">
                  {plan.payment.map((p, k) => (
                    <PlanDetailRow
                      key={k}
                      stage={p.stage}
                      desc={p.desc}
                      amount={p.amount}
                      surface={surface}
                    />
                  ))}
                </div>
              </DetailSection>
            )}

            {"costPerPiece" in plan && plan.costPerPiece && (
              <div
                className="p-4 rounded-xl text-left text-pretty space-y-2"
                style={{
                  background: surface.detailPanelBg,
                  border: `1px solid ${surface.detailPanelBorder}`,
                }}
              >
                <span
                  className="text-sm block leading-relaxed"
                  style={{
                    fontFamily: "var(--font-lato), sans-serif",
                    color: surface.detailBody,
                  }}
                >
                  {plan.costPerPiece}
                </span>
                {"savings" in plan && plan.savings && (
                  <span
                    className="block text-xs font-medium leading-relaxed"
                    style={{ color: surface.detailAccent }}
                  >
                    {plan.savings}
                  </span>
                )}
                {"addon" in plan && plan.addon && (
                  <span
                    className="block text-xs leading-relaxed"
                    style={{
                      fontFamily: "var(--font-lato), sans-serif",
                      color: surface.muted,
                    }}
                  >
                    {plan.addon}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function PlanDetailRow({
  stage,
  desc,
  amount,
  surface,
}: {
  stage: string;
  desc: string;
  amount: string;
  surface: PlanSurface;
}) {
  return (
    <div
      className="flex flex-col gap-2 p-4 rounded-xl sm:flex-row sm:items-start sm:justify-between sm:gap-4"
      style={{
        background: surface.paymentPanelBg,
        border: `1px solid ${surface.detailPanelBorder}`,
      }}
    >
      <div className="order-1 sm:order-2 w-full sm:w-auto sm:max-w-[11rem] shrink-0 text-left sm:text-right">
        <span
          className="text-sm font-semibold leading-snug text-pretty block"
          style={{
            fontFamily: "var(--font-quicksand), sans-serif",
            color: surface.detailAccent,
          }}
        >
          {amount}
        </span>
      </div>
      <div className="min-w-0 flex-1 order-2 sm:order-1">
        <span
          className="text-sm font-semibold block"
          style={{
            fontFamily: "var(--font-quicksand), sans-serif",
            color: surface.title,
          }}
        >
          {stage}
        </span>
        <span
          className="text-xs leading-relaxed text-pretty block mt-1"
          style={{
            fontFamily: "var(--font-lato), sans-serif",
            color: surface.detailBody,
          }}
        >
          {desc}
        </span>
      </div>
    </div>
  );
}

function PlanFrameworkRow({
  count,
  type,
  goal,
  surface,
}: {
  count: number;
  type: string;
  goal: string;
  surface: PlanSurface;
}) {
  return (
    <div
      className="flex flex-col gap-2 p-4 rounded-xl sm:flex-row sm:items-center sm:justify-between sm:gap-4"
      style={{
        background: surface.detailPanelBg,
        border: `1px solid ${surface.detailPanelBorder}`,
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span
          className="text-lg font-bold shrink-0"
          style={{
            fontFamily: "var(--font-quicksand), sans-serif",
            color: surface.detailAccent,
          }}
        >
          {count}
        </span>
        <span
          className="text-sm font-medium text-pretty"
          style={{
            fontFamily: "var(--font-quicksand), sans-serif",
            color: surface.title,
          }}
        >
          {type}
        </span>
      </div>
      <span
        className="text-xs leading-relaxed text-pretty sm:text-right sm:max-w-[55%]"
        style={{
          fontFamily: "var(--font-lato), sans-serif",
          color: surface.detailBody,
        }}
      >
        {goal}
      </span>
    </div>
  );
}

function DetailSection({
  title,
  surface,
  children,
}: {
  title: string;
  surface: PlanSurface;
  children: ReactNode;
}) {
  return (
    <div>
      <h4
        className="text-xs tracking-[0.2em] uppercase font-medium mb-3 text-left"
        style={{ fontFamily: "var(--font-lato), sans-serif", color: surface.detailLabel }}
      >
        {title}
      </h4>
      {children}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
    </svg>
  );
}
