import { PaginaFija } from "@/components/PaginaFija";
import { CANAL_WHATSAPP } from "@/lib/site";

export const metadata = { title: "Contacto" };

export default function Contacto() {
  return (
    <PaginaFija titulo="Contacto">
      <p>
        El canal de WhatsApp es el correo de la redacción, por ahora:{" "}
        <a href={CANAL_WHATSAPP} rel="noreferrer">
          Unirme al canal
        </a>
        .
      </p>
      <p>
        El correo del boletín semanal será{" "}
        <a href="mailto:noticias@elchakero.com">noticias@elchakero.com</a> cuando
        el dominio esté en Resend.
      </p>
    </PaginaFija>
  );
}
