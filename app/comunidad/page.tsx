import { ListadoSeccion } from "@/components/ListadoSeccion";

export const metadata = { title: "Comunidad" };
export const revalidate = 120;

export default function Comunidad() {
  return (
    <ListadoSeccion
      seccion="comunidad"
      queHay="Lo que pasa en el pueblo: servicios, salud, seguridad, convocatorias, avisos."
    />
  );
}
