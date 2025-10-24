import React from "react";
import "./button.css";

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  variant?: "new" | "remove" | "favorite" | "delete";
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = "new", children }) => {
  return (
    <button className={`btn-${variant}`} onClick={onClick}>
      {children || label}
    </button>
  );
};

export default Button;
