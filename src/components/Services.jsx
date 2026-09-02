import './Home.css';
import './Services.css';

import clientStrip from '../assets/home/client-strip.png';

const services = [
  'DRUŠTVENE MREŽE I SADRŽAJ',
  'DIGITALNI MARKETING I OGLAŠAVANJE',
  'BRENDING I STRATEGIJA',
  'DIZAJN I MEDIJSKO OGLAŠAVANJE',
  'WEB I SEO',
  'EVENTI I AKTIVACIJE',
];

const Services = () => (
  <main className="home-pdf services-pdf">
    <section className="home-slide home-services" aria-labelledby="services-page-title">
      <div className="home-services__copy">
        <h1 id="services-page-title">USLUGE</h1>
        <ul>
          {services.map((service) => <li key={service}>{service}</li>)}
        </ul>
        <h2>NAŠI KLIJENTI</h2>
      </div>
      <img className="home-services__clients" src={clientStrip} alt="Logotipi DeVision klijenata" />
    </section>
  </main>
);

export default Services;
