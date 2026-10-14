import { useRef, useState } from 'react';
import ContactVerification from './ContactVerification';
import { Link } from 'react-router-dom';
import './Contact.css';

const initialValues = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
  consent: false,
  website: ''
};

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/' },
  { name: 'TikTok', href: 'https://www.tiktok.com/' },
  { name: 'Facebook', href: 'https://www.facebook.com/' }
];

const validateField = (name, value) => {
  const trimmedValue = typeof value === 'string' ? value.trim() : value;

  if (name === 'name' && trimmedValue.length < 2) return 'Upišite ime i prezime.';
  if (name === 'name' && trimmedValue.length > 120) return 'Ime može sadržavati najviše 120 znakova.';
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) return 'Upišite ispravnu e-mail adresu.';
  if (name === 'email' && trimmedValue.length > 254) return 'E-mail adresa je predugačka.';
  if (name === 'company' && trimmedValue.length > 160) return 'Naziv tvrtke može sadržavati najviše 160 znakova.';
  if (name === 'service' && !trimmedValue) return 'Odaberite uslugu koja vas zanima.';
  if (name === 'message' && trimmedValue.length < 10) return 'Poruka treba sadržavati najmanje 10 znakova.';
  if (name === 'message' && trimmedValue.length > 6000) return 'Poruka može sadržavati najviše 6000 znakova.';
  if (name === 'consent' && !value) return 'Potvrdite da ste upoznati s obavijesti o privatnosti.';

  return '';
};

