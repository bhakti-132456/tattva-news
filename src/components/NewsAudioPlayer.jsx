import React, { useEffect, useRef, useState } from 'react';
import { Volume2, Loader2, AlertCircle } from 'lucide-react';

const NewsAudioPlayer = ({ articleId, text, lang }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Construct the TTS URL
    // We use the proxy '/tts' which forwards to localhost:3001/tts
    const getAudioUrl = () => {
        const params = new URLSearchParams({
            id: articleId,
            text: text,
            lang: lang
        });
        return `/tts?${params.toString()}`;
    };

    useEffect(() => {
        if (audioRef.current) {
            // When lang or articleId changes, update the source
            // We pause and reset state
            audioRef.current.pause();
            setIsPlaying(false);
            setError(null);

            // Setting the new src will trigger the browser to load it when we play
            // or we can preload it.
            // For instant caching behavior, we rely on the browser's cache after the first load.
            audioRef.current.src = getAudioUrl();
            audioRef.current.load();
        }
    }, [articleId, lang, text]);

    const togglePlay = async () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            setIsLoading(true);
            setError(null);
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (err) {
                console.error("Playback error:", err);
                setError("Failed to play audio");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
    };

    const handleError = (e) => {
        console.error("Audio error:", e);
        setIsLoading(false);
        setIsPlaying(false);
        setError("Audio unavailable");
    };

    return (
        <div className="flex items-center gap-2 p-2 bg-secondary/10 rounded-full w-fit">
            <audio
                ref={audioRef}
                onEnded={handleEnded}
                onError={handleError}
                onCanPlay={() => setIsLoading(false)}
                onWaiting={() => setIsLoading(true)}
                preload="none"
            />

            <button
                onClick={togglePlay}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
                {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
                )}
                <span className="text-sm font-medium">
                    {isPlaying ? 'Listen' : 'Listen to Article'}
                </span>
            </button>

            {error && (
                <div className="text-destructive text-xs flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default NewsAudioPlayer;
