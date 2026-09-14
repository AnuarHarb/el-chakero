export const NOMBRE = "El Chakero";

export const DOMINIO = "elchakero.com";

export const CANAL_WHATSAPP =
  process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL ??
  "https://whatsapp.com/channel/0029Vb8FvlmLI8YeFZWwIs23";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:43173";

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
    slug: "quien-financia",
    titulo: "Quién financia El Chakero",
    ruta: "/quien-financia/",
  },
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
