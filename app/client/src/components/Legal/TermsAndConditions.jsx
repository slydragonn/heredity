import styles from "./Legal.module.css"

const TermsAndConditions = () => {
  return (
    <div className={styles.legalContainer}>
      <div className={styles.legalContent}>
        <h1 className={styles.legalTitle}>Términos y Condiciones de Uso</h1>
        <p className={styles.legalUpdate}>Última actualización: Mayo 2025</p>

        <div className={styles.legalIntro}>
          <p>
            Bienvenido a Heredity. Estos Términos y Condiciones regulan el uso de nuestra plataforma de testamentos
            descentralizados basada en tecnología blockchain. Al acceder o utilizar Heredity, aceptas cumplir con estos
            términos. Si no estás de acuerdo, por favor no utilices nuestros servicios.
          </p>
        </div>

        <div className={styles.legalSection}>
          <h2>1. Descripción del Servicio</h2>
          <p>
            Heredity es una plataforma descentralizada que permite a los usuarios crear, modificar y gestionar
            testamentos digitales para activos basados en blockchain (como criptomonedas y NFTs). Utilizamos contratos
            inteligentes para garantizar la seguridad, transparencia e inmutabilidad del testamento.
          </p>
        </div>

        <div className={styles.legalSection}>
          <h2>2. Requisitos de Elegibilidad</h2>
          <ul>
            <li>Debes ser mayor de edad (18 años o más) según las leyes de tu país de residencia.</li>
            <li>Debes tener capacidad legal para crear un testamento.</li>
            <li>
              El uso de la plataforma está prohibido en jurisdicciones donde el uso de tecnología blockchain esté
              restringido o prohibido.
            </li>
          </ul>
        </div>

        <div className={styles.legalSection}>
          <h2>3. Naturaleza del Servicio</h2>
          <p>
            Heredity <strong>no reemplaza</strong> un testamento legal tradicional. Nuestra plataforma debe considerarse
            como un <strong>complemento</strong> para la gestión de activos digitales. Recomendamos consultar con un
            asesor legal en tu país para validar la legalidad de tu testamento blockchain.
          </p>
        </div>

        <div className={styles.legalSection}>
          <h2>4. Seguridad y Acceso</h2>
          <ul>
            <li>El acceso a tu testamento está vinculado a tu wallet digital. No almacenamos tus claves privadas.</li>
            <li>Eres responsable de mantener seguras tus frases de recuperación y llaves privadas.</li>
            <li>Si pierdes acceso a tu wallet, no podrás modificar tu testamento.</li>
          </ul>
        </div>

        <div className={styles.legalSection}>
          <h2>5. Tarifas</h2>
          <p>
            El uso de Heredity requiere un pago único. No hay comisiones recurrentes. Los costos de transacciones en
            blockchain (gas fees) pueden aplicar y son responsabilidad del usuario.
          </p>
        </div>

        <div className={styles.legalSection}>
          <h2>6. Uso Aceptable</h2>
          <p>Está prohibido:</p>
          <ul>
            <li>Usar la plataforma para fines fraudulentos o ilegales.</li>
            <li>Interferir con el funcionamiento técnico del sitio.</li>
            <li>Acceder a datos de otros usuarios sin autorización.</li>
          </ul>
        </div>

        <div className={styles.legalSection}>
          <h2>7. Limitación de Responsabilidad</h2>
          <p>
            Heredity no garantiza que los testamentos serán reconocidos legalmente por autoridades en todas las
            jurisdicciones. No somos responsables por:
          </p>
          <ul>
            <li>Pérdida de acceso a wallets.</li>
            <li>Mal uso de la información registrada.</li>
            <li>Errores derivados de condiciones externas a nuestro sistema, como fallos de la blockchain.</li>
          </ul>
        </div>

        <div className={styles.legalSection}>
          <h2>8. Propiedad Intelectual</h2>
          <p>
            Todo el contenido de la plataforma, incluyendo el diseño, marca y código, es propiedad de Heredity o se
            utiliza bajo licencia. Está prohibida su reproducción sin autorización previa.
          </p>
        </div>

        <div className={styles.legalSection}>
          <h2>9. Cambios en los Términos</h2>
          <p>
            Nos reservamos el derecho de modificar estos Términos en cualquier momento. Te notificaremos sobre cambios
            importantes a través de la plataforma. El uso continuo implica aceptación de los nuevos términos.
          </p>
        </div>

        <div className={styles.legalSection}>
          <h2>10. Contacto</h2>
          <p>Si tienes preguntas sobre estos Términos, puedes contactarnos a través de:</p>
          <ul>
            <li>
              Correo: <a href="mailto:info@heredity.com">info@heredity.com</a>
            </li>
            <li>Ubicación: Medellín, Colombia</li>
          </ul>
        </div>

        <div className={styles.legalFooter}>
          <p>Gracias por confiar en Heredity. Tu legado digital está en buenas manos.</p>
        </div>
      </div>
    </div>
  )
}

export default TermsAndConditions
