import Link from "next/link";
import { fechaDelDia } from "@/lib/fecha";
import { SECCIONES } from "@/lib/site";
import { Logo } from "./Logo";

type Props = {
  seccionActiva?: string;
};

const ENLACES = [
  { href: "/", slug: "portada", etiqueta: "Portada" },
  ...SECCIONES.map((seccion) => ({
    href: `/${seccion.slug}/`,
    slug: seccion.slug,
    etiqueta: seccion.etiqueta,
  })),
  { href: "/agenda/", slug: "agenda", etiqueta: "Agenda" },
];

function Enlaces({ seccionActiva }: Props) {
  return (
    <>
      {ENLACES.map((enlace) => (
        <Link
          key={enlace.slug}
          href={enlace.href}
          aria-current={seccionActiva === enlace.slug ? "page" : undefined}
        >
          {enlace.etiqueta}
        </Link>
      ))}
    </>
  );
}

export function Cabecera({ seccionActiva = "portada" }: Props) {
  return (
    <header className="cabecera">
      <Logo />
      <nav className="nav-escritorio" aria-label="Secciones">
        <Enlaces seccionActiva={seccionActiva} />
      </nav>
      <details className="menu-movil">
        <summary>Secciones</summary>
        <nav aria-label="Secciones">
          <Enlaces seccionActiva={seccionActiva} />
        </nav>
      </details>
      <p className="fecha">
        <time dateTime={new Date().toISOString().slice(0, 10)}>{fechaDelDia()}</time>
      </p>
    </header>
  );
}
