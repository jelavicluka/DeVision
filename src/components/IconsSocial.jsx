import './IconsSocial.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faTiktok } from '@fortawesome/free-brands-svg-icons';

const platforms = [
    { name: 'Instagram', key: 'instagram', icon: faInstagram },
    { name: 'TikTok', key: 'tiktok', icon: faTiktok },
    { name: 'Facebook', key: 'facebook', icon: faFacebookF },
];

const IconsSocial = ({ size, links = {} }) => {
    return (
        <div className="social-icons">
            {platforms.map((platform) => {
                const icon = <FontAwesomeIcon icon={platform.icon} size={size} className="icon" />;

                return links[platform.key] ? (
                    <a
                        key={platform.key}
                        href={links[platform.key]}
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
