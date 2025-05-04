import React from "react"
import { ArrowRight, Shield, Clock, FileText } from "lucide-react"
import styles from "./Hero.module.css"
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Testamento Descentralizado</h1>
          <h2 className={styles.subtitle}>Asegura el futuro de tus activos digitales</h2>
          <p className={styles.description}>
            Heredity te permite dejar instrucciones y activos en smart contracts que se liberan a tus herederos bajo
            condiciones específicas, garantizando que tus deseos se cumplan de forma segura y transparente.
          </p>
          <div className={styles.buttons}>
          <Link to="/auth" className={styles.primaryButton}>
            Comenzar Ahora <ArrowRight size={16} />
          </Link>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.image}></div>
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <Shield size={32} />
          </div>
          <h3 className={styles.featureTitle}>Seguridad Blockchain</h3>
          <p className={styles.featureDescription}>
            Tus activos están protegidos por la tecnología blockchain, inmutable y transparente.
          </p>
        </div>

        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <Clock size={32} />
          </div>
          <h3 className={styles.featureTitle}>Condiciones Personalizadas</h3>
          <p className={styles.featureDescription}>
            Establece condiciones específicas como inactividad, firmas o fechas para la liberación.
          </p>
        </div>

        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <FileText size={32} />
          </div>
          <h3 className={styles.featureTitle}>Control Total</h3>
          <p className={styles.featureDescription}>
            Mantén el control de tus activos con la capacidad de modificar o cancelar en cualquier momento.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
