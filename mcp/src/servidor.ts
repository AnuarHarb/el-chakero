import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { clienteAutenticado } from "./cliente.ts";
import {
  actualizarPieza,
  cambiarEstadoPieza,
  crearPieza,
  ErrorPieza,
  listarPiezas,
  obtenerPieza,
} from "./piezas.ts";
import { ESTADOS, ESTADOS_ALTA, FORMATOS, SECCIONES } from "./tipos.ts";

export const NOMBRE_SERVIDOR = "el-chakero";
export const VERSION_SERVIDOR = "0.1.0";

export const HERRAMIENTAS = [
  "piezas_listar",
  "piezas_obtener",
  "piezas_crear",
  "piezas_actualizar",
  "piezas_cambiar_estado",
] as const;

const estadoSchema = z.enum(ESTADOS);
const seccionSchema = z.enum(SECCIONES);
const formatoSchema = z.enum(FORMATOS);

function json(data: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
  };
}

function fallo(error: unknown) {
  const mensaje =
    error instanceof Error ? error.message : "Error inesperado en el MCP.";
  return {
    isError: true as const,
    content: [{ type: "text" as const, text: mensaje }],
  };
}

async function conCliente<T>(fn: (args: {
  cliente: Awaited<ReturnType<typeof clienteAutenticado>>["cliente"];
  usuario: Awaited<ReturnType<typeof clienteAutenticado>>["usuario"];
}) => Promise<T>) {
  try {
    const sesion = await clienteAutenticado();
    return json(await fn(sesion));
  } catch (error) {
    return fallo(error instanceof ErrorPieza ? error : error);
  }
}

const camposOpcionales = {
  titulo: z.string().min(1).optional().describe("Título de la pieza"),
  seccion: seccionSchema.optional().describe("Sección del medio"),
  formato: formatoSchema.optional().describe("Formato (noticia, crónica, etc.)"),
  entradilla: z
    .string()
    .optional()
    .describe("Entradilla. Cadena vacía la deja en blanco."),
  cuerpo: z.string().optional().describe("Cuerpo. Párrafos en texto."),
  transparencia: z
    .string()
    .optional()
    .describe("Línea de transparencia. Obligatoria si vinculo es true al aprobar."),
  vinculo: z
    .boolean()
    .optional()
    .describe("True si la pieza toca al medio (conflicto / financiamiento)."),
  foto_url: z.string().optional().describe("URL pública de la foto 3:2"),
  pie_foto: z.string().optional().describe("Pie de foto"),
  audio_url: z.string().optional().describe("URL del pregón en audio (mpeg)"),
  duracion: z.string().optional().describe("Duración del audio, p. ej. 1:12"),
  motivo_retiro: z.string().optional().describe("Motivo visible si se va a retirar"),
};

export function crearServidor(): McpServer {
  const server = new McpServer({
    name: NOMBRE_SERVIDOR,
    version: VERSION_SERVIDOR,
  });

  server.registerTool(
    "piezas_listar",
    {
      description:
        "Lista piezas de El Chakero. Filtra por estado y sección. Respeta RLS: ves las tuyas y, si eres edición/dirección/consejo, las del equipo.",
      inputSchema: {
        estado: estadoSchema.optional().describe("Filtrar por estado del flujo"),
        seccion: seccionSchema.optional().describe("Filtrar por sección"),
        limite: z
          .number()
          .int()
          .min(1)
          .max(200)
          .optional()
          .describe("Máximo de filas (1–200, por defecto 50)"),
      },
    },
    async ({ estado, seccion, limite }) =>
      conCliente(({ cliente }) =>
        listarPiezas(cliente, { estado, seccion, limite }),
      ),
  );

  server.registerTool(
    "piezas_obtener",
    {
      description: "Obtiene una pieza por id (uuid).",
      inputSchema: {
        id: z.string().uuid().describe("Id de la pieza"),
      },
    },
    async ({ id }) => conCliente(({ cliente }) => obtenerPieza(cliente, id)),
  );

  server.registerTool(
    "piezas_crear",
    {
      description:
        "Crea una pieza en idea o borrador (lo que permite RLS). El estado posterior solo cambia con piezas_cambiar_estado. Quien crea queda como autor.",
      inputSchema: {
        titulo: z.string().min(1).describe("Título"),
        seccion: seccionSchema.describe("Sección"),
        formato: formatoSchema.describe("Formato. Empieza por noticia si no hay otra razón."),
        entradilla: z.string().optional().describe("Entradilla"),
        cuerpo: z.string().optional().describe("Cuerpo"),
        transparencia: z.string().optional().describe("Línea de transparencia"),
        vinculo: z.boolean().optional().describe("Si la pieza toca al medio"),
        estado: z
          .enum(ESTADOS_ALTA)
          .optional()
          .describe("idea o borrador. Por defecto idea."),
        foto_url: z.string().optional(),
        pie_foto: z.string().optional(),
        audio_url: z.string().optional(),
        duracion: z.string().optional(),
      },
    },
    async (args) =>
      conCliente(({ cliente, usuario }) =>
        crearPieza(cliente, usuario.id, {
          titulo: args.titulo,
          seccion: args.seccion,
          formato: args.formato,
          entradilla: args.entradilla,
          cuerpo: args.cuerpo,
          transparencia: args.transparencia,
          vinculo: args.vinculo,
          estado: args.estado,
          foto_url: args.foto_url,
          pie_foto: args.pie_foto,
          audio_url: args.audio_url,
          duracion: args.duracion,
        }),
      ),
  );

  server.registerTool(
    "piezas_actualizar",
    {
      description:
        "Actualiza título, sección, formato, entradilla, cuerpo, transparencia, vínculo y medios. No acepta estado: eso es piezas_cambiar_estado.",
      inputSchema: {
        id: z.string().uuid().describe("Id de la pieza"),
        ...camposOpcionales,
      },
    },
    async ({ id, ...campos }) =>
      conCliente(({ cliente }) => actualizarPieza(cliente, id, campos)),
  );

  server.registerTool(
    "piezas_cambiar_estado",
    {
      description:
        "Cambia el estado llamando a public.cambiar_estado (nunca un update del enum). Transiciones: idea→asignada (dirección), asignada→borrador, borrador→en_revision (título, entradilla, foto y pie; noticia además audio y duración), en_revision→borrador o aprobada, aprobada→publicada (solo dirección, no la propia), publicada→retirada (dirección, con motivo_retiro).",
      inputSchema: {
        id: z.string().uuid().describe("Id de la pieza"),
        estado: estadoSchema.describe("Estado destino"),
        motivo_retiro: z
          .string()
          .optional()
          .describe("Obligatorio si el destino es retirada. Se guarda antes del RPC."),
      },
    },
    async ({ id, estado, motivo_retiro }) =>
      conCliente(({ cliente }) =>
        cambiarEstadoPieza(cliente, id, estado, motivo_retiro),
      ),
  );

  return server;
}
