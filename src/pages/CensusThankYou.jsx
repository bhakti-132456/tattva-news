import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { CheckCircle } from 'lucide-react';

const CensusThankYou = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to homepage after 5 seconds
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="tattva-app">
            <main className="tattva-main">
                <Header />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)' }}>
                <div style={{ textAlign: 'center', background: 'white', padding: '3rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', maxWidth: '500px', width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <CheckCircle size={64} color="#10b981" />
                    </div>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', color: '#0F172A', marginBottom: '1rem', fontSize: '2rem' }}>
                        Thank You!
                    </h1>
                    <p style={{ color: '#64748B', fontSize: '1.125rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                        Your details for the Sanskrit Census 2026 have been successfully submitted. Your certificate has been downloaded to your device.
                    </p>
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                        You will be automatically redirected to the homepage in a few seconds...
                    </p>
                    <button 
                        onClick={() => navigate('/')}
                        style={{ marginTop: '2rem', padding: '0.75rem 1.5rem', background: '#0F172A', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '600' }}
                    >
                        Return Home Now
                    </button>
                </div>
                </div>
            </main>
        </div>
    );
};

export default CensusThankYou;
