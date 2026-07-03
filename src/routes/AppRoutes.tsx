import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home";
// Comentamos la línea de la líder para que no rompa tu pantalla en blanco:
// import Servicios from "../pages/serviciosAApos/servicios";
import Procedimientos from "../pages/procedimientosAApos/procedimientos";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Comentamos también su ruta temporalmente */}
        {/* <Route path="/servicios" element={<Servicios />} /> */}

        {/* Esta es tu ruta, aquí es donde vas a trabajar */}
        <Route path="/procedimientos" element={<Procedimientos />} />
      </Routes>
    </BrowserRouter>
  );
}