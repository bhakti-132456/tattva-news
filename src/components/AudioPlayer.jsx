import React, { useState, useEffect } from 'react';
import { Play, Pause, Headphones } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const AudioPlayer = ({ title, duration, audioSrc }) => {
    const { currentTrack, isPlaying, playTrack, pauseTrack, seekTo, audioRef } = useAudio();
    const [currentTime, setCurrentTime] = useState(0);
    const [durationSecs, setDurationSecs] = useState(0);

    // Check if THIS specific track is the one playing
    const isCurrentTrack = currentTrack?.src === audioSrc;
    const isThisPlaying = isCurrentTrack && isPlaying;

    useEffect(() => {
        let interval;
        if (isThisPlaying) {
            interval = setInterval(() => {
                if (audioRef.current) {
                    setCurrentTime(audioRef.current.currentTime);
                    setDurationSecs(audioRef.current.duration || 0);
                }
            }, 250);
        }
        return () => clearInterval(interval);
    }, [isThisPlaying, audioRef]);

    const handlePlay = () => {
        if (isThisPlaying) {
            pauseTrack();
        } else {
            playTrack({ title, duration, src: audioSrc });
        }
    };

    const handleSeek = (e) => {
        e.stopPropagation();
        const time = Number(e.target.value);
        seekTo(time);
        setCurrentTime(time);
    };

    const progress = durationSecs ? (currentTime / durationSecs) * 100 : 0;

    return (
        <div className={`premium-audio-card ${isThisPlaying ? 'active' : ''}`}>
            <div className="card-top">
                <div className="audio-badge">
                    <Headphones size={12} /> Deep Dive
                </div>
                <div className="audio-visualizer-bars">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className={`v-bar ${isThisPlaying ? 'animating' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                </div>
            </div>

            <h4 className="audio-card-title">{title}</h4>

            <div className="audio-card-controls">
                <button className={`play-btn-circle ${isThisPlaying ? 'pause' : 'play'}`} onClick={handlePlay}>
                    {isThisPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" style={{ marginLeft: '2px' }} />}
                </button>

                <div className="audio-card-progress">
                    <div className="progress-times">
                        <span>{new Date(currentTime * 1000).toISOString().substr(14, 5)}</span>
                        <span>{duration}</span>
                    </div>
                    <div className="progress-slider-container">
                        <input
                            type="range"
                            min="0"
                            max={durationSecs || 100}
                            value={currentTime}
                            onChange={handleSeek}
                            className="premium-slider"
                        />
                        <div className="premium-progress-track" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .premium-audio-card {
                    background: white;
                    border: 1px solid #eee;
                    border-radius: 16px;
                    padding: 16px;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
                }
                .premium-audio-card.active {
                    border-color: var(--red);
                    box-shadow: 0 10px 25px rgba(230, 57, 70, 0.1);
                }
                .card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                }
                .audio-badge {
                    background: #f1f3f5;
                    color: var(--navy);
                    padding: 4px 8px;
                    border-radius: 6px;
                    font-size: 10px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                .audio-visualizer-bars {
                    display: flex;
                    gap: 2px;
                    height: 12px;
                    align-items: flex-end;
                }
                .v-bar {
                    width: 2px;
                    background: var(--red);
                    height: 4px;
                }
                .v-bar.animating {
                    animation: bar-dance 1s infinite ease-in-out;
                }
                @keyframes bar-dance {
                    0%, 100% { height: 4px; }
                    50% { height: 12px; }
                }
                .audio-card-title {
                    font-size: 15px;
                    font-weight: 700;
                    color: var(--navy);
                    margin-bottom: 16px;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .audio-card-controls {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .play-btn-circle {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: var(--navy);
                    color: white;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    flex-shrink: 0;
                }
                .play-btn-circle:hover {
                    background: var(--red);
                    transform: scale(1.1);
                }
                .audio-card-progress {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .progress-times {
                    display: flex;
                    justify-content: space-between;
                    font-size: 10px;
                    font-weight: 600;
                    color: #999;
                }
                .progress-slider-container {
                    position: relative;
                    height: 4px;
                    background: #f1f3f5;
                    border-radius: 2px;
                }
                .premium-progress-track {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    background: var(--red);
                    border-radius: 2px;
                    z-index: 1;
                }
                .premium-slider {
                    position: absolute;
                    top: -8px;
                    left: 0;
                    width: 100%;
                    height: 20px;
                    opacity: 0;
                    cursor: pointer;
                    z-index: 2;
                    margin: 0;
                }
            `}} />
        </div>
    );
};

export default AudioPlayer;
