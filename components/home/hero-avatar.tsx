import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";

type HeroAvatarProps = {
  dark: boolean;
  accent: string;
  secondary: string;
};

/**
 * Foto de perfil circular (formato redes) sobre un aro de vidrio, con el mismo
 * tratamiento del botón primario de `GlowButton`: relleno translúcido en
 * degradé, borde luminoso, resplandor de acento e inset de luz superior. El
 * `Reveal` va en el mismo elemento que lleva el `backdrop-filter`, nunca como
 * ancestro. Es estático a propósito (sin pulso ni `will-change`).
 */
export function HeroAvatar({ dark, accent, secondary }: HeroAvatarProps) {
  return (
    <Reveal
      className="relative mx-auto mb-6 size-32 rounded-full p-2 backdrop-blur-md md:size-36"
      style={{
        background: dark
          ? `linear-gradient(135deg, ${accent}20 0%, ${secondary}15 100%)`
          : `linear-gradient(135deg, ${accent}26 0%, ${secondary}1f 100%)`,
        boxShadow: dark
          ? `0 0 20px ${accent}30, 0 0 40px ${secondary}20, inset 0 1px 0 rgba(255,255,255,0.1)`
          : `0 4px 20px ${accent}40, 0 2px 8px ${accent}30`,
      }}
    >
      {/* Borde luminoso en degradé (mismo recurso de máscara que GlowButton) */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-full ${dark ? "opacity-60 blur-[1px]" : "opacity-40"}`}
        style={{
          background: `linear-gradient(135deg, ${accent}, ${secondary})`,
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <Image
        src="/images/perfil-home.webp"
        alt="Retrato de Jhonattan Rodriguez"
        width={512}
        height={512}
        sizes="(min-width: 768px) 128px, 112px"
        priority
        className={`relative block size-full rounded-full object-cover ring-1 ${dark ? "ring-white/15" : "ring-black/10"}`}
      />
    </Reveal>
  );
}
