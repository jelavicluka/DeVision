import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './ServiceCards.css';

const services = [
  {
    id: 'digital-marketing',
    category: 'Primarna usluga',
    title: 'Digitalni marketing',
    description: 'Strategija, sadržaj i kampanje koje vaš brend dovode pred prave ljude i pretvaraju pažnju u mjerljive rezultate.',
    priority: 'primary'
  },
  {
    id: 'e-commerce',
    category: 'Prodaja',
    title: 'E-commerce rješenja',
    description: 'Online trgovine osmišljene za jednostavnu kupnju, snažno povjerenje i veći broj konverzija.',
    priority: 'secondary'
  },
  {
    id: 'web-development',
    category: 'Digitalno iskustvo',
    title: 'Razvoj web stranica',
    description: 'Moderne, brze i responzivne web stranice koje izgledaju odlično i rade besprijekorno.'
  },
  {
    id: 'ui-ux',
    category: 'Dizajn',
    title: 'UI/UX dizajn',
    description: 'Intuitivna sučelja koja spajaju snažan vizualni identitet s jednostavnim korištenjem.'
  },
  {
    id: 'mobile-apps',
    category: 'Proizvod',
    title: 'Mobilne aplikacije',
    description: 'Promišljene iOS i Android aplikacije koje korisnici rado otvaraju svaki dan.'
  },
  {
    id: 'cloud',
    category: 'Infrastruktura',
    title: 'Cloud usluge',
    description: 'Pouzdana infrastruktura koja raste zajedno s vašim proizvodom i poslovanjem.'
  }
];

const ServiceCards = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`services-showcase ${isVisible ? 'is-visible' : ''}`}
      aria-labelledby="services-title"
    >
      <header className="showcase-heading">
        <div>
          <span className="showcase-kicker">Što radimo</span>
          <h2 id="services-title">Usluge</h2>
        </div>
        <p>Marketing je u središtu našeg rada — uz strategiju, sadržaj i digitalna rješenja koja pretvaraju interes u rast.</p>
      </header>

      <div className="services-showcase__grid">
        {services.map((service, index) => (
          <NavLink
            key={service.id}
            to="/services"
            className={`editorial-service-card${service.priority ? ` editorial-service-card--${service.priority}` : ''}`}
            style={{ '--item-index': index }}
          >
            <div className="editorial-service-card__top">
              <span className="editorial-service-card__number">{String(index + 1).padStart(2, '0')}</span>
              <span className="editorial-service-card__category">{service.category}</span>
            </div>
            <div className="editorial-service-card__body">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
            <span className="editorial-service-card__link">
              Otkrij više <span aria-hidden="true">↗</span>
            </span>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default ServiceCards;
