import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./procedimientos.css";

interface Procedimiento {
  id: number;
  servicioId: number;
  paso: string;
  orden: number;
}

export default function Procedimientos() {
  const [procedimientos, setProcedimientos] = useState<Procedimiento[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/procedimientos")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar los datos de AAPOS");
        return res.json();
      })
      .then((data) => setProcedimientos(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      <Navbar />
      <main className="procedimientos">
        <section className="procedimientos__hero">
          <h1>Procedimientos</h1>
          <p>Procedimientos para acceder a los servicios de AAPOS.</p>
        </section>

        {error && <p className="procedimientos__error">⚠️ {error}</p>}

        {!error && procedimientos.length === 0 && (
          <p className="procedimientos__mensaje">Cargando procedimientos...</p>
        )}

        <div className="procedimientos__lista">
          {procedimientos.map((proc, index) => (
            <div key={proc.id || index} className="procedimientos__card">
              <span>Paso #{proc.orden}</span>
              <h3>{proc.paso}</h3>
              <p>Servicio ID: {proc.servicioId}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}