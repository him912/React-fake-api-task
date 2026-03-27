import React from "react";
import { Link } from "react-router-dom";
function Header({ cartCount }) {
  return (
    <header className="header">
      {/* <h2>My Store</h2> */}

      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h2>My Store</h2>
      </Link>

      <div className="cart-box">
        <Link to="/cart" style={{ marginRight: "10px" }}>
          Cart: {cartCount}
        </Link>
      </div>
    </header>
  );
}

export default Header;
