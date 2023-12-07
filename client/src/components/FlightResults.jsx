/**
 * FlightResults Component
 *
 * This React component displays the available flights based on the search criteria. It supports
 * pagination to show a limited number of flights per page. The flights are sorted by departure day
 * in descending order. The Flight component is used to render each individual flight card.
 */

import React, { useState } from "react";
import Flight from "./Flight";

const FlightResults = ({ showResults, flights, passengers }) => {
  const flightsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;

  // Sort flights by departureDay in descending order
  const sortedFlights = [...flights].sort((a, b) => {
    return new Date(b.departureDay) - new Date(a.departureDay);
  });

  // Get the current flights based on pagination
  const currentFlights = sortedFlights.slice(
    indexOfFirstFlight,
    indexOfLastFlight
  );

  const totalPages = Math.ceil(sortedFlights.length / flightsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {showResults && (
        <div className="results">
          <h2>Available Flights</h2>
          {sortedFlights.length > 0 ? (
            <>
              <div className="flight-cards">
                {currentFlights.map((flight) => (
                  <div className="flight-card" key={flight.id}>
                    <Flight flight={flight} passengers={passengers} />
                  </div>
                ))}
              </div>
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p>No flights found for the selected criteria.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FlightResults;
