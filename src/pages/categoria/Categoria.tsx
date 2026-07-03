import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
    getCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
    type Categoria,
} from "../../services/categoriaService";
import "./Categoria.css";

const FORM_INICIAL: Categoria = {
    nombre: "",
    descripcion: "",
};

function formatearFecha(fecha?: string) {
    if (!fecha) return "";
    const d = new Date(fecha);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("es-BO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

export default function Categorias() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [form, setForm] = useState<Categoria>(FORM_INICIAL);
    const [enviando, setEnviando] = useState(false);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [editandoId, setEditandoId] = useState<number | null>(null);

    async function cargarCategorias() {
        setCargando(true);
        setError("");
        try {
            const data = await getCategorias();
            setCategorias(data);
        } catch {
            setError(
                "No se pudo conectar con el servidor. Si es la primera petición en un rato, el backend puede tardar unos segundos en despertar — intenta de nuevo."
            );
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        cargarCategorias();
    }, []);

    function abrirFormNuevo() {
        setForm(FORM_INICIAL);
        setEditandoId(null);
        setMostrarForm(true);
    }

    function abrirFormEditar(c: Categoria) {
        setForm({
            nombre: c.nombre,
            descripcion: c.descripcion,
        });
        setEditandoId(c.id ?? null);
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
                await actualizarCategoria(editandoId, form);
            } else {
                await crearCategoria(form);
            }
            cerrarForm();
            await cargarCategorias();
        } catch {
            setError(
                editandoId != null
                    ? "No se pudo actualizar la categoría."
                    : "No se pudo crear la categoría."
            );
        } finally {
            setEnviando(false);
        }
    }

    async function handleEliminar(id?: number) {
        if (!id) return;
        if (!confirm("¿Eliminar esta categoría?")) return;
        try {
            await eliminarCategoria(id);
            setCategorias((prev) => prev.filter((c) => c.id !== id));
        } catch {
            setError("No se pudo eliminar la categoría.");
        }
    }

    return (
        <>
            <Navbar />

            <section className="categorias-hero">
                <h1>Categorías de Servicios</h1>
                <p>
                    Administra las categorías utilizadas para clasificar los servicios
                    que AAPOS Potosí ofrece a la ciudadanía en materia de agua potable,
                    alcantarillado y saneamiento.
                </p>
            </section>

            <section className="categorias-contenido">
                <div className="categorias-toolbar">
                    <button
                        className="btn btn--primary"
                        onClick={() => (mostrarForm ? cerrarForm() : abrirFormNuevo())}
                    >
                        {mostrarForm ? "Cancelar" : "+ Agregar categoría"}
                    </button>
                </div>

                {mostrarForm && (
                    <form className="categorias-form" onSubmit={handleSubmit}>
                        <input
                            required
                            placeholder="Nombre"
                            value={form.nombre}
                            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        />
                        <textarea
                            required
                            placeholder="Descripción"
                            value={form.descripcion}
                            onChange={(e) =>
                                setForm({ ...form, descripcion: e.target.value })
                            }
                        />
                        <button className="btn btn--primary" type="submit" disabled={enviando}>
                            {enviando
                                ? "Guardando..."
                                : editandoId != null
                                    ? "Actualizar categoría"
                                    : "Guardar categoría"}
                        </button>
                    </form>
                )}

                {error && <p className="categorias-error">{error}</p>}

                {cargando ? (
                    <p className="categorias-estado">Cargando categorías...</p>
                ) : categorias.length === 0 && !error ? (
                    <p className="categorias-estado">Aún no hay categorías registradas.</p>
                ) : (
                    <div className="categorias-grid">
                        {categorias.map((c) => (
                            <article className="categoria-card" key={c.id}>
                                <div className="categoria-card__body">
                                    <h3>{c.nombre}</h3>
                                    <p className="categoria-card__desc">{c.descripcion}</p>
                                    {c.fechaCreacion && (
                                        <p className="categoria-card__fecha">
                                            Creada el {formatearFecha(c.fechaCreacion)}
                                        </p>
                                    )}
                                    <div className="categoria-card__acciones">
                                        <button
                                            className="btn btn--editar"
                                            onClick={() => abrirFormEditar(c)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn--eliminar"
                                            onClick={() => handleEliminar(c.id)}
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
