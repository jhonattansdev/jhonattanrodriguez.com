"use client";

import Image from "next/image";
import { useId, type CSSProperties } from "react";
import { ChevronRight } from "lucide-react";
import type { BuilderProject } from "@/lib/design-tokens";
import {
  getNeutralChipBackground,
  getStatusColor,
  type BuilderTheme,
} from "@/components/developer-ai/project-ui";

const MAX_STACK_CHIPS = 3;

type ProjectCardProps = {
  project: BuilderProject;
  theme: BuilderTheme;
  dark: boolean;
  onOpen: (trigger: HTMLButtonElement) => void;
};

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
      className="group flex h-full w-full flex-col overflow-hidden rounded-3xl text-center outline-none md:text-left transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_48px_var(--project-shadow)] focus-visible:ring-2 focus-visible:ring-[color:var(--project-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      style={
        {
          background: t.card,
          border: `1px solid ${t.border}`,
          "--project-focus": t.accent,
          "--project-shadow": `${t.accent}26`,
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
            sizes="(max-width: 768px) 100vw, 480px"
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

      <div className="flex flex-1 flex-col items-center gap-3 p-5 sm:p-6 md:items-start">
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif", color: t.accent }}
        >
          {project.badge}
        </span>

        <h3
          id={titleId}
          className="text-[22px] font-semibold leading-tight"
          style={{ fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif", color: t.text.primary }}
        >
          {project.title}
        </h3>

        <p
          id={taglineId}
          className="line-clamp-3 text-pretty text-[15px] leading-relaxed"
          style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif", color: t.text.secondary }}
        >
          {project.tagline}
        </p>

        <ul
          className="mt-1 flex flex-wrap justify-center gap-2 md:justify-start"
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

        <div className="mt-auto flex w-full flex-col items-center gap-3 pt-2 md:flex-row md:justify-between">
          <div
            className="flex min-w-0 flex-col items-center gap-1 text-[13px] md:flex-row md:gap-2"
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
            <span className="md:truncate">{project.role}</span>
          </div>

          <span
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium"
            style={{ fontFamily: "var(--font-lato), 'Lato', sans-serif", color: t.accent }}
          >
            <span>Ver detalles</span>
            <ChevronRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />
          </span>
        </div>
      </div>
    </button>
  );
}
