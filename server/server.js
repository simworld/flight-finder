const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./database/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Load environment variables
dotenv.config({ path: "config.env" });

// Connection to MongoDB
connectDB();

// Controllers
const flightController = require("./controllers/flightController");

// API Endpoints
app.get("/api/flights", flightController.getAllFlights);
app.get("/api/flightsReturn", flightController.getAllFlightsReturn);
app.get("/api/departureCities", flightController.getDepartureCitySuggestions);
app.get(
  "/api/destinationCities",
  flightController.getDestinationCitySuggestions
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
