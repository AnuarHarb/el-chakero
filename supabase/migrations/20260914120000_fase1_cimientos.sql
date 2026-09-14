-- El Chakero · Fase 1
-- Roles, RLS y Storage según internal/el-chakero-roles-en-supabase.md
-- Boletín semanal y páginas fijas según el plan.
-- Funciones privilegiadas viven en `privado`, no en `public`.

create extension if not exists unaccent with schema extensions;

create schema if not exists privado;
revoke all on schema privado from public;
grant usage on schema privado to postgres, service_role, authenticated;

-- ---------------------------------------------------------------------------
-- Tipos
-- ---------------------------------------------------------------------------

create type public.rol as enum (
  'lector',
  'corresponsal',
  'reporteria',
  'edicion',
  'direccion',
  'comunidad',
  'tesoreria',
  'consejo',
  'infra'
);

create type public.estado_pieza as enum (
  'idea',
  'asignada',
  'borrador',
  'en_revision',
  'aprobada',
  'publicada',
  'retirada'
);

create type public.seccion as enum (
  'comunidad',
  'educacion',
  'cultura',
  'territorio',
  'gente'
);

create type public.formato as enum (
  'noticia',
  'cronica',
  'perfil',
  'galeria',
  'guia',
  'pregon'
);

-- ---------------------------------------------------------------------------
-- Tablas
-- ---------------------------------------------------------------------------

create table public.perfiles (
  id uuid primary key references auth.users on delete cascade,
  nombre text not null,
  rol public.rol not null default 'lector',
  vinculos text,
  creado_en timestamptz not null default now()
);

create table public.aportes (
  id uuid primary key default gen_random_uuid(),
  autor_id uuid references public.perfiles (id),
  texto text not null,
  medios jsonb not null default '[]'::jsonb,
  lugar text,
  estado text not null default 'recibido'
    check (estado in ('recibido', 'en_verificacion', 'convertido', 'descartado')),
  pieza_id uuid,
  creado_en timestamptz not null default now()
);

create table public.piezas (
  id uuid primary key default gen_random_uuid(),
  slug text,
  titulo text not null,
  seccion public.seccion not null,
  formato public.formato not null,
  entradilla text,
  cuerpo text,
  foto_url text,
  pie_foto text,
  audio_url text,
  duracion text,
  autor_id uuid not null references public.perfiles (id),
  asignada_a uuid references public.perfiles (id),
  aprobada_por uuid references public.perfiles (id),
  publicada_por uuid references public.perfiles (id),
  estado public.estado_pieza not null default 'idea',
  vinculo boolean not null default false,
  transparencia text,
  fecha_publicacion timestamptz,
  motivo_retiro text,
  creado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);

create unique index piezas_seccion_slug on public.piezas (seccion, slug)
  where slug is not null;
create index piezas_publicadas_fecha on public.piezas (fecha_publicacion desc)
  where estado = 'publicada';

alter table public.aportes
  add constraint aportes_pieza_fk
  foreign key (pieza_id) references public.piezas (id);

create table public.notas_edicion (
  id uuid primary key default gen_random_uuid(),
  pieza_id uuid not null references public.piezas (id) on delete cascade,
  autor_id uuid references public.perfiles (id),
  texto text not null,
  creado_en timestamptz not null default now()
);

create table public.fuentes (
  id uuid primary key default gen_random_uuid(),
  pieza_id uuid not null references public.piezas (id) on delete cascade,
  descripcion text not null,
  verificada_por_segunda_via boolean not null default false
);

create table public.correcciones (
  id uuid primary key default gen_random_uuid(),
  pieza_id uuid not null references public.piezas (id) on delete cascade,
  nota text not null,
  hecha_por uuid references public.perfiles (id),
  creado_en timestamptz not null default now()
);