const Contact = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [verificationReset, setVerificationReset] = useState(0);
  const sendingRef = useRef(false);
  const submissionId = useRef(null);

  const updateField = ({ target }) => {
    const { name, type, checked, value } = target;
    const nextValue = type === 'checkbox' ? checked : value;

    setValues((currentValues) => ({ ...currentValues, [name]: nextValue }));
    setStatus('');
    setStatusType('');
    submissionId.current = null;

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: validateField(name, nextValue)
      }));
    }
  };

  const validateOnBlur = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setErrors((currentErrors) => ({
      ...currentErrors,
      [target.name]: validateField(target.name, value)
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (sendingRef.current) return;

    const requiredFields = ['name', 'email', 'company', 'service', 'message', 'consent'];
    const nextErrors = Object.fromEntries(
      requiredFields
        .map((field) => [field, validateField(field, values[field])])
        .filter(([, error]) => error)
    );

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('Provjerite označena polja i pokušajte ponovno.');
      setStatusType('error');
      return;
    }

    if (!turnstileToken) {
      setStatus('Pričekajte provjeru zaštite od neželjenih poruka i pokušajte ponovno.');
      setStatusType('error');
      return;
    }

    sendingRef.current = true;
    setIsSending(true);
    setStatus('Šaljemo vaš upit…');
    setStatusType('');
    submissionId.current ||= crypto.randomUUID();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': submissionId.current },
        body: JSON.stringify({ ...values, turnstileToken }),
        signal: AbortSignal.timeout(30000),
      });
      const result = await response.json();
      if (!response.ok) {
        setErrors(result.errors || {});
        throw new Error(result.message || 'Slanje nije uspjelo. Pokušajte ponovno.');
      }
      if (!result.message) throw new Error('Slanje nije moguće potvrditi. Pokušajte ponovno.');
      setValues({ ...initialValues });
      submissionId.current = null;
      setStatus(result.message);
      setStatusType('success');
    } catch (error) {
      setStatus(error.name === 'TimeoutError' || error instanceof TypeError || error instanceof SyntaxError
        ? 'Slanje nije moguće potvrditi. Pokušajte ponovno ili pišite na deni@devision.hr.'
        : error.message);
      setStatusType('error');
    } finally {
      sendingRef.current = false;
      setIsSending(false);
      setTurnstileToken('');
      setVerificationReset((current) => current + 1);
    }
  };

  return (
    <main className="contact-page">
      <header className="contact-hero">
        <div>
          <span className="contact-hero__kicker">Kontakt</span>
          <h1>Razgovarajmo.</h1>
        </div>
        <p>Imate ideju, projekt ili pitanje? Opišite nam što vam treba, a zajedno ćemo pronaći najbolji sljedeći korak.</p>
      </header>

      <div className="contact-layout">
        <aside className="contact-details" aria-label="Kontakt podaci">
          <div className="contact-details__intro">
            <span>Javite nam se direktno</span>
            <p>Više volite e-mail ili poziv? Dostupni smo i izvan forme.</p>
          </div>

          <dl className="contact-details__list">
            <div>
              <dt>E-mail</dt>
              <dd><a href="mailto:deni@devision.hr">deni@devision.hr</a></dd>
            </div>
            <div>
              <dt>Telefon</dt>
              <dd><a href="tel:+385996047635">+385 99 604 7635</a></dd>
            </div>
          </dl>

          <nav className="contact-socials" aria-label="Društvene mreže">
            <span>Pratite nas</span>
            <ul>
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a href={social.href} target="_blank" rel="noreferrer">
                    {social.name} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <form className="contact-form" action="/api/contact" method="post" onSubmit={handleSubmit} noValidate aria-busy={isSending}>
          <div className="contact-form__heading">
            <span>Projektni upit</span>
            <p>Polja označena zvjezdicom su obavezna.</p>
          </div>
          <noscript>Za slanje obrasca uključite JavaScript ili nam pišite na <a href="mailto:deni@devision.hr">deni@devision.hr</a>.</noscript>

          <fieldset className="contact-form__fields" disabled={isSending}>
          <legend className="contact-form__visually-hidden">Podaci za projektni upit</legend>
          <div className="contact-form__honeypot" aria-hidden="true">
            <label htmlFor="contact-website">Web-stranica</label>
            <input id="contact-website" name="website" value={values.website} onChange={updateField} tabIndex={-1} autoComplete="off" />
          </div>
          <div className="contact-form__grid">
            <div className={`form-field ${errors.name ? 'has-error' : ''}`}>
              <label htmlFor="contact-name">Ime i prezime *</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                maxLength={120}
                value={values.name}
                onChange={updateField}
                onBlur={validateOnBlur}
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                placeholder="Vaše ime"
              />
              {errors.name && <span id="contact-name-error" className="form-field__error">{errors.name}</span>}
            </div>

            <div className={`form-field ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="contact-email">E-mail adresa *</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                maxLength={254}
                value={values.email}
                onChange={updateField}
                onBlur={validateOnBlur}
                autoComplete="email"
                inputMode="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                placeholder="ime@tvrtka.hr"
              />
              {errors.email && <span id="contact-email-error" className="form-field__error">{errors.email}</span>}
            </div>

            <div className={`form-field ${errors.company ? 'has-error' : ''}`}>
              <label htmlFor="contact-company">Tvrtka ili brend</label>
              <input
                id="contact-company"
                name="company"
                type="text"
                maxLength={160}
                value={values.company}
                onChange={updateField}
                autoComplete="organization"
                aria-invalid={Boolean(errors.company)}
                aria-describedby={errors.company ? 'contact-company-error' : undefined}
                placeholder="Naziv tvrtke"
              />
              {errors.company && <span id="contact-company-error" className="form-field__error">{errors.company}</span>}
            </div>

            <div className={`form-field ${errors.service ? 'has-error' : ''}`}>
              <label htmlFor="contact-service">Usluga *</label>
              <select
                id="contact-service"
                name="service"
                value={values.service}
                onChange={updateField}
                onBlur={validateOnBlur}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={errors.service ? 'contact-service-error' : undefined}
              >
                <option value="">Odaberite uslugu</option>
                <option value="social-content">Društvene mreže i sadržaj</option>
                <option value="digital-marketing">Digitalni marketing i oglašavanje</option>
                <option value="branding">Brending i strategija</option>
                <option value="media-design">Dizajn i medijsko oglašavanje</option>
                <option value="web-seo">Web i SEO</option>
                <option value="events">Eventi i aktivacije</option>
                <option value="other">Nešto drugo</option>
              </select>
              {errors.service && <span id="contact-service-error" className="form-field__error">{errors.service}</span>}
            </div>

            <div className={`form-field form-field--full ${errors.message ? 'has-error' : ''}`}>
              <label htmlFor="contact-message">Recite nam nešto o projektu *</label>
              <textarea
                id="contact-message"
                name="message"
                value={values.message}
                onChange={updateField}
                onBlur={validateOnBlur}
                rows="5"
                maxLength={6000}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                placeholder="Ciljevi, okvirni rok ili sve što smatrate važnim..."
              />
              {errors.message && <span id="contact-message-error" className="form-field__error">{errors.message}</span>}
            </div>
          </div>

          <div className={`form-consent ${errors.consent ? 'has-error' : ''}`}>
            <input
              id="contact-consent"
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={updateField}
              onBlur={validateOnBlur}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? 'contact-consent-error' : undefined}
            />
            <label htmlFor="contact-consent">Upoznat/a sam s <Link to="/privatnost" target="_blank" rel="noopener">Obavijesti o privatnosti (otvara se u novoj kartici)</Link> i obradom podataka radi odgovora na moj upit. *</label>
            {errors.consent && <span id="contact-consent-error" className="form-field__error">{errors.consent}</span>}
          </div>

          </fieldset>

          <ContactVerification onVerify={setTurnstileToken} resetKey={verificationReset} />

          <button type="submit" className="contact-form__submit" disabled={isSending}>
            {isSending ? 'Slanje…' : 'Pošalji upit'} <span aria-hidden="true">↗</span>
          </button>

          {status && (
            <p className={`contact-form__status${statusType ? ` is-${statusType}` : ''}`} role="status">
              {status}
            </p>
          )}
        </form>
      </div>
    </main>
  );
};

export default Contact;
