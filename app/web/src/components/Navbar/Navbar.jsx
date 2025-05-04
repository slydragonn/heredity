"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import styles from "./Navbar.module.css";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

          <Link to="/faq" className={styles.menuItem}>
            FAQ
          </Link>
          <Link to="/contacto" className={styles.menuItem}>
            Contacto
          </Link>
        </div>

        <div className={styles.authButtons}>
          <Link to="/auth" className={styles.loginButton}>
            Iniciar Sesión ó Regístrate
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
