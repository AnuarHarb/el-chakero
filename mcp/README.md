# MCP de El Chakero

Servidor MCP local para que Anuar cree y configure **piezas** (noticias) desde Cursor. Vive en `mcp/` a propósito: no toca `/admin` ni el formulario de Fase 2.1.

Los cambios de estado **no** son un `update` del enum. Van a `public.cambiar_estado`, que es la función que ya exige el SQL/RLS.

## Herramientas

| Herramienta | Qué hace |
| --- | --- |
| `piezas_listar` | Lista piezas. Filtros: `estado`, `seccion`, `limite`. |
| `piezas_obtener` | Una pieza por `id`. |
| `piezas_crear` | Alta en `idea` o `borrador` (título, sección, formato, entradilla, cuerpo, transparencia, vínculo; medios opcionales). |
| `piezas_actualizar` | Edita esos campos. **No acepta `estado`.** |
| `piezas_cambiar_estado` | Llama `rpc('cambiar_estado', { p_id, nuevo })`. Si el destino es `retirada`, pide `motivo_retiro` y lo guarda antes. |

Transiciones (las valida Postgres, no el MCP):

`idea` → `asignada` (dirección) → `borrador` → `en_revision` → `aprobada` → `publicada`. Salida: `retirada`. Quien escribe no se aprueba ni publica. Toda noticia lleva pregón en audio para pasar a revisión.

## Auth (local, no el navegador)

El MCP entra con **correo y clave** de una cuenta del equipo. Así `auth.uid()` y `privado.mi_rol()` son los de esa persona, y `cambiar_estado` aplica.

La **service role no escribe contenido por su cuenta**. Sirve solo como apikey alternativa si no tienes la anon. Nunca `NEXT_PUBLIC_`. Nunca en el front de Next.

Variables (`mcp/.env.example`):

| Variable | Obligatoria | Notas |
| --- | --- | --- |
| `SUPABASE_URL` | sí | También vale `NEXT_PUBLIC_SUPABASE_URL` |
| `SUPABASE_ANON_KEY` | sí, o la de abajo | Preferible. Publishable key también. |
| `SUPABASE_SERVICE_ROLE_KEY` | no | Solo si no hay anon. Cursor local, no el browser. |
| `EL_CHAKERO_EMAIL` | sí | Cuenta ya promovida (p. ej. dirección con el seed) |
| `EL_CHAKERO_PASSWORD` | sí | La de Auth, no la de Google-only |

## Cómo conectarlo en Cursor

1. En este repo:

```bash
cd mcp
cp .env.example .env
# llena URL, clave, correo y clave
npm install
```

2. Cursor → Settings → Tools & MCP → New MCP Server, o pega esto en **`~/.cursor/mcp.json`** (global) o **`.cursor/mcp.json`** del proyecto. Hay una copia en [`mcp.json.example`](./mcp.json.example).

Usa el `tsx` de `mcp/node_modules` (no `npm start`: npm escribe en stdout y rompe el protocolo).

```json
{
  "mcpServers": {
    "el-chakero": {
      "type": "stdio",
      "command": "${workspaceFolder}/mcp/node_modules/.bin/tsx",
      "args": ["${workspaceFolder}/mcp/src/index.ts"],
      "envFile": "${workspaceFolder}/mcp/.env"
    }
  }
}
```

Si el archivo de config no está en la raíz del repo, cambia `${workspaceFolder}` por la ruta absoluta a `el-chakero`.

Equivalente con `env` (sin `.env`):

```json
{
  "mcpServers": {
    "el-chakero": {
      "type": "stdio",
      "command": "/ruta/a/el-chakero/mcp/node_modules/.bin/tsx",
      "args": ["/ruta/a/el-chakero/mcp/src/index.ts"],
      "env": {
        "SUPABASE_URL": "https://xxxx.supabase.co",
        "SUPABASE_ANON_KEY": "eyJ...",
        "EL_CHAKERO_EMAIL": "anuar@elchakero.com",
        "EL_CHAKERO_PASSWORD": "…"
      }
    }
  }
}
```

3. Recarga la ventana de Cursor. En Tools & MCP, `el-chakero` debe verse conectado. Pide: “lista las piezas en borrador” o “crea una noticia de territorio…”.

Comando de arranque (el mismo que usa Cursor):

```bash
cd mcp
npx tsx src/index.ts
```

Stdout es el protocolo. Los logs van a stderr.

## Qué no hace

- No sube foto ni audio a Storage (eso es el formulario de `/admin/piezas/`). Puedes pegar `foto_url` y `audio_url` ya públicas.
- No cambia roles. Eso es `cambiar_rol` / el panel.
- No bypasea RLS: si tu cuenta es `lector`, no vas a crear piezas.

## Tests

```bash
cd mcp && npm test
```
