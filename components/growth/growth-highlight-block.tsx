import type { ReactNode } from "react";
import { growthContentAlign } from "@/lib/growth-layout";

type GrowthHighlightBlockProps = {
  title: string;
  children: ReactNode;
  dark: boolean;
  accent: string;
  border: string;
  textPrimary: string;
  className?: string;
};

export function GrowthHighlightBlock({
  title,
  children,
  dark,
  accent,
  border,
  textPrimary,
  className = "",
}: GrowthHighlightBlockProps) {
  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl ${growthContentAlign} ${className}`}
      style={{
        background: dark ? `${accent}08` : `${accent}06`,
        border: `1px solid ${border}`,
      }}
    >
      <h3
        className="font-semibold text-sm mb-2"
        style={{ fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif", color: accent }}
      >
        {title}
      </h3>
      <div
        className="text-sm sm:text-base leading-relaxed text-pretty"
        style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif", color: textPrimary }}
      >
        {children}
      </div>
    </div>
  );
}
