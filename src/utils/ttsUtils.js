/**
 * Detects if the text contains Telugu characters
 * @param {string} text 
 * @returns {boolean}
 */
export const isTelugu = (text) => {
    // Unicode range for Telugu: 0C00–0C7F
    const teluguRegex = /[\u0C00-\u0C7F]/;
    return teluguRegex.test(text);
};

/**
 * Splits text into chunks suitable for TTS engines (usually < 200 chars)
 * respecting sentence boundaries.
 * @param {string} text 
 * @param {number} maxLen 
 * @returns {string[]}
 */
export const chunkText = (text, maxLen = 180) => {
    if (!text) return [];

    // Clean text: remove extra whitespace and newlines
    const cleanText = text.replace(/\s+/g, ' ').trim();

    // Split by common sentence terminators but keep them
    // Supports English (.!?) and generic sentence breaks
    const sentences = cleanText.split(/(?<=[.!?|])\s+/);

    const chunks = [];
    let currentChunk = "";

    sentences.forEach(sentence => {
        if ((currentChunk + sentence).length < maxLen) {
            currentChunk += (currentChunk ? " " : "") + sentence;
        } else {
            if (currentChunk) chunks.push(currentChunk);

            // If the sentence itself is too long, split it by commas or spaces
            if (sentence.length > maxLen) {
                const subParts = sentence.split(/(?<=[,])\s+/);
                subParts.forEach(part => {
                    if ((currentChunk + part).length < maxLen) {
                        currentChunk = part;
                    } else {
                        if (currentChunk) chunks.push(currentChunk);
                        // Force split longest parts
                        let remaining = part;
                        while (remaining.length > maxLen) {
                            chunks.push(remaining.substring(0, maxLen));
                            remaining = remaining.substring(maxLen);
                        }
                        currentChunk = remaining;
                    }
                });
            } else {
                currentChunk = sentence;
            }
        }
    });

    if (currentChunk) chunks.push(currentChunk);

    return chunks;
};

/**
 * Gets the Google TTS URL for a specific chunk and language
 * @param {string} text 
 * @param {string} lang 'en' | 'te'
 * @returns {string}
 */
export const getTTSUrl = (text, lang = 'en') => {
    const speechLang = lang === 'te' ? 'te' : 'en';
    const encodedText = encodeURIComponent(text);
    return `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=${speechLang}&client=tw-ob`;
};
