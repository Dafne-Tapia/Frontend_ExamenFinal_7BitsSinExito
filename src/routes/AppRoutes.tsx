import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home";
import Servicios from "../pages/serviciosAApos/servicios";
import Procedimientos from "../pages/procedimientosAApos/procedimientos";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/procedimientos" element={<Procedimientos />} />
      </Routes>
    </BrowserRouter>
  );
}