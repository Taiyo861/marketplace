import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db.js";
import Product from "./models/Product.js";

dotenv.config(); // must be first!

const products = [
  { name: "Loose T-Shirt", price: 15, category: "Men", image: "/products/loose_tshirt.jpg" },
  { name: "Black Hoodie", price: 35, category: "Men", image: "/products/black_hoodie.jpg" },
  { name: "Coat", price: 70, category: "Men", image: "/products/coat.jpg" },
  { name: "Kids Jogger", price: 25, category: "Kids", image: "/products/kids_jogger.jpg" },
  { name: "Leather Jacket", price: 120, category: "Men", image: "/products/leather_jacket.jpg" },
  { name: "Leopard Jeans", price: 50, category: "Women", image: "/products/leopard_jeans.jpg" },
  { name: "Long Dress", price: 80, category: "Women", image: "/products/long_dress.jpg" },
  { name: "Loose Jeans", price: 45, category: "Women", image: "/products/loose_jeans.jpg" },
  { name: "Sneakers", price: 60, category: "Women", image: "/products/sneaker.jpg" },
  { name: "Backpack", price: 30, category: "Kids", image: "/products/backpack.jpg" },
];

const seedDB = async () => {
  try {
    await connectDB(); // connect first
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Database seeded with 10 products");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDB();

