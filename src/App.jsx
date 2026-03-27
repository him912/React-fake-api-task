/**
 * App.jsx
 * Main application component handling product listing, cart management, and routing
 */

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Header from "./Components/Header";
import ProductCard from "./Components/ProductCard";
import ProductModel from "./Components/ProductModel";
import Cart from "./pages/Cart";

import "./App.css";

const FAKE_STORE_API = "https://fakestoreapi.com/products";

function App() {
  // State Management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  /**
   * Fetch products from Fake Store API on component mount
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios(FAKE_STORE_API);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /**
   * Close product modal
   */
  const closeModal = () => {
    setSelectedProduct(null);
  };

  /**
   * Add product to cart or increment quantity if already in cart
   * @param {Object} product - Product object to add
   */
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Product already in cart, increment quantity
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      // New product, add with qty = 1
      return [...prev, { ...product, qty: 1 }];
    });
    closeModal();
  };

  /**
   * Change product quantity in cart
   * @param {number} productId - Product ID
   * @param {number} delta - Change in quantity (+1 or -1)
   */
  const changeQty = (productId, delta) => {
    setCart(
      (prev) =>
        prev
          .map((item) =>
            item.id === productId
              ? { ...item, qty: Math.max(1, item.qty + delta) }
              : item,
          )
          .filter((item) => item.qty > 0), // Remove items with qty 0
    );
  };

  /**
   * Open product modal for details view
   * @param {Object} product - Product to display
   */
  const openModel = (product) => {
    setSelectedProduct(product);
  };

  // Calculate total cart count
  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const uniqueCount = cart.length;

  return (
    <div>
      <Header cartCount={uniqueCount} />

      <Routes>
        {/* Home Route - Product Listing */}
        <Route
          path="/"
          element={
            loading ? (
              <p className="message">Loading products...</p>
            ) : (
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    openModel={openModel}
                  />
                ))}
              </div>
            )
          }
        />

        {/* Cart Route - Order Summary */}
        <Route
          path="/cart"
          element={
            <Cart
              product={cart}
              onIncrement={(id) => changeQty(id, 1)}
              onDecrement={(id) => changeQty(id, -1)}
            />
          }
        />
      </Routes>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductModel
          product={selectedProduct}
          closeModal={closeModal}
          addToCart={addToCart}
        />
      )}
    </div>
  );
}

export default App;
