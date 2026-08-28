import { useEffect, useRef } from 'react';
import './Projects.css';
import bodyCliniqueDark from '../assets/project-logos/body-clinique-dark.png';
import bodyCliniqueLight from '../assets/project-logos/body-clinique-light.png';
import cakeSymphonyDark from '../assets/project-logos/cake-symphony-dark.png';
import cakeSymphonyLight from '../assets/project-logos/cake-symphony-light.png';
import chevapHouseDark from '../assets/project-logos/chevap-house-dark.png';
import chevapHouseLight from '../assets/project-logos/chevap-house-light.png';
import hevaDark from '../assets/project-logos/heva-dark.png';
import hevaLight from '../assets/project-logos/heva-light.png';
import jokerDark from '../assets/project-logos/joker-dark.png';
import jokerLight from '../assets/project-logos/joker-light.png';
import levelDark from '../assets/project-logos/level-dark.png';
import levelLight from '../assets/project-logos/level-light.png';
import soraDark from '../assets/project-logos/sora-dark.png';
import soraLight from '../assets/project-logos/sora-light.png';

const projects = [
  { id: 'cake-symphony', title: 'Cake Symphony', light: cakeSymphonyLight, dark: cakeSymphonyDark },
  { id: 'chevap-house', title: 'Chevap House', light: chevapHouseLight, dark: chevapHouseDark },
  { id: 'heva', title: 'HEVA', light: hevaLight, dark: hevaDark },
  { id: 'joker-fitness', title: 'Joker Fitness', light: jokerLight, dark: jokerDark },
  { id: 'level', title: 'Level', light: levelLight, dark: levelDark },
  { id: 'the-body-clinique', title: 'The Body Clinique', light: bodyCliniqueLight, dark: bodyCliniqueDark },
  { id: 'sora', title: 'Sora Sushi & Cocktail Bar', light: soraLight, dark: soraDark }
];

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) {
      section?.classList.add('is-visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="projects-showcase" aria-labelledby="projects-title">
      <header className="projects-heading">
        <span className="projects-heading__kicker">Naši klijenti</span>
        <h2 id="projects-title">Projekti</h2>
      </header>

      <p className="projects-visually-hidden">
        Naši klijenti: {projects.map((project) => project.title).join(', ')}.
      </p>

      <div className="projects-marquee" aria-hidden="true">
        <div className="projects-marquee__track">
          {[...projects, ...projects].map((project, index) => (
            <figure className="projects-marquee__item" key={`${project.id}-${index}`}>
              <picture>
                <source media="(prefers-color-scheme: dark)" srcSet={project.dark} />
                <img
                  src={project.light}
                  alt=""
                  loading={index < projects.length ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </picture>
            </figure>
          ))}
        </div>
      </div>

      <p className="projects-caption">
        Brendovi s kojima gradimo jasne, prepoznatljive i dugotrajne priče.
      </p>
    </section>
  );
};

export default Projects;
