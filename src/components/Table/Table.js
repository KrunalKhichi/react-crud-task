import React from "react";
import PropTypes from "prop-types";
import "./Table.css";
import Loader from "../Loader";

const Table = ({ searchData, loader, searchTerm }) => {
  let content = null;

  if (!searchData || searchData.length === 0) {
    content = (
      <tr>
        <td colSpan="3">
          {!loader ? searchTerm === null || searchTerm === undefined || searchTerm === ""
            ? "Start searching"
            : "No result found" : '' }
        </td>
      </tr>
    );
  } else {
    content = searchData.map((item, index) => (
      <tr key={item.id}>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>
          <div className="country-container">
            <img
              src={`https://flagsapi.com/${item?.countryCode}/flat/16.png`}
              alt="country-flag"
            />
            {item.country}
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <div className="table-container">
      {loader && <Loader />}

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {content}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  searchData: PropTypes.array,
  loader: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string
};

export default Table;
