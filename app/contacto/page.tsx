import Link from "next/link";
import { PaginaFija } from "@/components/PaginaFija";
import { CANAL_WHATSAPP, CORREO_NOTICIAS } from "@/lib/site";

export const metadata = {
  title: "Contacto",
  description: "Canal de WhatsApp y correo de El Chakero.",
};

export default function Contacto() {
  return (
    <PaginaFija titulo="Contacto">
      <p>
        El pregón y los datos del pueblo entran por el canal de WhatsApp. El
        correo de la redacción es el del boletín y el de esta página.
      </p>
      <address>
        <p>
          Canal:{" "}
          <a href={CANAL_WHATSAPP} rel="noreferrer">
            El Chakero en WhatsApp
          </a>
        </p>
        <p>
          Correo:{" "}
          <a href={`mailto:${CORREO_NOTICIAS}`}>{CORREO_NOTICIAS}</a>
        </p>
      </address>
      <p>
        Para un dato que vio o oyó en Palenque, use{" "}
        <Link href="/envia-tu-noticia/">Envía tu noticia</Link>. Para saber qué se
        guarda de un correo o de una cuenta del equipo, lea{" "}
        <Link href="/datos-y-privacidad/">Datos y privacidad</Link>.
      </p>
    </PaginaFija>
  );
}
