const path = require('path');
const fs = require('fs');
const { runBackgroundRemover } = require('../services/removeBgService');
require('dotenv').config();

const URL = process.env.URL || 'http://localhost:3999';

exports.uploadAndRemove = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Write memory buffer to a temp file
    const inputPath = path.join(__dirname, `../uploads/${Date.now()}_${file.originalname}`);
    fs.writeFileSync(inputPath, file.buffer);

    const outputPath = `public/outputs/${Date.now()}_output.png`;

    await runBackgroundRemover(inputPath, outputPath);

    // Optional: delete temp input file after processing
    fs.unlinkSync(inputPath);

    res.json({ success: true, file: outputPath.replace("public/", `${URL}/`) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
