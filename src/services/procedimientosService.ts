const API_URL = "https://sevenbitssinexito-examenfinalbackend.onrender.com/api/procedimientos";

export interface Procedimiento {
  id?: number;
  servicioId: number;
  paso: string;
  orden: number;
}

export async function listarProcedimientos(): Promise<Procedimiento[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los procedimientos");
  }

  return response.json();
}