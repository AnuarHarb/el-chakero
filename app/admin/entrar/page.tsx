import { FormularioEntrar } from "@/components/admin/FormularioEntrar";
import { Logo } from "@/components/Logo";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata = { title: "Entrar" };

export default async function Entrar({
  searchParams,
}: {
  searchParams: Promise<{ siguiente?: string }>;
}) {
  const { siguiente } = await searchParams;

  return (
    <main className="doc bloque">
      <Logo />
      <h1 style={{ margin: "var(--s-8) 0 var(--s-4)" }}>Entrar al equipo</h1>
      <p>
        Correo y contraseña, o Google. Quien se registra entra como lector. El
        primer administrador se promueve a mano en Supabase (ver{" "}
        <code>supabase/seed-primer-admin.sql</code>).
      </p>
      <FormularioEntrar
        supabaseListo={isSupabaseConfigured()}
        siguiente={siguiente || "/admin/"}
      />
    </main>
  );
}
