"use client"

import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X, ChevronDown } from "lucide-react"
import styles from "./Navbar.module.css"
import Logo from "../Logo/Logo"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logoLink}>
            <Logo />
          </Link>
        </div>

        <div className={styles.menuToggle} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <div className={`${styles.menuItems} ${isOpen ? styles.active : ""}`}>
          <Link to="/" className={styles.menuItem}>
            Inicio
          </Link>

          <div className={styles.dropdown}>
            <button
              className={styles.dropdownToggle}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Servicios <ChevronDown size={16} />
            </button>
            <div className={`${styles.dropdownMenu} ${dropdownOpen ? styles.show : ""}`}>
              <Link to="/crear-testamento" className={styles.dropdownItem}>
                Crear Testamento
              </Link>
              <Link to="/gestionar-activos" className={styles.dropdownItem}>
                Gestionar Activos
              </Link>
              <Link to="/beneficiarios" className={styles.dropdownItem}>
                Beneficiarios
              </Link>
            </div>
          </div>

          <Link to="/como-funciona" className={styles.menuItem}>
            Cómo Funciona
          </Link>
          <Link to="/faq" className={styles.menuItem}>
            FAQ
          </Link>
          <Link to="/contacto" className={styles.menuItem}>
            Contacto
          </Link>
        </div>

        <div className={styles.authButtons}>
          <Link to="/login" className={styles.loginButton}>
            Iniciar Sesión
          </Link>
          <Link to="/registro" className={styles.registerButton}>
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
