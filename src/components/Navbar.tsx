import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const LINKS = [
  { label: "Inicio", to: "/" },
  { label: "Servicio", to: "/servicios" },
  { label: "Categorias-Serv", to: "/categorias" },
  { label: "Requisitos", to: "/requisitos" },
  { label: "Procedimientos", to: "/procedimientos" },
  { label: "Documentos", to: "/documentos" },
  { label: "Horarios de Atencion", to: "/horarios" },
  { label: "Contactos", to: "/contactos" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {LINKS.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className={
                "navbar__link" +
                (location.pathname === link.to ? " navbar__link--active" : "")
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}