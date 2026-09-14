import { LlamadoWhatsApp } from "@/components/LlamadoWhatsApp";
import { SitioShell } from "@/components/SitioShell";
import { cargarAgenda } from "@/lib/contenido";
import { fechaCorta } from "@/lib/fecha";

export const metadata = { title: "Agenda" };
export const revalidate = 120;

export default async function Agenda() {
  const { eventos } = await cargarAgenda();

  return (
    <SitioShell seccionActiva="agenda">
      <main>
        <div className="doc bloque">
          <h1>Agenda</h1>
          <p>Fechas del pueblo: fiestas, asambleas, lo que convoca.</p>
          {eventos.length === 0 ? (
            <div className="vacio">
              <h2>No hay fechas cargadas</h2>
              <p>Cuando haya un evento, aparece aquí por día.</p>
            </div>
          ) : (
            <ol>
              {eventos.map((evento) => (
                <li key={evento.id}>
                  <strong>{evento.que}</strong>
                  <br />
                  <time dateTime={evento.fecha}>{fechaCorta(evento.fecha)}</time>
                  {evento.hora ? ` · ${evento.hora.slice(0, 5)}` : ""}
                  {evento.donde ? ` · ${evento.donde}` : ""}
                  {evento.convoca ? ` · Convoca ${evento.convoca}` : ""}
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
