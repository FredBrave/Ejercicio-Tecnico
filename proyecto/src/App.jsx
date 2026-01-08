import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
        <Route path="/modalidades" element={<ModalidadesPage onSuccess={() => { }} />} />
        <Route path="/carreras" element={<CarrerasPage onSuccess={() => { }} />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
