const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const PUBLIC_DIR = path.join(__dirname, '../public');
const AUDIO_DIR = path.join(PUBLIC_DIR, 'audio');
const MODELS_DIR = path.join(__dirname, 'models');
const DATA_FILE = path.join(__dirname, '../src/data/tattva-archives.json');
const OPTIMIZER_SCRIPT = path.join(__dirname, '../scripts/optimize-data.js');

// Configuration from .env or defaults
const PIPER_PATH = process.env.PIPER_PATH || 'piper';
const FFMPEG_PATH = process.env.FFMPEG_PATH || 'ffmpeg';

// Ensure directories exist
['en', 'te'].forEach(lang => {
    const dir = path.join(AUDIO_DIR, lang);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const getModelPath = (lang) => {
    if (lang === 'te') return path.join(MODELS_DIR, 'te_IN-khu-medium.onnx');
    return path.join(MODELS_DIR, 'en_US-amy-medium.onnx');
};

const synthesizeAudio = (text, lang, outputPath) => {
    return new Promise((resolve, reject) => {
        const modelPath = getModelPath(lang);
        if (!fs.existsSync(modelPath)) {
            return reject(new Error(`Model not found for language: ${lang}`));
        }

        const tempWav = outputPath.replace('.mp3', '.wav');

        console.log(`Synthesizing: "${text.substring(0, 20)}..." in ${lang}`);
        console.log(`Using Piper: ${PIPER_PATH}`);

        // 1. Generate WAV with Piper
        const piper = spawn(PIPER_PATH, [
            '--model', modelPath,
            '--output_file', tempWav
        ]);

        piper.stdin.write(text);
        piper.stdin.end();

        piper.stderr.on('data', (data) => {
            // Piper logs to stderr
        });

        piper.on('close', (code) => {
            if (code !== 0) {
                return reject(new Error(`Piper process exited with code ${code}. Check if '${PIPER_PATH}' is correct and accessible.`));
            }

            // 2. Convert to MP3 with FFmpeg
            const ffmpeg = spawn(FFMPEG_PATH, [
                '-y', // Overwrite
                '-i', tempWav,
                '-codec:a', 'libmp3lame',
                '-qscale:a', '2',
                outputPath
            ]);

            ffmpeg.stderr.on('data', () => { });

            ffmpeg.on('close', (fCode) => {
                // Cleanup WAV
                fs.unlink(tempWav, () => { });

                if (fCode !== 0) {
                    return reject(new Error(`FFmpeg process exited with code ${fCode}`));
                }
                resolve();
            });
        });

        piper.on('error', (err) => {
            reject(new Error(`Failed to start Piper: ${err.message}`));
        });
    });
};

app.get('/tts', async (req, res) => {
    const { id, text, lang = 'en' } = req.query;

    if (!text || !id) {
        return res.status(400).send('Missing text or id');
    }

    const safeLang = lang === 'te' ? 'te' : 'en';
    const filename = `${id}.mp3`;
    const filePath = path.join(AUDIO_DIR, safeLang, filename);

    try {
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            await synthesizeAudio(text, safeLang, filePath);
        }

        // Serve with aggressive caching
        res.set('Content-Type', 'audio/mpeg');
        res.set('Cache-Control', 'public, max-age=31536000, immutable');

        const stream = fs.createReadStream(filePath);
        stream.pipe(res);

    } catch (error) {
        console.error('TTS Error:', error);
        res.status(500).send('Synthesis failed');
    }
});

// Helper to run Git commands asynchronously
const runGitCommand = (args) => {
    return new Promise((resolve, reject) => {
        const git = spawn('git', args, { cwd: path.join(__dirname, '..') });
        let stdout = '';
        let stderr = '';
        
        git.stdout.on('data', (data) => { stdout += data.toString(); });
        git.stderr.on('data', (data) => { stderr += data.toString(); });
        
        git.on('close', (code) => {
            if (code === 0) {
                resolve(stdout);
            } else {
                reject(new Error(`Git command failed with code ${code}: ${stderr || stdout}`));
            }
        });
        
        git.on('error', (err) => {
            reject(err);
        });
    });
};

// Automate staging, committing, pulling, and pushing to GitHub
const pushChangesToGitHub = async (newStory) => {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
        console.warn("GITHUB_TOKEN is not set in environment, skipping git push.");
        return;
    }
    
    try {
        console.log("Staging changes in git...");
        await runGitCommand(['add', 'src/data/tattva-archives.json', 'public/api/stories/']);
        
        console.log("Committing changes in git...");
        const commitMsg = `Publish new story: ${newStory.title}`;
        await runGitCommand([
            '-c', 'user.name=Tattva News Publisher', 
            '-c', 'user.email=publisher@tattvanews.com', 
            'commit', 
            '-m', commitMsg
        ]);
        
        console.log("Pulling latest remote changes to prevent conflicts...");
        const remoteUrl = `https://${token}@github.com/bhakti-132456/tattva-news.git`;
        await runGitCommand(['pull', '--rebase', remoteUrl, 'main']);
        
        console.log("Pushing changes to GitHub...");
        await runGitCommand(['push', remoteUrl, 'main']);
        console.log("Git push successful.");
    } catch (e) {
        console.error("Failed to push changes to GitHub:", e.message);
        throw e;
    }
};

// Article Publishing Endpoint
app.post('/api/publish', async (req, res) => {
    try {
        const newStory = req.body;
        
        // Add metadata if missing
        newStory.id = newStory.id || `story-${Date.now()}`;
        newStory.time = newStory.time || "Just Now";
        newStory.publishedAt = new Date().toISOString();
        newStory.language = newStory.language || 'en';

        console.log(`Publishing new story: ${newStory.title} (${newStory.language})`);

        // 1. Read current stories
        let stories = [];
        if (fs.existsSync(DATA_FILE)) {
            stories = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        }
        
        stories.unshift(newStory);

        // 2. Save back to disk
        fs.writeFileSync(DATA_FILE, JSON.stringify(stories, null, 4));

        // 3. Trigger Optimizer
        console.log('Running data optimizer...');
        const optimizer = spawn('node', [OPTIMIZER_SCRIPT]);
        
        optimizer.on('close', async (code) => {
            if (code === 0) {
                console.log('Optimization complete.');
                try {
                    await pushChangesToGitHub(newStory);
                    res.status(200).json({ success: true, story: newStory });
                } catch (gitErr) {
                    console.error('Git push failed:', gitErr);
                    res.status(500).send(`Save and optimization successful, but failed to push to main site: ${gitErr.message}`);
                }
            } else {
                console.error(`Optimizer failed with code ${code}`);
                res.status(500).send('Save successful but optimization failed');
            }
        });

    } catch (error) {
        console.error('Publishing error:', error);
        res.status(500).send('Internal server error during publishing');
    }
});

app.listen(PORT, () => {
    console.log(`TTS Server running on port ${PORT}`);
    console.log(`Audio storage: ${AUDIO_DIR}`);
});
