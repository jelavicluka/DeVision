import './ArrowUpRight.css';

const ArrowUpRight = ({ className = '' }) => (
  <span className={`arrow-up-right${className ? ` ${className}` : ''}`} aria-hidden="true">
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  </span>
);

export default ArrowUpRight;
