import Link from "next/link";

export function SinAcceso() {
  return (
    <main>
      <h1>No es para este rol</h1>
      <p>
        Esta pantalla es de la sala de redacción. Tu cuenta no entra aquí.
      </p>
      <p>
        <Link href="/admin/">Volver al inicio</Link>
      </p>
    </main>
  );
}
