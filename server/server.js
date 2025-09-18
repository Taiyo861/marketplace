// server/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const connectDB = require("./db");
const Product = require("./models/Product");

const app = express(); // ✅ define app before using it

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// Serve static images
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Marketplace API is running on http://localhost:${PORT}`);
  });
});
