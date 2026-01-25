import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
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
        e.stopPropagation(); // Prevent event from bubbling up to parent elements
        const time = Number(e.target.value);
        seekTo(time);
        setCurrentTime(time);
    };

    return (
        <div className="audio-player-card">

            <div className="audio-icon-box">
                <div className={`audio-visualizer ${isThisPlaying ? 'playing' : ''}`}>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="bar"></div>
                    ))}
                </div>
            </div>

            <div className="audio-info">
                <div className="audio-label">NotebookLM • Deep Dive</div>
                <div className="audio-title">{title}</div>

                <div className="audio-controls">
                    <button className="ctrl-btn main" onClick={handlePlay}>
                        {isThisPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                    </button>

                    <div className="progress-bar" onClick={(e) => e.stopPropagation()}>
                        {isThisPlaying ? (
                            <input
                                type="range"
                                min="0"
                                max={durationSecs || 100}
                                value={currentTime}
                                onChange={handleSeek}
                                className="audio-seek-bar"
                            />
                        ) : (
                            <div className="progress-fill" style={{ width: '0%' }}></div>
                        )}
                    </div>

                    <span className="time-stamp">
                        {duration}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
