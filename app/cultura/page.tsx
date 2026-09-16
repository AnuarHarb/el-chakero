import { ListadoSeccion } from "@/components/ListadoSeccion";

export const metadata = { title: "Cultura" };
export const revalidate = 120;

export default function Cultura() {
  return (
    <ListadoSeccion
      seccion="cultura"
      queHay="Tambores, festival, lengua palenquera, cocina, kuagros, lumbalú, memoria."
    />
  );
}
