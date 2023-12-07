/**
 * SearchForm Component
 *
 * This React component represents a form for users to input their flight search criteria, including
 * departure and arrival cities, departure and return dates (if applicable), and the number of passengers.
 * It also provides autocomplete suggestions for departure and arrival cities based on user input.
 */

import React from "react";

const SearchForm = ({
  departure,
  destination,
  date,
  returnDate,
  passengers,
  departureSuggestions,
  destinationSuggestions,
  handleDepartureChange,
  handleDestinationChange,
  handleSearch,
  setDate,
  setReturnDate,
  setPassengers,
  isReturnTab,
}) => {
  return (
    <form onSubmit={handleSearch}>
      <div className="section">
        <label id="departure">
          Departure City:
          <input
            type="text"
            value={departure}
            onChange={(e) => handleDepartureChange(e.target.value)}
            list="departure-suggestions"
            required
            placeholder="Dublin"
          />
          <datalist id="departure-suggestions">
            {departureSuggestions.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </label>
        <label id="arrival">
          Arrival City:
          <input
            type="text"
            value={destination}
            onChange={(e) => handleDestinationChange(e.target.value)}
            list="destination-suggestions"
            required
            placeholder="Rome"
          />
          <datalist id="destination-suggestions">
            {destinationSuggestions.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </label>
      </div>

      <div className="section">
        <label>
          Departure Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        {isReturnTab && (
          <>
            {/* <label id="return-departure">
              Return Departure City:
              <input
                type="text"
                value={destination}
                onChange={(e) => handleDepartureChange(e.target.value)}
                list="return-departure-suggestions"
                required
                placeholder="Rome"
              />
              <datalist id="return-departure-suggestions">
                {destinationSuggestions.map((city, index) => (
                  <option value={city} key={index} />
                ))}
              </datalist>
            </label>
            <label id="return-arrival">
              Return Arrival City:
              <input
                type="text"
                value={departure}
                onChange={(e) => handleDestinationChange(e.target.value)}
                list="return-arrival-suggestions"
                required
                placeholder="Dublin"
              />
              <datalist id="return-arrival-suggestions">
                {departureSuggestions.map((city, index) => (
                  <option value={city} key={index} />
                ))}
              </datalist>
            </label> */}
            <label>
              Return Date:
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </label>
          </>
        )}
        <label>
          Passengers:
          <input
            type="number"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            min="1"
            required
          />
        </label>
      </div>
      <button type="submit">Search Flights</button>
    </form>
  );
};

export default SearchForm;
