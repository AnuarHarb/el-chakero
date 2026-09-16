import { ListadoSeccion } from "@/components/ListadoSeccion";

export const metadata = { title: "Educación" };
export const revalidate = 120;

export default function Educacion() {
  return (
    <ListadoSeccion
      seccion="educacion"
      queHay="Las escuelas, la sala de cómputo, becas, egresados, docentes."
    />
  );
}
