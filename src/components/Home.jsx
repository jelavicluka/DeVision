import './Home.css';
import Logo from './Logo';

import aboutJoker from '../assets/home/about-joker.jpeg';
import aboutFitness from '../assets/home/about-fitness.jpeg';
import aboutReplay from '../assets/home/about-replay.jpeg';
import aboutFashion from '../assets/home/about-fashion.jpeg';
import aboutBurger from '../assets/home/about-burger.jpeg';
import aboutShirt from '../assets/home/about-shirt.png';
import aboutCity from '../assets/home/about-city.jpeg';
import aboutPhone from '../assets/home/about-phone.jpeg';
import clientStrip from '../assets/home/client-strip.png';
import socialPasta from '../assets/home/social-pasta.jpeg';
import marketingJuly from '../assets/home/marketing-july.png';
import marketingAugust from '../assets/home/marketing-august.png';
import brandingChevap from '../assets/home/branding-chevap.png';
import advertisingCollage from '../assets/home/advertising-collage.png';
import webWorkspace from '../assets/home/web-workspace.jpeg';
import eventLaunch from '../assets/home/event-launch.jpeg';
import eventInterview from '../assets/home/event-interview.jpeg';
import eventActivation from '../assets/home/event-activation.jpeg';
import eventDevision from '../assets/home/event-devision.png';

const services = [
  'DRUŠTVENE MREŽE I SADRŽAJ',
  'DIGITALNI MARKETING I OGLAŠAVANJE',
  'BRENDING I STRATEGIJA',
  'DIZAJN I MEDIJSKO OGLAŠAVANJE',
  'WEB I SEO',
  'EVENTI I AKTIVACIJE',
];

