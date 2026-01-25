import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DashboardWidget from '../components/DashboardWidget';
import MarketStrip from '../components/MarketStrip';
import AudioPlayer from '../components/AudioPlayer';
import HeroSlider from '../components/HeroSlider';
import { NewsCard } from '../components/Cards';
import { getAllStories } from '../utils/storyManager';
import { Play, ChevronRight, TrendingUp } from 'lucide-react';

const DeepDiveSection = ({ stories }) => {
    const navigate = useNavigate();
    const audioStories = stories.filter(s => s.hasAudio);

    return (
        <div className="deep-dive-section animate-slide-up">
            <h2 className="section-title">Deep Dives & Audio Overviews</h2>
            <div className="deep-dive-grid">
                {audioStories.map((story, index) => (
                    <div
                        key={story.id}
                        className="deep-dive-card animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div
                            style={{ position: 'relative', cursor: 'pointer' }}
                            onClick={() => navigate(`/article/${story.id}`)}
                        >
                            <img src={story.image} alt={story.title} className="deep-dive-image" />
                            <div className="play-badge">
                                <Play size={20} fill="var(--navy)" color="var(--navy)" />
                            </div>
                        </div>
                        <div className="deep-dive-content">
                            <div className="audio-badge">Audio Deep Dive</div>
                            <h3
                                className="story-title clickable-title"
                                onClick={() => navigate(`/article/${story.id}`)}
                            >
                                {story.title}
                            </h3>
                            <p className="story-excerpt">{story.excerpt}</p>
                            <button
                                className="read-article-btn"
                                onClick={() => navigate(`/article/${story.id}`)}
                            >
                                Read Full Article <ChevronRight size={16} />
                            </button>
                        </div>
                        <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                            <AudioPlayer
                                title={story.title}
                                duration={story.audioDuration}
                                audioSrc={story.audioSrc}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TrendingSection = ({ stories }) => {
    const navigate = useNavigate();

    return (
        <div className="trending-section animate-fade-in">
            <div className="section-header">
                <h2 className="section-title">
                    <TrendingUp size={24} className="section-icon" /> Trending Now
                </h2>
            </div>
            <div className="trending-grid">
                {stories.map((story, index) => (
                    <div
                        key={story.id}
                        className="trending-item animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                        onClick={() => navigate(`/article/${story.id}`)}
                    >
                        <div className="trending-thumbnail">
                            <img src={story.image || '/placeholder-news.jpg'} alt={story.title} loading="lazy" />
                        </div>
                        <div className="trending-content">
                            <span className="trending-category" style={{ fontSize: '0.7rem' }}>
                                <span className="trending-rank">#{index + 1}</span> • {story.category}
                            </span>
                            <h4 className="trending-title">{story.title}</h4>
                            <span className="trending-meta">{story.readTime}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const NewsGrid = ({ stories }) => {
    return (
        <div className="news-grid-section animate-fade-in">
            <div className="section-header">
                <h2 className="section-title">Latest Stories</h2>
            </div>
            <div className="news-grid">
                {stories.map((story, index) => (
                    <div
                        key={story.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 0.08}s` }}
                    >
                        <NewsCard story={story} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const NewsletterSection = () => {
    return (
        <div className="newsletter-section animate-fade-in">
            <div className="newsletter-inner">
                <div className="newsletter-content">
                    <span className="newsletter-label">Daily Briefing</span>
                    <h2 className="newsletter-title">Get the Tattva Morning Brief</h2>
                    <p className="newsletter-desc">
                        Start your day with a curated digest of global shifts, market moves, and deep dive analysis. Delivered to your inbox at 7 AM.
                    </p>
                </div>
                <div className="newsletter-form-container">
                    <div className="newsletter-form">
                        <input type="email" placeholder="Enter your email" className="newsletter-input" />
                        <button className="newsletter-btn">Subscribe</button>
                    </div>
                    <p className="newsletter-note">Join 50,000+ readers. Unsubscribe anytime.</p>
                </div>
            </div>
        </div>
    );
};

const Home = () => {
    const stories = getAllStories();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    // Data Slicing Logic to prevent Overlaps
    // 1. Hero: Top 3 stories with images
    const heroStories = stories.filter(s => s.image).slice(0, 3);
    const heroIds = new Set(heroStories.map(s => s.id));

    // 2. Trending: Next 4 stories (that aren't in Hero)
    const trendingStories = stories
        .filter(s => !heroIds.has(s.id))
        .slice(0, 4);
    const trendingIds = new Set(trendingStories.map(s => s.id));

    // 3. Grid: Everything else (limit to 6 for clean layout)
    const gridStories = stories
        .filter(s => !heroIds.has(s.id) && !trendingIds.has(s.id))
        .slice(0, 6);

    return (
        <div className="tattva-app">
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

            <main className="tattva-main">
                <Header toggleSidebar={toggleSidebar} />

                <MarketStrip />

                {/* Full-width Hero Slider */}
                <HeroSlider stories={heroStories} />

                {/* Trending Section */}
                <TrendingSection stories={trendingStories} />

                {/* News Grid */}
                <NewsGrid stories={gridStories} />

                {/* Newsletter CTA */}
                <NewsletterSection />

                {/* Deep Dive Section */}
                <DeepDiveSection stories={stories} />
            </main>
        </div>
    );
};

export default Home;
