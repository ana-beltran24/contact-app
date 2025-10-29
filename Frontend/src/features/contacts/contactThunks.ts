import { createAsyncThunk } from "@reduxjs/toolkit";
import * as contactService from "./contactService";
import { toggleFavorite as toggleFavoriteService } from "./contactService";
import type { Contact } from "@/features/contacts/contactTypes";


export const fetchContacts = createAsyncThunk("contacts/fetchAll", async () => {
  const contacts = await contactService.getContacts();
  const contactsWithPhotos = await Promise.all(
    contacts.map(async (contact) => {
      try {
        const photoUrl = await contactService.getContactPhoto(contact.id);
        return { ...contact, photo: photoUrl };
      } catch {
        return contact;
      }
    })
  );

  return contactsWithPhotos;
});

export const addContact = createAsyncThunk("contacts/add", async (formData: FormData) => {
  const data = await contactService.createContact(formData);
  return data;
});

export const deleteContact = createAsyncThunk("contacts/remove", async (id: string) => {
  await contactService.deleteContact(id);
  return id;
});

export const toggleFavoriteContact = createAsyncThunk<
  Contact, 
  { id: string; favorite: boolean } 
>(
  "contacts/toggleFavorite",
  async ({ id, favorite }) => {
    const updated = await toggleFavoriteService(id, favorite);
    return updated; 
  }
);

export const editContact = createAsyncThunk(
  "contacts/editContact",
  async (
    {
      id,
      name,
      lastName,
      email,
      photo,
    }: { id: number; name: string; lastName: string; email: string; photo?: File | null },
    { rejectWithValue }
  ) => {
    try {
      await contactService.editContact(id, { name, lastName, email, photo });

      return {
        id: id.toString(),
        name,
        lastName,
        email,
        photo: photo ? URL.createObjectURL(photo) : undefined,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error al editar contacto");
    }
  }
);

