import { PaginaHueco } from "@/components/admin/PaginaHueco";

export const metadata = { title: "Publicar" };

export default function Publicar() {
  return (
    <PaginaHueco titulo="Publicar">
      <p>
        Cola de piezas aprobadas. Solo dirección publica, y no la propia. El
        webhook de revalidación queda esbozado en <code>/api/revalidar</code>.
      </p>
    </PaginaHueco>
  );
}
