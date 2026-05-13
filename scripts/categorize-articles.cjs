const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/data/tattva-archives.json');

const CATEGORIES = {
    Tech: ['tech', 'ai', 'software', 'hardware', 'microsoft', 'google', 'apple', 'startup', 'digital', 'cyber', 'robot', 'internet', 'web', 'data', 'silicon', 'app', 'iphone', 'android', 'chip', 'semiconductor', 'spacex', 'tesla', 'meta', 'facebook', 'twitter', 'social media'],
    Business: ['business', 'economy', 'market', 'trade', 'finance', 'stock', 'sensex', 'nifty', 'company', 'revenue', 'profit', 'bank', 'investment', 'gdp', 'inflation', 'corporate', 'industry', 'tax', 'budget', 'rbi', 'billion', 'million', 'ceo', 'startup', 'funding'],
    Politics: ['politics', 'government', 'election', 'minister', 'cm', 'pm', 'party', 'assembly', 'parliament', 'policy', 'vote', 'modi', 'congress', 'bjp', 'cabinet', 'senate', 'legislation', 'political', 'court', 'supreme court', 'law', 'bill', 'manifesto', 'campaign', 'democracy', 'opposition', 'ruling'],
    World: [] // Default fallback
};

function categorize(title, excerpt) {
    const text = (title + ' ' + (excerpt || '')).toLowerCase();
    
    // Check Politics first as it's often the most specific in news
    if (CATEGORIES.Politics.some(kw => text.includes(kw))) return 'Politics';
    if (CATEGORIES.Business.some(kw => text.includes(kw))) return 'Business';
    if (CATEGORIES.Tech.some(kw => text.includes(kw))) return 'Tech';
    
    return 'World';
}

function run() {
    console.log('Categorizing articles...');
    if (!fs.existsSync(DATA_FILE)) {
        console.error('Data file not found!');
        return;
    }
    
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    console.log(`Processing ${data.length} articles...`);
    
    let counts = { Tech: 0, Business: 0, Politics: 0, World: 0 };
    
    const updated = data.map(article => {
        const cat = categorize(article.title, article.excerpt);
        article.category = cat;
        counts[cat]++;
        return article;
    });
    
    fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2));
    console.log('Categorization complete:', counts);
    
    // Trigger optimizer if it exists
    const OPTIMIZER_SCRIPT = path.join(__dirname, 'optimize-data.js');
    if (fs.existsSync(OPTIMIZER_SCRIPT)) {
        console.log('Running optimizer...');
        const { spawn } = require('child_process');
        const optimizer = spawn('node', [OPTIMIZER_SCRIPT]);
        optimizer.on('close', (code) => {
            console.log(`Optimizer finished with code ${code}`);
        });
    }
}

run();
