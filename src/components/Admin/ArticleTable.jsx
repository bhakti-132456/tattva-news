import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Globe } from 'lucide-react';
import { getAllStories, deleteStory } from '../../utils/storyManager';

const ArticleTable = () => {
    const [stories, setStories] = useState([]);
    const [filter, setFilter] = useState('');
    const [languageFilter, setLanguageFilter] = useState('all'); // 'all', 'en', 'te'

    useEffect(() => {
        setStories(getAllStories());
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this article? This action is local-only for now.')) {
            const success = deleteStory(id);
            if (success) {
                setStories(getAllStories()); // Refresh
            } else {
                alert("Could not delete. Note: You cannot delete static or API-fetched stories in this demo mode.");
            }
        }
    };

    const filteredStories = stories.filter(story => {
        const matchesSearch = story.title.toLowerCase().includes(filter.toLowerCase()) ||
            story.category.toLowerCase().includes(filter.toLowerCase());
        const matchesLang = languageFilter === 'all' || story.language === languageFilter;
        return matchesSearch && matchesLang;
    });

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 className="section-title">Manage Articles</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <select
                        value={languageFilter}
                        onChange={(e) => setLanguageFilter(e.target.value)}
                        style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', outline: 'none' }}
                    >
                        <option value="all">All Languages</option>
                        <option value="en">English</option>
                        <option value="te">Telugu</option>
                    </select>
                    <div style={{ position: 'relative' }}>
                        <Search size={20} color="#94A3B8" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            style={{
                                padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                borderRadius: '0.5rem',
                                border: '1px solid #e2e8f0',
                                outline: 'none',
                                width: '250px'
                            }}
                        />
                    </div>
                </div>
            </div>

            <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#F8FAFC', textAlign: 'left' }}>
                                <th style={{ padding: '1rem', color: '#64748B', fontSize: '0.875rem' }}>Language</th>
                                <th style={{ padding: '1rem', color: '#64748B', fontSize: '0.875rem' }}>Title</th>
                                <th style={{ padding: '1rem', color: '#64748B', fontSize: '0.875rem' }}>Category</th>
                                <th style={{ padding: '1rem', color: '#64748B', fontSize: '0.875rem' }}>Author</th>
                                <th style={{ padding: '1rem', color: '#64748B', fontSize: '0.875rem' }}>Date</th>
                                <th style={{ padding: '1rem', color: '#64748B', fontSize: '0.875rem', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStories.slice(0, 50).map(story => ( // Limit to 50 for perf
                                <tr key={story.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.5rem',
                                            background: story.language === 'en' ? '#DBEAFE' : '#FFEDD5',
                                            color: story.language === 'en' ? '#1E40AF' : '#9A3412',
                                            borderRadius: '0.25rem',
                                            fontSize: '0.75rem',
                                            fontWeight: '600'
                                        }}>
                                            {story.language === 'en' ? 'EN' : 'TE'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', fontWeight: '500', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {story.title}
                                    </td>
                                    <td style={{ padding: '1rem' }}>{story.category}</td>
                                    <td style={{ padding: '1rem' }}>{story.author}</td>
                                    <td style={{ padding: '1rem', color: '#64748B', fontSize: '0.875rem' }}>{story.time}</td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                            {/* Edit disabled for now as full editor sync is complex for imported items */}
                                            {/* <button style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>
                                                <Edit size={16} color="#64748B" />
                                            </button> */}
                                            <button
                                                onClick={() => handleDelete(story.id)}
                                                style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #fee2e2', background: '#fef2f2', cursor: 'pointer' }}
                                            >
                                                <Trash2 size={16} color="#dc2626" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredStories.length > 50 && (
                    <div style={{ padding: '1rem', textAlign: 'center', background: '#F8FAFC', color: '#64748B', fontSize: '0.875rem' }}>
                        Showing first 50 of {filteredStories.length} articles. Use search to find specific items.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArticleTable;
