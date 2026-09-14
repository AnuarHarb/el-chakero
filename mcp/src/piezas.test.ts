import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  actualizarPieza,
  assertSinEstado,
  cambiarEstadoPieza,
  crearPieza,
  ErrorPieza,
  listarPiezas,
  payloadEscritura,
} from "./piezas.ts";
import type { Pieza } from "./tipos.ts";

const pieza: Pieza = {
  id: "11111111-1111-1111-1111-111111111111",
  slug: null,
  titulo: "El puente",
  seccion: "territorio",
  formato: "noticia",
  entradilla: "Se cayó",
  cuerpo: "Texto",
  foto_url: null,
  pie_foto: null,
  audio_url: null,
  duracion: null,
  transparencia: null,
  vinculo: false,
  estado: "borrador",
  fecha_publicacion: null,
  motivo_retiro: null,
  autor_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
  asignada_a: null,
  creado_en: "2026-09-14T00:00:00Z",
  actualizado_en: "2026-09-14T00:00:00Z",
};

type Llamada = {
  tabla?: string;
  insert?: Record<string, unknown>;
  update?: Record<string, unknown>;
  eq?: [string, unknown][];
  rpc?: { fn: string; args: Record<string, unknown> };
};

function clienteMock(opciones: {
  data?: unknown;
  error?: { message: string } | null;
  onRpc?: (fn: string, args: Record<string, unknown>) => { error: { message: string } | null };
} = {}) {
  const llamadas: Llamada[] = [];

  const resultado = {
    data: opciones.data ?? [pieza],
    error: opciones.error ?? null,
  };

  function cadena(inicial: Llamada) {
    const actual = inicial;
    const api: Record<string, unknown> = {
      select() {
        return api;
      },
      insert(row: Record<string, unknown>) {
        actual.insert = row;
        return api;
      },
      update(row: Record<string, unknown>) {
        actual.update = row;
        return api;
      },
      eq(col: string, valor: unknown) {
        actual.eq = [...(actual.eq ?? []), [col, valor]];
        return api;
      },
      order() {
        return api;
      },
      limit() {
        return api;
      },
      maybeSingle() {
        const data = Array.isArray(resultado.data)
          ? (resultado.data[0] ?? null)
          : resultado.data;
        return Promise.resolve({ data, error: resultado.error });
      },
      single() {
        const data = Array.isArray(resultado.data)
          ? (resultado.data[0] ?? null)
          : resultado.data;
        return Promise.resolve({ data, error: resultado.error });
      },
      then(
        onFulfilled: (v: typeof resultado) => unknown,
        onRejected?: (e: unknown) => unknown,
      ) {
        return Promise.resolve(resultado).then(onFulfilled, onRejected);
      },
    };
    return api;
  }

  return {
    llamadas,
    from(tabla: string) {
      const actual: Llamada = { tabla };
      llamadas.push(actual);
      return cadena(actual);
    },
    rpc(fn: string, args: Record<string, unknown>) {
      llamadas.push({ rpc: { fn, args } });
      return Promise.resolve(opciones.onRpc?.(fn, args) ?? { error: null });
    },
  };
}

describe("payloadEscritura", () => {
  it("no incluye estado ni autor_id", () => {
    const fila = payloadEscritura({
      titulo: "Hola",
      transparencia: "  ",
      vinculo: true,
    });
    assert.equal(fila.titulo, "Hola");
    assert.equal(fila.transparencia, null);
    assert.equal(fila.vinculo, true);
    assert.equal("estado" in fila, false);
    assert.equal("autor_id" in fila, false);
  });
});

describe("assertSinEstado", () => {
  it("rechaza un update con estado", () => {
    assert.throws(
      () => assertSinEstado({ estado: "publicada" }),
      (error: unknown) =>
        error instanceof ErrorPieza &&
        error.message.includes("piezas_cambiar_estado"),
    );
  });

  it("deja pasar campos de contenido", () => {
    assert.doesNotThrow(() => assertSinEstado({ titulo: "X" }));
  });
});

