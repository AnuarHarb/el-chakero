import Link from "next/link";
import { PaginaFija } from "@/components/PaginaFija";
import { CANAL_WHATSAPP } from "@/lib/site";

export const metadata = { title: "Envía tu noticia" };

export default function EnviaTuNoticia() {
  return (
    <PaginaFija titulo="Envía tu noticia">
      <p>
        Si viste o oíste algo en Palenque, cuéntalo. Un aporte no se publica
        solo: alguien del equipo lo verifica y lo convierte en pieza.
      </p>
      <p>
        <a className="boton" href={CANAL_WHATSAPP} rel="noreferrer">
          Escribir por el canal
        </a>
      </p>
      <p>
        O entra al panel y usa “Aportes” cuando Anuar te dé una cuenta:{" "}
        <Link href="/admin/entrar/">entrar al equipo</Link>.
      </p>
    </PaginaFija>
  );
}
