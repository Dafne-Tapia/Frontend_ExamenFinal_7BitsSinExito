import { API_URL } from "./api";

export interface Servicio {
  id?: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  estado: string;
  imagen: string;
  fechaCreacion?: string;
}

const BASE = `${API_URL}/api/servicios`;

export async function getServicios(): Promise<Servicio[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Error al obtener los servicios");
  return res.json();
}

export async function getServicioPorId(id: number): Promise<Servicio> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error("Servicio no encontrado");
  return res.json();
}

export async function crearServicio(data: Servicio): Promise<Servicio> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear el servicio");
  return res.json();
}

export async function actualizarServicio(id: number, data: Servicio): Promise<Servicio> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar el servicio");
  return res.json();
}

export async function eliminarServicio(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar el servicio");
}