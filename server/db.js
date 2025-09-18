// server/db.js
const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ Missing MONGO_URI in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { dbName: process.env.DB_NAME || "marketplace" });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
