import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../Home.tsx'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/su-ruta" element={<SuPagina />} /> */}

      </Routes>
    </BrowserRouter>
  )
}