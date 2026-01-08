import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ModalidadesPage } from './pages/ModalidadesPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/modalidades" element={<ModalidadesPage />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
