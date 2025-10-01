import React, { useState } from "react";
import Input from "../../atoms/Input/input";
import Button from "../../atoms/Button/button";
import "./ContactForm.css";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log({ name, email });
  };

  return (
    <div className="form">
      <Input placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} />
      <Input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <Button label="Add Contact" onClick={handleSubmit} />
    </div>
  );
};

export default ContactForm;
