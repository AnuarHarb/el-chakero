import { notFound } from "next/navigation";
import { BloqueAudio } from "@/components/BloqueAudio";
import { Cita } from "@/components/Cita";
import { EtiquetaSeccion, nombreSeccion } from "@/components/EtiquetaSeccion";
import { LlamadoWhatsApp } from "@/components/LlamadoWhatsApp";
import { SitioShell } from "@/components/SitioShell";
import { cargarPieza } from "@/lib/contenido";
import { fechaCorta } from "@/lib/fecha";
import { SEMILLA_PIEZAS } from "@/lib/semilla";
import { esSeccion } from "@/lib/site";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ seccion: string; slug: string }>;
};

export async function generateStaticParams() {
  return SEMILLA_PIEZAS.filter((pieza) => pieza.slug).map((pieza) => ({
    seccion: pieza.seccion,
    slug: pieza.slug as string,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seccion, slug } = await params;
  if (!esSeccion(seccion)) {
    return { title: "No está" };
  }
  const pieza = await cargarPieza(seccion, slug);
  if (!pieza) {
    return { title: "No está" };
  }
  return {
    title: pieza.titulo,
    description: pieza.entradilla ?? undefined,
    openGraph: {
      title: pieza.titulo,
      description: pieza.entradilla ?? undefined,
      images: pieza.foto_url ? [{ url: pieza.foto_url }] : undefined,
    },
  };
}

export default async function Articulo({ params }: Props) {
  const { seccion, slug } = await params;
  if (!esSeccion(seccion)) {
    notFound();
  }

  const pieza = await cargarPieza(seccion, slug);
  if (!pieza) {
    notFound();
  }

  return (
    <SitioShell seccionActiva={seccion}>
      <main>
        <article className="doc bloque articulo">
          <EtiquetaSeccion seccion={pieza.seccion} />
          <h1>{pieza.titulo}</h1>
          {pieza.entradilla ? <p className="entradilla">{pieza.entradilla}</p> : null}
          <p className="meta">
            {pieza.autor?.nombre ? `Por ${pieza.autor.nombre} · ` : ""}
            {nombreSeccion(pieza.seccion)}
            {pieza.fecha_publicacion ? ` · ${fechaCorta(pieza.fecha_publicacion)}` : ""}
            {pieza.duracion ? ` · Escúchalo en ${pieza.duracion}` : ""}
          </p>
          {pieza.semilla ? (
            <p className="aviso">
              Semilla en el código, no publicada por el CMS. Fuentes al pie.
            </p>
          ) : null}
          {pieza.estado === "retirada" ? (
            <p className="error" role="status">
              Esta pieza fue retirada
              {pieza.motivo_retiro ? `: ${pieza.motivo_retiro}` : "."}
            </p>
          ) : null}
          {pieza.audio_url ? (
            <BloqueAudio src={pieza.audio_url} duracion={pieza.duracion} />
          ) : null}
          {pieza.foto_url ? (
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={pieza.foto_url} alt={pieza.pie_foto ?? pieza.titulo} />
              {pieza.pie_foto ? <figcaption>{pieza.pie_foto}</figcaption> : null}
            </figure>
          ) : null}
          {pieza.cita ? <Cita texto={pieza.cita.texto} fuente={pieza.cita.fuente} /> : null}
          {pieza.cuerpo
            ? pieza.cuerpo.split(/\n\n+/).map((parrafo, indice) => (
                <p key={indice}>{parrafo}</p>
              ))
            : null}
          {pieza.transparencia ? (
            <p className="aviso">Transparencia: {pieza.transparencia}</p>
          ) : null}
          {pieza.fuentes && pieza.fuentes.length > 0 ? (
            <footer className="fuentes">
              <h2>De dónde salió</h2>
              <ul>
                {pieza.fuentes.map((fuente) => (
                  <li key={fuente.url}>
                    <a href={fuente.url} rel="noopener noreferrer">
                      {fuente.texto}
                    </a>
                  </li>
                ))}
              </ul>
            </footer>
          ) : null}
        </article>
        <LlamadoWhatsApp />
      </main>
    </SitioShell>
  );
}
