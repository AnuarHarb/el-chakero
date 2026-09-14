import { BloqueAudio } from "@/components/BloqueAudio";
import { LlamadoWhatsApp } from "@/components/LlamadoWhatsApp";
import { SitioShell } from "@/components/SitioShell";
import { cargarPregones } from "@/lib/contenido";
import { fechaCorta } from "@/lib/fecha";
import { CANAL_WHATSAPP, LLAMADO_PREGON } from "@/lib/site";

export const metadata = { title: "Pregón" };
export const revalidate = 120;

export default async function PregonArchivo() {
  const piezas = await cargarPregones();

  return (
    <SitioShell>
      <main>
        <div className="doc bloque">
          <h1>Pregón</h1>
          <p>
            Archivo de los audios. El mismo pregón que se manda por el canal. El
            llamado va en palenquero:{" "}
            <span lang="pal">{LLAMADO_PREGON}</span>.
          </p>
          {piezas.length === 0 ? (
            <div className="vacio">
              <h2>No hay audios en el archivo</h2>
              <p>
                El pregón se oye primero en el canal.{" "}
                <a href={CANAL_WHATSAPP} rel="noreferrer">
                  Unirse al canal
                </a>
                .
              </p>
            </div>
          ) : (
            <ol>
              {piezas.map((pieza) => (
                <li key={pieza.id}>
                  <h2 style={{ fontSize: "var(--t-28)", margin: "var(--s-6) 0 var(--s-3)" }}>
                    {pieza.titulo}
                  </h2>
                  {pieza.fecha_publicacion ? (
                    <p className="aviso">{fechaCorta(pieza.fecha_publicacion)}</p>
                  ) : null}
                  {pieza.audio_url ? (
                    <BloqueAudio src={pieza.audio_url} duracion={pieza.duracion} />
                  ) : null}
                </li>
              ))}
            </ol>
          )}
        </div>
        <LlamadoWhatsApp />
      </main>
    </SitioShell>
  );
}
