import type { SupabaseClient } from "@supabase/supabase-js";
import {
  COLUMNAS_PIEZA,
  ESTADOS_ALTA,
  type CamposPieza,
  type Estado,
  type EstadoAlta,
  type Formato,
  type Pieza,
  type Seccion,
} from "./tipos.ts";

export type ClientePiezas = Pick<SupabaseClient, "from" | "rpc">;

const CAMPOS_ESCRITURA = [
  "titulo",
  "seccion",
  "formato",
  "entradilla",
  "cuerpo",
  "transparencia",
  "vinculo",
  "foto_url",
  "pie_foto",
  "audio_url",
  "duracion",
  "motivo_retiro",
] as const satisfies readonly (keyof CamposPieza)[];

export class ErrorPieza extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ErrorPieza";
  }
}

function vacioANulo(valor: string | null | undefined): string | null | undefined {
  if (valor === undefined) return undefined;
  if (valor === null) return null;
  const recorte = valor.trim();
  return recorte === "" ? null : recorte;
}

export function payloadEscritura(campos: CamposPieza): Record<string, unknown> {
  const fila: Record<string, unknown> = {};
  for (const clave of CAMPOS_ESCRITURA) {
    if (!Object.hasOwn(campos, clave)) continue;
    const valor = campos[clave];
    if (valor === undefined) continue;
    if (clave === "vinculo") {
      fila[clave] = valor;
      continue;
    }
    fila[clave] = typeof valor === "string" ? vacioANulo(valor) : valor;
  }
  return fila;
}

export function assertSinEstado(entrada: Record<string, unknown>) {
  if (Object.hasOwn(entrada, "estado") && entrada.estado !== undefined) {
    throw new ErrorPieza(
      "El estado no se cambia con un update. Usa piezas_cambiar_estado (RPC cambiar_estado).",
    );
  }
}

export function assertEstadoAlta(estado: string): asserts estado is EstadoAlta {
  if (!(ESTADOS_ALTA as readonly string[]).includes(estado)) {
    throw new ErrorPieza(
      "Al crear, el estado solo puede ser idea o borrador. El resto va por piezas_cambiar_estado.",
    );
  }
}

async function lanzarSiError(error: { message: string } | null) {
  if (error) throw new ErrorPieza(error.message);
}

export async function listarPiezas(
  cliente: ClientePiezas,
  filtros: { estado?: Estado; seccion?: Seccion; limite?: number } = {},
): Promise<Pieza[]> {
  const limite = Math.min(Math.max(filtros.limite ?? 50, 1), 200);
  let consulta = cliente
    .from("piezas")
    .select(COLUMNAS_PIEZA)
    .order("actualizado_en", { ascending: false })
    .limit(limite);

  if (filtros.estado) consulta = consulta.eq("estado", filtros.estado);
  if (filtros.seccion) consulta = consulta.eq("seccion", filtros.seccion);

  const { data, error } = await consulta;
  await lanzarSiError(error);
  return (data ?? []) as Pieza[];
}

export async function obtenerPieza(
  cliente: ClientePiezas,
  id: string,
): Promise<Pieza> {
  const { data, error } = await cliente
    .from("piezas")
    .select(COLUMNAS_PIEZA)
    .eq("id", id)
    .maybeSingle();
  await lanzarSiError(error);
  if (!data) throw new ErrorPieza("Pieza no existe");
  return data as Pieza;
}

export async function crearPieza(
  cliente: ClientePiezas,
  autorId: string,
  entrada: CamposPieza & { titulo: string; seccion: Seccion; formato: Formato; estado?: EstadoAlta },
): Promise<Pieza> {
  const estado = entrada.estado ?? "idea";
  assertEstadoAlta(estado);
  const fila = payloadEscritura(entrada);
  fila.titulo = entrada.titulo.trim();
  fila.seccion = entrada.seccion;
  fila.formato = entrada.formato;
  fila.estado = estado;
  fila.autor_id = autorId;
  fila.vinculo = entrada.vinculo ?? false;

  if (!fila.titulo) throw new ErrorPieza("El título es obligatorio.");

  const { data, error } = await cliente
    .from("piezas")
    .insert(fila)
    .select(COLUMNAS_PIEZA)
    .single();
  await lanzarSiError(error);
  return data as Pieza;
}

export async function actualizarPieza(
  cliente: ClientePiezas,
  id: string,
  entrada: CamposPieza & Record<string, unknown>,
): Promise<Pieza> {
  assertSinEstado(entrada);
  const fila = payloadEscritura(entrada);
  if (Object.keys(fila).length === 0) {
    throw new ErrorPieza("No hay campos para actualizar.");
  }

  const { data, error } = await cliente
    .from("piezas")
    .update(fila)
    .eq("id", id)
    .select(COLUMNAS_PIEZA)
    .maybeSingle();
  await lanzarSiError(error);
  if (!data) throw new ErrorPieza("Pieza no existe o no se puede editar en este estado.");
  return data as Pieza;
}

export async function cambiarEstadoPieza(
  cliente: ClientePiezas,
  id: string,
  nuevo: Estado,
  motivoRetiro?: string,
): Promise<Pieza> {
  if (nuevo === "retirada") {
    const motivo = vacioANulo(motivoRetiro);
    if (!motivo) {
      throw new ErrorPieza("El retiro necesita un motivo visible (motivo_retiro).");
    }
    const { error: errorMotivo } = await cliente
      .from("piezas")
      .update({ motivo_retiro: motivo })
      .eq("id", id);
    await lanzarSiError(errorMotivo);
  }

  const { error } = await cliente.rpc("cambiar_estado", {
    p_id: id,
    nuevo,
  });
  await lanzarSiError(error);
  return obtenerPieza(cliente, id);
}
