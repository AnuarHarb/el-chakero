import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { cargarEnvLocal } from "./cliente.ts";
import { crearServidor } from "./servidor.ts";

cargarEnvLocal();

const server = crearServidor();
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("El Chakero MCP listo (stdio).");
