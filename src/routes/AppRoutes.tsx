import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../Home.tsx'
import Servicios from '../pages/serviciosAApos/servicios.tsx'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
      </Routes>
    </BrowserRouter>
  )
}