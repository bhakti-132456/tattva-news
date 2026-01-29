/**
 * Decodes HTML entities and strips unwanted tags/artifacts
 * @param {string} html
 * @returns {string}
 */
export const decodeHtml = (html) => {
    if (!html) return '';
    if (typeof html !== 'string') return String(html);

    // 1. Remove [OBJ] and similar artifacts
    let clean = html.replace(/\[OBJ\]/gi, '').replace(/\[obj\]/gi, '');

    // 2. Simple HTML Entity Decoding
    // Use try-catch for DOM operations just in case
    try {
        const txt = document.createElement("textarea");
        txt.innerHTML = clean;
        clean = txt.value;
    } catch (e) {
        // console.error("DOM decoding failed", e);
    }

    // 3. Strip HTML tags (if we want plain text) for titles/excerpts
    // But sometimes we might want to keep basic formatting? 
    // The user said "format the content sitewide to not have any of those tags... make it clean and readable".
    // For excerpts and titles, we definitely want plain text. 
    // For body content, we might want to keep <p> but remove spans/styles.
    // Let's assume this is mostly for Title/Excerpt usage or generic cleaning.

    // Remove scripts, styles
    clean = clean.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, "");
    clean = clean.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gm, "");

    return clean;
};

/**
 * Strips all HTML tags to return plain text
 * @param {string} html 
 * @returns {string}
 */
export const stripHtml = (html) => {
    if (!html) return '';
    const clean = decodeHtml(html);
    return clean.replace(/<[^>]*>?/gm, '');
};

/**
 * Cleans a story object's title, excerpt, and content
 * @param {object} story 
 * @returns {object}
 */
export const cleanStory = (story) => {
    return {
        ...story,
        title: stripHtml(story.title).trim(),
        excerpt: stripHtml(story.excerpt).trim(),
        // For content, we might want to keep HTML but clean artifacts?
        // Let's just decode entities for now in contentHTML, but keep tags.
        contentHTML: decodeHtml(story.contentHTML)
    };
};
