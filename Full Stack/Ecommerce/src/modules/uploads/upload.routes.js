const express = require('express');
const multer = require('multer');
const ApiError = require('../../utils/apiError');
const uploadController = require('./upload.controller');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new ApiError(400, 'Only image uploads are allowed'), false);
    }

    cb(null, true);
  },
});

router.post('/', upload.single('file'), uploadController.uploadFile);

module.exports = router;
