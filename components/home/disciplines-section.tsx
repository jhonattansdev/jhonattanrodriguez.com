import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRightIcon } from "@/components/shared/glow-button";
import { Reveal } from "@/components/shared/reveal";
import type { HomeDiscipline } from "@/lib/home-disciplines";

type DisciplinesTheme = {
  accent: string;
  card: string;
  border: string;
  text: { primary: string; secondary: string; muted: string };
};

type DisciplinesSectionProps = {
  dark: boolean;
  t: DisciplinesTheme;
  disciplines: HomeDiscipline[];
};

const QUICKSAND = "var(--font-quicksand), 'Quicksand', sans-serif";
const LATO = "var(--font-lato), 'Lato', sans-serif";

/**
 * "Lo que hago": una tarjeta por servicio, cada una con su comprador, su cifra
 * clave y nombres reales (proyectos, ofertas o planes). Las tarjetas son hijos
 * directos del `Reveal` escalonado y llevan el `backdrop-filter` en sí mismas
 * (nunca dentro de un ancestro con opacidad). Efectos estáticos: sin pulsos.
 */
export function DisciplinesSection({ dark, t, disciplines }: DisciplinesSectionProps) {
  return (
    <section id="disciplinas" className="relative">
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-24">
        <Reveal className="mb-12 md:mb-14 text-center">
          <span
            className="inline-block text-xs tracking-[0.22em] uppercase font-medium mb-4 px-4 py-2 rounded-full"
            style={{
              fontFamily: LATO,
              color: t.accent,
              background: dark ? `${t.accent}15` : `${t.accent}10`,
            }}
          >
            Lo que hago
          </span>
          <h2
            className="font-bold text-balance leading-tight"
            style={{
              fontFamily: QUICKSAND,
              fontSize: "clamp(26px, 4vw, 40px)",
              letterSpacing: "-0.02em",
              color: t.text.primary,
            }}
          >
            Empieza por lo que necesitas hoy
          </h2>
          <p
            className="mt-4 mx-auto max-w-xl text-base leading-relaxed text-pretty"
            style={{ fontFamily: LATO, color: t.text.secondary }}
          >
            Tres disciplinas que se refuerzan entre sí, cada una pensada para quien la necesita.
          </p>
        </Reveal>

        {/* Desde `md` cada tarjeta ocupa 6 filas de una subcuadrícula compartida: ícono, cabecera, cifra, texto, fichas y CTA quedan alineados entre las tres aunque el texto mida distinto. */}
        <Reveal
          stagger
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-[repeat(6,auto)] md:gap-y-0"
        >
          {disciplines.map((d) => (
            <Link
              key={d.id}
              href={d.href}
              className="group relative flex flex-col overflow-hidden rounded-3xl p-6 sm:p-7 text-center md:row-span-6 md:grid md:grid-rows-subgrid transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--dc)]"
              style={
                {
                  background: t.card,
                  border: `1px solid ${d.color}${dark ? "26" : "33"}`,
                  backdropFilter: "blur(20px)",
                  boxShadow: dark ? `0 4px 40px ${d.color}10` : "0 4px 40px rgba(0,0,0,0.04)",
                  "--dc": d.color,
                } as CSSProperties
              }
            >
              {/* Resplandor superior del color de la disciplina (más intenso al pasar el cursor) */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-44 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(120% 100% at 50% 0%, ${d.color}${dark ? "22" : "1a"}, transparent 70%)`,
                }}
              />
              {/* Borde que se intensifica con el cursor */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl border opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ borderColor: `${d.color}66` }}
              />

              <div
                className="relative z-10 mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  color: d.color,
                  background: `linear-gradient(135deg, ${d.color}${dark ? "26" : "1f"}, ${d.color}0d)`,
                  border: `1px solid ${d.color}40`,
                  boxShadow: dark
                    ? `0 0 18px ${d.color}22, inset 0 1px 0 rgba(255,255,255,0.08)`
                    : undefined,
                }}
              >
                <d.Icon size={22} strokeWidth={1.75} aria-hidden />
              </div>

              <div className="relative z-10">
                <div
                  className="text-xs font-semibold uppercase tracking-[0.18em]"
                  style={{ fontFamily: QUICKSAND, color: d.color }}
                >
                  {d.label}
                </div>
                <div className="mt-1 text-sm" style={{ fontFamily: LATO, color: t.text.secondary }}>
                  {d.audience}
                </div>
              </div>

              <h3
                className="relative z-10 mt-5 text-xl sm:text-2xl font-bold leading-snug text-balance"
                style={{ fontFamily: QUICKSAND, color: t.text.primary }}
              >
                {d.highlight}
              </h3>
              <p
                className="relative z-10 mt-3 text-sm leading-relaxed text-pretty"
                style={{ fontFamily: LATO, color: t.text.secondary }}
              >
                {d.desc}
              </p>

              <div className="relative z-10 mt-5">
                <div
                  className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em]"
                  style={{ fontFamily: LATO, color: t.text.secondary }}
                >
                  {d.tagsLabel}
                </div>
                <ul className="flex flex-wrap justify-center gap-2">
                  {d.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        fontFamily: LATO,
                        color: d.color,
                        background: `${d.color}${dark ? "12" : "14"}`,
                        border: `1px solid ${d.color}30`,
                      }}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-auto pt-6">
                <div
                  className="flex items-center justify-center gap-2 border-t pt-4 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                  style={{ fontFamily: QUICKSAND, color: d.color, borderColor: t.border }}
                >
                  {d.cta} <ArrowRightIcon />
                </div>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
