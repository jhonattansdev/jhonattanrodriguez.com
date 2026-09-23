// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
// Modern color palette inspired by Nicepay design - each section keeps its brand color
export const THEMES = {
  index: {
    dark: { 
      bg: "#07080f", 
      accent: "#a78bfa", // Purple for home
      accentSolid: "#8b5cf6",
      secondary: "#93c5fd",
      text: { primary: "rgba(255,255,255,0.92)", secondary: "rgba(255,255,255,0.58)", muted: "rgba(255,255,255,0.32)" },
      border: "rgba(255,255,255,0.08)",
      card: "rgba(255,255,255,0.04)",
      cardHover: "rgba(255,255,255,0.07)",
    },
    light: { 
      bg: "#fafbfc", 
      accent: "#8b5cf6", // Purple for home
      accentSolid: "#7c3aed",
      secondary: "#3b82f6",
      text: { primary: "rgba(0,0,0,0.88)", secondary: "rgba(0,0,0,0.58)", muted: "rgba(0,0,0,0.38)" },
      border: "rgba(0,0,0,0.06)",
      card: "rgba(255,255,255,0.8)",
      cardHover: "rgba(255,255,255,0.95)",
    },
  },
  growth: {
    dark: { 
      bg: "#060d04", 
      accent: "#4ade80", // Green
      secondary: "#86efac",
      display: "#86efac",
      accentSolid: "#22c55e",
      text: { primary: "rgba(255,255,255,0.92)", secondary: "rgba(255,255,255,0.58)", muted: "rgba(255,255,255,0.32)" },
      border: "rgba(134,239,172,0.12)",
      card: "rgba(134,239,172,0.04)",
      cardHover: "rgba(134,239,172,0.08)",
    },
    light: { 
      bg: "#fafdfb", 
      accent: "#16a34a", // Green
      secondary: "#4ade80",
      display: "#15803d",
      accentSolid: "#15803d",
      text: { primary: "rgba(0,0,0,0.88)", secondary: "rgba(0,0,0,0.58)", muted: "rgba(0,0,0,0.38)" },
      border: "rgba(22,163,74,0.12)",
      card: "rgba(255,255,255,0.85)",
      cardHover: "rgba(255,255,255,1)",
    },
  },
  filmmaker: {
    dark: {
      bg: "#0a0704",
      accent: "#fb923c",
      secondary: "#fdba74",
      accentSolid: "#f97316",
      display: "#d4af6a",
      text: { primary: "rgba(255,255,255,0.92)", secondary: "rgba(255,255,255,0.58)", muted: "rgba(255,255,255,0.32)" },
      border: "rgba(251,146,60,0.12)",
      card: "rgba(251,146,60,0.04)",
      cardHover: "rgba(251,146,60,0.08)",
    },
    light: {
      bg: "#fffcfa",
      accent: "#ea580c",
      secondary: "#fb923c",
      accentSolid: "#c2410c",
      display: "#9a7b2e",
      text: { primary: "rgba(0,0,0,0.88)", secondary: "rgba(0,0,0,0.58)", muted: "rgba(0,0,0,0.38)" },
      border: "rgba(234,88,12,0.10)",
      card: "rgba(255,255,255,0.85)",
      cardHover: "rgba(255,255,255,1)",
    },
  },
  builder: {
    dark: { 
      bg: "#04080f", 
      accent: "#3b82f6", // Blue
      secondary: "#93c5fd",
      display: "#93c5fd",
      teal: "#34d399",
      accentSolid: "#2563eb",
      text: { primary: "rgba(255,255,255,0.92)", secondary: "rgba(255,255,255,0.58)", muted: "rgba(255,255,255,0.32)" },
      border: "rgba(59,130,246,0.12)",
      card: "rgba(59,130,246,0.04)",
      cardHover: "rgba(59,130,246,0.08)",
    },
    light: { 
      bg: "#fafbff", 
      accent: "#2563eb", // Blue
      secondary: "#60a5fa",
      display: "#1d4ed8",
      teal: "#059669",
      accentSolid: "#1d4ed8",
      text: { primary: "rgba(0,0,0,0.88)", secondary: "rgba(0,0,0,0.58)", muted: "rgba(0,0,0,0.38)" },
      border: "rgba(37,99,235,0.10)",
      card: "rgba(255,255,255,0.85)",
      cardHover: "rgba(255,255,255,1)",
    },
  },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
export const TIMELINE = [
  { year: "2015", color: "#a78bfa", title: "Ingenieria de Control, U. Nacional", desc: "El origen. La curiosidad por los sistemas y la logica que definen todo lo que vino despues." },
  { year: "2017", color: "#a78bfa", title: "Paso por el Politecnico", desc: "El quiebre que redirige el camino hacia la accion y el emprendimiento real." },
  { year: "2018", color: "#86efac", title: "Entrenador Personalizado", desc: "Primer negocio real. Sin sistemas ni metodologia, el talento solo no alcanza." },
  { year: "2019", color: "#fdba74", title: "Integrow · ExpoFitness 2019", desc: "El momento fundacional. La marca que nace de la necesidad de crecer con sistemas, no con intuicion." },
  { year: "2020+", color: "#93c5fd", title: "Growth - Filmmaker - Developer AI", desc: "Tres disciplinas que conviven y se potencian: el mismo sistema visto desde angulos distintos." },
];

// ─── FILMMAKER DATA (Real) ────────────────────────────────────────────────────
export const FILM_PORTFOLIO_INTRO = {
  kicker: "Portafolio",
  title: "Trabajo como Filmmaker",
} as const;

export const FILM_PLANS_INTRO =
  "Producción con equipo ágil especializado en video corto para redes: Reels, TikTok y YouTube Shorts.";

export const FILM_PLANS = [
  {
    id: "editor",
    name: "Plan Editor",
    tagline: "Framework propio para convertir tu material grabado en contenido de alto valor, listo para publicar.",
    price: "$100.000 COP",
    featured: false,
    production: "Entrega en 3–5 días hábiles por video",
    includes: [
      "Colorización profesional en cada video",
      "Subtítulos y música de fondo incluidos",
      "Diseño de sonido con efectos y mezcla",
      "Recortes dinámicos y superposiciones de marca",
    ],
    costPerPiece: "Envías tu material crudo junto con el guion o brief de tu marca; aplico mi framework de edición para convertirlo en contenido listo para publicar.",
    savings: "Incluye 1 ronda de ajustes por video.",
    addon: "Sin mínimo de videos: pagas $100.000 COP por cada pieza que envíes a editar.",
  },
  {
    id: "sprint",
    name: "Plan Sprint",
    tagline: "Un día. Una locación. Ocho piezas listas para publicar con equipo ágil en set.",
    price: "$1.200.000 COP",
    featured: true,
    production: "1 día de producción (6–8 horas)",
    includes: [
      "Equipo ágil en locación: rodaje y dirección para piezas cortas en redes",
      "Sesión intensiva de grabación en locación acordada",
      "Captura de material para 8 reels estratégicos",
      "Múltiples ángulos, tomas y recursos visuales",
    ],
    postproduction: [
      "Edición profesional de 8 reels en formato vertical",
      "Color grading y diseño sonoro",
      "Motion graphics, subtítulos y elementos gráficos",
      "Optimización para Instagram Reels, TikTok, YouTube Shorts",
      "Entrega en carpeta de Drive propia de la marca",
    ],
    framework: [
      { type: "Valor", count: 3, goal: "Posicionar expertise y atraer audiencia" },
      { type: "Ventas", count: 3, goal: "Convertir y generar leads calificados" },
      { type: "Blockbuster", count: 2, goal: "Destacar en calidad frente a la competencia" },
    ],
    savings: "Más del 50 % comparado con producción tradicional",
    costPerPiece: "$150.000 COP vs. $300.000–$500.000 en producción tradicional",
    addon: "Add-on opcional: sesión fotográfica, $300.000 COP",
    payment: [
      { stage: "Al confirmar", amount: "$600.000 COP", desc: "Asegura tu cupo; iniciamos pre-producción" },
      { stage: "Contra entrega", amount: "$600.000 COP", desc: "Pagas al recibir tus 8 reels listos" },
    ],
  },
  {
    id: "capcut",
    name: "Entrenamiento CapCut Pro",
    tagline: "4 sesiones 1:1 para aprender mi framework de edición en CapCut Pro y sacarle calidad profesional a tu material.",
    price: "$500.000 COP",
    featured: false,
    production: "4 sesiones 1:1 por videollamada",
    includes: [
      "Principios básicos de edición y ritmo narrativo en CapCut Pro",
      "Identificación de procesos de edición con mi framework, para contenido con calidad garantizada",
      "Análisis de tu material para definir el mínimo necesario en una producción de calidad",
      "Enfocado en que tu contenido se adelante al 90 % de la competencia en internet",
    ],
    costPerPiece: "Nos sentamos 1:1 por videollamada a analizar tu material y tu forma de grabar, identificando el mínimo necesario para que tu producción salga con calidad profesional aplicando mi framework de edición.",
    savings: "Incluye plantilla/proyecto de CapCut para que apliques el framework en tus propias ediciones.",
    addon: "Soporte por WhatsApp durante el entrenamiento. Sesión de refuerzo individual: $150.000 COP c/u.",
  },
];

export const FILM_PROCESS = [
  {
    step: "01",
    title: "Pre-producción",
    items: [
      "Briefing estratégico y definición de objetivos",
      "Desarrollo de temas y storyboards",
      "Planificación de locaciones y recursos",
      "Coordinación de talento y logística",
    ],
  },
  {
    step: "02",
    title: "Producción",
    items: [
      "Setup técnico y pruebas",
      "Grabación secuencial de todas las piezas",
      "Supervisión de calidad en tiempo real",
      "Captura de material adicional y B-roll",
    ],
  },
  {
    step: "03",
    title: "Post-producción",
    items: [
      "Selección y organización del material",
      "Edición, corrección de color y diseño sonoro",
      "Revisión interna de calidad",
      "Entrega de piezas finales",
    ],
  },
  {
    step: "04",
    title: "Entrega",
    items: [
      "Archivos optimizados en Drive",
      "Sugerencias de copy y hashtags",
      "Calendario de publicación recomendado",
      "Guía de mejores prácticas",
    ],
  },
];

export const FILM_WHY_WORKS = [
  {
    title: "Un realizador que opera como equipo",
    desc: "No hay tres personas coordinando lo que uno puede ejecutar con sistema. Menos fricciones, menos costos, misma calidad.",
  },
  {
    title: "Cada pieza tiene un trabajo que hacer",
    desc: "Antes de encender la cámara ya sabemos qué tiene que lograr cada video: atraer, nutrir o convertir. Estrategia aplicada al set.",
  },
  {
    title: "El tiempo de tu marca vale",
    desc: "Concentrar la producción en sesiones intensivas no es un truco de eficiencia: es respeto por tu tiempo y tu presupuesto.",
  },
  {
    title: "El video ya ganó",
    desc: "El 80 % del consumo de contenido en redes sociales es video. No es una tendencia: es el estándar. El formato vertical es donde se gana.",
  },
];

export const FILM_RESULTS = [
  { metric: "Autoridad" },
  { metric: "Conversión" },
  { metric: "Eficiencia" },
];

// ─── GROWTH STACK (hero) ──────────────────────────────────────────────────────
export const GROWTH_STACK = [
  "Notion",
  "Claude",
  "Meta Ads",
  "Obsidian",
  "Google Workspace",
  "Microsoft 365",
] as const;

// ─── FILM STACK (hero) ────────────────────────────────────────────────────────
export const FILM_STACK = [
  "CapCut",
  "OBS",
  "Stream Yard",
  "Higgsfield",
  "Canva",
  "Nano Banana",
] as const;

// ─── BUILDER DATA ─────────────────────────────────────────────────────────────
export const BUILDER_STACK = [
  "Claude Code",
  "Cursor",
  "Lovable/v0",
  "Supabase",
  "Vercel",
  "GitHub",
];
export type BuilderProject = {
  title: string;
  category: string;
  badge: string;
  status: "Activo" | "En construcción" | "En beta" | "Pausado";
  role: string;
  tagline: string;
  desc: string;
  problem: string;
  how: { label: string; desc: string }[];
  tech: { name: string; desc: string }[];
  stack: string[];
  result: string;
  expandedMedia?: { src: string; alt: string; width?: number; height?: number };
  ctaUrl?: string;
  ctaLabel?: string;
  closedNote?: string;
};

export const BUILDER_FILTERS = ["Todos", "Sistema IA", "Plataforma"];
export const BUILDER_PROJECTS: BuilderProject[] = [
  {
    title: "Diabetes Manager | MurphyIA",
    category: "Sistema IA",
    badge: "Agente Clínico",
    status: "Activo",
    role: "Fundador & AI Developer",
    tagline: "Convierte WhatsApp en un sistema de monitoreo clínico continuo para pacientes con diabetes tipo 2.",
    desc: "MurphyIA nació de un problema familiar real: el seguimiento de la diabetes tipo 2 de mi abuela materna, donde los 90 días entre consultas eran territorio sin datos ni control. El agente captura datos clínicos diarios por WhatsApp (glucosa, insulina, sueño, estrés, tensión arterial) y los convierte en un historial estructurado que el médico consulta en tiempo real. El paciente nunca llena un formulario: solo escribe como le escribiría a un conocido. Es el primer producto de un ecosistema de salud digital en construcción, con la misma arquitectura replicada para otras enfermedades crónicas del sector.",
    problem: "Entre una consulta médica y la siguiente hay 90 días ciegos. El paciente anota sus glucosas en un cuaderno, olvida los episodios críticos y llega a la cita sin evidencia. El médico toma decisiones con información incompleta. Los tratamientos se ajustan tarde y las hospitalizaciones evitables se acumulan.",
    how: [
      { label: "Paciente", desc: "Registra sus datos por WhatsApp escribiendo en lenguaje natural. El agente Murphy interpreta el mensaje, infiere el contexto horario, hace la pregunta correcta si falta información y confirma el dato guardado. Un sistema de XP y racha mantiene la adherencia diaria." },
      { label: "Médico", desc: "Accede a un dashboard clínico con el historial longitudinal de cada paciente asignado. Solicita reportes médicos o briefings pre-consulta generados por IA con RAG sobre los registros reales. Puede marcar pacientes como críticos para activar monitoreo intensivo y módulos adicionales." },
      { label: "Cuidador", desc: "Accede al mismo dashboard del paciente con permisos de co-gestión. Monitorea los registros del día, recibe alertas activas y actúa como puente entre la familia y el equipo médico sin necesitar que el paciente reporte directamente." },
    ],
    tech: [
      { name: "Kapso + Meta WhatsApp Business API", desc: "Proxy que recibe el webhook entrante de Meta y entrega las respuestas salientes. Es el único canal de comunicación con el paciente: todo el pipeline se activa desde aquí." },
      { name: "GPT-4o-mini (interpretación)", desc: "Una sola llamada LLM por mensaje entrante. Convierte lenguaje natural en datos clínicos estructurados. El sistema degrada de forma transparente si el modelo no responde, sin interrumpir la conversación del paciente." },
      { name: "OpenAI + Gemini (RAG clínico)", desc: "Genera reportes médicos y briefings pre-consulta recuperando los registros clínicos del paciente como contexto. El modelo se selecciona según el tipo y profundidad del documento requerido." },
      { name: "Supabase Edge Functions (Deno)", desc: "Funciones serverless independientes que orquestan el pipeline de mensajes, la generación de reportes, las invitaciones y los webhooks. Cada función aislada, sin servidor compartido." },
      { name: "Pipeline V2: arquitectura modular", desc: "Orquestador central con 6 módulos clínicos intercambiables: glucosa, insulina, sueño, estrés, tensión arterial y mareos. Cada módulo encapsula su propia lógica de detección y respuesta sin exponer implementación al orquestador." },
      { name: "PipelineTracer", desc: "Sistema de observabilidad estructurada propio. Registra cada paso del pipeline con su latencia (parseo, interpretación, selección de módulo y respuesta) para auditoría y debugging en producción." },
      { name: "Supabase PostgreSQL + RLS", desc: "Base de datos clínica con Row Level Security. Registros de glucosa, insulina, sueño, estrés, tensión arterial y mareos aislados por paciente. Flujos multi-turno con control de idempotencia. Perfiles diferenciados por rol." },
      { name: "Supabase Auth", desc: "Autenticación con 3 roles: paciente, médico y coadmin. Rutas del frontend y funciones serverless validan el rol antes de ejecutar cualquier operación clínica." },
      { name: "React 18 + TanStack Query + Recharts", desc: "SPA clínica con dashboard diferenciado por rol. Recharts visualiza tendencias de glucosa e insulina. TanStack Query maneja el estado del servidor con caché granular. Shadcn/UI como sistema de componentes base." },
      { name: "XP System (gamificación clínica)", desc: "Motor propio de puntos y racha que calcula XP según glucosas en rango, completitud diaria y datos de bienestar. Sistema de niveles progresivos diseñado para mantener la adherencia a largo plazo." },
    ],
    stack: ["WhatsApp", "Kapso", "Supabase", "Deno", "OpenAI", "Gemini", "React", "Vercel"],
    result: "Pipeline V2 en producción activa desde abril 2026 con pacientes reales. 6 módulos clínicos desplegados con flujo multi-turno, encadenamiento automático y observabilidad completa por mensaje. Integraciones activas con Meta WhatsApp Business API vía Kapso y generación de reportes médicos por IA.",
    expandedMedia: {
      src: "/images/diabetes-manager.webp",
      alt: "Diabetes Manager de MurphyIA: portada del producto con el registro diario por WhatsApp para el control de la diabetes tipo 2 y los indicadores 3M+, 90 días y 24/7",
      width: 1728,
      height: 962,
    },
    ctaUrl: "https://www.murphyia.com/diabetesmanager",
    ctaLabel: "Ver producto",
  },
  {
    title: "Jhonattanrodriguez.com",
    category: "Plataforma",
    badge: "Plataforma",
    status: "Activo",
    role: "Arquitecto + Developer único",
    tagline: "Un solo dominio que agrupa identidad, trayectoria y tres verticales de servicio.",
    desc: "Construido por necesidad: operar como profesional multidisciplinario (Developer AI, Growth y Film) sin un hub central generaba fricción en cada conversación de venta. Cada ruta tiene su propio sistema de diseño, paleta de color y propuesta de valor, pero comparten la misma arquitectura base. Una sola URL que responde '¿quién eres y qué haces?' antes de que el prospecto lo pregunte.",
    problem: "La información de referencia de un profesional multidisciplinar estaba dispersa entre perfiles, PDFs y conversaciones. Sin un hub central, cada prospecto reconstruía el contexto desde cero antes de agendar.",
    how: [
      { label: "Prospecto", desc: "Llega al home, identifica su perfil (Developer AI / Growth / Film) y navega a la vertical correspondiente con su propia paleta, copy y CTA." },
      { label: "Cliente potencial", desc: "Explora el portafolio de proyectos expandible, entiende el proceso de construcción y agenda directamente por Calendly o WhatsApp desde la misma página." },
      { label: "Contacto frío / referido", desc: "Revisa la sección de historia en el home para leer la trayectoria cronológica con hitos reales antes de tomar una decisión de contacto." },
    ],
    tech: [
      { name: "Next.js 16 App Router", desc: "Framework base. Gestiona las 4 rutas del sitio, SSR, redirects de rutas antiguas y metadatos de SEO por página." },
      { name: "@teispace/next-themes", desc: "Sistema dark/light con detección del sistema operativo. Cada vertical aplica su paleta de color en tiempo real al cambiar el tema." },
      { name: "Design tokens propios", desc: "Sistema centralizado que define la paleta visual por ruta: index (púrpura), growth (verde), filmmaker (naranja), builder (azul). Cambiar el esquema de una vertical no afecta las demás." },
      { name: "Tailwind CSS 4 + clsx", desc: "Sistema de estilos utility-first combinado con clsx y tailwind-merge para composición condicional de clases sin conflictos en los componentes compartidos." },
      { name: "Radix UI / shadcn/ui", desc: "Componentes headless accesibles (accordion, dialog, navigation-menu, etc.). Base del sistema de UI sin estilos impuestos: la identidad visual la definen los tokens." },
      { name: "Next.js Google Fonts", desc: "Carga de Quicksand (títulos), Lato (cuerpo) y Engagement (decorativo) con cero layout shift via font-display: swap y variables CSS globales." },
      { name: "Vercel Analytics", desc: "Tracking de tráfico y engagement cargado únicamente en producción. Sin configuración extra: se activa automáticamente al hacer deploy en Vercel." },
      { name: "Calendly + WhatsApp API", desc: "CTAs centralizados en un único punto de configuración. Calendly para llamadas de reconocimiento; WhatsApp con mensajes preescritos por contexto (growth, filmmaker, builder)." },
    ],
    stack: ["Next.js", "React 19", "Tailwind CSS", "shadcn/ui", "Vercel", "TypeScript"],
    result: "Sitio live con 4 rutas activas (home con historia integrada, Developer AI, Growth, Film), sistema de temas dark/light por vertical, portafolio de 6 proyectos y analytics en producción.",
    expandedMedia: {
      src: "/developer-ai/jhonattanrodriguez-hero.png",
      alt: "Vista hero de jhonattanrodriguez.com en desktop",
      width: 1920,
      height: 1080,
    },
    ctaUrl: "https://jhonattanrodriguez.com",
    ctaLabel: "Explorar el sitio",
  },
  {
    title: "Insight Hub Campaña",
    category: "Sistema IA",
    badge: "Motor RAG",
    status: "Activo",
    role: "Arquitecto + Developer full-stack",
    tagline:
      "Ingreso y administración de informes en HTML que alimentan un sistema RAG, el cual genera insights mediante la Caja Mágica.",
    desc: "Plataforma de inteligencia para equipos de campaña electoral que centraliza informes de análisis político y los hace consultables mediante lenguaje natural. El sistema indexa automáticamente cada informe publicado y responde preguntas con contexto extraído de los documentos reales.",
    problem: "Los equipos de campaña producen decenas de informes semanales que nadie tiene tiempo de leer completos. La inteligencia queda atrapada en archivos, y tomar decisiones rápidas requiere buscar manualmente entre cientos de páginas.",
    how: [
      { label: "Super Admin", desc: "Gestiona usuarios, permisos y el estado de indexación del sistema. Puede forzar reindexaciones, monitorear errores del pipeline RAG y ejecutar backfills manuales sobre informes fallidos." },
      { label: "Informador", desc: "Redacta y publica informes de campaña desde el editor interno. Al publicar, el sistema indexa el contenido automáticamente al motor RAG sin ningún paso adicional." },
      { label: "Campaña", desc: "Consulta informes en lenguaje natural desde la Caja Mágica. Recibe respuestas tipo briefing estratégico con datos citados por código de informe, sin acceso a edición ni administración." },
    ],
    tech: [
      { name: "Claude Sonnet 4.6 (via Vercel AI Gateway)", desc: "Genera las respuestas finales en modo analista político: prosa directa, datos citados por fuente, sin inventar información fuera de los fragmentos recuperados." },
      { name: "OpenAI text-embedding-3-small (via Vercel AI Gateway)", desc: "Convierte cada chunk de informe y cada consulta del usuario en vectores de 1536 dimensiones para la búsqueda semántica." },
      { name: "Vercel AI Gateway", desc: "Proxy unificado para todos los modelos de IA. Permite cambiar de proveedor sin modificar el código del producto." },
      { name: "Supabase + pgvector", desc: "Almacena los chunks con sus embeddings y ejecuta la búsqueda vectorial por similitud coseno. RLS protege los datos por rol de usuario." },
      { name: "pg_net + pg_cron", desc: "pg_net dispara la indexación desde un trigger SQL al publicar un informe. pg_cron corre cada 5 minutos como safety net para reintentar fallos sin intervención manual." },
      { name: "Deno Edge Functions (Supabase)", desc: "Tres funciones serverless que orquestan la consulta RAG, la indexación unitaria de informes y la reindexación masiva del corpus cuando es necesario." },
      { name: "Búsqueda híbrida FTS + Vector", desc: "Fusiona full-text search (40%) con búsqueda vectorial semántica (60%) usando un algoritmo de ranking propio, lo que garantiza resultados incluso cuando la consulta no coincide lexicalmente." },
      { name: "React + Vite + Tailwind + shadcn/ui", desc: "Frontend SPA con rutas protegidas por rol. Incluye editor de informes enriquecido, dashboard de actividad, panel de administración y la interfaz de la Caja Mágica." },
      { name: "Lovable", desc: "Generación del frontend inicial: estructura de componentes, rutas, autenticación base y diseño del sistema de vistas." },
      { name: "Cursor", desc: "Edición, refactoring y toda la implementación del sistema RAG, auto-indexado y edge functions sobre la base generada por Lovable." },
      { name: "Vercel", desc: "Despliegue y hosting del frontend. CI/CD automático desde GitHub en cada push a main." },
      { name: "GoDaddy", desc: "Gestión del dominio personalizado conectado al despliegue de Vercel." },
    ],
    stack: ["Claude", "OpenAI", "Supabase", "pgvector", "AI Gateway", "Deno", "React", "Lovable", "Cursor", "Vercel"],
    result: "Más de 500 informes indexados y consultables en producción. La Caja Mágica transformó el flujo del equipo: de búsqueda manual entre PDFs a consultas en lenguaje natural con respuesta en segundos. Centralizar los informes, antes distribuidos como archivos HTML, aumentó la seguridad del contenido e integró al equipo editorial en un solo flujo de publicación. Pipeline RAG operativo con búsqueda híbrida y fallback inteligente.",
    expandedMedia: {
      src: "/images/insight-hub.webp",
      alt: "Insight Hub Campaña: vista de Interacción con el asistente para consultar informes, historial de conversaciones y preguntas sugeridas",
      width: 1728,
      height: 995,
    },
    closedNote:
      "Proyecto cerrado por seguridad; no puedo dar acceso a la ubicación de la plataforma.",
  },
  {
    title: "Portal Gladwell",
    category: "Plataforma",
    badge: "Plataforma Web",
    status: "Activo",
    role: "CTO & Full-Stack Developer",
    tagline:
      "Convierte una landing de captación en el sistema operativo de una comunidad de estrategas: CRM, sesiones con entregables generados por IA y calendario de contenido, con permisos por persona.",
    desc: "El Portal Gladwell nació de un problema operativo real: los interesados en pertenecer a la comunidad que llegaban por la landing quedaban en una base de datos sin seguimiento, y cada sesión de Terapia Organizacional terminaba en un entregable que había que redactar, revisar y hacer llegar uno por uno. Construí una plataforma interna autenticada donde cada rol interno de la comunidad ve solo lo que le corresponde: CRM de leads, dos programas de sesiones (Terapia Organizacional y Gladwell Education) con entregables en PDF generados con IA, registro de asistencia por QR y una parrilla de contenido para redes. Crece por módulos: cada nueva capacidad se habilita persona por persona, lo cual nos permite trabajar de forma coordinada y colaborativa. Al ser una app web, todos los integrantes pueden instalarla en sus distintos dispositivos y acceder con un solo clic.",
    problem: "Una comunidad que crece necesita procesos, no herramientas sueltas. Los leads de la landing no tenían flujo de seguimiento ni delegación. Las sesiones con invitados generan audio, fotos y notas que se convertían en un entregable manual, lento y difícil de estandarizar. Y al abrir el acceso a más gente del equipo aparece el reto de fondo: cada quien debe ver y hacer solo lo que le toca, protegiendo los datos personales de asistentes e invitados.",
    how: [
      { label: "Visitante", desc: "Deja sus datos en la Walking List (WhatsApp validado en formato internacional). El lead entra al CRM." },
      { label: "Super administrador", desc: "Ve todo el CRM, delega leads y crea cuentas. Decide, persona por persona, qué módulos habilita, y puede designar coadministradores en una sesión puntual." },
      { label: "Administrador de comunidad", desc: "Trabaja solo los módulos habilitados. Da seguimiento a sus leads, captura los insumos de una sesión (audio, fotos, notas), genera el entregable con IA, lo revisa y lo aprueba antes de enviarlo." },
      { label: "Asistente", desc: "Registra su asistencia escaneando un QR y recibe el entregable por correo." },
    ],
    tech: [
      { name: "Next.js 16 + React 19 (App Router)", desc: "Una sola app con landing pública, autenticación y portal. Los Server Components autorizan antes de renderizar y 40 rutas de API encapsulan las operaciones sensibles." },
      { name: "Supabase (Postgres + Auth + Storage)", desc: "Base relacional, acceso por invitación (correo, enlace mágico o Google), almacenamiento de fotos, audios y avatares, y migraciones SQL versionadas." },
      { name: "Autorización por rol + módulos por persona", desc: "Tres roles base y cinco módulos que el super administrador otorga individualmente. Los permisos se resuelven en el servidor en cada ruta; la interfaz se adapta, pero nunca es la única barrera." },
      { name: "Privacidad por diseño", desc: "Los datos personales y el contenido sensible se eliminan en el servidor antes de viajar al navegador cuando quien consulta no tiene permiso. Ocultarlos en la interfaz no basta: un dato enviado al cliente es un dato expuesto." },
      { name: "OpenAI (Whisper + GPT-4o) y ffmpeg", desc: "ffmpeg segmenta los audios largos, Whisper los transcribe y GPT-4o, con salida JSON forzada, estructura hallazgos y recomendaciones. La IA propone, la persona revisa y decide." },
      { name: "PDF con @react-pdf/renderer + pdf-lib", desc: "Entregables con identidad de marca renderizados en el servidor, con vista previa antes de enviar." },
      { name: "Resend + QR", desc: "Envío del entregable a cada asistente con estado por destinatario (enviado/error) y reenvío de pendientes; asistencia por enlaces con token de vigencia limitada." },
      { name: "Tailwind CSS 4 + Radix/shadcn", desc: "Sistema de diseño propio con criterios de Apple HIG (áreas táctiles de 44 px, jerarquía clara de acciones), responsive en móvil, tablet y escritorio, e instalable como app web en iPad/iPhone." },
      { name: "Zod + TypeScript", desc: "Validación en cada frontera (formularios y API) y tipado de punta a punta." },
      { name: "Vercel + GitHub Actions", desc: "Despliegue automático en cada push a main, con lint y build en CI." },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "OpenAI", "Vercel"],
    result: "Landing pública en producción desde mayo de 2026 y portal interno en operación. Opera con dos programas de sesiones, CRM con delegación de leads, calendario comunitario de sesiones y parrilla de contenido, sobre 3 roles y 5 módulos habilitables por persona. Cada versión pasa por una revisión de QA de seguridad y experiencia (móvil, tablet y escritorio) que ha detectado y cerrado brechas de autorización y ajustes de usabilidad.",
    expandedMedia: {
      src: "/images/gladwell-portal.webp",
      alt: "Portal Gladwell: vista de Entregables con los programas Terapia Organizacional y Gladwell Education y el calendario comunitario de sesiones",
      width: 1728,
      height: 996,
    },
    ctaUrl: "https://www.gladwellgroup.co",
    ctaLabel: "Ver producto",
  },
  {
    title: "CIB 360 Place",
    category: "Plataforma",
    badge: "Plataforma Web",
    status: "Activo",
    role: "CTO & Full-Stack Developer",
    tagline:
      "Convierte los cuadernos de las porterías del Centro Internacional de Bogotá en un sistema vivo: inventario de edificios con fotos reales, publicación de inmuebles con moderación y contacto verificado, con permisos por perfil.",
    desc: "CIB 360 Place nació de un problema operativo real: en el Centro Internacional de Bogotá, lo que está disponible vive en cuadernos y carteleras de portería, edificio por edificio y casi siempre desactualizado. Encontrar un inmueble significaba caminar el sector, llamar a propiedades que ya no estaban disponibles y descifrar hojas escritas a mano. Construí una plataforma web donde cada perfil ve solo lo que le corresponde: los visitantes exploran edificios y propiedades con fotografías reales, los propietarios publican su inmueble, los administradores reemplazan su cuaderno por un panel propio y un super administrador modera y opera todo el sistema. Al ser una app web instalable, se abre por enlace o por códigos QR ubicados en el sector, así que quien camina el CIB consulta todo desde su celular. Hoy cubre propiedades y edificios, y crece por capas hacia comercios y lugares emblemáticos del sector.",
    problem: "Un sector con miles de apartamentos necesita información en tiempo real, no carpetas. Los interesados perdían horas en recorridos y en llamadas a inmuebles que ya no estaban disponibles, los propietarios dependían de una hoja pegada en una cartelera para ser encontrados y los administradores mantenían a mano datos que nadie podía consultar. Y al abrir el contacto de los propietarios aparece el reto de fondo: conectar a ambas partes con información confiable sin exponer datos personales a correos falsos, spam o curiosos.",
    how: [
      { label: "Visitante", desc: "Explora edificios y propiedades sin crear cuenta, llegando por enlace o por QR. Para ver el teléfono de un propietario verifica su correo con un código de un solo uso; basta hacerlo una vez por navegador." },
      { label: "Propietario", desc: "Publica su inmueble en venta, arriendo o amoblado desde un formulario con fotos. La publicación queda en revisión y recibe correos con el estado de su solicitud." },
      { label: "Administrador de edificio", desc: "Reemplaza el cuaderno de portería por un panel propio: mantiene la ficha de su edificio, ve quién se interesó en sus inmuebles y consulta la tendencia de contactos." },
      { label: "Super administrador", desc: "Modera cada publicación antes de que salga al público, gestiona edificios y cuentas de administradores, audita la bitácora de correos enviados y da seguimiento al inventario con un CRM propio." },
    ],
    tech: [
      { name: "React 18 + TypeScript + Vite", desc: "Aplicación tipada de punta a punta, con caché de datos en el cliente y rutas separadas para el sitio público y los paneles de cada perfil." },
      { name: "Supabase (Postgres + Storage)", desc: "Base relacional con 61 migraciones SQL versionadas, almacenamiento de fotos con transformación de imágenes para que carguen livianas en el celular y funciones de servidor para lo sensible." },
      { name: "Seguridad a nivel de fila (RLS)", desc: "Cada tabla define en la base de datos quién puede leer y escribir: el público solo puede proponer inmuebles, que quedan en revisión, y un administrador solo modifica su propio edificio. La interfaz oculta lo que no corresponde, pero la barrera real vive en el servidor." },
      { name: "Privacidad por diseño", desc: "Los contactos internos se protegen con permisos por columna en Postgres, no solo ocultándolos en pantalla. El teléfono de un propietario solo se muestra tras verificar un correo real con un código de un solo uso, con vencimiento y límites contra abuso, y se bloquean los correos desechables." },
      { name: "Edge Functions (Deno) + Resend", desc: "Lo que requiere privilegios corre en el servidor: verificación de códigos, alta de administradores y avisos al propietario, más una tarea programada que limpia imágenes huérfanas. Cada correo queda en una bitácora con su estado de envío." },
      { name: "PWA + códigos QR", desc: "Instalable como app en el celular y accesible desde códigos QR en el sector, con caché de imágenes y datos para que navegar sea fluido." },
      { name: "Tailwind CSS + shadcn/ui (Radix)", desc: "Sistema de diseño propio, con modo claro y oscuro y responsive en móvil, tablet y escritorio." },
      { name: "Zod + React Hook Form", desc: "Validación en cada frontera de datos, en los formularios de publicación y de contacto." },
      { name: "Vercel", desc: "Despliegue automático en cada push a la rama principal." },
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "PostgreSQL", "Resend", "Vercel"],
    result: "Plataforma en producción, con el inventario de 19 edificios del sector mapeado con fotografías reales, cuatro perfiles de usuario y paneles de administración para edificios y para la operación. Las versiones pasan por revisiones de QA de seguridad y experiencia (móvil, tablet y escritorio) que han detectado y cerrado brechas de autorización y ajustes de usabilidad. Hoy cubre propiedades y edificios, y la hoja de ruta apunta a integrar comercios y lugares emblemáticos para que toda la información del CIB viva en un solo lugar.",
    expandedMedia: {
      src: "/images/cib-360-place.webp",
      alt: "CIB 360 Place: portada del sitio con el mensaje sobre seguridad y confianza para hacer negocios en el Centro Internacional de Bogotá, accesos para publicar un inmueble y ver edificios, e indicadores del sector",
      width: 1728,
      height: 963,
    },
    ctaUrl: "https://centrointernacionaldebogota.com",
    ctaLabel: "Ver producto",
  },
  {
    title: "CoachManager | MurphyIA",
    category: "Plataforma",
    badge: "CRM de Coaching",
    status: "En beta",
    role: "Fundador & AI Developer",
    tagline:
      "Convierte el chat de WhatsApp de un entrenador en un panel que muestra qué atleta necesita atención hoy, con sueño, entrenamiento y composición corporal leídos por IA desde capturas.",
    desc: "CoachManager nació de mi propio piloto: como entrenador certificado, seguía a mis atletas por WhatsApp haciendo yo mismo de sistema. Audios, capturas y fotos de comida se perdían en el chat y ninguna tendencia quedaba a la vista. Construí una plataforma donde cada rol ve solo lo que le corresponde: el atleta registra su día en una sola pantalla y el entrenador lee un panel que ordena su cartera por atención requerida. Las capturas de sueño, entrenamiento y bioimpedancia se leen con IA y quien las sube solo confirma; las fotos de comida quedan en un repositorio que entrenador y atleta revisan juntos cada semana. Opera la Metodología Murphy de recomposición corporal, con un programa de 3 meses y cuatro palancas (sueño, proteína, balance calórico y entrenamiento), y vive en su propio espacio dentro de MurphyIA, con roles, tablas e identidad visual independientes de Diabetes Manager.",
    problem: "Un entrenador que sigue a sus atletas por WhatsApp termina siendo el sistema: recibe audios, capturas y fotos, y a los pocos días nada es comparable. Reportar cada dato se siente como molestar, así que el atleta deja de enviar. El sueño, que pesa en la recomposición, casi nunca entra en la planificación, y ajustar una rutina sin datos es adivinar. Y aparece el reto de fondo: leer capturas de apps de terceros con IA sin que un error del modelo llegue en silencio al historial de una persona.",
    how: [
      { label: "Atleta", desc: "Registra su día en una sola pantalla: sube la captura del reloj para el sueño y la de la app de entreno, anota la proteína y fotografía sus comidas. La IA lee las capturas y él confirma antes de guardar. Consulta su programa, sus rutinas con la demostración de cada ejercicio y su progreso." },
      { label: "Entrenador", desc: "Ve su cartera ordenada por atención requerida y entra al detalle de cada atleta: define el objetivo del programa, las metas diarias y las rutinas desde un banco de ejercicios con imagen o GIF. Agenda las sesiones presenciales, marca la asistencia y deja retroalimentación diaria." },
      { label: "Atleta nuevo", desc: "Entra solo por invitación del entrenador, con un código. El rol y el vínculo con su entrenador los define la invitación, nunca el cliente. No existe registro abierto." },
    ],
    tech: [
      { name: "React 18 + TypeScript + Vite", desc: "SPA con su propio shell, rutas y contexto de sesión bajo /coachmanager, aislados del auth de Diabetes Manager. Solo modo oscuro, con identidad de gimnasio propia (Anton + Inter) y manifest independiente para instalarla como app en el celular." },
      { name: "GPT-4o-mini con visión", desc: "Tres Edge Functions leen capturas de sueño, sesiones de entreno y bioimpedancia (imagen o PDF) y devuelven JSON. Son extracción pura: no tocan la base de datos y el modelo solo propone; el dato se guarda después de que una persona lo revisa y confirma." },
      { name: "Cliente LLM agnóstico de proveedor", desc: "Una capa única enruta cada llamada a AI Gateway, Anthropic u OpenAI según la variable de entorno disponible, con un modelo distinto para extracción, conversación y visión. Cambiar de proveedor no requiere tocar código." },
      { name: "Supabase (Postgres + Auth + Storage)", desc: "28 tablas con prefijo coach_manager_ y 42 migraciones SQL versionadas. Las fotos de comida, la bioimpedancia y la media de ejercicios viven en buckets de Storage con políticas por rol." },
      { name: "Roles independientes + RLS", desc: "Coach, atleta y admin viven en una tabla de roles propia, separada de la de Diabetes Manager, para que una misma cuenta pueda existir en ambos productos. Cada tabla define en la base de datos quién puede leer y escribir, y las funciones de autorización resuelven quién eres por el perfil que existe, no por una etiqueta." },
      { name: "Onboarding por invitación", desc: "Una Edge Function emite las invitaciones y una RPC las redime. El rol y el vínculo con el entrenador los decide la invitación en la base de datos, nunca el cliente. Los correos salen por Resend." },
      { name: "Score de adherencia con razones", desc: "Funciones puras, sin red, puntúan a cada atleta por señales (sin registro, inactividad, entrenos, proteína, calorías, sueño) y devuelven el motivo, no solo el número. El entrenador ve por qué alguien está en alerta y a quién atender primero." },
      { name: "Presupuesto calórico anclado a la bioimpedancia", desc: "El presupuesto diario parte del BMR de la última medición y suma las calorías quemadas registradas ese día, en vez de una meta genérica." },
      { name: "Rutinas flexibles y banco de ejercicios", desc: "Rutinas por día con excepciones y reemplazos puntuales, importación por CSV y un banco de 146 ejercicios con imagen o GIF. El reordenamiento y la importación corren como RPC en la base de datos." },
      { name: "Modo privacidad para demostraciones", desc: "Un interruptor enmascara los nombres de los atletas en pantalla, activo por defecto y sin persistir, para mostrar la plataforma a terceros sin exponer a nadie. Es enmascarado de interfaz: la autorización real sigue en la base de datos." },
      { name: "Vercel", desc: "Frontend desplegado en Vercel con rewrite de SPA." },
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "PostgreSQL", "OpenAI", "Deno", "Vercel"],
    result: "Piloto en producción con 1 entrenador y 6 atletas registrados. Acumula 37 sesiones programadas, 47 registros de entrenamiento, 42 de sueño, 166 fotos de comida y 5 mediciones de bioimpedancia, sobre un banco de 146 ejercicios. La plataforma corre sobre 28 tablas, 42 migraciones SQL y 4 Edge Functions, con auth, roles y datos aislados de Diabetes Manager. Las últimas iteraciones sumaron una tabla de atletas por palanca y un calendario agregado de sesiones.",
    expandedMedia: {
      src: "/images/coach-manager.webp",
      alt: "CoachManager: ficha de un atleta con composición corporal (peso, grasa, masa muscular y metabolismo basal) y calendario de sesiones de septiembre de 2026",
      width: 1728,
      height: 962,
    },
    ctaUrl: "https://www.murphyia.com/coachmanager",
    ctaLabel: "Ver producto",
  },
];
