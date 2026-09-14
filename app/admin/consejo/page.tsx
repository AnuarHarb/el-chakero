import { AdminRuta } from "@/components/admin/AdminRuta";
import { PaginaHueco } from "@/components/admin/PaginaHueco";

export const metadata = { title: "Consejo" };

export default function Consejo() {
  return (
    <AdminRuta href="/admin/consejo/">
      <PaginaHueco titulo="Consejo">
        <p>
          Solo lectura: historial, piezas con vínculo, informes. El historial no
          se edita ni se borra desde la app.
        </p>
      </PaginaHueco>
    </AdminRuta>
  );
}
