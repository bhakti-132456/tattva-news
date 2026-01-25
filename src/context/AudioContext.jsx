import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null); // { title, src, duration }
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio());

    useEffect(() => {
        const audio = audioRef.current;

        const handleEnded = () => setIsPlaying(false);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.pause();
        };
    }, []);

    const playTrack = (track) => {
        if (currentTrack?.src === track.src) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.src = track.src;
            audioRef.current.play();
            setCurrentTrack(track);
            setIsPlaying(true);
        }
    };

    const pauseTrack = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const togglePlay = () => {
        if (isPlaying) pauseTrack();
        else if (currentTrack) playTrack(currentTrack);
    };

    const seekTo = (time) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };

    return (
        <AudioContext.Provider value={{ currentTrack, isPlaying, playTrack, pauseTrack, togglePlay, seekTo, audioRef }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => useContext(AudioContext);
