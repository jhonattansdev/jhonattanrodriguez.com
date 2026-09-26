import type { Metadata } from "next";

/** Host canónico: el apex (jhonattanrodriguez.com) redirige aquí. */
export const SITE_URL = "https://www.jhonattanrodriguez.com";
export const SITE_NAME = "Jhonattan Rodriguez";

/** Imágenes de `public/og/<slug>.jpg`, 1200×630 (proporción de tarjeta grande de WhatsApp y redes). */
export type ShareImageSlug = "home" | "growth" | "developer-ai" | "filmmaker";

const SHARE_IMAGE_SIZE = { width: 1200, height: 630 } as const;

/**
 * Se añade como `?v=` a la URL de la imagen. Subirlo al cambiar un `.jpg` de `public/og/`:
 * WhatsApp, Facebook y X guardan la imagen por URL y, sin esto, siguen mostrando la anterior.
 */
const SHARE_IMAGE_VERSION = 2;

type ShareMetadataInput = {
  /** Ruta de la página, p. ej. `/growth`. Se resuelve contra `metadataBase`. */
  path: string;
  slug: ShareImageSlug;
  title: string;
  /** Descripción corta para la tarjeta que se ve al compartir el enlace. */
  description: string;
  /** Texto alternativo de la imagen. */
  alt: string;
};

/**
 * `openGraph`, `twitter` y `canonical` de una ruta. Cada layout debe pasar por aquí:
 * en Next, el `openGraph` de un segmento hijo reemplaza al del padre completo (no se
 * fusiona), así que sin esto una ruta perdería la imagen, la URL y el nombre del sitio.
 */
export function shareMetadata({
  path,
  slug,
  title,
  description,
  alt,
}: ShareMetadataInput): Pick<Metadata, "openGraph" | "twitter" | "alternates"> {
  const image = { url: `/og/${slug}.jpg?v=${SHARE_IMAGE_VERSION}`, ...SHARE_IMAGE_SIZE, alt };
  return {
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "es_CO",
      images: [{ ...image, type: "image/jpeg" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: { canonical: path },
  };
}
