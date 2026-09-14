import { PaginaHueco } from "@/components/admin/PaginaHueco";

export const metadata = { title: "Revisión" };

export default function Revision() {
  return (
    <PaginaHueco titulo="Revisión">
      <p>
        Cola “En revisión”. Edición y dirección devuelven o aprueban. Quien
        escribe no se aprueba a sí mismo.
      </p>
    </PaginaHueco>
  );
}
