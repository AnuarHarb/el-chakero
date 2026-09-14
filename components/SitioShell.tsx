import { Cabecera } from "./Cabecera";
import { Pie } from "./Pie";

type Props = {
  seccionActiva?: string;
  children: React.ReactNode;
};

export function SitioShell({ seccionActiva, children }: Props) {
  return (
    <>
      <div className="doc">
        <Cabecera seccionActiva={seccionActiva} />
      </div>
      {children}
      <Pie />
    </>
  );
}
