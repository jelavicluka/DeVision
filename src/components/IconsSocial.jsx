import './IconsSocial.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn, faTiktok } from '@fortawesome/free-brands-svg-icons';
import socialLinks from './socialLinks';

const icons = {
    linkedin: faLinkedinIn,
    instagram: faInstagram,
    facebook: faFacebookF,
    tiktok: faTiktok,
};

const IconsSocial = ({ size, links = {} }) => {
    return (
        <div className="social-icons">
            {socialLinks.map((platform) => {
                const href = links[platform.key] ?? platform.href;
                const icon = <FontAwesomeIcon icon={icons[platform.key]} size={size} className="icon" />;

                return href ? (
                    <a
                        key={platform.key}
                        href={href}
                        title={platform.name}
                        aria-label={platform.name}
                        className="social-icon"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {icon}
                    </a>
                ) : (
                    <span key={platform.key} title={platform.name} aria-label={platform.name} className="social-icon" role="img">
                        {icon}
                    </span>
                );
            })}
        </div>
    );
};

export default IconsSocial;
