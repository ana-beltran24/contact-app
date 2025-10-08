import React from "react";
import Title from "@/components/molecules/Title/title";
import FavoritesList from "@/components/organisms/FavoritesList/FavoritesList";
import ContactList from "@/components/organisms/ContactList/ContactList";

const testContacts = [
  { id:1, name:"Ana Beltrán", email:"ana@example.com" },
  { id:2, name:"Maria Gómez", email:"mari@example.com" }
];

const OverviewPage: React.FC = () => {
  return (
    <>
      <Title text="Favorites" />
      <FavoritesList favorites={testContacts} />
      <Title text="Contact List" />
      <ContactList contacts={testContacts} />
    </>
  );
};

export default OverviewPage;
