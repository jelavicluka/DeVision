import { useRef, useEffect, useState } from 'react';
import './ImageTextBlock.css';

const ImageTextBlock = ({ 
  image,
  imageAlt,
  text,
  textClassName = '',
  imagePosition = 'right'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`image-text-block 
        ${imagePosition === 'left' ? 'reverse' : ''} 
        ${isVisible ? 'visible' : ''}`}
    >
      <div className="image-container">
        <img 
          src={image} 
          alt={imageAlt}
          className="block-image"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="text-container">
        <p className={`block-text ${textClassName}`.trim()}>
          {text}
        </p>
      </div>
    </div>
  );
};

export default ImageTextBlock;
