type Props = {
  titulo: string;
  children: React.ReactNode;
};

export function PaginaHueco({ titulo, children }: Props) {
  return (
    <main>
      <h1>{titulo}</h1>
      <div className="vacio">{children}</div>
    </main>
  );
}
