import React from 'react';
import { TrendingUp, Trophy, DollarSign, Activity } from 'lucide-react';

const MarketStrip = () => {
    return (
        <div className="market-strip">
            <div className="market-strip-inner">
                {/* Original Set */}
                <div className="market-card">
                    <div className="market-header">
                        <span className="market-label">MARKET WATCH</span>
                        <Activity size={14} className="market-icon" />
                    </div>
                    <div className="market-value-row">
                        <span className="market-value positive">24,856.40</span>
                        <span className="market-change positive">+1.24%</span>
                    </div>
                </div>

                <div className="market-card">
                    <div className="market-header">
                        <span className="market-label">SENSEX</span>
                        <TrendingUp size={14} className="market-icon" />
                    </div>
                    <div className="market-value-row">
                        <span className="market-value positive">81,343.12</span>
                        <span className="market-change positive">+0.98%</span>
                    </div>
                </div>

                <div className="market-card">
                    <div className="market-header">
                        <span className="market-label">CRICKET • LIVE</span>
                        <Trophy size={14} className="market-icon" />
                    </div>
                    <div className="market-score-row">
                        <div className="team-score">
                            <span className="team-name">IND</span>
                            <span className="score-val">324/4 (48.2)</span>
                        </div>
                        <div className="team-score">
                            <span className="team-name text-muted">AUS</span>
                            <span className="score-val text-muted">289/9 (50.0)</span>
                        </div>
                    </div>
                </div>

                <div className="market-card">
                    <div className="market-header">
                        <span className="market-label">FOREX</span>
                        <DollarSign size={14} className="market-icon" />
                    </div>
                    <div className="market-value-row">
                        <span className="market-value negative">₹84.12</span>
                        <span className="market-change negative">-0.05%</span>
                    </div>
                </div>

                {/* Duplicate Set for Marquee Loop */}
                <div className="market-card">
                    <div className="market-header">
                        <span className="market-label">MARKET WATCH</span>
                        <Activity size={14} className="market-icon" />
                    </div>
                    <div className="market-value-row">
                        <span className="market-value positive">24,856.40</span>
                        <span className="market-change positive">+1.24%</span>
                    </div>
                </div>

                <div className="market-card">
                    <div className="market-header">
                        <span className="market-label">SENSEX</span>
                        <TrendingUp size={14} className="market-icon" />
                    </div>
                    <div className="market-value-row">
                        <span className="market-value positive">81,343.12</span>
                        <span className="market-change positive">+0.98%</span>
                    </div>
                </div>

                <div className="market-card">
                    <div className="market-header">
                        <span className="market-label">CRICKET • LIVE</span>
                        <Trophy size={14} className="market-icon" />
                    </div>
                    <div className="market-score-row">
                        <div className="team-score">
                            <span className="team-name">IND</span>
                            <span className="score-val">324/4 (48.2)</span>
                        </div>
                        <div className="team-score">
                            <span className="team-name text-muted">AUS</span>
                            <span className="score-val text-muted">289/9 (50.0)</span>
                        </div>
                    </div>
                </div>

                <div className="market-card">
                    <div className="market-header">
                        <span className="market-label">FOREX</span>
                        <DollarSign size={14} className="market-icon" />
                    </div>
                    <div className="market-value-row">
                        <span className="market-value negative">₹84.12</span>
                        <span className="market-change negative">-0.05%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketStrip;
