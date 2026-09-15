import type { EventoAgenda, PiezaPublica } from "./supabase/tipos";

/**
 * Piezas en código cuando la base no tiene publicadas.
 * Mismo shape que una `pieza` publicada.
 * Fotos en `public/semilla/`: Wikimedia Commons (recorte 3:2), salvo la sala
 * de cómputo, el Festival de Tambores, el retrato de Torres y el homenaje a
 * Kid Pambelé, que son del acto o de la figura. Créditos en pie_foto.
 */
const AUTOR = { nombre: "El Chakero" };

const TRANSPARENCIA_SEMILLA =
  "El Chakero no estuvo en esas salas: la pieza se armó con lo que publicaron otros medios, citados al pie. Las fotos son de Wikimedia Commons, recortadas a 3:2; no son del hecho que se cuenta. Si sabes de algo que pasó, cuéntanos.";

function transparenciaFinanciador(vinculo: string): string {
  return `El Chakero es financiado por Pedro Adán Torres, presidente del Partido Demócrata Colombiano. ${vinculo}`;
}

function pieza(
  datos: Omit<PiezaPublica, "estado" | "motivo_retiro" | "autor" | "semilla" | "transparencia"> & {
    transparencia?: string;
  },
): PiezaPublica {
  return {
    ...datos,
    estado: "publicada",
    motivo_retiro: null,
    autor: AUTOR,
    semilla: true,
    transparencia: datos.transparencia ?? TRANSPARENCIA_SEMILLA,
  };
}

