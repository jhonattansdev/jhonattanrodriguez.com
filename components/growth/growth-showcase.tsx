import { Reveal } from "@/components/shared/reveal";
import { TerminalFrame, type TerminalFrameTheme } from "@/components/shared/terminal-frame";

/** Imagen de las sesiones de Growth entre el héroe y los servicios. */
export function GrowthShowcase({ theme }: { theme: TerminalFrameTheme }) {
  return (
    <section className="relative pt-6 sm:pt-10">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <TerminalFrame
            src="/growth/growth-sesiones.webp"
            alt="Collage de sesiones de mentoría: capturas de Meta Ads, dashboards y participantes"
            label="> sesiones --growth"
            width={1600}
            height={900}
            sizes="(max-width: 768px) 100vw, 1024px"
            theme={theme}
          />
        </Reveal>
      </div>
    </section>
  );
}
