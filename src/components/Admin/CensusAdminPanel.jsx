import React, { useState, useEffect } from 'react';
import { Download, ExternalLink, Image as ImageIcon } from 'lucide-react';

const CensusAdminPanel = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || '';
                const response = await fetch(`${API_URL}/api/census`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSubmissions(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching census data:", err);
                setError(err.message || 'Failed to load data. Ensure API server is running.');
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, []);

    const exportToCSV = () => {
        const headers = ['Date', 'Name', 'Email', 'Phone', 'Proficiency', 'Study Details'];
        const csvContent = [
            headers.join(','),
            ...submissions.map(sub => [
                sub.timestamp ? new Date(sub.timestamp).toLocaleDateString() : 'N/A',
                `"${sub.name || ''}"`,
                `"${sub.email || ''}"`,
                `"${sub.phone || ''}"`,
                `"${sub.proficiency || ''}"`,
                `"${(sub.studyDetails || '').replace(/"/g, '""')}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `Sanskrit_Census_Data_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>
                <div className="animate-spin" style={{ width: '30px', height: '30px', border: '3px solid #0F172A', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 1rem' }}></div>
                Loading census data...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '2rem', background: '#fee2e2', color: '#991b1b', borderRadius: '0.5rem' }}>
                <strong>Error:</strong> {error}
            </div>
        );
    }

    return (
        <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ margin: 0, color: '#0F172A', fontSize: '1.25rem' }}>Sanskrit Census 2026 Submissions</h2>
                    <p style={{ margin: '0.5rem 0 0 0', color: '#64748B', fontSize: '0.875rem' }}>
                        Total Submissions: {submissions.length}
                    </p>
                </div>
                <button
                    onClick={exportToCSV}
                    style={{
                        padding: '0.5rem 1rem',
                        background: '#0F172A',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <Download size={16} /> Export CSV
                </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                            <th style={{ padding: '1rem', color: '#475569', fontWeight: '600', fontSize: '0.875rem' }}>Date</th>
                            <th style={{ padding: '1rem', color: '#475569', fontWeight: '600', fontSize: '0.875rem' }}>Name</th>
                            <th style={{ padding: '1rem', color: '#475569', fontWeight: '600', fontSize: '0.875rem' }}>Contact</th>
                            <th style={{ padding: '1rem', color: '#475569', fontWeight: '600', fontSize: '0.875rem' }}>Proficiency</th>
                            <th style={{ padding: '1rem', color: '#475569', fontWeight: '600', fontSize: '0.875rem' }}>Study Details</th>
                            <th style={{ padding: '1rem', color: '#475569', fontWeight: '600', fontSize: '0.875rem' }}>Photo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>
                                    No submissions found yet.
                                </td>
                            </tr>
                        ) : (
                            submissions.map((sub) => (
                                <tr key={sub.id} style={{ borderBottom: '1px solid #e2e8f0', hover: { background: '#f8fafc' } }}>
                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#64748B' }}>
                                        {sub.timestamp ? new Date(sub.timestamp).toLocaleDateString() : 'Unknown'}
                                    </td>
                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#0F172A', fontWeight: '500' }}>
                                        {sub.name}
                                    </td>
                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#64748B' }}>
                                        <div>{sub.email}</div>
                                        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{sub.phone}</div>
                                    </td>
                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#0F172A' }}>
                                        <span style={{ 
                                            background: '#e0f2fe', 
                                            color: '#0369a1', 
                                            padding: '0.25rem 0.5rem', 
                                            borderRadius: '999px', 
                                            fontSize: '0.75rem', 
                                            fontWeight: '600' 
                                        }}>
                                            {sub.proficiency}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#64748B', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {sub.studyDetails || '-'}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {sub.photoBase64 ? (
                                            <img 
                                                src={sub.photoBase64} 
                                                alt={`Photo of ${sub.name}`}
                                                style={{ 
                                                    width: '48px', 
                                                    height: '48px', 
                                                    objectFit: 'cover', 
                                                    borderRadius: '0.375rem', 
                                                    border: '1px solid #e2e8f0',
                                                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                                                }}
                                                title={`Photo of ${sub.name}`}
                                            />
                                        ) : (
                                            <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>None</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CensusAdminPanel;
