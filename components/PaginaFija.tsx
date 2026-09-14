import { LlamadoWhatsApp } from "@/components/LlamadoWhatsApp";
import { SitioShell } from "@/components/SitioShell";

type Props = {
  titulo: string;
  children: React.ReactNode;
};

export function PaginaFija({ titulo, children }: Props) {
  return (
    <SitioShell>
      <main>
        <article className="doc bloque articulo">
          <h1>{titulo}</h1>
          {children}
        </article>
        <LlamadoWhatsApp />
      </main>
    </SitioShell>
  );
}
