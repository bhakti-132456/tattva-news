import { stories as staticStories } from '../data/stories';

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

// Get all stories (published local + static demo stories)
export const getAllStories = () => {
    try {
        const localStories = JSON.parse(localStorage.getItem(STORIES_KEY) || '[]');
        // Local stories first (newest), then static stories
        return [...localStories, ...staticStories];
    } catch (e) {
        console.error("Failed to load stories from local storage", e);
        return staticStories;
    }
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
            publishedAt: new Date().toISOString()
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
