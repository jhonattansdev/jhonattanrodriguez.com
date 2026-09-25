import { Reveal } from "@/components/shared/reveal";
import { TerminalFrame, type TerminalFrameTheme } from "@/components/shared/terminal-frame";

/** Imagen de eventos y hackathons entre el portafolio y los servicios. */
export function DeveloperShowcase({ theme }: { theme: TerminalFrameTheme }) {
  return (
    <section className="py-12 relative" style={{ borderTop: `1px solid ${theme.border}` }}>
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <TerminalFrame
            src="/developer-ai/developer-eventos.webp"
            alt="Collage de eventos: desarrollo en vivo, el stand de MurphyIA, el equipo campeón del 24H-Hackathon y una jornada de código"
            label="> eventos --developer_ai"
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
