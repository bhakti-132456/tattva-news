import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import { chunkText, getTTSUrl, isTelugu } from '../utils/ttsUtils';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    // Track structure: { title, src, duration, type: 'audio' | 'tts', text: '' }
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Refs for playback control
    const audioRef = useRef(new Audio());
    const synthRef = useRef(window.speechSynthesis);
    const utteranceRef = useRef(null);

    // HD TTS specific state
    const ttsQueueRef = useRef([]);
    const currentChunkIndexRef = useRef(0);
    const ttsLangRef = useRef('en');

    useEffect(() => {
        const audio = audioRef.current;

        const handleEnded = () => {
            if (currentTrack?.type === 'tts' && ttsQueueRef.current.length > 0) {
                // Play next chunk in HD TTS mode
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

    const playNextChunk = () => {
        const nextIndex = currentChunkIndexRef.current + 1;
        if (nextIndex < ttsQueueRef.current.length) {
            currentChunkIndexRef.current = nextIndex;
            const text = ttsQueueRef.current[nextIndex];
            audioRef.current.src = getTTSUrl(text, ttsLangRef.current);
            audioRef.current.play().catch(err => {
                console.error("Failed to play next chunk", err);
                setIsPlaying(false);
            });
        } else {
            setIsPlaying(false);
        }
    };

    const playTrack = (track) => {
        // Stop any current playback
        audioRef.current.pause();
        synthRef.current.cancel();

        if (track.type === 'tts') {
            setCurrentTrack(track);
            setIsPlaying(true);

            // HD TTS ENGINE (Cloud Sequencer)
            // 1. Detect language
            const lang = isTelugu(track.text) ? 'te' : 'en';
            ttsLangRef.current = lang;

            // 2. Chunk text
            const chunks = chunkText(track.text);
            ttsQueueRef.current = chunks;
            currentChunkIndexRef.current = 0;

            // 3. Start first chunk
            if (chunks.length > 0) {
                audioRef.current.src = getTTSUrl(chunks[0], lang);
                audioRef.current.play().catch(err => {
                    console.warn("HD TTS failed, falling back to native", err);
                    playNativeTTS(track.text);
                });
            }
        } else {
            // Standard Audio Logic
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

    const playNativeTTS = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = synthRef.current.getVoices();
        const indianVoice = voices.find(v =>
            v.name.includes('Ravi') || v.name.includes('Heera') || v.lang === 'en-IN'
        );
        if (indianVoice) utterance.voice = indianVoice;
        utterance.onend = () => setIsPlaying(false);
        synthRef.current.speak(utterance);
    };

    const pauseTrack = () => {
        if (currentTrack?.type === 'tts') {
            audioRef.current.pause();
        } else {
            audioRef.current.pause();
        }
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
        <AudioContext.Provider value={{ currentTrack, isPlaying, isLoading, playTrack, pauseTrack, togglePlay, seekTo, audioRef }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => useContext(AudioContext);
