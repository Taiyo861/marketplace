import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import Product from "./models/Product.js";
import authRoutes from "./routes/auth.js"; // import auth routes

dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS for frontend
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// For serving images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/products", express.static(path.join(__dirname, "public/products")));

// MongoDB connect
mongoose
  .connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Products API
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ✅ Auth routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Marketplace API running on http://localhost:${PORT}`)
);

