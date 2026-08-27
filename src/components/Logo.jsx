import './Logo.css';

const Logo = ({ className = '' }) => (
  <span className={`logo-mark ${className}`.trim()} aria-label="DeVision Marketing Agency">
    <span className="logo-mark__name">DeVision</span>
    <span className="logo-mark__tagline">Marketing Agency</span>
  </span>
);

export default Logo;
