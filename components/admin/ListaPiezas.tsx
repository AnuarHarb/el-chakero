import Link from "next/link";
import { EtiquetaSeccion } from "@/components/EtiquetaSeccion";
import { fechaCorta } from "@/lib/fecha";
import {
  ETIQUETA_ESTADO,
  ETIQUETA_FORMATO,
  type PiezaLista,
} from "@/lib/supabase/tipos";

type Props = {
  piezas: PiezaLista[];
  titulo: string;
  mostrarAutor: boolean;
};

export function ListaPiezas({ piezas, titulo, mostrarAutor }: Props) {
  return (
    <section aria-labelledby="lista-piezas">
      <h2 id="lista-piezas">{titulo}</h2>
      {piezas.length === 0 ? (
        <div className="vacio">
          <p>Aún no hay piezas aquí.</p>
        </div>
      ) : (
        <ul className="lista-piezas">
          {piezas.map((pieza) => (
            <li key={pieza.id}>
              <article>
                <h3>
                  <Link href={`/admin/piezas/${pieza.id}/`}>{pieza.titulo}</Link>
                </h3>
                <p className="meta">
                  <EtiquetaSeccion seccion={pieza.seccion} />
                  {` · ${ETIQUETA_FORMATO[pieza.formato]} · ${ETIQUETA_ESTADO[pieza.estado]}`}
                  {mostrarAutor && pieza.autor?.nombre
                    ? ` · ${pieza.autor.nombre}`
                    : ""}
                  {` · ${fechaCorta(pieza.actualizado_en)}`}
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
