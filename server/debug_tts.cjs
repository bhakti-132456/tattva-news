const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const PIPER = process.env.PIPER_PATH || 'piper';
const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg';

console.log('--- TTS Debugger ---');
console.log(`Checking Piper at: '${PIPER}'`);
console.log(`Checking FFmpeg at: '${FFMPEG}'`);

const checkBinary = (name, cmd, args) => {
    return new Promise((resolve) => {
        const proc = spawn(cmd, args);
        proc.on('error', (err) => {
            console.error(`\u274C Failed to run ${name}: ${err.message}`);
            if (err.code === 'ENOENT') {
                console.error(`   -> The file '${cmd}' was not found. Please check the path in server/.env`);
            }
            resolve(false);
        });
        proc.on('close', (code) => {
            if (code === 0) {
                console.log(`\u2705 ${name} is working correctly.`);
                resolve(true);
            } else {
                console.warn(`\u26A0 ${name} ran but exited with code ${code}. (This might be expected for version checks)`);
                resolve(true);
            }
        });
    });
};

(async () => {
    const piperOk = await checkBinary('Piper', PIPER, ['--version']);
    const ffmpegOk = await checkBinary('FFmpeg', FFMPEG, ['-version']);

    if (piperOk && ffmpegOk) {
        console.log('\nSUCCESS: All binaries are accessible. You can run the server.');
    } else {
        console.log('\nFAILURE: One or more binaries are missing. Please update server/.env with absolute paths.');
    }
})();
