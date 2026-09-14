import { LLAMADO_PREGON } from "./site";
import type { EventoAgenda, PiezaPublica } from "./supabase/tipos";

/**
 * Piezas en código cuando la base no tiene publicadas.
 * Mismo shape que una `pieza` publicada.
 * Fotos en `public/semilla/`: Wikimedia Commons (recorte 3:2) salvo la de la
 * inauguración de la sala, que es del acto. Créditos en pie_foto.
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
      "El 15 de septiembre de 2026 se inaugura la sala que donó Pedro Adán Torres: 25 portátiles, UPS y reguladores. Hay charla. Entra en el programa Kuagro Tech, con Fundación Código Abierto.",
    cuerpo: `${LLAMADO_PREGON}: este martes 15 de septiembre se inaugura la sala de cómputo.

La donó Pedro Adán Torres. En junio, cuando llegó a la Cámara, dijo que el sueldo iba para una sala de sistemas en la Institución Etnoeducativa Técnica Agropecuaria Benkos Biohó. Ese martes la sala se abre: 25 portátiles. Para que no se las coma el voltaje, van con UPS y reguladores.

También hay una charla. No vamos a inventar la hora ni quién habla: eso no nos lo pasaron. Si la escuela o Kuagro Tech manda el aviso fino, aquí se completa.

La donación entra en el programa Kuagro Tech, con la Fundación Código Abierto. Lo que sigue no es solo estrenar máquinas: van a haber actividades para que los muchachos aprendan a programar y a usar inteligencia artificial. Eso es lo que hay. Ni lista de talleres ni cupos. El dato es el programa y con quién va.

La foto es de la sala ese martes, con el listón todavía puesto. Retrato de Torres no hay con licencia.`,
    transparencia:
      "Dato de la redacción: inauguración el 15 de septiembre de 2026, 25 portátiles, UPS y reguladores, charla, programa Kuagro Tech con Fundación Código Abierto. La foto es de la sala ese día. Si el inventario o el aviso de la charla quedó distinto, mándelo por el canal.",
    fuentes: [
      {
        texto: "El anuncio de junio, cuando Torres prometió el sueldo — perfil en Gente",
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

El Chakero no tiene acta de esas mesas. No vamos a inventar cómo quedó el dibujo del «municipio híbrido». Lo que sí se puede decir, porque lo dijeron en voz alta: si Palenque pasa a municipio y el kuagro y los mayores quedan de adorno, no es el municipio que se está discutiendo.`,
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
    foto_url: "/semilla/baile-palenque.jpg",
    pie_foto:
      "Baile y tambor en Palenque. Foto: Victoria Sánchez Mércol / Wikimedia Commons (CC BY-SA 3.0), publicada también en el blog Con los pies por la Tierra. Recorte 3:2. No es la edición 41 del festival.",
    audio_url: null,
    duracion: null,
    entradilla:
      "La 41ª edición ya está en los calendarios: cuatro días en Palenque, como desde 2019. La programación menuda de este año todavía no la tenemos de la Corporación.",
    cuerpo: `${LLAMADO_PREGON}: el tambor de octubre ya tiene números en el almanaque. Varios calendarios —Cuándo Pasa, Agenda del Mar, el de fiestas de Colombia— ponen la 41ª edición del Festival de Tambores y Expresiones Culturales del viernes 9 al lunes 12 de octubre de 2026, en San Basilio de Palenque.

Lo organiza, como siempre, la Corporación Festival de Tambores de Palenque. El festival viene desde 1985. Hasta 2018 duraba tres días; desde 2019 son cuatro. Eso no es noticia nueva. La noticia de este mes es la fecha de esta edición, que ya circula para que la diáspora y el pueblo marquen el calendario.

No vamos a copiar la lista genérica de ritmos ni a vender el pueblo como destino. Tampoco vamos a decir quién cierra, ni qué taller hay el sábado, ni cuánto vale una posada. Eso no lo hemos visto publicado por la Corporación en estas semanas.

Cuando la Corporación suelte la programación, aquí se cuenta con su nombre. Mientras tanto, la fecha queda en la agenda: 9 al 12 de octubre. El resto, cuando suene en el pueblo.`,
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
      {
        texto: "Foto: Victoria Sánchez Mércol, CC BY-SA 3.0 — Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/File:Champeta_palenque.jpg",
      },
    ],
  }),
  pieza({
    id: "a1e1c001-0005-4000-8000-000000000005",
    slug: "keinel-cimarra-consulta-previa",
    titulo: "Keinel Cimarra: «una luz al final del sendero»",
    seccion: "gente",
    formato: "perfil",
    fecha_publicacion: "2026-09-14T12:30:00-05:00",
    foto_url: "/semilla/plaza-benkos-2007.jpg",
    pie_foto:
      "Estatua de Benkos Biohó en la plaza de Palenque, 1 de diciembre de 2007. Foto: Kosmel Bonfante / Wikimedia Commons (CC BY 3.0). Recorte 3:2. No es retrato de Keinel Cimarra.",
    audio_url: null,
    duracion: null,
    entradilla:
      "El representante del Consejo Comunitario Makankamaná salió en la primera jornada de consulta previa. No es biografía. Es lo que dijo ese día, con nombre y cargo.",
    cuerpo: `Keinel Joel Cimarra Cassiani habla en esa mesa como representante del Consejo Comunitario Makankamaná y como delegado nacional de Consulta Previa. Así lo nombraron El Universal y Caracol el 5 de agosto. El Chakero no tiene más ficha: ni edad, ni oficio, ni si vive en el pueblo o en la diáspora. No se inventa.

Lo que sí quedó grabado en esas crónicas es el tono. Dijo que el proceso lleva dos años de dificultades y que, con ese primer encuentro, se ve «una luz al final del sendero». Dijo también que el Consejo Comunitario va a seguir trabajando con la futura Alcaldía para que Palenque sea un municipio ejemplo.

Esa segunda frase pesa. Habla de Alcaldía como algo que viene, no como algo que ya está. Y deja al Consejo Comunitario dentro del dibujo, no afuera. En Palenque eso no es detalle: es la pregunta de si el municipio se come a la autoridad que ya existe o si la reconoce.

El nombre, en los periódicos de agosto, va con C: Cimarra. Otras publicaciones del territorio lo han escrito Simarra. Aquí se deja como salió en las notas de esa jornada, hasta que él o el Consejo Comunitario digan la grafía que usan.

Un perfil de verdad pediría una conversación en el patio, no tres frases de rueda de prensa. Esto es lo que hay. Si Keinel o el Makankamaná quieren hablar largo —de la consulta, de la tierra, de cómo se ve el pueblo cuando salga el municipio— el canal está para eso.`,
    cita: {
      texto:
        "Sabemos que este proceso ha enfrentado dificultades durante estos dos años, pero hoy vemos una luz al final del sendero.",
      fuente: "Keinel Joel Cimarra Cassiani, 5 de agosto de 2026, citado por El Universal y Caracol",
    },
    fuentes: [
      {
        texto: "El Universal, 5 ago 2026 — cita del Consejo Comunitario",
        url: "https://www.eluniversal.com.co/regional/bolivar/2026/08/05/san-basilio-de-palenque-inicia-la-ruta-formal-para-convertirse-en-municipio/",
      },
      {
        texto: "Caracol Radio, 5 ago 2026 — misma jornada",
        url: "https://caracol.com.co/2026/08/05/gobernacion-de-bolivar-avanza-en-la-ruta-para-convertir-a-san-basilio-de-palenque-en-municipio/",
      },
      {
        texto: "Foto: Kosmel Bonfante, CC BY 3.0 — Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/File:San_basilio_de_palenque_-_panoramio_(1).jpg",
      },
    ],
  }),
  pieza({
    id: "a1e1c001-0006-4000-8000-000000000006",
    slug: "pedro-adan-torres-sala-sistemas",
    titulo: "Pedro Adán Torres: del anuncio del sueldo a la sala inaugurada",
    seccion: "gente",
    formato: "perfil",
    fecha_publicacion: "2026-09-15T12:00:00-05:00",
    foto_url: "/semilla/estatua-benkos-wehwalt.jpg",
    pie_foto:
      "Pedestal de Benkos Biohó en la plaza de Palenque, 5 de febrero de 2009. Foto: Wehwalt / Wikimedia Commons (CC BY-SA 3.0). Recorte 3:2. No es retrato de Torres ni la sala de cómputo.",
    audio_url: null,
    duracion: null,
    entradilla:
      "En junio prometió el 100 % del salario de la Cámara para una sala en Benkos Biohó. Esa sala se inauguró el 15 de septiembre del 2026.",
    cuerpo: `${LLAMADO_PREGON}: Pedro Adán Torres Pérez, abogado y líder del pueblo, llegó a la Cámara de Representantes en junio. No ganó el primer renglón. Iba segundo en la lista del Partido Demócrata Colombiano —el que él fundó, del que es presidente y representante legal— y entró cuando aceptaron la renuncia de Ana Rogelia Monsalve Álvarez. El Universal lo dató el 19 de junio. El Afro Bogotano dice que asumió el miércoles de esa semana.

El periodo que le toca es el que queda del 2025-2026. No es una curul de cuatro años recién estrenada. Es el resto de la que había.

Ese mismo junio puso esto sobre la mesa: el 100 % de su salario de representante, dijo, iba para adecuar y dotar una sala de sistemas en la Institución Etnoeducativa Técnica Agropecuaria Benkos Biohó. «Soy hijo de Palenque», dijo. Que las familias se esfuerzan y que a los jóvenes de aquí se les niegan cosas que en otros lados parecen del diario. Prometió cuentas públicas: compras, plata, resultados, con la comunidad educativa y las directivas.

Esa sala se inauguró el 15 de septiembre del 2026. No se quedó en el comunicado. El martes abrió con 25 portátiles, UPS y reguladores de voltaje, y una charla. La donación va con el programa Kuagro Tech y la Fundación Código Abierto, para que los muchachos aprendan a programar y a usar inteligencia artificial. El detalle de ese día está en Educación.

No hay retrato suyo con licencia clara para usar. La foto es la plaza: Benkos Biohó, el nombre de la escuela.`,
    cita: {
      texto:
        "San Basilio de Palenque le ha entregado mucho a Colombia, historia, libertad, resistencia y patrimonio cultural. Hoy quiero devolverle a mi tierra una pequeña parte de todo lo que me ha dado.",
      fuente: "Pedro Adán Torres Pérez, citado por El Universal y El Afro Bogotano, junio de 2026",
    },
    fuentes: [
      {
        texto: "El Chakero, 15 sep 2026 — inauguración de la sala (Educación)",
        url: "/educacion/kuagro-tech-inauguran-sala-computo/",
      },
      {
        texto: "El Universal, 19 jun 2026 — curul y anuncio de la sala de sistemas",
        url: "https://www.eluniversal.com.co/politica/2026/06/18/el-representante-a-la-camara-que-destinara-todo-su-salario-a-una-sala-de-sistemas-en-palenque/",
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
