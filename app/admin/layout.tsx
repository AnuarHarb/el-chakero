import Link from "next/link";
import { Logo } from "@/components/Logo";
import { RUTAS_ADMIN } from "@/lib/site";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { ETIQUETA_ROL, type Rol } from "@/lib/supabase/tipos";
import { salir } from "./acciones";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let nombre: string | null = null;
  let rol: Rol | null = null;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data: claims } = await supabase.auth.getClaims();
    const userId = claims?.claims?.sub as string | undefined;
    if (userId) {
      const { data } = await supabase
        .from("perfiles")
        .select("nombre, rol")
        .eq("id", userId)
        .maybeSingle();
      nombre = data?.nombre ?? null;
      rol = (data?.rol as Rol | undefined) ?? null;
    }
  }

  if (!nombre && !rol) {
    return children;
  }

  return (
    <div className="admin">
      <header className="admin-barra">
        <div className="doc">
          <Logo href="/" />
          <p>
            {nombre ? (
              <>
                {nombre}
                {rol ? ` · ${ETIQUETA_ROL[rol]}` : ""}
              </>
            ) : (
              "Equipo"
            )}
            {" · "}
            <Link href="/">Ver el sitio</Link>
          </p>
        </div>
      </header>
      <div className="admin-cuerpo">
        <nav className="admin-nav" aria-label="CMS">
          {RUTAS_ADMIN.map((ruta) => (
            <Link key={ruta.href} href={ruta.href}>
              {ruta.etiqueta}
            </Link>
          ))}
          {nombre ? (
            <form action={salir}>
              <button className="boton boton-secundario" type="submit">
                Salir
              </button>
            </form>
          ) : null}
        </nav>
        <div className="admin-main">{children}</div>
      </div>
    </div>
  );
}
