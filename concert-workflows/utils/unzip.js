import * as fs from 'fs';
import * as path from 'path';
import { execFile } from 'child_process';
import { platform } from 'os';

function unzipToTemp(zipPath) {
  return new Promise((resolve, reject) => {
    const name = path.basename(zipPath, '.zip');
    const dirName = `unzipped-${name}`;
    const outputDir = path.resolve(process.cwd(), dirName);

    fs.mkdirSync(outputDir, { recursive: true });

    const currentPlatform = platform();

    let command = '';
    let args = [];

    if (currentPlatform === 'win32') {
      // Windows: use PowerShell
      command = 'powershell.exe';
      args = [
        '-Command',
        `Expand-Archive -Path "${zipPath}" -DestinationPath "${outputDir}" -Force`
      ];
    } else {
      // macOS/Linux: use unzip
      command = 'unzip';
      args = [zipPath, '-d', outputDir];
    }

    execFile(command, args, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Unzip failed: ${stderr || stdout}`));
      } else {
        resolve(outputDir);
      }
    });
  });
}

const unzipContent = async (dirPath) => {
  const directoryFiles = fs.readdirSync(dirPath);
  const results = await Promise.all(
    directoryFiles.map(filename => {
      if (!filename.endsWith('.zip')) return Promise.resolve('');
      return unzipToTemp(path.resolve(path.join(dirPath, filename)));
    })
  );
  console.log('done');
  return results;
};

export default unzipContent;