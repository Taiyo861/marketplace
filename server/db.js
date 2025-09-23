import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("🔌 Trying to connect to MongoDB...");
    console.log("URI:", process.env.MONGO_URI); // Debug log

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
