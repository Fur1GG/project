import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <img src='/images/logo_teste2.png' alt="Logo" className="logo" />
        <p><span>Contato:</span> info@exemplo.com</p>
        <p>&copy; 2023 Direitos Reservados</p>
      </div>
    </footer>
  );
};

export default Footer;

