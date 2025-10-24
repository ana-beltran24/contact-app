import React from "react";
import Title from "@/components/molecules/Title/title";
import FavoritesList from "@/components/organisms/FavoritesList/FavoritesList";
import { useAppSelector } from "@/app/hooks";

const FavoritesPage: React.FC = () => {
  const { contacts } = useAppSelector((state) => state.contacts);
  const favoriteContacts = contacts.filter((c) => c.isFavorite);

  return (
    <>
      <Title text="Favorites" />
      <FavoritesList favorites={favoriteContacts} type="favorite" />
    </>
  );
};

export default FavoritesPage;
