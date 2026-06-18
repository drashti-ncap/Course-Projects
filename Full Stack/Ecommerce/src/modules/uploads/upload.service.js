const { Readable } = require('stream');
const { v2: cloudinary } = require('cloudinary');
const env = require('../../config/env');
const ApiError = require('../../utils/apiError');

if (env.cloudinaryUrl) {
  cloudinary.config({ cloudinary_url: env.cloudinaryUrl });
} else {
  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret,
  });
}

const verifyCloudinaryCredentials = () => {
  if (!env.cloudinaryUrl && (!env.cloudinaryCloudName || !env.cloudinaryApiKey || !env.cloudinaryApiSecret)) {
    throw new ApiError(500, 'Cloudinary credentials are not configured');
  }
};

const uploadStream = (buffer, options = {}) =>
  new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });

    Readable.from(buffer).pipe(upload);
  });

const uploadFile = async (file, folder = 'ecommerce') => {
  verifyCloudinaryCredentials();

  if (!file || !file.buffer) {
    throw new ApiError(400, 'Invalid upload payload');
  }

  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  if (!allowedImageTypes.includes(file.mimetype)) {
    throw new ApiError(400, 'Only image uploads are allowed');
  }

  const result = await uploadStream(file.buffer, {
    folder,
    resource_type: 'image',
    use_filename: true,
    unique_filename: true,
    overwrite: false,
  });

  return {
    publicId: result.public_id,
    url: result.secure_url,
    format: result.format,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
    originalFilename: file.originalname,
    mimeType: file.mimetype,
  };
};

module.exports = {
  uploadFile,
};
