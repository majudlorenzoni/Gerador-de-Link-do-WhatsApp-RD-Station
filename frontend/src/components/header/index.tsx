import React from 'react';
import './Header.css';
import RDStation from '../../assets/rd-station-default.svg'

const Header: React.FC = () => {
  return (
    <header className="header">
        <img src={RDStation} alt="RD Station Logo" className="header-icon" />
        <h1 className="header-title">Gerador de Link do WhatsApp</h1>
    </header>
  );
};

export default Header;
