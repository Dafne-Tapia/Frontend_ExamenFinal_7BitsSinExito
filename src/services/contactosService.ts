import { API_URL } from './api';

export const getContactos = async () => {
  const res = await fetch(`${API_URL}/api/contactos`);
  return res.json();
};

export const createContacto = async (data: any) => {
  const res = await fetch(`${API_URL}/api/contactos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateContacto = async (id: number, data: any) => {
  const res = await fetch(`${API_URL}/api/contactos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteContacto = async (id: number) => {
  await fetch(`${API_URL}/api/contactos/${id}`, { method: 'DELETE' });
};