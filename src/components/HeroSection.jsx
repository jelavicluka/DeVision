import { useEffect, useState } from 'react';
import './HeroSection.css';
import IPhoneMockup from './iPhoneMockup';
import IconsSocial from './IconsSocial';
import MobileSlideshow from './MobileSlideshow';
import exampleImage0 from '../assets/example-post.jpeg';

const slideshowImages = [
    { src: exampleImage0, alt: 'DeVision social media post' },
    { src: exampleImage0, alt: 'DeVision campaign preview' },
    { src: exampleImage0, alt: 'DeVision mobile content' },
];

const HeroSection = () => {
    const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 1001px)').matches);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1001px)');
        const handleChange = (event) => setIsDesktop(event.matches);

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <div className="hero-container">
            <div className="hero-content">
                <div className="hero-header">
                    {isDesktop && <h1>Autentičan sadržaj koji privlači, angažira i prodaje.</h1>}
                    <div className="mobile-slideshow-header">
                        <MobileSlideshow images={slideshowImages} />
                    </div>
                    <div className='icons-social-hero'>
                        <IconsSocial size="4x" />
                    </div>
                </div>
                <div className="mockup-container">
                    {isDesktop && <IPhoneMockup />}
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
