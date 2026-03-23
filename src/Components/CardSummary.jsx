import React from "react";

function CardSummary({ name, qty, image, price, onIncrement, onDecrement }) {
  const subtotal = qty * (price || 0);

  return (
    <div className="cart-Container">
      {image && <img src={image} alt={name} className="summary-image" />}

      <section>
        <h2>{name}</h2>
        <br />
        <p>Price: Rs {price?.toFixed(2) ?? "0.00"}</p>
        <p>Qty: {qty}</p>
        <br />
        <div className="qty-controls">
          <button className="add-Increament-btn" onClick={onDecrement}>
            -
          </button>
          <span className="amount">{qty}</span>
          <button className="add-Decrement-btn" onClick={onIncrement}>
            +
          </button>
        </div>
        <br />
        <h3>Subtotal: Rs {subtotal.toFixed(2)}</h3>
      </section>
    </div>
  );
}

export default CardSummary;
