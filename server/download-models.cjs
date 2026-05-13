const fs = require('fs');
const path = require('path');
const https = require('https');

const modelsDir = path.join(__dirname, 'models');
if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true });
}

const files = [
    {
        name: 'te_IN-khu-medium.onnx',
        url: 'https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/te/te_IN/khu/medium/te_IN-khu-medium.onnx'
    },
    {
        name: 'te_IN-khu-medium.onnx.json',
        url: 'https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/te/te_IN/khu/medium/te_IN-khu-medium.onnx.json'
    },
    {
        name: 'en_US-amy-medium.onnx',
        url: 'https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/amy/medium/en_US-amy-medium.onnx'
    },
    {
        name: 'en_US-amy-medium.onnx.json',
        url: 'https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/en/en_US/amy/medium/en_US-amy-medium.onnx.json'
    }
];

const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(dest)) {
            console.log(`File already exists: ${path.basename(dest)}`);
            resolve();
            return;
        }

        console.log(`Downloading ${path.basename(dest)}...`);
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                downloadFile(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${path.basename(dest)}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
};

async function downloadAll() {
    try {
        for (const file of files) {
            await downloadFile(file.url, path.join(modelsDir, file.name));
        }
        console.log('All models downloaded successfully.');
    } catch (err) {
        console.error('Error downloading models:', err);
        process.exit(1);
    }
}

downloadAll();
