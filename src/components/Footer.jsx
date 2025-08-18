import React from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import IconsSocial from './IconsSocial';
import './Footer.css';

const Footer = ({ croatian }) => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">
            <NavLink to="/" onClick={scrollToTop}>
              <span className="logo-text">DeVision</span>
            </NavLink>
          </div>
          <div className="contact-section">
            <h3 className='contact-heading'>{croatian ? "Kontaktirajte nas" : "Contact us"}</h3>
            <div className="contact-info">
              <div className="contact-item">
                <FontAwesomeIcon icon={faPhone} color="white" size="2x" className="icon" />
                <a href="tel:+385913446312">+385 99 123 4567</a>
              </div>
              <div className="contact-item">
                <FontAwesomeIcon icon={faEnvelope} color="white" size="2x" className="icon" />
                <a href="mailto:lukajelavi@email.com">info@devision.com</a>
              </div>
              <div className='contact-icons'>
                <IconsSocial color={"white"} size={"3x"} />
              </div>
            </div>
          </div>
        </div>
        <div className="footer-right">
          <nav className="footer-nav">
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : '')} onClick={scrollToTop}>
              <span>{croatian ? "O nama" : "About us"}</span>
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => (isActive ? "active" : '')} onClick={scrollToTop}>
              <span>{croatian ? "Usluge" : "Services"}</span>
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : '')} onClick={scrollToTop}>
              <span>{croatian ? "Kontakt" : "Contact"}</span>
            </NavLink>
          </nav>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} DeVision. {croatian ? "Sva prava pridržana." : "All rights reserved."}</p>
      </div>
    </footer>
  );
}

export default Footer;
