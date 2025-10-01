import React from "react";
import Button from "../../atoms/Button/button";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav>
      <img src="/logo.png" alt="Logo" className="logo" />
      <ul>
        <li><a href="/">Overview</a></li>
        <li><a href="/contacts">Contacts</a></li>
        <li><a href="/favorites">Favorites</a></li>
        <Button label="+ NEW" variant="new" />
      </ul>
    </nav>
  );
};

export default Navbar;
