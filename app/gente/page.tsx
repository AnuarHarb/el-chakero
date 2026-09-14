import { ListadoSeccion } from "@/components/ListadoSeccion";

export const metadata = { title: "Gente" };
export const revalidate = 120;

export default function Gente() {
  return (
    <ListadoSeccion
      seccion="gente"
      queHay="El primer perfil de esta casa: Pedro Adán Torres. De aquí en adelante, una persona de Palenque por semana."
    />
  );
}
