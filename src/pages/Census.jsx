import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import jsPDF from 'jspdf';

const Census = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        proficiency: 'Beginner',
        studyDetails: ''
    });
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState('');
    const [status, setStatus] = useState('idle'); // idle, uploading, generating, error
    const [errorMsg, setErrorMsg] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrorMsg('Please upload a valid image file.');
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setErrorMsg('Image size must be less than 5MB.');
                return;
            }
            setPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
            setErrorMsg('');
        }
    };

    const generateCertificate = async (userData) => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Add border
        doc.setLineWidth(2);
        doc.setDrawColor(15, 23, 42); // Navy border
        doc.rect(10, 10, 277, 190);
        
        doc.setLineWidth(0.5);
        doc.setDrawColor(226, 232, 240); // Inner light border
        doc.rect(14, 14, 269, 182);

        // Header
        doc.setFontSize(28);
        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'bold');
        doc.text('TATTVA NEWS', 148, 40, { align: 'center' });
        
        doc.setFontSize(16);
        doc.setTextColor(100, 116, 139);
        doc.setFont('helvetica', 'normal');
        doc.text('Certificate of Participation', 148, 55, { align: 'center' });

        doc.setFontSize(36);
        doc.setTextColor(239, 68, 68); // Red color
        doc.setFont('times', 'bolditalic');
        doc.text('SANSKRIT CENSUS 2026', 148, 70, { align: 'center' });

        // Add User Photo (30x30 mm, centered)
        if (userData.photoBase64) {
            try {
                // jsPDF can auto-detect format from Data URL
                doc.addImage(userData.photoBase64, 133, 80, 30, 30);
                
                // Add a small border around the image
                doc.setDrawColor(15, 23, 42);
                doc.setLineWidth(0.5);
                doc.rect(133, 80, 30, 30);
            } catch (e) {
                console.error("Failed to add image to PDF", e);
            }
        }

        // Content
        doc.setFontSize(18);
        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'normal');
        doc.text('This is to certify that', 148, 120, { align: 'center' });

        doc.setFontSize(32);
        doc.setFont('helvetica', 'bold');
        doc.text(userData.name, 148, 135, { align: 'center' });

        doc.setFontSize(16);
        doc.setFont('helvetica', 'normal');
        doc.text(`has successfully participated in the Sanskrit Census 2026`, 148, 150, { align: 'center' });
        doc.text(`Proficiency Level: ${userData.proficiency}`, 148, 160, { align: 'center' });

        // Signature & Date
        doc.setFontSize(12);
        doc.setTextColor(100, 116, 139);
        const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        doc.text(`Date: ${dateStr}`, 40, 180);
        
        try {
            // Fetch logo and convert to base64
            const response = await fetch('/logo-new.png');
            const blob = await response.blob();
            const logoBase64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
            
            // Add logo instead of signature
            doc.addImage(logoBase64, 'PNG', 225, 160, 30, 30);
        } catch (e) {
            console.error("Failed to add logo", e);
            // Fallback to signature line
            doc.setLineWidth(0.5);
            doc.setDrawColor(15, 23, 42);
            doc.line(220, 175, 260, 175);
            doc.text('Authorized Signature', 240, 180, { align: 'center' });
        }

        // Save
        doc.save(`Sanskrit_Census_2026_${userData.name.replace(/\s+/g, '_')}.pdf`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!photo) {
            setErrorMsg('Please upload a photo to continue.');
            return;
        }

        try {
            setStatus('uploading');
            setErrorMsg('');

            // 1. Save Data to SQLite API
            const API_URL = import.meta.env.VITE_API_URL || '';
            const response = await fetch(`${API_URL}/api/census`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    photoBase64: photoPreview
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save submission. Please try again.');
            }

            // 2. Generate PDF Certificate
            setStatus('generating');
            await generateCertificate({
                ...formData,
                photoBase64: photoPreview
            });

            // 3. Redirect
            navigate('/census/thank-you');

        } catch (err) {
            console.error("Submission Error: ", err);
            setStatus('error');
            setErrorMsg(err.message || 'An error occurred during submission. Please try again.');
        }
    };

    return (
        <div className="tattva-app">
            <main className="tattva-main">
                <Header />
                <div style={{ padding: '3rem 1rem' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', borderRadius: '1rem', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 style={{ fontFamily: 'Outfit, sans-serif', color: '#0F172A', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                            Sanskrit Census 2026
                        </h1>
                        <p style={{ color: '#64748B', fontSize: '1.125rem' }}>
                            Join the movement. Register your proficiency and receive your official certificate.
                        </p>
                    </div>

                    {errorMsg && (
                        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <AlertCircle size={20} /> {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#0F172A' }}>Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter your full name as it should appear on certificate"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none' }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#0F172A' }}>Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="+1 234 567 8900"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#0F172A' }}>Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="you@example.com"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#0F172A' }}>Sanskrit Proficiency Level *</label>
                            <select
                                name="proficiency"
                                value={formData.proficiency}
                                onChange={handleInputChange}
                                required
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none', background: 'white' }}
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Fluent">Fluent</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#0F172A' }}>Study Details (Optional)</label>
                            <textarea
                                name="studyDetails"
                                value={formData.studyDetails}
                                onChange={handleInputChange}
                                rows={3}
                                placeholder="Where/what have you studied in Sanskrit?"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none', fontFamily: 'inherit' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#0F172A' }}>Upload Photo *</label>
                            <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '0.75rem' }}>Used for internal records only. Max 5MB.</p>
                            
                            <div style={{ border: '2px dashed #cbd5e1', borderRadius: '0.5rem', padding: '2rem', textAlign: 'center', background: '#f8fafc', position: 'relative' }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                                />
                                {photoPreview ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src={photoPreview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', marginBottom: '1rem', border: '2px solid white', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                                        <span style={{ color: '#0F172A', fontWeight: '500' }}>{photo.name}</span>
                                        <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem', cursor: 'pointer' }}>Change Photo</span>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                        <Upload size={32} color="#94a3b8" />
                                        <span style={{ color: '#0F172A', fontWeight: '500' }}>Click or drag photo here</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'uploading' || status === 'generating'}
                            style={{ 
                                width: '100%', 
                                padding: '1rem', 
                                background: (status === 'uploading' || status === 'generating') ? '#94a3b8' : '#0F172A', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '0.5rem', 
                                cursor: (status === 'uploading' || status === 'generating') ? 'not-allowed' : 'pointer', 
                                fontWeight: '600',
                                fontSize: '1.125rem',
                                marginTop: '1rem',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {status === 'uploading' && <div className="animate-spin" style={{ width: '20px', height: '20px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%' }}></div>}
                            {status === 'generating' && <FileText size={20} />}
                            {status === 'uploading' ? 'Uploading Data...' : status === 'generating' ? 'Generating Certificate...' : 'Submit & Download Certificate'}
                        </button>
                    </form>
                </div>
                </div>
            </main>
        </div>
    );
};

export default Census;
