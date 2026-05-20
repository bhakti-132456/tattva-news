import React, { useEffect, useState, useRef } from 'react';
import { Volume2, Loader2, AlertCircle, Play, Pause } from 'lucide-react';

const NewsAudioPlayer = ({ articleId, text, lang }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const utteranceRef = useRef(null);
    const timerRef = useRef(null);

    // Clean up on unmount or when article changes
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [articleId]);

    const togglePlay = () => {
        if (isPlaying) {
            window.speechSynthesis.pause();
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
        } else {
            if (window.speechSynthesis.paused && utteranceRef.current) {
                window.speechSynthesis.resume();
                setIsPlaying(true);
                startProgressTimer();
            } else {
                startSpeaking();
            }
        }
    };

    const startSpeaking = () => {
        window.speechSynthesis.cancel();
        
        // Sanitize text: remove HTML if any, though 'text' prop should be clean
        const cleanText = text.replace(/<[^>]*>?/gm, '');
        
        const utterance = new SpeechSynthesisUtterance(cleanText);
        
        // Set language
        const isTe = lang === 'te';
        utterance.lang = isTe ? 'te-IN' : 'en-US';
        
        // Find a good voice if possible
        const voices = window.speechSynthesis.getVoices();
        if (!isTe) {
            const premiumVoice = voices.find(v => 
                v.lang.toLowerCase().startsWith('en') && 
                (v.name.includes('Google') || v.name.includes('Premium') || v.name.includes('Natural'))
            );
            if (premiumVoice) {
                utterance.voice = premiumVoice;
            } else {
                const anyEnglishVoice = voices.find(v => v.lang.toLowerCase().startsWith('en'));
                if (anyEnglishVoice) utterance.voice = anyEnglishVoice;
            }
        } else {
            const teluguVoice = voices.find(v => v.lang.toLowerCase().startsWith('te'));
            if (teluguVoice) utterance.voice = teluguVoice;
        }

        utterance.onstart = () => {
            setIsPlaying(true);
            startProgressTimer();
        };

        utterance.onend = () => {
            setIsPlaying(false);
            setProgress(100);
            if (timerRef.current) clearInterval(timerRef.current);
        };

        utterance.onerror = (event) => {
            console.error('SpeechSynthesis Error:', event);
            setError("Speech synthesis failed");
            setIsPlaying(false);
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    };

    const startProgressTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        
        // Since Web Speech API doesn't give precise progress easily, 
        // we estimate based on character count and average reading speed (~150 wpm)
        const words = text.split(' ').length;
        const estimatedDurationSeconds = (words / 150) * 60;
        let elapsed = (progress / 100) * estimatedDurationSeconds;

        timerRef.current = setInterval(() => {
            elapsed += 0.5;
            const newProgress = Math.min((elapsed / estimatedDurationSeconds) * 100, 99);
            setProgress(newProgress);
        }, 500);
    };

    const handleSeek = (e) => {
        // Web Speech API doesn't support seeking well, so we just update the UI state
        // but in a real implementation we would have to restart from a specific index.
        const percent = parseFloat(e.target.value);
        setProgress(percent);
    };

    return (
        <div className="audio-player-premium animate-slide-up">
            <div className="player-controls">
                <button 
                    onClick={togglePlay} 
                    className={`play-trigger ${isPlaying ? 'playing' : ''}`}
                    title={isPlaying ? "Pause" : "Listen to article"}
                >
                    {isPlaying ? (
                        <Pause size={20} fill="currentColor" />
                    ) : (
                        <Play size={20} fill="currentColor" style={{ marginLeft: '2px' }} />
                    )}
                </button>

                <div className="player-info">
                    <div className="player-label-row">
                        <span className="player-label">
                            {error ? (
                                <span className="error-text"><AlertCircle size={14} /> {error}</span>
                            ) : (
                                <span>{isPlaying ? 'Now Reading Article...' : 'Listen to this Article'}</span>
                            )}
                        </span>
                        {isPlaying && <div className="audio-visualizer">
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>}
                    </div>
                    <div className="progress-wrapper">
                        <div className="progress-container">
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={progress} 
                                onChange={handleSeek}
                                className="progress-slider"
                            />
                            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="player-meta">
                    <Volume2 size={18} className={isPlaying ? 'text-red animate-pulse' : 'text-navy'} />
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .audio-player-premium {
                    background: white;
                    border: 1px solid #eee;
                    border-radius: 16px;
                    padding: 12px 20px;
                    width: 100%;
                    max-width: 500px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    margin: 1rem 0;
                }
                .audio-player-premium:hover {
                    box-shadow: 0 15px 40px rgba(0,0,0,0.1);
                    border-color: var(--navy);
                    transform: translateY(-2px);
                }
                .player-controls {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                .play-trigger {
                    width: 48px;
                    height: 48px;
                    border-radius: 14px;
                    background: var(--navy);
                    color: white;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    flex-shrink: 0;
                    box-shadow: 0 4px 12px rgba(10, 31, 68, 0.2);
                }
                .play-trigger:hover {
                    background: var(--red);
                    transform: scale(1.05);
                    box-shadow: 0 6px 15px rgba(230, 57, 70, 0.3);
                }
                .play-trigger.playing {
                    background: var(--red);
                }
                .player-info {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .player-label-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .player-label {
                    font-size: 14px;
                    font-weight: 700;
                    color: var(--navy);
                    letter-spacing: -0.01em;
                }
                .error-text {
                    color: #e63946;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .progress-wrapper {
                    padding: 4px 0;
                }
                .progress-container {
                    position: relative;
                    height: 6px;
                    background: #f1f3f5;
                    border-radius: 3px;
                }
                .progress-bar {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    background: linear-gradient(90deg, var(--navy), var(--red));
                    border-radius: 3px;
                    z-index: 1;
                }
                .progress-slider {
                    position: absolute;
                    top: -10px;
                    left: 0;
                    width: 100%;
                    height: 26px;
                    opacity: 0;
                    cursor: pointer;
                    z-index: 2;
                    margin: 0;
                }
                .audio-visualizer {
                    display: flex;
                    align-items: flex-end;
                    gap: 2px;
                    height: 12px;
                }
                .audio-visualizer .bar {
                    width: 3px;
                    background: var(--red);
                    border-radius: 1px;
                    animation: equalize 0.8s infinite ease-in-out;
                }
                .audio-visualizer .bar:nth-child(2) { animation-delay: 0.2s; height: 100%; }
                .audio-visualizer .bar:nth-child(3) { animation-delay: 0.4s; height: 60%; }
                
                @keyframes equalize {
                    0%, 100% { height: 4px; }
                    50% { height: 12px; }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up { animation: slide-up 0.5s ease-out; }
                .text-red { color: var(--red); }
                .text-navy { color: var(--navy); }
            `}} />
        </div>
    );
};

export default NewsAudioPlayer;
