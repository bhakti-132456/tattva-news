import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StatisticsChart from '../components/StatisticsChart';
import { parseStatistics } from '../utils/statisticsParser';
import { Lock, Image as ImageIcon, Mic, CheckCircle, AlertCircle, BarChart2, PieChart } from 'lucide-react';

const AuthorPortal = () => {
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
        hasAudio: false,
        hasInfographics: false,
        infographicType: 'text',
        statisticsText: '',
        chartType: 'bar',
        infographicPosition: 'after-intro'
    });
    const [imageFile, setImageFile] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    const [infographicImageFile, setInfographicImageFile] = useState(null);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [showReview, setShowReview] = useState(false);
    const [previewData, setPreviewData] = useState(null);

    const parsedChartData = useMemo(() => {
        if (formData.hasInfographics && formData.infographicType === 'text' && formData.statisticsText) {
            return parseStatistics(formData.statisticsText);
        }
        return [];
    }, [formData.hasInfographics, formData.infographicType, formData.statisticsText]);

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple mock auth for authors
        if (password === 'author') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid password (try "author")');
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
        if (type === 'infographic') setInfographicImageFile(file);
    };

    const convertToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleReview = async (e) => {
        e.preventDefault();
        let infographicData = null;
        if (formData.hasInfographics) {
            if (formData.infographicType === 'text' && parsedChartData.length > 0) {
                infographicData = {
                    type: 'chart',
                    chartType: formData.chartType,
                    chartData: parsedChartData,
                    position: formData.infographicPosition
                };
            } else if (formData.infographicType === 'image' && infographicImageFile) {
                infographicData = {
                    type: 'image',
                    imageUrl: await convertToBase64(infographicImageFile),
                    position: formData.infographicPosition
                };
            }
        }

        const newStory = {
            title: formData.title,
            excerpt: formData.excerpt,
            category: formData.category,
            author: formData.author || 'Author',
            image: imageFile ? await convertToBase64(imageFile) : '/placeholder-news.jpg',
            hasAudio: formData.hasAudio,
            audioDuration: formData.hasAudio ? '5:00' : null,
            audioSrc: formData.hasAudio ? '/audio-placeholder.mp3' : '',
            hasInfographics: formData.hasInfographics,
            infographicData: infographicData,
            contentHTML: formData.content.split('\n').map(p => `<p>${p}</p>`).join(''),
            readTime: `${Math.ceil(formData.content.length / 500)} min read`
        };

        setPreviewData(newStory);
        setShowReview(true);
    };

    const handleConfirmPublish = async () => {
        setShowReview(false);
        setSubmitStatus('publishing');
        try {
            const { publishToSite } = await import('../utils/storyManager');
            const success = await publishToSite(previewData);
            if (success) {
                setSubmitStatus('success');
                setFormData({
                    title: '',
                    excerpt: '',
                    category: 'World',
                    author: '',
                    content: '',
                    hasAudio: false,
                    hasInfographics: false,
                    infographicType: 'text',
                    statisticsText: '',
                    chartType: 'bar',
                    infographicPosition: 'after-intro'
                });
                setImageFile(null);
                setAudioFile(null);
                setInfographicImageFile(null);
                setTimeout(() => setSubmitStatus(null), 5000);
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
                        <h2 style={{ marginTop: '1rem', fontFamily: 'Outfit, sans-serif' }}>Author Portal</h2>
                        <p style={{ color: '#64748B' }}>Restricted Access: Content Creation Only</p>
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
                <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '3rem' }}>
                    <h1 className="section-title" style={{ marginBottom: '2rem', marginTop: '1rem' }}>Author Dashboard</h1>

                    {submitStatus === 'success' && (
                        <div style={{ padding: '1rem', background: '#dcfce7', color: '#166534', borderRadius: '0.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CheckCircle size={20} /> Article submitted successfully!
                        </div>
                    )}

                    {submitStatus === 'publishing' && (
                        <div style={{ padding: '1rem', background: '#eff6ff', color: '#1e40af', borderRadius: '0.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div className="animate-spin" style={{ width: '20px', height: '20px', border: '2px solid #1e40af', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
                            Submitting article...
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '0.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <AlertCircle size={20} /> Failed to submit article.
                        </div>
                    )}

                    <form onSubmit={handleReview} style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)' }}>
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
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Author Name</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleInputChange}
                                    placeholder="Your Name"
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
                                disabled={submitStatus === 'publishing'}
                                style={{
                                    padding: '1rem',
                                    background: '#0F172A',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    marginTop: '1rem',
                                    opacity: submitStatus === 'publishing' ? 0.7 : 1
                                }}
                            >
                                {submitStatus === 'publishing' ? 'Submitting...' : 'Review & Submit'}
                            </button>
                        </div>
                    </form>

                    {showReview && previewData && (
                        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
                            <div className="animate-fade-in" style={{ background: 'white', width: '100%', maxWidth: '600px', borderRadius: '1rem', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                                <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'white' }}>
                                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem', fontWeight: '700' }}>Review Content</h2>
                                    <button onClick={() => setShowReview(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748B' }}>✕</button>
                                </div>
                                <div style={{ padding: '2rem' }}>
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <span className="category-tag">{previewData.category}</span>
                                        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0.5rem 0', fontFamily: 'Outfit, sans-serif' }}>{previewData.title}</h1>
                                        <p style={{ color: '#64748B', fontSize: '0.875rem' }}>By {previewData.author} • {previewData.readTime}</p>
                                    </div>

                                    {previewData.image && (
                                        <img src={previewData.image} alt="Preview" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '1.5rem' }} />
                                    )}

                                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                                        <p style={{ fontStyle: 'italic', color: '#475569' }}>{previewData.excerpt}</p>
                                    </div>

                                    <div style={{ color: '#334155', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: previewData.contentHTML }} />

                                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                                        <button
                                            onClick={handleConfirmPublish}
                                            style={{ flex: 1, padding: '1rem', background: '#0F172A', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: '700', cursor: 'pointer' }}
                                        >
                                            Confirm Submission
                                        </button>
                                        <button
                                            onClick={() => setShowReview(false)}
                                            style={{ flex: 1, padding: '1rem', background: 'white', color: '#0F172A', border: '1px solid #e2e8f0', borderRadius: '0.5rem', fontWeight: '600', cursor: 'pointer' }}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AuthorPortal;
