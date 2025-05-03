import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Hero from "./components/Hero/Hero"
import TestamentForm from "./components/TestamentForm/TestamentForm"
import Dashboard from "./components/Dashboard/Dashboard"
import "./App.css"

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="features-section">
        {/* Contenido adicional de la página de inicio */}
      </div>
    </>
  )
}

const CreateTestamentPage = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <TestamentForm />
      </div>
    </>
  )
}

const DashboardPage = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <Dashboard />
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/crear-testamento" element={<CreateTestamentPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  )
}

export default App
