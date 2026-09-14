import Link from "next/link";
import { notFound } from "next/navigation";
import { FormularioPieza } from "@/components/admin/FormularioPieza";
import { SinAcceso } from "@/components/admin/SinAcceso";
import { puedeEscribirPiezas } from "@/lib/admin/nav";
import { sesionEquipo } from "@/lib/admin/sesion";
import { createClient } from "@/lib/supabase/server";
import {
  ETIQUETA_ESTADO,
  type Pieza,
} from "@/lib/supabase/tipos";

export const metadata = { title: "Pieza" };

const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const COLUMNAS_PIEZA =
  "id, titulo, seccion, formato, entradilla, cuerpo, foto_url, pie_foto, audio_url, duracion, autor_id, estado, vinculo, transparencia, actualizado_en";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PiezaEditar({ params }: Props) {
  const { id } = await params;
  if (!UUID.test(id)) {
    notFound();
  }

  const { userId, rol, supabaseListo } = await sesionEquipo();
  if (!supabaseListo || !userId || !rol || !puedeEscribirPiezas(rol)) {
    return <SinAcceso />;
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("piezas")
    .select(COLUMNAS_PIEZA)
    .eq("id", id)
    .maybeSingle();

  const pieza = data as Pieza | null;
  if (!pieza) {
    notFound();
  }

  return (
    <main>
      <p>
        <Link href="/admin/piezas/">Piezas</Link>
      </p>
      <h1>{pieza.titulo}</h1>
      <p className="aviso">
        Estado: {ETIQUETA_ESTADO[pieza.estado]}. Los cambios de estado van por{" "}
        <code>cambiar_estado</code>.
      </p>
      <FormularioPieza pieza={pieza} userId={userId} rol={rol} />
    </main>
  );
}
