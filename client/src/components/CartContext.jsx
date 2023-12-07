/**
 * Cart Context and Provider
 *
 * This module defines a React Context and Provider for managing a shopping cart state.
 * It includes actions for adding flights to the cart and clearing the cart. The context
 * can be accessed using a custom hook 'useCart'.
 */
import React, { createContext, useContext, useReducer } from "react";

// Define the initial state of the cart
const initialState = {
  flights: [],
};

// Define the actions for updating the cart
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        flights: [...state.flights, action.payload],
      };
    case "CLEAR_CART":
      return {
        ...state,
        flights: [],
      };
    default:
      return state;
  }
};

// Create the Cart Context
const CartContext = createContext();

// Create the Cart Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Function to add a flight to the cart
  const addToCart = (flight) => {
    dispatch({ type: "ADD_TO_CART", payload: flight });
  };

  // Function to clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider value={{ cart: state, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the Cart Context
export const useCart = () => {
  return useContext(CartContext);
};
