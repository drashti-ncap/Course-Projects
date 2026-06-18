const mongoose = require('mongoose');
const env = require('./env');

const connectDatabase = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};

module.exports = connectDatabase;
