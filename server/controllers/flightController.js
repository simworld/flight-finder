const Flight = require("../models/flightModel");

// Get all flights based on departure, destination, and date
exports.getAllFlights = (req, res) => {
  const { departure, destination, date } = req.query;

  // Use trim() to remove leading and trailing whitespaces
  const sanitizedDeparture = departure ? departure.trim() : "";
  const sanitizedDestination = destination ? destination.trim() : "";

  const filter = {};
  if (sanitizedDeparture)
    filter.departureCity = new RegExp(sanitizedDeparture, "i");
  if (sanitizedDestination)
    filter.arrivalCity = new RegExp(sanitizedDestination, "i");
  if (date) {
    // Use departureDay for date filtering
    filter.departureDay = new Date(date).toISOString().split("T")[0];
  }

  Flight.aggregate([
    { $match: filter },
    {
      $group: {
        _id: "$id",
        flight: { $first: "$$ROOT" },
      },
    },
    { $replaceRoot: { newRoot: "$flight" } },
  ])
    .exec()
    .then((flights) => res.json(flights))
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Get all one-way and return flights based on given criteria
exports.getAllFlightsReturn = async (req, res) => {
  try {
    const { departure, destination, date, returnDate } = req.query;

    // Use trim() to remove leading and trailing whitespaces
    const sanitizedDeparture = departure ? departure.trim() : "";
    const sanitizedDestination = destination ? destination.trim() : "";
    const sanitizedReturnDate = returnDate ? returnDate.trim() : "";

    // One-way flights filter
    const oneWayFilter = {
      departureCity: new RegExp(sanitizedDeparture, "i"),
      arrivalCity: new RegExp(sanitizedDestination, "i"),
    };

    // Return flights filter
    const returnFilter = {
      departureCity: new RegExp(sanitizedDestination, "i"),
      arrivalCity: new RegExp(sanitizedDeparture, "i"),
    };

    if (date) {
      oneWayFilter.departureDay = new Date(date).toISOString().split("T")[0];
    }

    if (sanitizedReturnDate) {
      returnFilter.departureDay = new Date(sanitizedReturnDate)
        .toISOString()
        .split("T")[0];
    }

    // Fetch one-way and return flights separately
    const [oneWayFlights, returnFlights] = await Promise.all([
      Flight.find(oneWayFilter),
      Flight.find(returnFilter),
    ]);

    // Combine results into a single array
    let flights = [...oneWayFlights, ...returnFlights];

    // If no return date provided, filter flights based on departure date only
    if (!sanitizedReturnDate && date) {
      flights = flights.filter(
        (flight) => flight.departureDay === oneWayFilter.departureDay
      );
    }

    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get departure city suggestions
exports.getDepartureCitySuggestions = (req, res) => {
  const { input } = req.query;

  Flight.find({ departureCity: new RegExp(`^${input}`, "i") })
    .distinct("departureCity")
    .sort("departureCity") // Sort the suggestions alphabetically
    .exec()
    .then((cities) => res.json(cities))
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Get destination city suggestions
exports.getDestinationCitySuggestions = (req, res) => {
  const { input } = req.query;

  Flight.find({ arrivalCity: new RegExp(`^${input}`, "i") })
    .distinct("arrivalCity")
    .sort("arrivalCity") // Sort the suggestions alphabetically
    .exec()
    .then((cities) => res.json(cities))
    .catch((err) => res.status(500).json({ error: err.message }));
};
