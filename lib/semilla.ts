import { LLAMADO_PREGON } from "./site";
import type { EventoAgenda, PiezaPublica } from "./supabase/tipos";

/**
 * Piezas en código cuando la base no tiene publicadas.
 * Mismo shape que una `pieza` publicada.
 * Fotos en `public/semilla/`: Wikimedia Commons (recorte 3:2), salvo la sala
 * de cómputo y la del Festival de Tambores, que son del acto. Créditos en pie_foto.
 */
const AUTOR = { nombre: "Redacción El Chakero" };

const TRANSPARENCIA_SEMILLA =
  "El Chakero no estuvo en esas salas: la pieza se armó con lo que publicaron otros medios, citados al pie. Las fotos son de Wikimedia Commons, recortadas a 3:2; no son del hecho que se cuenta. Si usted sí estuvo y algo quedó mal, mándelo por el canal.";

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
    titulo: "Este martes inauguran la sala de cómputo: 25 portátiles",
    seccion: "educacion",
    formato: "noticia",
    fecha_publicacion: "2026-09-15T18:00:00-05:00",
    foto_url: "/semilla/sala-computo-inauguracion.jpg",
    pie_foto:
      "La sala de cómputo el día de la inauguración, 15 de septiembre de 2026.",
    audio_url: null,
    duracion: null,
    entradilla:
      "El 15 de septiembre de 2026 se inaugura la sala que donó Pedro Adán Torres, excongresista por la circunscripción afro: 25 portátiles, UPS y reguladores. No es un regalo suelto: es el arranque de ORICA, con Fundación Código Abierto y Kuagro Tech.",
    cuerpo: `${LLAMADO_PREGON}: este martes 15 de septiembre se inaugura la sala de cómputo.

La donó Pedro Adán Torres Pérez, palenquero, excongresista por la circunscripción especial afrodescendiente. En junio, cuando ocupó —los días que faltaban del periodo— la curul que dejó Ana Rogelia Monsalve, dijo que el 100 % del sueldo de la Cámara iba para una sala de sistemas en la Institución Etnoeducativa Técnica Agropecuaria Benkos Biohó. Ese martes la sala se abre: 25 portátiles. Para que no se las coma el voltaje, van con UPS y reguladores.

No es un regalo de una vez y ya. Esa sala es el comienzo de ORICA, un centro de innovación tecnológica. Lo impulsa Torres. Lo acompaña la Fundación Código Abierto. El apuntar es grande: que el Caribe se vuelva epicentro de tecnología y que Palenque sea territorio tecnológico. Aquí no hay presupuesto ni lista de invitados. El dato es el nombre, el arranque y con quién va.

Eso es el ejemplo. El Partido Demócrata Colombiano —el que él fundó y preside, el que se declara nacido aquí— pone la cara por Palenque en el país. Se ve. Y lo que se gana afuera, si sirve, se vuelve al territorio. Aquí se volvió en máquinas, en la escuela, y en el primer piso de ORICA.

También hay una charla. No vamos a inventar la hora ni quién habla: eso no nos lo pasaron. Si la escuela, Kuagro Tech u ORICA manda el aviso fino, aquí se completa.

La donación entra en el programa Kuagro Tech, con la Fundación Código Abierto. Lo que sigue no es solo estrenar máquinas: van a haber actividades para que los muchachos aprendan a programar y a usar inteligencia artificial. Eso es lo que hay. Ni lista de talleres ni cupos. El dato es el programa y con quién va.

La foto es de la sala ese martes, con el listón todavía puesto. Retrato de Torres no hay con licencia.`,
    transparencia:
      "Dato de la redacción: inauguración el 15 de septiembre de 2026, 25 portátiles, UPS y reguladores, charla, programa Kuagro Tech con Fundación Código Abierto. La sala es el arranque de ORICA, centro de innovación tecnológica impulsado por Torres, con el fin de que el Caribe sea epicentro tecnológico y Palenque territorio tecnológico. No hay otra fecha, ni presupuesto, ni lista de invitados. Torres ocupó la curul afro que dejó Monsalve en los días que faltaban del periodo. La foto es de la sala ese día.",
    fuentes: [
      {
        texto: "El anuncio de junio, cuando Torres prometió el sueldo — perfil en Gente",
        url: "/gente/pedro-adan-torres-sala-sistemas/",
      },
      {
        texto: "ORICA: la sala es el arranque, no el cierre (Educación)",
        url: "/educacion/orica-centro-innovacion-palenque/",
      },
    ],
  }),
  pieza({
    id: "a1e1c001-0011-4000-8000-000000000011",
    slug: "orica-centro-innovacion-palenque",
    titulo: "ORICA: la sala de cómputo es el arranque, no el cierre",
    seccion: "educacion",
    formato: "noticia",
    fecha_publicacion: "2026-09-15T14:00:00-05:00",
    foto_url: "/semilla/sala-computo-inauguracion.jpg",
    pie_foto:
      "La sala de cómputo el día de la inauguración, 15 de septiembre de 2026. Ahí arranca ORICA.",
    audio_url: null,
    duracion: null,
    entradilla:
      "ORICA es el centro de innovación tecnológica. Lo impulsa Pedro Adán Torres, con la Fundación Código Abierto. La sala de 25 portátiles —sueldo de la curul, Kuagro Tech— es el comienzo: Palenque territorio tecnológico, el Caribe epicentro.",
    cuerpo: `${LLAMADO_PREGON}: la sala no se queda en 25 portátiles y un listón. Ese martes 15 de septiembre es el primer piso de ORICA, un centro de innovación tecnológica en Palenque.

Lo impulsa Pedro Adán Torres Pérez —el palenquero de la curul afro, el del sueldo vuelto a Benkos Biohó—. Lo acompaña la Fundación Código Abierto. El programa que ya se nombró, Kuagro Tech, entra en ese mismo dibujo: muchachos aprendiendo a programar y a usar inteligencia artificial. No hay lista de talleres. No hay plata publicada. No hay fecha de un segundo acto. El dato es el nombre y el rumbo.

El rumbo, el que se plantea, es este: que la región Caribe se vuelva epicentro de tecnología y que Palenque sea territorio tecnológico. Eso no se inventa como hecho cumplido. Se cuenta como el apuntar del centro. Si queda corto o si se agranda, se verá en el pueblo.

La inauguración que sí hay es la de la sala: 25 portátiles, UPS y reguladores, una charla. Educación tiene esa pieza. Gente tiene a Torres. Aquí se dice una sola cosa más: no es un regalo suelto. Es el arranque de ORICA.`,
    transparencia:
      "Dato de la redacción: ORICA es el nombre del centro de innovación tecnológica; la sala del 15 de septiembre de 2026 es el arranque; lo impulsa Torres, con Fundación Código Abierto; el fin planteado es el Caribe como epicentro tecnológico y Palenque como territorio tecnológico. No hay presupuesto, ni invitados, ni otra fecha. Foto de la sala ese día.",
    fuentes: [
      {
        texto: "El Chakero — inauguración de la sala, 15 sep 2026 (Educación)",
        url: "/educacion/kuagro-tech-inauguran-sala-computo/",
      },
      {
        texto: "El Chakero — perfil de Pedro Adán Torres (Gente)",
        url: "/gente/pedro-adan-torres-sala-sistemas/",
      },
    ],
  }),
  pieza({
    id: "a1e1c001-0001-4000-8000-000000000001",
    slug: "consulta-previa-municipio",
    titulo: "Palenque ya sentó la mesa para ser municipio",
    seccion: "territorio",
    formato: "noticia",
    fecha_publicacion: "2026-09-14T18:00:00-05:00",
    foto_url: "/semilla/pueblo-palenque-2007.jpg",
    pie_foto:
      "Arroyo en San Basilio de Palenque, 1 de diciembre de 2007. Foto: Kosmel Bonfante / Wikimedia Commons (CC BY 3.0). Recorte 3:2. No es la jornada de consulta previa.",
    audio_url: null,
    duracion: null,
    entradilla:
      "El 5 de agosto se juntaron más de 200 en la Casa de la Cultura. Agosto y septiembre son los meses de la consulta previa. Todavía no hay alcaldía. Hay mesa.",
    cuerpo: `${LLAMADO_PREGON}: no es que ya seamos municipio. Es que por fin se sentó la mesa.

El 5 de agosto, en la Casa de la Cultura, la Gobernación de Bolívar abrió la etapa que llama Preconsulta y Apertura. Dicen que fueron más de doscientos: Consejo Comunitario, autoridades étnicas, organizaciones, gente del departamento y de la nación. El proyecto de ordenanza busca crear el municipio de San Basilio de Palenque y separarlo, en lo administrativo, de Mahates.

La secretaria de Planeación, Susana Puerta, dijo que esa primera reunión era para la ruta: metodología, cronograma y los papeles que pide la ley antes de llevar el proyecto a la Asamblea Departamental. El gobernador Yamil Arana Padauí habló de justicia histórica y de que cada paso tiene que ir con consulta y con la ley.

Eso no nació ese día. En noviembre de 2025 la consulta popular —el voto de sí o no— se cayó. La Gobernación misma reconoció que no se podía votar sin terminar la consulta previa con el pueblo palenquero. Hubo falta de plata y el Ministerio del Interior no tenía cronograma.

Antes de la mesa de agosto, el Comité Promotor Palenque Municipio llamó a asamblea el domingo 5 de julio, a las 10 de la mañana, en la misma Casa de la Cultura. Caracol lo contó el 30 de junio: después del calendario electoral, el comité quería socializar el proyecto de ordenanza con el pueblo y con la diáspora de Cartagena y Barranquilla. Por eso este agosto pesa: no es otro anuncio. Es el trámite que faltaba.

La Ley 2379 de 2024, que sacó la bancada afrocolombiana, es el marco. Palenque sigue siendo corregimiento de Mahates. Lo que viene, si la consulta cierra en agosto y septiembre, es una propuesta de ordenanza. Esa ordenanza la debate y la aprueba —o no— la Asamblea de Bolívar. Hasta ahí, no hay alcalde ni concejo propios.

Manuel Cáceres Reyes, del Comité Promunicipio, lo dijo claro: toca pesar lo bueno y lo malo. Keinel Joel Cimarra Cassiani, del Consejo Comunitario Makankamaná, dijo que después de dos años de trabas se ve una luz. Esas dos voces no son lo mismo. Una pide medir el golpe. La otra no quiere que se enfríe otra vez.

El Chakero no estuvo en esa sala. Lo que hay aquí es lo que salió en El Universal, Caracol, Primer Tiempo y Alerta Cartagena. Si alguien que sí estaba quiere completar nombres, números o lo que se acordó del cronograma, el canal está abierto.`,
    fuentes: [
      {
        texto: "El Universal, 5 ago 2026 — cronograma y primera jornada",
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
    titulo: "El municipio tiene que dejarle voz al kuagro",
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
    cuerpo: `Un municipio colombiano trae alcalde, concejo, personería. Palenque ya tiene otra forma de gobernarse. El asunto de estos meses es si esas dos cosas pueden vivir juntas sin que una se coma a la otra.

Dorina Hernández Palomino, palenquera y exrepresentante a la Cámara, le dijo a Alerta Cartagena que la consulta previa está tocando justo eso: cómo articular los kuagros —la hermandad que se arma desde chiquitos y dura la vida— con la figura municipal. También el consejo de mayores, que concilia y pone orden a lo palenquero. Y el Consejo Comunitario, que ya es autoridad del territorio.

Ella habla de un municipio especial por la cultura y por el patrimonio oral. Dice que, si sale, Palenque no dependería de Mahates, recibiría transferencia directa de la nación y podría elegir alcalde o alcaldesa y concejo «de acuerdo con nuestras dinámicas culturales». Eso es lo que ella plantea. No es un decreto. Es la conversación de la consulta.

El plazo que cuentan los medios es agosto y septiembre de 2026: trabajo en el territorio, mirar impactos buenos y malos, y de ahí sacar una ordenanza que respete las normas del país y recoja las formas que han mantenido la lengua, la historia y la organización palenquera. Participan, según esa misma nota, el Ministerio del Interior, la Gobernación, la comunidad y el Comité Impulsor.

Ese mismo kuagro, este año, también fue cine: un corto palenquero se estrenó en el FICCI. Eso está en Cultura. Aquí el asunto es otro: si Palenque pasa a municipio y el kuagro y los mayores quedan de adorno, no es el municipio que se está discutiendo.

El Chakero no tiene acta de esas mesas. No vamos a inventar cómo quedó el dibujo del «municipio híbrido».`,
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
    titulo: "Jóvenes de Palenque van a narrar la lengua en video",
    seccion: "educacion",
    formato: "noticia",
    fecha_publicacion: "2026-08-24T12:00:00-05:00",
    foto_url: "/semilla/calle-palenque-2007.jpg",
    pie_foto:
      "Patio de una escuela en San Basilio de Palenque, 1 de diciembre de 2007. Foto: Kosmel Bonfante / Wikimedia Commons (CC BY 3.0). Recorte 3:2. No es el taller de Memorias transmedia.",
    audio_url: null,
    duracion: null,
    entradilla:
      "Yo Amo Palenque entra con jóvenes del pueblo a un proyecto de lenguas, patrimonio y territorios. La idea es que ellos produzcan el audio y el video, no que se los cuenten desde afuera.",
    cuerpo: `El 24 de agosto Opinión Caribe contó un proyecto que ya está andando: «Memorias transmedia. Lenguas, patrimonio y territorios». Lo lidera la Escuela de Ciencias de la Comunicación y Diseño de la Universidad Sergio Arboleda, sede Santa Marta.

Del lado de Palenque entra la organización Yo Amo Palenque. También está la Corporación Comunicación, Territorio y Resistencia, y el Resguardo Kogui Malayo Arhuaco de la Sierra Nevada de Santa Marta. O sea: jóvenes palenqueros y jóvenes de la Sierra, cada quien con su lengua y su territorio, aprendiendo a grabar y a contar.

La plata sale del Portafolio de Concertación 2026 del Ministerio de las Culturas, las Artes y los Saberes. El eje, según la universidad, es formar a esa gente del territorio para conservar lengua, memoria y la forma propia de narrar. Hablan de piezas audiovisuales, sonoras y transmedia. No publicaron todavía un listado de talleres ni de qué días tocan en Palenque.

Eso último importa. El Chakero no va a decir que ya hay estreno, ni cuántos muchachos están metidos, ni en qué casa se reúnen. Eso no salió en la nota. Lo que sí salió —y por eso va aquí y no en turismo— es que una organización del pueblo está en la alianza, y que el centro no es el visitante: es el joven que habla palenquero y va a manejar la cámara.

Si Yo Amo Palenque o alguien del proceso quiere pasar fechas, nombres y dónde se ve el trabajo, esta redacción lo publica con su voz.`,
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
    cuerpo: `${LLAMADO_PREGON}: el tambor de octubre ya tiene números en el almanaque. Varios calendarios —Cuándo Pasa, Agenda del Mar, el de fiestas de Colombia— ponen la 41ª edición del Festival de Tambores y Expresiones Culturales del viernes 9 al lunes 12 de octubre de 2026, en San Basilio de Palenque.

Lo organiza, como siempre, la Corporación Festival de Tambores de Palenque. El festival viene desde 1985. Hasta 2018 duraba tres días; desde 2019 son cuatro. Eso no es noticia nueva. La noticia de este mes es la fecha de esta edición, que ya circula para que la diáspora y el pueblo marquen el calendario.

No vamos a copiar la lista genérica de ritmos ni a vender el pueblo como destino. Tampoco vamos a decir quién cierra, ni qué taller hay el sábado, ni cuánto vale una posada. Eso no lo hemos visto publicado por la Corporación en estas semanas.

Cuando la Corporación suelte la programación, aquí se cuenta con su nombre. Mientras tanto, la fecha queda en la agenda: 9 al 12 de octubre. El resto, cuando suene en el pueblo.

La foto es del palco: tambores, no un afiche de calendario.`,
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
    titulo: "El Demócrata Colombiano pone la cara de Palenque y no se ha ido",
    seccion: "comunidad",
    formato: "noticia",
    fecha_publicacion: "2026-07-29T16:00:00-05:00",
    foto_url: "/semilla/plaza-benkos-2007.jpg",
    pie_foto:
      "Estatua de Benkos Biohó en la plaza de Palenque, 1 de diciembre de 2007. Foto: Kosmel Bonfante / Wikimedia Commons (CC BY 3.0). Recorte 3:2. No es la Convención Nacional de 2026.",
    audio_url: null,
    duracion: null,
    entradilla:
      "A fines de julio el Partido Demócrata Colombiano hizo Convención Nacional en Palenque. Dijo que aquí nació, que aquí pone la cara y que de aquí no se ha ido. La personería 4033 se la entregaron en este pueblo, en 2022.",
    cuerpo: `${LLAMADO_PREGON}: no es un perfil. Es el partido. El 29 de julio de 2026 el Partido Demócrata Colombiano reunió Convención Nacional en San Basilio de Palenque. Vive La Noticia cubrió esa sala.

El presidente y representante legal, Pedro Adán Torres Pérez —palenquero, ya para entonces excongresista por la circunscripción especial afrodescendiente— les dijo a los delegados: «La historia no se inventa, la historia ya existe. El Partido Demócrata Colombiano nació en Palenque y nunca se ha ido de Palenque». Eso es lo que él afirma. El Chakero no va a contar los militantes de cada departamento: no los contamos.

La personería jurídica es la 4033 de 2022. Torres dijo en esa convención que vinieron los nueve magistrados del Consejo Nacional Electoral y se la entregaron aquí. OPICOL dató ese acto el 25 de agosto de 2022, en Palenque: primer partido de origen palenquero con personería. El CNE sigue listando esa resolución.

Eso es poner la cara. Un partido que se declara del pueblo, con personería entregada en la plaza de Benkos, y que en 2026 volvió a convocar aquí. En junio, El Universal y Diario La Libertad escribieron que el partido había mantenido la personería en las legislativas y que tenía un senador y tres representantes: verse en el país. Lo que se gana allá, si sirve, se vuelve. El ejemplo está en Educación: la sala de cómputo —arranque de ORICA—, con el sueldo de la curul afro que Torres ocupó los días que faltaban.

En la convención Torres también dijo cifras de 2023 —87 alcaldes, 198 concejales—. Eso lo dijo él. Aquí no hay escrutinio propio. Si el acta o el padrón dicen otra cosa, el canal está abierto.`,
    cita: {
      texto:
        "La historia no se inventa, la historia ya existe. El Partido Demócrata Colombiano nació en Palenque y nunca se ha ido de Palenque.",
      fuente: "Pedro Adán Torres Pérez, Convención Nacional del PDC en Palenque, 29 de julio de 2026, citado por Vive La Noticia",
    },
    transparencia:
      "Pieza de semilla. La Convención la cubrió Vive La Noticia el 29 de julio de 2026. La entrega de la personería 4033 en Palenque, 25 de agosto de 2022, la dató OPICOL. El listado del CNE confirma esa resolución. Las cifras de alcaldes y concejales son las que Torres dijo en esa sala, no un conteo de esta redacción. Foto de archivo, no del acto.",
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
        texto: "El Chakero — la sala de cómputo, lo que volvió al pueblo (Educación)",
        url: "/educacion/kuagro-tech-inauguran-sala-computo/",
      },
      {
        texto: "El Chakero — ORICA, el centro que arranca con esa sala (Educación)",
        url: "/educacion/orica-centro-innovacion-palenque/",
      },
      {
        texto: "Foto: Kosmel Bonfante, CC BY 3.0 — Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/File:San_basilio_de_palenque_-_panoramio_(1).jpg",
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
    cuerpo: `El kuagro no es solo el asunto de la consulta previa. Este año también fue cine. Caracol, el 15 de marzo, contó que el corto Kuagro —12 minutos, hablado en palenquero, con niños del territorio— iba a la selección De Indias Cortometrajes del FICCI 65. Lo dirige Diego Casseres, palenquero. El Universal, el 3 de mayo, ya lo da por proyectado: emocionó en las funciones y cerró esa selección.

La ficha del festival pone tres funciones en Cartagena: 18 de abril en el Caribe Plaza y dos el 19, una de ellas en la Plaza de la Proclamación. ATPQ Studios. El Universal escribe el apellido Cáceres. Caracol y el FICCI, Casseres. Aquí se deja como en la ficha del festival, hasta que el equipo diga la grafía.

La historia es de niños que arman un kuagro: esa segunda familia que en Palenque no se suelta. El Universal recuerda lo que ya dijo la Unesco del espacio cultural: el kuagro trae derechos y deberes, y el trabajo y los duelos se cargan entre todos. Eso no es dato nuevo. Lo nuevo es que un equipo del pueblo lo rodó —el director dice que fue entre el 10 y el 12 de julio de 2025— y que la lengua de la sala fue palenquero.

No hay fotograma con licencia para poner aquí. La foto es baile de archivo. Tampoco vamos a copiar la crítica de la función ni a decir cuánta gente de Palenque se fue para Cartagena: eso no salió contado. El dato es el corto, la lengua y el festival.

El Chakero no hace ficha de cineasta. Si ATPQ o la Corporación del Festival de Tambores quieren pasar una función en el pueblo, se anuncia con su nombre.`,
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
    titulo: "Verse en Colombia y volver al pueblo: eso pide Palenque al partido",
    seccion: "territorio",
    formato: "noticia",
    fecha_publicacion: "2026-09-15T10:00:00-05:00",
    foto_url: "/semilla/pueblo-palenque-2007.jpg",
    pie_foto:
      "Arroyo en San Basilio de Palenque, 1 de diciembre de 2007. Foto: Kosmel Bonfante / Wikimedia Commons (CC BY 3.0). Recorte 3:2. No es un acto del Partido Demócrata Colombiano.",
    audio_url: null,
    duracion: null,
    entradilla:
      "El Demócrata Colombiano se declara nacido aquí y se ve en el Congreso. Pedro Adán Torres, excongresista por la circunscripción afro, devolvió el sueldo en una sala. Ese es el trato: verse afuera y volver.",
    cuerpo: `${LLAMADO_PREGON}: Palenque no manda gente al país para que se quede colgada en Bogotá. El Partido Demócrata Colombiano —personería 4033, entregada en este pueblo en 2022— dice que es la cara palenquera en la política nacional. Primer partido de origen palenquero, según el CNE y según ellos.

Verse importa. En junio de 2026, El Universal y Diario La Libertad escribieron que el partido había mantenido la personería en las legislativas y que tenía un senador y tres representantes. Eso es estar en el mapa. El Chakero no va a inventar los nombres de esa bancada ni a decir que Torres sigue sentado ahí.

Torres ocupó, los días que faltaban, la curul de la circunscripción especial afrodescendiente que dejó Ana Rogelia Monsalve. El Universal habló de los días que quedaban del periodo. Poder Legislativo dató esa curul afro hasta el 20 de julio de 2026. Pasada esa fecha, Torres es excongresista. Sigue siendo presidente y representante legal del partido.

Lo que se gana afuera, si sirve, se vuelve. El ejemplo no es un discurso: es la sala de cómputo de Benkos Biohó, inaugurada el 15 de septiembre, con el 100 % del sueldo que él prometió en junio. Esa sala es el arranque de ORICA, no un regalo suelto. Educación tiene el inventario y la nota del centro. Gente tiene el perfil.

La Convención de julio, en Palenque, es la otra pata: el partido dijo que nació aquí y que no se ha ido. Comunidad tiene esa sala. Aquí el dato es el trato con el territorio: cara afuera, plata y máquinas adentro. Si el partido o la escuela dicen que el dibujo es otro, el canal está abierto.`,
    transparencia:
      "Pieza de semilla. La bancada (un senador y tres representantes) es la que publicaron El Universal y Diario La Libertad en junio de 2026, no un conteo de esta redacción. La curul afro y el cierre del 20 de julio salen de la ficha de Monsalve y de Poder Legislativo; Torres la ocupó por reemplazo, según El Universal. Foto de archivo.",
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
      {
        texto: "Foto: Kosmel Bonfante, CC BY 3.0 — Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/File:San_basilio_de_palenque_-_panoramio_(3).jpg",
      },
    ],
  }),
  pieza({
    id: "a1e1c001-0006-4000-8000-000000000006",
    slug: "pedro-adan-torres-sala-sistemas",
    titulo: "Pedro Adán Torres, moná ri Palenge: la cara que volvió con la sala",
    seccion: "gente",
    formato: "perfil",
    fecha_publicacion: "2026-09-15T16:00:00-05:00",
    foto_url: "/semilla/estatua-benkos-wehwalt.jpg",
    pie_foto:
      "Pedestal de Benkos Biohó en la plaza de Palenque, 5 de febrero de 2009. Foto: Wehwalt / Wikimedia Commons (CC BY-SA 3.0). Recorte 3:2. No es retrato de Torres ni la sala de cómputo.",
    audio_url: null,
    duracion: null,
    entradilla:
      "Moná ri Palenge: hijo de Palenque. Excongresista por la circunscripción afro. El primer perfil de esta casa. La sala de cómputo —arranque de ORICA— es lo que volvió al pueblo.",
    cuerpo: `${LLAMADO_PREGON}: este es el primer perfil de Gente. Una persona de Palenque, con nombre. Empieza Pedro Adán Torres Pérez.

Moná ri Palenge. Hijo de Palenque. En palenquero, hijo es moná y el pueblo es Palenge: así lo enseña la cartilla Lengua ri Palenge Gente. Él lo dijo en castellano, en junio, cuando llegó a la Cámara: «Soy hijo de Palenque». No vamos a inventar que lo cantó en lengua. La frase cabe porque es la suya.

Abogado, líder del pueblo, fundador, presidente y representante legal del Partido Demócrata Colombiano —el que se declara primer partido de origen palenquero. En junio de 2026 ocupó, los días que faltaban del periodo, la curul de la circunscripción especial afrodescendiente que dejó Ana Rogelia Monsalve Álvarez. Iba segundo en la lista. El Universal lo dató el 19 de junio. El Afro Bogotano dice que asumió el miércoles de esa semana. Esa legislatura cerró el 20 de julio. Hoy es excongresista. El partido, en cambio, se quedó a la vista: El Universal y Diario La Libertad escribieron en junio que tenía un senador y tres representantes.

Ese mismo junio puso el sueldo sobre la mesa: el 100 % del salario de representante, dijo, iba para adecuar y dotar una sala de sistemas en la Institución Etnoeducativa Técnica Agropecuaria Benkos Biohó. Que las familias se esfuerzan y que a los jóvenes de aquí se les niegan cosas que en otros lados parecen del diario. Prometió cuentas públicas: compras, plata, resultados, con la comunidad educativa y las directivas. Diario La Libertad recogió también esto: que el liderazgo tiene sentido cuando se pone al servicio, y que servir pesa más que el puesto.

Ahí está el ángulo. El partido pone la cara por Palenque. Se ve en Colombia. Y lo que se gana afuera se vuelve al territorio. La sala —inaugurada el 15 de septiembre del 2026, 25 portátiles, UPS, reguladores, Kuagro Tech— no es un regalo suelto: es el arranque de ORICA, el centro de innovación tecnológica, con la Fundación Código Abierto. El apuntar: Caribe como epicentro de tecnología, Palenque como territorio tecnológico. El detalle de ORICA está en Educación.

En julio, ya fuera de la curul, el partido hizo Convención Nacional en Palenque. Dijo que nació aquí y que no se ha ido. El detalle está en Comunidad. El de la sala, en Educación.

No hay retrato suyo con licencia clara para usar. La foto es la plaza: Benkos Biohó, el nombre de la escuela.`,
    cita: {
      texto:
        "San Basilio de Palenque le ha entregado mucho a Colombia, historia, libertad, resistencia y patrimonio cultural. Hoy quiero devolverle a mi tierra una pequeña parte de todo lo que me ha dado.",
      fuente: "Pedro Adán Torres Pérez, citado por El Universal y El Afro Bogotano, junio de 2026",
    },
    fuentes: [
      {
        texto: "El Chakero — el partido pone la cara de Palenque (Comunidad)",
        url: "/comunidad/partido-democrata-nacio-en-palenque/",
      },
      {
        texto: "El Chakero — verse en el país y volver al pueblo (Territorio)",
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
      {
        texto: "Lengua ri Palenge Gente (ICESI) — moná: hijo/a",
        url: "https://www.icesi.edu.co/papeldecolgadura/images/pdc/vol15/PDC_15_17.pdf",
      },
      {
        texto: "Foto: Wehwalt, CC BY-SA 3.0 — Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/File:Palenque1.jpg",
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
