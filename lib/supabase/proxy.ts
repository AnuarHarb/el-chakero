import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  isSupabaseConfigured,
  supabasePublishableKey,
  supabaseUrl,
} from "./config";

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request });

  if (!isSupabaseConfigured()) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl(), supabasePublishableKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const tieneSesion = Boolean(data?.claims);

  const ruta = request.nextUrl.pathname;
  const esAdmin = ruta === "/admin" || ruta.startsWith("/admin/");
  const esEntrar = ruta === "/admin/entrar" || ruta === "/admin/entrar/";

  if (esAdmin && !esEntrar && !tieneSesion) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/entrar/";
    url.searchParams.set("siguiente", ruta);
    return NextResponse.redirect(url);
  }

  if (esEntrar && tieneSesion) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}
