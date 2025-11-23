import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected!");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Database connected!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
