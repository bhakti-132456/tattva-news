import { stories as staticStories } from '../data/stories';

export const getAllStories = () => {
    try {
        const localStories = JSON.parse(localStorage.getItem('addedStories') || '[]');
        return [...localStories, ...staticStories];
    } catch (e) {
        console.error("Failed to load stories from local storage", e);
        return staticStories;
    }
};

export const addStory = (story) => {
    try {
        const localStories = JSON.parse(localStorage.getItem('addedStories') || '[]');
        const newStory = {
            ...story,
            id: `local-${Date.now()}`,
            time: "Just Now",
            readTime: "5 min read", // Default estimate
            type: story.hasAudio ? 'hero' : 'standard' // Simple heuristic
        };

        // Add to the beginning of the list
        localStories.unshift(newStory);
        localStorage.setItem('addedStories', JSON.stringify(localStories));
        return newStory;
    } catch (e) {
        console.error("Failed to save story", e);
        return null;
    }
};