describe("listarPiezas", () => {
  it("filtra por estado y sección", async () => {
    const mock = clienteMock({ data: [pieza] });
    const lista = await listarPiezas(mock as never, {
      estado: "borrador",
      seccion: "territorio",
    });
    assert.equal(lista.length, 1);
    const eqs = mock.llamadas[0]?.eq ?? [];
    assert.deepEqual(eqs, [
      ["estado", "borrador"],
      ["seccion", "territorio"],
    ]);
  });
});

describe("crearPieza", () => {
  it("inserta idea o borrador con autor_id y nunca otro estado", async () => {
    const mock = clienteMock({ data: pieza });
    await crearPieza(mock as never, pieza.autor_id, {
      titulo: "El puente",
      seccion: "territorio",
      formato: "noticia",
      estado: "borrador",
    });
    const insert = mock.llamadas[0]?.insert;
    assert.equal(insert?.estado, "borrador");
    assert.equal(insert?.autor_id, pieza.autor_id);
  });

  it("rechaza crear ya publicada", async () => {
    const mock = clienteMock();
    await assert.rejects(
      () =>
        crearPieza(mock as never, pieza.autor_id, {
          titulo: "El puente",
          seccion: "territorio",
          formato: "noticia",
          estado: "publicada" as "idea",
        }),
      (error: unknown) =>
        error instanceof ErrorPieza && error.message.includes("idea o borrador"),
    );
    assert.equal(mock.llamadas.length, 0);
  });
});

describe("actualizarPieza", () => {
  it("nunca manda estado en el update de supabase", async () => {
    const mock = clienteMock({ data: pieza });
    await actualizarPieza(mock as never, pieza.id, {
      titulo: "Otro título",
      cuerpo: "Nuevo",
    });
    const update = mock.llamadas[0]?.update;
    assert.ok(update);
    assert.equal("estado" in update, false);
    assert.equal(update.titulo, "Otro título");
  });

  it("si llega estado, no llama a from().update", async () => {
    const mock = clienteMock();
    await assert.rejects(
      () =>
        actualizarPieza(mock as never, pieza.id, {
          estado: "publicada",
          titulo: "X",
        }),
      ErrorPieza,
    );
    assert.equal(mock.llamadas.length, 0);
  });
});

describe("cambiarEstadoPieza", () => {
  it("llama rpc cambiar_estado con p_id y nuevo", async () => {
    const mock = clienteMock({ data: { ...pieza, estado: "en_revision" } });
    await cambiarEstadoPieza(mock as never, pieza.id, "en_revision");
    const rpc = mock.llamadas.find((l) => l.rpc)?.rpc;
    assert.deepEqual(rpc, {
      fn: "cambiar_estado",
      args: { p_id: pieza.id, nuevo: "en_revision" },
    });
  });

  it("antes de retirada guarda motivo_retiro y no el enum", async () => {
    const mock = clienteMock({ data: { ...pieza, estado: "retirada" } });
    await cambiarEstadoPieza(
      mock as never,
      pieza.id,
      "retirada",
      "Salió un dato mal",
    );
    const update = mock.llamadas.find((l) => l.update)?.update;
    assert.deepEqual(update, { motivo_retiro: "Salió un dato mal" });
    assert.equal("estado" in (update ?? {}), false);
    const rpc = mock.llamadas.find((l) => l.rpc)?.rpc;
    assert.equal(rpc?.fn, "cambiar_estado");
    assert.equal(rpc?.args.nuevo, "retirada");
  });

  it("exige motivo para retirar", async () => {
    const mock = clienteMock();
    await assert.rejects(
      () => cambiarEstadoPieza(mock as never, pieza.id, "retirada"),
      ErrorPieza,
    );
    assert.equal(mock.llamadas.length, 0);
  });
});
