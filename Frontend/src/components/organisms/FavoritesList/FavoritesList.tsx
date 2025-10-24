import React from "react";
import ContactCard from "../../molecules/ContactCard/ContactCard";
import "./FavoritesList.css";
import type { Contact } from "@/features/contacts/contactTypes";

interface FavoritesListProps {
  favorites: Contact[];
  type?: "favorite" | "overview"; // opcional, por si quieres usar overview también
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, type = "favorite" }) => (
  <div className="favorites-list">
    {favorites.map((f) => (
      <ContactCard
        key={f.id}
        name={`${f.name} ${f.lastName}`}
        email={f.email}
        image={f.photo ? `http://localhost:4000/api/contacts/${f.id}/photo` : undefined}
        type={type}
      />
    ))}
  </div>
);

export default FavoritesList;
