import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  const heading = useRef(null);

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);

  return (
    <main className="not-found" aria-labelledby="not-found-title">
      <div className="not-found__label">
        <span className="not-found__signal" aria-hidden="true" />
        404 / Stranica nije pronađena
      </div>
      <div className="not-found__layout">
        <div className="not-found__art" aria-hidden="true">
          <span>4</span>
          <span className="not-found__zero"><span>↗</span></span>
          <span>4</span>
          <span className="not-found__sticker">Izvan kadra.</span>
        </div>
        <div className="not-found__copy">
          <h1 ref={heading} tabIndex={-1} id="not-found-title">Dobra ideja.<br /><span>Kriva adresa.</span></h1>
          <p>Ova je stranica možda premještena ili poveznica nije ispravna. Vratimo vas na pravo mjesto.</p>
          <div className="not-found__actions">
            <Link to="/" className="not-found__home">Na početnu <span aria-hidden="true">↗</span></Link>
            <Link to="/contact" className="not-found__contact">Javite nam se <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </div>
      <div className="not-found__footnote"><span>Izgubljena stranica.</span><span>Pronađimo novi smjer. ↗</span></div>
    </main>
  );
}
