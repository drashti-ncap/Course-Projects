import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://drashti_db_user:bF7NIX93gJs5Q7dO@ac-esxighz-shard-00-00.vpzhayf.mongodb.net:27017,ac-esxighz-shard-00-01.vpzhayf.mongodb.net:27017,ac-esxighz-shard-00-02.vpzhayf.mongodb.net:27017/next-api?ssl=true&replicaSet=atlas-v3js9p-shard-0&authSource=admin&retryWrites=true&w=majority");
    console.log("DB connected");
  } catch (error) {
    console.log("db connecting error", error);
  }
};
export default connectDB;