import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AudioPlayer from '../components/AudioPlayer';
import StatisticsChart from '../components/StatisticsChart';
import { getAllStories } from '../utils/storyManager';
import { ArrowLeft, Clock, Share2, Bookmark } from 'lucide-react';

const Article = () => {
    const stories = getAllStories();
    const { id } = useParams();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const story = stories.find(s => s.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

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

                    {story.hasAudio && (
                        <div style={{ marginBottom: '3rem' }}>
                            <AudioPlayer
                                title={story.title}
                                duration={story.audioDuration}
                                audioSrc={story.audioSrc || '/audio-placeholder.mp3'}
                            />
                        </div>
                    )}

                    {/* Infographic after introduction */}
                    {infographicPosition === 'after-intro' && infographicElement}

                    <div className="article-content">
                        {story.contentHTML ? (
                            <>
                                <div dangerouslySetInnerHTML={{ __html: story.contentHTML }} />
                                {/* Inline infographic (middle of content) */}
                                {infographicPosition === 'inline' && infographicElement}
                            </>
                        ) : (
                            <>
                                <p className="drop-cap">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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

