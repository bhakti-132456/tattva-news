import React, { memo } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroCard = memo(({ story }) => {
    const navigate = useNavigate();

    return (
        <div className="hero-card shadow-lg animate-fade-in text-left">
            <div className="hero-bg">
                <img src={story.image} alt={story.title} loading="eager" />
            </div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <div className="hero-tag">{story.category}</div>
                <h1 className="hero-title">{story.title}</h1>
                <p className="hero-desc">{story.excerpt}</p>
                <div className="hero-meta">
                    <span>{story.author}</span> • <span>{story.time}</span>
                </div>
                <button onClick={() => navigate(`/article/${story.id}`)} className="read-btn">
                    Read Full Story <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
});

HeroCard.displayName = 'HeroCard';

export const NewsCard = memo(({ story, dark, compact }) => {
    const navigate = useNavigate();

    return (
        <div
            className={`story-card ${dark ? 'dark' : ''} ${story.accent ? 'accent-border' : ''} card-hover`}
            onClick={() => navigate(`/article/${story.id}`)}
        >
            {story.image && (
                <div className="story-image">
                    <img src={story.image} alt={story.title} loading="lazy" />
                </div>
            )}

            <div className="story-content-wrapper">
                <div className="story-top">
                    <div className="story-cat" style={dark ? { color: '#e2e8f0' } : {}}>{story.category}</div>
                    <h3 className={`story-title ${compact ? 'text-lg' : ''}`}>{story.title}</h3>
                    {(!story.image || dark) && <p className="story-excerpt">{story.excerpt}</p>}
                </div>

                <div className="story-meta" style={dark ? { color: 'rgba(255,255,255,0.5)' } : {}}>
                    {story.time} • {story.readTime || '3 min'}
                </div>
            </div>
        </div>
    );
});

NewsCard.displayName = 'NewsCard';
