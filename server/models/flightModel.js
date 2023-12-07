const mongoose = require("mongoose");

// Model for the flight data
const flightSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  flightNumber: String,
  airline: String,
  departureCity: String,
  departureDay: String,
  departureTime: String,
  arrivalCity: String,
  arrivalDay: String,
  arrivalTime: String,
  price: String,
  seats: Number,
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
