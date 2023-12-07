/**
 * App Component
 *
 * This is the root component of the application.
 *
 */
import React from "react";
import FlightBookingForm from "./components/FlightBookingForm";
import { CartProvider } from "./components/CartContext";
import "./styles.css";

const App = () => {
  return (
    <CartProvider>
      <FlightBookingForm />
    </CartProvider>
  );
};

export default App;
