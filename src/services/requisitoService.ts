import { API_URL } from "./api";
import type { Servicio } from "./serviciosServiceAApos";

export interface Requisito {
    id?: number;
    servicio: Servicio | { id: number };
    requisito: string;
    obligatorio: boolean;
    descripcion?: string;
    orden?: number;
    estado?: string;
}

const BASE = `${API_URL}/api/requisitos`;

export async function getRequisitos(servicioId?: number): Promise<Requisito[]> {
    const url = servicioId ? `${BASE}?servicioId=${servicioId}` : BASE;
    const res: Response = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener los requisitos");
    return res.json();
}

export async function getRequisitoPorId(id: number): Promise<Requisito> {
    const res: Response = await fetch(`${BASE}/${id}`);
    if (!res.ok) throw new Error("Requisito no encontrado");
    return res.json();
}

export async function crearRequisito(data: Requisito): Promise<Requisito> {
    const res: Response = await fetch(BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al crear el requisito");
    return res.json();
}

export async function actualizarRequisito(id: number, data: Requisito): Promise<Requisito> {
    const res: Response = await fetch(`${BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Requisito no encontrado");
    return res.json();
}

export async function eliminarRequisito(id: number): Promise<void> {
    const res: Response = await fetch(`${BASE}/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar el requisito");
}