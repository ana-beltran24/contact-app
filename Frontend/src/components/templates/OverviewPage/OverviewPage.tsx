import React, { useEffect } from "react";
import Title from "@/components/molecules/Title/title";
import FavoritesList from "@/components/organisms/FavoritesList/FavoritesList";
import ContactList from "@/components/organisms/ContactList/ContactList";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchContacts, toggleFavoriteContact } from "@/features/contacts/contactThunks";
import type { Contact } from "@/features/contacts/contactTypes";

const OverviewPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
      }
    , []);

  const { contacts } = useAppSelector((state) => state.contacts);

  const favoriteContacts: Contact[] = contacts
    .filter((c) => c.favorite)
    .slice(0, 4);

  const normalContacts: Contact[] = contacts
    .filter((c) => !c.favorite)
    .slice(0, 8);

  return (
    <>
      <Title text="Favorites" />
      <FavoritesList
        favorites={favoriteContacts}
        type="favorite"
        onRemove={(id) =>
          dispatch(toggleFavoriteContact({ id, favorite: false }))
        }
      />

      <Title text="Contact List" />
      <ContactList type="overview" contacts={normalContacts} />
    </>
  );
};

export default OverviewPage;