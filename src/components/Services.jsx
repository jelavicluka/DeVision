import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Services.css';

const services = [
  {
    id: 'digital-marketing',
    category: 'Strategija & rast',
    title: 'Digitalni marketing',
    description: 'Ne krećemo od oglasa, nego od cilja. Analiziramo brend, publiku i tržište te gradimo marketinški sustav u kojem svaki kanal ima jasnu ulogu.',
    deliverables: ['Marketinška strategija', 'Društvene mreže', 'Plaćene kampanje', 'SEO i e-mail marketing'],
    outcome: 'Veća vidljivost, kvalitetniji upiti i komunikacija koja dugoročno gradi brend.',
    priority: 'primary'
  },
  {
    id: 'e-commerce',
    category: 'Online prodaja',
    title: 'E-commerce rješenja',
    description: 'Povezujemo strukturu trgovine, vizualni identitet i prodajnu strategiju u iskustvo koje korisnika prirodno vodi od prvog klika do završene kupnje.',
    deliverables: ['UX online trgovine', 'Dizajn i razvoj', 'Sustavi naplate', 'Optimizacija konverzija'],
    outcome: 'Brža kupnja, više povjerenja i trgovina spremna za rast poslovanja.',
    priority: 'secondary'
  },
  {
    id: 'web-development',
    category: 'Digitalno iskustvo',
    title: 'Razvoj web stranica',
    description: 'Od jasne informacijske arhitekture do posljednjeg detalja u izvedbi, stvaramo web stranice koje izgledaju odlično i ostaju jednostavne za korištenje i održavanje.',
    deliverables: ['Planiranje strukture', 'Frontend razvoj', 'CMS integracija', 'Brzina i SEO osnove'],
    outcome: 'Pouzdana digitalna baza koja profesionalno predstavlja vaše poslovanje.',
  },
  {
    id: 'ui-ux',
    category: 'Dizajn',
    title: 'UI/UX dizajn',
    description: 'Složene ideje pretvaramo u jasne korisničke putove. Svaku odluku provjeravamo kroz potrebe korisnika i ciljeve poslovanja, bez suvišnih elemenata.',
    deliverables: ['UX istraživanje', 'Wireframeovi', 'Interaktivni prototipi', 'Sustav dizajna'],
    outcome: 'Proizvod koji korisnici razumiju, pamte i žele ponovno koristiti.'
  },
  {
    id: 'mobile-apps',
    category: 'Digitalni proizvod',
    title: 'Mobilne aplikacije',
    description: 'Dizajniramo i razvijamo mobilna iskustva koja djeluju prirodno na svakom zaslonu, od prvog prototipa do stabilnog proizvoda spremnog za korisnike.',
    deliverables: ['Koncept proizvoda', 'iOS i Android razvoj', 'API integracije', 'Testiranje i objava'],
    outcome: 'Stabilna aplikacija s jasnom vrijednošću i prostorom za daljnji razvoj.'
  },
  {
    id: 'cloud',
    category: 'Infrastruktura',
    title: 'Cloud usluge',
    description: 'Postavljamo tehnološke temelje koji osiguravaju dostupnost, sigurnost i jednostavno skaliranje digitalnih proizvoda bez nepotrebne kompleksnosti.',
    deliverables: ['Cloud arhitektura', 'Implementacija i hosting', 'Sigurnosne kopije', 'Nadzor i održavanje'],
    outcome: 'Pouzdan sustav, manje tehničkih briga i spremnost za budući rast.'
  }
];

const Services = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || !('IntersectionObserver' in window)) {
      page?.querySelectorAll('.service-detail').forEach((section) => section.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    const sections = page.querySelectorAll('.service-detail');
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={pageRef} className="services-page">
      <section className="services-index" aria-labelledby="services-page-title">
        <header className="services-index__heading">
          <div>
            <span className="services-index__kicker">Što radimo</span>
            <h1 id="services-page-title">Usluge</h1>
          </div>
          <p>Odaberite područje koje želite unaprijediti. Svaku uslugu prilagođavamo vašem brendu, publici i poslovnom cilju.</p>
        </header>

        <nav className="services-index__list" aria-label="Pregled usluga">
          {services.map((service, index) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className={`service-index-item${service.priority ? ` service-index-item--${service.priority}` : ''}`}
              style={{ '--service-index': index }}
            >
              <span className="service-index-item__number">{String(index + 1).padStart(2, '0')}</span>
              <h2>{service.title}</h2>
              <span className="service-index-item__category">{service.category}</span>
              <span className="service-index-item__arrow" aria-hidden="true">↓</span>
            </a>
          ))}
        </nav>
      </section>

      <div className="services-details" aria-label="Detalji usluga">
        {services.map((service, index) => (
          <section key={service.id} id={service.id} className="service-detail" aria-labelledby={`${service.id}-title`}>
            <div className="service-detail__meta">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span>{service.category}</span>
            </div>

            <div className="service-detail__intro">
              <h2 id={`${service.id}-title`}>{service.title}</h2>
              <p>{service.description}</p>
            </div>

            <div className="service-detail__scope">
              <span className="service-detail__label">Što uključuje</span>
              <ol>
                {service.deliverables.map((deliverable, deliverableIndex) => (
                  <li key={deliverable}>
                    <span>{String(deliverableIndex + 1).padStart(2, '0')}</span>
                    {deliverable}
                  </li>
                ))}
              </ol>
            </div>

            <div className="service-detail__outcome">
              <span className="service-detail__label">Rezultat</span>
              <p>{service.outcome}</p>
            </div>
          </section>
        ))}
      </div>

      <section className="services-cta" aria-labelledby="services-cta-title">
        <span>Imate projekt na umu?</span>
        <h2 id="services-cta-title">Pretvorimo ideju u sljedeću dobru priču.</h2>
        <NavLink to="/contact">Započnimo razgovor <span aria-hidden="true">↗</span></NavLink>
      </section>
    </main>
  );
};

export default Services;
