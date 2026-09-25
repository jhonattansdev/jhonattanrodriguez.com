export type GrowthSession = {
  num: number;
  title: string;
  duration: string;
  desc: string;
  reto: string | null;
};

export type GrowthBrandPillar = {
  num: number;
  title: string;
  items: string[];
};

export type GrowthMentoriaStep = {
  step: number;
  title: string;
  intro?: string;
  body?: string;
  blockquote?: string;
  pillars?: GrowthBrandPillar[];
};

export type GrowthIncludePanel = "circulo" | "pilares" | "text";

export type GrowthInclude = {
  title: string;
  desc: string;
  panel?: GrowthIncludePanel;
};

export type GrowthPresenciaTab = "linkedin" | "instagram";

export type GrowthOfferingId = "metaads" | "presencia-rrss" | "control-marca-rrss";

export type GrowthKickerVariant = "emphasis" | "standard";

export type GrowthOfferingMeta = {
  id: GrowthOfferingId;
  kicker: string;
  kickerVariant: GrowthKickerVariant;
  title: string;
  intro: string;
  priceCop: string;
  duration: string;
  priceNote?: string;
  calendarLabel?: string;
  priceSize?: "lg" | "md";
  /** Nombre corto para la mini-card del selector. */
  tabTitle: string;
  /** Datos clave en una línea para la mini-card (sesiones · duración). */
  tabFacts: string;
};

export type GrowthInnerExpanded = Partial<Record<GrowthOfferingId, number | null>>;

/**
 * Orden del selector de /growth (máximo 7 servicios). Para sumar uno: agregar
 * su id a `GrowthOfferingId`, su entrada en `GROWTH_OFFERINGS`, su componente
 * en `lib/growth-offering-content.tsx` y su id aquí.
 */
export const GROWTH_OFFERING_ORDER: GrowthOfferingId[] = [
  "metaads",
  "presencia-rrss",
  "control-marca-rrss",
];

export const GROWTH_METAADS = {
  kicker: "MENTORIA 1:1",
  title: "Entrenamiento Meta Ads",
  intro:
    "La mayoría de founders le tienen miedo a Meta Ads porque nunca nadie se los explicó bien. En 3 sesiones pasas de no saber dónde hacer clic a tener tu primera campaña activa, con una estrategia de contenido basada en lo que ya está funcionando en tu industria.",
  priceCop: "$400.000 COP",
  duration: "3 sesiones / 3.5h en total",
  priceNote: "Refuerzo mensual: $200.000 COP",
} as const;

export const GROWTH_METAADS_SESSIONS: GrowthSession[] = [
  {
    num: 1,
    title: "Domina el territorio",
    duration: "60 min",
    desc: "Recorrido completo por el administrador de anuncios: dónde está todo, qué significa cada cosa y cómo funciona. Exploramos juntos la biblioteca de anuncios de tu competencia y salimos con una guía clara de lo que es posible hacer con la herramienta.",
    reto: "Construir una lista de 10 ideas de contenido ganadoras basadas en lo que ya está funcionando en tu industria.",
  },
  {
    num: 2,
    title: "Contenido con objetivo",
    duration: "60 min",
    desc: "Aprendemos las categorías de contenido que existen en Meta y cómo conectar cada una con los objetivos reales del administrador de anuncios. Ejercicio 100% práctico trabajando directamente con las 10 ideas del reto.",
    reto: "Tener listo el contenido de la primera campaña para subir en vivo.",
  },
  {
    num: 3,
    title: "Primera campaña en vivo",
    duration: "90 min",
    desc: "Subimos la campaña juntos, en tiempo real. Configuramos cada parámetro, revisamos la segmentación, validamos el presupuesto y la dejamos activa. Sales con tu primera campaña corriendo y sabiendo exactamente qué mirar en los próximos días.",
    reto: null,
  },
];

export const GROWTH_METAADS_RESULTADO =
  "Primera campaña activa configurada por ti. Guía de referencia de la herramienta, mapa de contenidos de tu industria y criterio propio para seguir creciendo sin depender de nadie.";

