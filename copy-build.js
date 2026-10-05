const fs = require('fs');
const path = require('path');

function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    entry.isDirectory() ? copyDirSync(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
  }
}

const source = path.join(__dirname, 'Frontend', 'dist');
const destination = path.join(__dirname, 'backend', 'public');

if (fs.existsSync(destination)) {
  fs.rmSync(destination, { recursive: true, force: true });
}

console.log('Copying frontend build to backend public folder...');
copyDirSync(source, destination);
console.log('Done!');
