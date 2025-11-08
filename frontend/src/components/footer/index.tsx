import React from 'react';
import './footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <span className="footer-text">
            Case desenvolvido para
            <a href="https://www.rdstation.com/" target="_blank" rel="noopener noreferrer" className="footer-link">
              RD Station
            </a> 
            por 
            <a href="https://www.linkedin.com/in/mariajulialorenzoni" target="_blank" rel="noopener noreferrer" className="footer-link">
              Maria Júlia Lorenzoni 
            </a>
          </span>
        </div>
        
        <div className="footer-right">
          <a 
            href="https://legal.rdstation.com/pt/privacy-policy/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="privacy-link"
          >
            Política de Privacidade
          </a>
        </div>
      </div>
    </footer>
  );
};