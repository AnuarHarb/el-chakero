import { isSupabaseConfigured } from "./supabase/config";
import { createClient } from "./supabase/server";
import type { EventoAgenda, PiezaPublica, Seccion } from "./supabase/tipos";

const PIEZA_PUBLICA =
  "id, slug, titulo, seccion, formato, entradilla, cuerpo, foto_url, pie_foto, audio_url, duracion, transparencia, fecha_publicacion, estado, motivo_retiro, autor:perfiles!piezas_autor_id_fkey(nombre)";

export type Portada = {
  pregon: PiezaPublica | null;
  tarjetas: PiezaPublica[];
  gente: PiezaPublica | null;
  agenda: EventoAgenda[];
  error: string | null;
  supabaseListo: boolean;
};

export async function cargarPortada(): Promise<Portada> {
  const vacia: Portada = {
    pregon: null,
    tarjetas: [],
    gente: null,
    agenda: [],
    error: null,
    supabaseListo: isSupabaseConfigured(),
  };

  if (!vacia.supabaseListo) {
    return vacia;
  }

  try {
    const supabase = await createClient();
    const [{ data: piezas, error: errorPiezas }, { data: agenda, error: errorAgenda }] =
      await Promise.all([
        supabase
          .from("piezas")
          .select(PIEZA_PUBLICA)
          .eq("estado", "publicada")
          .order("fecha_publicacion", { ascending: false })
          .limit(9),
        supabase
          .from("agenda")
          .select("id, fecha, hora, que, donde, convoca")
          .gte("fecha", new Date().toISOString().slice(0, 10))
          .order("fecha", { ascending: true })
          .limit(5),
      ]);

    if (errorPiezas || errorAgenda) {
      return {
        ...vacia,
        error: "No se pudieron cargar las piezas. Intenta de nuevo.",
      };
    }

    const lista = (piezas ?? []) as unknown as PiezaPublica[];
    const pregon =
      lista.find((pieza) => pieza.formato === "pregon" || pieza.formato === "noticia") ??
      lista[0] ??
      null;
    const resto = lista.filter((pieza) => pieza.id !== pregon?.id);
    const gente = resto.find((pieza) => pieza.seccion === "gente") ?? null;

    return {
      pregon,
      tarjetas: resto.filter((pieza) => pieza.id !== gente?.id).slice(0, 8),
      gente,
      agenda: (agenda ?? []) as EventoAgenda[],
      error: null,
      supabaseListo: true,
    };
  } catch {
    return {
      ...vacia,
      error: "No se pudieron cargar las piezas. Intenta de nuevo.",
    };
  }
}

export async function cargarPiezasDeSeccion(
  seccion: Seccion,
): Promise<{ piezas: PiezaPublica[]; error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { piezas: [], error: null };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("piezas")
      .select(PIEZA_PUBLICA)
      .eq("estado", "publicada")
      .eq("seccion", seccion)
      .order("fecha_publicacion", { ascending: false });

    if (error) {
      return { piezas: [], error: "No se pudo cargar esta sección." };
    }

    return { piezas: (data ?? []) as unknown as PiezaPublica[], error: null };
  } catch {
    return { piezas: [], error: "No se pudo cargar esta sección." };
  }
}

export async function cargarPieza(
  seccion: Seccion,
  slug: string,
): Promise<PiezaPublica | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("piezas")
    .select(PIEZA_PUBLICA)
    .eq("seccion", seccion)
    .eq("slug", slug)
    .in("estado", ["publicada", "retirada"])
    .maybeSingle();

  return (data as unknown as PiezaPublica) ?? null;
}

export async function cargarPregones(): Promise<PiezaPublica[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("piezas")
    .select(PIEZA_PUBLICA)
    .eq("estado", "publicada")
    .not("audio_url", "is", null)
    .order("fecha_publicacion", { ascending: false });

  return (data ?? []) as unknown as PiezaPublica[];
}
