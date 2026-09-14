import { LlamadoWhatsApp } from "@/components/LlamadoWhatsApp";
import { SitioShell } from "@/components/SitioShell";
import { Tarjeta } from "@/components/Tarjeta";
import { cargarPiezasDeSeccion } from "@/lib/contenido";
import type { Seccion } from "@/lib/supabase/tipos";
import { nombreSeccion } from "./EtiquetaSeccion";

type Props = {
  seccion: Seccion;
  queHay: string;
};

export async function ListadoSeccion({ seccion, queHay }: Props) {
  const { piezas } = await cargarPiezasDeSeccion(seccion);
  const titulo = nombreSeccion(seccion);

  return (
    <SitioShell seccionActiva={seccion}>
      <main>
        <div className="doc bloque">
          <h1>{titulo}</h1>
          <p>{queHay}</p>
          {piezas.length === 0 ? (
            <div className="vacio">
              <h2>No hay piezas en {titulo.toLowerCase()}</h2>
              <p>Cuando salga una, la más reciente va primero.</p>
            </div>
          ) : (
            <div className="rejilla-tres">
              {piezas.map((pieza) => (
                <Tarjeta key={pieza.id} pieza={pieza} />
              ))}
            </div>
          )}
        </div>
        <LlamadoWhatsApp />
      </main>
    </SitioShell>
  );
}
