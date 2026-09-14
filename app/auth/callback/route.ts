import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const siguiente = url.searchParams.get("next") ?? "/admin/";
  const destino = new URL(siguiente, url.origin);

  if (code && isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      const fallo = new URL("/admin/entrar/", url.origin);
      fallo.searchParams.set("error", "no-se-pudo-entrar");
      return NextResponse.redirect(fallo);
    }
  }

  return NextResponse.redirect(destino);
}
