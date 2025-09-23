// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

// 🛒 Marketplace (Home)
function Home() {
  const [products, setProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
});
  

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        console.log("✅ Products fetched:", data);
        setProducts(data);
      } catch (err) {
        console.error("❌ Fetch error:", err);
      }
    };
    fetchProducts();
  }, []);

  // load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // add to cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formattedTotal = total.toFixed(2);

  return (
    <div className="p-8">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="p-4 border rounded-lg bg-white shadow hover:shadow-lg transition flex flex-col items-center"
          >

            <img
  src={`http://localhost:5000${product.image}`}
  alt={product.name}
  className="w-48 h-48 object-cover mb-3 rounded"
  onError={(e) => (e.target.src = "/fallback.jpg")}
/>

            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 flex justify-end bg-black bg-opacity-40">
          <div className="w-80 bg-white h-full shadow-lg p-6 flex flex-col">
            <button
              onClick={() => setCartOpen(false)}
              className="self-end text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-600">Cart is empty</p>
            ) : (
              <ul className="flex-1 overflow-y-auto">
  {cart.map((item) => (
    <li
      key={item._id}
      className="flex justify-between items-center border-b py-2"
    >
      <div>
        {item.name} × {item.quantity}
      </div>
      <div>${(item.price * item.quantity).toFixed(2)}</div>
      <div className="flex space-x-2 ml-4">
        <button
          onClick={() => setCart(cart.map(p => 
            p._id === item._id && p.quantity > 1
              ? { ...p, quantity: p.quantity - 1 }
              : p._id === item._id && p.quantity === 1
              ? null
              : p
          ).filter(Boolean))}
          className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          -
        </button>
        <button
          onClick={() =>
            setCart(cart.map(p =>
              p._id === item._id
                ? { ...p, quantity: p.quantity + 1 }
                : p
            ))
          }
          className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          +
        </button>
        <button
          onClick={() => setCart(cart.filter(p => p._id !== item._id))}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </li>
  ))}
</ul>



            )}
            <div className="mt-4 font-semibold text-lg">
  Total: ${total.toFixed(2)}
</div>

          </div>
        </div>
      )}

      {/* Floating Cart Button */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
      >
        Cart ({cart.length})
      </button>
    </div>
  );
}

// 🔑 Login Page
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Logged in!");
        localStorage.setItem("token", data.token);
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("❌ Login error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-lg p-8 w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-2 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-4 py-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}

// 🌐 App Layout
export default function App() {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4 flex justify-between">
        <Link to="/" className="font-bold text-xl">
          Threadly
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
