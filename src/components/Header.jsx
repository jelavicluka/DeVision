import { useEffect, useRef, useState } from 'react';
import './Header.css';

const Header = ({ headerValue, kicker, description, headingId = 'section-title' }) => {
  const headerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={headerRef}
      className={`section-intro ${isVisible ? 'is-visible' : ''}`}
      aria-labelledby={headingId}
    >
      <div className="section-intro__title">
        <span className="section-intro__kicker">{kicker}</span>
        <h2 id={headingId}>{headerValue}</h2>
      </div>
      <p>{description}</p>
    </header>
  );
};

export default Header;
