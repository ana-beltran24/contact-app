import React, { useEffect } from "react";
import ContactCard from "../../molecules/ContactCard/ContactCard";
import "./ContactList.css";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchContacts, removeContact, toggleFavoriteContact } from "@/features/contacts/contactThunks";
import type { Contact } from "@/features/contacts/contactTypes";

interface ContactListProps {
  type?: "contacts" | "favorite" | "overview";
  contacts?: Contact[];
}

const ContactList: React.FC<ContactListProps> = ({ type }) => {
  const dispatch = useAppDispatch();
  const { contacts, loading } = useAppSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (loading) return <p className="loading">Cargando contactos...</p>;
  if (!contacts.length) return <p className="empty">No hay contactos</p>;

  return (
    <div className="contact-list">
      {contacts.map((c: Contact) => (
        <ContactCard
          key={c.id}
          name={`${c.name} ${c.lastName}`}
          email={c.email}
          image={
            c.photo
              ? `http://localhost:4000/api/contacts/${c.id}/photo`
              : undefined
          }
          type={type}
          onDelete={() => dispatch(removeContact(c.id))} 
          onFavorite={() => dispatch(toggleFavoriteContact({ id: c.id, favorite: !c.isFavorite })) }
          onRemove={() => dispatch(toggleFavoriteContact({ id: c.id, favorite: false })) 
          }
        />
      ))}
    </div>
  );
};

export default ContactList;
