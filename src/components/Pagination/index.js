import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalCount, perPage, onPageChange }) => {
  // Function to handle page click
  const totalPageCount = React.useMemo(
    () => Math.ceil(totalCount / perPage),
    [totalCount, perPage]
  );
  const handleClick = (page) => {
    onPageChange(page);
  };

  // Generate page numbers
  const pages = Array.from({ length: totalPageCount }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
