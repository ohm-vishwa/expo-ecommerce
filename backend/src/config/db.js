import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.DB_URL);
    console.log(`✅ MongoDB connected successfully!`);
  } catch (error) {
    console.log("🚨 MONGODB connection error");
    process.exit(1);
  }
};
