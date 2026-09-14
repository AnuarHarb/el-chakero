import Link from "next/link";
import { fechaCorta } from "@/lib/fecha";
import type { PiezaPublica } from "@/lib/supabase/tipos";
import { nombreSeccion } from "./EtiquetaSeccion";

type Props = {
  pieza?: PiezaPublica | null;
};

export function Pregon({ pieza }: Props) {
  if (!pieza) {
    return (
      <section className="pregon" aria-labelledby="pregon-titulo">
        <svg className="ondas-fondo" viewBox="0 0 34 24" aria-hidden="true">
          <path d="M14 6.5a8 8 0 0 1 0 11M19.5 3.2a13 13 0 0 1 0 17.6M25 0.8a17.6 17.6 0 0 1 0 22.4" />
        </svg>
        <p className="llamado">Oigan bien, Palenque:</p>
        <h2 id="pregon-titulo">La primera edición se está armando</h2>
        <p>
          Aquí va a ir el pregón: una sola noticia grande, con su audio de 60 a
          90 segundos. Todavía no hay nada publicado.
        </p>
        <p className="meta">El hueco ya está. Las piezas llegan por el CMS.</p>
      </section>
    );
  }

  const href = pieza.slug ? `/${pieza.seccion}/${pieza.slug}/` : "/";

  return (
    <article className="pregon">
      <svg className="ondas-fondo" viewBox="0 0 34 24" aria-hidden="true">
        <path d="M14 6.5a8 8 0 0 1 0 11M19.5 3.2a13 13 0 0 1 0 17.6M25 0.8a17.6 17.6 0 0 1 0 22.4" />
      </svg>
      <p className="llamado">Oigan bien, Palenque:</p>
      <h2>
        <Link href={href}>{pieza.titulo}</Link>
      </h2>
      {pieza.entradilla ? <p>{pieza.entradilla}</p> : null}
      <p className="meta">
        {nombreSeccion(pieza.seccion)}
        {pieza.fecha_publicacion ? ` · ${fechaCorta(pieza.fecha_publicacion)}` : ""}
        {pieza.duracion ? ` · Escúchalo en ${pieza.duracion}` : ""}
      </p>
    </article>
  );
}
