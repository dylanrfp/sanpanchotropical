const fs = require('fs');
const path = require('path');

const srcDir = '/Users/dylanfarmer/Downloads/esperanzazip';
const destDir = path.join(__dirname, 'public', 'sequence');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
const jpgFiles = files.filter(f => f.endsWith('.jpg')).sort();

let count = 0;
for (const file of jpgFiles) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, `frame_${count}.jpg`);
    try {
        fs.copyFileSync(srcPath, destPath);
        count++;
    } catch (copyErr) {
        console.error(`Error copying ${file}:`, copyErr);
    }
}

console.log(`Successfully copied and renamed ${count} files.`);
