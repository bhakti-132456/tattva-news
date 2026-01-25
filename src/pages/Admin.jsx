import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { addStory } from '../utils/storyManager';
import { Lock, Upload, Image as ImageIcon, Mic, CheckCircle, AlertCircle } from 'lucide-react';

const Admin = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        category: 'World',
        author: '',
        content: '',
        hasAudio: false
    });
    const [imageFile, setImageFile] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', 'loading'

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'password') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid password');
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (type === 'image') setImageFile(file);
        if (type === 'audio') setAudioFile(file);
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('loading');

        try {
            let imageUrl = '/placeholder-news.jpg'; // Default
            let audioUrl = '';

            if (imageFile) {
                try {
                    imageUrl = await convertToBase64(imageFile);
                } catch (err) {
                    console.error("Image upload failed", err);
                }
            }

            if (formData.hasAudio && audioFile) {
                // For audio, DataURL might be too large for LS. 
                // We'll try, but fallback to a dummy if it fails or just warn.
                // Actually, for a demo, let's just use a placeholder if it's too big, 
                // or just store the name.
                audioUrl = '/audio-placeholder.mp3';
                // We won't actually store the audio file in LS as it will crash the quota instantly.
                // We'll simulate it.
                console.log("Audio file selected (not stored in LS due to size limits):", audioFile.name);
            }

            const newStory = {
                title: formData.title,
                excerpt: formData.excerpt,
                category: formData.category,
                author: formData.author || 'Editorial Team',
                image: imageUrl,
                hasAudio: formData.hasAudio,
                audioDuration: formData.hasAudio ? '5:00' : null,
                audioSrc: audioUrl,
                contentHTML: formData.content.split('\n').map(p => `<p>${p}</p>`).join(''),
                readTime: `${Math.ceil(formData.content.length / 500)} min read`
            };

            const result = addStory(newStory);

            if (result) {
                setSubmitStatus('success');
                // Reset form
                setFormData({
                    title: '',
                    excerpt: '',
                    category: 'World',
                    author: '',
                    content: '',
                    hasAudio: false
                });
                setImageFile(null);
                setAudioFile(null);
                setTimeout(() => setSubmitStatus(null), 3000);
            } else {
                setSubmitStatus('error');
            }
        } catch (err) {
            console.error(err);
            setSubmitStatus('error');
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <Lock size={48} color="#0F172A" />
                        <h2 style={{ marginTop: '1rem', fontFamily: 'Outfit, sans-serif' }}>Admin Access</h2>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', outline: 'none' }}
                            />
                            {error && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>{error}</p>}
                        </div>
                        <button
                            type="submit"
                            style={{ width: '100%', padding: '0.75rem', background: '#0F172A', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '600' }}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="tattva-app">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="tattva-main">
                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

                <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 className="section-title" style={{ marginBottom: '2rem' }}>Post New Article</h1>

                    {submitStatus === 'success' && (
                        <div style={{ padding: '1rem', background: '#dcfce7', color: '#166534', borderRadius: '0.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CheckCircle size={20} /> Article published successfully!
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '0.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <AlertCircle size={20} /> Failed to publish article. LocalStorage might be full.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                                >
                                    <option value="World">World</option>
                                    <option value="Business">Business</option>
                                    <option value="Tech">Tech</option>
                                    <option value="Opinion">Opinion</option>
                                    <option value="Startups & Tech">Startups & Tech</option>
                                    <option value="Safety Alert">Safety Alert</option>
                                    <option value="Politics">Politics</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Excerpt</label>
                                <textarea
                                    name="excerpt"
                                    value={formData.excerpt}
                                    onChange={handleInputChange}
                                    required
                                    rows={3}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', fontFamily: 'inherit' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Editorial Team"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Cover Image</label>
                                <div style={{ border: '2px dashed #e2e8f0', borderRadius: '0.5rem', padding: '1.5rem', textAlign: 'center', cursor: 'pointer' }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, 'image')}
                                        style={{ display: 'none' }}
                                        id="image-upload"
                                    />
                                    <label htmlFor="image-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                        <ImageIcon size={24} color="#64748B" />
                                        <span style={{ color: '#64748B' }}>{imageFile ? imageFile.name : 'Click to upload image'}</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <input
                                        type="checkbox"
                                        name="hasAudio"
                                        checked={formData.hasAudio}
                                        onChange={handleInputChange}
                                        id="has-audio"
                                    />
                                    <label htmlFor="has-audio" style={{ fontSize: '0.875rem', fontWeight: '600' }}>Includes Audio Story?</label>
                                </div>

                                {formData.hasAudio && (
                                    <div style={{ border: '2px dashed #e2e8f0', borderRadius: '0.5rem', padding: '1.5rem', textAlign: 'center', cursor: 'pointer', background: '#f8fafc' }}>
                                        <input
                                            type="file"
                                            accept="audio/*"
                                            onChange={(e) => handleFileChange(e, 'audio')}
                                            style={{ display: 'none' }}
                                            id="audio-upload"
                                        />
                                        <label htmlFor="audio-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                            <Mic size={24} color="#64748B" />
                                            <span style={{ color: '#64748B' }}>{audioFile ? audioFile.name : 'Click to upload audio file'}</span>
                                        </label>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Article Content</label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    required
                                    rows={10}
                                    placeholder="Write your article here..."
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', fontFamily: 'inherit' }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitStatus === 'loading'}
                                style={{
                                    padding: '1rem',
                                    background: '#0F172A',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    marginTop: '1rem',
                                    opacity: submitStatus === 'loading' ? 0.7 : 1
                                }}
                            >
                                {submitStatus === 'loading' ? 'Publishing...' : 'Publish Article'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Admin;
