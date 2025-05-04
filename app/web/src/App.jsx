import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Dashboard from "./components/Dashboard/Dashboard";
import AuthPage from "./components/Auth/AuthPage";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
import TermsAndConditions from "./components/Legal/TermsAndConditions";
import ContactPage from "./components/Contact/ContactPage";
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

// Componente que contiene Navbar, Routes y Footer
// Componente que contiene Navbar, Routes y Footer
function AppLayout() {
  const location = useLocation();
  const hideLayoutRoutes = ["/auth"];
  const shouldShowNavbar = !hideLayoutRoutes.includes(location.pathname);
  const shouldShowFooter = !hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/crear-testamento" element={<CreateTestamentPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terminos" element={<TermsAndConditions />} />
        <Route path="/contacto" element={<ContactPage />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </>
  );
}


// App principal con Router
function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
