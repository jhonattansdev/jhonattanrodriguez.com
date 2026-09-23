// ─── CTA LINKS ────────────────────────────────────────────────────────────────
// Centralizado para facilitar edicion

export const SOCIAL_PROFILES = {
  github: {
    url: "https://github.com/jhonattansdev",
    label: "@jhonattansdev",
  },
  /** Reservado para la futura sección de coach; hoy solo aparece en el footer. */
  instagram: {
    url: "https://www.instagram.com/jhonattansrodriguez/",
    label: "@jhonattansrodriguez",
  },
  linkedin: {
    url: "https://www.linkedin.com/in/jhonattansrodriguez/",
    label: "jhonattansrodriguez",
  },
  youtube: {
    url: "https://www.youtube.com/@jhonattansfilm",
    label: "jhonattansfilm",
  },
} as const;

export const ROUTE_HERO_SOCIAL = {
  "developer-ai": SOCIAL_PROFILES.github,
  growth: SOCIAL_PROFILES.linkedin,
  filmmaker: SOCIAL_PROFILES.youtube,
} as const;

export const CTA_LINKS = {
  whatsapp: "https://wa.me/573045818587",
  /** Sesión de reconocimiento Growth Hack */
  calendar:
    "https://calendly.com/jhonattanrodriguez/sesion-de-reconocimiento-growth-hack",
  githubProfile: SOCIAL_PROFILES.github.url,
  filmmakerYoutube: SOCIAL_PROFILES.youtube.url,
  filmPortfolioPlaylist: "https://youtube.com/playlist?list=PLB42Yo8sidtE&si=3Sygk1Cn0HwCyMH_",
};

export const WHATSAPP_MESSAGES = {
  general: "?text=Hola%20Jhonattan%2C%20me%20gustaría%20conversar%20contigo.",
  growth: "?text=Hola%20Jhonattan%2C%20me%20interesa%20saber%20más%20sobre%20tus%20servicios%20de%20Growth.",
  filmmaker: "?text=Hola%20Jhonattan%2C%20me%20interesa%20saber%20más%20sobre%20producción%20de%20video.",
  builder: "?text=Hola%20Jhonattan%2C%20tengo%20un%20proyecto%20de%20Developer%20AI%20y%20sistemas%20integrados%20con%20IA%20que%20me%20gustaría%20discutir.",
};

export function getWhatsAppLink(context: keyof typeof WHATSAPP_MESSAGES = "general") {
  return CTA_LINKS.whatsapp + WHATSAPP_MESSAGES[context];
}

export function getCalendarLink() {
  return CTA_LINKS.calendar;
}

export function getGitHubProfileLink() {
  return CTA_LINKS.githubProfile;
}

export function getGitHubLabel() {
  return SOCIAL_PROFILES.github.label;
}

export function getInstagramLink() {
  return SOCIAL_PROFILES.instagram.url;
}

export function getInstagramLabel() {
  return SOCIAL_PROFILES.instagram.label;
}

export function getLinkedInLink() {
  return SOCIAL_PROFILES.linkedin.url;
}

export function getLinkedInLabel() {
  return SOCIAL_PROFILES.linkedin.label;
}

export function getYouTubeLink() {
  return SOCIAL_PROFILES.youtube.url;
}

export function getYouTubeLabel() {
  return SOCIAL_PROFILES.youtube.label;
}

export function getFilmmakerYouTubeLink() {
  return getYouTubeLink();
}

export function getFilmPortfolioPlaylistLink() {
  return CTA_LINKS.filmPortfolioPlaylist;
}
