export function fechaDelDia(fecha: Date = new Date()): string {
  const texto = new Intl.DateTimeFormat("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(fecha);
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export function fechaCorta(iso: string | Date): string {
  const fecha = typeof iso === "string" ? new Date(iso) : iso;
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
  }).format(fecha);
}
