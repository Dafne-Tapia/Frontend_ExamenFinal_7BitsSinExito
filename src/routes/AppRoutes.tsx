import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../Home.tsx'
import Servicios from '../pages/serviciosAApos/servicios.tsx'
import Documentos from '../pages/documentos/Documentos.tsx'
import Categoria from '../pages/categoria/Categoria.tsx'
import Procedimientos from '../pages/procedimientosAApos/procedimientos.tsx'
import Horarios from '../pages/horariosAApos/Horarios.tsx'


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/categoria" element={<Categoria />} />
          <Route path="/procedimientos" element={<Procedimientos />} />
          <Route path="/horario" element={<Horarios />} />
          <Route path="/documentos" element={<Documentos />} />
      </Routes>
    </BrowserRouter>
  )
}