create table public.consentimientos (
  codigo text primary key,
  pieza_id uuid references public.piezas (id),
  persona text not null,
  contacto text,
  es_menor boolean not null default false,
  acudiente text,
  forma text,
  creado_en timestamptz not null default now()
);

create table public.agenda (
  id uuid primary key default gen_random_uuid(),
  fecha date not null,
  hora time,
  que text not null,
  donde text,
  convoca text,
  creado_por uuid references public.perfiles (id)
);

create table public.historial (
  id bigserial primary key,
  tabla text not null,
  fila_id text not null,
  accion text not null,
  antes jsonb,
  despues jsonb,
  usuario_id uuid,
  en timestamptz not null default now()
);

create table public.paginas (
  slug text primary key,
  titulo text not null,
  cuerpo text,
  actualizado_en timestamptz not null default now(),
  actualizado_por uuid references public.perfiles (id)
);

create table public.suscriptores (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  estado text not null default 'pendiente'
    check (estado in ('pendiente', 'activo', 'baja')),
  confirmado_en timestamptz,
  token_confirmacion text unique,
  token_baja text unique,
  creado_en timestamptz not null default now()
);

create table public.envios_boletin (
  id uuid primary key default gen_random_uuid(),
  asunto text not null,
  pieza_ids uuid[] not null default '{}',
  enviado_en timestamptz,
  resend_id text,
  enviado_por uuid references public.perfiles (id)
);

create table privado.aprobaciones_rol (
  id uuid primary key default gen_random_uuid(),
  perfil_id uuid not null references public.perfiles (id) on delete cascade,
  rol_nuevo public.rol not null,
  propuesto_por uuid not null references public.perfiles (id),
  creado_en timestamptz not null default now()
);

insert into public.paginas (slug, titulo) values
  ('quienes-somos', 'Quiénes somos'),
  ('quien-financia', 'Quién financia El Chakero'),
  ('como-funcionan-las-noticias', 'Cómo funcionan las noticias'),
  ('envia-tu-noticia', 'Envía tu noticia'),
  ('contacto', 'Contacto'),
  ('datos-y-privacidad', 'Datos y privacidad');

-- ---------------------------------------------------------------------------
-- Funciones
-- ---------------------------------------------------------------------------

create function privado.mi_rol()
returns public.rol
language sql
stable
security definer
set search_path = public
as $$
  select rol from public.perfiles where id = auth.uid()
$$;

revoke all on function privado.mi_rol() from public;
grant execute on function privado.mi_rol() to anon, authenticated, service_role;

create function privado.generar_slug(titulo text)
returns text
language sql
immutable
set search_path = public, extensions
as $$
  select trim(both '-' from regexp_replace(
    lower(extensions.unaccent(coalesce(titulo, ''))),
    '[^a-z0-9]+',
    '-',
    'g'
  ))
$$;

create function privado.sincronizar_jwt(p_id uuid, p_rol public.rol)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update auth.users
  set raw_app_meta_data =
    coalesce(raw_app_meta_data, '{}'::jsonb) || jsonb_build_object('rol', p_rol::text)
  where id = p_id;
end;
$$;

create function privado.manejar_nuevo_usuario()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  nombre text;
begin
  nombre := coalesce(
    new.raw_user_meta_data ->> 'nombre',
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'name',
    split_part(new.email, '@', 1),
    'Sin nombre'
  );

  insert into public.perfiles (id, nombre, rol)
  values (new.id, nombre, 'lector');

  perform privado.sincronizar_jwt(new.id, 'lector');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function privado.manejar_nuevo_usuario();

