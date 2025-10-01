import React from "react";
import Button from "../../atoms/Button/button";
import Text from "../../atoms/Text/text";
import "./ContactCard.css";

interface ContactCardProps {
  name: string;
  email: string;
  image?: string;
  type?: "favorite" | "normal";
  onRemove?: () => void;
  onFavorite?: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ name, email, image, type="normal", onRemove, onFavorite }) => (
  <div className="contact-card">
    <img src={image || "/profile.png"} alt={name} className="card-image" />
    <div className="card-text">
      <Text className="full-name">{name}</Text>
      <Text className="email">{email}</Text>
      <hr className="card-hr" />
    </div>

    {type === "favorite" ? (
      <Button label="REMOVE" variant="remove" onClick={onRemove} />
    ) : (
      <Button label="" variant="favorite" onClick={onFavorite}>
        <i className="fa-solid fa-heart"></i>
      </Button>
    )}
  </div>
);

export default ContactCard;
