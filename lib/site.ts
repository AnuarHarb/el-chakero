export const NOMBRE = "El Chakero";

export const DOMINIO = "elchakero.com";

export const CANAL_WHATSAPP =
  process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL ??
  "https://whatsapp.com/channel/0029Vb8FvlmLI8YeFZWwIs23";

export const CORREO_NOTICIAS = "noticias@elchakero.com";

/** Llamado del pregón, en palenquero. El resto de la pieza va en español. */
export const LLAMADO_PREGON = "Kuchá, Ma Gende Ri Palenge";

function urlSitioAbsoluta(valor: string | undefined, respaldo: string): string {
  const crudo = valor?.trim();
  if (!crudo) return respaldo;

  for (const candidato of [crudo, `https://${crudo}`]) {
    try {
      const url = new URL(candidato);
      if (url.protocol === "http:" || url.protocol === "https:") {
        return url.origin;
      }
    } catch {
      // hostname sin protocolo, o valor que no es URL
    }
  }

  return respaldo;
}

function respaldoUrlSitio(): string {
  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();
  if (vercel) {
    return urlSitioAbsoluta(vercel, `https://${DOMINIO}`);
  }
  return "http://127.0.0.1:43173";
}

// `metadataBase` exige una URL absoluta. En Vercel, NEXT_PUBLIC_SITE_URL
// a veces llega vacío o como `elchakero.com` (sin https) y `new URL()` tumba el build.
export const SITE_URL = urlSitioAbsoluta(
  process.env.NEXT_PUBLIC_SITE_URL,
  respaldoUrlSitio(),
);

export const SECCIONES = [
  { slug: "comunidad", etiqueta: "Comunidad" },
  { slug: "educacion", etiqueta: "Educación" },
  { slug: "cultura", etiqueta: "Cultura" },
  { slug: "territorio", etiqueta: "Territorio" },
  { slug: "gente", etiqueta: "Gente" },
] as const;

export type SlugSeccion = (typeof SECCIONES)[number]["slug"];

export const PAGINAS_FIJAS = [
  { slug: "quienes-somos", titulo: "Quiénes somos", ruta: "/quienes-somos/" },
  {
    slug: "como-funcionan-las-noticias",
    titulo: "Cómo funcionan las noticias",
    ruta: "/como-funcionan-las-noticias/",
  },
  {
    slug: "envia-tu-noticia",
    titulo: "Envía tu noticia",
    ruta: "/envia-tu-noticia/",
  },
  { slug: "contacto", titulo: "Contacto", ruta: "/contacto/" },
  {
    slug: "datos-y-privacidad",
    titulo: "Datos y privacidad",
    ruta: "/datos-y-privacidad/",
  },
] as const;

export const RUTAS_ADMIN = [
  { href: "/admin/", etiqueta: "Inicio" },
  { href: "/admin/aportes/", etiqueta: "Aportes" },
  { href: "/admin/piezas/", etiqueta: "Piezas" },
  { href: "/admin/revision/", etiqueta: "Revisión" },
  { href: "/admin/publicar/", etiqueta: "Publicar" },
  { href: "/admin/agenda/", etiqueta: "Agenda" },
  { href: "/admin/boletin/", etiqueta: "Boletín" },
  { href: "/admin/equipo/", etiqueta: "Equipo" },
  { href: "/admin/consejo/", etiqueta: "Consejo" },
] as const;

export function esSeccion(valor: string): valor is SlugSeccion {
  return SECCIONES.some((seccion) => seccion.slug === valor);
}
