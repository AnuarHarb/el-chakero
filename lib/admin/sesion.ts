import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { Rol } from "@/lib/supabase/tipos";

export type SesionEquipo = {
  userId: string | null;
  nombre: string | null;
  rol: Rol | null;
  supabaseListo: boolean;
};

export async function sesionEquipo(): Promise<SesionEquipo> {
  const vacia: SesionEquipo = {
    userId: null,
    nombre: null,
    rol: null,
    supabaseListo: isSupabaseConfigured(),
  };

  if (!vacia.supabaseListo) {
    return vacia;
  }

  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = (claims?.claims?.sub as string | undefined) ?? null;
  if (!userId) {
    return vacia;
  }

  const { data } = await supabase
    .from("perfiles")
    .select("nombre, rol")
    .eq("id", userId)
    .maybeSingle();

  return {
    userId,
    nombre: data?.nombre ?? null,
    rol: (data?.rol as Rol | undefined) ?? null,
    supabaseListo: true,
  };
}
