type OrbProps = {
  className: string;
  color: string;
  opacity: number;
};

/** Un orbe: resplandor difuminado + anillo (circunferencia) encima, como el `__glow`/`__ring` de `CmOrbField`. */
function Orb({ className, color, opacity }: OrbProps) {
  return (
    <div className={`absolute rounded-full ${className}`}>
      <div
        className="absolute inset-0 rounded-full blur-[90px]"
        style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, opacity }}
      />
      <div
        className="absolute inset-0 rounded-full blur-[1px]"
        style={{
          background: `conic-gradient(from 0deg, ${color}, transparent 35%, transparent 55%, ${color}, transparent 85%)`,
          mask: "radial-gradient(circle, transparent 61%, black 63%, black 67%, transparent 69%)",
          WebkitMask: "radial-gradient(circle, transparent 61%, black 63%, black 67%, transparent 69%)",
          opacity: Math.min(opacity + 0.35, 1),
        }}
      />
    </div>
  );
}

/**
 * Fondo de círculos violeta difuminados del panel interno, inspirado en
 * `CmOrbField` de Coach Manager (MurphyIA) — versión simplificada a 2 capas
 * por orbe (resplandor + anillo) en vez de las 4 del original (fill/ring/
 * glow/highlight). `fixed`: se monta una vez en el layout y queda detrás de
 * todas las páginas del panel sin repintarse al navegar.
 */
export function AdminOrbField() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <Orb
        className="-top-[10%] -left-[15%] w-[55vw] h-[55vw] max-w-[640px] max-h-[640px]"
        color="var(--cm-violet-500)"
        opacity={0.22}
      />
      <Orb
        className="top-[5%] -right-[12%] w-[40vw] h-[40vw] max-w-[480px] max-h-[480px]"
        color="var(--cm-violet-400)"
        opacity={0.18}
      />
      <Orb
        className="bottom-[8%] -left-[10%] w-[36vw] h-[36vw] max-w-[420px] max-h-[420px]"
        color="var(--cm-violet-600)"
        opacity={0.2}
      />
      <Orb
        className="-bottom-[12%] -right-[10%] w-[48vw] h-[48vw] max-w-[560px] max-h-[560px]"
        color="var(--cm-violet-500)"
        opacity={0.2}
      />
    </div>
  );
}
