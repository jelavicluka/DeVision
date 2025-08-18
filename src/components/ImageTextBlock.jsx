import React, { useRef, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import './ImageTextBlock.css';

const ImageTextBlock = ({ 
  image, 
  text, 
  imagePosition = 'right',
  servicesButton,
  croatian
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`image-text-block 
        ${imagePosition === 'left' ? 'reverse' : ''} 
        ${isVisible ? 'visible' : ''}`}
    >
      <div className={`image-container 
        ${isVisible ? (imagePosition === 'right' ? 'slide-left-to-right' : 'slide-right-to-left') : ''}`}>
        <img 
          src={image} 
          alt="Block description" 
          className="block-image"
        />
      </div>
      <div className={`text-container 
        ${isVisible ? (imagePosition === 'right' ? 'slide-right-to-left' : 'slide-left-to-right') : ''}`}>
        <p className="block-text">
          {text}
        </p>
        {servicesButton && <NavLink to="/services" className={({ isActive }) => (isActive ? "active" : '')}><button className='services-button'>{ croatian ? "Naše usluge" : "Our services" }</button></NavLink>}
      </div>
    </div>
  );
};

export default ImageTextBlock;