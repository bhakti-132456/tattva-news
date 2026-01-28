import React from 'react';
import { formatValue, getTotal, getMax } from '../utils/statisticsParser';

/**
 * StatisticsChart Component
 * Renders custom SVG-based charts without external libraries
 */
const StatisticsChart = ({ data, chartType = 'bar', title = 'Statistics' }) => {
    if (!data || data.length === 0) {
        return (
            <div className="stats-chart-empty">
                <p>No data available to display</p>
            </div>
        );
    }

    const renderPieChart = () => {
        const total = getTotal(data);
        let currentAngle = 0;
        const size = 200;
        const center = size / 2;
        const radius = 80;

        const slices = data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const startAngle = currentAngle;
            currentAngle += angle;

            // Calculate path for pie slice
            const startRad = (startAngle - 90) * (Math.PI / 180);
            const endRad = (currentAngle - 90) * (Math.PI / 180);

            const x1 = center + radius * Math.cos(startRad);
            const y1 = center + radius * Math.sin(startRad);
            const x2 = center + radius * Math.cos(endRad);
            const y2 = center + radius * Math.sin(endRad);

            const largeArc = angle > 180 ? 1 : 0;

            const pathD = [
                `M ${center} ${center}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
                'Z'
            ].join(' ');

            return (
                <path
                    key={index}
                    d={pathD}
                    fill={item.color}
                    className="pie-slice"
                    style={{ animationDelay: `${index * 0.1}s` }}
                />
            );
        });

        return (
            <div className="chart-container pie-chart">
                <svg viewBox={`0 0 ${size} ${size}`} className="pie-svg">
                    {slices}
                </svg>
                <div className="chart-legend">
                    {data.map((item, index) => (
                        <div key={index} className="legend-item">
                            <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                            <span className="legend-label">{item.label}</span>
                            <span className="legend-value">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderBarChart = () => {
        const maxValue = getMax(data);
        const barHeight = 32;
        const gap = 12;
        const chartHeight = data.length * (barHeight + gap);
        const labelWidth = 100;
        const valueWidth = 60;
        const barMaxWidth = 200;

        return (
            <div className="chart-container bar-chart">
                <svg
                    viewBox={`0 0 ${labelWidth + barMaxWidth + valueWidth + 20} ${chartHeight}`}
                    className="bar-svg"
                    style={{ width: '100%', height: `${chartHeight}px` }}
                >
                    {data.map((item, index) => {
                        const barWidth = (item.value / maxValue) * barMaxWidth;
                        const y = index * (barHeight + gap);

                        return (
                            <g key={index} className="bar-group" style={{ animationDelay: `${index * 0.1}s` }}>
                                <text
                                    x={labelWidth - 8}
                                    y={y + barHeight / 2 + 4}
                                    textAnchor="end"
                                    className="bar-label"
                                >
                                    {item.label}
                                </text>
                                <rect
                                    x={labelWidth}
                                    y={y}
                                    width={barWidth}
                                    height={barHeight}
                                    fill={item.color}
                                    rx={4}
                                    className="bar-rect"
                                />
                                <text
                                    x={labelWidth + barWidth + 8}
                                    y={y + barHeight / 2 + 4}
                                    className="bar-value"
                                >
                                    {formatValue(item.value)}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        );
    };

    const renderHistogram = () => {
        const maxValue = getMax(data);
        const barWidth = 40;
        const gap = 8;
        const chartWidth = data.length * (barWidth + gap);
        const chartHeight = 200;
        const bottomPadding = 40;

        return (
            <div className="chart-container histogram-chart">
                <svg
                    viewBox={`0 0 ${chartWidth + 40} ${chartHeight + bottomPadding}`}
                    className="histogram-svg"
                >
                    {data.map((item, index) => {
                        const barHeight = (item.value / maxValue) * (chartHeight - 20);
                        const x = 20 + index * (barWidth + gap);
                        const y = chartHeight - barHeight;

                        return (
                            <g key={index} className="histogram-group" style={{ animationDelay: `${index * 0.1}s` }}>
                                <rect
                                    x={x}
                                    y={y}
                                    width={barWidth}
                                    height={barHeight}
                                    fill={item.color}
                                    rx={4}
                                    className="histogram-bar"
                                />
                                <text
                                    x={x + barWidth / 2}
                                    y={y - 8}
                                    textAnchor="middle"
                                    className="histogram-value"
                                >
                                    {formatValue(item.value)}
                                </text>
                                <text
                                    x={x + barWidth / 2}
                                    y={chartHeight + 20}
                                    textAnchor="middle"
                                    className="histogram-label"
                                >
                                    {item.label}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        );
    };

    const renderLineChart = () => {
        const maxValue = getMax(data);
        const chartWidth = 360;
        const chartHeight = 200;
        const padding = { top: 20, right: 20, bottom: 40, left: 50 };
        const innerWidth = chartWidth - padding.left - padding.right;
        const innerHeight = chartHeight - padding.top - padding.bottom;

        const points = data.map((item, index) => {
            const x = padding.left + (index / (data.length - 1 || 1)) * innerWidth;
            const y = padding.top + innerHeight - (item.value / maxValue) * innerHeight;
            return { x, y, ...item };
        });

        const linePath = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');

        return (
            <div className="chart-container line-chart">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="line-svg">
                    {/* Grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                        <line
                            key={i}
                            x1={padding.left}
                            y1={padding.top + innerHeight * (1 - ratio)}
                            x2={chartWidth - padding.right}
                            y2={padding.top + innerHeight * (1 - ratio)}
                            className="grid-line"
                        />
                    ))}

                    {/* Line path */}
                    <path d={linePath} className="data-line" fill="none" stroke="#3B82F6" strokeWidth="3" />

                    {/* Data points */}
                    {points.map((p, i) => (
                        <g key={i} className="point-group" style={{ animationDelay: `${i * 0.1}s` }}>
                            <circle cx={p.x} cy={p.y} r="6" fill="#3B82F6" className="data-point" />
                            <text x={p.x} y={chartHeight - 10} textAnchor="middle" className="line-label">
                                {p.label}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>
        );
    };

    const renderChart = () => {
        switch (chartType) {
            case 'pie':
                return renderPieChart();
            case 'histogram':
                return renderHistogram();
            case 'line':
                return renderLineChart();
            case 'bar':
            default:
                return renderBarChart();
        }
    };

    return (
        <div className="statistics-chart-wrapper">
            {title && <h3 className="chart-title">{title}</h3>}
            {renderChart()}
        </div>
    );
};

export default StatisticsChart;
