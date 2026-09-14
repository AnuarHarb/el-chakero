import { FormularioPieza } from "@/components/admin/FormularioPieza";
import { ListaPiezas } from "@/components/admin/ListaPiezas";
import { SinAcceso } from "@/components/admin/SinAcceso";
import { puedeEscribirPiezas, veTodasLasNoPublicas } from "@/lib/admin/nav";
import { sesionEquipo } from "@/lib/admin/sesion";
import { createClient } from "@/lib/supabase/server";
import type { PiezaLista } from "@/lib/supabase/tipos";

export const metadata = { title: "Piezas" };

const COLUMNAS_LISTA =
  "id, titulo, seccion, formato, estado, actualizado_en, autor_id, autor:perfiles!piezas_autor_id_fkey(nombre)";

export default async function Piezas() {
  const { userId, rol, supabaseListo } = await sesionEquipo();

  if (!supabaseListo) {
    return (
      <main className="doc bloque">
        <h1>Piezas</h1>
        <div className="error" role="status">
          <p>
            Falta configurar Supabase. El sitio público sí se ve. Para escribir
            piezas: proyecto, migración y las variables de{" "}
            <code>.env.example</code>.
          </p>
        </div>
      </main>
    );
  }

  if (!userId || !rol || !puedeEscribirPiezas(rol)) {
    return <SinAcceso />;
  }

  const supabase = await createClient();
  let consulta = supabase
    .from("piezas")
    .select(COLUMNAS_LISTA)
    .order("actualizado_en", { ascending: false });

  if (veTodasLasNoPublicas(rol)) {
    consulta = consulta.neq("estado", "publicada");
  } else {
    consulta = consulta.eq("autor_id", userId);
  }

  const { data } = await consulta;
  const piezas = (data ?? []) as unknown as PiezaLista[];
  const verSala = veTodasLasNoPublicas(rol);

  return (
    <main>
      <h1>Piezas</h1>
      <p>
        Título, sección, noticia, entradilla, cuerpo, foto 3:2 con pie y
        pregón. Se crea como idea o como borrador. A revisión no va si falta
        título, entradilla, foto, pie; y si es noticia, audio con duración. El
        estado no se cambia a mano.
      </p>
      <ListaPiezas
        piezas={piezas}
        titulo={verSala ? "En la sala" : "Tus piezas"}
        mostrarAutor={verSala}
      />
      <section aria-labelledby="nueva-pieza">
        <h2 id="nueva-pieza">Nueva pieza</h2>
        <FormularioPieza userId={userId} rol={rol} />
      </section>
    </main>
  );
}
