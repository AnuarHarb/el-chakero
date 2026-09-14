type Props = {
  texto: string;
  fuente?: string;
};

export function Cita({ texto, fuente }: Props) {
  return (
    <blockquote className="cita">
      <p>{texto}</p>
      {fuente ? <cite>{fuente}</cite> : null}
    </blockquote>
  );
}
