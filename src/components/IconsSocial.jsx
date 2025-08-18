import React from "react";
import './IconsSocial.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faTiktok } from '@fortawesome/free-brands-svg-icons';

const IconsSocial = ( { color, size } ) => {
    return (
        <div className='social-icons'>
            <a href="#" title="Instagram" className="social-icon"><FontAwesomeIcon icon={faInstagram} color={ color } size={ size } className="icon" /></a>
            <a href="#" title="TikTok" className="social-icon"><FontAwesomeIcon icon={faTiktok} color={ color } size={ size } className="icon" /></a>
            <a href="#" title="Facebook" className="social-icon"><FontAwesomeIcon icon={faFacebookF} color={ color } size={ size } className="icon" /></a>
        </div>
    )
}

export default IconsSocial;