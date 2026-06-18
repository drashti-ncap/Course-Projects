require('dotenv').config();

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://drashti_db_user:bF7NIX93gJs5Q7dO@ac-esxighz-shard-00-00.vpzhayf.mongodb.net:27017,ac-esxighz-shard-00-01.vpzhayf.mongodb.net:27017,ac-esxighz-shard-00-02.vpzhayf.mongodb.net:27017/ecommerceDB?ssl=true&replicaSet=atlas-v3js9p-shard-0&authSource=admin&retryWrites=true&w=majority',
  jwtSecret: process.env.JWT_SECRET || 'duKRHtBwKGzOHPdgITLfpx6xy0CSEnYQhgjuaOFcUjO',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  cloudinaryUrl: process.env.CLOUDINARY_URL || '',
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || 'dfrse0n6y',
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || '454767252476359',
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || '7i1DulG2IuoR6oxCLwvrwvlIvYE',
};
