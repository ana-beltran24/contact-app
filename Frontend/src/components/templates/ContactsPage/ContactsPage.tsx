import React from "react";
import Title from "@/components/molecules/Title/title";
import ContactList from "@/components/organisms/ContactList/ContactList";

const ContactsPage: React.FC = () => {
  return (
    <>
      <Title text="Contact List" />
      <ContactList type="contacts" />
    </>
  );
};

export default ContactsPage;
