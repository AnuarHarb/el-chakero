import { puedeUsarRuta } from "@/lib/admin/nav";
import { sesionEquipo } from "@/lib/admin/sesion";
import { SinAcceso } from "./SinAcceso";

type Props = {
  href: string;
  children: React.ReactNode;
};

export async function AdminRuta({ href, children }: Props) {
  const { rol, supabaseListo } = await sesionEquipo();
  if (!supabaseListo) {
    return children;
  }
  if (!puedeUsarRuta(rol, href)) {
    return <SinAcceso />;
  }
  return children;
}
