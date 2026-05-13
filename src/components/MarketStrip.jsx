import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const MarketItem = ({ label, value, change, isPositive }) => (
    <div className="market-item-modern">
        <span className="market-item-label">{label}</span>
        <div className={`market-item-stats ${isPositive ? 'up' : 'down'}`}>
            <span className="market-item-value">{value}</span>
            <span className="market-item-change">
                {isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {change}
            </span>
        </div>
    </div>
);

const MarketStrip = () => {
    const markets = [
        { label: 'NIFTY 50', value: '24,856.40', change: '+1.24%', isPositive: true },
        { label: 'SENSEX', value: '81,343.12', change: '+0.98%', isPositive: true },
        { label: 'NASDAQ', value: '17,861.20', change: '-0.45%', isPositive: false },
        { label: 'GOLD', value: '72,450.00', change: '+0.12%', isPositive: true },
        { label: 'BITCOIN', value: '$68,240', change: '+2.45%', isPositive: true },
        { label: 'CRUDE OIL', value: '$78.45', change: '-1.12%', isPositive: false },
    ];

    const forex = [
        { label: 'USD/INR', value: '84.12', change: '-0.05%', isPositive: false },
        { label: 'EUR/INR', value: '91.45', change: '+0.21%', isPositive: true },
        { label: 'GBP/INR', value: '107.30', change: '-0.12%', isPositive: false },
        { label: 'JPY/INR', value: '0.56', change: '+0.08%', isPositive: true },
        { label: 'AED/INR', value: '22.90', change: '0.00%', isPositive: true },
    ];

    return (
        <div className="premium-market-bar">
            <div className="market-label-tag">MARKETS</div>
            <div className="market-scroll-container">
                <div className="market-track">
                    {markets.map((m, i) => <MarketItem key={i} {...m} />)}
                    {/* Duplicate for seamless loop */}
                    {markets.map((m, i) => <MarketItem key={`d-${i}`} {...m} />)}
                </div>
            </div>
            
            <div className="forex-label-tag">FOREX</div>
            <div className="forex-scroll-container">
                <div className="forex-track">
                    {forex.map((f, i) => (
                        <div key={i} className="forex-item">
                            <span className="forex-pair">{f.label}</span>
                            <span className={`forex-val ${f.isPositive ? 'up' : 'down'}`}>₹{f.value}</span>
                        </div>
                    ))}
                    {forex.map((f, i) => (
                        <div key={`d-${i}`} className="forex-item">
                            <span className="forex-pair">{f.label}</span>
                            <span className={`forex-val ${f.isPositive ? 'up' : 'down'}`}>₹{f.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .premium-market-bar {
                    display: flex;
                    align-items: center;
                    background: white;
                    border-bottom: 1px solid #eee;
                    height: 50px;
                    overflow: hidden;
                    font-family: 'Inter', sans-serif;
                    position: sticky;
                    top: 64px;
                    z-index: 90;
                }
                .market-label-tag, .forex-label-tag {
                    background: var(--navy);
                    color: white;
                    font-size: 10px;
                    font-weight: 800;
                    padding: 0 16px;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    letter-spacing: 1.5px;
                    z-index: 100;
                    position: relative;
                }
                .forex-label-tag { 
                    background: var(--red);
                    margin-left: 20px;
                }
                .forex-label-tag::before {
                    content: '';
                    position: absolute;
                    left: -20px;
                    top: 0;
                    border-style: solid;
                    border-width: 0 0 50px 20px;
                    border-color: transparent transparent var(--red) transparent;
                }

                .market-scroll-container, .forex-scroll-container {
                    flex-grow: 1;
                    overflow: hidden;
                    position: relative;
                    height: 100%;
                }

                .market-track, .forex-track {
                    display: flex;
                    align-items: center;
                    animation: marquee-scroll 60s linear infinite;
                    width: max-content;
                    height: 100%;
                }
                .forex-track { animation-duration: 40s; }

                .market-item-modern {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin: 0 25px;
                    white-space: nowrap;
                }

                .market-item-label {
                    font-size: 11px;
                    font-weight: 800;
                    color: var(--navy);
                    letter-spacing: 0.5px;
                }

                .market-item-stats {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .market-item-value {
                    font-size: 14px;
                    font-weight: 700;
                    color: #111;
                }

                .market-item-change {
                    font-size: 11px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                }

                .up .market-item-value, .up .market-item-change { color: #188038; }
                .down .market-item-value, .down .market-item-change { color: #d93025; }

                .forex-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin: 0 25px;
                    font-size: 13px;
                    font-weight: 700;
                }
                .forex-pair { color: #5f6368; font-size: 11px; }
                .forex-val.up { color: #188038; }
                .forex-val.down { color: #d93025; }

                @keyframes marquee-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .premium-market-bar:hover .market-track, 
                .premium-market-bar:hover .forex-track {
                    animation-play-state: paused;
                }
            `}} />
        </div>
    );
};

export default MarketStrip;
