import Link from "next/link";
import { PAGINAS_FIJAS } from "@/lib/site";

export function Pie() {
  return (
    <footer className="pie">
      <div className="doc">
        <nav aria-label="Páginas del medio">
          {PAGINAS_FIJAS.map((pagina) => (
            <Link key={pagina.slug} href={pagina.ruta}>
              {pagina.titulo}
            </Link>
          ))}
        </nav>
        <p>El Chakero · Palenque · elchakero.com</p>
      </div>
    </footer>
  );
}
