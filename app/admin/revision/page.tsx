import { AdminRuta } from "@/components/admin/AdminRuta";
import { PaginaHueco } from "@/components/admin/PaginaHueco";

export const metadata = { title: "Revisión" };

export default function Revision() {
  return (
    <AdminRuta href="/admin/revision/">
      <PaginaHueco titulo="Revisión">
        <p>
          Cola “En revisión”. Edición y dirección devuelven o aprueban. Quien
          escribe no se aprueba a sí mismo. Eso es Fase 2.2.
        </p>
      </PaginaHueco>
    </AdminRuta>
  );
}
