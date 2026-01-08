import './App.css'
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import ModalidadesPage from './pages/ModalidadesPage';
import CarrerasPage from './pages/CarrerasPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-dark bg-dark px-3">
        <div className="d-flex gap-3">
          <Link className="navbar-brand" to="/modalidades">Modalidades</Link>
          <Link className="navbar-brand" to="/carreras">Carreras</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/modalidades" replace />} />
        <Route path="/modalidades" element={<ModalidadesPage />} />
        <Route path="/carreras" element={<CarrerasPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App