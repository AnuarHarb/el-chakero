export type Rol =
  | "lector"
  | "corresponsal"
  | "reporteria"
  | "edicion"
  | "direccion"
  | "comunidad"
  | "tesoreria"
  | "consejo"
  | "infra";

export type EstadoPieza =
  | "idea"
  | "asignada"
  | "borrador"
  | "en_revision"
  | "aprobada"
  | "publicada"
  | "retirada";

export type Seccion =
  | "comunidad"
  | "educacion"
  | "cultura"
  | "territorio"
  | "gente";

export type Formato =
  | "noticia"
  | "cronica"
  | "perfil"
  | "galeria"
  | "guia"
  | "pregon";

export type Perfil = {
  id: string;
  nombre: string;
  rol: Rol;
  vinculos: string | null;
  creado_en: string;
};

export type FuentePublica = {
  texto: string;
  url: string;
};

export type PiezaPublica = {
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
  fecha_publicacion: string | null;
  estado: EstadoPieza;
  motivo_retiro: string | null;
  autor: { nombre: string } | null;
  /** Solo semilla en código. La tabla `piezas` no tiene estas columnas. */
  fuentes?: FuentePublica[] | null;
  cita?: { texto: string; fuente?: string } | null;
  semilla?: boolean;
};

export type EventoAgenda = {
  id: string;
  fecha: string;
  hora: string | null;
  que: string;
  donde: string | null;
  convoca: string | null;
};

export const ETIQUETA_ROL: Record<Rol, string> = {
  lector: "Lector",
  corresponsal: "Corresponsal",
  reporteria: "Reportería",
  edicion: "Edición",
  direccion: "Dirección",
  comunidad: "Comunidad",
  tesoreria: "Tesorería",
  consejo: "Consejo",
  infra: "Infra",
};

export const ETIQUETA_ESTADO: Record<EstadoPieza, string> = {
  idea: "Idea",
  asignada: "Asignada",
  borrador: "Borrador",
  en_revision: "En revisión",
  aprobada: "Aprobada",
  publicada: "Publicada",
  retirada: "Retirada",
};

export const ETIQUETA_FORMATO: Record<Formato, string> = {
  noticia: "Noticia",
  cronica: "Crónica",
  perfil: "Perfil",
  galeria: "Galería",
  guia: "Guía",
  pregon: "Pregón",
};

export const FORMATOS_FORMULARIO = [
  "noticia",
  "cronica",
  "perfil",
  "guia",
  "pregon",
] as const satisfies readonly Formato[];

export type Pieza = {
  id: string;
  titulo: string;
  seccion: Seccion;
  formato: Formato;
  entradilla: string | null;
  cuerpo: string | null;
  foto_url: string | null;
  pie_foto: string | null;
  audio_url: string | null;
  duracion: string | null;
  autor_id: string;
  estado: EstadoPieza;
  vinculo: boolean;
  transparencia: string | null;
  actualizado_en: string;
};

export type PiezaLista = {
  id: string;
  titulo: string;
  seccion: Seccion;
  formato: Formato;
  estado: EstadoPieza;
  actualizado_en: string;
  autor_id: string;
  autor: { nombre: string } | null;
};
