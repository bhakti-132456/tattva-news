import React from 'react';
import { TrendingUp, Activity, Trophy, DollarSign } from 'lucide-react';

const DashboardWidget = () => {
    return (
        <div className="dashboard-widget animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="widget-card">
                <div className="widget-header">
                    Market Watch <Activity size={16} />
                </div>
                <div className="widget-value positive">
                    24,856.40 <span className="widget-sub">+1.24%</span>
                </div>
                <div className="widget-detail">NIFTY 50 • Live</div>
            </div>

            <div className="widget-card">
                <div className="widget-header">
                    Sensex <TrendingUp size={16} />
                </div>
                <div className="widget-value positive">
                    81,343.12 <span className="widget-sub">+0.98%</span>
                </div>
                <div className="widget-detail">BSE SENSEX • Live</div>
            </div>

            <div className="widget-card">
                <div className="widget-header">
                    Cricket • Live <Trophy size={16} />
                </div>
                <div className="widget-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 600, marginTop: '0.5rem' }}>
                    <span>IND</span> <span>324/4 (48.2)</span>
                </div>
                <div className="widget-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#64748b', marginTop: '0.25rem' }}>
                    <span>AUS</span> <span>289/9 (50.0)</span>
                </div>
                <div className="widget-detail positive" style={{ marginTop: '0.5rem' }}>India won by 35 runs</div>
            </div>

            <div className="widget-card">
                <div className="widget-header">
                    Forex <DollarSign size={16} />
                </div>
                <div className="widget-value negative">
                    ₹84.12 <span className="widget-sub">-0.05%</span>
                </div>
                <div className="widget-detail">USD / INR</div>
            </div>
        </div>
    );
};

export default DashboardWidget;
