import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
    getHorarios,
    crearHorario,
    actualizarHorario,
    eliminarHorario,
    type Horario,
} from "../../services/horarioService.ts";
import {
    getServicios,
    type Servicio,
} from "../../services/serviciosServiceAApos";
import "./Horarios.css";

const DIAS = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
];

const FORM_INICIAL = {
    servicioId: "",
    dia: "Lunes",
    horaInicio: "08:00",
    horaFin: "12:00",
};

export default function Horarios() {
    const [horarios, setHorarios] = useState<Horario[]>([]);
    const [servicios, setServicios] = useState<Servicio[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [form, setForm] = useState(FORM_INICIAL);
    const [enviando, setEnviando] = useState(false);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [editandoId, setEditandoId] = useState<number | null>(null);

    async function cargarDatos() {
        setCargando(true);
        setError("");
        try {
            const [dataHorarios, dataServicios] = await Promise.all([
                getHorarios(),
                getServicios(),
            ]);
            const ordenados = [...dataHorarios].sort(
                (a, b) => DIAS.indexOf(a.dia) - DIAS.indexOf(b.dia)
            );
            setHorarios(ordenados);
            setServicios(dataServicios);
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

    function handleEditar(h: Horario) {
        if (!h.id) return;
        setEditandoId(h.id);
        setForm({
            servicioId: String(h.servicio.id),
            dia: h.dia,
            horaInicio: h.horaInicio.slice(0, 5),
            horaFin: h.horaFin.slice(0, 5),
        });
        setMostrarForm(true);
    }

    function handleCancelar() {
        setMostrarForm(false);
        setEditandoId(null);
        setForm(FORM_INICIAL);
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!form.servicioId) {
            setError("Selecciona un servicio.");
            return;
        }
        setEnviando(true);
        try {
            const payload = {
                servicio: { id: Number(form.servicioId) },
                dia: form.dia,
                horaInicio: form.horaInicio,
                horaFin: form.horaFin,
            };

            if (editandoId) {
                await actualizarHorario(editandoId, payload);
            } else {
                await crearHorario(payload);
            }

            setForm(FORM_INICIAL);
            setMostrarForm(false);
            setEditandoId(null);
            await cargarDatos();
        } catch {
            setError(
                editandoId
                    ? "No se pudo actualizar el horario."
                    : "No se pudo crear el horario."
            );
        } finally {
            setEnviando(false);
        }
    }

    async function handleEliminar(id?: number) {
        if (!id) return;
        if (!confirm("¿Eliminar este horario?")) return;
        try {
            await eliminarHorario(id);
            setHorarios((prev) => prev.filter((h) => h.id !== id));
        } catch {
            setError("No se pudo eliminar el horario.");
        }
    }

    return (
        <>
            <Navbar />

            <section className="horarios-hero">
                <h1>Horarios de Atención</h1>
                <p>
                    Consulta los días y horarios en los que AAPOS Potosí atiende cada
                    uno de sus servicios a la ciudadanía.
                </p>
            </section>

            <section className="horarios-contenido">
                <div className="horarios-toolbar">
                    <button
                        className="btn btn--primary"
                        onClick={() =>
                            mostrarForm ? handleCancelar() : setMostrarForm(true)
                        }
                    >
                        {mostrarForm ? "Cancelar" : "+ Agregar horario"}
                    </button>
                </div>

                {mostrarForm && (
                    <form className="horarios-form" onSubmit={handleSubmit}>
                        <select
                            required
                            value={form.servicioId}
                            onChange={(e) => setForm({ ...form, servicioId: e.target.value })}
                        >
                            <option value="">Selecciona un servicio</option>
                            {servicios.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.nombre}
                                </option>
                            ))}
                        </select>

                        <select
                            value={form.dia}
                            onChange={(e) => setForm({ ...form, dia: e.target.value })}
                        >
                            {DIAS.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>

                        <input
                            type="time"
                            required
                            value={form.horaInicio}
                            onChange={(e) => setForm({ ...form, horaInicio: e.target.value })}
                        />
                        <input
                            type="time"
                            required
                            value={form.horaFin}
                            onChange={(e) => setForm({ ...form, horaFin: e.target.value })}
                        />

                        <button className="btn btn--primary" type="submit" disabled={enviando}>
                            {enviando
                                ? "Guardando..."
                                : editandoId
                                    ? "Actualizar horario"
                                    : "Guardar horario"}
                        </button>
                    </form>
                )}

                {error && <p className="horarios-error">{error}</p>}

                {cargando ? (
                    <p className="horarios-estado">Cargando horarios...</p>
                ) : horarios.length === 0 && !error ? (
                    <p className="horarios-estado">Aún no hay horarios registrados.</p>
                ) : (
                    <div className="horarios-lista">
                        {horarios.map((h) => (
                            <article className="horario-card" key={h.id}>
                                <span className="horario-card__dia">{h.dia}</span>
                                <div className="horario-card__body">
                                    <h3>{h.servicio?.nombre ?? "Servicio"}</h3>
                                    <p className="horario-card__rango">
                                        {h.horaInicio.slice(0, 5)} — {h.horaFin.slice(0, 5)}
                                    </p>
                                </div>
                                <div className="horario-card__acciones">
                                    <button
                                        className="btn btn--editar"
                                        onClick={() => handleEditar(h)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn--eliminar"
                                        onClick={() => handleEliminar(h.id)}
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