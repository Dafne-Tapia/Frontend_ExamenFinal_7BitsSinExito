const API_BASE_URL = import.meta.env.VITE_API_URL ?? "https://sevenbitssinexito-examenfinalbackend.onrender.com";
const CATEGORIAS_URL = `${API_BASE_URL}/api/categorias-servicios`;

export interface Categoria {
    id?: number;
    nombre: string;
    descripcion: string;
    fechaCreacion?: string;
}

async function manejarRespuesta<T>(res: Response): Promise<T> {
    if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    if (res.status === 204) {
        return undefined as T;
    }
    return res.json() as Promise<T>;
}

export async function getCategorias(): Promise<Categoria[]> {
    const res = await fetch(CATEGORIAS_URL);
    return manejarRespuesta<Categoria[]>(res);
}

export async function getCategoriaPorId(id: number): Promise<Categoria> {
    const res = await fetch(`${CATEGORIAS_URL}/${id}`);
    return manejarRespuesta<Categoria>(res);
}

export async function crearCategoria(categoria: Categoria): Promise<Categoria> {
    const res = await fetch(CATEGORIAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoria),
    });
    return manejarRespuesta<Categoria>(res);
}

export async function actualizarCategoria(
    id: number,
    categoria: Categoria
): Promise<Categoria> {
    const res = await fetch(`${CATEGORIAS_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoria),
    });
    return manejarRespuesta<Categoria>(res);
}

export async function eliminarCategoria(id: number): Promise<void> {
    const res = await fetch(`${CATEGORIAS_URL}/${id}`, {
        method: "DELETE",
    });
    return manejarRespuesta<void>(res);
}
