-- Primer camino de admin. Corre en el SQL editor de Supabase (rol postgres)
-- DESPUÉS de que esa persona ya creó su cuenta en /admin/entrar/.
-- Cambia el correo. infra no se asigna desde la app.

do $$
declare
  correo text := 'CAMBIA_ESTE_CORREO@elchakero.com';
  uid uuid;
begin
  select id into uid from auth.users where email = correo;
  if uid is null then
    raise exception 'No hay cuenta con ese correo. Entra primero en /admin/entrar/.';
  end if;

  perform set_config('privado.permitir_cambio_rol', 'on', true);

  update public.perfiles
  set rol = 'direccion'
  where id = uid;

  update auth.users
  set raw_app_meta_data =
    coalesce(raw_app_meta_data, '{}'::jsonb) || '{"rol":"direccion"}'::jsonb
  where id = uid;
end $$;
