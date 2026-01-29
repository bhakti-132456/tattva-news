import React, { useState, useEffect } from 'react';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, X, Maximize2, Minimize2 } from 'lucide-react';

const GlobalPlayer = () => {
    const { currentTrack, isPlaying, isLoading, ttsProgress, togglePlay, audioRef, seekTo, seekToPercent } = useAudio();
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
        const val = Number(e.target.value);
        if (currentTrack?.type === 'tts') {
            seekToPercent(val);
        } else {
            setCurrentTime(val);
            seekTo(val);
        }
    };

    const formatTime = (time) => {
        if (!time) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    if (!currentTrack) return null;

    // Calculate % for TTS seek bar
    const ttsPercent = ttsProgress.total > 0 ? (ttsProgress.current / ttsProgress.total) * 100 : 0;

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
                            {currentTrack.type === 'tts'
                                ? `Section ${ttsProgress.current + 1} of ${ttsProgress.total}`
                                : `${formatTime(currentTime)} / ${currentTrack.duration}`
                            }
                        </div>
                    )}
                </div>

                <div className="gp-controls">
                    {/* Pause button should always be visible if track exists, only loading shows spinner */}
                    <button className="gp-play-btn" onClick={togglePlay}>
                        {isLoading ? (
                            <div className="gp-spinner"></div>
                        ) : (
                            isPlaying ? <Pause size={24} fill="white" color="white" /> : <Play size={24} fill="white" color="white" />
                        )}
                    </button>
                    <button className="gp-expand-btn" onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                    </button>
                </div>
            </div>

            <div className="gp-progress-container" style={{ padding: '0 1rem 0.5rem 1rem' }}>
                <input
                    type="range"
                    min="0"
                    max={currentTrack.type === 'tts' ? 100 : (duration || 100)}
                    value={currentTrack.type === 'tts' ? ttsPercent : currentTime}
                    onChange={handleSeek}
                    className="gp-seek-bar"
                    style={{
                        width: '100%',
                        cursor: 'pointer',
                        accentColor: 'var(--primary)'
                    }}
                />
            </div>
        </div>
    );
};

export default GlobalPlayer;
