"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ElementType } from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { FilmMediaFrame } from "@/components/filmmaker/film-media-frame";
import { useIsMobile } from "@/hooks/use-mobile";

const FONT_TITLE = "var(--font-quicksand), 'Quicksand', sans-serif";

type VideoLightboxProps = {
  videoId: string | null;
  title: string | null;
  onOpenChange: (open: boolean) => void;
  dark: boolean;
  pageBg: string;
  border: string;
  accent: string;
};

export function VideoLightbox({
  videoId,
  title,
  onOpenChange,
  dark,
  pageBg,
  border,
  accent,
}: VideoLightboxProps) {
  const isMobile = useIsMobile();
  const open = videoId !== null;

  const surface = dark ? `color-mix(in srgb, ${pageBg} 92%, ${accent} 8%)` : "#ffffff";
  const overlayBg = dark ? "rgba(2,6,14,0.66)" : "rgba(15,23,42,0.38)";
  const shadow = dark ? "0 32px 96px rgba(0,0,0,0.55)" : "0 32px 96px rgba(15,23,42,0.25)";

  function renderBody(Close: ElementType) {
    if (!videoId) return null;
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <header
          className="flex shrink-0 items-center gap-3 px-4 py-2.5 sm:px-6"
          style={{ borderBottom: `1px solid ${border}` }}
        >
          <span
            className="min-w-0 flex-1 truncate text-[15px] font-semibold"
            style={{ fontFamily: FONT_TITLE, color: dark ? "#fff" : "#111" }}
          >
            {title}
          </span>
          <Close
            aria-label="Cerrar"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full outline-none transition-colors hover:opacity-70"
            style={{ color: dark ? "#fff" : "#111" }}
          >
            <X className="size-5" aria-hidden />
          </Close>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6 pt-4 sm:px-6">
          <div className="mx-auto w-full max-w-[360px]">
            <FilmMediaFrame
              variant="video"
              videoId={videoId}
              pageBg={pageBg}
              dark={dark}
              videoAspect="9:16"
            />
          </div>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <DrawerPrimitive.Root open={open} onOpenChange={onOpenChange} shouldScaleBackground={false}>
        <DrawerPrimitive.Portal>
          <DrawerPrimitive.Overlay
            className="fixed inset-0 z-[70] backdrop-blur-sm"
            style={{ background: overlayBg }}
          />
          <DrawerPrimitive.Content
            className="fixed inset-x-0 bottom-0 z-[71] flex h-[92dvh] flex-col overflow-hidden rounded-t-[28px] outline-none"
            style={{ background: surface, borderTop: `1px solid ${border}`, boxShadow: shadow }}
          >
            <div
              aria-hidden
              className="mx-auto mb-1 mt-2.5 h-1.5 w-10 shrink-0 rounded-full"
              style={{ background: dark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)" }}
            />
            <DrawerPrimitive.Title className="sr-only">{title ?? "Video"}</DrawerPrimitive.Title>
            {renderBody(DrawerPrimitive.Close)}
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
          className="fixed left-[50%] top-[50%] z-[71] flex max-h-[90vh] w-[min(420px,92vw)] translate-x-[-50%] translate-y-[-50%] flex-col overflow-hidden rounded-[28px] outline-none duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none"
          style={{ background: surface, border: `1px solid ${border}`, boxShadow: shadow }}
        >
          <DialogPrimitive.Title className="sr-only">{title ?? "Video"}</DialogPrimitive.Title>
          {renderBody(DialogPrimitive.Close)}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
