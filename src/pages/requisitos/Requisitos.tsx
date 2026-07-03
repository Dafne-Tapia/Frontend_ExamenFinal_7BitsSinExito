import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./Requisitos.css";

interface BloqueRequisitos {
    id: string;
    titulo: string;
    subtitulo?: string;
    items: string[];
}

const nuevasConexiones: BloqueRequisitos = {
    id: "nuevas-conexiones",
    titulo: "Nuevas Conexiones",
    subtitulo: "De agua potable y alcantarillado",
    items: [
        "Testimonio de propiedad registrado en Derechos Reales (Folio Real)",
        "Cédula de Identidad",
        "Plano de lote",
        "Trámite de alcantarillado",
    ],
};

const cambioDeNombre: BloqueRequisitos = {
    id: "cambio-de-nombre",
    titulo: "Cambio de Nombre",
    items: [
        "Solicitud de cambio de nombre vía gerencia, adjuntando todos los documentos requeridos",
        "Testimonio de propiedad registrado en Derechos Reales (Folio Real)",
        "Cédula de Identidad",
        "Plano de lote",
        "Última factura de agua",
    ],
};

const notas: string[] = [
    "Presente fotocopias; en caso de que sea necesario, se solicitarán los originales.",
    "La documentación solicitada debe ser entregada en las oficinas de ODECO.",
    "Todo trámite realizado debe ser de manera personal.",
];

export default function Requisitos() {
    return (
        <>
            <Navbar />

            <section className="requisitos-page">
                <div className="requisitos-hero">
                    <div className="requisitos-hero__content">
                        <span className="requisitos-hero__eyebrow">ODECO</span>
                        <h1 className="requisitos-hero__title">Requisitos</h1>
                        <p className="requisitos-hero__description">
                            Conoce la documentación necesaria para realizar tus trámites de
                            conexión y cambio de nombre en AAPOS Potosí.
                        </p>
                    </div>
                </div>

                <div className="requisitos-container">
                    <div className="requisitos-grid">
                        <article className="requisitos-card" aria-labelledby={nuevasConexiones.id}>
                            <div className="requisitos-card__icon" aria-hidden="true">
                                💧
                            </div>
                            <h2 id={nuevasConexiones.id} className="requisitos-card__title">
                                {nuevasConexiones.titulo}
                            </h2>
                            {nuevasConexiones.subtitulo && (
                                <p className="requisitos-card__subtitle">
                                    {nuevasConexiones.subtitulo}
                                </p>
                            )}
                            <ul className="requisitos-card__list">
                                {nuevasConexiones.items.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </article>

                        <article className="requisitos-card" aria-labelledby={cambioDeNombre.id}>
                            <div className="requisitos-card__icon" aria-hidden="true">
                                📄
                            </div>
                            <h2 id={cambioDeNombre.id} className="requisitos-card__title">
                                {cambioDeNombre.titulo}
                            </h2>
                            <ul className="requisitos-card__list">
                                {cambioDeNombre.items.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </article>
                    </div>

                    <div className="requisitos-nota">
                        <h3 className="requisitos-nota__title">Nota</h3>
                        <ul className="requisitos-nota__list">
                            {notas.map((nota, index) => (
                                <li key={index}>{nota}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
