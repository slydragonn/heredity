"use client";

import React, { useState } from "react";
import { X, User, CreditCard, Wallet, FileText } from "lucide-react";
import styles from "./CreateTestamentModal.module.css";

const CreateTestamentModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    documentNumber: "",
    fullName: "",
    walletAddress: "",
    testamentContent: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del testamento:", formData);
    // Aquí iría la lógica para guardar el testamento
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2>Crear Nuevo Testamento</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="documentNumber" className={styles.label}>
              Número de Documento
            </label>
            <div className={styles.inputWrapper}>
              <CreditCard size={20} className={styles.inputIcon} />
              <input
                type="text"
                id="documentNumber"
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleChange}
                className={styles.input}
                placeholder="Ingresa tu número de documento"
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="fullName" className={styles.label}>
              Nombre y Apellidos
            </label>
            <div className={styles.inputWrapper}>
              <User size={20} className={styles.inputIcon} />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={styles.input}
                placeholder="Ingresa tu nombre completo"
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="walletAddress" className={styles.label}>
              Dirección de Wallet
            </label>
            <div className={styles.inputWrapper}>
              <Wallet size={20} className={styles.inputIcon} />
              <input
                type="text"
                id="walletAddress"
                name="walletAddress"
                value={formData.walletAddress}
                onChange={handleChange}
                className={styles.input}
                placeholder="0x..."
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="testamentContent" className={styles.label}>
              Contenido del Testamento
            </label>
            <div className={styles.textareaWrapper}>
              <FileText size={20} className={styles.textareaIcon} />
              <textarea
                id="testamentContent"
                name="testamentContent"
                value={formData.testamentContent}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Escribe aquí el contenido de tu testamento..."
                rows={6}
                required
              ></textarea>
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.submitButton}>
              Crear Testamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTestamentModal;
