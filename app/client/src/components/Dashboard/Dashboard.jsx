"use client";

import React, { useState } from "react";
import {
  Wallet,
  Clock,
  Users,
  FileText,
  Plus,
  ChevronRight,
} from "lucide-react";
import styles from "./Dashboard.module.css";
import CreateTestamentModal from "./CreateTestamentModal";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("testator");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const testaments = [
    {
      id: "1",
      documentNumber: "123456789",
      fullName: "Carlos Gómez",
      name: "Testamento Principal",
      beneficiaries: 3,
      assets: "2.5 ETH",
      condition: "Inactividad (12 meses)",
      status: "active",
      createdAt: "2023-10-15",
      activationDate: "2024-10-15",
    },
    {
      id: "2",
      documentNumber: "987654321",
      fullName: "Laura Torres",
      name: "Colección NFT",
      beneficiaries: 1,
      assets: "5 NFTs",
      condition: "Fecha específica (2025-01-01)",
      status: "active",
      createdAt: "2023-11-20",
      activationDate: "2025-01-01",
    },
    {
      id: "3",
      documentNumber: "555444333",
      fullName: "Andrés Muñoz",
      name: "Tokens DeFi",
      beneficiaries: 2,
      assets: "1000 USDC",
      condition: "Manual",
      status: "pending",
      createdAt: "2024-02-05",
      activationDate: "2024-08-01",
    },
  ];

  const inheritedTestaments = [
    {
      id: "4",
      name: "Herencia de Juan Pérez",
      beneficiaries: 1,
      assets: "1.2 ETH",
      condition: "Inactividad (6 meses)",
      status: "pending",
      createdAt: "2023-09-10",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "active":
        return styles.statusActive;
      case "pending":
        return styles.statusPending;
      case "completed":
        return styles.statusCompleted;
      default:
        return "";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Activo";
      case "pending":
        return "Pendiente";
      case "completed":
        return "Completado";
      default:
        return status;
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Panel de Control</h1>
        <button className={styles.createButton} onClick={openModal}>
          <Plus size={16} />
          Crear Testamento
        </button>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FileText size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>Testamentos</h3>
            <p>{testaments.length}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Users size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>Beneficiarios</h3>
            <p>{testaments.reduce((acc, t) => acc + t.beneficiaries, 0)}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Wallet size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>Activos</h3>
            <p>3.7 ETH + 5 NFTs</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Clock size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>Próxima Liberación</h3>
            <p>En 8 meses</p>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "testator" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("testator")}
        >
          Mis Testamentos
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "heir" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("heir")}
        >
          Mis Herencias
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === "testator" ? (
          <>
            <div className={styles.tableHeader}>
              <h2>Testamentos Creados</h2>
              <div className={styles.filters}>
                <select className={styles.filterSelect}>
                  <option value="all">Todos los estados</option>
                  <option value="active">Activos</option>
                  <option value="pending">Pendientes</option>
                  <option value="completed">Completados</option>
                </select>
              </div>
            </div>

            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th># Documento</th>
                    <th>Nombre y Apellido</th>
                    <th>Estado</th>
                    <th>Fecha de Creación</th>
                    <th>Fecha de Activación</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {testaments.map((testament) => (
                    <tr key={testament.id}>
                      <td>{testament.documentNumber}</td>
                      <td>{testament.fullName}</td>
                      <td>
                        <span
                          className={`${styles.status} ${getStatusClass(
                            testament.status
                          )}`}
                        >
                          {getStatusText(testament.status)}
                        </span>
                      </td>
                      <td>{testament.createdAt}</td>
                      <td>{testament.activationDate}</td>
                      <td>
                        <button className={styles.detailsButton}>
                          <ChevronRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <div className={styles.tableHeader}>
              <h2>Herencias Recibidas</h2>
            </div>

            {inheritedTestaments.length > 0 ? (
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Activos</th>
                      <th>Condición</th>
                      <th>Estado</th>
                      <th>Fecha de Creación</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {inheritedTestaments.map((testament) => (
                      <tr key={testament.id}>
                        <td>{testament.name}</td>
                        <td>{testament.assets}</td>
                        <td>{testament.condition}</td>
                        <td>
                          <span
                            className={`${styles.status} ${getStatusClass(
                              testament.status
                            )}`}
                          >
                            {getStatusText(testament.status)}
                          </span>
                        </td>
                        <td>{testament.createdAt}</td>
                        <td>
                          <button className={styles.detailsButton}>
                            <ChevronRight size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <FileText size={48} />
                </div>
                <h3>No tienes herencias recibidas</h3>
                <p>
                  Cuando alguien te añada como beneficiario, verás aquí tus
                  herencias.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {isModalOpen && <CreateTestamentModal onClose={closeModal} />}
    </div>
  );
};

export default Dashboard;
