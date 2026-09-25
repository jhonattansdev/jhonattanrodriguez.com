import type { CSSProperties } from "react";
import { Reveal } from "@/components/shared/reveal";

type TypedTextProps = {
  text: string;
  /** Retraso en ms antes de empezar a "teclear". */
  delay?: number;
  className?: string;
};

/**
 * Etiqueta de terminal que se escribe sola al entrar en pantalla. El texto real
 * está siempre en el DOM (lectores de pantalla, copiar y pegar): solo se recorta
 * con `clip-path`, así el ancho del chip no cambia. Pensada para fuentes
 * monoespaciadas (el cursor avanza `1ch` por carácter).
 */
export function TypedText({ text, delay, className = "" }: TypedTextProps) {
  return (
    <Reveal
      as="span"
      effect="none"
      delay={delay}
      className={`type-text ${className}`.trim()}
      style={{ "--chars": text.length } as CSSProperties}
    >
      <span className="type-text__inner">{text}</span>
    </Reveal>
  );
}
