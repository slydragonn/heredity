import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Dashboard from "./components/Dashboard/Dashboard";
import AuthPage from "./components/Auth/AuthPage";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
import TermsAndConditions from "./components/Legal/TermsAndConditions"
import "./App.css";

// Páginas
const HomePage = () => (
  <>
    <Hero />
    <div className="features-section">{/* contenido adicional */}</div>
  </>
);

const CreateTestamentPage = () => (
  <div className="page-container">
    {/* contenido de la página de crear testamento */}
  </div>
);

const DashboardPage = () => (
  <div className="page-container">
    <Dashboard />
  </div>
);

// App principal
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/crear-testamento" element={<CreateTestamentPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terminos" element={<TermsAndConditions />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
