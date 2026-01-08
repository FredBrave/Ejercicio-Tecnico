import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ModalidadesPage from './pages/ModalidadesPage';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/modalidades">Modalidades</Link>
      </nav>

      <Routes>
        <Route path="/modalidades" element={<ModalidadesPage onSuccess={() => { }} />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
