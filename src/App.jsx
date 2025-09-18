import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Fetch products
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("❌ Fetch error:", err));
  }, []);

  // Add to cart
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

  // Total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-600">Threadly</h1>
        <input
          type="text"
          placeholder="Search for anything"
          className="w-1/2 border rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <div className="flex items-center gap-4">
          <button className="text-gray-700 hover:text-blue-600">Log in</button>
          <button className="text-gray-700 hover:text-blue-600">Sign up</button>
          <button
            onClick={() => setCartOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Cart ({cart.length})
          </button>
        </div>
      </header>

      {/* Categories */}
<nav className="flex justify-between px-20 py-4 bg-white border-b">
  {[
    { name: "Women", icon: "👗" },
    { name: "Men", icon: "👕" },
    { name: "Kids", icon: "🧒" },
  ].map((cat) => (
    <button
      key={cat.name}
      className="flex flex-col items-center text-gray-700 hover:text-blue-600 flex-1"
    >
      <span className="text-3xl">{cat.icon}</span>
      <span className="text-sm">{cat.name}</span>
    </button>
  ))}
</nav>


      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-10 text-3xl font-bold">
        🎉 Welcome to Mercari Clone – 15% OFF Today!
      </div>

      {/* Product Grid */}
      <main className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="p-4 border rounded-lg bg-white shadow hover:shadow-lg transition"
          >
            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              className="w-full h-40 object-contain mb-3"
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
      </main>

      {/* Cart Sidebar (to be added back later) */}
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
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 font-semibold text-lg">Total: ${total}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
