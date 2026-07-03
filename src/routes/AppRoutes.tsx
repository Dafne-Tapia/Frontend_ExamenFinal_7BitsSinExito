import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../Home.tsx'
import Servicios from '../pages/serviciosAApos/servicios.tsx'
import Documentos from '../pages/documentos/Documentos.tsx'
import Contactos from "../pages/Contactos/Contactos"
import Categoria from '../pages/categoria/Categoria'
import Procedimientos from '../pages/procedimientosAApos/procedimientos.tsx'
import Horarios from '../pages/horariosAApos/Horarios.tsx'
import Requisitos from '../pages/requisitos/Requisitos.tsx'


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/categoria" element={<Categoria />} />
        <Route path="/procedimientos" element={<Procedimientos />} />
        <Route path="/horario" element={<Horarios />} />
        <Route path="/requisitos" element={<Requisitos />} />
      </Routes>
    </BrowserRouter>
  )
}