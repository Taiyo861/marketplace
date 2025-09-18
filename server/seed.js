require("dotenv").config();
const connectDB = require("./db");
const Product = require("./models/Product");

async function seed() {
  await connectDB();
  await Product.deleteMany({}); // wipe old data

  const products = [
    { id: 1, name: "Classic T-Shirt", price: 15, category: "Men", image: "/images/tshirt.jpg" },
    { id: 2, name: "Black Hoodie", price: 35, category: "Men", image: "/images/hoodie.jpg" },
    { id: 3, name: "Green Scarf", price: 10, category: "Men", image: "/images/scarf.jpg" },

    { id: 4, name: "Blue Jeans", price: 45, category: "Men", image: "https://images.unsplash.com/photo-1521093470119-a3acdc43374a?auto=format&fit=crop&w=1200&q=80" },
    { id: 5, name: "Leather Jacket", price: 120, category: "Men", image: "https://images.unsplash.com/photo-1520975918318-05c3d6e9289d?auto=format&fit=crop&w=1200&q=80" },
    { id: 6, name: "Summer Dress", price: 50, category: "Women", image: "https://images.unsplash.com/photo-1520962910502-1974c5f1f27d?auto=format&fit=crop&w=1200&q=80" },
    { id: 7, name: "Handbag", price: 70, category: "Women", image: "https://images.unsplash.com/photo-1516914943479-89db7bbceeaf?auto=format&fit=crop&w=1200&q=80" },
    { id: 8, name: "White Sneakers", price: 60, category: "Women", image: "https://images.unsplash.com/photo-1528701800489-20be3c74a6e2?auto=format&fit=crop&w=1200&q=80" },
    { id: 9, name: "Kids Hoodie", price: 25, category: "Kids", image: "https://images.unsplash.com/photo-1603252109360-909f2e40dfe7?auto=format&fit=crop&w=1200&q=80" },
    { id: 10, name: "Backpack", price: 20, category: "Kids", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80" },
  ];

  await Product.insertMany(products);
  console.log("✅ Seeded 10 products");
  process.exit(0);
}

seed().catch((e) => {
  console.error("❌ Error seeding:", e);
  process.exit(1);
});

