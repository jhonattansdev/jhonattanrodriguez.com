"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import Image from "next/image";
import { useId, type CSSProperties, type ElementType, type ReactNode } from "react";
import { ArrowUpRight, Lock, X } from "lucide-react";
import { Drawer as DrawerPrimitive } from "vaul";
import { GlowButton } from "@/components/shared/glow-button";
import { GroupedList } from "@/components/developer-ai/grouped-list";
import {
  getNeutralChipBackground,
  getStatusColor,
  type BuilderTheme,
} from "@/components/developer-ai/project-ui";
import { useIsMobile } from "@/hooks/use-mobile";
import type { BuilderProject } from "@/lib/design-tokens";
import { useNight } from "@/lib/night-mode";

const FONT_TITLE = "var(--font-quicksand), 'Quicksand', sans-serif";
const FONT_BODY = "var(--font-lato), 'Lato', sans-serif";

type SheetPrimitives = {
  Title: ElementType;
  Description: ElementType;
  Close: ElementType;
};

const DIALOG_PRIMITIVES: SheetPrimitives = {
  Title: DialogPrimitive.Title,
  Description: DialogPrimitive.Description,
  Close: DialogPrimitive.Close,
};

const DRAWER_PRIMITIVES: SheetPrimitives = {
  Title: DrawerPrimitive.Title,
  Description: DrawerPrimitive.Description,
  Close: DrawerPrimitive.Close,
};

type ProjectSheetProps = {
  project: BuilderProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseAutoFocus: (event: Event) => void;
  theme: BuilderTheme;
  dark: boolean;
};

