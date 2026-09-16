type Props = {
  texto: string;
};

function esCita(bloque: string): boolean {
  return bloque.startsWith('"') && bloque.endsWith('"') && bloque.length > 1;
}

export function CuerpoPieza({ texto }: Props) {
  return texto.split(/\n\n+/).map((bloque, indice) => {
    const titulo = bloque.match(/^###\s+(.+)$/);
    if (titulo) {
      return <h2 key={indice}>{titulo[1]}</h2>;
    }

    if (esCita(bloque)) {
      return (
        <blockquote key={indice}>
          <p>{bloque.slice(1, -1)}</p>
        </blockquote>
      );
    }

    return <p key={indice}>{bloque}</p>;
  });
}
