import React, { useEffect } from "react";
import Title from "@/components/molecules/Title/title";
import FavoritesList from "@/components/organisms/FavoritesList/FavoritesList";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchContacts, toggleFavoriteContact } from "@/features/contacts/contactThunks"; 

const FavoritesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { contacts, loading } = useAppSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const favoriteContacts = contacts.filter((c) => c.favorite);

  if (loading) return <p className="loading">Cargando favoritos...</p>;
  if (!favoriteContacts.length) return <p className="empty">No tienes contactos favoritos</p>;

  return (
    <>
      <Title text="Favorites" />
      <FavoritesList
        favorites={favoriteContacts}
        type="favorite"
        onRemove={(id) => dispatch(toggleFavoriteContact({ id, favorite: false }))}
      />
    </>
  );
};

export default FavoritesPage;
