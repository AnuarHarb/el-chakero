import type { Formato, Seccion } from "@/lib/supabase/tipos";
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
  formato?: Formato;
};

export function EtiquetaSeccion({ seccion, formato }: Props) {
  const kombilesa = seccion === "gente" && formato === "perfil";
  return (
    <span className={`seccion ${seccion}`} lang={kombilesa ? "pal" : undefined}>
      {kombilesa ? "Kombilesa" : ETIQUETAS[seccion]}
    </span>
  );
}

export function nombreSeccion(seccion: Seccion): string {
  return SECCIONES.find((item) => item.slug === seccion)?.etiqueta ?? seccion;
}
