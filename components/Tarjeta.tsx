import Link from "next/link";
import { fechaCorta } from "@/lib/fecha";
import type { PiezaPublica } from "@/lib/supabase/tipos";
import { EtiquetaSeccion } from "./EtiquetaSeccion";

type Props = {
  pieza: PiezaPublica;
};

export function Tarjeta({ pieza }: Props) {
  const href = pieza.slug ? `/${pieza.seccion}/${pieza.slug}/` : "/";

  return (
    <article className={`tarjeta ${pieza.seccion}`}>
      <EtiquetaSeccion seccion={pieza.seccion} />
      <div className="img">
        {pieza.foto_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={pieza.foto_url} alt={pieza.pie_foto ?? pieza.titulo} />
        ) : (
          "Foto 3:2"
        )}
      </div>
      <h3>
        <Link href={href}>{pieza.titulo}</Link>
      </h3>
      {pieza.entradilla ? <p>{pieza.entradilla}</p> : null}
      {pieza.fecha_publicacion ? (
        <p className="meta">
          <time dateTime={pieza.fecha_publicacion}>
            {fechaCorta(pieza.fecha_publicacion)}
          </time>
        </p>
      ) : null}
    </article>
  );
}
