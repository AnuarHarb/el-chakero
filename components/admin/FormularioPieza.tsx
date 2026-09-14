"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  mensajeDesdeError,
  LIMITE_MEDIOS_BYTES,
  puedeEditarPieza,
  puedeMandarRevision,
  requisitosRevision,
  textoONull,
  tipoAudioPermitido,
  tipoFotoPermitido,
  esTresPorDos,
} from "@/lib/admin/pieza";
import { SECCIONES } from "@/lib/site";
import { createClient } from "@/lib/supabase/client";
import {
  ETIQUETA_FORMATO,
  FORMATOS_FORMULARIO,
  type Formato,
  type Pieza,
  type Rol,
  type Seccion,
} from "@/lib/supabase/tipos";

type Props = {
  pieza?: Pieza | null;
  userId: string;
  rol: Rol;
};

type Destino = "idea" | "borrador" | "guardar" | "en_revision";

function formatoDuracion(segundos: number): string {
  if (!Number.isFinite(segundos) || segundos < 0) return "";
  const total = Math.round(segundos);
  const minutos = Math.floor(total / 60);
  const resto = total % 60;
  return `${minutos}:${String(resto).padStart(2, "0")}`;
}

function extensionDe(file: File, fallback: string): string {
  const nombre = file.name.toLowerCase();
  if (nombre.endsWith(".jpeg") || nombre.endsWith(".jpg")) return "jpg";
  if (nombre.endsWith(".png")) return "png";
  if (nombre.endsWith(".webp")) return "webp";
  if (nombre.endsWith(".mp3")) return "mp3";
  if (file.type === "image/jpeg") return "jpg";
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  if (file.type === "audio/mpeg" || file.type === "audio/mp3") return "mp3";
  return fallback;
}

function contentTypeDe(file: File, fallback: string): string {
  if (file.type === "audio/mp3") return "audio/mpeg";
  if (file.type) return file.type;
  return fallback;
}

function leerDuracion(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const audio = document.createElement("audio");
    audio.preload = "metadata";
    const url = URL.createObjectURL(file);
    audio.onloadedmetadata = () => {
      const duracion = audio.duration;
      URL.revokeObjectURL(url);
      if (!Number.isFinite(duracion)) {
        reject(new Error("No se pudo oír la duración de este audio."));
        return;
      }
      resolve(duracion);
    };
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo leer el audio."));
    };
    audio.src = url;
  });
}

function leerMedidas(file: File): Promise<{ ancho: number; alto: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const ancho = img.naturalWidth;
      const alto = img.naturalHeight;
      URL.revokeObjectURL(url);
      resolve({ ancho, alto });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo leer la foto."));
    };
    img.src = url;
  });
}

function destinoDelEvento(evento: FormEvent<HTMLFormElement>): Destino {
  const nativo = evento.nativeEvent as SubmitEvent;
  const boton = nativo.submitter;
  if (boton instanceof HTMLButtonElement) {
    if (
      boton.value === "idea" ||
      boton.value === "borrador" ||
      boton.value === "guardar" ||
      boton.value === "en_revision"
    ) {
      return boton.value;
    }
  }
  return "borrador";
}

