import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DashboardWidget from '../components/DashboardWidget';
import MarketStrip from '../components/MarketStrip';
import AudioPlayer from '../components/AudioPlayer';
import HeroSlider from '../components/HeroSlider';
import { NewsCard } from '../components/Cards';
import { getLatestStories } from '../utils/storyManager';
import { useLanguage } from '../context/LanguageContext';
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

const TrendingCard = ({ category, stories }) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        if (stories.length <= 1) return;

        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % stories.length);
                setIsFading(false);
            }, 300); // Wait for fade out
        }, 5000 + Math.random() * 2000); // Stagger updates slightly

        return () => clearInterval(interval);
    }, [stories.length]);

    const story = stories[currentIndex];

    return (
        <div
            className="trending-item animate-fade-in"
            onClick={() => navigate(`/article/${story.id}`)}
        >
            <div className={`trending-content-wrapper ${isFading ? 'fading' : ''}`}>
                <div className="trending-thumbnail">
                    <img src={story.image || '/placeholder-news.jpg'} alt={story.title} loading="lazy" />
                </div>
                <div className="trending-content">
                    <span className="trending-category" style={{ fontSize: '0.7rem' }}>
                        <span className="trending-rank flex items-center justify-center">
                            {currentIndex + 1}/{stories.length}
                        </span>
                        • {category}
                    </span>
                    <h4 className="trending-title">{story.title}</h4>
                    {story.excerpt && (
                        <p className="trending-excerpt" style={{
                            fontSize: '0.85rem',
                            color: 'var(--text-light)',
                            margin: '0.5rem 0',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                            {story.excerpt.length > 80 ? story.excerpt.substring(0, 80) + '...' : story.excerpt}
                        </p>
                    )}
                    <span className="trending-meta">{story.readTime || '3 min read'}</span>
                </div>
            </div>
        </div>
    );
};

const TrendingSection = ({ categories }) => {
    return (
        <div className="trending-section animate-fade-in">
            <div className="section-header">
                <h2 className="section-title">
                    <TrendingUp size={24} className="section-icon" /> Trending Topics
                </h2>
            </div>
            <div className="trending-grid">
                {categories.map((group, index) => (
                    <TrendingCard
                        key={group.category}
                        category={group.category}
                        stories={group.items}
                    />
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



const SideTrendingBox = ({ story, title }) => {
    const navigate = useNavigate();
    return (
        <div className="side-trending-box" onClick={() => navigate(`/article/${story.id}`)}>
            <div className="side-trending-image">
                <img src={story.image || '/placeholder-news.jpg'} alt={story.title} />
            </div>
            <div className="side-trending-info">
                <span className="side-category">{title}</span>
                <h4 className="side-title">{story.title}</h4>
            </div>
        </div>
    );
};

const Home = () => {
    const { language } = useLanguage();
    const [stories, setStories] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                setLoading(true);
                const data = await getLatestStories(language);
                setStories(data || []);
            } catch (err) {
                console.error("Home fetch failed:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStories();
    }, [language]);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    if (loading) {
        return <div className="loading-container">Loading Tattva News...</div>;
    }

    // Data Slicing Logic
    // 1. Hero: Top 3 stories for Slider (LEFT SIDE)
    const heroStories = stories.filter(s => s.image).slice(0, 3);
    const heroIds = new Set(heroStories.map(s => s.id));

    // 2. Sidebar Trending: Next 2 top stories (RIGHT SIDE)
    const sideStories = stories
        .filter(s => !heroIds.has(s.id) && s.image)
        .slice(0, 2);
    const sideIds = new Set(sideStories.map(s => s.id));

    // 3. Main Trending Grid: Categories (FULL WIDTH BELOW)
    const remainingStories = stories.filter(s => !heroIds.has(s.id) && !sideIds.has(s.id));

    // Group by category
    const categoryGroups = {};
    remainingStories.forEach(story => {
        const cat = story.category || 'General';
        if (!categoryGroups[cat]) categoryGroups[cat] = [];
        categoryGroups[cat].push(story);
    });

    // Select Top Categories
    let trendingCategories = Object.entries(categoryGroups)
        .sort((a, b) => b[1].length - a[1].length)
        .slice(0, 4)
        .map(([category, items]) => ({ category, items: items.slice(0, 5) }));

    // FALLBACK: If we don't have enough categories (e.g. only "World"), 
    // artificially split the data to fill 4 cards as requested.
    if (trendingCategories.length < 4 && remainingStories.length > 20) {
        const fallbackLabels = ['Top Stories', 'In Focus', 'Global News', 'Developing'];
        trendingCategories = fallbackLabels.map((label, index) => ({
            category: label,
            // Slice different chunks of stories for each card to ensure variety
            items: remainingStories.slice(index * 5, (index + 1) * 5)
        }));
    }

    // Collect IDs of stories used in trending categories
    const trendingIds = new Set();
    trendingCategories.forEach(group => {
        group.items.forEach(s => trendingIds.add(s.id));
    });

    // 4. Grid: Everything else
    const gridStories = stories
        .filter(s => !heroIds.has(s.id) && !sideIds.has(s.id) && !trendingIds.has(s.id))
        .slice(0, 6);

    return (
        <div className="tattva-app">
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

            <main className="tattva-main">
                <Header toggleSidebar={toggleSidebar} />
                <MarketStrip />

                {/* Hero Layout: Split 70/30 */}
                <div className="hero-layout-grid animate-fade-in content-container">
                    <div className="hero-main-area">
                        <HeroSlider stories={heroStories} />
                    </div>
                    <div className="hero-side-area">
                        {sideStories.length > 0 && <SideTrendingBox story={sideStories[0]} title="Must Read" />}
                        {sideStories.length > 1 && <SideTrendingBox story={sideStories[1]} title="Editors Pick" />}
                    </div>
                </div>

                <div className="content-container">
                    {/* Trending Section - Now Full Width Row */}
                    <TrendingSection categories={trendingCategories} />

                    {/* News Grid */}
                    <NewsGrid stories={gridStories} />

                    {/* Newsletter CTA */}
                    <NewsletterSection />

                    {/* Deep Dive Section */}
                    <DeepDiveSection stories={stories} />
                </div>
            </main>
        </div>
    );
};

export default Home;
