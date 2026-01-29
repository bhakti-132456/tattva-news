import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { NewsCard } from '../components/Cards';
import { getAllStories } from '../utils/storyManager';

import { getStoriesByLanguage } from '../utils/storyManager';
import { useLanguage } from '../context/LanguageContext';

const CategoryPage = () => {
    const { language } = useLanguage();
    const stories = getStoriesByLanguage(language);
    const { cat } = useParams();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Filter stories
    // Handle case-insensitive matching
    const categoryStories = stories.filter(s =>
        s.category.toLowerCase() === cat.toLowerCase() ||
        (cat.toLowerCase() === 'world' && s.category === 'World') ||
        (cat.toLowerCase() === 'business' && s.category === 'Business') ||
        (cat.toLowerCase() === 'tech' && (s.category === 'Tech' || s.category === 'Startups & Tech'))
    );

    const prettyCat = cat.charAt(0).toUpperCase() + cat.slice(1);

    return (
        <div className="tattva-app">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="tattva-main">
                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

                <div className="animate-fade-in">
                    <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '2rem', textTransform: 'capitalize' }}>
                        {cat} News
                    </h1>

                    {categoryStories.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                            {categoryStories.map(story => (
                                <NewsCard key={story.id} story={story} />
                            ))}
                        </div>
                    ) : (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            No stories found in {prettyCat}.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CategoryPage;
