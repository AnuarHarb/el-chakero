export const SECCIONES = [
  "comunidad",
  "educacion",
  "cultura",
  "territorio",
  "gente",
] as const;

export const FORMATOS = [
  "noticia",
  "cronica",
  "perfil",
  "galeria",
  "guia",
  "pregon",
] as const;

export const ESTADOS = [
  "idea",
  "asignada",
  "borrador",
  "en_revision",
  "aprobada",
  "publicada",
  "retirada",
] as const;

export const ESTADOS_ALTA = ["idea", "borrador"] as const;

export type Seccion = (typeof SECCIONES)[number];
export type Formato = (typeof FORMATOS)[number];
export type Estado = (typeof ESTADOS)[number];
export type EstadoAlta = (typeof ESTADOS_ALTA)[number];

export const COLUMNAS_PIEZA =
  "id, slug, titulo, seccion, formato, entradilla, cuerpo, foto_url, pie_foto, audio_url, duracion, transparencia, vinculo, estado, fecha_publicacion, motivo_retiro, autor_id, asignada_a, creado_en, actualizado_en";

export type Pieza = {
  id: string;
  slug: string | null;
  titulo: string;
  seccion: Seccion;
  formato: Formato;
  entradilla: string | null;
  cuerpo: string | null;
  foto_url: string | null;
  pie_foto: string | null;
  audio_url: string | null;
  duracion: string | null;
  transparencia: string | null;
  vinculo: boolean;
  estado: Estado;
  fecha_publicacion: string | null;
  motivo_retiro: string | null;
  autor_id: string;
  asignada_a: string | null;
  creado_en: string;
  actualizado_en: string;
};

export type CamposPieza = {
  titulo?: string;
  seccion?: Seccion;
  formato?: Formato;
  entradilla?: string | null;
  cuerpo?: string | null;
  transparencia?: string | null;
  vinculo?: boolean;
  foto_url?: string | null;
  pie_foto?: string | null;
  audio_url?: string | null;
  duracion?: string | null;
  motivo_retiro?: string | null;
};
