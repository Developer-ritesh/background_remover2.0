const express = require('express');
const multer = require('multer');

// Controllers
const { uploadAndRemove } = require('../controller/removeBgController');

const router = express.Router();

// ✅ Use memory storage so we can directly handle the image in buffers
const upload = multer({ storage: multer.memoryStorage() });

// Routes
router.post('/remove-bg', upload.single('image'), uploadAndRemove);

module.exports = router;
