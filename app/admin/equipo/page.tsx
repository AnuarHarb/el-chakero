import { PaginaHueco } from "@/components/admin/PaginaHueco";

export const metadata = { title: "Equipo" };

export default function Equipo() {
  return (
    <PaginaHueco titulo="Equipo">
      <p>
        Dirección cambia roles con <code>cambiar_rol</code>. Dirección editorial
        pide dos votos del consejo. <code>infra</code> no se asigna desde la
        app.
      </p>
    </PaginaHueco>
  );
}
