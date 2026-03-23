import React from "react";

function ProductCard({ product, openModel }) {
  return (
    <div className="card" onClick={() => openModel(product)}>
      <img src={product.image} alt={product.title} className="product-image" />

      <h3>{product.title}</h3>
      <div class="price">Rs:{Math.round(product.price * 5)}</div>
    </div>
  );
}

export default ProductCard;
