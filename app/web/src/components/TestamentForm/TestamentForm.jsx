"use client"

import React, { useState } from "react"
import { Clock, User, FileText, AlertCircle } from "lucide-react"
import styles from "./TestamentForm.module.css"
import { v4 as uuidv4 } from "uuid" 

const TestamentForm = () => {
  const [step, setStep] = useState(1)
  const [beneficiaries, setBeneficiaries] = useState([
    { id: 1, name: "", wallet: "", percentage: 0 },
  ])
  const [releaseCondition, setReleaseCondition] = useState("inactivity")
  const [inactivityPeriod, setInactivityPeriod] = useState(12)
  const [specificDate, setSpecificDate] = useState("")

  const addBeneficiary = () => {
    const newId = beneficiaries.length > 0
      ? Math.max(...beneficiaries.map((b) => b.id)) + 1
      : 1
    setBeneficiaries([
      ...beneficiaries,
      { id: newId, name: "", wallet: "", percentage: 0 },
    ])
  }

  const removeBeneficiary = (id) => {
    if (beneficiaries.length > 1) {
      setBeneficiaries(beneficiaries.filter((b) => b.id !== id))
    }
  }

  const updateBeneficiary = (id, field, value) => {
    setBeneficiaries(
      beneficiaries.map((b) =>
        b.id === id ? { ...b, [field]: value } : b
      )
    )
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.formStep}>
            <h2 className={styles.stepTitle}>
              <User size={24} />
              Paso 1: Añadir Beneficiarios
            </h2>

            <div className={styles.beneficiariesList}>
              {beneficiaries.map((b, index) => (
                <div key={b.id} className={styles.beneficiaryItem}>
                  <div className={styles.beneficiaryHeader}>
                    <h3>Beneficiario {index + 1}</h3>
                    {beneficiaries.length > 1 && (
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => removeBeneficiary(b.id)}
                      >
                        Eliminar
                      </button>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label>Nombre completo</label>
                    <input
                      type="text"
                      value={b.name}
                      onChange={(e) =>
                        updateBeneficiary(b.id, "name", e.target.value)
                      }
                      placeholder="Nombre del beneficiario"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Dirección de wallet</label>
                    <input
                      type="text"
                      value={b.wallet}
                      onChange={(e) =>
                        updateBeneficiary(b.id, "wallet", e.target.value)
                      }
                      placeholder="0x..."
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Porcentaje de herencia (%)</label>
                    <input
                      type="number"
                      value={b.percentage}
                      onChange={(e) =>
                        updateBeneficiary(b.id, "percentage", parseInt(e.target.value))
                      }
                      min="0"
                      max="100"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            <button type="button" className={styles.addButton} onClick={addBeneficiary}>
              + Añadir otro beneficiario
            </button>
          </div>
        )

      case 2:
        return (
          <div className={styles.formStep}>
            <h2 className={styles.stepTitle}>
              <Clock size={24} />
              Paso 2: Condiciones de Liberación
            </h2>

            <div className={styles.conditionsContainer}>
              <div className={styles.radioGroup}>
                {["inactivity", "specificDate", "manual"].map((type) => (
                  <div className={styles.radioOption} key={type}>
                    <input
                      type="radio"
                      id={type}
                      name="releaseCondition"
                      value={type}
                      checked={releaseCondition === type}
                      onChange={() => setReleaseCondition(type)}
                    />
                    <label htmlFor={type}>
                      {type === "inactivity"
                        ? "Inactividad"
                        : type === "specificDate"
                        ? "Fecha específica"
                        : "Liberación manual"}
                    </label>
                  </div>
                ))}
              </div>

              {releaseCondition === "inactivity" && (
                <div className={styles.conditionDetails}>
                  <h3>Período de inactividad</h3>
                  <div className={styles.formGroup}>
                    <label>Meses de inactividad</label>
                    <select
                      value={inactivityPeriod}
                      onChange={(e) =>
                        setInactivityPeriod(parseInt(e.target.value))
                      }
                    >
                      <option value="3">3 meses</option>
                      <option value="6">6 meses</option>
                      <option value="12">12 meses</option>
                      <option value="24">24 meses</option>
                    </select>
                  </div>
                </div>
              )}

              {releaseCondition === "specificDate" && (
                <div className={styles.conditionDetails}>
                  <h3>Fecha específica</h3>
                  <div className={styles.formGroup}>
                    <label>Selecciona una fecha</label>
                    <input
                      type="date"
                      value={specificDate}
                      onChange={(e) => setSpecificDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
              )}

              {releaseCondition === "manual" && (
                <div className={styles.conditionDetails}>
                  <h3>Liberación manual</h3>
                  <div className={styles.infoBox}>
                    <AlertCircle size={20} />
                    <span>Deberás iniciar manualmente la liberación.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className={styles.formStep}>
            <h2 className={styles.stepTitle}>
              <FileText size={24} />
              Paso 3: Resumen y Confirmación
            </h2>

            <div className={styles.summaryContainer}>
              <div className={styles.summarySection}>
                <h3>Beneficiarios</h3>
                <ul>
                  {beneficiaries.map((b, index) => (
                    <li key={b.id}>
                      <strong>{b.name || `Beneficiario ${index + 1}`}</strong> – {b.wallet} – {b.percentage}%
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.summarySection}>
                <h3>Condiciones de Liberación</h3>
                {releaseCondition === "inactivity" && (
                  <>
                    <p><strong>Tipo:</strong> Inactividad</p>
                    <p><strong>Período:</strong> {inactivityPeriod} meses</p>
                  </>
                )}
                {releaseCondition === "specificDate" && (
                  <>
                    <p><strong>Tipo:</strong> Fecha específica</p>
                    <p><strong>Fecha:</strong> {specificDate || "No especificada"}</p>
                  </>
                )}
                {releaseCondition === "manual" && (
                  <>
                    <p><strong>Tipo:</strong> Liberación manual</p>
                    <p>La activación debe hacerse manualmente.</p>
                  </>
                )}
              </div>

              <div className={styles.disclaimerBox}>
                <p>Al crear este testamento, confirmas que:</p>
                <ul>
                  <li>Los activos se transferirán según las condiciones establecidas.</li>
                  <li>Puedes modificarlo o cancelarlo en cualquier momento.</li>
                  <li>Se aplicarán tarifas de gas para ejecutarlo.</li>
                </ul>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h1>Crear Testamento Digital</h1>
        <p>Configura tu testamento descentralizado en simples pasos</p>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressSteps}>
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={`${styles.progressStep} ${step >= s ? styles.active : ""}`}>
                <div className={styles.stepIndicator}>{s}</div>
                <span>
                  {s === 1 ? "Beneficiarios" : s === 2 ? "Condiciones" : "Confirmación"}
                </span>
              </div>
              {s < 3 && <div className={styles.progressLine}></div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <form className={styles.form}>
        {renderStep()}
                <div className={styles.formNavigation}>
                {step > 1 && (
                  <button
                    type="button"
                    className={styles.backButton}
                    onClick={prevStep}
                  >
                    Anterior
                  </button>
                )}
      
                {step < 3 ? (
                  <button
                    type="button"
                    className={styles.nextButton}
                    onClick={nextStep}
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={styles.submitButton}
                    onClick={(e) => {
                      e.preventDefault()
                      // Aquí podrías manejar el envío del testamento
                      alert("Testamento creado con éxito.")
                    }}
                  >
                    Crear Testamento
                  </button>
                )}
              </div>
            </form>
          </div>
        )
      }
      
      export default TestamentForm
      
