import React, { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Play } from 'lucide-react';

const HeroSlider = memo(({ stories }) => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const nextSlide = useCallback(() => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % stories.length);
            setIsTransitioning(false);
        }, 300);
    }, [stories.length]);

    const prevSlide = useCallback(() => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + stories.length) % stories.length);
            setIsTransitioning(false);
        }, 300);
    }, [stories.length]);

    const goToSlide = useCallback((index) => {
        if (index !== currentSlide) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentSlide(index);
                setIsTransitioning(false);
            }, 300);
        }
    }, [currentSlide]);

    // Auto-slide every 6 seconds
    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const story = stories[currentSlide];

    return (
        <div className="hero-slider">
            <div className={`hero-slide ${isTransitioning ? 'transitioning' : ''}`}>
                <div className="hero-slide-bg">
                    <img
                        src={story.image}
                        alt={story.title}
                        loading="eager"
                        fetchpriority="high"
                    />
                </div>
                <div className="hero-slide-overlay"></div>

                <div className="hero-slide-content">
                    <div className="hero-slide-inner">
                        {story.hasAudio && (
                            <div className="hero-audio-badge">
                                <Play size={12} fill="white" /> Audio Deep Dive
                            </div>
                        )}
                        <span className="hero-category">{story.category}</span>
                        <h1 className="hero-slide-title">{story.title}</h1>
                        <p className="hero-slide-excerpt">{story.excerpt}</p>
                        <div className="hero-slide-meta">
                            <span>{story.author}</span>
                            <span className="meta-dot">•</span>
                            <span>{story.readTime}</span>
                        </div>
                        <button
                            className="hero-cta-btn"
                            onClick={() => navigate(`/article/${story.id}`)}
                        >
                            Read Full Story <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button className="hero-nav-btn hero-nav-prev" onClick={prevSlide} aria-label="Previous slide">
                    <ChevronLeft size={24} />
                </button>
                <button className="hero-nav-btn hero-nav-next" onClick={nextSlide} aria-label="Next slide">
                    <ChevronRight size={24} />
                </button>

                {/* Slide Indicators */}
                <div className="hero-indicators">
                    {stories.map((_, index) => (
                        <button
                            key={index}
                            className={`hero-indicator ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="hero-progress-container">
                    <div
                        className="hero-progress-bar"
                        key={currentSlide}
                    />
                </div>
            </div>
        </div>
    );
});

HeroSlider.displayName = 'HeroSlider';

export default HeroSlider;
