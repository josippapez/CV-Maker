import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(__dirname, 'public');
const LOCALES_DIR = path.join(PUBLIC_DIR, 'locales');

function deleteFolderRecursive(dirPath: string) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(file => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

deleteFolderRecursive(LOCALES_DIR);
