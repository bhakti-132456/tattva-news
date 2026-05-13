import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { NewsCard } from '../components/Cards';
import { getLatestStories } from '../utils/storyManager';
import { useLanguage } from '../context/LanguageContext';
import { Search as SearchIcon, X } from 'lucide-react';

const SearchPage = () => {
    const { language } = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = queryParams.get('q') || '';

    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const performSearch = async () => {
            if (!initialQuery) return;
            setLoading(true);
            try {
                // For simplicity, we fetch all latest stories for the language and filter client-side
                // In a real app, this would be a server-side search
                const allStories = await getLatestStories(language);
                const filtered = allStories.filter(story => 
                    story.title.toLowerCase().includes(initialQuery.toLowerCase()) ||
                    (story.excerpt && story.excerpt.toLowerCase().includes(initialQuery.toLowerCase()))
                );
                setResults(filtered);
            } catch (err) {
                console.error("Search failed:", err);
            } finally {
                setLoading(false);
            }
        };
        performSearch();
    }, [initialQuery, language]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <div className="tattva-app">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="tattva-main">
                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

                <div className="search-page-container content-container animate-fade-in">
                    <div className="search-header-box">
                        <form onSubmit={handleSearch} className="search-big-form">
                            <SearchIcon className="search-form-icon" />
                            <input 
                                type="text" 
                                value={query} 
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search articles, topics, or keywords..."
                                className="search-big-input"
                            />
                            {query && <button type="button" onClick={() => setQuery('')} className="search-clear"><X size={20} /></button>}
                        </form>
                        <p className="search-stats">
                            {loading ? 'Searching...' : `Showing ${results.length} results for "${initialQuery}"`}
                        </p>
                    </div>

                    {loading ? (
                        <div className="loading-container">Searching Tattva Archives...</div>
                    ) : results.length > 0 ? (
                        <div className="news-grid">
                            {results.map(story => (
                                <NewsCard key={story.id} story={story} />
                            ))}
                        </div>
                    ) : initialQuery && (
                        <div className="no-results">
                            <h3>No articles found</h3>
                            <p>Try different keywords or check your spelling.</p>
                        </div>
                    )}
                </div>
            </main>

            <style dangerouslySetInnerHTML={{ __html: `
                .search-page-container {
                    padding-top: 2rem;
                }
                .search-header-box {
                    margin-bottom: 3rem;
                    max-width: 800px;
                }
                .search-big-form {
                    position: relative;
                    display: flex;
                    align-items: center;
                    background: white;
                    border: 2px solid #eee;
                    border-radius: 12px;
                    padding: 0 20px;
                    transition: all 0.3s ease;
                }
                .search-big-form:focus-within {
                    border-color: var(--navy);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                }
                .search-form-icon {
                    color: #999;
                    margin-right: 15px;
                }
                .search-big-input {
                    flex-grow: 1;
                    border: none;
                    height: 60px;
                    font-size: 1.25rem;
                    font-weight: 500;
                    outline: none;
                    background: transparent;
                }
                .search-clear {
                    background: #f1f3f5;
                    border: none;
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: #666;
                }
                .search-stats {
                    margin-top: 1rem;
                    font-size: 0.9rem;
                    color: #666;
                    font-weight: 500;
                }
                .no-results {
                    text-align: center;
                    padding: 5rem 0;
                    color: #999;
                }
                .no-results h3 {
                    color: var(--navy);
                    margin-bottom: 0.5rem;
                }
            `}} />
        </div>
    );
};

export default SearchPage;
