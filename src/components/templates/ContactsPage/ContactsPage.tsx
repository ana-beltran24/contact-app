import React from "react";
import Navbar from "@/components/organisms/Navbar/navbar";
import Title from "@/components/molecules/Title/title";
import ContactList from "@/components/organisms/ContactList/ContactList";

const ContactsPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Title text="Contact List" />
      <ContactList contacts={[{id:1,name:"Sample",email:"sample@mail.com"}]} />
    </>
  );
};

export default ContactsPage;