create function privado.escribir_historial()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  fila text;
begin
  if tg_op = 'DELETE' then
    fila := case
      when tg_table_name = 'consentimientos' then old.codigo
      else old.id::text
    end;
    insert into public.historial (tabla, fila_id, accion, antes, usuario_id)
    values (tg_table_name, fila, 'delete', to_jsonb(old), auth.uid());
    return old;
  end if;

  fila := case
    when tg_table_name = 'consentimientos' then new.codigo
    else new.id::text
  end;

  if tg_op = 'INSERT' then
    insert into public.historial (tabla, fila_id, accion, despues, usuario_id)
    values (tg_table_name, fila, 'insert', to_jsonb(new), auth.uid());
  else
    insert into public.historial (tabla, fila_id, accion, antes, despues, usuario_id)
    values (tg_table_name, fila, 'update', to_jsonb(old), to_jsonb(new), auth.uid());
  end if;
  return new;
end;
$$;

create trigger historial_perfiles
  after insert or update or delete on public.perfiles
  for each row execute function privado.escribir_historial();

create trigger historial_aportes
  after insert or update or delete on public.aportes
  for each row execute function privado.escribir_historial();

create trigger historial_piezas
  after insert or update or delete on public.piezas
  for each row execute function privado.escribir_historial();

create trigger historial_correcciones
  after insert or update or delete on public.correcciones
  for each row execute function privado.escribir_historial();

create trigger historial_consentimientos
  after insert or update or delete on public.consentimientos
  for each row execute function privado.escribir_historial();

create trigger historial_agenda
  after insert or update or delete on public.agenda
  for each row execute function privado.escribir_historial();

create function privado.bloquear_rol_directo()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.rol is distinct from old.rol
     and current_setting('privado.permitir_cambio_rol', true) is distinct from 'on' then
    raise exception 'El rol solo cambia con cambiar_rol o desde el panel de Supabase';
  end if;
  return new;
end;
$$;

create trigger bloquear_rol_directo
  before update on public.perfiles
  for each row execute function privado.bloquear_rol_directo();

create function privado.cambiar_estado(p_id uuid, nuevo public.estado_pieza)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  p public.piezas;
  r public.rol := privado.mi_rol();
begin
  select * into p from public.piezas where id = p_id for update;
  if not found then
    raise exception 'Pieza no existe';
  end if;

  if nuevo in ('aprobada', 'publicada') and p.autor_id = auth.uid() then
    raise exception 'No puedes aprobar ni publicar tu propia pieza';
  end if;

  case
    when p.estado = 'idea' and nuevo = 'asignada' and r = 'direccion' then
      null;
    when p.estado = 'asignada' and nuevo = 'borrador'
      and (p.asignada_a = auth.uid() or p.autor_id = auth.uid()) then
      null;
    when p.estado = 'borrador' and nuevo = 'en_revision' and p.autor_id = auth.uid() then
      if p.titulo is null or p.entradilla is null or p.foto_url is null or p.pie_foto is null then
        raise exception 'Faltan título, entradilla, foto o pie de foto';
      end if;
      if p.formato = 'noticia' and (p.audio_url is null or p.duracion is null) then
        raise exception 'Toda noticia lleva su pregón en audio';
      end if;
    when p.estado = 'en_revision' and nuevo = 'borrador' and r in ('edicion', 'direccion') then
      null;
    when p.estado = 'en_revision' and nuevo = 'aprobada' and r in ('edicion', 'direccion') then
      if p.vinculo and coalesce(p.transparencia, '') = '' then
        raise exception 'La pieza toca al medio: falta la línea de transparencia';
      end if;
      update public.piezas set aprobada_por = auth.uid() where id = p_id;
    when p.estado = 'aprobada' and nuevo = 'publicada' and r = 'direccion' then
      if p.vinculo and exists (
        select 1 from public.perfiles
        where id = auth.uid() and vinculos ilike '%' || p.seccion::text || '%'
      ) then
        raise exception 'Dirección tiene vínculo con esta pieza; debe publicarla la persona designada por el consejo';
      end if;
      update public.piezas
      set publicada_por = auth.uid(),
          fecha_publicacion = now(),
          slug = coalesce(slug, privado.generar_slug(titulo))
      where id = p_id;
    when p.estado = 'publicada' and nuevo = 'retirada' and r = 'direccion' then
      if (select motivo_retiro from public.piezas where id = p_id) is null then
        raise exception 'El retiro necesita un motivo visible';
      end if;
    else
      raise exception 'Transición no permitida: % → % por %', p.estado, nuevo, r;
  end case;

  update public.piezas
  set estado = nuevo, actualizado_en = now()
  where id = p_id;
