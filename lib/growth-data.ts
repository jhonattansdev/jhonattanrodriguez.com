export type GrowthSession = {
  num: number;
  title: string;
  duration: string;
  desc: string;
  reto: string | null;
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
  /** Mismo plan en dólares, para quienes pagan desde Estados Unidos u otro país. */
  priceUsd: string;
  /** Valor por sesión (COP y USD), para comparar entre planes sin leer el intro completo. */
  perSessionCop: string;
  perSessionUsd: string;
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
  // Título e intro cubren los dos enfoques del selector de abajo (ver
  // growth-plan-inicial-offering-content.tsx): si quedaran fijos en "Meta
  // Ads", contradirían el contenido cuando se elige "Marca Personal".
  title: "Entrenamiento Meta Ads o Marca Personal",
  intro:
    "La mayoría de founders le tienen miedo a arrancar, sea en Meta Ads o en su marca personal, porque nunca nadie se los explicó bien. Elige tu enfoque arriba y, sesión a sesión, pasas de no saber por dónde empezar a tener resultados activos: tu primera campaña corriendo o tu perfil completamente optimizado. Cada sesión te cuesta $49,67 USD ($160.000 COP).",
  priceCop: "$480.000 COP",
  priceUsd: "$149 USD",
  perSessionCop: "$160.000 COP",
  perSessionUsd: "$49,67 USD",
  duration: "2 semanas de acompañamiento / 3 sesiones",
  calendarLabel: "Agendar entrenamiento",
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
  title: "Entrenamiento Meta Ads + Marca Personal en Instagram",
  intro:
    "Pauta y presencia a la vez, enfocado en Meta: en 6 sesiones montas tu primera campaña de Meta Ads (Facebook e Instagram) y, en paralelo, llevas tu perfil de Instagram de cero a publicando con estrategia. Cada sesión te cuesta $33,17 USD ($107.000 COP).",
  priceCop: "$640.000 COP",
  priceUsd: "$199 USD",
  perSessionCop: "$107.000 COP",
  perSessionUsd: "$33,17 USD",
  duration: "3 semanas de acompañamiento / 6 sesiones",
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

/**
 * Plan "Meta Ads + Marca Personal en Instagram": currícula propia de 6
 * sesiones, en este orden: primero se deja el perfil de Instagram listo
 * (1-2, mismo texto que las dos primeras de `GROWTH_PRESENCIA_INSTAGRAM_SESSIONS`),
 * luego se monta y lanza la campaña de Meta Ads (3-5) y se cierra con una
 * revisión conjunta de los dos frentes (6). Sin LinkedIn: este plan es
 * exclusivamente Meta (Facebook + Instagram); quien priorice LinkedIn va al
 * plan "Meta Ads o Marca Personal". Las sesiones 3, 4 y 6 son redacción
 * nueva (no existía contenido previo con ese enfoque, ya revisada).
 */
export const GROWTH_METAADS_PRESENCIA_SESSIONS: GrowthSession[] = [
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
    title: "Optimización Meta Ads (Portafolio comercial)",
    duration: "60 min",
    desc: "Configuramos y dejamos optimizado tu Portafolio comercial de Meta: la base técnica de la cuenta publicitaria para que la pauta corra sin tropiezos cuando lancemos la campaña.",
    reto: "Dejar el Portafolio comercial listo para pautar: cuenta publicitaria activa y accesos en orden.",
  },
  {
    num: 4,
    title: "Conceptualización de piezas de contenido",
    duration: "60 min",
    desc: "Definimos el concepto de las piezas que va a necesitar tu campaña: qué categorías de contenido existen en Meta y cómo conectar cada una con el objetivo real de la campaña, antes de producir nada.",
    reto: "Tener listo el concepto y el contenido de la campaña para subir en vivo.",
  },
  {
    num: 5,
    title: "Lanzamiento de campaña",
    duration: "90 min",
    desc: "Subimos la campaña juntos, en tiempo real. Configuramos cada parámetro, revisamos la segmentación, validamos el presupuesto y la dejamos activa. Sales con tu primera campaña corriendo y sabiendo exactamente qué mirar en los próximos días.",
    reto: null,
  },
  {
    num: 6,
    title: "O.O.D.A. Loop",
    duration: "60 min",
    desc: "Con la campaña corriendo y el perfil publicando, aplicamos el O.O.D.A. Loop a los dos frentes: observamos resultados, orientamos la estrategia, decidimos qué ajustar y actuamos. Sales con un plan claro para seguir creciendo solo, en pauta y en Instagram.",
    reto: null,
  },
];

export const GROWTH_METAADS_PRESENCIA_RESULTADO =
  "Primera campaña de Meta Ads activa (Facebook e Instagram), tu Portafolio comercial listo para pautar y tu perfil de Instagram optimizado y publicando con estrategia. Dos frentes funcionando a la vez: la pauta que lleva tráfico y el perfil que lo convierte, con criterio propio para seguir creciendo sin depender de nadie.";

