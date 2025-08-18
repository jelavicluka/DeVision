import React, { useState, useEffect } from 'react';
import './HeroSection.css'
import IPhoneMockup from './iPhoneMockup';
import IconsSocial from './IconsSocial';
import MobileSlideshow from './MobileSlideshow';
// Import your images
import exampleImage0 from '../assets/example-post.jpeg';
// Add more imports as needed

const HeroSection = ({ croatian }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 1000);
        };

        // Check on mount
        checkScreenSize();

        // Add event listener for window resize
        window.addEventListener('resize', checkScreenSize);

        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Images array using imported images
    const slideshowImages = [
        {
            src: exampleImage0,
            alt: 'Mobile screenshot 1'
        },
        {
            src: exampleImage0,
            alt: 'Mobile screenshot 2'
        },
        {
            src: exampleImage0,
            alt: 'Mobile screenshot 3'
        },
        // Add more images as needed
    ];

    return (
        <div className="hero-container">
            <div className="hero-content">
                <div className="hero-header">
                    {!isMobile &&  <h1>{croatian ? "Autentičan sadržaj koji privlači, angažira i prodaje." : "Authentic content that attracts, occupies and sells."}</h1> }
                    <div className="mobile-slideshow-header">
                        <MobileSlideshow images={slideshowImages} />
                    </div>
                    <div className='icons-social-hero'>
                        <IconsSocial color={"black"} size={"4x"} />
                    </div>
                </div>
                <div className="mockup-container">
                    {!isMobile && <IPhoneMockup />}
                </div>
            </div>
        </div>
    )
}

export default HeroSection;