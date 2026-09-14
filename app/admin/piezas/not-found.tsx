import Link from "next/link";

export default function PiezaNoEsta() {
  return (
    <main>
      <h1>No está esta pieza</h1>
      <p>No se ve, o el enlace está viejo.</p>
      <p>
        <Link href="/admin/piezas/">Volver a piezas</Link>
      </p>
    </main>
  );
}
