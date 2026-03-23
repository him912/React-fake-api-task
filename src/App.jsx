import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import axios from "axios";
import ProductCard from "./Components/ProductCard";
import ProductModel from "./Components/ProductModel";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios("https://fakestoreapi.com/products");
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, []);

  function closeModal() {
    setSelectedProduct(null);
  }

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setSelectedProduct(null);
  };

  const changeQty = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, qty: Math.max(1, item.qty + delta) }
            : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  // function addToCart(product) {
  //   setCart([...cart, product]);
  //   closeModal();
  // }
  function openModel(product) {
    setSelectedProduct(product);
  }

  return (
    <div>
      <Header cartCount={cart.length} />

      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <p className="message">Loading products....</p>
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
