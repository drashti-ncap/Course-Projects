const uploadService = require('./upload.service');
const ApiError = require('../../utils/apiError');

const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, 'File is required');
    }

    const uploadResult = await uploadService.uploadFile(req.file);

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: uploadResult,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFile,
};
