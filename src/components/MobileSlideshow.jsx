import React, { useState, useRef, useEffect } from 'react';
import './MobileSlideshow.css';

const MobileSlideshow = ({ images = [], username = "DeVision", userAvatar = null, description = "Only for people who give a Glam! We present to you, Reformer." }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
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
            {/* Header - Username */}
            <div className="post-header">
                <div className="user-info">
                    <div className="user-avatar">
                        {userAvatar ? (
                            <img src={userAvatar} alt={username} />
                        ) : (
                            <div className="avatar-placeholder">{username.charAt(0).toUpperCase()}</div>
                        )}
                    </div>
                    <span className="username">{username}</span>
                </div>
                <button className="more-options" aria-label="More options">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="5" cy="12" r="1.5" fill="currentColor"/>
                        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                        <circle cx="19" cy="12" r="1.5" fill="currentColor"/>
                    </svg>
                </button>
            </div>

            {/* Slideshow */}
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
                    
                    {/* Dots indicator on image */}
                    {images.length > 1 && (
                        <div className="slideshow-dots-overlay">
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    className={`slideshow-dot-overlay ${index === currentIndex ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            {/* Old dots removed - now showing on image */}

            {/* Action buttons */}
            <div className="post-actions">
                <div className="action-buttons-left">
                    <button 
                        className={`action-button ${isLiked ? 'liked' : ''}`}
                        onClick={() => setIsLiked(!isLiked)}
                        aria-label="Like"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? "#ed4956" : "none"} stroke={isLiked ? "#ed4956" : "currentColor"} strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                    </button>
                    <button className="action-button" aria-label="Comment">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                        </svg>
                    </button>
                    <button className="action-button" aria-label="Share">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="22" y1="2" x2="11" y2="13"/>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                    </button>
                </div>
                <button 
                    className={`action-button bookmark ${isSaved ? 'saved' : ''}`}
                    onClick={() => setIsSaved(!isSaved)}
                    aria-label="Save"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                </button>
            </div>

            {/* Description */}
            <div className="post-description">
                <span className="description-username">{username}</span>
                <span className="description-text">{description}</span>
            </div>
        </div>
    );
};

export default MobileSlideshow;