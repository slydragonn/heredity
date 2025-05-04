import { GitlabIcon as GitHub, Linkedin, Mail } from 'lucide-react'
import Sara from "../../assets/sara.jpg"
import Caro from "../../assets/caro.jpg"
import Juan from "../../assets/juank.jpg"
import Alejo from "../../assets/alejo.jpg"

import styles from "./ContactPage.module.css"

const ContactPage = () => {
  const teamMembers = [
    {
      name: "Sara Castañeda",
      role: "Desarrolladora Frontend",
      photo: Sara,
      github: "https://github.com/Saraccee25",
      email: "saracastanedaecheverri@gmail.com",
      linkedin: "https://www.linkedin.com/in/sara-castañeda-999876285"
    },
    {
      name: "Sara Carolina Sánchez",
      role: "Desarrolladora Backend",
      photo: Caro,
      github: "https://github.com/Caro-26S",
      email: "sanchez.sara2674@gmail.com",
      linkedin: "https://www.linkedin.com/in/sara-sánchez-arroyave-267275363"
    },
    {
      name: "Juan Camilo Alzate",
      role: "Desarrollador Backend",
      photo: Juan,
      github: "https://github.com/11JuanK11",
      email: "camiloalzatebedoya15@gmail.com",
      linkedin: "https://www.linkedin.com/in/camilo-alzate-3207a8337"
    },
    {
      name: "Alejandro Londoño",
      role: "Desarrollador FullStack",
      photo: Alejo,
      github: "https://github.com/slydragonn",
      email: "alogo18m@gmail.com",
      linkedin: "https://linkedin.com/in/alejolg"
    }
  ]

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactHeader}>
        <h1 className={styles.title}>Nuestro Equipo</h1>
        <p className={styles.subtitle}>
          Conoce a las personas detrás de Heredity, trabajamos para asegurar el futuro de tus activos digitales
        </p>
      </div>

      <div className={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <div key={index} className={styles.teamCard}>
            <div className={styles.photoContainer}>
              <img src={member.photo || "/placeholder.svg"} alt={member.name} className={styles.photo} />
            </div>
            <h2 className={styles.memberName}>{member.name}</h2>
            <p className={styles.memberRole}>{member.role}</p>
            
            <div className={styles.socialLinks}>
              <a href={member.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <GitHub size={20} />
                <span className={styles.linkText}>GitHub</span>
              </a>
              <a href={`mailto:${member.email}`} className={styles.socialLink}>
                <Mail size={20} />
                <span className={styles.linkText}>Email</span>
              </a>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Linkedin size={20} />
                <span className={styles.linkText}>LinkedIn</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.contactInfo}>
        <h2>¿Tienes alguna pregunta?</h2>
        <p>
          Estamos aquí para ayudarte. Puedes contactarnos directamente a través de nuestro correo electrónico principal:
        </p>
        <a href="mailto:info@heredity.com" className={styles.contactEmail}>
          info@heredity.com
        </a>
        <p className={styles.officeInfo}>
          Nuestras oficinas están ubicadas en Medellín, Colombia.
        </p>
      </div>
    </div>
  )
}

export default ContactPage
