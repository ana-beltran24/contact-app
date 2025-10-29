import React, { useEffect } from "react";
import "./FavoriteModal.css";

interface FavoriteModalProps {
  onClose: () => void;
}

const FavoriteModal: React.FC<FavoriteModalProps> = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal-content favorite-modal">
        <p>¡Contacto agregado a favoritos!</p>
      </div>
    </div>
  );
};

export default FavoriteModal;