export const GROWTH_PRESENCIA_RRSS = {
  kicker: "MENTORIA 1:1",
  title: "Entrenamiento y optimización de marca personal en redes sociales",
  intro:
    "Tener un perfil no es tener presencia. En 4 sesiones transformamos tu cuenta desde cero: estrategia, optimización completa y tu primer contenido publicado. Sin acciones sin sentido, sin tiempo perdido. Pensado para founders y perfiles personales en 1:1. Si lo que necesitas es el sistema completo de marca + operación de RRSS para tu equipo, está en «Control de la marca + Sistema de administración de Redes Sociales».",
  priceCop: "$600.000 COP",
  duration: "Sprint 15 días / 4 sesiones de 1h",
  calendarLabel: "Agendar entrenamiento",
} as const;

export const GROWTH_PRESENCIA_INSTAGRAM_SESSIONS: GrowthSession[] = [
  {
    num: 1,
    title: "Optimización inmediata del perfil",
    duration: "60 min",
    desc: "Sin perder tiempo en teoría, entramos directo al perfil. Optimizamos foto, nombre de usuario, nombre visible y biografía en vivo. Desde la primera sesión el perfil ya se ve diferente: los cambios son visibles el mismo día.",
    reto: "Definir la estética visual del perfil y preparar las primeras ideas de contenido.",
  },
  {
    num: 2,
    title: "Estrategia de contenido por formato",
    duration: "60 min",
    desc: "Aprendemos los tres formatos clave de Instagram y el objetivo de cada uno: Reels para alcance, carruseles para valor y retención, imagen o foto sola para comunidad e identidad. Cada formato tiene una intención: aquí aprendes a usarlos con estrategia.",
    reto: "Crear tu propio contenido aplicando el formato y objetivo trabajado en sesión.",
  },
  {
    num: 3,
    title: "Profundización en estrategia",
    duration: "60 min",
    desc: "Revisamos el contenido creado, identificamos qué está funcionando y profundizamos en cómo combinar los formatos para construir una presencia consistente. La sesión es práctica: trabajamos sobre tu contenido real.",
    reto: "Crear más contenido propio para llegar a la sesión final con material listo para publicar.",
  },
  {
    num: 4,
    title: "Puesta a punto y O.O.D.A. Loop",
    duration: "60 min",
    desc: "Publicamos las 9 piezas que conforman la puesta a punto del perfil, el punto de partida visual y estratégico de tu cuenta. Luego aplicamos el O.O.D.A. Loop: observamos resultados, orientamos la estrategia, decidimos qué ajustar y actuamos. Sales con un perfil activo y un plan para seguir solo.",
    reto: null,
  },
];

export const GROWTH_PRESENCIA_LINKEDIN_SESSIONS: GrowthSession[] = [
  {
    num: 1,
    title: "Introducción a LinkedIn y QA del perfil",
    duration: "60 min",
    desc: "Trabajamos la cultura de LinkedIn para que entiendas si tu perfil tiene sentido en esta red y qué rol debe cumplir. Analizamos juntos tu perfil actual, identificamos los pilares que hay que optimizar y definimos el norte antes de tocar nada.",
    reto: "Conseguir las fotografías profesionales y definir la imagen de portada.",
  },
  {
    num: 2,
    title: "Optimización práctica del perfil",
    duration: "60 min",
    desc: "Con las fotos listas, optimizamos en vivo: foto de perfil, portada, titular, sección «Acerca de» y experiencia. Cada campo con intención: no solo información, sino posicionamiento.",
    reto: "Completar y optimizar todas las experiencias del perfil con el criterio trabajado en sesión.",
  },
  {
    num: 3,
    title: "Tipos de publicaciones y primer post",
    duration: "60 min",
    desc: "Analizamos los formatos de contenido que generan mayor alcance y tendencia en LinkedIn. Para hacerlo práctico, creamos y publicamos el primer post juntos, con estructura, gancho y llamado a la acción.",
    reto: "Publicar de forma consistente aplicando los formatos aprendidos antes de la sesión de seguimiento.",
  },
  {
    num: 4,
    title: "Seguimiento O.O.D.A. Loop",
    duration: "60 min",
    desc: "Observamos los primeros resultados, orientamos la estrategia según lo que está funcionando, decidimos qué ajustar y actuamos. Saldrás con un plan claro para seguir creciendo solo.",
    reto: null,
  },
];

