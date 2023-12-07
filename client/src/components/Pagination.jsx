/**
 * Pagination Component
 *
 * This React component provides a simple pagination UI with buttons to navigate through pages. It
 * receives the total number of pages, the current page, and a function to handle page changes as props.
 *
 */
import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={index + 1 === currentPage ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