end;
$$;

create function public.cambiar_estado(p_id uuid, nuevo public.estado_pieza)
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  perform privado.cambiar_estado(p_id, nuevo);
end;
$$;

revoke all on function public.cambiar_estado(uuid, public.estado_pieza) from public;
grant execute on function public.cambiar_estado(uuid, public.estado_pieza) to authenticated;
revoke all on function privado.cambiar_estado(uuid, public.estado_pieza) from public;
grant execute on function privado.cambiar_estado(uuid, public.estado_pieza) to authenticated;

create function privado.aplicar_rol(p_id uuid, nuevo public.rol)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  perform set_config('privado.permitir_cambio_rol', 'on', true);
  update public.perfiles set rol = nuevo where id = p_id;
  perform privado.sincronizar_jwt(p_id, nuevo);
  delete from privado.aprobaciones_rol where perfil_id = p_id;
end;
$$;

create function privado.cambiar_rol(p_id uuid, nuevo public.rol)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  r public.rol := privado.mi_rol();
  pendiente uuid;
begin
  if nuevo = 'infra' then
    raise exception 'infra solo se asigna desde el panel de Supabase';
  end if;

  if not exists (select 1 from public.perfiles where id = p_id) then
    raise exception 'Perfil no existe';
  end if;

  if nuevo = 'direccion' then
    if r <> 'consejo' then
      raise exception 'Solo el consejo puede proponer o confirmar dirección';
    end if;

    select propuesto_por into pendiente
    from privado.aprobaciones_rol
    where perfil_id = p_id and rol_nuevo = 'direccion'
      and propuesto_por <> auth.uid()
    limit 1;

    if pendiente is not null then
      perform privado.aplicar_rol(p_id, 'direccion');
    else
      insert into privado.aprobaciones_rol (perfil_id, rol_nuevo, propuesto_por)
      values (p_id, 'direccion', auth.uid());
    end if;
    return;
  end if;

  if nuevo = 'consejo' then
    if r not in ('direccion', 'consejo') then
      raise exception 'Consejo lo proponen dirección o el propio consejo';
    end if;

    select propuesto_por into pendiente
    from privado.aprobaciones_rol
    where perfil_id = p_id and rol_nuevo = 'consejo'
      and propuesto_por <> auth.uid()
    limit 1;

    if pendiente is not null then
      perform privado.aplicar_rol(p_id, 'consejo');
    else
      insert into privado.aprobaciones_rol (perfil_id, rol_nuevo, propuesto_por)
      values (p_id, 'consejo', auth.uid());
    end if;
    return;
  end if;

  if r <> 'direccion' then
    raise exception 'Solo dirección cambia este rol';
  end if;

  perform privado.aplicar_rol(p_id, nuevo);
end;
$$;

create function public.cambiar_rol(p_id uuid, nuevo public.rol)
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  perform privado.cambiar_rol(p_id, nuevo);
end;
$$;

revoke all on function public.cambiar_rol(uuid, public.rol) from public;
grant execute on function public.cambiar_rol(uuid, public.rol) to authenticated;
revoke all on function privado.cambiar_rol(uuid, public.rol) from public;
grant execute on function privado.cambiar_rol(uuid, public.rol) to authenticated;

-- ---------------------------------------------------------------------------
-- Vistas
-- ---------------------------------------------------------------------------

create view public.consentimientos_publicos
  with (security_invoker = false)
as
  select codigo, pieza_id from public.consentimientos;