export const GROWTH_PRESENCIA_INSTAGRAM_RESULTADO =
  "Perfil de Instagram completamente optimizado con 9 publicaciones de puesta a punto, estrategia de contenido clara por formato y criterio propio para crecer sin depender de nadie.";

export const GROWTH_PRESENCIA_LINKEDIN_RESULTADO =
  "Perfil de LinkedIn completamente optimizado, primer contenido publicado y un sistema de seguimiento para seguir creciendo con criterio, sin depender de nadie.";

export const GROWTH_BRAND_PILLARS: GrowthBrandPillar[] = [
  {
    num: 1,
    title: "Personalidad de la marca",
    items: ["Arquetipo", "Misión", "Visión", "Valores", "PTM", "Colores", "Tipografía"],
  },
  {
    num: 2,
    title: "Identidad verbal",
    items: ["Naming", "Tagline", "Voz", "Tono", "Relato", "Canales", "Tipos de contenido"],
  },
  {
    num: 3,
    title: "Comunidad",
    items: ["Identidad", "La causa", "El gran sueño", "PUV", "Manifiesto", "Gamificación", "Referentes"],
  },
];

export const GROWTH_CONTROL_MARCA_RRSS_CIRCULO_STEP: GrowthMentoriaStep = {
  step: 1,
  title: "Círculo de Oro / Simon Sinek",
  body:
    "Antes de construir cualquier cosa, los founders necesitan ponerse de acuerdo en una sola dirección: por qué existen, cómo lo hacen y qué ofrecen. Esta es la piedra angular. Sin ella, todo lo que viene después está construido sobre arena.",
  blockquote:
    "Los líderes que inspiran no empiezan por lo que hacen. Empiezan por el por qué.",
};

export const GROWTH_CONTROL_MARCA_RRSS_PILARES_STEP: GrowthMentoriaStep = {
  step: 2,
  title: "Control de la marca / 3 pilares",
  intro:
    "Con el propósito claro, estructuramos los tres pilares que convierten tu marca en un sistema operable y delegable.",
  pillars: GROWTH_BRAND_PILLARS,
};

export const GROWTH_CONTROL_MARCA_RRSS = {
  kicker: "Consultoría técnica",
  title: "Control de la marca + Sistema de administración de Redes Sociales",
  intro:
    "Sin conceptualización de marca, el contenido no tiene norte; sin un sistema de administración de RRSS, el equipo improvisa. En un sprint de 12 sesiones unimos ambos: desde el propósito que alinea a founders y marketing hasta el microsistema en Notion para publicar, medir y mejorar sin depender de ti en cada pieza.",
  priceCop: "$2.520.000 COP",
  duration: "Sprint ~3 meses / 12 sesiones de 1h",
  priceNote: "3 cupos disponibles",
  calendarLabel: "Agendar consultoría",
} as const;

export const GROWTH_CONTROL_MARCA_RRSS_INSIGHT =
  "No es solo documentar la marca ni entregar una parrilla. Es construir la base estratégica y el sistema operativo de redes para que tu equipo ejecute con criterio, con o sin ti presente.";

export const GROWTH_CONTROL_MARCA_RRSS_INCLUDES: GrowthInclude[] = [
  {
    title: GROWTH_CONTROL_MARCA_RRSS_CIRCULO_STEP.title,
    desc: "Propósito, dirección y acuerdo entre founders antes de ejecutar en redes.",
    panel: "circulo",
  },
  {
    title: GROWTH_CONTROL_MARCA_RRSS_PILARES_STEP.title,
    desc: "Tres pilares que convierten tu marca en un sistema operable y delegable.",
    panel: "pilares",
  },
  {
    title: "Parrilla de contenido",
    desc: "Calendario editorial con objetivos, responsables y estados de publicación por canal.",
    panel: "text",
  },
  {
    title: "North Star Metrics",
    desc: "Indicadores clave por canal conectados al objetivo real del negocio.",
    panel: "text",
  },
  {
    title: "Arquitectura del guion",
    desc: "Framework Hook - Inicio - Nudo - Desenlace - CTA para producir contenido con intención.",
    panel: "text",
  },
  {
    title: "Seguimiento de canales",
    desc: "Dashboard por red social con seguidores, objetivos y fecha de actualización en tiempo real.",
    panel: "text",
  },
];

