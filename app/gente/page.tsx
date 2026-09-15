import { ListadoSeccion } from "@/components/ListadoSeccion";

export const metadata = { title: "Gente" };
export const revalidate = 120;

export default function Gente() {
  return (
    <ListadoSeccion
      seccion="gente"
      queHay="Kombilesa: un vecino cada semana. El primero es Pedro Adán Torres."
    />
  );
}
