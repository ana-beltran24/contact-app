import React from "react";
import Title from "@/components/molecules/Title/title";
import FavoritesList from "@/components/organisms/FavoritesList/FavoritesList";
import ContactList from "@/components/organisms/ContactList/ContactList";
import { useAppSelector } from "@/app/hooks";
import type { Contact } from "@/features/contacts/contactTypes";

const OverviewPage: React.FC = () => {
  const { contacts } = useAppSelector((state) => state.contacts);
  
  const favoriteContacts: Contact[] = contacts
    .filter((c) => c.isFavorite)
    .slice(0, 4);

  const normalContacts: Contact[] = contacts
    .filter((c) => !c.isFavorite)
    .slice(0, 12);

  return (
    <>
      <Title text="Favorites" />
      <FavoritesList favorites={favoriteContacts} type="favorite" />

      <Title text="Contact List" />
      <ContactList type="overview" contacts={normalContacts} />
    </>
  );
};

export default OverviewPage;
