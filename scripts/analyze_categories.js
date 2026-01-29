
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../src/data/tattva-archives.json');

try {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const stories = JSON.parse(rawData);

    const categories = {};
    stories.forEach(s => {
        const c = s.category || 'Uncategorized';
        categories[c] = (categories[c] || 0) + 1;
    });

    console.log("Category Distribution:");
    console.log(JSON.stringify(categories, null, 2));

} catch (error) {
    console.error('Error:', error);
}
