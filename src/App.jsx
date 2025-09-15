import { useState } from "react";
import tshirtImg from "./assets/images/tshirt.jpg";
import hoodieImg from "./assets/images/hoodie.jpg";
import scarfImg from "./assets/images/scarf.jpg";


function App() {
  const products = [
    { id: 1, name: "T-Shirt", price: 15, image: "src/assets/images/tshirt.jpg" },
    { id: 2, name: "Hoodie", price: 35, image: "src/assets/images/hoodie.jpg" },
    { id: 3, name: "Scarf", price: 10, image: "src/assets/images/scarf.jpg" },
  ];

  const [cart, setCart] = useState([]);

  // Add product to cart (with quantity)
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart(
      cart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">🛍 Marketplace</h1>

      {/* Product list */}
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded-lg bg-white shadow">
            <img src={product.image} alt={product.name}  className="w-full h-48 object-contain rounded mb-3 bg-gray-100" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
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

      {/* Cart */}
      <div className="mt-10 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-2">🛒 Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b py-2">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2 hover:bg-red-600"
                  >
                    -
                  </button>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Total */}
        <div className="mt-4 text-xl font-bold">
          Total: ${total}
        </div>
      </div>
    </div>
  );
}

export default App;



