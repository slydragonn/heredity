import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Dashboard from "./components/Dashboard/Dashboard";
import AuthForms from "./components/Auth/AuthForms"; // Importa AuthForms
import AuthPage from "./components/Auth/AuthPage";
import "./App.css";


const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="features-section">
        
      </div>
    </>
  );
};


const CreateTestamentPage = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
       
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
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
