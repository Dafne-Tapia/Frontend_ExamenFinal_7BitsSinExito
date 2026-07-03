import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../Home.tsx'
import Servicios from '../pages/serviciosAApos/servicios.tsx'
import Documentos from '../pages/documentos/Documentos.tsx'
import Categorias from '../pages/categoria/Categoria.tsx'
import Procedimientos from '../pages/procedimientosAApos/Procedimientos.tsx'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/categoria" element={<Categoria />} />
        <Route path="/procedimientos" element={<Procedimientos />} />
      </Routes>
    </BrowserRouter>
  )
}