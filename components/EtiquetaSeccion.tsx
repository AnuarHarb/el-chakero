import type { Seccion } from "@/lib/supabase/tipos";
import { SECCIONES } from "@/lib/site";

const ETIQUETAS: Record<Seccion | "agenda", string> = {
  comunidad: "Comunidad",
  educacion: "Educación",
  cultura: "Cultura",
  territorio: "Territorio",
  gente: "Gente",
  agenda: "Agenda",
};

type Props = {
  seccion: Seccion | "agenda";
};

export function EtiquetaSeccion({ seccion }: Props) {
  return <span className={`seccion ${seccion}`}>{ETIQUETAS[seccion]}</span>;
}

export function nombreSeccion(seccion: Seccion): string {
  return SECCIONES.find((item) => item.slug === seccion)?.etiqueta ?? seccion;
}
