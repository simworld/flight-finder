/**
 * Cart Component
 *
 * This React component represents a shopping cart for flight bookings. It receives the current cart state
 * and an onUpdateCart function to handle cart updates. The cart displays a list of selected flights with
 * details such as airline, flight number, departure and arrival information. Users can remove flights from
 * the cart individually. Additionally, the component allows users to book the selected flights, clearing
 * the cart and displaying a booking message upon successful booking.
 */
import React, { useState } from "react";

const Cart = ({ cart, onUpdateCart }) => {
  const [bookingMessage, setBookingMessage] = useState("");

  const handleDelete = (flightId) => {
    // Remove the flight with the specified ID from the cart
    const updatedCart = cart.filter((flight) => flight._id !== flightId);
    onUpdateCart(updatedCart);
  };

  const handleBookFlights = () => {
    // Clear the cart
    onUpdateCart([]);

    // Display booking message
    setBookingMessage("Flights booked successfully!");
  };

  return (
    <div>
      {cart.length > 0 ? (
        <div className="cart-container">
          {cart.map((flight) => (
            <div className="cart-item" key={flight._id}>
              <h3>
                {flight.airline} - {flight.flightNumber}
              </h3>
              <p>
                Departure: {flight.departureCity} - Arrival:{" "}
                {flight.arrivalCity}
              </p>
              <p>
                {" "}
                Day: {flight.departureDay} - Arrival: {flight.arrivalDay}
              </p>
              <p>
                Time: {flight.departureTime} - Arrival: {flight.arrivalTime}
              </p>
              <button onClick={() => handleDelete(flight._id)}>Remove</button>
            </div>
          ))}
          <div className="booking-button">
            <button onClick={handleBookFlights}>Book</button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
      {bookingMessage && <p className="booking-message">{bookingMessage}</p>}
    </div>
  );
};

export default Cart;
