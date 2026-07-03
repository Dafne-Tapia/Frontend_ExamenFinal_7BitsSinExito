import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
    getRequisitos,
    crearRequisito,
    actualizarRequisito,
    eliminarRequisito,
    type Requisito,
    type RequisitoFormData,
} from "../../services/requisitosService";
import { getServicios, type Servicio } from "../../services/serviciosServiceAApos";
import "./servicios.css";
import "./Requisitos.css";

const FORM_INICIAL: RequisitoFormData = {
    requisito: "",
    obligatorio: true,
    descripcion: "",
    orden: 1,
    estado: "Activo",
    servicioId: 0,
};

export default function Requisitos() {
    const [requisitos, setRequisitos] = useState<Requisito[]>([]);
    const [servicios, setServicios] = useState<Servicio[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [mostrarForm, setMostrarForm] = useState(false);
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [form, setForm] = useState<RequisitoFormData>(FORM_INICIAL);
    const [enviando, setEnviando] = useState(false);

    async function cargarDatos() {
        setCargando(true);
        setError("");
        try {
            const [reqs, servs] = await Promise.all([getRequisitos(), getServicios()]);
            setRequisitos(reqs);
            setServicios(servs);
        } catch {
            setError(
                "No se pudo conectar con el servidor. Si es la primera petición en un rato, el backend puede tardar unos segundos en despertar — intenta de nuevo."
            );
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        cargarDatos();
    }, []);

    function abrirNuevo() {
        setEditandoId(null);
        setForm(FORM_INICIAL);
        setMostrarForm(true);
    }

    function abrirEditar(req: Requisito) {
        setEditandoId(req.id ?? null);
        setForm({
            requisito: req.requisito,
            obligatorio: req.obligatorio,
            descripcion: req.descripcion ?? "",
            orden: req.orden,
            estado: req.estado,
            servicioId: req.servicio?.id ?? 0,
        });
        setMostrarForm(true);
    }

    function cerrarForm() {
        setMostrarForm(false);
        setEditandoId(null);
        setForm(FORM_INICIAL);
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!form.servicioId) {
            setError("Selecciona el servicio al que pertenece el requisito.");
            return;
        }
        setEnviando(true);
        setError("");
        try {
            if (editandoId) {
                await actualizarRequisito(editandoId, form);
            } else {
                await crearRequisito(form);
            }
            cerrarForm();
            await cargarDatos();
        } catch {
            setError("No se pudo guardar el requisito.");
        } finally {
            setEnviando(false);
        }
    }

    async function handleEliminar(id?: number) {
        if (!id) return;
        if (!confirm("¿Eliminar este requisito?")) return;
        try {
            await eliminarRequisito(id);
            setRequisitos((prev) => prev.filter((r) => r.id !== id));
        } catch {
            setError("No se pudo eliminar el requisito.");
        }
    }

    return (
        <>
            <Navbar />

            <section className="servicios-hero">
                <h1>Requisitos</h1>
                <p>
                    Documentos y condiciones que debes presentar para acceder a los
                    servicios de AAPOS Potosí.
                </p>
            </section>

            <section className="servicios-contenido">
                <div className="servicios-toolbar">
                    <button
                        className="btn btn--primary"
                        onClick={() => (mostrarForm ? cerrarForm() : abrirNuevo())}
                    >
                        {mostrarForm ? "Cancelar" : "+ Agregar requisito"}
                    </button>
                </div>

                {mostrarForm && (
                    <form className="servicios-form" onSubmit={handleSubmit}>
                        <select
                            required
                            value={form.servicioId}
                            onChange={(e) =>
                                setForm({ ...form, servicioId: Number(e.target.value) })
                            }
                        >
                            <option value={0} disabled>
                                Selecciona un servicio
                            </option>
                            {servicios.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.nombre}
                                </option>
                            ))}
                        </select>

                        <input
                            required
                            placeholder="Requisito"
                            value={form.requisito}
                            onChange={(e) => setForm({ ...form, requisito: e.target.value })}
                        />

                        <input
                            type="number"
                            min={1}
                            placeholder="Orden"
                            value={form.orden}
                            onChange={(e) =>
                                setForm({ ...form, orden: Number(e.target.value) })
                            }
                        />

                        <select
                            value={form.estado}
                            onChange={(e) => setForm({ ...form, estado: e.target.value })}
                        >
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>

                        <label className="requerimientos-checkbox">
                            <input
                                type="checkbox"
                                checked={form.obligatorio}
                                onChange={(e) =>
                                    setForm({ ...form, obligatorio: e.target.checked })
                                }
                            />
                            Obligatorio
                        </label>

                        <textarea
                            placeholder="Descripción"
                            value={form.descripcion}
                            onChange={(e) =>
                                setForm({ ...form, descripcion: e.target.value })
                            }
                        />

                        <button className="btn btn--primary" type="submit" disabled={enviando}>
                            {enviando
                                ? "Guardando..."
                                : editandoId
                                    ? "Guardar cambios"
                                    : "Guardar requisito"}
                        </button>
                    </form>
                )}

                {error && <p className="servicios-error">{error}</p>}

                {cargando ? (
                    <p className="servicios-estado">Cargando requisitos...</p>
                ) : requisitos.length === 0 && !error ? (
                    <p className="servicios-estado">Aún no hay requisitos registrados.</p>
                ) : (
                    <div className="requerimientos-tabla-wrap">
                        <table className="requerimientos-tabla">
                            <thead>
                            <tr>
                                <th>Orden</th>
                                <th>Requisito</th>
                                <th>Servicio</th>
                                <th>Obligatorio</th>
                                <th>Estado</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {requisitos
                                .slice()
                                .sort((a, b) => a.orden - b.orden)
                                .map((req) => (
                                    <tr key={req.id}>
                                        <td>{req.orden}</td>
                                        <td>
                        <span className="requerimientos-nombre">
                          {req.requisito}
                        </span>
                                            {req.descripcion && (
                                                <span className="requerimientos-desc">
                            {req.descripcion}
                          </span>
                                            )}
                                        </td>
                                        <td>{req.servicio?.nombre ?? "—"}</td>
                                        <td>
                        <span
                            className={`servicio-card__badge ${
                                req.obligatorio ? "badge--activo" : "badge--inactivo"
                            }`}
                        >
                          {req.obligatorio ? "Sí" : "No"}
                        </span>
                                        </td>
                                        <td>{req.estado}</td>
                                        <td className="requerimientos-acciones">
                                            <button
                                                className="btn btn--editar"
                                                onClick={() => abrirEditar(req)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn--eliminar"
                                                onClick={() => handleEliminar(req.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            <Footer />
        </>
    );
}
