import { ListadoSeccion } from "@/components/ListadoSeccion";

export const metadata = { title: "Territorio" };
export const revalidate = 120;

export default function Territorio() {
  return (
    <ListadoSeccion
      seccion="territorio"
      queHay="Consejo Comunitario, municipalización, obras, tierra, agua, gobierno."
    />
  );
}
