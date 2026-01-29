
// Import migrated stories if available, otherwise empty array
import wpStoriesRaw from '../data/tattva-archives.json';

const STORIES_KEY = 'tattva_published_stories';

// Generate a URL-safe slug from title
const generateSlug = (title) => {
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 50);
    return `${slug}-${Date.now()}`;
};

// Get all stories (published local + static demo stories + migrated stories)
// NO CLEANING - RAW DATA ONLY FOR PERFORMANCE/STABILITY
export const getAllStories = () => {
    try {
        const localStories = JSON.parse(localStorage.getItem(STORIES_KEY) || '[]');
        const enhancedLocal = localStories.map(s => ({ ...s, language: s.language || 'en' }));

        // Combine local and raw WP stories directly
        return [...enhancedLocal, ...wpStoriesRaw];
    } catch (e) {
        console.error("Failed to load stories from local storage", e);
        // Fallback to empty or just WP stories if local fails
        return wpStoriesRaw || [];
    }
};

export const getStoriesByLanguage = (lang) => {
    const all = getAllStories();
    return all.filter(s => s.language === lang);
};

// Get a single story by ID
export const getStoryById = (id) => {
    const stories = getAllStories();
    return stories.find(s => s.id === id) || null;
};

// Add a new story (save to localStorage)
export const addStory = (story) => {
    try {
        const localStories = JSON.parse(localStorage.getItem(STORIES_KEY) || '[]');
        const newStory = {
            ...story,
            id: generateSlug(story.title),
            time: "Just Now",
            readTime: story.readTime || "5 min read",
            type: story.hasAudio ? 'hero' : 'standard',
            publishedAt: new Date().toISOString(),
            language: story.language || 'en' // Default new stories to English if not specified
        };

        // Add to the beginning of the list
        localStories.unshift(newStory);
        localStorage.setItem(STORIES_KEY, JSON.stringify(localStories));
        return newStory;
    } catch (e) {
        console.error("Failed to save story", e);
        return null;
    }
};

// Delete a story by ID
export const deleteStory = (id) => {
    try {
        const localStories = JSON.parse(localStorage.getItem(STORIES_KEY) || '[]');
        const filtered = localStories.filter(s => s.id !== id);
        localStorage.setItem(STORIES_KEY, JSON.stringify(filtered));
        return true;
    } catch (e) {
        console.error("Failed to delete story", e);
        return false;
    }
};

// Publish story - fully local, no API
export const publishToSite = async (story) => {
    try {
        // Simply save to localStorage - this IS the publish
        const published = addStory(story);
        if (published) {
            console.log('Article published successfully:', published.id);
            return true;
        }
        return false;
    } catch (e) {
        console.error("Publishing failed:", e);
        return false;
    }
};

// Get only locally published stories (for admin management)
export const getLocalStories = () => {
    try {
        return JSON.parse(localStorage.getItem(STORIES_KEY) || '[]');
    } catch (e) {
        console.error("Failed to load local stories", e);
        return [];
    }
};

// Clear all local stories (for testing/reset)
export const clearAllLocalStories = () => {
    localStorage.removeItem(STORIES_KEY);
};
