import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { supabaseServiceRoleKey } from "@/lib/supabase/config";

export async function POST(request: Request) {
  const secreto = request.headers.get("x-webhook-secret");
  const esperado = supabaseServiceRoleKey();

  if (!esperado || secreto !== esperado) {
    return NextResponse.json({ ok: false, error: "no autorizado" }, { status: 401 });
  }

  let cuerpo: { seccion?: string; slug?: string; portada?: boolean } = {};
  try {
    cuerpo = (await request.json()) as typeof cuerpo;
  } catch {
    cuerpo = {};
  }

  revalidatePath("/");
  if (cuerpo.seccion) {
    revalidatePath(`/${cuerpo.seccion}/`);
    if (cuerpo.slug) {
      revalidatePath(`/${cuerpo.seccion}/${cuerpo.slug}/`);
    }
  }
  if (cuerpo.portada !== false) {
    revalidatePath("/pregon/");
  }

  return NextResponse.json({ ok: true });
}
