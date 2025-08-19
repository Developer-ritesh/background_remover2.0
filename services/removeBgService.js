const { spawn } = require('child_process');
const path = require('path');

function runBackgroundRemover(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const script = path.join(__dirname, '../python/remove_bg.py');
    const python = spawn('python3', [script, inputPath, outputPath]);

    python.stderr.on('data', data => console.error(`Error: ${data}`));
    python.on('close', code => {
      if (code === 0) resolve(outputPath);
      else reject(new Error("Background removal failed"));
    });
  });
}

module.exports = { runBackgroundRemover };
