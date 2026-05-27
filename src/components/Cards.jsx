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

export const NativeAdCard = memo(({ dark, compact }) => {
    return (
        <div
            className={`story-card ${dark ? 'dark' : ''} card-hover`}
            style={{ 
                border: '1px dashed var(--accent)', 
                position: 'relative',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                background: dark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.01)'
            }}
            onClick={() => window.open('https://example.com', '_blank')}
        >
            <div className="story-image" style={{ position: 'relative', overflow: 'hidden', minHeight: '180px', background: 'rgba(var(--text-color-rgb), 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    Ad Here
                </div>
                <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0, 0, 0, 0.6)', color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '3px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                    Sponsored
                </div>
            </div>

            <div className="story-content-wrapper" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div className="story-top">
                    <div className="story-cat" style={{ color: 'var(--accent)', fontWeight: '600' }}>Partner Content</div>
                    <h3 className={`story-title ${compact ? 'text-lg' : ''}`} style={{ marginTop: '0.25rem' }}>
                        Experience Premium Global Journalism: Start Your Tattva Membership Today
                    </h3>
                    <p className="story-excerpt" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        Support independent, depth-oriented news. Get unlimited digital access to deep dives, infographics, and clean audio briefings.
                    </p>
                </div>

                <div className="story-meta" style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-light)' }}>
                    <span>Tattva Promotions</span>
                    <span style={{ border: '1px solid var(--accent)', color: 'var(--accent)', padding: '1px 5px', borderRadius: '3px', fontSize: '0.65rem', fontWeight: 'bold' }}>LEARN MORE</span>
                </div>
            </div>
        </div>
    );
});

NativeAdCard.displayName = 'NativeAdCard';

