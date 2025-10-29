import React from "react";
import "./DeleteModal.css";

interface DeleteModalProps {
  name: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ name, onCancel, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Eliminar contacto</h3>
        <p>¿Estás seguro de eliminar a <strong>{name}</strong>?</p>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onCancel}>Cancelar</button>
          <button className="save-btn" onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
