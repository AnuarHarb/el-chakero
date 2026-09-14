import { EnlaceCanal } from "@/components/EnlaceCanal";
import { PaginaFija } from "@/components/PaginaFija";
import { CORREO_NOTICIAS, LLAMADO_PREGON } from "@/lib/site";

export const metadata = {
  title: "Quiénes somos",
  description:
    "El Chakero es el medio de San Basilio de Palenque. Las noticias se oyen antes de leerse.",
};

export default function QuienesSomos() {
  return (
    <PaginaFija titulo="Quiénes somos">
      <p>
        El Chakero es el medio de San Basilio de Palenque, cerca de Cartagena.
        Las noticias se oyen antes de leerse: un pregón de un minuto, un minuto
        y medio, por el canal de WhatsApp. En esta web queda el archivo y las
        piezas más largas.
      </p>
      <p>
        No es un portal de turismo ni un blog personal. Es una sala de redacción
        chica. Quien vive en el pueblo, y quien está afuera y quiere enterarse,
        viene a la portada, a las secciones y a la agenda.
      </p>
      <p>
        Un dato se manda por el canal. El equipo lo verifica. Nada se publica
        solo.
      </p>
      <p>
        El llamado del pregón va en palenquero:{" "}
        <span lang="pal">{LLAMADO_PREGON}</span>. El resto del periodismo, en
        español.
      </p>
      <p>El nombre se escribe con k: Chakero. Así se lee y así se busca.</p>
      <p>
        Para escribirnos:{" "}
        <a href={`mailto:${CORREO_NOTICIAS}`}>{CORREO_NOTICIAS}</a>. Para oír el
        pregón:{" "}
        <EnlaceCanal>el canal de WhatsApp</EnlaceCanal>
        .
      </p>
    </PaginaFija>
  );
}
