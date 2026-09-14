import { Suspense } from "react";
import Link from "next/link";
import { NavAdmin } from "@/components/admin/NavAdmin";
import { Logo } from "@/components/Logo";
import { rutasParaRol } from "@/lib/admin/nav";
import { sesionEquipo } from "@/lib/admin/sesion";
import { ETIQUETA_ROL } from "@/lib/supabase/tipos";
import { salir } from "./acciones";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { nombre, rol } = await sesionEquipo();

  if (!nombre && !rol) {
    return children;
  }

  const rutas = rutasParaRol(rol);

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
        <Suspense
          fallback={
            <nav className="admin-nav" aria-label="CMS">
              {rutas.map((ruta) => (
                <Link key={ruta.href} href={ruta.href}>
                  {ruta.etiqueta}
                </Link>
              ))}
            </nav>
          }
        >
          <NavAdmin rutas={rutas} salir={salir} />
        </Suspense>
        <div className="admin-main">{children}</div>
      </div>
    </div>
  );
}
