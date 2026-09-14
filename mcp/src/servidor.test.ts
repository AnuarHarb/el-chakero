import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { HERRAMIENTAS, crearServidor } from "./servidor.ts";

describe("servidor MCP", () => {
  it("expone listar, obtener, crear, actualizar y cambiar_estado", async () => {
    const server = crearServidor();
    const [clienteTransport, servidorTransport] =
      InMemoryTransport.createLinkedPair();
    const client = new Client({ name: "test", version: "0.0.0" });
    await Promise.all([
      server.connect(servidorTransport),
      client.connect(clienteTransport),
    ]);

    const { tools } = await client.listTools();
    const nombres = tools.map((t) => t.name).sort();
    assert.deepEqual([...nombres].sort(), [...HERRAMIENTAS].sort());

    const cambiar = tools.find((t) => t.name === "piezas_cambiar_estado");
    assert.ok(cambiar?.description?.includes("cambiar_estado"));

    const actualizar = tools.find((t) => t.name === "piezas_actualizar");
    const esquema = JSON.stringify(actualizar?.inputSchema ?? {});
    assert.equal(esquema.includes('"estado"'), false);

    await client.close();
    await server.close();
  });
});
