import Link from "next/link";
import { EnlaceCanal } from "@/components/EnlaceCanal";
import { PAGINAS_FIJAS } from "@/lib/site";

export function Pie() {
  return (
    <footer className="pie">
      <div className="doc">
        <nav aria-label="Páginas del medio">
          <Link href="/pregon/">Pregón</Link>
          {PAGINAS_FIJAS.map((pagina) => (
            <Link key={pagina.slug} href={pagina.ruta}>
              {pagina.titulo}
            </Link>
          ))}
          <EnlaceCanal>WhatsApp</EnlaceCanal>
        </nav>
        <p>El Chakero · Palenque · elchakero.com</p>
      </div>
    </footer>
  );
}
