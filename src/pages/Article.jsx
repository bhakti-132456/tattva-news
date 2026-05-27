import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import NewsAudioPlayer from '../components/NewsAudioPlayer';
import StatisticsChart from '../components/StatisticsChart';
import { getStoryById } from '../utils/storyManager';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Share2, Bookmark } from 'lucide-react';

const NativeArticleAd = () => {
    return (
        <div 
            className="native-article-ad animate-fade-in"
            style={{
                margin: '2.5rem 0',
                padding: '1.5rem',
                border: '1px dashed var(--accent)',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.02)',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                cursor: 'pointer'
            }}
            onClick={() => window.open('https://example.com', '_blank')}
        >
            <div style={{
                flex: '1 1 150px',
                height: '100px',
                background: 'rgba(0, 0, 0, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                position: 'relative'
            }}>
                <span style={{ color: 'var(--accent)', fontWeight: 'bold', letterSpacing: '1px' }}>Ad Here</span>
                <span style={{
                    position: 'absolute',
                    top: '6px',
                    left: '6px',
                    background: 'rgba(0, 0, 0, 0.6)',
                    color: '#fff',
                    fontSize: '0.55rem',
                    padding: '1px 4px',
                    borderRadius: '2px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold'
                }}>Sponsored</span>
            </div>
            <div style={{ flex: '2 1 300px', textAlign: 'left' }}>
                <span style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Special Partner Offer</span>
                <h4 style={{ margin: '0.25rem 0 0.5rem 0', color: 'var(--text-color)', fontSize: '1.1rem', fontWeight: '600' }}>
                    Access Deep Global Insights & Analysis
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: '1.4' }}>
                    Subscribe to Tattva Premium for ad-free immersive reading, priority briefings, and exclusive market intelligence charts. Start your free trial today.
                </p>
            </div>
        </div>
    );
};

const Article = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchStory = async () => {
            try {
                setLoading(true);
                const data = await getStoryById(id);
                setStory(data);
            } catch (err) {
                console.error("Article fetch failed:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStory();
    }, [id]);

    const textToRead = useMemo(() => {
        if (!story) return "";
        let text = story.title + ". ";
        if (story.contentHTML) {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = story.contentHTML;
            text += tempDiv.innerText;
        } else {
            text += "Lorem ipsum dolor sit amet. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
        }
        return text;
    }, [story]);

    if (loading) {
        return <div className="loading-container">Loading Article...</div>;
    }

    if (!story) {
        return <div style={{ padding: '2rem' }}>Article not found</div>;
    }

    // Render infographic component based on data
    const renderInfographic = () => {
        if (!story.hasInfographics || !story.infographicData) return null;

        const { type, chartType, chartData, imageUrl } = story.infographicData;

        if (type === 'chart' && chartData && chartData.length > 0) {
            return (
                <div className="article-infographic">
                    <StatisticsChart
                        data={chartData}
                        chartType={chartType}
                        title="Key Statistics"
                    />
                </div>
            );
        }

        if (type === 'image' && imageUrl) {
            return (
                <figure className="article-infographic-image">
                    <img src={imageUrl} alt="Infographic" />
                    <figcaption>Infographic</figcaption>
                </figure>
            );
        }

        return null;
    };

    // Determine where to place infographic based on position setting
    const infographicPosition = story.infographicData?.position || 'after-intro';
    const infographicElement = renderInfographic();

    return (
        <div className="tattva-app">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="tattva-main">
                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

                <article className="article-container animate-fade-in">
                    <button onClick={() => navigate(-1)} className="back-btn">
                        <ArrowLeft size={20} /> Back to News
                    </button>

                    <header className="article-header">
                        <div className="article-meta-top">
                            <span className="article-cat">{story.category}</span>
                            <span className="dot">•</span>
                            <span>{story.time}</span>
                        </div>
                        <h1 className="article-title">{story.title}</h1>

                        <div style={{ margin: '1rem 0' }}>
                            <NewsAudioPlayer
                                articleId={id}
                                text={textToRead}
                                lang={language}
                            />
                        </div>

                        <p className="article-subtitle">{story.excerpt}</p>

                        <figure className="article-hero-image">
                            <img src={story.image} alt={story.title} />
                            <figcaption>Image Source: {story.category} Archives</figcaption>
                        </figure>

                        <div className="author-block">
                            <div className="author-avatar">{story.author.charAt(0)}</div>
                            <div className="author-info">
                                <div className="author-name">{story.author}</div>
                                <div className="read-time">{story.readTime || '5 min read'}</div>
                            </div>
                            <div className="article-actions">
                                <button className="action-icon" title="Save"><Bookmark size={20} /></button>
                                <button className="action-icon" title="Share"><Share2 size={20} /></button>
                            </div>
                        </div>
                    </header>



                    {/* Infographic after introduction */}
                    {infographicPosition === 'after-intro' && infographicElement}

                    <div className="article-content">
                        {story.contentHTML ? (
                            <>
                                <div dangerouslySetInnerHTML={{ __html: story.contentHTML }} />
                                <NativeArticleAd />
                                {/* Inline infographic (middle of content) */}
                                {infographicPosition === 'inline' && infographicElement}
                            </>
                        ) : (
                            <>
                                <p className="drop-cap">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                <NativeArticleAd />
                                {infographicPosition === 'inline' && infographicElement}
                                <h3>Key Takeaways</h3>
                                <ul>
                                    <li>Economic indicators suggest a steady recovery.</li>
                                    <li>Global markets react positively to new trade agreements.</li>
                                    <li>Tech sector leads the charge in innovation.</li>
                                </ul>
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                            </>
                        )}
                    </div>

                    {/* Infographic at end of article */}
                    {infographicPosition === 'end' && infographicElement}
                </article>
            </main>
        </div>
    );
};

export default Article;
