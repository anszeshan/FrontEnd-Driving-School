const fs = require('fs');
const path = require('path');

const uploadDirs = [
  'uploads',
  'uploads/logos',
  'uploads/licenses',
  'uploads/schools',
];

// Create upload directories if they don't exist
uploadDirs.forEach((dir) => {
  const dirPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
});

console.log('Upload directories initialized successfully!'); 