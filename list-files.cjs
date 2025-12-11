const fs = require('fs');
const path = require('path');

// Folders to ignore
const IGNORED_FOLDERS = new Set(['node_modules', '.next', 'dist', '.git', 'out', 'public', 'ui', 'fonts']);

// Specific files to ignore
const IGNORED_FILES = new Set(['README.md', 'package-lock.json', 'all_files.txt', 'list-files.cjs','jquery.js']);

// File extensions to ignore (e.g., image types)
const IGNORED_EXTENSIONS = new Set([
    '.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp', '.ico', '.tiff', '.psd', '.json', 'mjs'
]);

// Recursive function to get all files
function listFiles(dirPath, fileList = []) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
            if (!IGNORED_FOLDERS.has(entry.name)) {
                listFiles(fullPath, fileList);
            }
        } else {
            const ext = path.extname(entry.name).toLowerCase();
            if (!IGNORED_FILES.has(entry.name) && !IGNORED_EXTENSIONS.has(ext)) {
                fileList.push(fullPath);
            }
        }
    }

    return fileList;
}

// ✅ Target directory (current folder)
const targetDir = path.resolve(__dirname, './');
const outputFile = path.join(__dirname, 'all_files.txt');

const files = listFiles(targetDir);

// Create write stream
const writeStream = fs.createWriteStream(outputFile, { flags: 'w' });

files.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        writeStream.write(`=== ${file} ===\n`);
        writeStream.write(content + '\n\n');
    } catch (err) {
        writeStream.write(`Could not read file ${file}: ${err.message}\n\n`);
    }
});

writeStream.end(() => {
    console.log(`✅ All file names and contents written to: ${outputFile}`);
});
