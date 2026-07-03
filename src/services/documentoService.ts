import { API_URL } from "./api";

export interface Documento {
  id?: number;
  servicioId: number;
  nombreDocumento: string;
  descripcion: string;
  formato: string;
}

const RESOURCE = `${API_URL}/api/documentos`;

export const getDocumentos = async (): Promise<Documento[]> => {
  const res = await fetch(RESOURCE);
  if (!res.ok) throw new Error("Error al obtener los documentos");
  return res.json();
};

export const getDocumentoPorId = async (id: number): Promise<Documento> => {
  const res = await fetch(`${RESOURCE}/${id}`);
  if (!res.ok) throw new Error("Error al obtener el documento");
  return res.json();
};

export const getDocumentosPorServicio = async (
  servicioId: number
): Promise<Documento[]> => {
  const res = await fetch(`${RESOURCE}/servicio/${servicioId}`);
  if (!res.ok) throw new Error("Error al obtener los documentos del servicio");
  return res.json();
};

export const crearDocumento = async (documento: Documento): Promise<Documento> => {
  const res = await fetch(RESOURCE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(documento),
  });
  if (!res.ok) throw new Error("Error al crear el documento");
  return res.json();
};

export const eliminarDocumento = async (id: number): Promise<void> => {
  const res = await fetch(`${RESOURCE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar el documento");
};