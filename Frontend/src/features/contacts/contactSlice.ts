import { createSlice } from "@reduxjs/toolkit";
import type { Contact } from "./contactTypes";
import { fetchContacts, addContact, editContact, removeContact, toggleFavoriteContact } from "./contactThunks";

interface ContactState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactState = {
  contacts: [],
  loading: false,
  error: null,
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  builder
    .addCase(fetchContacts.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchContacts.fulfilled, (state, action) => {
      state.loading = false;
      state.contacts = action.payload;
    })
    .addCase(fetchContacts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error al obtener contactos";
    })
    .addCase(addContact.fulfilled, (state, action) => {
      state.contacts.push(action.payload);
    })
    .addCase(editContact.fulfilled, (state, action) => {
      const index = state.contacts.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) state.contacts[index] = action.payload;
    })
    .addCase(removeContact.fulfilled, (state, action) => {
      state.contacts = state.contacts.filter((c) => c.id !== action.payload);
    })
    .addCase(toggleFavoriteContact.fulfilled, (state, action) => {
      const index = state.contacts.findIndex((c) => c.id.toString() === action.payload.id.toString());
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    });
  },
});

export default contactSlice.reducer;