grant select on public.consentimientos_publicos to anon, authenticated;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.perfiles enable row level security;
alter table public.aportes enable row level security;
alter table public.piezas enable row level security;
alter table public.notas_edicion enable row level security;
alter table public.fuentes enable row level security;
alter table public.correcciones enable row level security;
alter table public.consentimientos enable row level security;
alter table public.agenda enable row level security;
alter table public.historial enable row level security;
alter table public.paginas enable row level security;
alter table public.suscriptores enable row level security;
alter table public.envios_boletin enable row level security;

create policy ver_perfiles on public.perfiles
  for select to anon, authenticated
  using (
    id = auth.uid()
    or privado.mi_rol() in ('direccion', 'consejo', 'infra', 'edicion')
    or exists (
      select 1 from public.piezas
      where (autor_id = perfiles.id or asignada_a = perfiles.id)
        and estado in ('publicada', 'retirada')
    )
  );

create policy editar_nombre on public.perfiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy aportar on public.aportes
  for insert to authenticated
  with check (autor_id = auth.uid());

create policy ver_aportes on public.aportes
  for select to authenticated
  using (
    autor_id = auth.uid()
    or privado.mi_rol() in ('comunidad', 'reporteria', 'edicion', 'direccion', 'consejo')
  );

create policy gestionar_aportes on public.aportes
  for update to authenticated
  using (privado.mi_rol() in ('comunidad', 'reporteria', 'edicion', 'direccion'));

create policy leer_publicadas on public.piezas
  for select to anon, authenticated
  using (estado in ('publicada', 'retirada'));

create policy leer_equipo on public.piezas
  for select to authenticated
  using (
    autor_id = auth.uid()
    or asignada_a = auth.uid()
    or privado.mi_rol() in ('edicion', 'direccion', 'consejo')
  );

create policy crear_pieza on public.piezas
  for insert to authenticated
  with check (
    privado.mi_rol() in ('reporteria', 'edicion', 'direccion')
    and autor_id = auth.uid()
    and estado in ('idea', 'borrador')
  );

create policy editar_pieza on public.piezas
  for update to authenticated
  using (
    (autor_id = auth.uid() and estado in ('idea', 'asignada', 'borrador'))
    or (privado.mi_rol() in ('edicion', 'direccion') and estado <> 'publicada')
  );

create policy ver_notas on public.notas_edicion
  for select to authenticated
  using (
    exists (
      select 1 from public.piezas
      where id = notas_edicion.pieza_id
        and (autor_id = auth.uid() or privado.mi_rol() in ('edicion', 'direccion', 'consejo'))
    )
  );

create policy escribir_notas on public.notas_edicion
  for insert to authenticated
  with check (privado.mi_rol() in ('edicion', 'direccion'));

create policy ver_fuentes on public.fuentes
  for select to authenticated
  using (
    exists (
      select 1 from public.piezas
      where id = fuentes.pieza_id
        and (autor_id = auth.uid() or privado.mi_rol() in ('edicion', 'direccion'))
    )
  );

create policy escribir_fuentes on public.fuentes
  for insert to authenticated
  with check (
    exists (
      select 1 from public.piezas
      where id = fuentes.pieza_id
        and (autor_id = auth.uid() or privado.mi_rol() in ('edicion', 'direccion'))
    )
  );

create policy ver_correcciones on public.correcciones
  for select to anon, authenticated
  using (true);

create policy escribir_correcciones on public.correcciones
  for insert to authenticated
  with check (privado.mi_rol() in ('edicion', 'direccion'));

create policy ver_consentimientos_equipo on public.consentimientos
  for select to authenticated
  using (privado.mi_rol() in ('edicion', 'direccion', 'reporteria'));

create policy escribir_consentimientos on public.consentimientos
  for insert to authenticated
  with check (privado.mi_rol() in ('reporteria', 'edicion', 'direccion'));

create policy ver_agenda on public.agenda
  for select to anon, authenticated
  using (true);

