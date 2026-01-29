import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import { chunkText, getTTSUrl, isTelugu } from '../utils/ttsUtils';
import { playHDChunk } from '../utils/LocalTTS';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    // Track structure: { title, src, duration, type: 'audio' | 'tts', text: '' }
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Status for TTS Seeking
    const [ttsProgress, setTtsProgress] = useState({ current: 0, total: 0 });

    // Refs for playback control
    const audioRef = useRef(new Audio());
    const synthRef = useRef(window.speechSynthesis);

    // HD TTS specific state
    const ttsQueueRef = useRef([]);
    const currentChunkIndexRef = useRef(0);
    const ttsLangRef = useRef('en');

    useEffect(() => {
        const audio = audioRef.current;

        const handleEnded = () => {
            if (currentTrack?.type === 'tts' && ttsQueueRef.current.length > 0) {
                playNextChunk();
            } else {
                setIsPlaying(false);
            }
        };

        const handleLoadStart = () => setIsLoading(true);
        const handleCanPlay = () => setIsLoading(false);

        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('loadstart', handleLoadStart);
        audio.addEventListener('canplay', handleCanPlay);

        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('loadstart', handleLoadStart);
            audio.removeEventListener('canplay', handleCanPlay);
            audio.pause();
            synthRef.current.cancel();
        };
    }, [currentTrack]);

    const playNextChunk = async () => {
        const nextIndex = currentChunkIndexRef.current + 1;
        if (nextIndex < ttsQueueRef.current.length) {
            currentChunkIndexRef.current = nextIndex;
            setTtsProgress({ current: nextIndex, total: ttsQueueRef.current.length });
            const text = ttsQueueRef.current[nextIndex];
            const url = getTTSUrl(text, ttsLangRef.current);

            try {
                await playHDChunk(url, audioRef);
            } catch (err) {
                console.error("Failed to play next chunk", err);
                setIsPlaying(false);
            }
        } else {
            setIsPlaying(false);
        }
    };

    const playTrack = async (track) => {
        audioRef.current.pause();
        synthRef.current.cancel();

        if (track.type === 'tts') {
            setCurrentTrack(track);
            setIsPlaying(true);

            const lang = isTelugu(track.text) ? 'te' : 'en';
            ttsLangRef.current = lang;

            const chunks = chunkText(track.text);
            ttsQueueRef.current = chunks;
            currentChunkIndexRef.current = 0;
            setTtsProgress({ current: 0, total: chunks.length });

            if (chunks.length > 0) {
                const url = getTTSUrl(chunks[0], lang);
                try {
                    await playHDChunk(url, audioRef);
                } catch (err) {
                    console.warn("HD TTS failed, falling back to native", err);
                    playNativeTTS(track.text);
                }
            }
        } else {
            if (currentTrack?.src === track.src && currentTrack?.type !== 'tts') {
                audioRef.current.play();
                setIsPlaying(true);
            } else {
                audioRef.current.src = track.src;
                audioRef.current.play();
                setCurrentTrack({ ...track, type: 'audio' });
                setIsPlaying(true);
            }
        }
    };

    const seekToPercent = async (percent) => {
        if (currentTrack?.type === 'tts' && ttsQueueRef.current.length > 0) {
            const index = Math.floor((percent / 100) * ttsQueueRef.current.length);
            const safeIndex = Math.min(index, ttsQueueRef.current.length - 1);

            currentChunkIndexRef.current = safeIndex;
            setTtsProgress({ current: safeIndex, total: ttsQueueRef.current.length });

            const text = ttsQueueRef.current[safeIndex];
            const url = getTTSUrl(text, ttsLangRef.current);

            setIsPlaying(true);
            try {
                await playHDChunk(url, audioRef);
            } catch (err) {
                console.error("Seek failed", err);
            }
        }
    };

    const playNativeTTS = (text) => {
        const utterance = new window.SpeechSynthesisUtterance(text);
        const voices = synthRef.current.getVoices();
        const indianVoice = voices.find(v =>
            v.name.includes('Ravi') || v.name.includes('Heera') || v.lang === 'en-IN'
        );
        if (indianVoice) utterance.voice = indianVoice;
        utterance.onend = () => setIsPlaying(false);
        synthRef.current.speak(utterance);
    };

    const pauseTrack = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const resumeTrack = () => {
        audioRef.current.play();
        setIsPlaying(true);
    };

    const togglePlay = () => {
        if (isPlaying) pauseTrack();
        else resumeTrack();
    };

    const seekTo = (time) => {
        if (currentTrack?.type === 'audio' && audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };

    return (
        <AudioContext.Provider value={{
            currentTrack, isPlaying, isLoading, ttsProgress,
            playTrack, pauseTrack, togglePlay, seekTo, seekToPercent, audioRef
        }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => useContext(AudioContext);
