import React from "react";
import CardSummary from "../Components/CardSummary";

function Cart({ product = [], onIncrement, onDecrement }) {
  // product is an array of cart items, e.g. [{ id, title, price, ... }, ...]
  const nameCounts = product.reduce((acc, item) => {
    const name = item.title || item.name || "Unknown";
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  const totalItems = product.reduce((sum, item) => sum + item.qty, 0);
  const totalValue = product.reduce(
    (sum, item) => sum + item.qty * (item.price || 0),
    0,
  );

  return (
    <div class="main-summary">
      <div class="summary-grid">
        {product.length === 0 ? (
          <div className="empty-cart">
            <h2>Your Cart is Empty 🛒</h2>
            <p>Add some products to get started</p>
          </div>
        ) : (
          product.map((item) => (
            <CardSummary
              key={item.id}
              name={item.title}
              qty={item.qty}
              image={item.image}
              price={item.price}
              onIncrement={() => onIncrement(item.id)}
              onDecrement={() => onDecrement(item.id)}
            />
          ))
        )}
      </div>

      <div className="delivery-box">
        <div className="delivery-text">
          Your order is eligible for FREE Delivery 🚚
        </div>

        <h3>Total Items: {totalItems}</h3>

        <h3 className="total-value">Total Value: ₹{totalValue.toFixed(2)}</h3>

        <button className="buy-btn">Proceed to Buy</button>
      </div>
    </div>
  );
}

export default Cart;
