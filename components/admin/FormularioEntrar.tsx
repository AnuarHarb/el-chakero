"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  supabaseListo: boolean;
  siguiente?: string;
};

export function FormularioEntrar({ supabaseListo, siguiente = "/admin/" }: Props) {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  if (!supabaseListo) {
    return (
      <div className="error" role="status">
        <p>
          Falta configurar Supabase. Copia <code>.env.example</code> a{" "}
          <code>.env.local</code> y llena URL y clave anónima (o publishable).
          El sitio público sí se puede ver sin eso.
        </p>
      </div>
    );
  }

  async function entrar(evento: React.FormEvent) {
    evento.preventDefault();
    setError(null);
    setAviso(null);
    setCargando(true);
    const supabase = createClient();
    const { error: fallo } = await supabase.auth.signInWithPassword({
      email: correo,
      password: clave,
    });
    setCargando(false);
    if (fallo) {
      setError(fallo.message === "Invalid login credentials"
        ? "Correo o contraseña no coinciden."
        : fallo.message);
      return;
    }
    window.location.assign(siguiente);
  }

  async function crearCuenta() {
    setError(null);
    setAviso(null);
    setCargando(true);
    const supabase = createClient();
    const { error: fallo } = await supabase.auth.signUp({
      email: correo,
      password: clave,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(siguiente)}`,
        data: { nombre: correo.split("@")[0] },
      },
    });
    setCargando(false);
    if (fallo) {
      setError(fallo.message);
      return;
    }
    setAviso(
      "Cuenta creada. Si el proyecto pide confirmar el correo, revisa la bandeja. El rol inicial es lector.",
    );
  }

  async function google() {
    setError(null);
    const supabase = createClient();
    const { error: fallo } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(siguiente)}`,
      },
    });
    if (fallo) {
      setError(
        "Google no está habilitado todavía. Enciéndelo en Auth → Providers de Supabase.",
      );
    }
  }

  return (
    <div>
      <form className="formulario" onSubmit={entrar}>
        <label>
          Correo
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={correo}
            onChange={(evento) => setCorreo(evento.target.value)}
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            minLength={8}
            value={clave}
            onChange={(evento) => setClave(evento.target.value)}
          />
        </label>
        {error ? (
          <p className="error" role="alert">
            {error}
          </p>
        ) : null}
        {aviso ? (
          <p className="vacio" role="status">
            {aviso}
          </p>
        ) : null}
        <div className="acciones">
          <button className="boton" type="submit" disabled={cargando}>
            {cargando ? "Entrando…" : "Entrar"}
          </button>
          <button
            className="boton boton-secundario"
            type="button"
            disabled={cargando}
            onClick={crearCuenta}
          >
            Crear cuenta
          </button>
        </div>
      </form>
      <p className="aviso">O entra con Google, si Anuar ya lo configuró.</p>
      <button className="boton boton-secundario" type="button" onClick={google}>
        Continuar con Google
      </button>
    </div>
  );
}
