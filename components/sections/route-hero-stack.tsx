import { Reveal } from "@/components/shared/reveal";
import { TypedText } from "@/components/shared/typed-text";

type RouteHeroStackTheme = {
  card: string;
  border: string;
  accent: string;
  textSecondary: string;
};

type RouteHeroStackProps = {
  stackLabel: string;
  items: readonly string[];
  theme: RouteHeroStackTheme;
  dark: boolean;
};

/** Último escalón de la entrada del héroe (chip, kicker, título, párrafo, CTAs). */
const STACK_DELAY_MS = 450;

export function RouteHeroStack({ stackLabel, items, theme, dark }: RouteHeroStackProps) {
  const labelStyle = {
    color: dark ? "rgba(255,255,255,0.86)" : theme.textSecondary,
    background: dark ? `${theme.accent}22` : `${theme.accent}10`,
    border: `1px solid ${theme.border}`,
  };

  return (
    <div className="mt-8">
      <span className="inline-block text-sm font-mono mb-4 px-3 py-1.5 rounded-lg" style={labelStyle}>
        <TypedText text={stackLabel} delay={STACK_DELAY_MS} />
      </span>
      <Reveal
        stagger
        delay={STACK_DELAY_MS}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 justify-items-stretch"
      >
        {items.map((name) => (
          <div
            key={name}
            className="p-4 text-center rounded-2xl transition-all duration-200 hover:scale-105"
            style={{ background: theme.card, border: `1px solid ${theme.border}` }}
          >
            <div className="text-xs font-mono line-clamp-2" style={{ color: theme.accent }}>
              {name}
            </div>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
