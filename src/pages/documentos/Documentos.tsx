import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import {
  getDocumentos,
  crearDocumento,
  eliminarDocumento,
  type Documento,
} from "../../services/documentoService";
import "./Documentos.css";

const Documentos = () => {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [nombreDocumento, setNombreDocumento] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [formato, setFormato] = useState("");
  const [servicioId, setServicioId] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarDocumentos = () => {
    setCargando(true);
    getDocumentos()
      .then(setDocumentos)
      .catch(() => setError("No se pudieron cargar los documentos"))
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargarDocumentos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreDocumento.trim() || !servicioId) return;

    try {
      await crearDocumento({
        nombreDocumento,
        descripcion,
        formato,
        servicioId: Number(servicioId),
      });
      setNombreDocumento("");
      setDescripcion("");
      setFormato("");
      setServicioId("");
      cargarDocumentos();
    } catch {
      setError("No se pudo crear el documento");
    }
  };

  const handleEliminar = async (id?: number) => {
    if (!id) return;
    if (!confirm("¿Eliminar este documento?")) return;

    try {
      await eliminarDocumento(id);
      cargarDocumentos();
    } catch {
      setError("No se pudo eliminar el documento");
    }
  };

  return (
      <>
       <Navbar />
    <div className="documentos-page">
      <h1>Documentos</h1>

      <form className="documento-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del documento"
          value={nombreDocumento}
          onChange={(e) => setNombreDocumento(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Formato (ej. PDF, DOCX)"
          value={formato}
          onChange={(e) => setFormato(e.target.value)}
        />
        <input
          type="number"
          placeholder="ID del servicio"
          value={servicioId}
          onChange={(e) => setServicioId(e.target.value)}
        />
        <button type="submit">Crear documento</button>
      </form>

      {error && <p className="error">{error}</p>}

      {cargando ? (
        <p>Cargando documentos...</p>
      ) : (
        <table className="documentos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Formato</th>
              <th>Servicio ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {documentos.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.id}</td>
                <td>{doc.nombreDocumento}</td>
                <td>{doc.descripcion}</td>
                <td>{doc.formato}</td>
                <td>{doc.servicioId}</td>
                <td>
                  <button onClick={() => handleEliminar(doc.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
     <Footer />
     </>
  );
};

export default Documentos;