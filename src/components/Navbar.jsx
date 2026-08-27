import { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const lastScrollY = useRef(0);
    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);
            
            if (currentScrollY < 50) {
                setIsVisible(true);
            } else if (scrollDifference > 50) {
                setIsVisible(currentScrollY < lastScrollY.current);
                lastScrollY.current = currentScrollY;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isMenuOpen && 
                menuRef.current && 
                !menuRef.current.contains(event.target) &&
                hamburgerRef.current &&
                !hamburgerRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };
        const handleEscape = (event) => {
            if (event.key === 'Escape') setIsMenuOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isMenuOpen]);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav 
            className={`navbar ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}
            aria-label="Glavna navigacija"
        >
            <div className="logo">
                <NavLink to="/" className="nav-logo" onClick={closeMenu}>
                    <Logo />
                </NavLink>
            </div>
            <div className={`nav-right ${isMenuOpen ? 'menu-open' : ''}`}>
                <button
                    type="button"
                    className="hamburger-menu"
                    onClick={() => setIsMenuOpen((open) => !open)}
                    ref={hamburgerRef}
                    aria-expanded={isMenuOpen}
                    aria-controls="primary-navigation"
                    aria-label="Otvori navigaciju"
                >
                    <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
                <div 
                    id="primary-navigation"
                    className={`mobile-menu-container ${isMenuOpen ? 'show' : ''}`}
                    ref={menuRef}
                >
                    <div className="tabs">
                        <ul>
                            <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>O nama</NavLink></li>
                            <li><NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Usluge</NavLink></li>
                            <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Kontakt</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
