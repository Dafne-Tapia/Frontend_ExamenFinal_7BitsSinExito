import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../Home.tsx'
import Servicios from '../pages/serviciosAApos/servicios.tsx'
import Documentos from '../pages/documentos/Documentos.tsx'

export default function AppRoutes() {
  return (
    <BrowserRouter basename="/FRONTEND_EXAMENFINAL_7BITS/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/documentos" element={<Documentos />} />
      </Routes>
    </BrowserRouter>
  )
}