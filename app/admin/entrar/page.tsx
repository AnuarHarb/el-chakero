import { FormularioEntrar } from "@/components/admin/FormularioEntrar";
import { SitioShell } from "@/components/SitioShell";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata = { title: "Iniciar sesión" };

export default async function Entrar({
  searchParams,
}: {
  searchParams: Promise<{ siguiente?: string }>;
}) {
  const { siguiente } = await searchParams;
  const supabaseListo = isSupabaseConfigured();

  return (
    <SitioShell>
      <main>
        <article className="doc bloque articulo">
          <h1>Iniciar sesión</h1>
          {supabaseListo ? (
            <p>Correo y contraseña. Quien es del equipo entra aquí.</p>
          ) : null}
          <FormularioEntrar
            supabaseListo={supabaseListo}
            siguiente={siguiente || "/admin/"}
          />
        </article>
      </main>
    </SitioShell>
  );
}
