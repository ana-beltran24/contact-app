import React from "react";
import Button from "../../atoms/Button/button";
import Text from "../../atoms/Text/text";
import "./ContactCard.css";
import HeartIcon from "@/assets/Icons/icon_action_favorite_24px.svg?react";
import RemoveIcon from "@/assets/Icons/icon_navigation_close_24px.svg?react";
import DeleteIcon from "@/assets/Icons/delete-24px.svg?react";
import EditIcon from "@/assets/Icons/edit-3-svgrepo-com.svg?react";
import noPhoto from "@/assets/Icons/nophoto-avatar.png";

interface ContactCardProps {
  name: string;
  email: string;
  image?: string;
  type?: "overview" | "contacts" | "favorite";
  onFavorite?: () => void;
  onDelete?: () => void;
  onRemove?: () => void;
  onEdit?: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ name, email, image, type="normal", onRemove, onFavorite, onDelete, onEdit }) => (
  <div className="contact-card">
    <img src={image || noPhoto} alt={name} className={`card-image ${type === "favorite" ? "favorite-border" : ""}`} />
    <div className="card-text">
      <Text className="full-name">{name}</Text>
      <Text className="email">{email}</Text>
      <hr className="card-hr" />
    </div>

    <div className="card-buttons">
  {type === "favorite" ? (
    <Button variant="remove" onClick={onRemove} label="">
      <RemoveIcon /> REMOVE
    </Button>
  ) : type === "contacts" ? (
    <>
      <Button variant="delete" onClick={onDelete} label="">
        <DeleteIcon />
      </Button>
      <Button variant="favorite" onClick={onFavorite} label="">
        <HeartIcon />
      </Button>
      <Button variant="edit" onClick={onEdit} label="">
        <EditIcon/>
      </Button>
    </>
  ) : type === "overview" ? (
    <Button variant="favorite" onClick={onFavorite} label="">
      <HeartIcon />
    </Button>
  ) : null}
</div>


  </div>
);

export default ContactCard;
