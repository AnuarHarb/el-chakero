import Link from "next/link";
import { EnlaceCanal } from "@/components/EnlaceCanal";
import { PaginaFija } from "@/components/PaginaFija";
import { CORREO_NOTICIAS } from "@/lib/site";

export const metadata = {
  title: "Cómo funcionan las noticias",
  description:
    "Quién escribe, quién aprueba y quién publica en El Chakero. Quien escribe no publica lo suyo.",
};

export default function ComoFuncionan() {
  return (
    <PaginaFija titulo="Cómo funcionan las noticias">
      <p>
        El Chakero es una sala chica con reglas. Un aporte de la comunidad no es
        una noticia. Una noticia no se publica sola.
      </p>

      <section>
        <h2>Quién escribe</h2>
        <p>
          Reportería escribe la pieza: título, entradilla, cuerpo, foto 3:2 y,
          si es noticia, el pregón en audio. Un corresponsal o alguien del
          pueblo puede mandar un dato por el canal o por{" "}
          <Link href="/envia-tu-noticia/">Envía tu noticia</Link>. Eso entra a
          verificación. No se publica tal cual.
        </p>
      </section>

      <section>
        <h2>Quién aprueba</h2>
        <p>
          Edición revisa. Quien escribe no aprueba lo suyo. Tampoco lo publica.
          Si falta foto, pie de foto, entradilla o audio de noticia, no pasa a
          revisión.
        </p>
      </section>

      <section>
        <h2>Quién publica</h2>
        <p>
          Solo dirección publica. Si la pieza toca al medio —un vínculo, un
          conflicto con lo que se cubre— lleva una línea de transparencia a la
          vista. Si dirección está metida en esa sección, publica quien designe
          el consejo.
        </p>
      </section>

      <section>
        <h2>Correcciones y retiro</h2>
        <p>
          Si algo quedó mal, se corrige a la vista. Si se retira una pieza, se
          dice por qué. El historial de esos cambios no se borra.
        </p>
      </section>

      <section>
        <h2>Formatos y secciones</h2>
        <p>
          Noticia, crónica, perfil, galería, guía, pregón. Toda noticia lleva
          audio. Las secciones son comunidad, educación, cultura, territorio y
          gente. La agenda no es sección de pieza: son fechas del pueblo.
        </p>
      </section>

      <section>
        <h2>Boletín</h2>
        <p>
          Semanal, no diario. Lo más relevante de la semana. El correo se
          confirma antes del primer envío. La baja es un enlace, sin vueltas.
          Dudas:{" "}
          <a href={`mailto:${CORREO_NOTICIAS}`}>{CORREO_NOTICIAS}</a>.
        </p>
      </section>

      <section>
        <h2>Cómo mandar un dato</h2>
        <p>
          Por el{" "}
          <EnlaceCanal>canal de WhatsApp</EnlaceCanal>{" "}
          o en <Link href="/envia-tu-noticia/">Envía tu noticia</Link>. El equipo
          verifica. No prometemos publicar todo lo que llega.
        </p>
      </section>
    </PaginaFija>
  );
}
