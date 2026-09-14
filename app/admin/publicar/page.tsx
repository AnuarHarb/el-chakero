import { AdminRuta } from "@/components/admin/AdminRuta";
import { PaginaHueco } from "@/components/admin/PaginaHueco";

export const metadata = { title: "Publicar" };

export default function Publicar() {
  return (
    <AdminRuta href="/admin/publicar/">
      <PaginaHueco titulo="Publicar">
        <p>
          Cola de piezas aprobadas. Solo dirección publica, y no la propia. El
          webhook de revalidación queda esbozado en <code>/api/revalidar</code>.
          Eso es Fase 2.2.
        </p>
      </PaginaHueco>
    </AdminRuta>
  );
}
