/**
 * H-HD TTS (Hybrid HD) - Uniform quality, Downloadable, Offline-capable
 */

const CACHE_NAME = 'tattva-voice-cache-v1';

/**
 * Persists an audio chunk to the browser's Cache Storage
 */
const cacheAudio = async (url, blob) => {
    try {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(url, new Response(blob));
    } catch (e) {
        console.warn("Failed to cache audio chunk", e);
    }
};

/**
 * Retrieves an audio chunk from cache or fetches it
 */
const getAudioBlob = async (url) => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(url);

    if (cachedResponse) {
        return await cachedResponse.blob();
    }

    const response = await fetch(url);
    const blob = await response.blob();

    // Save to cache for future "zero lifting"
    await cacheAudio(url, blob);

    return blob;
};

export const playHDChunk = async (url, audioRef) => {
    try {
        const blob = await getAudioBlob(url);
        const blobUrl = URL.createObjectURL(blob);

        audioRef.current.src = blobUrl;
        await audioRef.current.play();

        // Cleanup URL after playing (optional, or wait for next)
        audioRef.current.onended = () => {
            URL.revokeObjectURL(blobUrl);
        };
    } catch (e) {
        console.error("HD Playback failed", e);
        throw e;
    }
};

/**
 * Clears the voice cache (e.g. for updates)
 */
export const clearVoiceCache = async () => {
    return await caches.delete(CACHE_NAME);
};
