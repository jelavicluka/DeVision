import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import IconsSocial from './IconsSocial';
import Logo from './Logo';
import './Footer.css';

const Footer = () => {
  const { pathname } = useLocation();

  const handleHomeLinkClick = (event) => {
    if (pathname !== '/') return;

    event.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">
            <NavLink to="/" onClick={handleHomeLinkClick} aria-label="DeVision — povratak na vrh početne stranice">
              <Logo />
            </NavLink>
          </div>
          <div className="contact-section">
            <h3 className="contact-heading">Kontaktirajte nas</h3>
            <div className="contact-info">
              <div className="contact-item">
                <FontAwesomeIcon icon={faPhone} color="white" size="2x" className="icon" />
                <a href="tel:+385996047635">+385 99 604 7635</a>
              </div>
              <div className="contact-item">
                <FontAwesomeIcon icon={faEnvelope} color="white" size="2x" className="icon" />
                <a href="mailto:deni@devision.hr">deni@devision.hr</a>
              </div>
              <div className='contact-icons'>
                <IconsSocial size="3x" />
              </div>
            </div>
          </div>
        </div>
        <div className="footer-right">
          <nav className="footer-nav">
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : '')} onClick={handleHomeLinkClick}>
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
        <NavLink to="/privatnost">Obavijest o privatnosti</NavLink>
      </div>
    </footer>
  );
}

export default Footer;
