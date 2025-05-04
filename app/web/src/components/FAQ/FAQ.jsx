import React, { useState } from "react";
import { ChevronDown, ChevronUp, Shield, Clock, FileText } from 'lucide-react';
import styles from "./FAQ.module.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "¿Cuál es el precio de Heredity?",
      answer: (
        <>
          Heredity tiene un costo único de <strong>35 USD</strong> que te da acceso de por vida a la plataforma. No hay
          cargos recurrentes ni comisiones ocultas.
        </>
      ),
    },
    {
      question: "¿Quién puede utilizar Heredity?",
      answer:
        "Cualquier persona mayor de edad (18 años o más) puede utilizar Heredity.",
    },
    {
      question: "¿Cómo funciona un testamento descentralizado?",
      answer:
        "Utiliza tecnología blockchain para registrar tus voluntades sin intermediarios.",
    },
    {
      question: "¿Es legalmente válido un testamento en blockchain?",
      answer:
        "Depende del país. Heredity complementa, no reemplaza, un testamento legal tradicional.",
    },
    {
      question: "¿Qué sucede si pierdo acceso a mi wallet?",
      answer:
        "Si pierdes acceso, no podrás modificar el testamento, pero se ejecutará según lo previsto.",
    },
    {
      question: "¿Puedo modificar mi testamento después de crearlo?",
      answer:
        "Sí. Siempre que tengas acceso a tu wallet, puedes modificarlo cuando quieras.",
    },
    {
      question: "¿Qué tipos de activos puedo incluir en mi testamento?",
      answer:
        "Criptomonedas, NFTs, tokens, y puedes dejar instrucciones para activos tradicionales.",
    },
    {
      question: "¿Qué medidas de seguridad implementa Heredity?",
      answer:
        "Contratos inteligentes auditados, encriptación y uso seguro de blockchain.",
    },
  ];

  return (
    <div className={styles.faqContainer}>
      <div className={styles.whyUsSection}>
        <div className={styles.whyUsContent}>
          <h1 className={styles.title}>Preguntas Frecuentes</h1>
          <h2 className={styles.subtitle}>¿Por qué elegir Heredity?</h2>
          <p className={styles.description}>
            Heredity elimina la burocracia y costos de los testamentos tradicionales, permitiéndote asegurar el futuro de tus activos digitales con total transparencia y control.
          </p>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Shield size={24} />
              </div>
              <div className={styles.featureContent}>
                <h3>Seguridad Garantizada</h3>
                <p>Protegido con tecnología blockchain, inmutable y seguro.</p>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Clock size={24} />
              </div>
              <div className={styles.featureContent}>
                <h3>Rápido y Eficiente</h3>
                <p>Testamentos digitales en minutos, sin papeleo.</p>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <FileText size={24} />
              </div>
              <div className={styles.featureContent}>
                <h3>Sin Intermediarios</h3>
                <p>No necesitas abogados o notarios costosos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.questionsSection}>
        <div className={styles.questionsContent}>
          <h2 className={styles.sectionTitle}>Respuestas a tus dudas</h2>

          <div className={styles.faqList}>
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${openIndex === index ? styles.active : ""}`}
                onClick={() => toggleQuestion(index)}
              >
                <div className={styles.faqQuestion}>
                  <h3>{item.question}</h3>
                  {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                {openIndex === index && <div className={styles.faqAnswer}>{item.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
