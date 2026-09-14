import Link from "next/link";
import { EnlaceCanal } from "@/components/EnlaceCanal";
import { PaginaFija } from "@/components/PaginaFija";

export const metadata = {
  title: "Envía tu noticia",
  description:
    "Si vio o oyó algo en Palenque, cuéntelo. El equipo verifica. Un aporte no se publica solo.",
};

export default function EnviaTuNoticia() {
  return (
    <PaginaFija titulo="Envía tu noticia">
      <p>
        Si vio o oyó algo en Palenque, cuéntelo. Un aporte no se publica solo:
        alguien del equipo lo verifica y, si hay pieza, la convierte.
      </p>
      <p>
        El camino de todos los días es el canal. Ahí se oye el pregón y ahí
        llega un «pasó esto».
      </p>
      <p>
        <EnlaceCanal className="boton">Escribir por el canal</EnlaceCanal>
      </p>
      <p>
        Si ya forma parte de la red de corresponsales, entre al panel y use
        Aportes: <Link href="/admin/entrar/">entrar al equipo</Link>.
      </p>
    </PaginaFija>
  );
}
