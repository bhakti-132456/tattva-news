import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Globe, Briefcase, Cpu, Headphones, Search, Bookmark, User, X, Landmark, Trophy, Clapperboard, HeartPulse } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const translations = {
    en: {
        home: 'Home',
        politics: 'Politics',
        business: 'Business',
        tech: 'Tech',
        world: 'World',
        sports: 'Sports',
        entertainment: 'Entertainment',
        health: 'Health',
        audio: 'Audio Deep Dives',
        search: 'Search',
        saved: 'Saved',
        account: 'Account'
    },
    te: {
        home: 'హోమ్',
        politics: 'రాజకీయం',
        business: 'బిజినెస్',
        tech: 'టెక్నాలజీ',
        world: 'ప్రపంచం',
        sports: 'క్రీడలు',
        entertainment: 'వినోదం',
        health: 'ఆరోగ్యం',
        audio: 'ఆడియో కథనాలు',
        search: 'సెర్చ్',
        saved: 'సేవ్డ్',
        account: 'ఖాతా'
    }
};

const navItems = [
    { key: 'home', icon: LayoutDashboard, path: '/' },
    { key: 'politics', icon: Landmark, path: '/category/politics' },
    { key: 'business', icon: Briefcase, path: '/category/business' },
    { key: 'tech', icon: Cpu, path: '/category/tech' },
    { key: 'world', icon: Globe, path: '/category/world' },
    { key: 'sports', icon: Trophy, path: '/category/sports' },
    { key: 'entertainment', icon: Clapperboard, path: '/category/entertainment' },
    { key: 'health', icon: HeartPulse, path: '/category/health' },
    { key: 'audio', icon: Headphones, path: '/#deep-dives' },
];

const utilityItems = [
    { key: 'search', icon: Search },
    { key: 'saved', icon: Bookmark },
    { key: 'account', icon: User },
];

const Sidebar = ({ isOpen, onClose }) => {
    const { language } = useLanguage();
    const t = translations[language] || translations.en;

    const handleNavClick = (e, path) => {
        onClose();
        if (path.includes('#')) {
            e.preventDefault();
            const element = document.querySelector('.deep-dive-section');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            {isOpen && <div className="sidebar-backdrop" onClick={onClose}></div>}

            <nav className={`tattva-sidebar ${isOpen ? 'open' : ''}`}>
                <button className="sidebar-close-btn" onClick={onClose} aria-label="Close menu">
                    <X size={20} />
                </button>

                <div className="sidebar-logo">
                    <img src="/logo-new.png" alt="Tattva News" loading="lazy" />
                </div>

                <div className="sidebar-group primary-nav">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const label = t[item.key];
                        return (
                            <NavLink
                                key={item.key}
                                to={item.path}
                                className={({ isActive }) => `nav-item ${isActive && !item.path.includes('#') ? 'active' : ''}`}
                                onClick={(e) => handleNavClick(e, item.path)}
                            >
                                <Icon className="nav-icon" size={22} strokeWidth={1.5} />
                                <span className="nav-label">{label}</span>
                                <div className="nav-tooltip">{label}</div>
                            </NavLink>
                        );
                    })}
                </div>

                <div className="sidebar-group utility-nav">
                    {utilityItems.map((item) => {
                        const Icon = item.icon;
                        const label = t[item.key];
                        return (
                            <button
                                key={item.key}
                                className="nav-item"
                                onClick={onClose}
                                type="button"
                            >
                                <Icon className="nav-icon" size={22} strokeWidth={1.5} />
                                <span className="nav-label">{label}</span>
                                <div className="nav-tooltip">{label}</div>
                            </button>
                        );
                    })}
                </div>
            </nav>
        </>
    );
};

export default Sidebar;
