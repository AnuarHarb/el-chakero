import { PaginaHueco } from "@/components/admin/PaginaHueco";

export const metadata = { title: "Boletín" };

export default function Boletin() {
  return (
    <PaginaHueco titulo="Boletín">
      <p>
        Semanal: las noticias más relevantes de la semana. El esquema
        (<code>suscriptores</code>, <code>envios_boletin</code>) ya está. El
        envío con Resend es Fase 3.
      </p>
    </PaginaHueco>
  );
}
