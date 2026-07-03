import { API_URL } from "./api";

export interface Procedimiento {
  id?: number;
  servicioId: number;
  paso: string;
  orden: number;
}

const BASE = `${API_URL}/api/procedimientos`;

export async function getProcedimientos(): Promise<Procedimiento[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Error al obtener los procedimientos");
  return res.json();
}

export async function crearProcedimiento(data: Procedimiento): Promise<Procedimiento> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear el procedimiento");
  return res.json();
}

export async function eliminarProcedimiento(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar el procedimiento");
}