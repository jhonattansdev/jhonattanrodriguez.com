import Image from "next/image";
import { TypedText } from "@/components/shared/typed-text";

export type TerminalFrameTheme = {
  border: string;
  card: string;
  accent: string;
  accentSolid: string;
  textSecondary: string;
};

type TerminalFrameProps = {
  src: string;
  alt: string;
  /** Texto de la barra de título, p. ej. `> sesiones --growth`. */
  label: string;
  width: number;
  height: number;
  sizes: string;
  theme: TerminalFrameTheme;
};

/**
 * Imagen en marco de ventana de terminal (mismo lenguaje que los chips
 * `> stack --…` de los héroes). Es estática a propósito: sin blur, filtros ni
 * `will-change`, para no sumar capas compuestas durante el scroll.
 */
export function TerminalFrame({ src, alt, label, width, height, sizes, theme }: TerminalFrameProps) {
  return (
    <figure
      className="overflow-hidden rounded-2xl"
      style={{
        border: `1px solid ${theme.border}`,
        boxShadow: `0 28px 70px -30px ${theme.accentSolid}66`,
      }}
    >
      <div
        className="flex items-center gap-3 px-4 py-2.5"
        style={{ background: theme.card, borderBottom: `1px solid ${theme.border}` }}
      >
        <span aria-hidden className="flex gap-1.5">
          {["E6", "80", "40"].map((alpha) => (
            <span
              key={alpha}
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: `${theme.accent}${alpha}` }}
            />
          ))}
        </span>
        <span className="text-xs font-mono" style={{ color: theme.textSecondary }}>
          <TypedText text={label} />
        </span>
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className="block h-auto w-full"
      />
    </figure>
  );
}
