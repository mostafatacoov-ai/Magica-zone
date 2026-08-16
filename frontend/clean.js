const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'public', '_next');

if (fs.existsSync(target)) {
    console.log('Cleaning up public/_next directory before build to avoid Next.js conflict...');
    try {
        fs.rmSync(target, { recursive: true, force: true });
        console.log('Cleaned up public/_next successfully.');
    } catch (err) {
        console.error('Failed to clean public/_next:', err);
    }
}
