# El Chakero

Medio de Palenque. Sitio público + cáscara `/admin` en Next.js. UI en español. Nombre con **k**. Dominio: [elchakero.com](https://elchakero.com).

Fase 1: cimientos. Nadie publica todavía. El pregón de portada está vacío y listo.

## Correr en local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre [http://127.0.0.1:43173](http://127.0.0.1:43173). El sitio público funciona **sin** claves de Supabase.

## Qué hay

- Portada vacía / lista para el pregón, secciones, agenda, archivo `/pregon/`, páginas fijas en borrador.
- CTA de WhatsApp al canal [0029Vb8FvlmLI8YeFZWwIs23](https://whatsapp.com/channel/0029Vb8FvlmLI8YeFZWwIs23).
- Tokens y semántica del sistema de diseño (Big Shoulders + Atkinson, `header`/`nav`/`main`/`article`/`footer`).
- Auth: correo + contraseña y Google (`@supabase/ssr`, cookies).
- Migración SQL: roles, RLS, Storage y boletín semanal según el spec.
- `/admin`: entrar + menú. Colas vacías hasta Fase 2.

## Lo que Anuar tiene que configurar

### 1. Supabase

1. Proyecto nuevo (región cerca de `sa-east-1` si se puede).
2. Auth → Providers:
   - Email: habilitado, **con contraseña** (no solo magic link).
   - Google: Client ID y Secret de Google Cloud. Redirect: `https://<ref>.supabase.co/auth/v1/callback`.
3. URL de redirección del sitio: `https://elchakero.com/auth/callback` y la de preview de Vercel.
4. SQL editor: correr `supabase/migrations/20260914120000_fase1_cimientos.sql`.
5. Crear tu cuenta en `/admin/entrar/` (correo+clave o Google).
6. Correr `supabase/seed-primer-admin.sql` (cambia el correo) para pasar de `lector` a `direccion`. `infra` solo desde el panel de Supabase.

Variables:

| Variable | Dónde |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Vercel + `.env.local` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` (o `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`) | igual |
| `SUPABASE_SERVICE_ROLE_KEY` | solo servidor (Vercel, nunca `NEXT_PUBLIC_`) |

### 2. Google Cloud

Pantalla de consentimiento OAuth, Client ID web, orígenes `https://elchakero.com` y el de Supabase. Sin esto el botón de Google falla; el correo + clave sí sirve.

### 3. Vercel

Importar este repo. Framework: Next.js. Dominio `elchakero.com`. Mismas variables. `NEXT_PUBLIC_SITE_URL=https://elchakero.com`.

### 4. Resend (Fase 3)

Verificar `elchakero.com`. `RESEND_API_KEY` y `RESEND_FROM=El Chakero <noticias@elchakero.com>`. El boletín es **semanal** (las más relevantes de la semana). El esquema ya está; el envío no.

## Abierto a propósito

No hay copy inventado de Quién financia, ni grafía cerrada de la escuela, ni correos del equipo, ni analítica.

## Scripts

| Comando | Qué |
| --- | --- |
| `npm run dev` | 127.0.0.1:43173 |
| `npm run build` | Build de Vercel |
| `npm run lint` | ESLint |
