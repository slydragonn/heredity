"use client";

import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Wallet, Lock, ArrowRight, Shield } from "lucide-react";
import styles from "./AuthForms.module.css";

const AuthForms = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    walletAddress: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", loginData);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Register data:", registerData);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authWrapper}>
        <div className={styles.authInfo}>
          <div className={styles.infoContent}>
            <h1 className={styles.infoTitle}>Heredity</h1>
            <h2 className={styles.infoSubtitle}>Testamento Descentralizado</h2>
            <p className={styles.infoText}>
              Asegura el futuro de tus activos digitales con nuestra plataforma de testamentos descentralizados basada en blockchain.
            </p>
            <div className={styles.infoFeatures}>
              <div className={styles.infoFeature}>
                <Shield size={20} />
                <span>Seguridad garantizada por blockchain</span>
              </div>
              <div className={styles.infoFeature}>
                <Wallet size={20} />
                <span>Control total sobre tus activos digitales</span>
              </div>
              <div className={styles.infoFeature}>
                <User size={20} />
                <span>Gestión intuitiva de beneficiarios</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.authCard}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${activeTab === "login" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Iniciar Sesión
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "register" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("register")}
            >
              Registrarse
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === "login" ? (
              <form onSubmit={handleLoginSubmit} className={styles.form}>
                <h2 className={styles.formTitle}>Bienvenido de nuevo</h2>
                <p className={styles.formSubtitle}>Accede a tu cuenta para gestionar tus testamentos</p>

                <div className={styles.formGroup}>
                  <label htmlFor="login-username" className={styles.label}>
                    Nombre de usuario
                  </label>
                  <div className={styles.inputWrapper}>
                    <User size={20} className={styles.inputIcon} />
                    <input
                      type="text"
                      id="login-username"
                      name="username"
                      value={loginData.username}
                      onChange={handleLoginChange}
                      className={styles.input}
                      placeholder="Ingresa tu nombre de usuario"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="login-password" className={styles.label}>
                    Contraseña
                  </label>
                  <div className={styles.inputWrapper}>
                    <Lock size={20} className={styles.inputIcon} />
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      id="login-password"
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className={styles.input}
                      placeholder="Ingresa tu contraseña"
                      required
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                    >
                      {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className={styles.formOptions}>
                  <div className={styles.checkboxWrapper}>
                    <input
                      type="checkbox"
                      id="remember-me"
                      name="rememberMe"
                      checked={loginData.rememberMe}
                      onChange={handleLoginChange}
                      className={styles.checkbox}
                    />
                    <label htmlFor="remember-me" className={styles.checkboxLabel}>
                      Recordarme
                    </label>
                  </div>
                  <a href="#" className={styles.forgotPassword}>
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <button type="submit" className={styles.submitButton}>
                  Iniciar Sesión
                  <ArrowRight size={18} />
                </button>

                <div className={styles.walletLogin}>
                  <div className={styles.divider}>
                    <span>O</span>
                  </div>
                  <button type="button" className={styles.walletButton}>
                    <Wallet size={20} />
                    Conectar con Wallet
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className={styles.form}>
                <h2 className={styles.formTitle}>Crear una cuenta</h2>
                <p className={styles.formSubtitle}>Únete a Heredity para asegurar tus activos digitales</p>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="register-username" className={styles.label}>
                      Nombre de usuario
                    </label>
                    <div className={styles.inputWrapper}>
                      <User size={20} className={styles.inputIcon} />
                      <input
                        type="text"
                        id="register-username"
                        name="username"
                        value={registerData.username}
                        onChange={handleRegisterChange}
                        className={styles.input}
                        placeholder="Elige un nombre de usuario"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="register-email" className={styles.label}>
                      Correo electrónico
                    </label>
                    <div className={styles.inputWrapper}>
                      <Mail size={20} className={styles.inputIcon} />
                      <input
                        type="email"
                        id="register-email"
                        name="email"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        className={styles.input}
                        placeholder="ejemplo@correo.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="register-wallet" className={styles.label}>
                    Dirección de Wallet
                  </label>
                  <div className={styles.inputWrapper}>
                    <Wallet size={20} className={styles.inputIcon} />
                    <input
                      type="text"
                      id="register-wallet"
                      name="walletAddress"
                      value={registerData.walletAddress}
                      onChange={handleRegisterChange}
                      className={styles.input}
                      placeholder="0x..."
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="register-password" className={styles.label}>
                      Contraseña
                    </label>
                    <div className={styles.inputWrapper}>
                      <Lock size={20} className={styles.inputIcon} />
                      <input
                        type={showRegisterPassword ? "text" : "password"}
                        id="register-password"
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        className={styles.input}
                        placeholder="Crea una contraseña segura"
                        required
                      />
                      <button
                        type="button"
                        className={styles.passwordToggle}
                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                      >
                        {showRegisterPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="register-confirm-password" className={styles.label}>
                      Confirmar Contraseña
                    </label>
                    <div className={styles.inputWrapper}>
                      <Lock size={20} className={styles.inputIcon} />
                      <input
                        type={showRegisterConfirmPassword ? "text" : "password"}
                        id="register-confirm-password"
                        name="confirmPassword"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                        className={styles.input}
                        placeholder="Confirma tu contraseña"
                        required
                      />
                      <button
                        type="button"
                        className={styles.passwordToggle}
                        onClick={() => setShowRegisterConfirmPassword(!showRegisterConfirmPassword)}
                      >
                        {showRegisterConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.formOptions}>
                  <div className={styles.checkboxWrapper}>
                    <input
                      type="checkbox"
                      id="accept-terms"
                      name="acceptTerms"
                      checked={registerData.acceptTerms}
                      onChange={handleRegisterChange}
                      className={styles.checkbox}
                      required
                    />
                    <label htmlFor="accept-terms" className={styles.checkboxLabel}>
                      Acepto los{" "}
                      <a href="#" className={styles.termsLink}>
                        Términos y Condiciones
                      </a>
                    </label>
                  </div>
                </div>

                <button type="submit" className={styles.submitButton}>
                  Crear Cuenta
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForms;
