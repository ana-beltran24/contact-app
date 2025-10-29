import React, { useEffect, useState } from "react";
import Title from "@/components/molecules/Title/title";
import ContactList from "@/components/organisms/ContactList/ContactList";
import SearchBar from "@/components/molecules/SearchBar/SearchBar";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchContacts } from "@/features/contacts/contactThunks";

const ContactsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { contacts, loading } = useAppSelector((state) => state.contacts);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter((c) =>
    `${c.name} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Title text="Contactos" />
      <SearchBar value={search} onChange={setSearch} />

      {loading ? (
        <p className="loading">Cargando contactos...</p>
      ) : filteredContacts.length > 0 ? (
        <ContactList contacts={filteredContacts} type="contacts" />
      ) : (
        <p className="empty">No se encontraron contactos</p>
      )}
    </>
  );
};

export default ContactsPage;
