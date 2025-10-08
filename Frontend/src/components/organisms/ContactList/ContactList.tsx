import React from "react";
import ContactCard from "../../molecules/ContactCard/ContactCard";
import "./ContactList.css";

interface Contact {
  id: number;
  name: string;
  email: string;
}

interface ContactListProps {
  contacts: Contact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => (
  <div className="contact-list">
    {contacts.map(c => (
      <ContactCard key={c.id} name={c.name} email={c.email} />
    ))}
  </div>
);

export default ContactList;
