import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../Home.tsx'
import Servicios from '../pages/serviciosAApos/servicios.tsx'
import Documentos from '../pages/documentos/Documentos.tsx'
import Categoria from '../pages/categoria/Categoria'

export default function AppRoutes() {
  return (
    <BrowserRouter basename="/Frontend_ExamenFinal_7BitsSinExito/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/categoria" element={<Categoria />} />
      </Routes>
    </BrowserRouter>
  )
}