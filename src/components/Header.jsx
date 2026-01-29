import React, { useState, useEffect, memo } from 'react';
import { Menu, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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

    useEffect(() => {
        const d = new Date();
        const formatted = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        setDate(formatted);
    }, []);

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

            <div className="header-meta">
                <span className="date-display">{date}</span>
                <span className="divider">|</span>
                <span className="live-indicator">● LIVE</span>
                <span className="divider">|</span>
                <LanguageToggle />
            </div>
        </header>
    );
});

Header.displayName = 'Header';

export default Header;
