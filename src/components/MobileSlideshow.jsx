import { useEffect, useRef, useState } from 'react';
import './MobileSlideshow.css';

const MobileSlideshow = ({ images = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const startX = useRef(null);
    const isDragging = useRef(false);
    const slideRef = useRef(null);

    // Handle touch start
    const handleTouchStart = (e) => {
        startX.current = e.touches[0].clientX;
        isDragging.current = true;
        if (slideRef.current) slideRef.current.style.transition = 'none';
    };

    // Handle touch move
    const handleTouchMove = (e) => {
        if (!isDragging.current || startX.current === null) return;
        
        const currentX = e.touches[0].clientX;
        const diff = startX.current - currentX;
        
        // Add some resistance while dragging
        if (slideRef.current) {
            slideRef.current.style.transform = `translateX(calc(-${currentIndex * 100}% - ${diff}px))`;
        }
    };

    // Handle touch end
    const handleTouchEnd = (e) => {
        if (!isDragging.current || startX.current === null) return;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX.current - endX;
        const threshold = 50; // minimum swipe distance

        let nextIndex = currentIndex;
        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentIndex < images.length - 1) {
                nextIndex = currentIndex + 1;
            } else if (diff < 0 && currentIndex > 0) {
                nextIndex = currentIndex - 1;
            }
        }

        if (slideRef.current) {
            slideRef.current.style.transition = '';
            slideRef.current.style.transform = `translateX(-${nextIndex * 100}%)`;
        }

        setCurrentIndex(nextIndex);
        startX.current = null;
        isDragging.current = false;
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
                    onTouchCancel={handleTouchEnd}
                >
                    <div 
                        className="slideshow-track"
                        ref={slideRef}
                    >
                        {images.map((image, index) => (
                            <div key={`${image.src || image}-${index}`} className="slideshow-slide">
                                <img 
                                    src={image.src || image} 
                                    alt={image.alt || `Slide ${index + 1}`}
                                    className="slideshow-image"
                                    draggable="false"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {images.length > 1 && <div className="slideshow-dots">
                {images.map((image, index) => (
                    <button
                        key={`${image.src || image}-${index}`}
                        type="button"
                        className={`slideshow-dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={index === currentIndex ? 'true' : undefined}
                    />
                ))}
            </div>}
        </div>
    );
};

export default MobileSlideshow;
