import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Services.css';

const services = [
  {
    id: 'drustvene-mreze',
    category: 'Sadržaj & zajednica',
    title: 'Društvene mreže i sadržaj',
    description: 'Kreiramo sadržaj i komunikaciju koja gradi prepoznatljivost brenda i povezuje ga s pravom publikom.',
    deliverables: ['Strateško vođenje društvenih mreža', 'Content planiranje', 'Foto i video produkcija', 'Reels i TikTok sadržaj', 'Copywriting i community management', 'Influencer suradnje'],
    outcome: 'Dosljedna digitalna prisutnost, relevantan sadržaj i zajednica koja prepoznaje vrijednost brenda.'
  },
  {
    id: 'digitalni-marketing',
    category: 'Kampanje & rast',
    title: 'Digitalni marketing i oglašavanje',
    description: 'Planiramo i vodimo digitalne kampanje prilagođene ciljevima, publici i budžetu svakog brenda.',
    deliverables: ['Meta oglašavanje', 'Google oglašavanje', 'Newsletter i email marketing', 'Kontinuirana optimizacija kampanja', 'Analiza i izvještavanje rezultata'],
    outcome: 'Kampanje koje se kontinuirano optimiziraju i pretvaraju ulaganje u mjerljive poslovne rezultate.'
  },
  {
    id: 'brending',
    category: 'Identitet & smjer',
    title: 'Brending i strategija',
    description: 'Gradimo prepoznatljiv i dosljedan identitet brenda koji jasno komunicira njegovu vrijednost i poziciju.',
    deliverables: ['Razvoj strategije', 'Pozicioniranje brenda', 'Vizualni identitet', 'Logo i brand elementi', 'Definiranje tone of voicea', 'Komunikacijski koncept'],
    outcome: 'Jasan identitet i strateški smjer koji čine brend prepoznatljivim na svakoj dodirnoj točki.'
  },
  {
    id: 'medijsko-oglasavanje',
    category: 'Vizualna komunikacija',
    title: 'Dizajn i medijsko oglašavanje',
    description: 'Oblikujemo vizualnu komunikaciju brenda te planiramo i pronalazimo najbolje oglasne pozicije.',
    deliverables: ['Grafički i kampanjski materijali', 'Planiranje i zakup oglasnog prostora', 'Billboard i citylight oglašavanje', 'Digitalni ekrani', 'Indoor i outdoor kampanje', 'Promotivni materijali'],
    outcome: 'Snažna i dosljedna vizualna prisutnost ondje gdje je publika doista može primijetiti.'
  },
  {
    id: 'web-seo',
    category: 'Digitalno iskustvo',
    title: 'Web i SEO',
    description: 'Kreiramo moderne, funkcionalne i vizualno usklađene web stranice i webshopove te povećavamo njihovu online vidljivost.',
    deliverables: ['Web stranice i webshopovi', 'Landing stranice', 'UX/UI dizajn', 'SEO optimizacija', 'Google Business profil'],
    outcome: 'Brza i intuitivna digitalna platforma koja predstavlja brend, privlači publiku i podržava rast.'
  },
  {
    id: 'eventi',
    category: 'Iskustva uživo',
    title: 'Eventi i aktivacije',
    description: 'Osmišljavamo i realiziramo događaje koji povezuju brend s publikom i ostavljaju dojam.',
    deliverables: ['Organizacija evenata', 'Otvorenja i promocije', 'Launch događaji', 'Brand aktivacije', 'Influencer suradnje', 'Nagradne igre'],
    outcome: 'Pamtljivo iskustvo koje stvara izravnu vezu između brenda, publike i trenutka.'
  }
];

const Services = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const sections = [...page.querySelectorAll('.service-detail')];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'));
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
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={pageRef} className="services-page">
      <section className="services-index" aria-labelledby="services-page-title">
        <header className="services-index__heading">
          <div>
            <span>Što radimo</span>
            <h1 id="services-page-title">USLUGE</h1>
          </div>
          <p>Strategiju, sadržaj, dizajn i izvedbu povezujemo u komunikaciju koju je nemoguće ignorirati.</p>
        </header>

        <nav className="services-index__list" aria-label="Pregled usluga">
          {services.map((service, index) => (
            <a href={`#${service.id}`} className="service-index-item" key={service.id} style={{ '--service-index': index }}>
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
          <section
            className={`service-detail${['digitalni-marketing', 'medijsko-oglasavanje'].includes(service.id) ? ' service-detail--long-title' : ''}`}
            id={service.id}
            key={service.id}
            aria-labelledby={`${service.id}-title`}
          >
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
        <h2 id="services-cta-title">PRETVORIMO IDEJU U SLJEDEĆU DOBRU PRIČU.</h2>
        <NavLink to="/contact">Započnimo razgovor <span aria-hidden="true">↗</span></NavLink>
      </section>
    </main>
  );
};

export default Services;
