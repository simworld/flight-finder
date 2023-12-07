/**
 * Flight Component
 *
 * This React component represents a single flight item. It displays information
 * about the flight, such as airline, flight number, departure, arrival, price,
 * and the number of available seats. The component includes a click event handler
 * to handle flight selection. The selected flight is stored in the local storage
 * to be used in the shopping cart.
 */
import React from "react";

const Flight = ({ flight, passengers, onFlightSelect }) => {
  const seatsAvailable = flight.seats;

  const formattedDepartureTime = `${flight.departureDay} ${flight.departureTime}`;
  const formattedArrivalTime = `${flight.arrivalDay} ${flight.arrivalTime}`;

  const handleFlightSelect = () => {
    // Log information or perform any action on flight selection
    console.log("Selected Flight:", flight);

    // Get existing cart from local storage
    const existingCart =
      JSON.parse(localStorage.getItem("selectedFlights")) || [];

    // Check if the flight is already in the cart
    const isFlightInCart = existingCart.some(
      (cartItem) => cartItem._id === flight._id
    );

    // If not, add it to the cart
    if (!isFlightInCart) {
      const newCart = [...existingCart, flight];
      // Save the updated cart in local storage
      localStorage.setItem("selectedFlights", JSON.stringify(newCart));
    }

    // If you have a callback function, you can call it here
    if (onFlightSelect) {
      onFlightSelect(flight);
    }
  };

  return (
    <li key={flight._id} onClick={handleFlightSelect}>
      <h2>
        {flight.airline} - {flight.flightNumber}
      </h2>
      <p>
        <span>Departure:</span> {flight.departureCity} -{" "}
        {formattedDepartureTime}
      </p>
      <p>
        <span>Arrival:</span> {flight.arrivalCity} - {formattedArrivalTime}
      </p>
      <p>
        <span>Price:</span> {flight.price}
      </p>
      <p>
        <span>Seats Available:</span>{" "}
        {seatsAvailable >= passengers
          ? seatsAvailable - passengers
          : "Not Available"}
      </p>
    </li>
  );
};

export default Flight;
