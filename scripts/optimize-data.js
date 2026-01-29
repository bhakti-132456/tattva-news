import fs from 'fs';
import path from 'path';

const DATA_FILE = 'src/data/tattva-archives.json';
const OUTPUT_DIR = 'public/api/stories';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('--- Data Optimizer Started ---');

try {
    const rawData = fs.readFileSync(DATA_FILE, 'utf8');
    const stories = JSON.parse(rawData);

    console.log(`Processing ${stories.length} stories...`);

    // 1. Create Index (latest 50 stories)
    // We only need minimal data for the index/home page
    const indexStories = stories.slice(0, 50).map(s => ({
        id: s.id,
        title: s.title,
        excerpt: s.excerpt,
        category: s.category,
        image: s.image,
        time: s.time,
        readTime: s.readTime,
        language: s.language || 'en'
    }));
    fs.writeFileSync(path.join(OUTPUT_DIR, 'latest.json'), JSON.stringify(indexStories));

    // 2. Create Category Indices
    const categoryGroups = {};
    stories.forEach(s => {
        const cat = s.category || 'General';
        if (!categoryGroups[cat]) categoryGroups[cat] = [];
        categoryGroups[cat].push({
            id: s.id,
            title: s.title,
            excerpt: s.excerpt,
            image: s.image,
            language: s.language || 'en'
        });
    });

    Object.entries(categoryGroups).forEach(([cat, items]) => {
        const safeName = cat.toLowerCase().replace(/[^a-z0-9]/g, '-');
        fs.writeFileSync(path.join(OUTPUT_DIR, `category-${safeName}.json`), JSON.stringify(items));
    });

    // 3. Create Individual Article Chunks (Full Content)
    // This allows the browser to fetch ONLY the content of the article being viewed
    stories.forEach(s => {
        fs.writeFileSync(path.join(OUTPUT_DIR, `article-${s.id}.json`), JSON.stringify(s));
    });

    console.log(`Successfully created index, ${Object.keys(categoryGroups).length} categories, and ${stories.length} individual article chunks.`);
    console.log('--- Data Optimizer Finished ---');

} catch (err) {
    console.error('Optimization failed:', err);
    process.exit(1);
}
