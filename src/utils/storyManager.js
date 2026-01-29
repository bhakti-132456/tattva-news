const STORIES_KEY = 'tattva_published_stories';
const API_BASE = '/api/stories';

// Internal cache to minimize redundant fetches
const storiesCache = {
    latest: null,
    categories: {},
    articles: {}
};

// Get local stories (published local ONLY)
const getLocalStories = () => {
    try {
        const local = JSON.parse(localStorage.getItem(STORIES_KEY) || '[]');
        return local.map(s => ({ ...s, language: s.language || 'en' }));
    } catch (e) {
        console.error("Failed to load local stories", e);
        return [];
    }
};

// 1. Fetch Latest Stories Index (Paginated/Chunked)
export const getLatestStories = async (lang = 'en') => {
    if (storiesCache.latest) return storiesCache.latest.filter(s => s.language === lang);

    try {
        const response = await fetch(`${API_BASE}/latest.json`);
        const remoteStories = await response.json();

        const local = getLocalStories();
        const combined = [...local, ...remoteStories];

        storiesCache.latest = combined;
        return combined.filter(s => s.language === lang);
    } catch (e) {
        console.error("Failed to fetch latest stories", e);
        return getLocalStories().filter(s => s.language === lang);
    }
};

// 2. Fetch Story by ID (Full content loaded on demand)
export const getStoryById = async (id) => {
    // Check local storage first
    const local = getLocalStories();
    const foundLocal = local.find(s => s.id === id);
    if (foundLocal) return foundLocal;

    // Check cache
    if (storiesCache.articles[id]) return storiesCache.articles[id];

    try {
        const response = await fetch(`${API_BASE}/article-${id}.json`);
        if (!response.ok) throw new Error('Article not found');
        const story = await response.json();

        storiesCache.articles[id] = story;
        return story;
    } catch (e) {
        console.error(`Failed to fetch story ${id}`, e);
        return null;
    }
};

// 3. Get Stories By Category (Fetched on demand)
export const getStoriesByCategory = async (category, lang = 'en') => {
    const safeName = category.toLowerCase().replace(/[^a-z0-9]/g, '-');

    if (storiesCache.categories[safeName]) {
        return storiesCache.categories[safeName].filter(s => s.language === lang);
    }

    try {
        const response = await fetch(`${API_BASE}/category-${safeName}.json`);
        const stories = await response.json();

        storiesCache.categories[safeName] = stories;
        return stories.filter(s => s.language === lang);
    } catch (e) {
        console.error(`Failed to fetch category ${category}`, e);
        return [];
    }
};

// Compatibility wrapper for components that still expect synchronous getAllStories
// This now only returns what has already been loaded or the latest index
export const getAllStories = () => {
    const local = getLocalStories();
    return [...local, ...(storiesCache.latest || [])];
};

// Compatibility for language filtering
export const getStoriesByLanguage = (lang) => {
    return getAllStories().filter(s => s.language === lang);
};

// Add a new story (save to localStorage)
export const addStory = (story) => {
    try {
        const localStories = getLocalStories();
        const newStory = {
            ...story,
            id: `local-${Date.now()}`,
            time: "Just Now",
            readTime: story.readTime || "5 min read",
            publishedAt: new Date().toISOString(),
            language: story.language || 'en'
        };

        localStories.unshift(newStory);
        localStorage.setItem(STORIES_KEY, JSON.stringify(localStories));

        // Update local cache
        if (storiesCache.latest) storiesCache.latest.unshift(newStory);

        return newStory;
    } catch (e) {
        console.error("Failed to save story", e);
        return null;
    }
};

// Helper for admin management
export { getLocalStories as getAdminStories };
export const deleteStory = (id) => {
    try {
        const local = getLocalStories();
        const filtered = local.filter(s => s.id !== id);
        localStorage.setItem(STORIES_KEY, JSON.stringify(filtered));
        return true;
    } catch (e) {
        console.error("Failed to delete story", e);
        return false;
    }
};
