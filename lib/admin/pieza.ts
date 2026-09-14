import type { EstadoPieza, Formato, Rol } from "@/lib/supabase/tipos";

export const LIMITE_MEDIOS_BYTES = 5 * 1024 * 1024;
export const RATIO_FOTO = 3 / 2;
export const TOLERANCIA_RATIO = 0.05;
export const TIPOS_FOTO = ["image/jpeg", "image/png", "image/webp"] as const;
export const TIPOS_AUDIO = ["audio/mpeg", "audio/mp3"] as const;

export function textoONull(valor: string | null | undefined): string | null {
  const texto = valor?.trim() ?? "";
  return texto ? texto : null;
}

export function esTresPorDos(ancho: number, alto: number): boolean {
  if (ancho <= 0 || alto <= 0) return false;
  const ratio = ancho / alto;
  return Math.abs(ratio - RATIO_FOTO) / RATIO_FOTO <= TOLERANCIA_RATIO;
}

export function tipoFotoPermitido(file: File): boolean {
  if ((TIPOS_FOTO as readonly string[]).includes(file.type)) return true;
  return /\.(jpe?g|png|webp)$/i.test(file.name);
}

export function tipoAudioPermitido(file: File): boolean {
  if ((TIPOS_AUDIO as readonly string[]).includes(file.type)) return true;
  return /\.mp3$/i.test(file.name);
}

export function requisitosRevision(pieza: {
  titulo: string;
  formato: Formato;
  entradilla: string | null;
  tieneFoto: boolean;
  pie_foto: string | null;
  tieneAudio: boolean;
  duracion: string | null;
}): string[] {
  const faltan: string[] = [];
  if (!textoONull(pieza.titulo)) faltan.push("título");
  if (!textoONull(pieza.entradilla)) faltan.push("entradilla");
  if (!pieza.tieneFoto) faltan.push("foto");
  if (!textoONull(pieza.pie_foto)) faltan.push("pie de foto");
  if (pieza.formato === "noticia") {
    if (!pieza.tieneAudio) faltan.push("audio");
    if (!textoONull(pieza.duracion)) faltan.push("duración del audio");
  }
  return faltan;
}

export function puedeEditarPieza(
  rol: Rol,
  userId: string,
  pieza: { autor_id: string; estado: EstadoPieza },
): boolean {
  if (pieza.estado === "publicada") return false;
  if (rol === "edicion" || rol === "direccion") return true;
  return (
    pieza.autor_id === userId &&
    (pieza.estado === "idea" ||
      pieza.estado === "asignada" ||
      pieza.estado === "borrador")
  );
}

export function puedeMandarRevision(
  userId: string,
  pieza: { autor_id: string; estado: EstadoPieza },
): boolean {
  return pieza.autor_id === userId && pieza.estado === "borrador";
}

export function mensajeDesdeError(error: {
  message?: string;
  code?: string;
} | null): string {
  const msg = error?.message ?? "";
  if (!msg) return "No se pudo guardar.";
  if (/row-level security/i.test(msg)) {
    return "No se pudo guardar. Este rol no escribe piezas, o la pieza ya no se edita.";
  }
  if (/payload too large|maximum allowed size|exceeded/i.test(msg)) {
    return "El archivo pesa más de 5 MB.";
  }
  if (/mime|file type|not allowed|invalid/i.test(msg) && /storage|image|audio/i.test(msg)) {
    return "Ese tipo de archivo no entra. Foto jpeg, png o webp. Audio mp3.";
  }
  return msg;
}