create policy escribir_agenda on public.agenda
  for insert to authenticated
  with check (privado.mi_rol() in ('comunidad', 'reporteria', 'edicion', 'direccion'));

create policy editar_agenda on public.agenda
  for update to authenticated
  using (privado.mi_rol() in ('comunidad', 'reporteria', 'edicion', 'direccion'));

create policy borrar_agenda_propia on public.agenda
  for delete to authenticated
  using (
    privado.mi_rol() = 'comunidad' and creado_por = auth.uid()
  );

create policy ver_historial on public.historial
  for select to authenticated
  using (privado.mi_rol() in ('direccion', 'consejo', 'infra'));

create policy leer_paginas on public.paginas
  for select to anon, authenticated
  using (true);

create policy editar_paginas on public.paginas
  for update to authenticated
  using (privado.mi_rol() in ('edicion', 'direccion'));

create policy suscribirse on public.suscriptores
  for insert to anon, authenticated
  with check (estado = 'pendiente');

create policy ver_suscriptores on public.suscriptores
  for select to authenticated
  using (privado.mi_rol() in ('direccion', 'edicion', 'comunidad', 'infra'));

create policy gestionar_suscriptores on public.suscriptores
  for update to authenticated
  using (privado.mi_rol() in ('direccion', 'edicion', 'comunidad', 'infra'));

create policy ver_envios on public.envios_boletin
  for select to authenticated
  using (privado.mi_rol() in ('direccion', 'edicion', 'comunidad', 'infra'));

create policy crear_envios on public.envios_boletin
  for insert to authenticated
  with check (privado.mi_rol() in ('direccion', 'edicion'));

-- ---------------------------------------------------------------------------
-- Storage
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'imagenes',
    'imagenes',
    true,
    5242880,
    array['image/webp', 'image/jpeg', 'image/png']
  ),
  (
    'audio',
    'audio',
    true,
    5242880,
    array['audio/mpeg', 'audio/mp3']
  ),
  (
    'aportes-medios',
    'aportes-medios',
    false,
    5242880,
    array['image/webp', 'image/jpeg', 'image/png', 'audio/mpeg']
  )
on conflict (id) do nothing;

create policy imagenes_leer on storage.objects
  for select using (bucket_id = 'imagenes');

create policy imagenes_insertar on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'imagenes'
    and privado.mi_rol() in ('reporteria', 'edicion', 'direccion', 'comunidad')
  );

create policy imagenes_actualizar on storage.objects
  for update to authenticated
  using (
    bucket_id = 'imagenes'
    and privado.mi_rol() in ('reporteria', 'edicion', 'direccion', 'comunidad')
  );

create policy audio_leer on storage.objects
  for select using (bucket_id = 'audio');

create policy audio_insertar on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'audio'
    and privado.mi_rol() in ('reporteria', 'edicion', 'direccion', 'comunidad')
  );

create policy audio_actualizar on storage.objects
  for update to authenticated
  using (
    bucket_id = 'audio'
    and privado.mi_rol() in ('reporteria', 'edicion', 'direccion', 'comunidad')
  );

create policy aportes_medios_leer on storage.objects
  for select to authenticated
  using (
    bucket_id = 'aportes-medios'
    and (
      owner = auth.uid()
      or privado.mi_rol() in ('comunidad', 'reporteria', 'edicion', 'direccion', 'consejo')
    )
  );

create policy aportes_medios_insertar on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'aportes-medios'
    and privado.mi_rol() in ('corresponsal', 'reporteria', 'edicion', 'direccion', 'comunidad')
  );

create policy aportes_medios_actualizar on storage.objects
  for update to authenticated
  using (
    bucket_id = 'aportes-medios'
    and (
      owner = auth.uid()
      or privado.mi_rol() in ('comunidad', 'reporteria', 'edicion', 'direccion')
    )
  );
