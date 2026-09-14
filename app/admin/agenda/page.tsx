import { PaginaHueco } from "@/components/admin/PaginaHueco";

export const metadata = { title: "Agenda" };

export default function AgendaAdmin() {
  return (
    <PaginaHueco titulo="Agenda">
      <p>
        Fechas del pueblo. Comunidad, reportería, edición y dirección las
        escriben. La tabla <code>agenda</code> ya está en la migración.
      </p>
    </PaginaHueco>
  );
}
