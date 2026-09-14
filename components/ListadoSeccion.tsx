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
  const { piezas, error, usandoSemilla } = await cargarPiezasDeSeccion(seccion);
  const titulo = nombreSeccion(seccion);

  return (
    <SitioShell seccionActiva={seccion}>
      <main>
        <div className="doc bloque">
          <h1>{titulo}</h1>
          <p>{queHay}</p>
          {error ? (
            <p className="error" role="alert">
              {error}
            </p>
          ) : null}
          {usandoSemilla && piezas.length > 0 ? (
            <p className="aviso">Semilla en el código. Cuando haya piezas en la base, salen aquí.</p>
          ) : null}
          {piezas.length === 0 && !error ? (
            <div className="vacio">
              <h2>Aún no hay nada en {titulo.toLowerCase()}</h2>
              <p>Cuando el equipo publique, las piezas más recientes salen primero.</p>
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
