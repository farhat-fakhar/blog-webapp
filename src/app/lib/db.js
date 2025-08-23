import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.connectionStr);
      console.log("mongoDB connected successfully", mongoose.connection.host);
    }
  } catch (error) {
    console.log("mongoDB connection failed!", error.message);
  }
};
export default connectDB;
