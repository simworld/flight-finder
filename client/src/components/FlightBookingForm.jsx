/**
 * FlightBookingForm Component
 *
 * This React component serves as the main interface for flight bookings. It includes a search form
 * for users to find one-way or return flights based on departure, destination, date, and passenger count.
 * The component leverages Axios for making API requests to retrieve flight data and displays results using
 * the FlightResults component. Users can switch between one-way and return tabs, and navigate to the
 * shopping cart page. Additionally, input suggestions are provided for departure and destination cities.
 */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import axios from "axios";
import SearchForm from "./SearchForm";
import FlightResults from "./FlightResults";
import CartPage from "./CartPage";

const FlightBookingForm = () => {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [flights, setFlights] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [departureSuggestions, setDepartureSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [isReturnTab, setIsReturnTab] = useState(false);

  useEffect(() => {
    // Fetch all flights when the component mounts
    axios
      .get("http://localhost:3001/api/flights")
      .then((response) => setFlights(response.data))
      .catch((error) => console.error("Error fetching flights:", error));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      if (isReturnTab) {
        // If it's a return search, use handleSearchReturn
        await handleSearchReturn(e);
      } else {
        // Otherwise, perform the one-way search
        const response = await axios.get("http://localhost:3001/api/flights", {
          params: {
            departure,
            destination,
            date,
            returnDate,
          },
        });

        const data = response.data;

        console.log("Filtered Flight data:", data);

        setFlights(data);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  const handleSearchReturn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        "http://localhost:3001/api/flightsReturn",
        {
          params: {
            departure,
            destination,
            date,
            returnDate,
          },
        }
      );

      const data = response.data;

      console.log("Filtered Flight data:", data);

      setFlights(data);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching return flights:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  const handleDepartureChange = async (value) => {
    // Validate if the input contains only letters
    if (/^[A-Za-z\s]+$/.test(value) || value === "") {
      setDeparture(value);
      try {
        // Fetch departure city suggestions from the server
        const response = await axios.get(
          "http://localhost:3001/api/departureCities",
          {
            params: {
              input: value,
            },
          }
        );
        const suggestions = response.data;
        setDepartureSuggestions(suggestions);
      } catch (error) {
        console.error("Error fetching departure city suggestions:", error);
      }
    } else {
      // Display an error or inform the user that only letters are allowed
      console.error("Invalid characters in the departure city");
    }
  };

  const handleDestinationChange = async (value) => {
    // Validate if the input contains only letters
    if (/^[A-Za-z\s]+$/.test(value) || value === "") {
      setDestination(value);
      try {
        // Fetch destination city suggestions from the server
        const response = await axios.get(
          "http://localhost:3001/api/destinationCities",
          {
            params: {
              input: value,
            },
          }
        );
        const suggestions = response.data;
        setDestinationSuggestions(suggestions);
      } catch (error) {
        console.error("Error fetching destination city suggestions:", error);
      }
    } else {
      // Display an error or inform the user that only letters are allowed
      console.error("Invalid characters in the destination city");
    }
  };

  // Function to handle tab change
  const handleTabChange = (isReturn) => {
    setIsReturnTab(isReturn);
    setReturnDate(""); // Reset returnDate when changing tabs
  };

  return (
    <Router>
      <div className="flight-booking-container">
        <nav>
          <ul>
            <li>
              <Link to="/" className="nav-item">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="nav-item">
                Shopping Cart
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/"
            element={
              <div>
                <h1>Flight Booking</h1>
                <div className="tabs">
                  <div
                    className={`tab ${!isReturnTab ? "active" : ""}`}
                    onClick={() => handleTabChange(false)}
                  >
                    One Way
                  </div>
                  <div
                    className={`tab ${isReturnTab ? "active" : ""}`}
                    onClick={() => handleTabChange(true)}
                  >
                    Return
                  </div>
                </div>
                <SearchForm
                  departure={departure}
                  destination={destination}
                  date={date}
                  returnDate={returnDate}
                  passengers={passengers}
                  departureSuggestions={departureSuggestions}
                  destinationSuggestions={destinationSuggestions}
                  handleDepartureChange={handleDepartureChange}
                  handleDestinationChange={handleDestinationChange}
                  handleSearch={handleSearch}
                  handleSearchReturn={handleSearchReturn}
                  setDate={setDate}
                  setReturnDate={setReturnDate}
                  setPassengers={setPassengers}
                  isReturnTab={isReturnTab}
                />
                <FlightResults
                  showResults={showResults}
                  flights={flights}
                  passengers={passengers}
                />
                {/* <Cart cart={cart} onUpdateCart={handleUpdateCart} /> */}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default FlightBookingForm;