const Home = () => (
  <main className="home-pdf">
    <section className="home-slide home-hero" aria-labelledby="home-hero-title">
      <Logo className="home-hero__logo" />
      <div className="home-hero__copy">
        <h1 id="home-hero-title">
          <span>WE MAKE BRANDS</span>
          <strong>IMPOSSIBLE TO IGNORE</strong>
        </h1>
        <p>Strategija, sadržaj i oglašavanje koje donosi rezultate.</p>
      </div>
    </section>

    <section id="o-nama" className="home-slide home-about" aria-labelledby="home-about-title">
      <div className="home-about__copy">
        <h2 id="home-about-title">
          DeVision je marketinška agencija koja spaja strategiju, kreativnost i izvedbu.
        </h2>
        <p>
          Od društvenih mreža i sadržaja do digitalnog oglašavanja, weba, dizajna i evenata –stvaramo cjelovitu
          komunikaciju koja gradi prepoznatljive i snažne brendove.
        </p>
      </div>

      <div className="home-about__collage" aria-label="Izbor DeVision projekata">
        <div className="home-about__column home-about__column--one">
          <img src={aboutFashion} alt="Modna kampanja" />
          <img src={aboutPhone} alt="Kampanja za restoran" />
          <img src={aboutCity} alt="Kampanja u Splitu" />
        </div>
        <div className="home-about__column home-about__column--two">
          <img src={aboutJoker} alt="Joker Mall kampanja" />
          <img src={aboutFitness} alt="Produkcija sadržaja u fitness centru" />
          <img src={aboutBurger} alt="Kampanja za restoran" />
        </div>
        <div className="home-about__column home-about__column--three">
          <img src={aboutReplay} alt="Replay kampanja" />
          <img src={aboutShirt} alt="Modni sadržaj" />
        </div>
      </div>
    </section>

    <section id="usluge" className="home-slide home-services" aria-labelledby="home-services-title">
      <div className="home-services__copy">
        <h2 id="home-services-title">USLUGE</h2>
        <ul>
          {services.map((service) => <li key={service}>{service}</li>)}
        </ul>
        <h3>NAŠI KLIJENTI</h3>
      </div>
      <img className="home-services__clients" src={clientStrip} alt="Logotipi DeVision klijenata" />
    </section>

    <section id="drustvene-mreze" className="home-slide home-social" aria-labelledby="home-social-title">
      <div className="home-social__copy">
        <h2 id="home-social-title">DRUŠTVENE<br />MREŽE I SADRŽAJ</h2>
        <p>
          Kreiramo sadržaj i komunikaciju koja gradi prepoznatljivost brenda i povezuje ga s pravom publikom kroz
          strateško vođenje društvenih mreža, content planiranje, foto i video produkciju, Reels i TikTok sadržaj,
          copywriting, community management i influencer suradnje.
        </p>
      </div>
      <img className="home-social__image" src={socialPasta} alt="Kreativni sadržaj za restoran Level" />
    </section>

    <section id="digitalni-marketing" className="home-slide home-marketing" aria-labelledby="home-marketing-title">
      <h2 id="home-marketing-title">DIGITALNI<br />MARKETING I<br />OGLAŠAVANJE</h2>
      <p>
        Planiramo i vodimo digitalne kampanje prilagođene ciljevima, publici i budžetu svakog brenda kroz Meta i
        Google oglašavanje, newsletter i email marketing, kontinuiranu optimizaciju kampanja te analizu i
        izvještavanje rezultata.
      </p>
      <div className="home-marketing__screens" aria-label="Primjeri rezultata digitalnih kampanja">
        <img src={marketingJuly} alt="9.216 interakcija u srpnju" />
        <img src={marketingAugust} alt="11.150 interakcija u kolovozu" />
      </div>
    </section>

    <section id="brending" className="home-slide home-branding" aria-labelledby="home-branding-title">
      <h2 id="home-branding-title">BRENDING I<br />STRATEGIJA</h2>
      <p>
        Gradimo prepoznatljiv i dosljedan identitet brenda kroz razvoj strategije, pozicioniranje, vizualni identitet,
        logo i brand elemente, definiranje tone of voicea te osmišljavanje komunikacijskog koncepta.
      </p>
      <img src={brandingChevap} alt="Vizualni identitet brenda Chevap" />
    </section>

    <section id="medijsko-oglasavanje" className="home-slide home-advertising" aria-labelledby="home-advertising-title">
      <div className="home-advertising__copy">
        <h2 id="home-advertising-title">DIZAJN I<br />MEDIJSKO<br />OGLAŠAVANJE</h2>
        <p>
          Oblikujemo vizualnu komunikaciju brenda te planiramo i pronalazimo najbolje oglasne pozicije kroz izradu
          grafičkih i kampanjskih materijala, planiranje i zakup oglasnog prostora, billboard i citylight oglašavanje,
          digitalne ekrane, indoor i outdoor kampanje te promotivne materijale.
        </p>
      </div>
      <img className="home-advertising__image" src={advertisingCollage} alt="Outdoor kampanje za HEVA i Joker" />
    </section>

    <section id="web-seo" className="home-slide home-web" aria-labelledby="home-web-title">
      <h2 id="home-web-title">WEB I SEO</h2>
      <p>
        Kreiramo moderne, funkcionalne i vizualno usklađene web stranice i webshopove te povećavamo njihovu online
        vidljivost kroz landing stranice, UX/UI dizajn, SEO optimizaciju i uređivanje Google Business profila.
      </p>
      <img src={webWorkspace} alt="Razvoj moderne web stranice" />
    </section>

    <section id="eventi" className="home-slide home-events" aria-labelledby="home-events-title">
      <div className="home-events__gallery" aria-label="DeVision eventi i aktivacije">
        <img src={eventDevision} alt="DeVision događaj" />
        <img src={eventLaunch} alt="Otvorenje fitness centra" />
        <img src={eventInterview} alt="Medijska aktivacija" />
        <img src={eventActivation} alt="Brand aktivacija" />
      </div>
      <div className="home-events__copy">
        <h2 id="home-events-title">EVENTI I<br />AKTIVACIJE</h2>
        <p>
          Osmišljavamo i realiziramo događaje koji povezuju brend s publikom kroz organizaciju evenata, otvorenja i
          promocija, launch događaje, brand aktivacije, influencer suradnje i nagradne igre.
        </p>
      </div>
    </section>

    <section className="home-slide home-closing" aria-label="DeVision Marketing Agency">
      <Logo className="home-closing__logo" />
    </section>
  </main>
);

export default Home;
