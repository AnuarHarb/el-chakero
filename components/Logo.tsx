import Link from "next/link";

type Props = {
  href?: string;
  compacto?: boolean;
  className?: string;
};

export function Marca({ compacto = false }: { compacto?: boolean }) {
  return (
    <svg
      viewBox="0 0 34 24"
      aria-hidden={compacto ? undefined : true}
      aria-label={compacto ? "El Chakero" : undefined}
    >
      <circle className="voz" cx="6" cy="12" r="4.4" />
      <path
        className="ondas"
        d="M14 6.5a8 8 0 0 1 0 11M19.5 3.2a13 13 0 0 1 0 17.6M25 0.8a17.6 17.6 0 0 1 0 22.4"
      />
    </svg>
  );
}

export function Logo({ href = "/", compacto = false, className }: Props) {
  const contenido = (
    <>
      <Marca compacto={compacto} />
      {compacto ? null : "El Chakero"}
    </>
  );

  if (!href) {
    return <span className={className ? `logo ${className}` : "logo"}>{contenido}</span>;
  }

  return (
    <Link className={className ? `logo ${className}` : "logo"} href={href} aria-label="El Chakero">
      {contenido}
    </Link>
  );
}
