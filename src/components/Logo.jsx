import './Logo.css';

const tagline = 'MARKETING AGENCY';

const Logo = ({ className = '' }) => (
  <span
    className={`logo-mark ${className}`.trim()}
    role="img"
    aria-label="DeVision Marketing Agency"
  >
    <span className="logo-mark__name" aria-hidden="true">DeVision</span>
    <span className="logo-mark__tagline" aria-hidden="true">
      {Array.from(tagline).map((character, index) => (
        <span
          className={character === ' ' ? 'logo-mark__space' : undefined}
          key={`${character}-${index}`}
        >
          {character === ' ' ? '\u00a0' : character}
        </span>
      ))}
    </span>
  </span>
);

export default Logo;
