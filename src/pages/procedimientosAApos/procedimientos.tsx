import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  getProcedimientos,
  crearProcedimiento,
  eliminarProcedimiento,
  type Procedimiento,
} from "../../services/procedimientosService";
import "./procedimientos.css";

const FORM_INICIAL: Procedimiento = {
  servicioId: 1,
  paso: "",
  orden: 1,
};

export default function Procedimientos() {
  const [procedimientos, setProcedimientos] = useState<Procedimiento[]>([]);
  const [form, setForm] = useState<Procedimiento>(FORM_INICIAL);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [enviando, setEnviando] = useState(false);

  async function cargarProcedimientos() {
    setCargando(true);
    setError("");

    try {
      const data = await getProcedimientos();
      setProcedimientos(data);
    } catch {
      setError("No se pudieron cargar los procedimientos.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarProcedimientos();
  }, []);

  async function handleGuardar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);

    try {
      await crearProcedimiento(form);
      setForm(FORM_INICIAL);
      setMostrarForm(false);
      await cargarProcedimientos();
    } catch {
      setError("No se pudo guardar el procedimiento.");
    } finally {
      setEnviando(false);
    }
  }

  async function handleEliminar(id?: number) {
    if (!id) return;
    if (!confirm("¿Eliminar este procedimiento?")) return;

    try {
      await eliminarProcedimiento(id);
      setProcedimientos((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setError("No se pudo eliminar el procedimiento.");
    }
  }

  return (
    <>
      <Navbar />

      <section className="procedimientos-hero">
        <h1>Procedimientos AAPOS</h1>
        <p>
          Consulta los pasos que debe seguir el usuario para acceder a los
          servicios de AAPOS Potosí.
        </p>
      </section>

      <section className="procedimientos-contenido">
        <div className="procedimientos-toolbar">
          <button
            className="btn btn--primary"
            onClick={() => setMostrarForm((valor) => !valor)}
          >
            {mostrarForm ? "Cancelar" : "+ Agregar procedimiento"}
          </button>
        </div>

        {mostrarForm && (
          <form className="procedimientos-form" onSubmit={handleGuardar}>
            <input
              type="number"
              min="1"
              placeholder="ID del servicio"
              value={form.servicioId}
              onChange={(e) =>
                setForm({ ...form, servicioId: Number(e.target.value) })
              }
              required
            />

            <input
              type="number"
              min="1"
              placeholder="Orden del paso"
              value={form.orden}
              onChange={(e) =>
                setForm({ ...form, orden: Number(e.target.value) })
              }
              required
            />

            <textarea
              placeholder="Descripción del paso"
              value={form.paso}
              onChange={(e) => setForm({ ...form, paso: e.target.value })}
              required
            />

            <button className="btn btn--primary" type="submit" disabled={enviando}>
              {enviando ? "Guardando..." : "Guardar procedimiento"}
            </button>
          </form>
        )}

        {error && <p className="procedimientos-error">{error}</p>}

        {cargando ? (
          <p className="procedimientos-estado">Cargando procedimientos...</p>
        ) : procedimientos.length === 0 && !error ? (
          <p className="procedimientos-estado">
            Aún no hay procedimientos registrados.
          </p>
        ) : (
          <div className="procedimientos-grid">
            {procedimientos.map((p) => (
              <article className="procedimiento-card" key={p.id}>
                <div className="procedimiento-card__body">
                  <span className="procedimiento-card__badge">
                    Paso {p.orden}
                  </span>

                  <h3>Servicio #{p.servicioId}</h3>
                  <p>{p.paso}</p>

                  <button
                    className="btn btn--eliminar"
                    onClick={() => handleEliminar(p.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}