import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "./EditContactModal.css";

interface EditContactModalProps {
  name: string;
  lastName: string;
  email: string;
  onClose: () => void;
  onSave: (updatedContact: {
    name: string;
    lastName: string;
    email: string;
    photo?: File | null;
  }) => void;
}

const EditContactModal: React.FC<EditContactModalProps> = ({
  name: initialName,
  lastName: initialLastName,
  email: initialEmail,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(initialName);
  const [lastName, setLastName] = useState(initialLastName);
  const [email, setEmail] = useState(initialEmail);
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({ name, lastName, email, photo });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar contacto</h2>

        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Apellido:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Correo:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Foto:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <div className="button-group">
            <button type="submit" className="btn-save">
              Guardar
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContactModal;
