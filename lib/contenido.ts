import {
  piezaSemilla,
  piezasSemillaDeSeccion,
  piezasSemillaPublicadas,
  SEMILLA_AGENDA,
} from "./semilla";
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
  usandoSemilla: boolean;
};

function armarPortada(
  piezas: PiezaPublica[],
  agenda: EventoAgenda[],
  extras: Pick<Portada, "error" | "supabaseListo" | "usandoSemilla">,
): Portada {
  const pregon =
    piezas.find((pieza) => pieza.formato === "pregon" || pieza.formato === "noticia") ??
    piezas[0] ??
    null;
  const resto = piezas.filter((pieza) => pieza.id !== pregon?.id);
  const gente = resto.find((pieza) => pieza.seccion === "gente") ?? null;

  return {
    pregon,
    tarjetas: resto.filter((pieza) => pieza.id !== gente?.id).slice(0, 8),
    gente,
    agenda,
    ...extras,
  };
}

function portadaSemilla(
  extras: Pick<Portada, "error" | "supabaseListo">,
): Portada {
  return armarPortada(piezasSemillaPublicadas(), SEMILLA_AGENDA, {
    ...extras,
    usandoSemilla: true,
  });
}

export async function cargarPortada(): Promise<Portada> {
  const supabaseListo = isSupabaseConfigured();

  if (!supabaseListo) {
    return portadaSemilla({ error: null, supabaseListo: false });
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
      return portadaSemilla({
        error: "No se pudieron cargar las piezas. Intenta de nuevo.",
        supabaseListo: true,
      });
    }

    const lista = (piezas ?? []) as unknown as PiezaPublica[];
    if (lista.length === 0) {
      return portadaSemilla({ error: null, supabaseListo: true });
    }

    return armarPortada(lista, (agenda ?? []) as EventoAgenda[], {
      error: null,
      supabaseListo: true,
      usandoSemilla: false,
    });
  } catch {
    return portadaSemilla({
      error: "No se pudieron cargar las piezas. Intenta de nuevo.",
      supabaseListo: true,
    });
  }
}

export async function cargarPiezasDeSeccion(
  seccion: Seccion,
): Promise<{ piezas: PiezaPublica[]; error: string | null; usandoSemilla: boolean }> {
  if (!isSupabaseConfigured()) {
    return { piezas: piezasSemillaDeSeccion(seccion), error: null, usandoSemilla: true };
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
      return {
        piezas: piezasSemillaDeSeccion(seccion),
        error: "No se pudo cargar esta sección.",
        usandoSemilla: true,
      };
    }

    const lista = (data ?? []) as unknown as PiezaPublica[];
    if (lista.length === 0) {
      return { piezas: piezasSemillaDeSeccion(seccion), error: null, usandoSemilla: true };
    }

    return { piezas: lista, error: null, usandoSemilla: false };
  } catch {
    return {
      piezas: piezasSemillaDeSeccion(seccion),
      error: "No se pudo cargar esta sección.",
      usandoSemilla: true,
    };
  }
}

export async function cargarPieza(
  seccion: Seccion,
  slug: string,
): Promise<PiezaPublica | null> {
  if (!isSupabaseConfigured()) {
    return piezaSemilla(seccion, slug);
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("piezas")
    .select(PIEZA_PUBLICA)
    .eq("seccion", seccion)
    .eq("slug", slug)
    .in("estado", ["publicada", "retirada"])
    .maybeSingle();

  if (data) {
    return data as unknown as PiezaPublica;
  }

  return piezaSemilla(seccion, slug);
}

export async function cargarPregones(): Promise<PiezaPublica[]> {
  if (!isSupabaseConfigured()) {
    return piezasSemillaPublicadas().filter((pieza) => pieza.audio_url);
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("piezas")
    .select(PIEZA_PUBLICA)
    .eq("estado", "publicada")
    .not("audio_url", "is", null)
    .order("fecha_publicacion", { ascending: false });

  const lista = (data ?? []) as unknown as PiezaPublica[];
  if (lista.length === 0) {
    return piezasSemillaPublicadas().filter((pieza) => pieza.audio_url);
  }

  return lista;
}

export async function cargarAgenda(): Promise<{
  eventos: EventoAgenda[];
  error: string | null;
  usandoSemilla: boolean;
}> {
  if (!isSupabaseConfigured()) {
    return { eventos: SEMILLA_AGENDA, error: null, usandoSemilla: true };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("agenda")
      .select("id, fecha, hora, que, donde, convoca")
      .order("fecha", { ascending: true });
    if (error) {
      return {
        eventos: SEMILLA_AGENDA,
        error: "No se pudo cargar la agenda.",
        usandoSemilla: true,
      };
    }
    const eventos = (data ?? []) as EventoAgenda[];
    if (eventos.length === 0) {
      return { eventos: SEMILLA_AGENDA, error: null, usandoSemilla: true };
    }
    return { eventos, error: null, usandoSemilla: false };
  } catch {
    return {
      eventos: SEMILLA_AGENDA,
      error: "No se pudo cargar la agenda.",
      usandoSemilla: true,
    };
  }
}
