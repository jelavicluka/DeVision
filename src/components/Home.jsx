import { useEffect, useRef, useState } from 'react';
import './Home.css';
import Logo from './Logo';
import Projects from './Projects';

import aboutVideo from '../../Business Marketing Video.mp4';
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

const Home = () => {
  const pageRef = useRef(null);
  const [isAboutVideoReady, setIsAboutVideoReady] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const slides = [...page.querySelectorAll('.home-slide')];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    page.classList.add('home-effects-ready');

    if (reduceMotion || !('IntersectionObserver' in window)) {
      slides.forEach((slide) => slide.classList.add('is-in-view'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  return (
  <main ref={pageRef} className="home-pdf">
    <section className="home-slide home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero__copy">
        <h1 id="home-hero-title">
          <span>WE MAKE BRANDS</span>
          <strong>IMPOSSIBLE TO IGNORE</strong>
        </h1>
        <p>Strategija, sadržaj i oglašavanje koje donosi rezultate.</p>
      </div>
    </section>

    <section
      id="o-nama"
      className={`home-slide home-about${isAboutVideoReady ? ' is-video-ready' : ''}`}
      aria-labelledby="home-about-title"
    >
      <video
        className="home-about__video"
        src={aboutVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        onCanPlay={() => setIsAboutVideoReady(true)}
        onPlaying={() => setIsAboutVideoReady(true)}
        onError={() => setIsAboutVideoReady(true)}
        aria-hidden="true"
      />
      <div
        className="home-about__loader"
        role="status"
        aria-live="polite"
        aria-hidden={isAboutVideoReady}
      >
        <span className="home-about__spinner" aria-hidden="true" />
        <span>Učitavanje videa</span>
      </div>
      <div className="home-about__copy">
        <h2 id="home-about-title">
          DeVision je marketinška agencija koja spaja strategiju, kreativnost i izvedbu.
        </h2>
        <p>
          Od društvenih mreža i sadržaja do digitalnog oglašavanja, weba, dizajna i evenata – stvaramo cjelovitu
          komunikaciju koja gradi prepoznatljive i snažne brendove.
        </p>
      </div>
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
        <div className="home-marketing__screen">
          <img src={marketingJuly} alt="9.216 interakcija u srpnju" />
        </div>
        <div className="home-marketing__screen">
          <img src={marketingAugust} alt="11.150 interakcija u kolovozu" />
        </div>
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
        <div className="home-events__image home-events__image--devision">
          <img src={eventDevision} alt="DeVision događaj" />
        </div>
        <div className="home-events__image home-events__image--launch">
          <img src={eventLaunch} alt="Otvorenje fitness centra" />
        </div>
        <div className="home-events__image home-events__image--interview">
          <img src={eventInterview} alt="Medijska aktivacija" />
        </div>
        <div className="home-events__image home-events__image--activation">
          <img src={eventActivation} alt="Brand aktivacija" />
        </div>
      </div>
      <div className="home-events__copy">
        <h2 id="home-events-title">EVENTI I<br />AKTIVACIJE</h2>
        <p>
          Osmišljavamo i realiziramo događaje koji povezuju brend s publikom kroz organizaciju evenata, otvorenja i
          promocija, launch događaje, brand aktivacije, influencer suradnje i nagradne igre.
        </p>
      </div>
    </section>

    <Projects />

    <section className="home-slide home-closing" aria-label="DeVision Marketing Agency">
      <Logo className="home-closing__logo" />
    </section>
  </main>
  );
};

export default Home;
