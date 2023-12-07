/**
 * CartPage Component
 *
 * This React component represents a page displaying the shopping cart.
 */
import React, { useState } from "react";
import Cart from "./Cart";

const CartPage = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("selectedFlights")) || []
  );
  const handleUpdateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("selectedFlights", JSON.stringify(updatedCart));
  };
  return (
    <div>
      <h1>Shopping Cart</h1>
      <Cart cart={cart} onUpdateCart={handleUpdateCart} />
    </div>
  );
};

export default CartPage;