export function FormularioPieza({ pieza, userId, rol }: Props) {
  const router = useRouter();
  const esNueva = !pieza;
  const readonly = pieza ? !puedeEditarPieza(rol, userId, pieza) : false;

  const [titulo, setTitulo] = useState(pieza?.titulo ?? "");
  const [seccion, setSeccion] = useState<Seccion>(pieza?.seccion ?? "comunidad");
  const [formato, setFormato] = useState<Formato>(pieza?.formato ?? "noticia");
  const [entradilla, setEntradilla] = useState(pieza?.entradilla ?? "");
  const [cuerpo, setCuerpo] = useState(pieza?.cuerpo ?? "");
  const [pieFoto, setPieFoto] = useState(pieza?.pie_foto ?? "");
  const [vinculo, setVinculo] = useState(pieza?.vinculo ?? false);
  const [transparencia, setTransparencia] = useState(
    pieza?.transparencia ?? "",
  );
  const [fotoUrl, setFotoUrl] = useState<string | null>(pieza?.foto_url ?? null);
  const [audioUrl, setAudioUrl] = useState<string | null>(
    pieza?.audio_url ?? null,
  );
  const [duracion, setDuracion] = useState<string | null>(
    pieza?.duracion ?? null,
  );
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(
    pieza?.foto_url ?? null,
  );
  const [error, setError] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    return () => {
      if (fotoPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(fotoPreview);
      }
    };
  }, [fotoPreview]);

  const faltan = requisitosRevision({
    titulo,
    formato,
    entradilla,
    tieneFoto: Boolean(fotoFile || fotoUrl),
    pie_foto: pieFoto,
    tieneAudio: Boolean(audioFile || audioUrl),
    duracion,
  });

  const puedeMandar =
    !readonly &&
    faltan.length === 0 &&
    (esNueva || (pieza ? puedeMandarRevision(userId, pieza) : false));

  async function onFoto(file: File | null) {
    setError(null);
    if (!file) return;
    if (file.size > LIMITE_MEDIOS_BYTES) {
      setError("La foto no puede pesar más de 5 MB.");
      return;
    }
    if (!tipoFotoPermitido(file)) {
      setError("La foto tiene que ser jpeg, png o webp.");
      return;
    }
    try {
      const { ancho, alto } = await leerMedidas(file);
      if (!esTresPorDos(ancho, alto)) {
        setError(
          `La foto tiene que ser 3:2 (como 1200×800). Esta mide ${ancho}×${alto}. No recortamos solos; cambia el recorte y súbela otra vez.`,
        );
        return;
      }
    } catch (fallo) {
      setError(fallo instanceof Error ? fallo.message : "No se pudo leer la foto.");
      return;
    }
    if (fotoPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(fotoPreview);
    }
    setFotoFile(file);
    setFotoPreview(URL.createObjectURL(file));
  }

  async function onAudio(file: File | null) {
    setError(null);
    if (!file) return;
    if (file.size > LIMITE_MEDIOS_BYTES) {
      setError("El audio no puede pesar más de 5 MB.");
      return;
    }
    if (!tipoAudioPermitido(file)) {
      setError("El pregón tiene que ser mp3.");
      return;
    }
    try {
      const segundos = await leerDuracion(file);
      const texto = formatoDuracion(segundos);
      setAudioFile(file);
      setDuracion(texto);
      if (segundos < 60 || segundos > 90) {
        setAviso(
          `El pregón del medio es de 60 a 90 segundos. Este audio dura ${texto}.`,
        );
      } else {
        setAviso(null);
      }
    } catch (fallo) {
      setError(fallo instanceof Error ? fallo.message : "No se pudo leer el audio.");
    }
  }

  async function guardar(destino: Destino) {
    setError(null);
    if (readonly) return;
    if (!titulo.trim()) {
      setError("Falta el título.");
      return;
    }
    if ((fotoFile || fotoUrl) && !textoONull(pieFoto)) {
      setError("La foto lleva pie. Dilo en una línea.");
      return;
    }

    const quiereRevision = destino === "en_revision";
    if (quiereRevision && faltan.length > 0) {
      setError(`Para revisión falta: ${faltan.join(", ")}.`);
      return;
    }
    if (quiereRevision && pieza && !puedeMandarRevision(userId, pieza)) {
      setError(
        "A revisión solo sale un borrador, y lo manda quien lo escribe, con cambiar_estado.",
      );
      return;
    }

    setCargando(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setCargando(false);
      setError("La sesión se cayó. Vuelve a entrar.");
      return;
    }

    const id = pieza?.id ?? crypto.randomUUID();
    let siguienteFoto = fotoUrl;
    let siguienteAudio = audioUrl;
    const siguienteDuracion = textoONull(duracion);

    try {
      if (fotoFile) {
        const ext = extensionDe(fotoFile, "jpg");
        const path = `${user.id}/${id}/foto-${crypto.randomUUID()}.${ext}`;
        const { error: fallo } = await supabase.storage
          .from("imagenes")
          .upload(path, fotoFile, {
            contentType: contentTypeDe(fotoFile, "image/jpeg"),
            upsert: false,
          });
        if (fallo) {
          throw new Error(mensajeDesdeError(fallo));
        }
        siguienteFoto = supabase.storage.from("imagenes").getPublicUrl(path)
          .data.publicUrl;
      }

      if (audioFile) {
        const path = `${user.id}/${id}/pregon-${crypto.randomUUID()}.mp3`;
        const { error: fallo } = await supabase.storage
          .from("audio")
          .upload(path, audioFile, {
            contentType: contentTypeDe(audioFile, "audio/mpeg"),
            upsert: false,
          });
        if (fallo) {
          throw new Error(mensajeDesdeError(fallo));
        }
        siguienteAudio = supabase.storage.from("audio").getPublicUrl(path)
          .data.publicUrl;
      }

      const contenido = {
        titulo: titulo.trim(),
        seccion,
        formato,
        entradilla: textoONull(entradilla),
        cuerpo: textoONull(cuerpo),
        foto_url: siguienteFoto,
        pie_foto: textoONull(pieFoto),
        audio_url: siguienteAudio,
        duracion: siguienteDuracion,
        vinculo,
        transparencia: textoONull(transparencia),
      };

      if (esNueva) {
        const estadoInicial = destino === "idea" ? "idea" : "borrador";
        const { error: fallo } = await supabase.from("piezas").insert({
          id,
          autor_id: user.id,
          estado: estadoInicial,
          ...contenido,
        });
        if (fallo) {
          throw new Error(mensajeDesdeError(fallo));
        }
      } else {
        const { error: fallo } = await supabase
          .from("piezas")
          .update({
            ...contenido,
            actualizado_en: new Date().toISOString(),
          })
          .eq("id", id);
        if (fallo) {
          throw new Error(mensajeDesdeError(fallo));
        }
      }

      if (quiereRevision) {
        const { error: fallo } = await supabase.rpc("cambiar_estado", {
          p_id: id,
          nuevo: "en_revision",
        });
        if (fallo) {
          throw new Error(mensajeDesdeError(fallo));
        }
      }

      if (esNueva) {
        router.push(`/admin/piezas/${id}/`);
        router.refresh();
        return;
      }

      setFotoFile(null);
      setAudioFile(null);
      setFotoUrl(siguienteFoto);
      setAudioUrl(siguienteAudio);
      setAviso(quiereRevision ? "Quedó en revisión." : "Guardada.");
      router.refresh();
    } catch (fallo) {
      setError(fallo instanceof Error ? fallo.message : "No se pudo guardar.");
    } finally {
      setCargando(false);
    }
  }

  function onSubmit(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    void guardar(destinoDelEvento(evento));
  }

  const bloqueado = readonly || cargando;

  return (
    <form
      className="formulario formulario-pieza"
      onSubmit={onSubmit}
      autoComplete="off"
      aria-busy={cargando}
    >
      {error ? (
        <p className="error" role="alert">
          {error}
        </p>
      ) : null}
      {aviso ? (
        <p className="aviso" role="status">
          {aviso}
        </p>
      ) : null}
      {pieza?.estado === "idea" ? (
        <p className="aviso">
          Esta pieza es una idea. A revisión solo sale un borrador, y el estado
          cambia con <code>cambiar_estado</code>. En esta fase, créala como
          borrador para redactar y mandarla.
        </p>
      ) : null}
      {readonly ? (
        <p className="aviso" role="status">
          Esta pieza ya no se edita aquí. El estado no se cambia a mano.
        </p>
      ) : null}

      <label>
        Título
        <input
          type="text"
          name="titulo"
          required
          value={titulo}
          disabled={bloqueado}
          onChange={(evento) => setTitulo(evento.target.value)}
        />
      </label>

      <label>
        Sección
        <select
          name="seccion"
          value={seccion}
          disabled={bloqueado}
          onChange={(evento) => setSeccion(evento.target.value as Seccion)}
        >
          {SECCIONES.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.etiqueta}
            </option>
          ))}
        </select>
      </label>

      <label>
        Formato
        <select
          name="formato"
          value={formato}
          disabled={bloqueado}
          onChange={(evento) => setFormato(evento.target.value as Formato)}
        >
          {FORMATOS_FORMULARIO.map((item) => (
            <option key={item} value={item}>
              {ETIQUETA_FORMATO[item]}
            </option>
          ))}
        </select>
      </label>
      <p className="aviso">
        Empezamos por noticia: lleva foto 3:2 y pregón. La galería entra
        después.
      </p>

      <label>
        Entradilla
        <textarea
          name="entradilla"
          rows={3}
          value={entradilla}
          disabled={bloqueado}
          onChange={(evento) => setEntradilla(evento.target.value)}
        />
      </label>

      <label>
        Cuerpo
        <textarea
          name="cuerpo"
          rows={12}
          value={cuerpo}
          disabled={bloqueado}
          onChange={(evento) => setCuerpo(evento.target.value)}
        />
      </label>
      <p className="aviso">
        Párrafos. Separa uno de otro con una línea en blanco.
      </p>

      <fieldset>
        <legend>Foto 3:2</legend>
        <label>
          Archivo
          <input
            type="file"
            name="foto"
            accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            disabled={bloqueado}
            onChange={(evento) => void onFoto(evento.target.files?.[0] ?? null)}
          />
        </label>
        <div className="foto-pieza">
          {fotoPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={fotoPreview} alt={pieFoto || "Vista previa de la foto"} />
          ) : (
            "Foto 3:2"
          )}
        </div>
        <label>
          Pie de foto
          <input
            type="text"
            name="pie_foto"
            value={pieFoto}
            disabled={bloqueado}
            onChange={(evento) => setPieFoto(evento.target.value)}
          />
        </label>
        <p className="aviso">
          El pie es obligatorio si hay foto. No recortamos a 3:2: si no calza,
          se rechaza.
        </p>
      </fieldset>

      <fieldset>
        <legend>Pregón</legend>
        <label>
          Audio mp3
          <input
            type="file"
            name="audio"
            accept="audio/mpeg,audio/mp3,.mp3"
            disabled={bloqueado}
            onChange={(evento) =>
              void onAudio(evento.target.files?.[0] ?? null)
            }
          />
        </label>
        <p>
          Duración:{" "}
          <strong>{duracion ?? "aún no se oye"}</strong>
          {audioUrl && !audioFile ? (
            <>
              {" · "}
              <a href={audioUrl}>Oír el archivo</a>
            </>
          ) : null}
        </p>
        {formato === "noticia" ? (
          <p className="aviso">
            Toda noticia lleva pregón. Sin audio y duración no pasa a revisión.
          </p>
        ) : null}
      </fieldset>

      <label className="cheque">
        <input
          type="checkbox"
          name="vinculo"
          checked={vinculo}
          disabled={bloqueado}
          onChange={(evento) => setVinculo(evento.target.checked)}
        />
        Esta pieza toca al medio
      </label>
      {vinculo ? (
        <label>
          Transparencia
          <textarea
            name="transparencia"
            rows={3}
            value={transparencia}
            disabled={bloqueado}
            onChange={(evento) => setTransparencia(evento.target.value)}
          />
        </label>
      ) : null}

      {faltan.length > 0 ? (
        <p className="aviso">
          Para pasar a revisión falta: {faltan.join(", ")}.
        </p>
      ) : (
        <p className="aviso">
          Lista para revisión: título, entradilla, foto, pie
          {formato === "noticia" ? " y pregón con duración" : ""}. El estado
          solo cambia con <code>cambiar_estado</code>.
        </p>
      )}

      {readonly ? null : (
        <div className="acciones">
          {esNueva ? (
            <>
              <button
                className="boton boton-secundario"
                type="submit"
                name="destino"
                value="idea"
                disabled={cargando}
              >
                Guardar idea
              </button>
              <button
                className="boton"
                type="submit"
                name="destino"
                value="borrador"
                disabled={cargando}
              >
                {cargando ? "Guardando…" : "Guardar borrador"}
              </button>
            </>
          ) : (
            <button
              className="boton"
              type="submit"
              name="destino"
              value="guardar"
              disabled={cargando}
            >
              {cargando ? "Guardando…" : "Guardar"}
            </button>
          )}
          <button
            className="boton boton-secundario"
            type="submit"
            name="destino"
            value="en_revision"
            disabled={cargando || !puedeMandar}
          >
            Mandar a revisión
          </button>
        </div>
      )}
    </form>
  );
}
