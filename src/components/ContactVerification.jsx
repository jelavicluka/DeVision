import { useEffect, useRef, useState } from 'react';

let scriptPromise;
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.onload = () => resolve(window.turnstile);
      script.onerror = () => {
        script.remove();
        scriptPromise = undefined;
        reject(new Error('verification unavailable'));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

export default function ContactVerification({ onVerify, resetKey }) {
  const container = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    let widget;
    const abort = new AbortController();
    onVerify('');
    async function setup() {
      try {
        const response = await fetch('/api/contact', { signal: abort.signal });
        if (!response.ok) throw new Error('configuration unavailable');
        const { siteKey } = await response.json();
        if (!siteKey) throw new Error('configuration missing');
        const turnstile = await loadTurnstile();
        if (cancelled) return;
        setError('');
        widget = turnstile.render(container.current, {
          sitekey: siteKey,
          action: 'contact',
          language: 'hr',
          theme: 'dark',
          size: 'flexible',
          callback: (token) => { setError(''); onVerify(token); },
          'expired-callback': () => onVerify(''),
          'error-callback': () => {
            onVerify('');
            setError('Provjera zaštite nije dostupna. Osvježite stranicu ili pišite na deni@devision.hr.');
          },
        });
      } catch {
        if (!cancelled) setError('Provjera zaštite nije dostupna. Osvježite stranicu ili pišite na deni@devision.hr.');
      }
    }
    setup();
    return () => {
      cancelled = true;
      abort.abort();
      if (widget !== undefined) window.turnstile?.remove(widget);
    };
  }, [onVerify, resetKey]);

  return (
    <div className="contact-form__verification">
      <div ref={container} />
      {error && <p className="form-field__error" role="status">{error}</p>}
    </div>
  );
}
