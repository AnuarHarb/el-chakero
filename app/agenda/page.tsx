import { LlamadoWhatsApp } from "@/components/LlamadoWhatsApp";
import { SitioShell } from "@/components/SitioShell";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { fechaCorta } from "@/lib/fecha";

export const metadata = { title: "Agenda" };
export const revalidate = 120;

export default async function Agenda() {
  let eventos: {
    id: string;
    fecha: string;
    hora: string | null;
    que: string;
    donde: string | null;
    convoca: string | null;
  }[] = [];
  let error: string | null = null;

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error: fallo } = await supabase
        .from("agenda")
        .select("id, fecha, hora, que, donde, convoca")
        .order("fecha", { ascending: true });
      if (fallo) {
        error = "No se pudo cargar la agenda.";
      } else {
        eventos = data ?? [];
      }
    } catch {
      error = "No se pudo cargar la agenda.";
    }
  }

  return (
    <SitioShell seccionActiva="agenda">
      <main>
        <div className="doc bloque">
          <h1>Agenda</h1>
          <p>Fechas del pueblo. La comunidad y el equipo las cargan desde el CMS.</p>
          {error ? (
            <p className="error" role="alert">
              {error}
            </p>
          ) : null}
          {eventos.length === 0 && !error ? (
            <div className="vacio">
              <h2>Aún no hay fechas</h2>
              <p>Cuando haya tres o cinco, aparecen aquí por mes.</p>
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
