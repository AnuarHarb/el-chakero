import Link from "next/link";
import { SitioShell } from "@/components/SitioShell";

export default function NoEncontrado() {
  return (
    <SitioShell>
      <main className="doc bloque">
        <h1>No está esta página</h1>
        <p>Puede que el enlace esté viejo o que la pieza se haya retirado.</p>
        <p>
          <Link className="boton" href="/">
            Volver a la portada
          </Link>
        </p>
      </main>
    </SitioShell>
  );
}
