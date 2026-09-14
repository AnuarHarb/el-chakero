import { PaginaHueco } from "@/components/admin/PaginaHueco";

export const metadata = { title: "Piezas" };

export default function Piezas() {
  return (
    <PaginaHueco titulo="Piezas">
      <p>
        Formulario de noticia, crónica, perfil, guía o pregón. Foto 3:2 y audio
        entran en Fase 2. Los cambios de estado van por{" "}
        <code>cambiar_estado</code>, no por un update suelto.
      </p>
    </PaginaHueco>
  );
}
