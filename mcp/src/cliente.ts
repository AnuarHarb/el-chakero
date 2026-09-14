import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const carpetaMcp = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function cargarArchivoEnv(ruta: string) {
  if (!existsSync(ruta)) return;
  const texto = readFileSync(ruta, "utf8");
  for (const linea of texto.split("\n")) {
    const recorte = linea.trim();
    if (!recorte || recorte.startsWith("#")) continue;
    const corte = recorte.indexOf("=");
    if (corte < 1) continue;
    const clave = recorte.slice(0, corte).trim();
    let valor = recorte.slice(corte + 1).trim();
    if (
      (valor.startsWith('"') && valor.endsWith('"')) ||
      (valor.startsWith("'") && valor.endsWith("'"))
    ) {
      valor = valor.slice(1, -1);
    }
    if (process.env[clave] === undefined) process.env[clave] = valor;
  }
}

export function cargarEnvLocal() {
  cargarArchivoEnv(resolve(carpetaMcp, ".env"));
}

function leer(nombre: string): string {
  return process.env[nombre]?.trim() ?? "";
}

export type ConfSupabase = {
  url: string;
  clave: string;
  email: string;
  password: string;
  usaServiceRole: boolean;
};

export function leerConf(): ConfSupabase {
  const url = leer("SUPABASE_URL") || leer("NEXT_PUBLIC_SUPABASE_URL");
  const anon =
    leer("SUPABASE_ANON_KEY") ||
    leer("SUPABASE_PUBLISHABLE_KEY") ||
    leer("NEXT_PUBLIC_SUPABASE_ANON_KEY") ||
    leer("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  const serviceRole = leer("SUPABASE_SERVICE_ROLE_KEY");
  const email = leer("EL_CHAKERO_EMAIL");
  const password = leer("EL_CHAKERO_PASSWORD");

  return {
    url,
    clave: anon || serviceRole,
    email,
    password,
    usaServiceRole: !anon && Boolean(serviceRole),
  };
}

export function describirFalta(conf: ConfSupabase): string | null {
  const faltan: string[] = [];
  if (!conf.url) faltan.push("SUPABASE_URL");
  if (!conf.clave) {
    faltan.push("SUPABASE_ANON_KEY (o SUPABASE_SERVICE_ROLE_KEY)");
  }
  if (!conf.email) faltan.push("EL_CHAKERO_EMAIL");
  if (!conf.password) faltan.push("EL_CHAKERO_PASSWORD");
  if (faltan.length === 0) return null;
  return (
    "Faltan variables de entorno: " +
    faltan.join(", ") +
    ". El MCP entra como una cuenta del equipo para que RLS y cambiar_estado vean auth.uid(). " +
    "La service role es opcional y solo local (Cursor), nunca NEXT_PUBLIC_."
  );
}

let clienteMemo: SupabaseClient | null = null;
let usuarioMemo: { id: string; email: string | undefined } | null = null;

export async function clienteAutenticado(): Promise<{
  cliente: SupabaseClient;
  usuario: { id: string; email: string | undefined };
}> {
  if (clienteMemo && usuarioMemo) {
    return { cliente: clienteMemo, usuario: usuarioMemo };
  }

  const conf = leerConf();
  const falta = describirFalta(conf);
  if (falta) throw new Error(falta);

  if (conf.usaServiceRole) {
    console.error(
      "El Chakero MCP: usando SUPABASE_SERVICE_ROLE_KEY como apikey local. No la expongas al navegador. Las escrituras van con la sesión de EL_CHAKERO_EMAIL.",
    );
  }

  const cliente = createClient(conf.url, conf.clave, {
    auth: {
      persistSession: false,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  });

  const { data, error } = await cliente.auth.signInWithPassword({
    email: conf.email,
    password: conf.password,
  });

  if (error || !data.user) {
    throw new Error(
      error?.message ??
        "No se pudo entrar. Revisa EL_CHAKERO_EMAIL y EL_CHAKERO_PASSWORD.",
    );
  }

  clienteMemo = cliente;
  usuarioMemo = { id: data.user.id, email: data.user.email };
  return { cliente, usuario: usuarioMemo };
}

export function resetClienteParaTests() {
  clienteMemo = null;
  usuarioMemo = null;
}
