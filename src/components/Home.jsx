import './Home.css';
import HeroSection from '../components/HeroSection';
import Header from '../components/Header';
import ImageTextBlock from './ImageTextBlock';
import Projects from './Projects';
import ServiceCards from './ServiceCards';

//Images
import exampleImage from '../assets/example-image.jpeg';
import exampleImage2 from '../assets/example-post.jpeg';

const Home = () => {
    return (
        <main className="home-container">
            <HeroSection />
            <Header
                headerValue="Čime se bavimo"
                kicker="O DeVisionu"
                description="Kreativnost povezujemo sa strategijom kako bismo brendovima izgradili prepoznatljiv nastup i sadržaj koji ostvaruje rezultate."
                headingId="about-title"
            />
            <ImageTextBlock
                image={exampleImage}
                imageAlt="DeVision creator portrait"
                text="Deni je oduvijek imala taj splitski dišpet i energiju koju je bilo nemoguće ignorirati. S 25 godina, već je izgradila ime u svijetu marketinga, vođenja društvenih mreža i modelinga."
                imagePosition="right"
            />
            <ImageTextBlock
                image={exampleImage2}
                imageAlt="DeVision social media campaign"
                text="Plava kosa, svijetle oči i zarazan osmijeh samo su dio njezinog šarma. No, ono što je činilo razliku, dok su se drugi bojali rizika, ona je hrabro koračala naprijed."
                imagePosition="left"
            />
            <ServiceCards />
            <Projects />
        </main>
    );
}

export default Home;
