import type { EventoAgenda, PiezaPublica } from "./supabase/tipos";

/**
 * Piezas en código cuando la base no tiene publicadas.
 * Mismo shape que una `pieza` publicada.
 * Fotos de la sala, del homenaje a Pambelé y del retrato de Torres
 * en `public/semilla/`.
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
    galeria: [
      {
        url: "/semilla/sala-computo-cinta.jpg",
        pie: "Corte de cinta el día de la inauguración de la sala de cómputo, 15 de septiembre de 2026.",
      },
      {
        url: "/semilla/sala-computo-clase.jpg",
        pie: "Pedro Adán Torres con estudiantes en la sala de cómputo, el día de la inauguración.",
      },
      {
        url: "/semilla/sala-computo-grupo.jpg",
        pie: "La sala de cómputo el día de la inauguración, con estudiantes y profesores.",
      },
    ],
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
    transparencia: null,
  }),
  pieza({
    id: "a1e1c001-0012-4000-8000-000000000012",
    slug: "homenaje-kid-pambele-congreso-y-palenque",
    titulo: "El Congreso condecoró a Kid Pambelé; en Palenque también lo honraron",
    seccion: "cultura",
    formato: "noticia",
    fecha_publicacion: "2026-07-29T14:00:00-05:00",
    foto_url: "/semilla/homenaje-kid-pambele.jpg",
    pie_foto:
      "Homenaje a Kid Pambelé: Pedro Adán Torres entrega la Orden de la Democracia Simón Bolívar – Gran Cruz Caballero a Antonio Cervantes Reyes, en el Congreso.",
    audio_url: null,
    duracion: null,
    entradilla:
      "Antonio Cervantes Reyes, de Palenque, primer campeón mundial de boxeo de Colombia. En julio el Congreso le impuso la Orden de la Democracia Simón Bolívar – Gran Cruz Caballero, por iniciativa de Pedro Adán Torres. En Palenque, en la Convención del Partido Demócrata Colombiano, el pueblo también lo honró.",
    cuerpo: `En julio de 2026 el Congreso impuso a Antonio Cervantes Reyes, Kid Pambelé, la Orden de la Democracia Simón Bolívar – Gran Cruz Caballero.

Cervantes es de Palenque. El Universal dató el nacimiento el 23 de diciembre de 1945, en San Basilio de Palenque. El 28 de octubre de 1972, dice esa misma casa, ganó por nocaut en el décimo asalto al panameño Alfonso «Peppermint» Frazer y se quedó con el título mundial de los wélter júnior: el primer cinturón mundial de boxeo de Colombia. El palenquero fue campeón en dos periodos; en 1998, según ese medio, entró al Salón Internacional de la Fama del Boxeo. El Chakero no inventa un combate.

El Universal anunció el homenaje para el lunes 20, día de la instalación del nuevo Congreso. El Bolivarense lo dató el viernes 17. El Heraldo y Diario La Libertad lo publicaron el 20. Semana escribió que fue pocos días antes de que cerrara esa legislatura. El Chakero no va a pelear el día. El dato es este: Salón Boyacá del Capitolio. La orden es una de las distinciones altas de la Cámara. La impuso Pedro Adán Torres Pérez, de Palenque, entonces representante por la circunscripción especial afrodescendiente, presidente del Partido Demócrata Colombiano.

En la foto, Torres entrega la orden y Pambelé la recibe.

Torres, según El Heraldo: «Su historia, nacida en San Basilio de Palenque, inspiró a generaciones de colombianos y abrió el camino para que el talento de muchos jóvenes encontrara nuevas oportunidades en el deporte». Y, en varios medios, esta otra: «Kid Pambelé no solo conquistó títulos mundiales; conquistó el respeto y la admiración de todo un país. Su ejemplo demuestra que el talento, la disciplina y la perseverancia pueden romper cualquier barrera. Hoy el Congreso de la República honra a un campeón que pertenece para siempre a la historia de Colombia».

En el mismo acto, dicen Caracol, El Universal y Diario La Libertad, también condecoraron a Johana Ximena Aranda Rivera, alcaldesa de Ibagué; a Francisco Hernández, primer árbitro internacional de boxeo oriundo de Palenque; y a José Alfredo Herazo, por el trabajo con las comunidades negras, afrocolombianas, raizales y palenqueras. Discursos de ellos no hay aquí.

El Universal recuerda que no era la primera vez en el Capitolio: en octubre de 2022, al cumplirse 50 años de la primera corona, lo condecoraron en el Salón Elíptico.

Ese homenaje no se quedó en Bogotá. En Palenque, en la Convención Nacional del Partido Demócrata Colombiano —la que Vive La Noticia dató el 29 de julio—, también se le rindió homenaje a Cervantes. Lo que publicaron los otros es el Capitolio. Aquí el dato de El Chakero es el segundo acto: el pueblo. No hay hora, ni lista de oradores, ni presupuesto. Si sabes de algo que pasó, cuéntanos.

Fotógrafo no se nombra. Gente tiene a Torres. Comunidad tiene la Convención.`,
    cita: {
      texto:
        "Kid Pambelé no solo conquistó títulos mundiales; conquistó el respeto y la admiración de todo un país. Su ejemplo demuestra que el talento, la disciplina y la perseverancia pueden romper cualquier barrera. Hoy el Congreso de la República honra a un campeón que pertenece para siempre a la historia de Colombia.",
      fuente:
        "Pedro Adán Torres Pérez, homenaje en el Congreso, julio de 2026, citado por El Universal, Diario La Libertad y El Heraldo",
    },
    transparencia: null,
    fuentes: [
      {
        texto: "El Universal, 17 jul 2026 — anuncio del homenaje y ficha de Pambelé",
        url: "https://www.eluniversal.com.co/deportes/2026/07/17/el-congreso-rendira-tributo-a-la-leyenda-del-boxeo-kid-pambele/",
      },
      {
        texto: "El Universal, 19 jul 2026 — la orden en el Salón Boyacá",
        url: "https://www.eluniversal.com.co/deportes/2026/07/18/kid-pambele-recibio-la-orden-de-la-democracia-simon-bolivar-gran-cruz-caballero/",
      },
      {
        texto: "Diario La Libertad, 20 jul 2026 — Torres entrega el reconocimiento",
        url: "https://diariolalibertad.com/2026/07/20/pedro-adan-torres-entrega-reconocimiento-a-kid-pambele-en-el-congreso-de-la-republica/",
      },
      {
        texto: "El Heraldo, 20 jul 2026 — citas de Torres y los otros condecorados",
        url: "https://www.elheraldo.co/politica/2026/07/20/kid-pambele-es-reconocido-con-gran-cruz-caballero-del-congreso-de-la-republica-por-su-trayectoria-y-legado/",
      },
      {
        texto: "Caracol Radio, 21 jul 2026 — Salón Boyacá y la orden",
        url: "https://caracol.com.co/2026/07/21/congreso-condecora-a-kid-pambele-con-la-orden-de-la-democracia-simon-bolivar/",
      },
      {
        texto: "El Bolivarense, 18 jul 2026 — dató la ceremonia el viernes 17",
        url: "https://bolivarense.com/honor-al-campeon-congreso-condecora-a-kid-pambele-por-iniciativa-del-representante-a-la-camara-pedro-adan-torres/",
      },
      {
        texto: "Semana, 24 jul 2026 — el homenaje, pocos días antes de cerrar esa legislatura",
        url: "https://www.semana.com/confidenciales/articulo/la-condecoracion-que-le-hizo-el-congreso-a-kid-pambele/202625/",
      },
      {
        texto: "Vive La Noticia, 29 jul 2026 — Convención Nacional en Palenque",
        url: "https://vivelanoticia.com/2026/07/29/pedro-adan-torres-reivindica-el-origen-palenquero-del-partido-democrata-colombiano-durante-la-convencion-nacional/",
      },
      {
        texto: "El Chakero — perfil de Pedro Adán Torres (Gente)",
        url: "/gente/pedro-adan-torres-sala-sistemas/",
      },
    ],
  }),
  pieza({
    id: "a1e1c001-0006-4000-8000-000000000006",
    slug: "pedro-adan-torres-sala-sistemas",
    titulo: "Pedro Adán Torres destinó el sueldo de la Cámara a la sala de cómputo",
    seccion: "gente",
    formato: "perfil",
    fecha_publicacion: "2026-09-15T16:00:00-05:00",
    foto_url: "/semilla/pedro-adan-torres.jpg",
    pie_foto: "Pedro Adán Torres.",
    audio_url: null,
    duracion: null,
    entradilla:
      "Abogado de Palenque, excongresista por la circunscripción afro. El 15 de septiembre se inauguró la sala en la escuela Benkos Biohó. Es el arranque de ORICA.",
    cuerpo: `Pedro Adán Torres Pérez, de Palenque, destinó el 100 % del sueldo de representante a una sala de cómputo en la escuela Benkos Biohó.

Abogado. Fundador, presidente y representante legal del Partido Demócrata Colombiano, el que se declara primer partido de origen palenquero. En junio de 2026 ocupó, los días que faltaban del periodo, la curul de la circunscripción especial afrodescendiente que dejó Ana Rogelia Monsalve Álvarez. Iba segundo en la lista. El Universal lo dató el 19 de junio. El Afro Bogotano dice que asumió el miércoles de esa semana. Esa legislatura cerró el 20 de julio. Hoy es excongresista.

En junio, El Universal y Diario La Libertad escribieron que el partido tenía un senador y tres representantes.

Ese mismo junio puso el sueldo sobre la mesa. Dijo que el 100 % del salario de representante iba para adecuar y dotar una sala de sistemas en la Institución Etnoeducativa Técnica Agropecuaria Benkos Biohó. Dijo que las familias se esfuerzan y que a los muchachos de aquí se les niegan cosas que en otros lados parecen del diario. Prometió cuentas públicas: compras, plata, resultados, con la escuela. Diario La Libertad recogió también esto: que el liderazgo tiene sentido cuando se pone al servicio, y que servir pesa más que el puesto.

En castellano, en junio, cuando llegó a la Cámara, dijo: «Soy hijo de Palenque».

La sala se inauguró el 15 de septiembre de 2026. Es el arranque de ORICA, con la Fundación Código Abierto. Educación tiene esa pieza.

En julio, todavía en la curul, impulsó el homenaje del Congreso a Kid Pambelé. Ya fuera de esa curul, el partido hizo Convención Nacional en Palenque. El pueblo también honró a Cervantes. Cultura tiene a Pambelé. Comunidad tiene la Convención.

La foto es él.`,
    cita: {
      texto:
        "San Basilio de Palenque le ha entregado mucho a Colombia, historia, libertad, resistencia y patrimonio cultural. Hoy quiero devolverle a mi tierra una pequeña parte de todo lo que me ha dado.",
      fuente: "Pedro Adán Torres Pérez, citado por El Universal y El Afro Bogotano, junio de 2026",
    },
    transparencia: null,
    fuentes: [
      {
        texto: "El Chakero, 15 sep 2026 — inauguración de la sala (Educación)",
        url: "/educacion/colegio-benkos-bioho-estreno-sala-computo/",
      },
      {
        texto: "El Chakero — homenaje a Kid Pambelé en el Congreso y en Palenque (Cultura)",
        url: "/cultura/homenaje-kid-pambele-congreso-y-palenque/",
      },
      {
        texto: "El Universal, 19 jun 2026 — curul, sueldo y periodo que faltaba",
        url: "https://www.eluniversal.com.co/politica/2026/06/18/el-representante-a-la-camara-que-destinara-todo-su-salario-a-una-sala-de-sistemas-en-palenque/",
      },
      {
        texto: "Diario La Libertad, 19 jun 2026 — «Soy hijo de Palenque» y devolver al pueblo",
        url: "https://diariolalibertad.com/2026/06/19/pedro-adan-torres-llegara-a-la-camara-de-representantes-y-donara-el-100-de-su-salario-para-una-sala-de-sistemas-en-palenque/",
      },
      {
        texto: "El Afro Bogotano, 19 jun 2026 — misma declaración",
        url: "https://elafrobogotano.com.co/pedro-adan-torres-es-nuevo-representante-a-la-camara/",
      },
      {
        texto: "Noticias y Respuestas, 17 jun 2026 — segundo renglón de la lista",
        url: "https://noticiasyrespuestas.com/2026/06/17/estudiantes-de-palenque-tendran-sala-de-sistemas-gracias-a-curul-de-pedro-adan-torres-en-la-camara/",
      },
      {
        texto: "Cámara de Representantes — ficha de Ana Rogelia Monsalve, circunscripción afro",
        url: "https://www.camara.gov.co/representantes/ana-rogelia-monsalve-alvarez/",
      },
      {
        texto: "Poder Legislativo / Cámara, 17 feb 2026 — esa curul afro hasta el 20 de julio",
        url: "https://poderlegislativo.camara.gov.co/2026/02/17/las-comunidades-afrodescendientes-en-el-congreso-una-historia-gris-hasta-ahora/",
      },
    ],
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
