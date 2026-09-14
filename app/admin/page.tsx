import Link from "next/link";
import { puedeEscribirPiezas } from "@/lib/admin/nav";
import { sesionEquipo } from "@/lib/admin/sesion";
import { ETIQUETA_ROL } from "@/lib/supabase/tipos";

export const metadata = { title: "Admin" };

export default async function AdminInicio() {
  const { nombre, rol, supabaseListo } = await sesionEquipo();

  if (!supabaseListo) {
    return (
      <main>
        <h1>Cáscara del equipo</h1>
        <div className="error" role="status">
          <p>
            Supabase no está configurado. El sitio público funciona. Para
            entrar de verdad: proyecto, migraciones, Auth (correo + Google) y
            las variables de <code>.env.example</code>.
          </p>
        </div>
      </main>
    );
  }

  const etiqueta = rol ? ETIQUETA_ROL[rol] : "lector";

  return (
    <main>
      <h1>Equipo</h1>
      <p>
        Hola{nombre ? `, ${nombre}` : ""}. Tu rol es{" "}
        <strong>{etiqueta}</strong>.
      </p>
      {rol === "lector" || !rol ? (
        <p>
          Esta cuenta no ve las colas de la sala. Si eres del equipo, dirección
          te cambia el rol. El primer usuario se promueve con{" "}
          <code>supabase/seed-primer-admin.sql</code> en el SQL editor (como
          postgres).
        </p>
      ) : puedeEscribirPiezas(rol) ? (
        <p>
          En <Link href="/admin/piezas/">Piezas</Link> escribes la noticia,
          subes la foto 3:2 y el pregón, y la mandas a revisión. El estado
          cambia con <code>cambiar_estado</code>, no a mano.
        </p>
      ) : (
        <p>El menú muestra lo que tu rol puede usar.</p>
      )}
      <p>
        <Link href="/">Ir a la portada</Link>
      </p>
    </main>
  );
}
