import './Projects.css';
import bodyClinique from '../assets/project-logos/body-clinique-dark.png';
import cakeSymphony from '../assets/project-logos/cake-symphony-dark.png';
import chevapHouse from '../assets/project-logos/chevap-house-dark.png';
import heva from '../assets/project-logos/heva-dark.png';
import joker from '../assets/project-logos/joker-dark.png';
import level from '../assets/project-logos/level-dark.png';
import sora from '../assets/project-logos/sora-dark.png';

const clients = [
  { id: 'joker-fitness', title: 'Joker Fitness', logo: joker },
  { id: 'chevap-house', title: 'Chevap House', logo: chevapHouse },
  { id: 'heva', title: 'HEVA', logo: heva },
  { id: 'sora', title: 'Sora Sushi & Cocktail Bar', logo: sora },
  { id: 'the-body-clinique', title: 'The Body Clinique', logo: bodyClinique },
  { id: 'cake-symphony', title: 'Cake Symphony', logo: cakeSymphony },
  { id: 'level', title: 'Level', logo: level },
];

const rows = [
  clients,
  [...clients.slice(3), ...clients.slice(0, 3)],
  [...clients].reverse(),
];

const ClientGroup = ({ clientsInRow, duplicate = false }) => (
  <div className="clients-marquee__group" aria-hidden={duplicate || undefined}>
    {clientsInRow.map((client) => (
      <figure className="clients-marquee__item" key={`${client.id}-${duplicate ? 'copy' : 'original'}`}>
        <img src={client.logo} alt={duplicate ? '' : client.title} loading="eager" decoding="async" />
      </figure>
    ))}
  </div>
);

const Projects = () => (
  <section className="home-slide home-clients" aria-labelledby="clients-title">
    <header className="home-clients__heading">
      <span>Brendovi koji nam vjeruju</span>
      <h2 id="clients-title">NAŠI KLIJENTI</h2>
    </header>

    <div className="clients-marquees">
      {rows.map((row, index) => (
        <div
          className={`clients-marquee clients-marquee--${index + 1}`}
          key={`clients-row-${index + 1}`}
          aria-label={index === 0 ? clients.map((client) => client.title).join(', ') : undefined}
          aria-hidden={index > 0 || undefined}
        >
          <div className="clients-marquee__track">
            <ClientGroup clientsInRow={row} />
            <ClientGroup clientsInRow={row} duplicate />
          </div>
        </div>
      ))}
    </div>

  </section>
);

export default Projects;
