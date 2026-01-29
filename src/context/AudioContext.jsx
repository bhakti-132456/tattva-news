import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    // Track structure: { title, src, duration, type: 'audio' | 'tts', text: '' }
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio());
    const synthRef = useRef(window.speechSynthesis);
    const utteranceRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        const handleEnded = () => setIsPlaying(false);
        audio.addEventListener('ended', handleEnded);

        // Handle TTS ended
        const handleTTSEnd = () => setIsPlaying(false);

        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.pause();
            synthRef.current.cancel(); // Stop speaking on unmount
        };
    }, []);

    const playTrack = (track) => {
        // Stop any current playback
        audioRef.current.pause();
        synthRef.current.cancel();

        if (track.type === 'tts') {
            // Text-to-Speech Logic
            setCurrentTrack(track);
            setIsPlaying(true);

            const utterance = new SpeechSynthesisUtterance(track.text);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;

            // Select voice based on language
            // Prioritize Indian English voices for a more natural, localized experience
            const voices = synthRef.current.getVoices();

            // Look for specific high-quality Indian voices or any en-IN voice
            const indianVoice = voices.find(v =>
                v.name.includes('Ravi') ||
                v.name.includes('Heera') ||
                v.name.includes('Kalpana') ||
                v.lang === 'en-IN' ||
                (v.lang === 'hi-IN' && v.name.includes('Google')) // Google Hindi often speaks English well
            );

            if (indianVoice) {
                utterance.voice = indianVoice;
            } else {
                // Fallback to any English voice
                const enVoice = voices.find(v => v.lang.startsWith('en'));
                if (enVoice) utterance.voice = enVoice;
            }

            utterance.onend = () => setIsPlaying(false);
            utteranceRef.current = utterance;

            synthRef.current.speak(utterance);

        } else {
            // Standard Audio Logic
            if (currentTrack?.src === track.src && currentTrack?.type !== 'tts') {
                audioRef.current.play();
                setIsPlaying(true);
            } else {
                audioRef.current.src = track.src;
                audioRef.current.play();
                setCurrentTrack({ ...track, type: 'audio' }); // Ensure type is set
                setIsPlaying(true);
            }
        }
    };

    const pauseTrack = () => {
        if (currentTrack?.type === 'tts') {
            synthRef.current.pause();
        } else {
            audioRef.current.pause();
        }
        setIsPlaying(false);
    };

    const resumeTrack = () => {
        if (currentTrack?.type === 'tts') {
            synthRef.current.resume();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(true);
    };

    const togglePlay = () => {
        if (isPlaying) {
            pauseTrack();
        } else {
            resumeTrack();
        }
    };

    const seekTo = (time) => {
        if (currentTrack?.type === 'audio' && audioRef.current) {
            audioRef.current.currentTime = time;
        }
        // TTS seeking is not natively supported by Web Speech API broadly
    };

    return (
        <AudioContext.Provider value={{ currentTrack, isPlaying, playTrack, pauseTrack, togglePlay, seekTo, audioRef }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => useContext(AudioContext);
