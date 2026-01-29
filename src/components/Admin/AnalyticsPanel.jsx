import React from 'react';
import { BarChart, Clock, Users, MousePointer, ArrowUp, ArrowDown } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
                <p style={{ color: '#64748B', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>{title}</p>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#0F172A', margin: 0 }}>{value}</h3>
            </div>
            <div style={{ padding: '0.75rem', background: '#F1F5F9', borderRadius: '0.75rem' }}>
                <Icon size={24} color="#334155" />
            </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
            {trend === 'up' ? (
                <span style={{ color: '#16a34a', display: 'flex', alignItems: 'center', fontWeight: '600' }}>
                    <ArrowUp size={16} /> {change}
                </span>
            ) : (
                <span style={{ color: '#dc2626', display: 'flex', alignItems: 'center', fontWeight: '600' }}>
                    <ArrowDown size={16} /> {change}
                </span>
            )}
            <span style={{ color: '#94A3B8' }}>vs last month</span>
        </div>
    </div>
);

const AnalyticsPanel = () => {
    // Mock Data for Demo
    return (
        <div className="animate-fade-in">
            <h2 className="section-title" style={{ marginBottom: '2rem' }}>Platform Analytics</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <StatCard
                    title="Total Site Visits"
                    value="124,592"
                    change="12%"
                    trend="up"
                    icon={Users}
                />
                <StatCard
                    title="Avg. Time on Page"
                    value="4m 32s"
                    change="8%"
                    trend="up"
                    icon={Clock}
                />
                <StatCard
                    title="Article Clicks"
                    value="89,400"
                    change="5%"
                    trend="down"
                    icon={MousePointer}
                />
                <StatCard
                    title="Active Readers"
                    value="1,204"
                    change="24%"
                    trend="up"
                    icon={BarChart}
                />
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Top Performing Articles</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                                <th style={{ padding: '1rem', color: '#64748B', fontSize: '0.875rem' }}>Article Title</th>
                                <th style={{ padding: '1rem', color: '#64748B', fontSize: '0.875rem' }}>Category</th>
                                <th style={{ padding: '1rem', color: '#64748B', fontSize: '0.875rem' }}>Views</th>
                                <th style={{ padding: '1rem', color: '#64748B', fontSize: '0.875rem' }}>Avg. Read</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>Global Markets Rally as Tech Stocks Surge</td>
                                <td style={{ padding: '1rem' }}><span className="category-tag" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>Business</span></td>
                                <td style={{ padding: '1rem' }}>45,200</td>
                                <td style={{ padding: '1rem' }}>3m 45s</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>The Future of AI in Healthcare</td>
                                <td style={{ padding: '1rem' }}><span className="category-tag" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>Tech</span></td>
                                <td style={{ padding: '1rem' }}>32,105</td>
                                <td style={{ padding: '1rem' }}>6m 12s</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>Sustainable Living: A Practical Guide</td>
                                <td style={{ padding: '1rem' }}><span className="category-tag" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>World</span></td>
                                <td style={{ padding: '1rem' }}>28,940</td>
                                <td style={{ padding: '1rem' }}>4m 20s</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPanel;
