
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO_OWNER = 'bhakti-132456';
    const REPO_NAME = 'tattva-news';
    const FILE_PATH = 'src/data/stories.js';

    if (!GITHUB_TOKEN) {
        return res.status(500).json({ message: 'GITHUB_TOKEN is not configured' });
    }

    try {
        const story = req.body;
        story.id = `remote-${Date.now()}`;
        story.time = "Just Now";

        // 1. Get current file content and SHA
        const getFileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
        const getFileRes = await fetch(getFileUrl, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });

        if (!getFileRes.ok) {
            throw new Error(`Failed to fetch ${FILE_PATH} from GitHub`);
        }

        const { content, sha } = await getFileRes.json();
        const currentContent = Buffer.from(content, 'base64').toString('utf8');

        // 2. Insert the new story into the stories array
        // We target the start of the array: export const stories = [
        const insertionPoint = currentContent.indexOf('stories = [') + 'stories = ['.length;
        if (insertionPoint === -1) {
            throw new Error('Could not find stories array in stories.js');
        }

        const formattedStory = `
    {
        id: "${story.id}",
        type: "${story.hasAudio ? 'hero' : 'standard'}",
        category: "${story.category}",
        title: "${story.title}",
        excerpt: "${story.excerpt}",
        author: "${story.author}",
        time: "${story.time}",
        image: "${story.image}",
        readTime: "${story.readTime}",
        hasAudio: ${story.hasAudio},
        audioDuration: ${story.audioDuration ? `"${story.audioDuration}"` : 'null'},
        audioSrc: "${story.audioSrc}",
        contentHTML: \`${story.contentHTML.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`
    },`;

        const newContent =
            currentContent.slice(0, insertionPoint) +
            formattedStory +
            currentContent.slice(insertionPoint);

        // 3. Update the file on GitHub
        const updateFileRes = await fetch(getFileUrl, {
            method: 'PUT',
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Publish article: ${story.title}`,
                content: Buffer.from(newContent).toString('base64'),
                sha: sha,
            }),
        });

        if (!updateFileRes.ok) {
            const errorData = await updateFileRes.json();
            throw new Error(`GitHub API Error: ${errorData.message}`);
        }

        return res.status(200).json({ message: 'Article published successfully' });
    } catch (error) {
        console.error('Publishing error:', error);
        return res.status(500).json({ message: error.message });
    }
}
