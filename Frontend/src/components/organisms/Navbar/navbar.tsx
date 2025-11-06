import React, { useState } from "react";
import Button from "../../atoms/Button/button";
import Logo from "@/assets/Images/Logo.png";
import "./navbar.css";
import { NavLink } from "react-router-dom";

interface NavbarProps {
  onNewClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNewClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav>
      <img src={Logo} alt="Logo" className="logo" />

      <div className={`burger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={isOpen ? "active" : ""}>
        <li><NavLink to="/" > Overview</NavLink> </li>
         {/* <li><a h="/">Overview</a></li> */}
        <li><NavLink to="/contacts">Contacts</NavLink></li>
        <li><a href="/favorites">Favorites</a></li>
        <Button label="+ NEW" variant="new" onClick={onNewClick} />
      </ul>
    </nav>
  );
};

export default Navbar;
