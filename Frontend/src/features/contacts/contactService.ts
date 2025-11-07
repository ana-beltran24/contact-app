import { api } from "../../utils/api";
import type { Contact } from "./contactTypes";

const API_URL = `/api/contacts`;

export const getContacts = async (): Promise<Contact[]> => {
  const res = await api.get("/api/contacts");
  return res.data;
};

export const getContactPhoto = async (id: string): Promise<string> => {
  const res = await api.get(`/api/contacts/${id}/photo`, { responseType: "blob" });
  return URL.createObjectURL(res.data);
};

export const createContact = async (contactData: FormData): Promise<Contact> => {
  const res = await api.post("/api/contacts", contactData);
  return res.data;
};

export const updateContact = async (id: string, contactData: FormData): Promise<Contact> => {
  const res = await api.put(`/api/contacts/${id}`, contactData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteContact = async (id: string): Promise<void> => {
  await api.delete(`/api/contacts/${id}`);
};

export const toggleFavorite = async (id: string, favorite: boolean) => {
  const response = await fetch(`${API_URL}/${id}/favorite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ favorite: favorite }),
  });

  if (!response.ok) throw new Error("No se pudo actualizar el favorito");

  const updatedContact = await response.json();
  return updatedContact; 
};


export const editContact = async (
  id: number,
  data: { name?: string; lastName?: string; email?: string; photo?: File | null }
) => {
  const formData = new FormData();
  if (data.name) formData.append("name", data.name);
  if (data.lastName) formData.append("lastName", data.lastName);
  if (data.email) formData.append("email", data.email);
  if (data.photo) formData.append("photo", data.photo);

  const response = await api.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};




