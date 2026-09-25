import { Clapperboard, Monitor } from "lucide-react";
import { ChessIcon } from "@/components/nav/chess-icon";
import { BUILDER_PROJECTS, FILM_PLANS } from "@/lib/design-tokens";
import { GROWTH_OFFERINGS, GROWTH_OFFERING_ORDER } from "@/lib/growth-data";
import type { NavIconComponent } from "@/lib/nav-items";

export type HomeDiscipline = {
  id: "developer" | "growth" | "filmmaker";
  label: string;
  href: string;
  color: string;
  Icon: NavIconComponent;
  /** Comprador al que va dirigida la disciplina. */
  audience: string;
  /** Cifra o promesa clave, en grande. */
  highlight: string;
  desc: string;
  tagsLabel: string;
  tags: string[];
  cta: string;
};

// Proyectos de /developer-ai que se destacan en la tarjeta (título tal cual está en `BUILDER_PROJECTS`).
const DEV_FEATURED_PROJECTS = ["Diabetes Manager | MurphyIA", "Portal Gladwell", "CIB 360 Place"];

/** Disciplinas de Home: las usan los roles del Hero (etiqueta, color y ruta) y la sección "Lo que hago". */
export function getHomeDisciplines(dark: boolean): HomeDiscipline[] {
  return [
    {
      id: "developer",
      label: "Developer AI",
      href: "/developer-ai",
      color: dark ? "#93c5fd" : "#2563eb",
      Icon: Monitor,
      audience: "Para empresarios y equipos fundadores",
      highlight: "Un MVP funcional en un mes",
      desc: "Un sistema a la medida que optimiza tus procesos y trabaja con tus datos, en lugar de seguir pagando software ajeno.",
      tagsLabel: "Proyectos",
      tags: DEV_FEATURED_PROJECTS.filter((title) => BUILDER_PROJECTS.some((p) => p.title === title)).map(
        (title) => title.split(" | ")[0],
      ),
      cta: "Ver proyectos",
    },
    {
      id: "growth",
      label: "Growth Hacker",
      href: "/growth",
      color: dark ? "#86efac" : "#16a34a",
      Icon: ChessIcon,
      audience: "Para profesionales independientes",
      highlight: "Monetiza tus redes con procesos",
      desc: "Te entreno en los principios de las redes, en pauta y en procesos estratégicos, para escalar hasta poder contratar un equipo y delegar.",
      tagsLabel: "Ofertas",
      tags: GROWTH_OFFERING_ORDER.map((id) => GROWTH_OFFERINGS[id].tabTitle),
      cta: "Ver ofertas",
    },
    {
      id: "filmmaker",
      label: "Filmmaker",
      href: "/filmmaker",
      color: dark ? "#fdba74" : "#ea580c",
      Icon: Clapperboard,
      audience: "Para marcas, comunidades y empresas",
      highlight: "8 a 12 videos al mes",
      desc: "Producción pensada para pauta: tu presupuesto de campaña llega a personas realmente interesadas en tu producto o servicio.",
      tagsLabel: "Planes",
      tags: FILM_PLANS.map((plan) => plan.name),
      cta: "Ver planes",
    },
  ];
}
