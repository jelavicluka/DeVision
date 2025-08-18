import React, { useState, useRef, useEffect } from 'react';
import './MobileSlideshow.css';

const MobileSlideshow = ({ images = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const slideRef = useRef(null);

    // Handle touch start
    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setIsDragging(true);
    };

    // Handle touch move
    const handleTouchMove = (e) => {
        if (!isDragging || !startX) return;
        
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        
        // Add some resistance while dragging
        if (slideRef.current) {
            slideRef.current.style.transform = `translateX(calc(-${currentIndex * 100}% - ${diff}px))`;
        }
    };

    // Handle touch end
    const handleTouchEnd = (e) => {
        if (!isDragging || !startX) return;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const threshold = 50; // minimum swipe distance
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentIndex < images.length - 1) {
                // Swipe left - next image
                setCurrentIndex(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right - previous image
                setCurrentIndex(currentIndex - 1);
            }
        }
        
        // Reset transform
        if (slideRef.current) {
            slideRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        setStartX(null);
        setIsDragging(false);
    };



    // Reset transform when currentIndex changes
    useEffect(() => {
        if (slideRef.current) {
            slideRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }, [currentIndex]);

    if (!images || images.length === 0) {
        return <div className="slideshow-placeholder">No images to display</div>;
    }

    return (
        <div className="mobile-slideshow">
            <div className="slideshow-container">
                <div 
                    className="slideshow-wrapper"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div 
                        className="slideshow-track"
                        ref={slideRef}
                    >
                        {images.map((image, index) => (
                            <div key={index} className="slideshow-slide">
                                <img 
                                    src={image.src || image} 
                                    alt={image.alt || `Slide ${index + 1}`}
                                    className="slideshow-image"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="slideshow-dots">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`slideshow-dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default MobileSlideshow;