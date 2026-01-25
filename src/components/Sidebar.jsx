import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Globe, Briefcase, Cpu, Headphones, Search, Bookmark, User, X } from 'lucide-react';

const navItems = [
    { name: 'Home', icon: LayoutDashboard, path: '/' },
    { name: 'World', icon: Globe, path: '/category/world' },
    { name: 'Business', icon: Briefcase, path: '/category/business' },
    { name: 'Tech', icon: Cpu, path: '/category/tech' },
    { name: 'Audio Deep Dives', icon: Headphones, path: '/#deep-dives' },
];

const utilityItems = [
    { name: 'Search', icon: Search },
    { name: 'Saved', icon: Bookmark },
    { name: 'Account', icon: User },
];

const Sidebar = ({ isOpen, onClose }) => {
    const handleNavClick = (e, path) => {
        onClose();
        // Handle anchor link for deep dives
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
            {/* Backdrop overlay for mobile */}
            {isOpen && <div className="sidebar-backdrop" onClick={onClose}></div>}

            <nav className={`tattva-sidebar ${isOpen ? 'open' : ''}`}>
                {/* Close button for mobile */}
                <button className="sidebar-close-btn" onClick={onClose} aria-label="Close menu">
                    <X size={20} />
                </button>

                {/* Logo on mobile */}
                <div className="sidebar-logo">
                    <img src="/logo.png" alt="Tattva News" loading="lazy" />
                </div>

                <div className="sidebar-group primary-nav">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) => `nav-item ${isActive && !item.path.includes('#') ? 'active' : ''}`}
                                onClick={(e) => handleNavClick(e, item.path)}
                            >
                                <Icon className="nav-icon" size={22} strokeWidth={1.5} />
                                <span className="nav-label">{item.name}</span>
                                <div className="nav-tooltip">{item.name}</div>
                            </NavLink>
                        );
                    })}
                </div>

                <div className="sidebar-group utility-nav">
                    {utilityItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.name}
                                className="nav-item"
                                onClick={onClose}
                                type="button"
                            >
                                <Icon className="nav-icon" size={22} strokeWidth={1.5} />
                                <span className="nav-label">{item.name}</span>
                                <div className="nav-tooltip">{item.name}</div>
                            </button>
                        );
                    })}
                </div>
            </nav>
        </>
    );
};

export default Sidebar;
