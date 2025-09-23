import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const run = async () => {
  try {
    // 👇 Use your MONGO_URI exactly as it is in .env (do NOT append anything)
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });

    console.log("✅ Connected to MongoDB");

    await mongoose.connection.db.dropCollection("products");
    console.log("🗑️ Dropped 'products' collection");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error dropping collection:", err.message);
    process.exit(1);
  }
};

run();

