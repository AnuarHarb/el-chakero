import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { ETIQUETA_ROL, type Rol } from "@/lib/supabase/tipos";

export const metadata = { title: "Admin" };

export default async function AdminInicio() {
  if (!isSupabaseConfigured()) {
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

  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub as string | undefined;
  const { data: perfil } = userId
    ? await supabase.from("perfiles").select("nombre, rol").eq("id", userId).maybeSingle()
    : { data: null };

  return (
    <main>
      <h1>Equipo</h1>
      <p>
        Hola{perfil?.nombre ? `, ${perfil.nombre}` : ""}. Tu rol es{" "}
        <strong>
          {perfil?.rol ? ETIQUETA_ROL[perfil.rol as Rol] : "lector"}
        </strong>
        . Fase 1 es la cáscara: las colas de aportes, piezas y publicación
        llegan en Fase 2.
      </p>
      <p>
        Si eres el primer usuario y sigues como lector, corre{" "}
        <code>supabase/seed-primer-admin.sql</code> en el SQL editor (como
        postgres) para pasar a dirección.
      </p>
      <p>
        <Link href="/">Ir a la portada</Link>
      </p>
    </main>
  );
}
