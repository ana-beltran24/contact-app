import { useState } from "react";
import "../../atoms/Input/input.css";
import "../../atoms/Button/button.css";
import "./ContactForm.css";
import { useAppDispatch } from "@/app/hooks";
import { addContact } from "@/features/contacts/contactThunks";

function ContactForm() {
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("favorite", String(favorite));
    if (photo) formData.append("photo", photo);

    dispatch(addContact(formData));

    
    setFirstName("");
    setLastName("");
    setEmail("");
    setFavorite(false);
    setPhoto(null);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label className="favorite-checkbox">
        <span>Enable like favorite</span>
        <input
          type="checkbox"
          checked={favorite}
          onChange={(e) => setFavorite(e.target.checked)}
        />
      </label>

      <input className="image-input"
        type="file"
        accept="image/*"
        onChange={(e) => setPhoto(e.target.files?.[0] || null)}
      />

      <button type="submit" className="save-button">
        SAVE
      </button>
    </form>
  );
}

export default ContactForm;
