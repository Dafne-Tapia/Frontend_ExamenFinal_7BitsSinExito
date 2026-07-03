import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  listarProcedimientos,
  type Procedimiento,
} from "../../services/procedimientosService";
import "./procedimientos.css";

export default function Procedimientos() {
  const [procedimientos, setProcedimientos] = useState<Procedimiento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    listarProcedimientos()
      .then((data) => setProcedimientos(data))
      .catch(() => setError("No se pudieron cargar los procedimientos."))
      .finally(() => setCargando(false));
  }, []);

  return (
    <>
      <Navbar />

      <main className="procedimientos">
        <section className="procedimientos__hero">
          <h1>Procedimientos AAPOS</h1>
          <p>
            Consulta los pasos de atención para acceder a los servicios de
            AAPOS Potosí.
          </p>
        </section>

        {cargando && <p className="procedimientos__mensaje">Cargando...</p>}

        {error && <p className="procedimientos__error">{error}</p>}

        <section className="procedimientos__lista">
          {procedimientos.map((item) => (
            <article className="procedimientos__card" key={item.id}>
              <span>Paso {item.orden}</span>
              <h3>Servicio #{item.servicioId}</h3>
              <p>{item.paso}</p>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}