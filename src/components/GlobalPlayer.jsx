import React, { useState, useEffect } from 'react';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, X, Maximize2, Minimize2 } from 'lucide-react';

const GlobalPlayer = () => {
    const { currentTrack, isPlaying, isLoading, togglePlay, audioRef, seekTo } = useAudio();
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        const updateProgress = () => {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration || 0);
        };
        audio.addEventListener('timeupdate', updateProgress);
        return () => audio.removeEventListener('timeupdate', updateProgress);
    }, [audioRef]);

    const handleSeek = (e) => {
        const time = Number(e.target.value);
        setCurrentTime(time);
        seekTo(time);
    };

    const formatTime = (time) => {
        if (!time) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    if (!currentTrack) return null;

    return (
        <div className={`global-player ${isExpanded ? 'expanded' : ''} ${isLoading ? 'is-loading' : ''}`}>
            <div className="gp-content">
                <div className="gp-info">
                    <div className="gp-label">
                        {currentTrack.type === 'tts' ? 'HD Narrating' : 'Now Playing'}
                        {isLoading && <span className="gp-loading-text"> • Buffering HD Voice...</span>}
                    </div>
                    <div className="gp-title">{currentTrack.title}</div>
                    {isExpanded && (
                        <div className="gp-time">
                            {currentTrack.type === 'tts' ? 'HD Stream' : `${formatTime(currentTime)} / ${currentTrack.duration}`}
                        </div>
                    )}
                </div>

                <div className="gp-controls">
                    <button className="gp-play-btn" onClick={togglePlay} disabled={isLoading}>
                        {isLoading ? (
                            <div className="gp-spinner"></div>
                        ) : (
                            isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />
                        )}
                    </button>
                    <button className="gp-expand-btn" onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    </button>
                </div>
            </div>

            <div className="gp-progress-container">
                {currentTrack.type === 'tts' ? (
                    <div className="gp-seek-bar-placeholder" style={{
                        height: '4px',
                        background: 'rgba(255,255,255,0.1)',
                        width: '100%',
                        borderRadius: '0',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        {(isPlaying || isLoading) && (
                            <div
                                className={`tts-thinking-bar ${isLoading ? 'loading' : ''}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    background: 'var(--primary)',
                                    animation: isLoading ? 'shimmer 1s infinite linear' : 'pulse 1.5s infinite'
                                }}
                            ></div>
                        )}
                    </div>
                ) : (
                    <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="gp-seek-bar"
                    />
                )}
            </div>
        </div>
    );
};

export default GlobalPlayer;
