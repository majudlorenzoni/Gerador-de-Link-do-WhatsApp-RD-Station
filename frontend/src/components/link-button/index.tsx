import React from 'react';
import './button.css'

interface LinkButtonProps {
  text: string;
  link?: string;
  icon?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const LinkButton: React.FC<LinkButtonProps> = ({
  text,
  link,
  icon,
  onClick,
  className = '',
  type = "button"
}) => {
  if (link) {
    return (
      <a href={link} className={`button-with-icon ${className}`}>
        {text}
        {icon && <img src={icon} alt="ícone" className="button-icon" />}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`button-with-icon ${className}`}
    >
      {text}
      {icon && <img src={icon} alt="ícone" className="button-icon" />}
    </button>
  );
};

export default LinkButton;
