import { ListadoSeccion } from "@/components/ListadoSeccion";

export const metadata = { title: "Gente" };
export const revalidate = 120;

export default function Gente() {
  return (
    <ListadoSeccion
      seccion="gente"
      queHay="Perfiles: una persona por semana. Mayores, jóvenes, quienes viven afuera."
    />
  );
}
