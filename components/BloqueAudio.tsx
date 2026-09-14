type Props = {
  src: string;
  duracion?: string | null;
};

export function BloqueAudio({ src, duracion }: Props) {
  return (
    <figure className="audio">
      <a className="play" href={src} aria-label="Escuchar el pregón">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 4v16l13-8z" />
        </svg>
      </a>
      <div>
        <b>Escucha esta noticia</b>
        <span>Leída por El Chakero · también en WhatsApp</span>
      </div>
      {duracion ? <div className="dur">{duracion}</div> : null}
    </figure>
  );
}
