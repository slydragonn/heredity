import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import TestamentForm from "./components/TestamentForm/TestamentForm";
import Dashboard from "./components/Dashboard/Dashboard";
import AuthForms from "./components/Auth/AuthForms"; // Importa AuthForms
import "./App.css";

// Página de inicio (HomePage)
const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="features-section">
        {/* Contenido adicional de la página de inicio */}
      </div>
    </>
  );
};

// Página para crear un testamento (CreateTestamentPage)
const CreateTestamentPage = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <TestamentForm />
      </div>
    </>
  );
};

// Página del panel de control (DashboardPage)
const DashboardPage = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <Dashboard />
      </div>
    </>
  );
};

// Componente principal de la aplicación
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/crear-testamento" element={<CreateTestamentPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<AuthForms />} /> {/* Ruta para el login */}
        <Route path="/registro" element={<AuthForms />} /> {/* Ruta para el registro */}
      </Routes>
    </Router>
  );
}

export default App;
