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

export const editContact = createAsyncThunk(
  "contacts/edit",
  async ({ id, formData }: { id: string; formData: FormData }) => {
    const data = await contactService.updateContact(id, formData);
    return data;
  }
);

export const removeContact = createAsyncThunk("contacts/remove", async (id: string) => {
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

