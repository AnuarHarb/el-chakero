"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Ruta = {
  href: string;
  etiqueta: string;
};

type Props = {
  rutas: readonly Ruta[];
  salir: () => Promise<void>;
};

export function NavAdmin({ rutas, salir }: Props) {
  const pathname = usePathname() ?? "";
  const actual = pathname.endsWith("/") ? pathname : `${pathname}/`;

  return (
    <nav className="admin-nav" aria-label="CMS">
      {rutas.map((ruta) => {
        const activa =
          actual === ruta.href ||
          (ruta.href !== "/admin/" && actual.startsWith(ruta.href));
        return (
          <Link
            key={ruta.href}
            href={ruta.href}
            aria-current={activa ? "page" : undefined}
          >
            {ruta.etiqueta}
          </Link>
        );
      })}
      <form action={salir}>
        <button className="boton boton-secundario" type="submit">
          Salir
        </button>
      </form>
    </nav>
  );
}
