import { PaginaFija } from "@/components/PaginaFija";
import { CANAL_WHATSAPP, CORREO_NOTICIAS } from "@/lib/site";

export const metadata = {
  title: "Datos y privacidad",
  description:
    "Qué datos guarda El Chakero, para qué, por cuánto tiempo y cómo pedir su eliminación, según la Ley 1581 de 2012.",
};

export default function DatosYPrivacidad() {
  return (
    <PaginaFija titulo="Datos y privacidad">
      <p>
        Este aviso de privacidad explica el tratamiento de datos personales en
        El Chakero, medio digital de San Basilio de Palenque, Bolívar,
        Colombia. Se rige por la Ley 1581 de 2012, el Decreto 1377 de 2013 y
        las normas que los complementan. Leer el sitio no exige crear una
        cuenta ni dejar un correo.
      </p>

      <section>
        <h2>Responsable</h2>
        <p>
          El responsable del tratamiento es El Chakero, con sitio{" "}
          <a href="https://elchakero.com">elchakero.com</a>. Para ejercer
          derechos, escriba a{" "}
          <a href={`mailto:${CORREO_NOTICIAS}`}>{CORREO_NOTICIAS}</a> o use el
          canal de WhatsApp.
        </p>
      </section>

      <section>
        <h2>Qué se recoge y para qué</h2>
        <h3>Boletín semanal</h3>
        <p>
          Si alguien se apunta al boletín, se guarda el correo, el estado de la
          suscripción (pendiente de confirmar, activa o de baja) y las claves
          para confirmar o darse de baja. La finalidad es enviar, una vez por
          semana, las piezas más relevantes, y honrar la confirmación previa y
          la baja. La base es el consentimiento. No se manda el boletín hasta
          que el correo se confirma.
        </p>
        <h3>Cuentas del equipo</h3>
        <p>
          Quien entra a la sala de redacción deja correo, nombre, rol en el
          medio y datos de sesión. Puede entrar con correo y contraseña o con
          Google. La finalidad es autenticar, asignar roles (reportería,
          edición, dirección, comunidad, consejo, tesorería, corresponsal) y
          operar el sistema de piezas, aportes y agenda. Eso no es una cuenta
          pública de lectora.
        </p>
        <h3>Canal de WhatsApp</h3>
        <p>
          El pregón diario se oye en el{" "}
          <a href={CANAL_WHATSAPP} rel="noreferrer">
            canal de WhatsApp de El Chakero
          </a>
          . Quien se une al canal lo hace en la plataforma de Meta. El Chakero
          no recibe, por esta web, la lista de seguidores del canal. Si alguien
          escribe un dato por ahí, WhatsApp trata esa conversación según sus
          propias reglas; esta redacción puede ver el número, el nombre que
          muestre la app y el mensaje, para verificar un hecho o contestar. No
          usamos ese número para el boletín.
        </p>
        <h3>Aportes de la comunidad</h3>
        <p>
          Un aporte puede traer texto, lugar y archivos (foto o audio). La
          finalidad es verificar y, si corresponde, convertirlo en pieza. Un
          aporte no se publica solo.
        </p>
        <h3>Navegación</h3>
        <p>
          El sitio público se puede leer sin cookies de seguimiento. No hay
          analítica de terceros. Quien entra al equipo deja cookies de sesión
          para mantenerse identificado. El alojamiento (Vercel), la base y el
          acceso (Supabase) y el correo del boletín (Resend) tratan datos como
          encargados, solo para operar el medio.
        </p>
      </section>

      <section>
        <h2>Cuánto tiempo</h2>
        <ul>
          <li>
            Boletín: mientras la suscripción esté activa. Si pide la baja, el
            correo puede quedar marcado como baja para no volver a enviar y no
            re-suscribirlo por error. Quien pida la supresión total, se borra.
          </li>
          <li>
            Cuentas del equipo: mientras la persona forme parte de la sala. Si
            pide la eliminación, o si dirección cierra la cuenta, se suprime el
            perfil y la sesión. El historial editorial de piezas ya publicadas
            puede conservar la autoría como «Redacción El Chakero» para no
            dejar el archivo público sin firma.
          </li>
          <li>
            Mensajes y aportes: el tiempo de verificar el dato. Si se convierte
            en pieza, el material editorial se guarda con la noticia. Si se
            descarta, no se publica.
          </li>
          <li>
            Cookies de sesión del equipo: hasta que cierre sesión o caduque la
            cookie.
          </li>
        </ul>
      </section>

      <section>
        <h2>Derechos</h2>
        <p>
          Quien figure en estos datos puede, de forma gratuita: conocerlos,
          actualizarlos y rectificarlos; pedir prueba de la autorización;
          ser informado del uso; revocar el consentimiento; pedir la
          supresión; y acceder a ellos. También puede presentar queja ante la
          Superintendencia de Industria y Comercio, autoridad de habeas data
          en Colombia.
        </p>
      </section>

      <section>
        <h2>Cómo pedir la eliminación</h2>
        <p>
          Escriba a <a href={`mailto:${CORREO_NOTICIAS}`}>{CORREO_NOTICIAS}</a>{" "}
          desde el mismo correo que quiere borrar, o indique el número con el
          que escribió al canal. Pida, con claridad, qué quiere: baja del
          boletín, corrección o supresión. Contestamos por ese mismo correo. La
          baja del boletín también puede ir en un enlace al pie de cada envío.
        </p>
      </section>

      <section>
        <h2>Menores</h2>
        <p>
          No publicamos foto de un menor sin autorización de quien lo
          represente. Si una pieza necesita ese consentimiento, se registra
          antes de publicar. Si usted es acudiente y ve una foto que no debió
          salir, escriba a{" "}
          <a href={`mailto:${CORREO_NOTICIAS}`}>{CORREO_NOTICIAS}</a> y se
          retira o se corrige a la vista.
        </p>
      </section>

      <section>
        <h2>Transferencias y terceros</h2>
        <p>
          No vendemos listas. Los encargados (alojamiento, base de datos,
          correo transaccional, WhatsApp/Meta para el canal) tratan datos para
          las finalidades de este aviso. Parte de esa infraestructura puede
          estar fuera de Colombia. El Chakero sigue siendo el responsable ante
          usted.
        </p>
      </section>

      <section>
        <h2>Cambios</h2>
        <p>
          Si cambia lo que se recoge o para qué, esta página se actualiza. Vale
          la versión publicada aquí.
        </p>
      </section>
    </PaginaFija>
  );
}
