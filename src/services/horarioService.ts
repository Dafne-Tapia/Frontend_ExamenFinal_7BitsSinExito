import { API_URL } from "./api";

export interface ServicioRef {
    id: number;
    nombre?: string;
}

export interface Horario {
    id?: number;
    servicio: ServicioRef;
    dia: string;
    horaInicio: string;
    horaFin: string;
}

const BASE = `${API_URL}/api/horarios`;

export async function getHorarios(): Promise<Horario[]> {
    const res = await fetch(BASE);
    if (!res.ok) throw new Error("Error al obtener los horarios");
    return res.json();
}

export async function getHorarioPorId(id: number): Promise<Horario> {
    const res = await fetch(`${BASE}/${id}`);
    if (!res.ok) throw new Error("Horario no encontrado");
    return res.json();
}

export async function crearHorario(data: Horario): Promise<Horario> {
    const res = await fetch(BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al crear el horario");
    return res.json();
}

export async function actualizarHorario(id: number, data: Horario): Promise<Horario> {
    const res = await fetch(`${BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al actualizar el horario");
    return res.json();
}

export async function eliminarHorario(id: number): Promise<void> {
    const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar el horario");
}