export function ProjectSheet({
  project,
  open,
  onOpenChange,
  onCloseAutoFocus,
  theme: t,
  dark,
}: ProjectSheetProps) {
  const isMobile = useIsMobile();
  const { night } = useNight();

  if (!project) return null;

  const surface = dark ? `color-mix(in srgb, ${t.bg} 92%, ${t.accent} 8%)` : "#ffffff";
  const overlayBg = dark ? (night ? "rgba(0,0,0,0.72)" : "rgba(2,6,14,0.66)") : "rgba(15,23,42,0.38)";
  const shadow = dark ? "0 32px 96px rgba(0,0,0,0.55)" : "0 32px 96px rgba(15,23,42,0.25)";

  if (isMobile) {
    return (
      <DrawerPrimitive.Root open={open} onOpenChange={onOpenChange} shouldScaleBackground={false}>
        <DrawerPrimitive.Portal>
          <DrawerPrimitive.Overlay
            className="fixed inset-0 z-[70] backdrop-blur-sm"
            style={{ background: overlayBg }}
          />
          <DrawerPrimitive.Content
            onCloseAutoFocus={onCloseAutoFocus}
            className="fixed inset-x-0 bottom-0 z-[71] flex h-[92dvh] flex-col overflow-hidden rounded-t-[28px] outline-none"
            style={{ background: surface, borderTop: `1px solid ${t.border}`, boxShadow: shadow }}
          >
            <div
              aria-hidden
              className="mx-auto mb-1 mt-2.5 h-1.5 w-10 shrink-0 rounded-full"
              style={{ background: dark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)" }}
            />
            <SheetBody
              project={project}
              theme={t}
              dark={dark}
              surface={surface}
              primitives={DRAWER_PRIMITIVES}
            />
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Portal>
      </DrawerPrimitive.Root>
    );
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-[70] backdrop-blur-sm duration-300 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none"
          style={{ background: overlayBg }}
        />
        <DialogPrimitive.Content
          onCloseAutoFocus={onCloseAutoFocus}
          className="fixed left-[50%] top-[50%] z-[71] flex max-h-[90vh] w-[min(960px,92vw)] translate-x-[-50%] translate-y-[-50%] flex-col overflow-hidden rounded-[28px] outline-none duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none"
          style={{ background: surface, border: `1px solid ${t.border}`, boxShadow: shadow }}
        >
          <SheetBody
            project={project}
            theme={t}
            dark={dark}
            surface={surface}
            primitives={DIALOG_PRIMITIVES}
          />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

type SheetBodyProps = {
  project: BuilderProject;
  theme: BuilderTheme;
  dark: boolean;
  surface: string;
  primitives: SheetPrimitives;
};

function SheetBody({ project, theme: t, dark, surface, primitives }: SheetBodyProps) {
  const { Title, Description, Close } = primitives;
  const uid = useId();
  const media = project.expandedMedia;
  const mediaSrc = media?.src?.trim();
  const statusColor = getStatusColor(project.status, t);
  const chipBg = getNeutralChipBackground(dark);
  const hasCta = !project.closedNote && project.ctaUrl && project.ctaLabel;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header
        className="flex shrink-0 items-center gap-3 px-4 py-2.5 sm:px-6"
        style={{
          borderBottom: `1px solid ${t.border}`,
          background: `color-mix(in srgb, ${surface} 82%, transparent)`,
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        }}
      >
        <span
          aria-hidden
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ background: statusColor, boxShadow: `0 0 0 3px ${statusColor}22` }}
        />
        <span
          aria-hidden
          className="min-w-0 flex-1 truncate text-[15px] font-semibold"
          style={{ fontFamily: FONT_TITLE, color: t.text.primary }}
        >
          {project.title}
        </span>

        {hasCta && (
          <div className="hidden sm:block">
            <GlowButton
              href={project.ctaUrl}
              external
              variant="primary"
              size="sm"
              accentColor={t.accentSolid}
              secondaryColor={t.accent}
              icon={<ArrowUpRight className="size-3.5" aria-hidden />}
            >
              {project.ctaLabel}
            </GlowButton>
          </div>
        )}

        <Close
          aria-label="Cerrar"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full outline-none transition-colors hover:bg-[color:var(--sheet-hover)] focus-visible:ring-2 focus-visible:ring-[color:var(--sheet-focus)]"
          style={
            {
              color: t.text.primary,
              "--sheet-hover": chipBg,
              "--sheet-focus": t.accent,
            } as CSSProperties
          }
        >
          <X className="size-5" aria-hidden />
        </Close>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="mx-auto w-full max-w-[860px] px-5 pb-14 pt-6 sm:px-10 sm:pt-8">
          {mediaSrc && (
            <div
              className="overflow-hidden rounded-[20px]"
              style={{
                border: `1px solid ${t.border}`,
                boxShadow: dark ? "0 12px 40px rgba(0,0,0,0.4)" : "0 12px 40px rgba(15,23,42,0.12)",
              }}
            >
              <Image
                src={mediaSrc}
                alt={media?.alt ?? ""}
                width={media?.width ?? 1440}
                height={media?.height ?? 900}
                sizes="(max-width: 768px) 100vw, 860px"
                loading="eager"
                className="block h-auto w-full"
              />
            </div>
          )}

          <div className="mt-8 flex flex-col gap-4">
            <div
              className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] font-semibold uppercase tracking-[0.14em]"
              style={{ fontFamily: FONT_BODY }}
            >
              <span style={{ color: t.accent }}>{project.badge}</span>
              <span aria-hidden style={{ color: t.text.secondary }}>
                ·
              </span>
              <span className="inline-flex items-center gap-2" style={{ color: t.text.secondary }}>
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full"
                  style={{ background: statusColor, boxShadow: `0 0 0 3px ${statusColor}22` }}
                />
                {project.status}
              </span>
            </div>

            <Title asChild>
              <h2
                className="text-[clamp(28px,4vw,40px)] font-bold leading-[1.1] tracking-[-0.02em]"
                style={{ fontFamily: FONT_TITLE, color: t.text.primary }}
              >
                {project.title}
              </h2>
            </Title>

            <Description asChild>
              <p
                className="max-w-[62ch] text-[18px] leading-[1.5]"
                style={{ fontFamily: FONT_BODY, color: t.text.secondary }}
              >
                {project.tagline}
              </p>
            </Description>

            <p
              className="text-[14px] leading-relaxed"
              style={{ fontFamily: FONT_BODY, color: t.text.secondary }}
            >
              <span>Rol</span>
              <span aria-hidden> · </span>
              <span className="sr-only">: </span>
              <span style={{ color: t.text.primary }}>{project.role}</span>
            </p>

            <ul className="flex flex-wrap gap-2" aria-label="Stack">
              {project.stack.map((s) => (
                <li
                  key={s}
                  className="font-mono rounded-lg px-2.5 py-1 text-[12px]"
                  style={{ background: chipBg, color: t.text.secondary }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <SheetSection id={`${uid}-desc`} title="Descripción" theme={t}>
            <Prose theme={t}>{project.desc}</Prose>
          </SheetSection>

          <SheetSection id={`${uid}-problem`} title="Problema" theme={t}>
            <Prose theme={t}>{project.problem}</Prose>
          </SheetSection>

          <SheetSection id={`${uid}-how`} title="Cómo funciona" theme={t}>
            <GroupedList
              theme={t}
              rows={project.how.map((h) => ({ term: h.label, detail: h.desc }))}
            />
          </SheetSection>

          {project.tech.length > 0 && (
            <SheetSection id={`${uid}-tech`} title="Tecnología aplicada" theme={t}>
              <GroupedList
                theme={t}
                monoTerms
                rows={project.tech.map((x) => ({ term: x.name, detail: x.desc }))}
              />
            </SheetSection>
          )}

          <SheetSection id={`${uid}-result`} title="Resultado" theme={t}>
            <div
              className="rounded-2xl p-5 sm:p-6"
              style={{
                background: dark ? `${t.accent}12` : `${t.accent}0d`,
                border: `1px solid ${t.border}`,
                borderLeft: `3px solid ${t.accent}`,
              }}
            >
              <p
                className="m-0 max-w-[68ch] text-[16px] leading-[1.65]"
                style={{ fontFamily: FONT_BODY, color: t.text.primary }}
              >
                {project.result}
              </p>
            </div>
          </SheetSection>

          {(project.closedNote || hasCta) && (
            <div className="mt-12 flex flex-col items-start gap-3">
              {project.closedNote ? (
                <div
                  className="flex items-start gap-3 rounded-2xl p-4"
                  style={{ background: t.card, border: `1px solid ${t.border}` }}
                >
                  <Lock
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0"
                    style={{ color: t.text.secondary }}
                  />
                  <p
                    className="m-0 text-[14px] leading-relaxed"
                    style={{ fontFamily: FONT_BODY, color: t.text.secondary }}
                  >
                    {project.closedNote}
                  </p>
                </div>
              ) : (
                <GlowButton
                  href={project.ctaUrl}
                  external
                  variant="secondary"
                  size="md"
                  accentColor={t.accentSolid}
                  secondaryColor={t.accent}
                  icon={<ArrowUpRight className="size-4" aria-hidden />}
                >
                  {project.ctaLabel}
                </GlowButton>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SheetSection({
  id,
  title,
  theme: t,
  children,
}: {
  id: string;
  title: string;
  theme: BuilderTheme;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="mt-12">
      <h3
        id={id}
        className="mb-4 text-[20px] font-semibold leading-tight"
        style={{ fontFamily: FONT_TITLE, color: t.text.primary }}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}

function Prose({ theme: t, children }: { theme: BuilderTheme; children: ReactNode }) {
  return (
    <p
      className="m-0 max-w-[68ch] text-[16px] leading-[1.65]"
      style={{ fontFamily: FONT_BODY, color: t.text.secondary }}
    >
      {children}
    </p>
  );
}
