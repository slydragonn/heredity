import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import Logo from "../Logo/Logo"
import styles from "./Footer.module.css"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerMain}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <Logo />
            </div>
            <p className={styles.footerDescription}>
              Plataforma de testamentos descentralizados basada en blockchain que te permite asegurar el futuro de tus
              activos digitales de forma segura y transparente.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.footerLinkGroup}>
              <h3 className={styles.footerLinkTitle}>Plataforma</h3>
              <ul className={styles.footerLinkList}>
                <li>
                  <Link to="/" className={styles.footerLink}>
                    Inicio
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.footerLinkGroup}>
              <h3 className={styles.footerLinkTitle}>Recursos</h3>
              <ul className={styles.footerLinkList}>
                <li>
                  <Link to="/faq" className={styles.footerLink}>
                    Preguntas Frecuentes
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.footerLinkGroup}>
              <h3 className={styles.footerLinkTitle}>Legal</h3>
              <ul className={styles.footerLinkList}>
                <li>
                  <Link to="/terminos" className={styles.footerLink}>
                    Términos y Condiciones
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.footerContact}>
            <h3 className={styles.footerLinkTitle}>Contacto</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <Mail size={18} />
                <a href="mailto:info@heredity.com" className={styles.contactLink}>
                  info@heredity.com
                </a>
              </li>
              <li className={styles.contactItem}>
                <MapPin size={18} />
                <span>Medellín,Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.copyright}>&copy; {currentYear} Heredity. Todos los derechos reservados.</div>
          <div className={styles.footerBottomLinks}>
            <Link to="/terminos" className={styles.footerBottomLink}>
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