export const GROWTH_CONTROL_MARCA_RRSS = {
  kicker: "MENTORIA 1:1",
  title: "Meta Ads + Marca Personal, y tu sistema de atracción de clientes",
  intro:
    "Todo lo de «Meta Ads + Marca Personal en Instagram», más 6 sesiones abiertas para construir, a la medida de tu marca, el sistema de atracción de clientes que tu negocio necesita. No es una currícula fija: cada sesión se define contigo según tu perfil y tu momento de negocio. Cada sesión te cuesta $24,92 USD ($80.000 COP).",
  priceCop: "$960.000 COP",
  priceUsd: "$299 USD",
  perSessionCop: "$80.000 COP",
  perSessionUsd: "$24,92 USD",
  duration: "6 semanas de acompañamiento / 12 sesiones",
  priceNote: "3 cupos disponibles",
  calendarLabel: "Agendar consultoría",
} as const;

/**
 * Plan profesional: las 6 sesiones de `GROWTH_METAADS_PRESENCIA_SESSIONS`
 * (idénticas, 1-6) más 6 sesiones abiertas (7-12). A propósito sin nombre de
 * metodología, sin desc específico y sin reto: es trabajo libre, que se
 * define con cada cliente según su marca y su momento de negocio, no una
 * currícula fija.
 */
const GROWTH_PLAN_PROFESIONAL_OPEN_SESSION = {
  title: "Sesión abierta",
  duration: "60 min",
  desc: "Sesión de trabajo libre: el contenido se define contigo, a la medida de tu marca y tu momento de negocio.",
  reto: null,
} as const;

export const GROWTH_PLAN_PROFESIONAL_SESSIONS: GrowthSession[] = [
  ...GROWTH_METAADS_PRESENCIA_SESSIONS,
  ...Array.from({ length: 6 }, (_, i) => ({ num: 7 + i, ...GROWTH_PLAN_PROFESIONAL_OPEN_SESSION })),
];

export const GROWTH_PLAN_PROFESIONAL_RESULTADO =
  "Primera campaña de Meta Ads activa (Facebook e Instagram), tu perfil de Instagram optimizado y publicando, y 6 sesiones de trabajo abierto para construir, a la medida de tu marca, el sistema de atracción de clientes que tu negocio necesita.";

export const GROWTH_OFFERINGS: Record<GrowthOfferingId, GrowthOfferingMeta> = {
  metaads: {
    id: "metaads",
    kicker: GROWTH_METAADS.kicker,
    kickerVariant: "emphasis",
    title: GROWTH_METAADS.title,
    intro: GROWTH_METAADS.intro,
    priceCop: GROWTH_METAADS.priceCop,
    priceUsd: GROWTH_METAADS.priceUsd,
    perSessionCop: GROWTH_METAADS.perSessionCop,
    perSessionUsd: GROWTH_METAADS.perSessionUsd,
    duration: GROWTH_METAADS.duration,
    calendarLabel: GROWTH_METAADS.calendarLabel,
    priceSize: "lg",
    //   (espacio sin ruptura) fuerza el salto de línea después de "Meta
    // Ads" en vez de después de "Marca": no reemplazar por espacios normales.
    tabTitle: "Meta Ads o Marca Personal",
    tabFacts: "3 sesiones · 2 semanas",
  },
  "presencia-rrss": {
    id: "presencia-rrss",
    kicker: GROWTH_PRESENCIA_RRSS.kicker,
    kickerVariant: "standard",
    title: GROWTH_PRESENCIA_RRSS.title,
    intro: GROWTH_PRESENCIA_RRSS.intro,
    priceCop: GROWTH_PRESENCIA_RRSS.priceCop,
    priceUsd: GROWTH_PRESENCIA_RRSS.priceUsd,
    perSessionCop: GROWTH_PRESENCIA_RRSS.perSessionCop,
    perSessionUsd: GROWTH_PRESENCIA_RRSS.perSessionUsd,
    duration: GROWTH_PRESENCIA_RRSS.duration,
    calendarLabel: GROWTH_PRESENCIA_RRSS.calendarLabel,
    priceSize: "md",
    // Mismo truco del espacio sin ruptura que en "metaads": el salto va
    // después de "Meta Ads".
    tabTitle: "Meta Ads + Marca Personal",
    tabFacts: "6 sesiones · 3 semanas",
  },
  "control-marca-rrss": {
    id: "control-marca-rrss",
    kicker: GROWTH_CONTROL_MARCA_RRSS.kicker,
    kickerVariant: "standard",
    title: GROWTH_CONTROL_MARCA_RRSS.title,
    intro: GROWTH_CONTROL_MARCA_RRSS.intro,
    priceCop: GROWTH_CONTROL_MARCA_RRSS.priceCop,
    priceUsd: GROWTH_CONTROL_MARCA_RRSS.priceUsd,
    perSessionCop: GROWTH_CONTROL_MARCA_RRSS.perSessionCop,
    perSessionUsd: GROWTH_CONTROL_MARCA_RRSS.perSessionUsd,
    duration: GROWTH_CONTROL_MARCA_RRSS.duration,
    priceNote: GROWTH_CONTROL_MARCA_RRSS.priceNote,
    calendarLabel: GROWTH_CONTROL_MARCA_RRSS.calendarLabel,
    priceSize: "md",
    tabTitle: "Profesional en plataformas",
    tabFacts: "12 sesiones · 6 semanas",
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
