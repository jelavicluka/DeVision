import { useEffect, useRef } from 'react';
import './Projects.css';
import chevapImage from '../assets/chevap.jpg';
import levelImage from '../assets/level.jpg';
import bloomImage from '../assets/weddings.jpg';
import bestImage from '../assets/best.jpg';

const projects = [
  {
    id: 'chevap-house',
    image: chevapImage,
    title: 'Chevap House',
    services: ['Društvene mreže', 'Kreiranje sadržaja'],
    description: 'Svijet ćevapa u kojem se susreću tradicija, kvaliteta i strast prema savršenom okusu.'
  },
  {
    id: 'level-restaurant',
    image: levelImage,
    title: 'Level Restaurant',
    services: ['Brendiranje', 'Digitalni marketing'],
    description: 'Digitalni identitet restorana koji iskustvo predstavljanja podiže na novu razinu.'
  },
  {
    id: 'grupa-best',
    image: bestImage,
    title: 'Grupa Best',
    services: ['Kampanje', 'Produkcija'],
    description: 'Sadržaj koji prenosi atmosferu i pozicionira Grupu Best kao prvi izbor za svaku proslavu.'
  },
  {
    id: 'bloom-weddings',
    image: bloomImage,
    title: 'Bloom Weddings',
    services: ['Strategija', 'Društvene mreže'],
    description: 'Naš pilot projekt i suradnja kojom je započela priča DeVisiona.'
  }
];

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="projects-showcase" aria-labelledby="projects-title">
      <header className="projects-heading">
        <div>
          <span className="projects-heading__kicker">Naši klijenti</span>
          <h2 id="projects-title">Projekti</h2>
        </div>
        <p>Od strategije do izvedbe — odabrane suradnje u kojima smo brendovima pomogli da budu jasniji, vidljiviji i prepoznatljiviji.</p>
      </header>

      <div className="projects-showcase__grid">
        {projects.map((project, index) => (
          <article key={project.id} className="client-project-card" style={{ '--project-index': index }}>
            <div className="client-project-card__meta">
              <span>Klijent</span>
              <span>{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
            </div>

            <figure className="client-project-card__visual">
              <img src={project.image} alt={`${project.title} — prikaz projekta`} loading="lazy" decoding="async" />
            </figure>

            <div className="client-project-card__content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul className="client-project-card__services" aria-label={`Usluge za ${project.title}`}>
                {project.services.map((service) => <li key={service}>{service}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
