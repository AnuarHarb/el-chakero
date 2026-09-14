import { EnlaceCanal } from "@/components/EnlaceCanal";

export function LlamadoWhatsApp() {
  return (
    <aside className="wa" aria-labelledby="wa-titulo">
      <div>
        <h2 id="wa-titulo">El Chakero por WhatsApp</h2>
        <p>
          Las noticias de Palenque en un audio cada mañana. Y si sabes de algo
          que pasó, cuéntanos por ahí.
        </p>
      </div>
      <EnlaceCanal className="boton">Unirme al canal</EnlaceCanal>
    </aside>
  );
}
