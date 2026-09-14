import { PaginaFija } from "@/components/PaginaFija";

export const metadata = { title: "Datos y privacidad" };

export default function DatosYPrivacidad() {
  return (
    <PaginaFija titulo="Datos y privacidad">
      <p>
        Esta página está en borrador. Aquí irá qué se guarda de quien escribe
        (correo del boletín, cuenta del equipo) y para qué, según la Ley 1581.
        El boletín pide confirmación antes de enviar.
      </p>
    </PaginaFija>
  );
}
