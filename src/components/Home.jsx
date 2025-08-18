import React, { useState, useEffect } from 'react';
import './Home.css';
import HeroSection from '../components/HeroSection';
import Header from '../components/Header';
import ImageTextBlock from './ImageTextBlock';
import Projects from './Projects';
import ServiceCards from './ServiceCards';

//Images
import exampleImage from '../assets/example-image.jpeg';
import exampleImage2 from '../assets/example-post.jpeg';

const Home = ({ croatian }) => {
    const [divClass, setDivClass] = useState('home-container');

    useEffect(() => {
        const handleScroll = () => {
            const imageTextBlocks = document.querySelectorAll('.image-text-block, .projects-container, .service-cards-container');

            let isAnyBlockVisible = false;

            imageTextBlocks.forEach((block) => {
                const rect = block.getBoundingClientRect();

                const isVisible =
                    rect.top < window.innerHeight * 0.5 &&
                    rect.bottom > window.innerHeight * 0.1;

                if (isVisible) {
                    isAnyBlockVisible = true;
                }
            });

            if (isAnyBlockVisible) {
                setDivClass('home-container-pink');
            } else {
                setDivClass('home-container');
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <div
            className={divClass}
        >
            <HeroSection croatian={croatian} />
            <Header headerValue={croatian ? "Čime se bavimo" : "What we do"} />
            <ImageTextBlock
                image={exampleImage}
                text={croatian ?
                    "Deni je oduvijek imala taj splitski dišpet i energiju koju je bilo nemoguće ignorirati. S 25 godina, već je izgradila ime u svijetu marketinga, vođenja društvenih mreža i modelinga."
                    :
                    "Deni always had that additute from Split and energy that was impossible to ignore. With 25 years of age, she already made a name for herselft in the world of marketing, social networks leading and modelling."}
                imagePosition="right"
                servicesButton={ false }
                croatian={ croatian }
            />
            <ImageTextBlock
                image={exampleImage2}
                text={croatian ?
                    "Plava kosa, svijetle oči i zarazan osmijeh samo su dio njezinog šarma. No, ono što je činilo razliku, dok su se drugi bojali rizika, ona je hrabro koračala naprijed."
                    :
                    "Blonde hair, bright eyes and a beautiful smile are just a small part of her. The thing that made the difference was that she was never afraid to walk straight."}
                imagePosition="left"
                servicesButton={ true }
                croatian={ croatian }
            />
            <Header headerValue={croatian ? "Usluge" : "Services"} />
            <ServiceCards />
            <Header headerValue={croatian ? "Projekti" : "Projects"} />
            <Projects className={divClass} croatian={ croatian } />
        </div>
    );
}

export default Home;