const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://drashti_db_user:bF7NIX93gJs5Q7dO@ac-esxighz-shard-00-00.vpzhayf.mongodb.net:27017,ac-esxighz-shard-00-01.vpzhayf.mongodb.net:27017,ac-esxighz-shard-00-02.vpzhayf.mongodb.net:27017/ai-chat-DB?ssl=true&replicaSet=atlas-v3js9p-shard-0&authSource=admin&retryWrites=true&w=majority"
    );

    console.log(`Mongodb connected `);
  } catch (error) {
    console.error(`Error connecting to MongoDB ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;