import React, { useState, useEffect } from 'react';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, X, Maximize2, Minimize2 } from 'lucide-react';

const GlobalPlayer = () => {
    const { currentTrack, isPlaying, togglePlay, audioRef, seekTo } = useAudio();
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
        <div className={`global-player ${isExpanded ? 'expanded' : ''}`}>
            <div className="gp-content">
                <div className="gp-info">
                    <div className="gp-label">Now Playing</div>
                    <div className="gp-title">{currentTrack.title}</div>
                    {isExpanded && (
                        <div className="gp-time">
                            {formatTime(currentTime)} / {currentTrack.duration}
                        </div>
                    )}
                </div>

                <div className="gp-controls">
                    <button className="gp-play-btn" onClick={togglePlay}>
                        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
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
                        background: 'var(--primary-light)',
                        width: '100%',
                        borderRadius: '2px',
                        overflow: 'hidden'
                    }}>
                        {isPlaying && <div className="tts-thinking-bar" style={{ width: '100%', height: '100%', background: 'var(--primary)', animation: 'pulse 1.5s infinite' }}></div>}
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
