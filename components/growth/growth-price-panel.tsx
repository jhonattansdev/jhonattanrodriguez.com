import type { ReactNode } from "react";

type GrowthPricePanelProps = {
  priceCop: string;
  priceUsd: string;
  perSessionCop: string;
  perSessionUsd: string;
  duration: string;
  priceNote?: string;
  priceSize?: "lg" | "md";
  dark: boolean;
  accent: string;
  border: string;
  textMuted: string;
  children?: ReactNode;
};

export function GrowthPricePanel({
  priceCop,
  priceUsd,
  perSessionCop,
  perSessionUsd,
  duration,
  priceNote,
  priceSize = "lg",
  dark,
  accent,
  border,
  textMuted,
  children,
}: GrowthPricePanelProps) {
  return (
    <div
      className="shrink-0 flex flex-col items-center text-center mx-auto w-full max-w-sm p-5 rounded-2xl"
      style={{
        background: dark ? `${accent}08` : `${accent}06`,
        border: `1px solid ${border}`,
      }}
    >
      <div
        className="font-bold"
        style={{
          fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
          color: accent,
          fontSize: priceSize === "lg" ? "clamp(33.6px, 4.8vw, 48px)" : "clamp(28.8px, 3.6vw, 38.4px)",
        }}
      >
        {priceUsd}
      </div>
      <div
        className="font-semibold mt-1"
        style={{
          fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
          color: accent,
          fontSize: priceSize === "lg" ? "clamp(16px, 2vw, 20px)" : "clamp(15px, 1.8vw, 18px)",
        }}
      >
        {priceCop}
      </div>
      <div
        className="text-xs mt-2"
        style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif", color: textMuted }}
      >
        {duration}
      </div>
      <div
        className="text-xs mt-1"
        style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif", color: textMuted }}
      >
        {perSessionUsd} ({perSessionCop}) por sesión
      </div>
      {priceNote ? (
        <div
          className={`text-xs px-2 py-1 rounded-lg ${priceSize === "md" ? "mt-2" : "mt-1"}`}
          style={{
            fontFamily: "var(--font-lato), 'Lato', sans-serif",
            color: accent,
            background: dark ? `${accent}12` : `${accent}08`,
          }}
        >
          {priceNote}
        </div>
      ) : null}
      {children}
    </div>
  );
}
