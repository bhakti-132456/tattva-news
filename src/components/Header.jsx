import React, { useState, useEffect, memo } from 'react';
import { Menu, Globe, Search, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const LanguageToggle = () => {
    const { language, toggleLanguage } = useLanguage();
    return (
        <button
            onClick={toggleLanguage}
            style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'inherit',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--navy)'
            }}
        >
            <Globe size={16} />
            {language === 'en' ? 'English' : 'తెలుగు'}
        </button>
    );
};

const Header = memo(({ toggleSidebar }) => {
    const [date, setDate] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const d = new Date();
        const formatted = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        setDate(formatted);
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <header className="tattva-header animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="header-left">
                <button
                    className="mobile-menu-btn"
                    onClick={toggleSidebar}
                    aria-label="Toggle Menu"
                >
                    <Menu size={24} color="var(--navy)" />
                </button>
                <a href="/" className="logo-container">
                    <img src="/logo-new.png" alt="Tattva News" loading="eager" />
                </a>
                <div className="weather-widget">
                    <span>24°C</span> <span className="weather-city">Hyderabad</span>
                </div>
            </div>

            <div className="header-right">
                {isSearchOpen ? (
                    <form onSubmit={handleSearchSubmit} className="header-search-form animate-fade-in">
                        <input 
                            type="text" 
                            autoFocus
                            placeholder="Search stories..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="header-search-input"
                        />
                        <button type="button" onClick={() => setIsSearchOpen(false)} className="search-close">
                            <X size={18} />
                        </button>
                    </form>
                ) : (
                    <div className="header-meta">
                        <button className="search-trigger-btn" onClick={() => setIsSearchOpen(true)}>
                            <Search size={20} />
                        </button>
                        <span className="date-display">{date}</span>
                        <span className="divider">|</span>
                        <span className="live-indicator">● LIVE</span>
                        <span className="divider">|</span>
                        <LanguageToggle />
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .header-right {
                    display: flex;
                    align-items: center;
                }
                .search-trigger-btn {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    color: var(--navy);
                    display: flex;
                    align-items: center;
                    padding: 8px;
                    border-radius: 50%;
                    transition: background 0.2s;
                    margin-right: 10px;
                }
                .search-trigger-btn:hover {
                    background: rgba(0,0,0,0.05);
                }
                .header-search-form {
                    display: flex;
                    align-items: center;
                    background: #f1f3f5;
                    border-radius: 20px;
                    padding: 4px 12px;
                    border: 1px solid #ddd;
                }
                .header-search-input {
                    border: none;
                    background: transparent;
                    padding: 4px 8px;
                    outline: none;
                    width: 200px;
                    font-family: inherit;
                    font-size: 0.9rem;
                }
                .search-close {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    color: #666;
                    display: flex;
                    align-items: center;
                }
            `}} />
        </header>
    );
});

Header.displayName = 'Header';

export default Header;
