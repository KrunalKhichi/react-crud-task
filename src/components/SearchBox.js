import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const SearchBox = ({ onSearch, loader, searchTerm }) => {
  const inputRef = useRef();
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);

    if(event.target.value === '') {
      onSearch(event.target.value);
    }
  };

  const focusInput = () => {
    // Programmatically focus on the input element
    inputRef.current.focus();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        focusInput();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Ensure this effect runs only once

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && query !== "" && searchTerm !== query) {
      onSearch(query);
    }
  };

  return (
    <div className="search-box-container">
      <input
        ref={inputRef}
        className="search-box"
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Search..."
        disabled={loader}
        autoFocus
      />
      <div className="keyboard-shortcut">Ctrl + /</div>
    </div>
  );
};

SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired,
};

export default SearchBox;
