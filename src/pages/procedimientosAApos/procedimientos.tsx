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
  const [form, setForm] = useState({ servicioId: 1, paso: "", orden: 1 });
  const [editando, setEditando] = useState<number | null>(null);
  const [filtroPorServicio, setFiltroPorServicio] = useState("");

  const API_BASE = "https://sevenbitssinexito-examenfinalbackend.onrender.com/api/procedimientos";

  const cargarProcedimientos = () => {
    fetch(API_BASE)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar los datos");
        return res.json();
      })
      .then((data) => setProcedimientos(data))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    cargarProcedimientos();
  }, []);

  const handleGuardar = () => {
    if (!form.paso.trim()) return alert("Escribe el paso");

    if (editando !== null) {
      fetch(`${API_BASE}/${editando}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
        .then(() => {
          setEditando(null);
          setForm({ servicioId: 1, paso: "", orden: 1 });
          cargarProcedimientos();
        })
        .catch(() => setError("Error al actualizar"));
    } else {
      fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
        .then(() => {
          setForm({ servicioId: 1, paso: "", orden: 1 });
          cargarProcedimientos();
        })
        .catch(() => setError("Error al agregar"));
    }
  };

  const handleEditar = (proc: Procedimiento) => {
    setEditando(proc.id);
    setForm({ servicioId: proc.servicioId, paso: proc.paso, orden: proc.orden });
  };

  const handleEliminar = (id: number) => {
    if (!confirm("¿Eliminar este procedimiento?")) return;
    fetch(`${API_BASE}/${id}`, { method: "DELETE" })
      .then(() => cargarProcedimientos())
      .catch(() => setError("Error al eliminar"));
  };

  const handleBuscarPorServicio = () => {
    if (!filtroPorServicio) return cargarProcedimientos();
    fetch(`${API_BASE}/servicio/${filtroPorServicio}`)
      .then((res) => res.json())
      .then((data) => setProcedimientos(data))
      .catch(() => setError("Error al buscar"));
  };

  return (
    <>
      <Navbar />
      <main className="procedimientos">
        <section className="procedimientos__hero">
          {/* Gotitas de agua en el título principal */}
          <h1>💧 Procedimientos 💧</h1>
          <p>Pasos e instrucciones para acceder a los servicios de AAPOS.</p>
        </section>

        {error && <p className="procedimientos__error">⚠️ {error}</p>}

        {/* Buscador por servicio */}
        <div className="procedimientos__buscador">
          <input
            type="number"
            placeholder="Buscar por Servicio ID"
            value={filtroPorServicio}
            onChange={(e) => setFiltroPorServicio(e.target.value)}
          />
          <button onClick={handleBuscarPorServicio}>Buscar</button>
          <button onClick={() => { setFiltroPorServicio(""); cargarProcedimientos(); }}>
            Ver todos
          </button>
        </div>

        {/* Formulario agregar/editar */}
        <div className="procedimientos__formulario">
          <input
            type="text"
            placeholder="Descripción del paso..."
            value={form.paso}
            onChange={(e) => setForm({ ...form, paso: e.target.value })}
          />
          <input
            type="number"
            placeholder="Orden"
            value={form.orden}
            onChange={(e) => setForm({ ...form, orden: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Servicio ID"
            value={form.servicioId}
            onChange={(e) => setForm({ ...form, servicioId: Number(e.target.value) })}
          />
          <button onClick={handleGuardar}>
            {editando !== null ? "💧 Actualizar" : "💧 Agregar"}
          </button>
          {editando !== null && (
            <button onClick={() => { setEditando(null); setForm({ servicioId: 1, paso: "", orden: 1 }); }}>
              Cancelar
            </button>
          )}
        </div>

        {!error && procedimientos.length === 0 && (
          <p className="procedimientos__mensaje">No hay procedimientos aún.</p>
        )}

        <div className="procedimientos__lista">
          {procedimientos.map((proc, index) => (
            <div key={proc.id || index} className="procedimientos__card">
              {/* Gotita de agua junto al número de paso */}
              <span>💧 Paso #{proc.orden}</span>
              <h3>{proc.paso}</h3>
              <p>Servicio ID: {proc.servicioId}</p>
              <div className="procedimientos__card-acciones">
                <button
                  className="procedimientos__btn-editar"
                  onClick={() => handleEditar(proc)}
                >
                  Editar
                </button>
                <button
                  className="procedimientos__btn-eliminar"
                  onClick={() => handleEliminar(proc.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}