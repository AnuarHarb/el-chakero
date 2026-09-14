import { PaginaHueco } from "@/components/admin/PaginaHueco";

export const metadata = { title: "Aportes" };

export default function Aportes() {
  return (
    <PaginaHueco titulo="Aportes">
      <p>
        Aquí la comunidad y los corresponsales van a contar qué pasó. Fase 2
        conecta la tabla <code>aportes</code>. Aún no se publica nada desde
        aquí.
      </p>
    </PaginaHueco>
  );
}
