export type HistoriaTimelineItem = {
  year: string;
  color: string;
  title: string;
  desc: string;
  expanded: string;
  /** Miniatura 16:9 recomendada 1280×720; archivos en `public/mi-historia/`. */
  expandedMedia?: { src: string; alt: string; fit?: "cover" | "contain" };
};

// Timeline: orden cronológico (year, title, desc = párrafo 1, expanded = párrafo 2)
export const HISTORIA_TIMELINE: HistoriaTimelineItem[] = [
  {
    year: "2013",
    color: "#a78bfa",
    title: "Ingeniería de Control & Automatizaciones | Universidad Nacional",
    desc: "El paso por la carrera de ingeniería de control en la UNAL de Medellín aunque algo corto me dejó integrada la semilla de la investigación y desarrollo de productos.",
    expanded:
      "Aunque se podría decir que es un poco tarde para retomar este proceso, actualmente, en el primer semestre de 2026, me encuentro en gestión de reingreso para terminar lo que inicié.",
    expandedMedia: {
      src: "/mi-historia/unal-ingenieria-control.png",
      alt: "Logo oficial de la Universidad Nacional de Colombia",
      fit: "contain",
    },
  },
  {
    year: "2015 – 2018",
    color: "#93c5fd",
    title: "Profesional en Deportes | Politécnico JIC",
    desc: "A nivel deportivo, el Politécnico JIC es top 3 en Colombia, razón por la cual escogí esta institución para buscar el sueño de convertirme en entrenador de fútbol. En esta época de mi vida, era mi mayor obsesión.",
    expanded:
      "En los siete semestres, la carga académica en materias como fisiología, kinesiología, bioquímica, biología y anatomía me permitió entender el cuerpo humano como un sistema perfecto e integrado, donde cada acción o inacción genera un resultado.",
    expandedMedia: {
      src: "/mi-historia/jic-profesional-deportes.png",
      alt: "Politécnico Colombiano Jaime Isaza Cadavid: escudo institucional y escena en gimnasio con compañeros de formación en deportes",
    },
  },
  {
    year: "2017 – 2019",
    color: "#86efac",
    title: "Personal Trainer & primer MVP HealthTech con InteGrow",
    desc: "Este camino inició al ingresar en paralelo a un diplomado como Personal Trainer con Group Fit y culminó con el lanzamiento de InteGrow en Expofitness 2019. Contábamos con marketing, pero aún no con un producto testeable de la idea.",
    expanded:
      "El Action Fitness fue el lugar que me permitió, a los 23 años, ser entrenador personalizado y vivir una de las etapas con mayor propósito en mi vida. Conectar con los usuarios y mejorar su calidad de vida era apasionante. Buscando innovar y tener más alcance, al observar la poca guía con la que llegan los usuarios al gimnasio que no tienen la capacidad de pagar un entrenador personalizado, surge la idea de InteGrow: el primer intento de app que tenía el objetivo de ser el entrenador personalizado y nutricionista de los usuarios comunes en el gimnasio. Con el apoyo del profesor del diplomado y organizador del congreso internacional de Expofitness en 2019, logramos tener stand de lanzamiento, un momento tan dulce como amargo en mi historia de vida.",
    expandedMedia: {
      src: "/mi-historia/personal-trainer-integrow-collage.png",
      alt: "Collage de la etapa como entrenador personalizado: Group Fit, material promocional, gimnasio Action Fitness y equipo en evento InteGrow",
      fit: "contain",
    },
  },
  {
    year: "2019 – 2025",
    color: "#fdba74",
    title: "InteGrowHome | Ecosistema Startup, Growth Hacker & Filmmaker",
    desc: "InteGrowHome fue mi campo de ingreso y entrenamiento en el ecosistema startup y empresarial. Durante más de 5 años, tanto el sector tech como el inmobiliario intentaron sacarme en muchas ocasiones: equipos que se desbarataban a raíz de mi inexperiencia como CEO y líder, tiempos complejos en los cierres y problemas de flujo de caja. Todo esto hace parte de lo que nadie te habla sobre el mundo real de emprender en el ecosistema colombiano, pero que forma a un ser humano capaz de resistir cualquier adversidad y continuar adelante",
    expanded:
      "Desde los inicios, e inspirado por la película Steve Jobs (2013), busqué que InteGrowHome fuera una empresa de base tecnológica (PropTech), trabajando con 3 equipos diferentes de desarrolladores en Colombia y Ecuador durante ese periodo de tiempo. Además, formé en paralelo mi perfil como Growth Hacker y Filmmaker, al observar la importancia de estos roles en el mundo moderno de las empresas de base tecnológica.",
    expandedMedia: {
      src: "/mi-historia/integrowhome-collage.png",
      alt: "InteGrowHome: app PWA y web, logo, alianzas (iNNpulsa, Apps.co, Ruta N, Alcaldía de Medellín, CCB y otras), equipo y diagrama de arquitectura del ecosistema PropTech",
      fit: "contain",
    },
  },
  {
    year: "2025 – 2026",
    color: "#93c5fd",
    title: "Developer AI | Soberanía en la creación de productos",
    desc: "No es la trayectoria de un desarrollador tradicional que se centra exclusivamente en lo técnico. Creo que los productos deben representar el lenguaje y el propósito de las marcas, además de ser fáciles de usar e implementar. Con Cursor, Claude Code, Lovable/v0, Supabase y Vercel comprendí que un operador único, con las herramientas correctas, puede orquestar todas las piezas del rompecabezas en tiempo récord, haciendo el software más accesible y escalable.",
    expanded:
      "Después de trabajar con varios equipos de desarrollo y observar lo complejo que era sacar un producto con los sistemas tradicionales, principalmente por el tiempo y los salarios de los ingenieros o programadores, al ver la integración de la IA en el código de programación con herramientas como Lovable y Cursor en 2025 entendí que era mi oportunidad de implementar todo lo aprendido empíricamente con los equipos de desarrollo de InteGrowHome y alcanzar lo que denomino como soberanía en la creación de productos tecnológicos. Al fin y al cabo, con todos los equipos mi rol era crear la arquitectura de la solución y, después de hacerlo durante más de 5 años, todo tomó sentido.",
    expandedMedia: {
      src: "/mi-historia/ai-builder-lab10.png",
      alt: "LAB 10, comunidad de AI builders en Latinoamérica: logos de Vercel, Supabase, Lovable, GitHub, Cursor y Claude; foto de encuentro comunitario y branding LAB 10",
      fit: "contain",
    },
  },
  {
    year: "2026",
    color: "#a78bfa",
    title: "Murphyia.com | Conectar los puntos",
    desc: "Tras observar de primera mano el problema de trazabilidad que enfrentan los pacientes con enfermedades crónicas a través de mi abuela, decidí construir una solución para ayudarle con el seguimiento de su diabetes tipo 2. Con esta idea me presenté a un hackathon y, junto a un equipo conformado en diciembre de 2025, logramos ganarlo, dando inicio en febrero de 2026 a Murphyia.com como empresa de base tecnológica, con la que aspiro a convertirnos en la mano derecha del sector salud en Colombia y Latinoamérica.",
    expanded:
      "Murphyia.com es el ecosistema donde pacientes, cuidadores y médicos recuperan el control y el seguimiento de la diabetes tipo 2, la hipertensión y las enfermedades osteomusculares relacionadas con la obesidad, el sedentarismo y el estrés. No llegué aquí por accidente. Cada paso construyó el conocimiento, la experiencia y el sistema que hoy utilizo para ayudar a otros y aportar mi grano de arena para que el mundo sea un lugar mejor.",
    expandedMedia: {
      src: "/mi-historia/murphyia-collage.png",
      alt: "Murphyia.com: equipo con premio del hackathon 24H, participación en StartCo y stand de salud digital Murphy con murphyia.com",
      fit: "contain",
    },
  },
];
