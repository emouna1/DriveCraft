const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });
module.exports = { upload };
