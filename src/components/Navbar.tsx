import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const LINKS = [
  { label: "Inicio", to: "/" },
  { label: "Servicio", to: "/servicios" },
  { label: "Categorias-Serv", to: "/categoria" },
  { label: "Requisitos", to: "/" },
  { label: "Procedimientos", to: "/" },
  { label: "Documentos", to: "/documentos" },
  { label: "Horarios de Atencion", to: "/" },
  { label: "Contactos", to: "/contactos" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {LINKS.map((link) => (
          <li key={link.to}>
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
