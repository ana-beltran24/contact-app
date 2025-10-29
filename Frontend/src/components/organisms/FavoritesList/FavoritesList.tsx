import React, { useState } from "react";
import ContactCard from "../../molecules/ContactCard/ContactCard";
import "./FavoritesList.css";
import type { Contact } from "@/features/contacts/contactTypes";

interface FavoritesListProps {
  favorites: Contact[];
  type?: "favorite" | "overview";
  onRemove?: (id: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  type = "favorite",
  onRemove,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 12;

  const indexOfLast = currentPage * contactsPerPage;
  const indexOfFirst = indexOfLast - contactsPerPage;
  const paginatedFavorites = favorites.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(favorites.length / contactsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="favorites-list-container">
      <div className="favorites-list">
        {paginatedFavorites.map((f) => (
          <ContactCard
            key={f.id}
            name={`${f.name} ${f.lastName}`}
            email={f.email}
            image={
              f.photo
                ? `http://localhost:4000/api/contacts/${f.id}/photo`
                : undefined
            }
            type={type}
            onRemove={() => onRemove?.(f.id)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination-container bottom-left">
          <span className="pagination-info">
            {currentPage} de {totalPages}
          </span>
          <button
            className="pagination-arrow"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            ❮
          </button>
          <button
            className="pagination-arrow"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            ❯
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