export const SEMILLA_PIEZAS: PiezaPublica[] = [
  pieza({
    id: "a1e1c001-0007-4000-8000-000000000007",
    slug: "kuagro-tech-inauguran-sala-computo",
    titulo: "La escuela Benkos Biohó inaugura la sala de cómputo",
    seccion: "educacion",
    formato: "noticia",
    fecha_publicacion: "2026-09-15T18:00:00-05:00",
    foto_url: "/semilla/sala-computo-inauguracion.jpg",
    pie_foto:
      "La sala de cómputo el día de la inauguración, 15 de septiembre de 2026.",
    audio_url: null,
    duracion: null,
    entradilla:
      "La donó Pedro Adán Torres, con el sueldo de la curul afro. Es el arranque de ORICA, con la Fundación Código Abierto y Kuagro Tech.",
    cuerpo: `El 15 de septiembre de 2026 se inaugura la sala de cómputo de la escuela Benkos Biohó.

La donó Pedro Adán Torres Pérez, de Palenque. En junio ocupó, los días que faltaban, la curul afro que dejó Ana Rogelia Monsalve. Dijo que el 100 % del sueldo de la Cámara iba para una sala de sistemas en la Institución Etnoeducativa Técnica Agropecuaria Benkos Biohó. Ese martes la sala se abre. Van con UPS y reguladores, para el voltaje.

En la foto de ese día el listón sigue puesto.

Esa sala es el comienzo de ORICA, un centro de innovación tecnológica. Lo impulsa Torres. Lo acompaña la Fundación Código Abierto. Ellos plantean que el Caribe sea epicentro de tecnología y Palenque un pueblo de tecnología. Aquí no hay presupuesto ni lista de invitados. El dato es el nombre, el arranque y con quién va.

También hay una charla. El Chakero no va a inventar la hora ni quién habla: eso no nos lo pasaron. Si la escuela, Kuagro Tech u ORICA manda el aviso, aquí se completa.

La donación entra en el programa Kuagro Tech, con la Fundación Código Abierto. Van a haber actividades para que los muchachos aprendan a programar y a usar inteligencia artificial. Ni lista de talleres ni cupos. El dato es el programa y con quién va.

En agosto, muchachos de esa misma escuela se fueron al Tech Caribe Show, en Barranquilla. Educación tiene esa pieza.

La foto es de la sala ese martes. El retrato de Torres está en Gente.`,
    transparencia: transparenciaFinanciador(
      "Esta noticia es sobre una donación suya a la escuela Benkos Biohó.",
    ),
    fuentes: [
      {
        texto: "El anuncio de junio, cuando Torres prometió el sueldo — perfil en Gente",
        url: "/gente/pedro-adan-torres-sala-sistemas/",
      },
      {
        texto: "ORICA arranca con la sala de cómputo (Educación)",
        url: "/educacion/orica-centro-innovacion-palenque/",
      },
      {
        texto: "El Chakero — muchachos de Benkos Biohó en el Tech Caribe Show (Educación)",
        url: "/educacion/muchachos-palenque-tech-caribe-show/",
      },
    ],
  }),
  pieza({
    id: "a1e1c001-0011-4000-8000-000000000011",
    slug: "orica-centro-innovacion-palenque",
    titulo: "ORICA arranca con la sala de cómputo de Benkos Biohó",
    seccion: "educacion",
    formato: "noticia",
    fecha_publicacion: "2026-09-15T14:00:00-05:00",
    foto_url: "/semilla/sala-computo-inauguracion.jpg",
    pie_foto:
      "La sala de cómputo el día de la inauguración, 15 de septiembre de 2026. Ahí arranca ORICA.",
    audio_url: null,
    duracion: null,
    entradilla:
      "ORICA es el centro de innovación tecnológica que impulsa Pedro Adán Torres, con la Fundación Código Abierto. La sala del 15 de septiembre es el comienzo.",
    cuerpo: `El 15 de septiembre de 2026 la sala de cómputo de la escuela Benkos Biohó abre ORICA, un centro de innovación tecnológica en Palenque.

Lo impulsa Pedro Adán Torres Pérez, de Palenque, el de la curul afro y el sueldo vuelto a la escuela. Lo acompaña la Fundación Código Abierto. El programa Kuagro Tech entra en ese mismo dibujo: muchachos aprendiendo a programar y a usar inteligencia artificial. No hay lista de talleres. No hay plata publicada. No hay fecha de un segundo acto. El dato es el nombre y el rumbo.

Ellos plantean que la región Caribe se vuelva epicentro de tecnología y que Palenque sea un pueblo de tecnología. Eso no se cuenta como hecho cumplido. Se cuenta como el apuntar del centro. Si queda corto o si se agranda, se verá en el pueblo.

La inauguración que sí hay es la de la sala, el 15 de septiembre: UPS, reguladores, una charla. En la foto el listón sigue puesto. Educación tiene esa pieza. Gente tiene a Torres. Aquí se dice una sola cosa más: es el arranque de ORICA.`,
    transparencia: transparenciaFinanciador(
      "Esta noticia es sobre ORICA, el centro que él impulsa.",
    ),
    fuentes: [
      {
        texto: "El Chakero — inauguración de la sala, 15 sep 2026 (Educación)",
        url: "/educacion/kuagro-tech-inauguran-sala-computo/",
      },
      {
        texto: "El Chakero — perfil de Pedro Adán Torres (Gente)",
        url: "/gente/pedro-adan-torres-sala-sistemas/",
      },
      {
        texto: "El Chakero — muchachos de Benkos Biohó en el Tech Caribe Show (Educación)",
        url: "/educacion/muchachos-palenque-tech-caribe-show/",
      },
    ],
  }),
  pieza({
    id: "a1e1c001-0013-4000-8000-000000000013",
    slug: "muchachos-palenque-tech-caribe-show",
    titulo: "Muchachos de Benkos Biohó se fueron al Tech Caribe Show",
    seccion: "educacion",
    formato: "noticia",
    fecha_publicacion: "2026-08-08T16:00:00-05:00",
    foto_url: "/semilla/calle-palenque-2007.jpg",
    pie_foto:
      "Patio de una escuela en San Basilio de Palenque, 1 de diciembre de 2007. Foto: Kosmel Bonfante / Wikimedia Commons (CC BY 3.0). Recorte 3:2. No es el Tech Caribe Show ni el viaje a Barranquilla.",
    audio_url: null,
    duracion: null,
    entradilla:
      "El 8 de agosto viajaron tres horas a Barranquilla. Lo organiza la Fundación Código Abierto. Es Kuagro Tech: aprender tecnología y ver el festival. No hay lista de nombres.",
    cuerpo: `El 8 de agosto de 2026, muchachos de la escuela Benkos Biohó viajaron tres horas a Barranquilla al Tech Caribe Show.

El show se hizo en el Teatro José Consuegra Higgins. Lo organiza la Fundación Código Abierto. Vive La Noticia lo contó antes y lo volvió a contar ese mismo sábado: tercera edición del Fest, un show de tecnología, y en las butacas, muchachos de Palenque.

La escuela es la Institución Etnoeducativa Técnica Agropecuaria Benkos Biohó. Vive La Noticia, el 30 de julio, avisó 40 estudiantes y tres horas de carretera. La página del fest, después del acto, habló de 40 estudiantes y 5 docentes. El Chakero no arma censo propio. El dato es ese grupo, de esa escuela, en ese teatro.

No iban de paseo, escribió Vive La Noticia: formación en inteligencia artificial, programación y trabajo global. El fest lo mete en Kuagro Tech, primera fase: el nombre del kuagro, la forma de organizarse aquí, en grupos que se acompañan. Lo que sigue, dijeron, es la sala de tecnología. Educación ya tiene esa inauguración, el 15 de septiembre.

Grace Torres, directora de la Fundación Código Abierto, citada por Vive La Noticia: «El sueño de un Caribe convertido en epicentro tech solo tiene sentido si incluye a los jóvenes de toda la costa, desde las capitales hasta los territorios. Ver a los muchachos de Palenque en ese teatro es la misión hecha realidad».

El 8 de agosto, ya pasado el acto, Vive La Noticia confirmó que los 40 muchachos de Palenque estuvieron y que recibieron formación. También escribió que en el evento anunciaron equipos para una escuela de Palenque. El Chakero no mezcla esa frase con una sala que no vimos ese día. La sala de cómputo, con fecha, está en la otra pieza.

Cartelera completa, hora de cada bloque, quién se sentó en qué silla: no. Si la escuela o la Fundación mandan nombres de los muchachos, se publican.`,
    cita: {
      texto:
        "El sueño de un Caribe convertido en epicentro tech solo tiene sentido si incluye a los jóvenes de toda la costa, desde las capitales hasta los territorios. Ver a los muchachos de Palenque en ese teatro es la misión hecha realidad.",
      fuente: "Grace Torres, Fundación Código Abierto, citada por Vive La Noticia, 30 de julio de 2026",
    },
    transparencia:
      "Pieza de semilla. El viaje, la escuela, las 40 personas y el teatro salen de Vive La Noticia (30 jul y 8 ago 2026) y de la página del TechCaribe Fest. Los 5 docentes los nombra el fest, no un conteo de El Chakero. No se toma el aforo total del teatro: esos números no coinciden entre el aviso y el recuento. Foto de archivo, no del viaje.",
    fuentes: [
      {
        texto: "Vive La Noticia, 30 jul 2026 — aviso: 40 estudiantes de Palenque al Fest",
        url: "https://vivelanoticia.com/2026/07/30/llega-techcaribe-fest-el-festival-de-tecnologia-mas-importante-de-la-costa-40-jovenes-de-palenque-viajaran-tres-horas-para-vivir-la-experiencia/",
      },
      {
        texto: "Vive La Noticia, 8 ago 2026 — los 40 jóvenes de Palenque estuvieron en el Show",
        url: "https://vivelanoticia.com/2026/08/08/barranquilla-se-consolida-como-epicentro-tecnologico-del-caribe-con-la-tercera-edicion-de-tech-caribe-show/",
      },
      {
        texto: "TechCaribe Fest — 40 estudiantes y 5 docentes de Benkos Biohó, Kuagro Tech",
        url: "https://www.techcaribe.co/fest",
      },
      {
        texto: "Fundación Código Abierto — ficha del Tech Caribe, 8 ago 2026",
        url: "https://www.codigoabierto.tech/eventos/tech-caribe",
      },
      {
        texto: "El Chakero — inauguración de la sala, 15 sep 2026 (Educación)",
        url: "/educacion/kuagro-tech-inauguran-sala-computo/",
      },
      {
        texto: "El Chakero — ORICA, el centro que arranca con esa sala (Educación)",
        url: "/educacion/orica-centro-innovacion-palenque/",
      },
      {
        texto: "Foto: Kosmel Bonfante, CC BY 3.0 — Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/File:San_basilio_de_palenque_-_panoramio_(2).jpg",
      },
    ],
  }),
  pieza({
    id: "a1e1c001-0001-4000-8000-000000000001",
    slug: "consulta-previa-municipio",
    titulo: "Palenque sentó la mesa para ser municipio",
    seccion: "territorio",
    formato: "noticia",
    fecha_publicacion: "2026-09-14T18:00:00-05:00",
    foto_url: "/semilla/pueblo-palenque-2007.jpg",
    pie_foto:
      "Arroyo en San Basilio de Palenque, 1 de diciembre de 2007. Foto: Kosmel Bonfante / Wikimedia Commons (CC BY 3.0). Recorte 3:2. No es la reunión de consulta previa.",
    audio_url: null,
    duracion: null,
    entradilla:
      "El 5 de agosto se juntaron más de 200 en la Casa de la Cultura. Agosto y septiembre son los meses de la consulta previa. Todavía no hay alcaldía. Hay mesa.",
    cuerpo: `El 5 de agosto de 2026, más de 200 personas se juntaron en la Casa de la Cultura para abrir la consulta previa de Palenque municipio.

La Gobernación de Bolívar abrió la etapa que llama Preconsulta y Apertura. Dicen que fueron más de doscientos: Consejo Comunitario, autoridades étnicas, organizaciones, gente del departamento y de la nación. El proyecto de ordenanza busca crear el municipio de San Basilio de Palenque y separarlo, en lo administrativo, de Mahates.

La secretaria de Planeación, Susana Puerta, dijo que esa primera reunión era para la ruta: metodología, cronograma y los papeles que pide la ley antes de llevar el proyecto a la Asamblea Departamental. El gobernador Yamil Arana Padauí habló de justicia histórica y de que cada paso tiene que ir con consulta y con la ley.

Eso no nació ese día. En noviembre de 2025 la consulta popular —el voto de sí o no— se cayó. La Gobernación misma reconoció que no se podía votar sin terminar la consulta previa con el pueblo palenquero. Hubo falta de plata y el Ministerio del Interior no tenía cronograma.

Antes de la mesa de agosto, el Comité Promotor Palenque Municipio llamó a asamblea el domingo 5 de julio, a las 10 de la mañana, en la misma Casa de la Cultura. Caracol lo contó el 30 de junio: después del calendario electoral, el comité quería socializar el proyecto de ordenanza con el pueblo y con la diáspora de Cartagena y Barranquilla.

La Ley 2379 de 2024, que sacó la bancada afrocolombiana, es el marco. Palenque sigue dependiendo de Mahates. Lo que viene, si la consulta cierra en agosto y septiembre, es una propuesta de ordenanza. Esa ordenanza la debate y la aprueba —o no— la Asamblea de Bolívar. Hasta ahí, no hay alcalde ni concejo propios.

Manuel Cáceres Reyes, del Comité Promunicipio, dijo que toca pesar lo bueno y lo malo. Keinel Joel Cimarra Cassiani, del Consejo Comunitario Makankamaná, dijo que después de dos años de trabas se ve una luz. Esas dos voces no son lo mismo. Una pide medir el golpe. La otra no quiere que se enfríe otra vez.

El Chakero no estuvo en esa sala. Lo que hay aquí es lo que salió en El Universal, Caracol, Primer Tiempo y Alerta Cartagena. Si sabes de algo que pasó, cuéntanos.`,
    fuentes: [
      {
        texto: "El Universal, 5 ago 2026 — cronograma y primera reunión",
        url: "https://www.eluniversal.com.co/regional/bolivar/2026/08/05/san-basilio-de-palenque-inicia-la-ruta-formal-para-convertirse-en-municipio/",
      },
      {
        texto: "Caracol Radio, 5 ago 2026 — más de 200 en la Casa de la Cultura",
        url: "https://caracol.com.co/2026/08/05/gobernacion-de-bolivar-avanza-en-la-ruta-para-convertir-a-san-basilio-de-palenque-en-municipio/",
      },
      {
        texto: "Primer Tiempo, 19 ago 2026 — la ruta se sigue contando",
        url: "https://primertiempo.co/ciudadpt/bolivar-inicia-la-ruta-para-convertir-a-san-basilio-de-palenque-en-municipio/",
      },
      {
        texto: "Alerta Cartagena — qué falta y el plazo agosto-septiembre",
        url: "https://cartagena.alerta.com.co/quejodromo/san-basilio-de-palenque-a-un-paso-de-ser-el-nuevo-municipio-de-bolivar-248786",
      },
      {
        texto: "Alerta Cartagena — por qué se cayó la consulta popular de noviembre de 2025",
        url: "https://cartagena.alerta.com.co/quejodromo/que-paso-con-consulta-que-buscaba-convertir-a-palenque-en-municipio-229693",
      },
      {
        texto: "Caracol Radio, 30 jun 2026 — asamblea del 5 de julio en la Casa de la Cultura",
        url: "https://caracol.com.co/2026/06/30/comite-promotor-palenque-municipio-convoca-a-asamblea-para-reactivar-proyecto-de-municipalizacion/",
      },
      {
        texto: "Foto: Kosmel Bonfante, CC BY 3.0 — Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/File:San_basilio_de_palenque_-_panoramio_(3).jpg",
      },
    ],
  }),
  pieza({
    id: "a1e1c001-0002-4000-8000-000000000002",
    slug: "kuagros-consejo-mayores-municipio",
    titulo: "Dorina Hernández pide voz para los kuagros en el municipio",
    seccion: "comunidad",
    formato: "noticia",
    fecha_publicacion: "2026-09-14T12:10:00-05:00",
    foto_url: "/semilla/libro-cocina-palenque-2014.jpg",
    pie_foto:
      "Lanzamiento del libro Kumina ri Palenge pa tó paraje en Palenque, 22 de abril de 2014. Foto: Dtokra / Wikimedia Commons (CC BY-SA 4.0). Recorte 3:2. No es la mesa de consulta previa de 2026.",
    audio_url: null,
    duracion: null,
    entradilla:
      "En la consulta previa no solo se habla de plata y de alcaldía. Se está armando cómo encajan kuagros, consejo de mayores y Consejo Comunitario en un municipio del Estado.",
    cuerpo: `Dorina Hernández Palomino dijo que la consulta previa está armando cómo encajan los kuagros, el consejo de mayores y el Consejo Comunitario en un municipio.

Un municipio colombiano trae alcalde, concejo, personería. Palenque ya tiene otra forma de gobernarse. El asunto de estos meses es si esas dos cosas pueden vivir juntas sin que una se coma a la otra.

Dorina Hernández Palomino, palenquera y exrepresentante a la Cámara, le dijo a Alerta Cartagena que la consulta previa está tocando justo eso: cómo articular los kuagros —la hermandad que se arma desde chiquitos y dura la vida— con la figura municipal. También el consejo de mayores, que concilia y pone orden a lo palenquero. Y el Consejo Comunitario, que ya es autoridad del pueblo.

Ella habla de un municipio especial por la cultura y por el patrimonio oral. Dice que, si sale, Palenque no dependería de Mahates, recibiría transferencia directa de la nación y podría elegir alcalde o alcaldesa y concejo «de acuerdo con nuestras dinámicas culturales». Eso es lo que ella plantea. No es un decreto. Es la conversación de la consulta.

El plazo que cuentan los medios es agosto y septiembre de 2026: trabajo en el pueblo, mirar impactos buenos y malos, y de ahí sacar una ordenanza que respete las normas del país y recoja las formas que han mantenido la lengua, la historia y la organización palenquera. Participan, según esa misma nota, el Ministerio del Interior, la Gobernación, el pueblo y el Comité Impulsor.

Ese mismo kuagro, este año, también fue cine: un corto palenquero se estrenó en el FICCI. Eso está en Cultura.

El Chakero no tiene acta de esas mesas. No vamos a inventar cómo quedó el dibujo del municipio. Si sabes de algo que pasó, cuéntanos.`,
    cita: {
      texto:
        "Estamos discutiendo hoy en la consulta previa y haciendo esa armazón de cómo articulamos los kuagros, cómo articulamos el consejo de mayores… tiene que tener también voz decisoria.",
      fuente: "Dorina Hernández Palomino, en Alerta Cartagena",
    },
    fuentes: [
      {
        texto: "Alerta Cartagena — entrevista a Dorina Hernández sobre gobernanza",
        url: "https://cartagena.alerta.com.co/quejodromo/san-basilio-de-palenque-a-un-paso-de-ser-el-nuevo-municipio-de-bolivar-248786",
      },
      {
        texto: "El Chakero — el corto Kuagro en el FICCI (Cultura)",
        url: "/cultura/corto-kuagro-ficci-65/",
      },
      {
        texto: "Foto: Dtokra, CC BY-SA 4.0 — Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/File:Lanzamiento_del_libro_de_cocina_en_Palenque,_Colombia._2014.JPG",
      },
    ],
  }),
  pieza({
    id: "a1e1c001-0003-4000-8000-000000000003",
    slug: "memorias-transmedia-yo-amo-palenque",
    titulo: "Muchachos de Palenque van a narrar la lengua en video",
    seccion: "educacion",
    formato: "noticia",
    fecha_publicacion: "2026-08-24T12:00:00-05:00",
    foto_url: "/semilla/calle-palenque-2007.jpg",
    pie_foto:
      "Patio de una escuela en San Basilio de Palenque, 1 de diciembre de 2007. Foto: Kosmel Bonfante / Wikimedia Commons (CC BY 3.0). Recorte 3:2. No es el taller de Memorias transmedia.",
    audio_url: null,
    duracion: null,
    entradilla:
      "Yo Amo Palenque entra con muchachos del pueblo a un proyecto de lenguas, patrimonio y territorios. La idea es que ellos produzcan el audio y el video, no que se los cuenten desde afuera.",
    cuerpo: `El 24 de agosto de 2026, Opinión Caribe contó que muchachos de Palenque van a producir audio y video sobre la lengua, en el proyecto Memorias transmedia.

Lo lidera la Escuela de Ciencias de la Comunicación y Diseño de la Universidad Sergio Arboleda, sede Santa Marta. Del lado de Palenque entra la organización Yo Amo Palenque. También está la Corporación Comunicación, Territorio y Resistencia, y el Resguardo Kogui Malayo Arhuaco de la Sierra Nevada de Santa Marta.

La plata sale del Portafolio de Concertación 2026 del Ministerio de las Culturas, las Artes y los Saberes. El eje, según la universidad, es formar a gente del pueblo para conservar lengua, memoria y la forma propia de narrar. Hablan de piezas audiovisuales, sonoras y transmedia. No publicaron un listado de talleres ni de qué días tocan en Palenque.

El Chakero no va a decir que ya hay estreno, ni cuántos muchachos están metidos, ni en qué casa se reúnen. Eso no salió en la nota. Lo que sí salió es que una organización del pueblo está en la alianza, y que el centro no es el visitante: es el muchacho que habla palenquero y va a manejar la cámara.

Si sabes de algo que pasó, cuéntanos.`,
    fuentes: [
      {
        texto: "Opinión Caribe, 24 ago 2026 — Memorias transmedia",
        url: "https://www.opinioncaribe.com/2026/08/24/la-sergio-impulsa-proyecto-para-preservar-lenguas-y-memorias-de-comunidades-del-caribe-colombiano/",
      },
      {
        texto: "Foto: Kosmel Bonfante, CC BY 3.0 — Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/File:San_basilio_de_palenque_-_panoramio_(2).jpg",
      },
    ],
  }),
  pieza({
    id: "a1e1c001-0004-4000-8000-000000000004",
    slug: "festival-tambores-octubre-2026",
    titulo: "El Festival de Tambores queda del 9 al 12 de octubre",
    seccion: "cultura",
    formato: "noticia",
    fecha_publicacion: "2026-09-14T12:20:00-05:00",
    foto_url: "/semilla/festival-tambores.jpg",
    pie_foto:
      "Tambores en el Festival de Tambores y Expresiones Culturales, en Palenque.",
    audio_url: null,
    duracion: null,
    entradilla:
      "La 41ª edición ya está en los calendarios: cuatro días en Palenque, como desde 2019. La programación menuda de este año todavía no la tenemos de la Corporación.",
    cuerpo: `El Festival de Tambores y Expresiones Culturales queda del viernes 9 al lunes 12 de octubre de 2026, en San Basilio de Palenque.

Varios calendarios —Cuándo Pasa, Agenda del Mar, el de fiestas de Colombia— ponen la 41ª edición en esos cuatro días. Lo organiza la Corporación Festival de Tambores de Palenque. El festival viene desde 1985. Hasta 2018 duraba tres días; desde 2019 son cuatro.

La noticia de este mes es la fecha, para que la diáspora y el pueblo marquen el almanaque.

El Chakero no va a copiar la lista genérica de ritmos ni a vender el pueblo como destino. Tampoco va a decir quién cierra, ni qué taller hay el sábado, ni cuánto vale una posada. Eso no lo hemos visto publicado por la Corporación en estas semanas.

Cuando la Corporación suelte la programación, aquí se cuenta con su nombre. Mientras tanto, la fecha queda en la agenda: 9 al 12 de octubre.

La foto es del palco: tambores, no un afiche de calendario.`,
    transparencia:
      "La foto es del Festival de Tambores en Palenque; no es de Wikimedia. La fecha sale de calendarios públicos. La Corporación no ha publicado la programación menuda de 2026.",
    fuentes: [
      {
        texto: "Cuándo Pasa — 41ª edición, 9 al 12 de octubre de 2026",
        url: "https://www.cuandopasa.com/index.php?v=v117761f",
      },
      {
        texto: "Agenda del Mar — mismas fechas en Palenque",
        url: "https://agendadelmar.com/etn/festival-de-tambores-y-expresiones-culturales/",
      },
      {
        texto: "Calendario de Colombia — ficha del Festival de Tambores",
        url: "https://www.calendariodecolombia.com/fiestas-nacionales/festival-de-tambores-en-palenque",
      },
      {
        texto: "Corporación Festival de Tambores de Palenque (Facebook)",
        url: "https://www.facebook.com/CorporacionFestivalDeTamboresDePalenque/",
      },
    ],
  }),
  pieza({
    id: "a1e1c001-0008-4000-8000-000000000008",
    slug: "partido-democrata-nacio-en-palenque",
    titulo: "El Partido Demócrata Colombiano hizo Convención Nacional en Palenque",
    seccion: "comunidad",
    formato: "noticia",
    fecha_publicacion: "2026-07-29T16:00:00-05:00",
    foto_url: "/semilla/plaza-benkos-2007.jpg",
    pie_foto:
      "Estatua de Benkos Biohó en la plaza de Palenque, 1 de diciembre de 2007. Foto: Kosmel Bonfante / Wikimedia Commons (CC BY 3.0). Recorte 3:2. No es la Convención Nacional de 2026.",
    audio_url: null,
    duracion: null,
    entradilla:
      "Fue el 29 de julio. El partido dijo que aquí nació y que de aquí no se ha ido. La personería 4033 se la entregaron en este pueblo, el 25 de agosto de 2022.",
    cuerpo: `El 29 de julio de 2026 el Partido Demócrata Colombiano reunió Convención Nacional en San Basilio de Palenque.

Vive La Noticia cubrió esa sala. El presidente y representante legal, Pedro Adán Torres Pérez —de Palenque, ya para entonces excongresista por la circunscripción especial afrodescendiente— les dijo a los delegados: «La historia no se inventa, la historia ya existe. El Partido Demócrata Colombiano nació en Palenque y nunca se ha ido de Palenque». Eso es lo que él afirma. El Chakero no va a contar los militantes de cada departamento: no los contamos.

La personería jurídica es la 4033 de 2022. Torres dijo en esa convención que vinieron los nueve magistrados del Consejo Nacional Electoral y se la entregaron aquí. OPICOL dató ese acto el 25 de agosto de 2022, en Palenque: primer partido de origen palenquero con personería. El CNE sigue listando esa resolución.

En junio, El Universal y Diario La Libertad escribieron que el partido había mantenido la personería en las legislativas y que tenía un senador y tres representantes. En Educación está la sala de cómputo —arranque de ORICA—, con el sueldo de la curul afro que Torres ocupó los días que faltaban.

En esa misma temporada de julio, el Congreso —por iniciativa de Torres, todavía en la curul— condecoró a Kid Pambelé. En Palenque, en esa convención, el pueblo también lo honró. Cultura tiene esa pieza.

En la convención Torres también dijo cifras de 2023 —87 alcaldes, 198 concejales—. Eso lo dijo él. Aquí no hay escrutinio propio. Si sabes de algo que pasó, cuéntanos.`,
    cita: {
      texto:
        "La historia no se inventa, la historia ya existe. El Partido Demócrata Colombiano nació en Palenque y nunca se ha ido de Palenque.",
      fuente: "Pedro Adán Torres Pérez, Convención Nacional del PDC en Palenque, 29 de julio de 2026, citado por Vive La Noticia",
    },
    transparencia: transparenciaFinanciador(
      "Esta noticia es sobre el partido que él preside.",
    ),
    fuentes: [
      {
        texto: "Vive La Noticia, 29 jul 2026 — Convención Nacional en Palenque",
        url: "https://vivelanoticia.com/2026/07/29/pedro-adan-torres-reivindica-el-origen-palenquero-del-partido-democrata-colombiano-durante-la-convencion-nacional/",
      },
      {
        texto: "OPICOL, 27 ago 2022 — personería entregada en Palenque el 25 de agosto",
        url: "https://www.opicol.com/2022/08/27/concejo-nacional-electoral-reconoce-personeria-juridica-al-partido-democrata-colombiano-en-san-basilio-de-palenque/",
      },
      {
        texto: "CNE — Partido Demócrata Colombiano, resolución 4033 de 2022",
        url: "https://www.cne.gov.co/index.php/partidos-movimientos-politicos-y-grupos-significativos/778",
      },
      {
        texto: "El Universal, 19 jun 2026 — personería y bancada en el Congreso",
        url: "https://www.eluniversal.com.co/politica/2026/06/18/el-representante-a-la-camara-que-destinara-todo-su-salario-a-una-sala-de-sistemas-en-palenque/",
      },
      {
        texto: "Diario La Libertad, 19 jun 2026 — mismo anuncio del sueldo y la bancada",
        url: "https://diariolalibertad.com/2026/06/19/pedro-adan-torres-llegara-a-la-camara-de-representantes-y-donara-el-100-de-su-salario-para-una-sala-de-sistemas-en-palenque/",
      },
      {
        texto: "El Chakero — la sala de cómputo, 15 sep 2026 (Educación)",
        url: "/educacion/kuagro-tech-inauguran-sala-computo/",
      },
      {
        texto: "El Chakero — ORICA, el centro que arranca con esa sala (Educación)",
        url: "/educacion/orica-centro-innovacion-palenque/",
      },
      {
        texto: "El Chakero — homenaje a Kid Pambelé en el Congreso y en Palenque (Cultura)",
        url: "/cultura/homenaje-kid-pambele-congreso-y-palenque/",
      },
      {
        texto: "Foto: Kosmel Bonfante, CC BY 3.0 — Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/File:San_basilio_de_palenque_-_panoramio_(1).jpg",
      },
    ],
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
      fuente: "Pedro Adán Torres Pérez, homenaje en el Congreso, julio de 2026, citado por El Universal, Diario La Libertad y El Heraldo",
    },
    transparencia: transparenciaFinanciador(
      "Esta noticia es sobre un homenaje que él impulsó en el Congreso.",
    ),
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
        texto: "El Chakero — Convención del partido en Palenque (Comunidad)",
        url: "/comunidad/partido-democrata-nacio-en-palenque/",
      },
      {
        texto: "El Chakero — perfil de Pedro Adán Torres (Gente)",
        url: "/gente/pedro-adan-torres-sala-sistemas/",
      },
    ],
  }),
  pieza({
    id: "a1e1c001-0009-4000-8000-000000000009",
    slug: "corto-kuagro-ficci-65",
    titulo: "El corto Kuagro habló palenquero en el FICCI",
    seccion: "cultura",
    formato: "noticia",
    fecha_publicacion: "2026-05-03T10:00:00-05:00",
    foto_url: "/semilla/baile-palenque.jpg",
    pie_foto:
      "Baile y tambor en Palenque. Foto: Victoria Sánchez Mércol / Wikimedia Commons (CC BY-SA 3.0). Recorte 3:2. No es un fotograma del corto Kuagro ni una función del FICCI.",
    audio_url: null,
    duracion: null,
    entradilla:
      "Doce minutos, niños del pueblo, lengua palenquera. El corto Kuagro se estrenó en el FICCI 65, en Cartagena. No es turismo. Es el kuagro en pantalla.",
    cuerpo: `El corto Kuagro, de 12 minutos, hablado en palenquero y con niños de Palenque, se proyectó en el FICCI 65, en Cartagena.

Lo dirige Diego Casseres, palenquero. Caracol, el 15 de marzo, contó que iba a la selección De Indias Cortometrajes. El Universal, el 3 de mayo, ya lo da por proyectado: emocionó en las funciones y cerró esa selección.

La ficha del festival pone tres funciones en Cartagena: 18 de abril en el Caribe Plaza y dos el 19, una de ellas en la Plaza de la Proclamación. ATPQ Studios. El Universal escribe el apellido Cáceres. Caracol y el FICCI, Casseres. Aquí se deja como en la ficha del festival, hasta que Casseres o ATPQ digan la grafía.

La historia es de niños que arman un kuagro: esa segunda familia que en Palenque no se suelta. El Universal recuerda lo que ya dijo la Unesco del espacio cultural: el kuagro trae derechos y deberes, y el trabajo y los duelos se cargan entre todos. El director dice que se rodó entre el 10 y el 12 de julio de 2025. La lengua de la sala fue palenquero.

No hay fotograma con licencia para poner aquí. La foto es baile de archivo. El Chakero no va a copiar la crítica de la función ni a decir cuánta gente de Palenque se fue para Cartagena: eso no salió contado. El dato es el corto, la lengua y el festival.

Si sabes de algo que pasó, cuéntanos.`,
    fuentes: [
      {
        texto: "Caracol Radio, 15 mar 2026 — selección De Indias, FICCI 65",
        url: "https://caracol.com.co/2026/03/15/kuagro-dirigido-por-diego-casseres-llevara-el-cine-joven-de-palenque-al-ficci-65/",
      },
      {
        texto: "El Universal, 3 may 2026 — el corto ya se proyectó en el FICCI",
        url: "https://www.eluniversal.com.co/cultural/2026/05/03/orgullo-colombiano-asi-nacio-kuagro-la-pelicula-que-celebra-la-amistad-en-palenque/",
      },
      {
        texto: "FICCI 65 — ficha de Kuagro, funciones del 18 y 19 de abril",
        url: "https://www.ficcifestival.com/proyecciones/kuagro",
      },
      {
        texto: "Foto: Victoria Sánchez Mércol, CC BY-SA 3.0 — Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/File:Champeta_palenque.jpg",
      },
    ],
  }),
  pieza({
    id: "a1e1c001-0010-4000-8000-000000000010",
    slug: "pdc-cara-de-palenque-en-el-pais",
    titulo: "El Partido Demócrata Colombiano tuvo un senador y tres representantes",
    seccion: "territorio",
    formato: "noticia",
    fecha_publicacion: "2026-09-15T10:00:00-05:00",
    foto_url: "/semilla/pedro-adan-torres.jpg",
    pie_foto: "Pedro Adán Torres.",
    audio_url: null,
    duracion: null,
    entradilla:
      "Lo escribieron El Universal y Diario La Libertad en junio. Pedro Adán Torres, excongresista por la circunscripción afro, destinó el sueldo a la sala de la escuela. La curul cerró el 20 de julio.",
    cuerpo: `En junio de 2026, El Universal y Diario La Libertad escribieron que el Partido Demócrata Colombiano había mantenido la personería en las legislativas y que tenía un senador y tres representantes.

El partido —personería 4033, entregada en Palenque en 2022— se declara cara palenquera en la política nacional. Primer partido de origen palenquero, según el CNE y según ellos. El Chakero no va a inventar los nombres de esa bancada ni a decir que Pedro Adán Torres sigue sentado en la Cámara.

Torres ocupó, los días que faltaban, la curul de la circunscripción especial afrodescendiente que dejó Ana Rogelia Monsalve. El Universal habló de los días que quedaban del periodo. Poder Legislativo dató esa curul afro hasta el 20 de julio de 2026. Pasada esa fecha, Torres es excongresista. Sigue siendo presidente y representante legal del partido.

El 15 de septiembre se inauguró la sala de cómputo de la escuela Benkos Biohó, con el 100 % del sueldo que él prometió en junio. Esa sala es el arranque de ORICA. Educación tiene la nota del centro. Gente tiene el perfil.

La Convención de julio, en Palenque, está en Comunidad. Si sabes de algo que pasó, cuéntanos.`,
    transparencia: transparenciaFinanciador(
      "Esta noticia es sobre el partido que él preside y la curul que ocupó.",
    ),
    fuentes: [
      {
        texto: "El Universal, 19 jun 2026 — periodo que faltaba, sueldo y bancada",
        url: "https://www.eluniversal.com.co/politica/2026/06/18/el-representante-a-la-camara-que-destinara-todo-su-salario-a-una-sala-de-sistemas-en-palenque/",
      },
      {
        texto: "Diario La Libertad, 19 jun 2026 — devolver al pueblo y personería",
        url: "https://diariolalibertad.com/2026/06/19/pedro-adan-torres-llegara-a-la-camara-de-representantes-y-donara-el-100-de-su-salario-para-una-sala-de-sistemas-en-palenque/",
      },
      {
        texto: "Cámara de Representantes — Monsalve, circunscripción afro",
        url: "https://www.camara.gov.co/representantes/ana-rogelia-monsalve-alvarez/",
      },
      {
        texto: "Poder Legislativo / Cámara, 17 feb 2026 — esa curul afro hasta el 20 de julio",
        url: "https://poderlegislativo.camara.gov.co/2026/02/17/las-comunidades-afrodescendientes-en-el-congreso-una-historia-gris-hasta-ahora/",
      },
      {
        texto: "El Chakero — Convención del partido en Palenque (Comunidad)",
        url: "/comunidad/partido-democrata-nacio-en-palenque/",
      },
      {
        texto: "El Chakero — perfil de Pedro Adán Torres (Gente)",
        url: "/gente/pedro-adan-torres-sala-sistemas/",
      },
      {
        texto: "El Chakero — ORICA, el centro que arranca con la sala (Educación)",
        url: "/educacion/orica-centro-innovacion-palenque/",
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
    transparencia: transparenciaFinanciador(
      "Esta pieza es un perfil de quien financia El Chakero.",
    ),
    fuentes: [
      {
        texto: "El Chakero — Convención del partido en Palenque (Comunidad)",
        url: "/comunidad/partido-democrata-nacio-en-palenque/",
      },
      {
        texto: "El Chakero — el partido en el Congreso (Territorio)",
        url: "/territorio/pdc-cara-de-palenque-en-el-pais/",
      },
      {
        texto: "El Chakero, 15 sep 2026 — inauguración de la sala (Educación)",
        url: "/educacion/kuagro-tech-inauguran-sala-computo/",
      },
      {
        texto: "El Chakero — ORICA, el centro que arranca con esa sala (Educación)",
        url: "/educacion/orica-centro-innovacion-palenque/",
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
