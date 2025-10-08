import React from "react";
import ContactCard from "../../molecules/ContactCard/ContactCard";
import "./FavoritesList.css";

interface Contact {
  id: number;
  name: string;
  email: string;
}

interface FavoritesListProps {
  favorites: Contact[];
  onRemove?: (id:number)=>void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onRemove }) => (
  <div className="favorites-list">
    {favorites.map(f => (
      <ContactCard key={f.id} name={f.name} email={f.email} type="favorite" onRemove={()=>onRemove?.(f.id)} />
    ))}
  </div>
);

export default FavoritesList;
