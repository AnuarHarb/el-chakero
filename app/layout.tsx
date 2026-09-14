import type { Metadata } from "next";
import "@fontsource-variable/atkinson-hyperlegible-next";
import "@fontsource-variable/atkinson-hyperlegible-next/wght-italic.css";
import "@fontsource-variable/big-shoulders";
import { NOMBRE, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: NOMBRE,
    template: `%s · ${NOMBRE}`,
  },
  description:
    "Medio de Palenque. Las noticias se oyen antes de leerse: un pregón por WhatsApp y el archivo en elchakero.com.",
  applicationName: NOMBRE,
  openGraph: {
    locale: "es_CO",
    siteName: NOMBRE,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
