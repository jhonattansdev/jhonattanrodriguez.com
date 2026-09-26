"use client";

import Image from "next/image";
import { Fragment, useId, type CSSProperties } from "react";
import { ChevronRight } from "lucide-react";
import type { BuilderProject } from "@/lib/design-tokens";
import {
  getNeutralChipBackground,
  getStatusColor,
  type BuilderTheme,
} from "@/components/developer-ai/project-ui";

const MAX_STACK_CHIPS = 3;

/**
 * Punto de corte antes de cada "." para que un título sin espacios como
 * "Jhonattanrodriguez.com" parta en "Jhonattanrodriguez" / ".com" en la tarjeta compacta
 * en vez de desbordar.
 */
function breakableTitle(title: string) {
  return title.split(".").map((part, i) => (
    <Fragment key={i}>
      {i > 0 && (
        <>
          <wbr />.
        </>
      )}
      {part}
    </Fragment>
  ));
}

type ProjectCardProps = {
  project: BuilderProject;
  theme: BuilderTheme;
  dark: boolean;
  onOpen: (trigger: HTMLButtonElement) => void;
};

/**
 * Tarjeta de proyecto. Por debajo de `md` es compacta, en cuadrícula de 2 o 3 columnas al
 * estilo de las tarjetas de LinkedIn: portada, etiqueta, título y resumen recortados,
 * estado y un botón de contorno; el stack y el rol quedan para la hoja de detalle.
 * Desde `md` es la tarjeta grande de siempre.
 */
export function ProjectCard({ project, theme: t, dark, onOpen }: ProjectCardProps) {
  const uid = useId();
  const titleId = `${uid}-title`;
  const taglineId = `${uid}-tagline`;
  const mediaSrc = project.expandedMedia?.src?.trim();
  const statusColor = getStatusColor(project.status, t);
  const extraStack = project.stack.length - MAX_STACK_CHIPS;
  const chipBg = getNeutralChipBackground(dark);

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-labelledby={titleId}
      aria-describedby={taglineId}
      onClick={(e) => onOpen(e.currentTarget)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl text-center outline-none md:rounded-3xl md:text-left transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_48px_var(--project-shadow)] active:scale-[0.98] md:active:scale-100 focus-visible:ring-2 focus-visible:ring-[color:var(--project-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
      style={
        {
          background: t.card,
          border: `1px solid ${t.border}`,
          "--project-focus": t.accent,
          "--project-shadow": `${t.accent}26`,
          "--project-outline": `${t.accent}59`,
        } as CSSProperties
      }
    >
      <div
        className="relative aspect-[3452/1990] w-full overflow-hidden"
        style={{ borderBottom: `1px solid ${t.border}` }}
      >
        {mediaSrc ? (
          <Image
            src={mediaSrc}
            alt=""
            fill
            sizes="(max-width: 639px) 50vw, (max-width: 767px) 33vw, 480px"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${t.accent}26, ${t.teal}1a)` }}
            aria-hidden
          />
        )}
      </div>

      <div className="flex flex-1 flex-col items-center gap-1.5 p-3 md:items-start md:gap-3 md:p-6">
        <span
          className="max-w-full truncate text-[10px] font-semibold uppercase tracking-[0.12em] md:text-[11px] md:tracking-[0.14em]"
          style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif", color: t.accent }}
        >
          {project.badge}
        </span>

        <h3
          id={titleId}
          className="line-clamp-2 text-balance text-[13.5px] font-semibold leading-snug [overflow-wrap:anywhere] min-[375px]:text-[14px] md:line-clamp-none md:text-[22px] md:leading-tight md:[overflow-wrap:normal] md:[text-wrap:wrap]"
          style={{ fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif", color: t.text.primary }}
        >
          {breakableTitle(project.title)}
        </h3>

        <p
          id={taglineId}
          className="line-clamp-2 text-pretty text-[12.5px] leading-snug md:line-clamp-3 md:text-[15px] md:leading-relaxed"
          style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif", color: t.text.secondary }}
        >
          {project.tagline}
        </p>

        <ul
          className="mt-1 hidden flex-wrap justify-center gap-2 md:flex md:justify-start"
          aria-label="Stack principal"
        >
          {project.stack.slice(0, MAX_STACK_CHIPS).map((s) => (
            <li
              key={s}
              className="font-mono rounded-lg px-2 py-1 text-[12px]"
              style={{ background: chipBg, color: t.text.secondary }}
            >
              {s}
            </li>
          ))}
          {extraStack > 0 && (
            <li
              className="font-mono rounded-lg px-2 py-1 text-[12px]"
              style={{ background: chipBg, color: t.text.secondary }}
            >
              +{extraStack}
            </li>
          )}
        </ul>

        <div className="mt-auto flex w-full flex-col items-center gap-2 pt-1 md:flex-row md:justify-between md:gap-3 md:pt-2">
          <div
            className="flex min-w-0 flex-col items-center gap-1 text-[12px] md:flex-row md:gap-2 md:text-[13px]"
            style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif", color: t.text.secondary }}
          >
            <span
              className="inline-flex shrink-0 items-center gap-2"
              style={{ color: t.text.primary }}
            >
              <span
                aria-hidden
                className="h-2 w-2 rounded-full"
                style={{ background: statusColor, boxShadow: `0 0 0 3px ${statusColor}22` }}
              />
              {project.status}
            </span>
            <span aria-hidden className="hidden md:inline">
              ·
            </span>
            <span className="hidden md:inline md:truncate">{project.role}</span>
          </div>

          {/* Botón de contorno (móvil) o enlace (desde md). Es un span: no puede haber un botón dentro del botón de la tarjeta. */}
          <span
            className="inline-flex w-full shrink-0 items-center justify-center gap-1 rounded-full border border-[color:var(--project-outline)] px-3 py-1.5 text-[12.5px] font-medium md:w-auto md:rounded-none md:border-0 md:p-0 md:text-sm"
            style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif", color: t.accent }}
          >
            <span>Ver detalles</span>
            <ChevronRight
              aria-hidden
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 md:size-4"
            />
          </span>
        </div>
      </div>
    </button>
  );
}
