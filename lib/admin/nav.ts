import { RUTAS_ADMIN } from "@/lib/site";
import type { Rol } from "@/lib/supabase/tipos";

type HrefAdmin = (typeof RUTAS_ADMIN)[number]["href"];

const ROLES_POR_RUTA: Record<HrefAdmin, readonly Rol[] | "*"> = {
  "/admin/": "*",
  "/admin/aportes/": [
    "corresponsal",
    "comunidad",
    "reporteria",
    "edicion",
    "direccion",
    "consejo",
  ],
  "/admin/piezas/": ["reporteria", "edicion", "direccion"],
  "/admin/revision/": ["edicion", "direccion"],
  "/admin/publicar/": ["direccion"],
  "/admin/agenda/": ["comunidad", "reporteria", "edicion", "direccion"],
  "/admin/boletin/": ["edicion", "direccion", "comunidad"],
  "/admin/equipo/": ["direccion", "consejo"],
  "/admin/consejo/": ["consejo", "direccion"],
};

export function rutaAdminCanon(href: string): HrefAdmin | null {
  const normal = href.endsWith("/") ? href : `${href}/`;
  if (normal === "/admin/") {
    return "/admin/";
  }
  const match = RUTAS_ADMIN.find(
    (ruta) => ruta.href !== "/admin/" && normal.startsWith(ruta.href),
  );
  return match?.href ?? null;
}

export function puedeUsarRuta(rol: Rol | null, href: string): boolean {
  if (!rol) return false;
  const canon = rutaAdminCanon(href);
  if (!canon) return false;
  const permitidos = ROLES_POR_RUTA[canon];
  if (permitidos === "*") return true;
  return permitidos.includes(rol);
}

export function rutasParaRol(rol: Rol | null) {
  if (!rol) return [];
  return RUTAS_ADMIN.filter((ruta) => puedeUsarRuta(rol, ruta.href));
}

export function puedeEscribirPiezas(rol: Rol | null): boolean {
  return rol === "reporteria" || rol === "edicion" || rol === "direccion";
}

export function veTodasLasNoPublicas(rol: Rol | null): boolean {
  return rol === "edicion" || rol === "direccion";
}
