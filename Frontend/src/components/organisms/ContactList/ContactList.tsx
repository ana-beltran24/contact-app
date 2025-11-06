import React, { useEffect, useState } from "react";
import ContactCard from "@/components/molecules/ContactCard/ContactCard";
import "./ContactList.css";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchContacts,
  deleteContact,
  toggleFavoriteContact,
  editContact,
} from "@/features/contacts/contactThunks";
import type { Contact } from "@/features/contacts/contactTypes";
import DeleteModal from "@/components/molecules/DeleteModal/DeleteModal";
import FavoriteModal from "@/components/molecules/FavoriteModal/FavoriteModal";

interface ContactListProps {
  type?: "contacts" | "favorite" | "overview";
  contacts?: Contact[];
}

const ContactList: React.FC<ContactListProps> = ({ type, contacts }) => {
  const dispatch = useAppDispatch();
  const { contacts: allContacts, loading } = useAppSelector(
    (state) => state.contacts
  );

  const contactState = allContacts ?? []; 
  const contactsToShow = contacts ?? contactState;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    photo: null as File | null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 12;

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    contact: Contact | null;
  }>({ open: false, contact: null });
  const [favoriteModal, setFavoriteModal] = useState(false);

  if (loading) return <p className="loading">Cargando contactos...</p>;
  if (!contactsToShow.length) return <p className="empty">No hay contactos</p>;

  const filteredContacts =
    type === "favorite" ? contactsToShow.filter((c) => c.favorite) : contactsToShow;

  const indexOfLast = currentPage * contactsPerPage;
  const indexOfFirst = indexOfLast - contactsPerPage;
  const paginatedContacts = filteredContacts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const openModal = (contact: Contact) => {
    setSelectedContact(contact);
    setFormData({
      name: contact.name,
      lastName: contact.lastName,
      email: contact.email,
      photo: null,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files) {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    if (!selectedContact) return;

    dispatch(
      editContact({
        id: Number(selectedContact.id),
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        photo: formData.photo,
      })
    );

    closeModal();
  };

  return (
    <div className="contact-list">
    <div className="grid-card">
      {paginatedContacts.map((c: Contact) => (
        <ContactCard
          key={c.id}
          name={`${c.name} ${c.lastName}`}
          email={c.email}
          image={
            c.photo
              ? `http://localhost:4000/api/contacts/${c.id}/photo`
              : undefined
          }
          type={type}
          onDelete={() => setDeleteModal({ open: true, contact: c })}
          onFavorite={() => {
            dispatch(toggleFavoriteContact({ id: c.id, favorite: !c.favorite }));
            if (!c.favorite) setFavoriteModal(true);
          }}
          onRemove={() =>
            dispatch(toggleFavoriteContact({ id: c.id, favorite: false }))
          }
          onEdit={() => openModal(c)}
        />
      ))}

    </div>

      {type !== "overview" && totalPages > 1 && (
        <div className="pagination-container bottom-right">
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
    
      {deleteModal.open && (
        <DeleteModal
          name={deleteModal.contact?.name || ""}
          onCancel={() => setDeleteModal({ open: false, contact: null })}
          onConfirm={() => {
            if (deleteModal.contact)
              dispatch(deleteContact(deleteModal.contact.id));
            setDeleteModal({ open: false, contact: null });
          }}
        />
      )}

      {favoriteModal && <FavoriteModal onClose={() => setFavoriteModal(false)} />}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar contacto</h2>
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Apellido:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Correo:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Foto:
              <input type="file" name="photo" onChange={handleInputChange} />
            </label>

            <div className="modal-buttons">
              <button onClick={handleSave} className="save-btn">
                Guardar
              </button>
              <button onClick={closeModal} className="cancel-btn">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;