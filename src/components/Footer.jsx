import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import IconsSocial from './IconsSocial';
import Logo from './Logo';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">
            <NavLink to="/">
              <Logo />
            </NavLink>
          </div>
          <div className="contact-section">
            <h3 className="contact-heading">Kontaktirajte nas</h3>
            <div className="contact-info">
              <div className="contact-item">
                <FontAwesomeIcon icon={faPhone} color="white" size="2x" className="icon" />
                <a href="tel:+385991234567">+385 99 123 4567</a>
              </div>
              <div className="contact-item">
                <FontAwesomeIcon icon={faEnvelope} color="white" size="2x" className="icon" />
                <a href="mailto:info@devision.com">info@devision.com</a>
              </div>
              <div className='contact-icons'>
                <IconsSocial size="3x" />
              </div>
            </div>
          </div>
        </div>
        <div className="footer-right">
          <nav className="footer-nav">
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : '')}>
              <span>O nama</span>
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => (isActive ? "active" : '')}>
              <span>Usluge</span>
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : '')}>
              <span>Kontakt</span>
            </NavLink>
          </nav>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} DeVision. Sva prava pridržana.</p>
      </div>
    </footer>
  );
}

export default Footer;
