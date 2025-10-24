import React from "react";
import Button from "../../atoms/Button/button";
import Logo from "@/assets/Images/Logo.png";
import "./navbar.css";

interface NavbarProps {
  onNewClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNewClick }) => {
  return (
    <nav>
      <img src={Logo} alt="Logo" className="logo" />
      <ul>
        <li><a href="/">Overview</a></li>
        <li><a href="/contacts">Contacts</a></li>
        <li><a href="/favorites">Favorites</a></li>
        <Button label="+ NEW" variant="new" onClick={onNewClick} />
      </ul>
    </nav>
  );
};

export default Navbar;
