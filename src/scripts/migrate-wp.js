import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const ARCHIVE_FILE = path.join(DATA_DIR, 'tattva-archives.json');

const AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
];

async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, {
                headers: {
                    'User-Agent': AGENTS[Math.floor(Math.random() * AGENTS.length)]
                }
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (e) {
            console.warn(`Attempt ${i + 1} failed for ${url}: ${e.message}`);
            if (i === retries - 1) throw e;
            await new Promise(r => setTimeout(r, 1000 * (i + 1)));
        }
    }
}

async function fetchAllPosts(baseUrl, language) {
    let allPosts = [];
    let page = 1;
    const perPage = 100; // Max allowed by WP API usually
    let hasMore = true;

    console.log(`Starting fetch for ${language} from ${baseUrl}...`);

    while (hasMore) {
        try {
            const url = `${baseUrl}/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_embed`;
            console.log(`Fetching page ${page}...`);

            const posts = await fetchWithRetry(url);

            if (posts.length === 0) {
                hasMore = false;
                break;
            }

            const normalizedPosts = posts.map(post => {
                // Extract image
                let image = '/placeholder-news.jpg';
                if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
                    image = post._embedded['wp:featuredmedia'][0].source_url;
                }

                // Extract category (rough attempt as we need category map, simple string for now)
                const category = "World"; // Default

                return {
                    id: `wp-${language}-${post.id}`,
                    wp_id: post.id,
                    type: 'standard',
                    category: category,
                    language: language,
                    title: post.title.rendered,
                    excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, ''), // Strip HTML tags details
                    author: "Tattva News Team", // Default as WP authors might be generic admin
                    time: new Date(post.date).toLocaleDateString(),
                    image: image,
                    readTime: "5 min read", // Estimate
                    contentHTML: post.content.rendered,
                    originalUrl: post.link,
                    hasAudio: false,
                    hasInfographics: false
                };
            });

            allPosts = [...allPosts, ...normalizedPosts];
            console.log(`Fetched ${posts.length} posts. Total: ${allPosts.length}`);

            // Safety break for demo/dev to avoid hammering too much if thousands
            // Remove this break for full migration
            if (page >= 10) {
                console.log("Stopping at 10 pages for safety.");
                hasMore = false;
            }

            page++;
        } catch (e) {
            console.error(`Error on page ${page}:`, e);
            hasMore = false;
        }
    }

    return allPosts;
}

async function runMigration() {
    try {
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }

        const tePosts = await fetchAllPosts('https://tattvanews.com', 'te');
        const enPosts = await fetchAllPosts('https://en.tattvanews.com', 'en');

        const allArchives = [...tePosts, ...enPosts];

        fs.writeFileSync(ARCHIVE_FILE, JSON.stringify(allArchives, null, 2));
        console.log(`Migration complete! Saved ${allArchives.length} articles to ${ARCHIVE_FILE}`);

    } catch (e) {
        console.error("Migration failed:", e);
    }
}

runMigration();
