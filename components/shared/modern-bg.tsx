"use client";

interface ModernBgProps {
  accentColor: string;
  secondaryColor?: string;
  dark: boolean;
  className?: string;
}

/**
 * ModernBg - Clean gradient background inspired by Nicepay/Apple design
 * Uses soft gradients and floating orbs for a modern, premium feel
 */
export function ModernBg({ accentColor, secondaryColor, dark, className = "" }: ModernBgProps) {
  const secondary = secondaryColor || accentColor;

  if (dark) {
    // Dark mode: subtle radial glows with depth
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {/* Base subtle gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 100% 80% at 50% -20%, ${accentColor}10 0%, transparent 60%)`,
          }}
        />
        
        {/* Primary glow - top area */}
        <div
          className="absolute -top-[30%] left-1/2 -translate-x-full w-[120%] h-[80%] rounded-full"
          style={{
            background: `radial-gradient(ellipse, ${accentColor}12 0%, transparent 60%)`,
          }}
        />
        
        {/* Secondary glow - bottom corner. El alto es un % de TODA la página (en las largas es una caja muy
            alta): `closest-side` apaga el degradé antes del borde más cercano; con el radio por defecto
            (esquina lejana) se cortaba en seco y se veía como un rectángulo claro al costado. */}
        <div
          className="absolute -bottom-[20%] -right-[20%] w-[60%] h-[60%] rounded-full"
          style={{
            background: `radial-gradient(circle closest-side, ${secondary}08 0%, transparent 100%)`,
          }}
        />
      </div>
    );
  }

  // Light mode: clean, soft gradients (Nicepay style)
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Primary soft gradient wash - top */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 60% at 50% -10%, ${accentColor}18 0%, transparent 50%),
            radial-gradient(ellipse 80% 50% at 100% 0%, ${accentColor}12 0%, transparent 40%),
            radial-gradient(ellipse 60% 40% at 0% 80%, ${secondary}08 0%, transparent 40%)
          `,
        }}
      />
      
      {/* Floating orb - right side */}
      <div
        className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full"
        style={{
          background: `radial-gradient(circle, ${accentColor}15 0%, transparent 60%)`,
        }}
      />
      
      {/* Floating orb - bottom left */}
      <div
        className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full"
        style={{
          background: `radial-gradient(circle, ${secondary}12 0%, transparent 60%)`,
        }}
      />
      
      {/* Subtle bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30%]"
        style={{
          background: `linear-gradient(to top, ${accentColor}05, transparent)`,
        }}
      />
    </div>
  );
}
