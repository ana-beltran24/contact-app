import { api } from "../../utils/api";
import type { Contact } from "./contactTypes";

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
  const response = await fetch(`http://localhost:4000/api/contacts/${id}/favorite`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isFavorite: favorite }),
  });

  if (!response.ok) throw new Error("No se pudo actualizar el favorito");

  const updatedContact = await response.json();
  return updatedContact; 
};




