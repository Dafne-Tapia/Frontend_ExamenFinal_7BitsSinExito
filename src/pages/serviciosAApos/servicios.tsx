import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  getServicios,
  crearServicio,
  actualizarServicio,
  eliminarServicio,
  type Servicio,
} from "../../services/serviciosServiceAApos";
import "./Servicios.css";

const FORM_INICIAL: Servicio = {
  nombre: "",
  descripcion: "",
  categoria: "",
  estado: "activo",
  imagen: "",
};

export default function Servicios() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState<Servicio>(FORM_INICIAL);
  const [enviando, setEnviando] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  async function cargarServicios() {
    setCargando(true);
    setError("");
    try {
      const data = await getServicios();
      setServicios(data);
    } catch {
      setError(
        "No se pudo conectar con el servidor. Si es la primera petición en un rato, el backend puede tardar unos segundos en despertar — intenta de nuevo."
      );
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarServicios();
  }, []);

  function abrirFormNuevo() {
    setForm(FORM_INICIAL);
    setEditandoId(null);
    setMostrarForm(true);
  }

  function abrirFormEditar(s: Servicio) {
    setForm({
      nombre: s.nombre,
      descripcion: s.descripcion,
      categoria: s.categoria,
      estado: s.estado,
      imagen: s.imagen,
    });
    setEditandoId(s.id ?? null);
    setMostrarForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cerrarForm() {
    setMostrarForm(false);
    setEditandoId(null);
    setForm(FORM_INICIAL);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setEnviando(true);
    try {
      if (editandoId != null) {
        await actualizarServicio(editandoId, form);
      } else {
        await crearServicio(form);
      }
      cerrarForm();
      await cargarServicios();
    } catch {
      setError(
        editandoId != null
          ? "No se pudo actualizar el servicio."
          : "No se pudo crear el servicio."
      );
    } finally {
      setEnviando(false);
    }
  }

  async function handleEliminar(id?: number) {
    if (!id) return;
    if (!confirm("¿Eliminar este servicio?")) return;
    try {
      await eliminarServicio(id);
      setServicios((prev) => prev.filter((s) => s.id !== id));
    } catch {
      setError("No se pudo eliminar el servicio.");
    }
  }

  return (
      <>
      <Navbar />

      <section className="servicios-hero">
        <h1>Nuestros Servicios</h1>
        <p>
          Conoce los servicios que ofrece AAPOS Potosí a la ciudadanía en
          materia de agua potable, alcantarillado y saneamiento.
        </p>
      </section>

      <section className="servicios-contenido">
        <div className="servicios-toolbar">
          <button
            className="btn btn--primary"
            onClick={() => (mostrarForm ? cerrarForm() : abrirFormNuevo())}
          >
            {mostrarForm ? "Cancelar" : "+ Agregar servicio"}
          </button>
        </div>

        {mostrarForm && (
          <form className="servicios-form" onSubmit={handleSubmit}>
            <input
              required
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
            <input
              required
              placeholder="Categoría"
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            />
            <textarea
              required
              placeholder="Descripción"
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            />
            <input
              placeholder="URL de imagen"
              value={form.imagen}
              onChange={(e) => setForm({ ...form, imagen: e.target.value })}
            />
            <select
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
            <button className="btn btn--primary" type="submit" disabled={enviando}>
              {enviando
                ? "Guardando..."
                : editandoId != null
                ? "Actualizar servicio"
                : "Guardar servicio"}
            </button>
          </form>
        )}

        {error && <p className="servicios-error">{error}</p>}

        {cargando ? (
          <p className="servicios-estado">Cargando servicios...</p>
        ) : servicios.length === 0 && !error ? (
          <p className="servicios-estado">Aún no hay servicios registrados.</p>
        ) : (
          <div className="servicios-grid">
            {servicios.map((s) => (
              <article className="servicio-card" key={s.id}>
                {s.imagen && (
                  <img
                    className="servicio-card__img"
                    src={s.imagen}
                    alt={s.nombre}
                  />
                )}
                <div className="servicio-card__body">
                  <span
                    className={`servicio-card__badge ${
                      s.estado === "activo" ? "badge--activo" : "badge--inactivo"
                    }`}
                  >
                    {s.estado}
                  </span>
                  <h3>{s.nombre}</h3>
                  <p className="servicio-card__categoria">{s.categoria}</p>
                  <p className="servicio-card__desc">{s.descripcion}</p>
                  <div className="servicio-card__acciones">
                    <button
                      className="btn btn--editar"
                      onClick={() => abrirFormEditar(s)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn--eliminar"
                      onClick={() => handleEliminar(s.id)}
                    >
                      Eliminar
                    </button>
                  </div>
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