export const GROWTH_CONTROL_MARCA_RRSS_CHANNELS = ["Instagram", "LinkedIn", "TikTok", "YouTube"] as const;

export const GROWTH_CONTROL_MARCA_RRSS_ENTREGABLE =
  "Sistema completo en Notion con tu marca documentada y lista para implementar o delegar. Tu CEO, cofounders y equipo de marketing tendrán una guía sin ambigüedades sobre qué comunicar, cómo decirlo y a quién.";

export const GROWTH_CONTROL_MARCA_RRSS_RESULTADO =
  "Un equipo que no espera instrucciones para publicar. Saben qué crear, cuándo publicarlo, cómo medirlo y cómo mejorar, todo dentro de un sistema vivo en Notion que crece con ellos.";

export const GROWTH_OFFERINGS: Record<GrowthOfferingId, GrowthOfferingMeta> = {
  metaads: {
    id: "metaads",
    kicker: GROWTH_METAADS.kicker,
    kickerVariant: "emphasis",
    title: GROWTH_METAADS.title,
    intro: GROWTH_METAADS.intro,
    priceCop: GROWTH_METAADS.priceCop,
    duration: GROWTH_METAADS.duration,
    priceNote: GROWTH_METAADS.priceNote,
    priceSize: "lg",
    tabTitle: "Meta Ads",
    tabFacts: "3 sesiones · 3.5 h",
  },
  "presencia-rrss": {
    id: "presencia-rrss",
    kicker: GROWTH_PRESENCIA_RRSS.kicker,
    kickerVariant: "standard",
    title: GROWTH_PRESENCIA_RRSS.title,
    intro: GROWTH_PRESENCIA_RRSS.intro,
    priceCop: GROWTH_PRESENCIA_RRSS.priceCop,
    duration: GROWTH_PRESENCIA_RRSS.duration,
    calendarLabel: GROWTH_PRESENCIA_RRSS.calendarLabel,
    priceSize: "md",
    tabTitle: "Marca personal",
    tabFacts: "4 sesiones · 15 días",
  },
  "control-marca-rrss": {
    id: "control-marca-rrss",
    kicker: GROWTH_CONTROL_MARCA_RRSS.kicker,
    kickerVariant: "standard",
    title: GROWTH_CONTROL_MARCA_RRSS.title,
    intro: GROWTH_CONTROL_MARCA_RRSS.intro,
    priceCop: GROWTH_CONTROL_MARCA_RRSS.priceCop,
    duration: GROWTH_CONTROL_MARCA_RRSS.duration,
    priceNote: GROWTH_CONTROL_MARCA_RRSS.priceNote,
    calendarLabel: GROWTH_CONTROL_MARCA_RRSS.calendarLabel,
    priceSize: "md",
    tabTitle: "Control de marca",
    tabFacts: "12 sesiones · ~3 meses",
  },
};

export const GROWTH_INITIAL_INNER_EXPANDED: GrowthInnerExpanded = {};

export function toggleSingleExpanded(current: number | null, index: number): number | null {
  return current === index ? null : index;
}

export function isGrowthOfferingHash(hash: string): hash is GrowthOfferingId {
  const id = hash.replace(/^#/, "");
  return (GROWTH_OFFERING_ORDER as string[]).includes(id);
}

export function parseGrowthOfferingHash(): GrowthOfferingId | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash;
  return isGrowthOfferingHash(hash) ? (hash.slice(1) as GrowthOfferingId) : null;
}

export function toggleInnerExpanded(
  current: GrowthInnerExpanded,
  offeringId: GrowthOfferingId,
  index: number
): GrowthInnerExpanded {
  return {
    ...current,
    [offeringId]: toggleSingleExpanded(current[offeringId] ?? null, index),
  };
}
