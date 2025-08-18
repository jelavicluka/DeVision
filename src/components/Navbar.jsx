import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { NavLink } from "react-router-dom";

const Navbar = ({ croatian, setCroatian }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY === 0) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
    
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

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

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav 
            className={`navbar ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}
            style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(-100%)'
            }}
        >
            <div className="logo">
                <NavLink to="/" className="NavLink-logo-text">
                    <span id="logo-text">DeVision</span>
                </NavLink>
            </div>
            <div className={`nav-right ${isMenuOpen ? 'menu-open' : ''}`}>
                <div className="hamburger-menu" onClick={toggleMenu} ref={hamburgerRef}>
                    <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div 
                    className={`mobile-menu-container ${isMenuOpen ? 'show' : ''}`}
                    ref={menuRef}
                >
                    <div className="tabs">
                        <ul>
                            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : '')} onClick={() => setIsMenuOpen(false)}>
                                <li><span>{croatian ? "O nama" : "About us"}</span></li>
                            </NavLink>
                            <NavLink to="/services" className={({ isActive }) => (isActive ? "active" : '')} onClick={() => setIsMenuOpen(false)}>
                                <li><span>{croatian ? "Usluge" : "Services"}</span></li>
                            </NavLink>
                            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : '')} onClick={() => setIsMenuOpen(false)}>
                                <li><span>{croatian ? "Kontakt" : "Contact"}</span></li>
                            </NavLink>
                        </ul>
                    </div>
                    <div className="divider">|</div>
                    <div className="language-toggle">
                        <button
                            className={croatian ? "language-btn active" : "language-btn"}
                            onClick={() => setCroatian(true)}
                        >
                            Hrv
                        </button>
                        <button
                            className={!croatian ? "language-btn active" : "language-btn"}
                            onClick={() => setCroatian(false)}
                        >
                            Eng
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;