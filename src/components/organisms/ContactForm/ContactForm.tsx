import { useState } from "react";
import "../../atoms/Input/input.css";
import "../../atoms/Button/button.css";
import "./ContactForm.css";

function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newContact = {
      firstName,
      lastName,
      email,
      isFavorite,
    };

    console.log("Saved contact:", newContact);
    // Conectar con API POST
    
    // Para limpiar formulario
    setFirstName("");
    setLastName("");
    setEmail("");
    setIsFavorite(false);
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
          checked={isFavorite}
          onChange={(e) => setIsFavorite(e.target.checked)}
        />
      </label>

      <button type="submit" className="save-button">
        SAVE
      </button>
    </form>
  );
}

export default ContactForm;
