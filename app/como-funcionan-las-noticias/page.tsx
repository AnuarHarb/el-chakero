import { PaginaFija } from "@/components/PaginaFija";

export const metadata = { title: "Cómo funcionan las noticias" };

export default function ComoFuncionan() {
  return (
    <PaginaFija titulo="Cómo funcionan las noticias">
      <p>
        Esta página está en borrador. Aquí irá la política editorial en lenguaje
        sencillo: quién escribe, quién aprueba, y que quien escribe no publica
        lo suyo.
      </p>
    </PaginaFija>
  );
}
