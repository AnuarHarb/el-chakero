import { LlamadoWhatsApp } from "@/components/LlamadoWhatsApp";
import { Pregon } from "@/components/Pregon";
import { SitioShell } from "@/components/SitioShell";
import { Tarjeta } from "@/components/Tarjeta";
import { cargarPortada } from "@/lib/contenido";
import { fechaCorta } from "@/lib/fecha";

export const revalidate = 120;

export default async function Portada() {
  const { pregon, tarjetas, gente, agenda } = await cargarPortada();

  return (
    <SitioShell seccionActiva="portada">
      <main>
        <Pregon pieza={pregon} />

        <div className="doc">
          <section className="bloque" aria-labelledby="recientes">
            <h2 id="recientes" className="ui" style={{ fontSize: "var(--t-21)" }}>
              Lo reciente
            </h2>
            {tarjetas.length === 0 ? (
              <div className="vacio">
                <h3>Hoy no hay más piezas en portada</h3>
                <p>Las noticias del día van debajo del pregón, en esta misma página.</p>
              </div>
            ) : (
              <div className="rejilla-tres">
                {tarjetas.slice(0, 3).map((pieza) => (
                  <Tarjeta key={pieza.id} pieza={pieza} />
                ))}
              </div>
            )}
          </section>

          <section className="bloque rejilla-gente" aria-labelledby="gente-agenda">
            <div>
              <h2 id="gente-agenda" className="ui" style={{ fontSize: "var(--t-21)" }}>
                <span lang="pal">Kombilesa</span>
              </h2>
              <p className="meta">un vecino cada semana</p>
              {gente ? (
                <Tarjeta pieza={gente} />
              ) : (
                <div className="vacio">
                  <h3>Esta semana no hay perfil</h3>
                  <p>Aquí va una persona de Palenque: foto y una cita.</p>
                </div>
              )}
            </div>
            <aside>
              <h2 className="ui" style={{ fontSize: "var(--t-21)" }}>
                Agenda
              </h2>
              {agenda.length === 0 ? (
                <div className="vacio">
                  <p>No hay fechas próximas en la agenda.</p>
                </div>
              ) : (
                <ol>
                  {agenda.map((evento) => (
                    <li key={evento.id}>
                      <strong>{evento.que}</strong>
                      <br />
                      <time dateTime={evento.fecha}>{fechaCorta(evento.fecha)}</time>
                      {evento.donde ? ` · ${evento.donde}` : ""}
                    </li>
                  ))}
                </ol>
              )}
            </aside>
          </section>

          {tarjetas.length > 3 ? (
            <section className="bloque" aria-label="Más noticias">
              <div className="rejilla-tres">
                {tarjetas.slice(3).map((pieza) => (
                  <Tarjeta key={pieza.id} pieza={pieza} />
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <LlamadoWhatsApp />
      </main>
    </SitioShell>
  );
}
