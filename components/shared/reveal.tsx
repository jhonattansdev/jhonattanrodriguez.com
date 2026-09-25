"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { observeInView } from "@/hooks/use-in-view";

type RevealProps = Omit<HTMLAttributes<HTMLElement>, "style" | "className"> & {
  as?: ElementType;
  /** Retraso en ms; con `stagger`, se suma al escalonado de cada hijo. */
  delay?: number;
  /** El contenedor no se anima: sus hijos directos entran escalonados. */
  stagger?: boolean;
  /** `none` solo marca `reveal-in`; el efecto lo pone otra clase (p. ej. `type-text`). */
  effect?: "up" | "none";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/**
 * Entrada al hacer scroll (fundido + subida corta), una sola vez. La animación
 * es CSS (`.reveal`, `.reveal-in` en globals.css) con fill `backwards`: al
 * terminar el elemento vuelve a su estilo natural y no pisa sus `hover:` ni sus
 * `transition-*`. No la uses como ancestro de un elemento con `backdrop-filter`;
 * pon la clase en ese mismo elemento.
 */
export function Reveal({
  as: Tag = "div",
  delay,
  stagger = false,
  effect = "up",
  className = "",
  style,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<"hidden" | "in" | "skip">("hidden");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    return observeInView(element, (skip) => setState(skip ? "skip" : "in"));
  }, []);

  const classes = [
    effect === "up" ? "reveal" : "",
    stagger ? "reveal-stagger" : "",
    state !== "hidden" ? "reveal-in" : "",
    state === "skip" ? "reveal-skip" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inlineStyle = delay
    ? ({ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties)
    : style;

  return (
    <Tag ref={ref} className={classes} style={inlineStyle} {...rest}>
      {children}
    </Tag>
  );
}
