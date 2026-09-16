import type { EventoAgenda, PiezaPublica } from "./supabase/tipos";

/**
 * Piezas en código cuando la base no tiene publicadas.
 * Mismo shape que una `pieza` publicada.
 * Foto de la sala en `public/semilla/sala-computo-inauguracion.jpg`.
 */
const AUTOR = { nombre: "El Chakero" };

function pieza(
  datos: Omit<PiezaPublica, "estado" | "motivo_retiro" | "autor" | "semilla">,
): PiezaPublica {
  return {
    ...datos,
    estado: "publicada",
    motivo_retiro: null,
    autor: AUTOR,
    semilla: true,
  };
}

export const SEMILLA_PIEZAS: PiezaPublica[] = [
  pieza({
    id: "a1e1c001-0014-4000-8000-000000000014",
    slug: "colegio-benkos-bioho-estreno-sala-computo",
    titulo: "El colegio Benkos Biohó estrenó una sala de cómputo",
    seccion: "educacion",
    formato: "noticia",
    fecha_publicacion: "2026-09-16T08:00:00-05:00",
    foto_url: "/semilla/sala-computo-inauguracion.jpg",
    pie_foto:
      "La sala de cómputo el día de la inauguración, 15 de septiembre de 2026.",
    audio_url: null,
    duracion: "1:25",
    entradilla:
      "La donó Pedro Adán Torres, excongresista y exalumno del colegio, con lo que ganó como congresista. Es el primer paso de un centro de innovación para Palenque que se llamará Orika, como la hija de Benkos Biohó.",
    cuerpo: `Hace unos cuarenta años, en la Institución Etnoeducativa Técnica Agropecuaria Benkos Biohó había una máquina de escribir. Una sola. Los estudiantes no podían tocarla. Los profesores le decían "la cosa rara".

Uno de esos estudiantes volvió este martes al mismo colegio con una sala llena de computadores.

Se llama Pedro Adán Torres. Fue congresista por la circunscripción especial afro y hoy es presidente del Partido Demócrata Colombiano. La sala de cómputo que se inauguró el 15 de septiembre la pagó con su sueldo de congresista.

### Lo que llegó

Computadores portátiles, uno por estudiante en clase. Reguladores de voltaje, para protegerlos de los cambios de corriente. Y una UPS, una batería que mantiene encendidos el internet y la pantalla del profesor cuando se va la luz. Que se vaya la luz, en Palenque, tampoco es noticia.

La sala llegó completa: aire acondicionado, mesas, sillas.

El colegio tiene 720 estudiantes. Hasta ayer, para todos ellos había cinco computadores viejos.

Reinaldo Roa, profesor de informática del colegio desde hace seis años, lo cuenta así:

"Enseñar informática en el pueblo es complicado. Con este tipo de donaciones cada muchacho puede tener su propia computadora para seguir la clase y explorar los programas."

La sala empieza a usarse esta misma semana.

### El que volvió

El acto fue el martes desde las ocho de la mañana, en el colegio, a la entrada del pueblo. Estaban los estudiantes, los profesores y periodistas de varios medios. Torres no habló para los periodistas. Les habló a los muchachos.

Les contó que vendió cocadas. Que pasó por ese mismo colegio. Que de ahí salió adelante. Y les contó lo de la máquina de escribir.

"Cuando yo estudié aquí había una máquina de escribir y no nos dejaban usarla. La llamaban 'la cosa rara'. Lo que yo quiero es que ningún joven de San Basilio de Palenque vea la tecnología como una cosa extraña y ajena. Por eso doné todo mi sueldo como congresista para crear este centro de innovación, Orika."

Orika se llama como la hija de Benkos Biohó, según la tradición del pueblo. La sala de cómputo es su primer paso; el centro será el encargado de mantenerla y de la tecnología del colegio de aquí en adelante.

Para armarla, Torres fue asesorado por la Fundación Código Abierto, que busca que la región Caribe se convierta en un centro de tecnología a través de educación, comunidad y oportunidades de trabajo. La fundación tiene además un programa propio que quiere empezar en Palenque: se llama Kuagro Tech.

Anuar Harb, de la Fundación Código Abierto, lo dice así:

"Esta sala de cómputo abre muchas oportunidades para la gente de Palenque. Y desde Fundación Código Abierto estamos muy emocionados por venir para hablar sobre tecnología y enseñar programación e inteligencia artificial a los chicos."

### Lo que dicen los muchachos

Los estudiantes que entraron a la sala el martes hablaron de lo mismo: de lo bonita que quedó y de las ganas de sentarse a usar los computadores.

"Estamos muy contentos de lo bonito que está quedando la sala. Estamos emocionados por usar las computadoras."

### Siguientes pasos

Los computadores ya están. Lo que falta es el internet: la red del colegio tiene que mejorar para sacarles provecho. Torres dijo que va a seguir con esto; quiere que el Benkos Biohó sea un colegio de alta calidad, y Orika es el camino que propone para llegar ahí.`,
    transparencia:
      "El Chakero es financiado por Pedro Adán Torres, presidente del Partido Demócrata Colombiano. Esta noticia es sobre una donación suya.",
  }),
];

export const SEMILLA_AGENDA: EventoAgenda[] = [
  {
    id: "a1e1c00a-0001-4000-8000-000000000001",
    fecha: "2026-10-09",
    hora: null,
    que: "41ª Festival de Tambores y Expresiones Culturales (9 al 12 de octubre)",
    donde: "San Basilio de Palenque",
    convoca: "Corporación Festival de Tambores de Palenque",
  },
];

export function piezasSemillaPublicadas(): PiezaPublica[] {
  return [...SEMILLA_PIEZAS].sort((a, b) =>
    (b.fecha_publicacion ?? "").localeCompare(a.fecha_publicacion ?? ""),
  );
}

export function piezaSemilla(seccion: PiezaPublica["seccion"], slug: string): PiezaPublica | null {
  return (
    SEMILLA_PIEZAS.find((pieza) => pieza.seccion === seccion && pieza.slug === slug) ?? null
  );
}

export function piezasSemillaDeSeccion(seccion: PiezaPublica["seccion"]): PiezaPublica[] {
  return piezasSemillaPublicadas().filter((pieza) => pieza.seccion === seccion);
}
