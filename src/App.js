import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { getCountries } from "./api/countriesApi";
import "./App.css";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table/Table";

// Debounce function
const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

function App() {
  const initialData = {
    countriesData: [],
    currentPage: 1,
    perPageLimit: 3,
    totalCount: 0,
    loader: false,
    searchTerm: ''
  }

  const [data, setData] = useState(initialData);
  const [pageLimitError, setPageLimitError] = useState(false);

  const fetchCountries = async (
    page = data.currentPage,
    searchQuery = "",
    perPage = data.perPageLimit
  ) => {
    setData((prevState) => ({ ...prevState, loader: true }));
    try {
      const response = await getCountries({
        currentOffset: page,
        limit: perPage,
        namePrefix: searchQuery,
      });
      setData((prevState) => ({
        ...prevState,
        countriesData: response?.data?.data,
        totalCount: response?.data?.metadata?.totalCount,
        loader: false,
      }));
    } catch (error) {
      setData((prevState) => ({ ...prevState, loader: false }));
    }
  };

  // Debounce the handleSearch function
  const debouncedSearch = debounce((query) => {
    fetchCountries(1, query);
    setData((prevState) => ({ ...prevState, currentPage: 1, searchTerm: query }));
  }, 500);

  const handleSearch = (query) => {
    if(query === '') {
      setData(initialData);
    } else {
      debouncedSearch(query);
    }
  };

  const handlePageChange = (page) => {
    setData((prevState) => ({
      ...prevState,
      currentPage: page?.selected + 1,
    }));

    fetchCountries(page?.selected + 1, data?.searchTerm);
  };

  const handleLimitChange = (event) => {
    const limit = parseInt(event.target.value);
    if (!isNaN(limit) && limit >= 0 && limit < 11) {
      setData((prevState) => ({
        ...prevState,
        perPageLimit: limit,
        currentPage: 1,
      }));

      setPageLimitError(false);

      fetchCountries(1, data?.searchTerm);
    } else {
      if(limit > 10) {
        setPageLimitError(true);
      }
    }
  };

  const { countriesData, currentPage, perPageLimit, totalCount, loader } =
  data;

  return (
    <>
      <div className="container">
        <SearchBox onSearch={handleSearch} loader={loader} />
        <Table searchTerm={data.searchTerm} searchData={countriesData} loader={loader} />

        {countriesData.length > 0 && (
          <div className={`pagination-container ${loader ? 'no-click' : ''}`}>
            <ReactPaginate
              disabledLinkClassName="disabled"
              breakLabel="..."
              nextLabel="Next >"
              forcePage={currentPage - 1}
              onPageChange={handlePageChange}
              pageRangeDisplayed={3}
              pageCount={Math.ceil(totalCount / perPageLimit)}
              previousLabel="< Previous"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
            <div className="pagination-limit">
              Per page :
              <input
                id="perPageLimit"
                type="number"
                value={perPageLimit}
                onChange={handleLimitChange}
              />

              {pageLimitError && (
                <p className="warning">
                  Please select a value less than or equal to 10.
                </p>
              )}
            </div>
          </div>
        )}
        
      </div>
    </>
  );
}

export default App;
