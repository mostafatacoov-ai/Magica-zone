const fs = require('fs');
const path = require('path');

// This script copies Next.js static files to the public directory so that 
// strict shared hosting servers (like Hostinger/cPanel) using Apache/LiteSpeed 
// can serve the JS/CSS chunks directly without returning 404 errors.

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

try {
    console.log('Copying Next.js static files to public directory for shared hosting compatibility...');
    const src = path.join(__dirname, '.next', 'static');
    const dest = path.join(__dirname, 'public', '_next', 'static');
    
    if (fs.existsSync(src)) {
        copyDir(src, dest);
        console.log('Successfully copied static files! Hostinger will now serve them correctly.');
    } else {
        console.log('Source .next/static does not exist. The build might have failed.');
    }
} catch (err) {
    console.error('Failed to copy static files:', err);
}
