import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../Home.tsx'
import Servicios from '../pages/serviciosAApos/servicios.tsx'
import Documentos from '../pages/documentos/Documentos.tsx'
import Procedimientos from '../pages/procedimientosAApos/Procedimientos.tsx'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/procedimientos" element={<Procedimientos />} />
      </Routes>
    </BrowserRouter>
  )
}