/* eslint-disable no-unused-vars */
import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Import the search icon from react-icons

const SearchInput = () => {
  return (
    <div className="d-flex align-items-center justify-content-center  ">
      <div className="input-group  " style={{ maxWidth: '500px', }}>
        <input
          style={{ borderTopLeftRadius: '30px', borderBottomLeftRadius: '40px' }}
          type="text"
          className="form-control "
          placeholder="Find Your Dream Job"

        />
        <span style={{ borderBottomRightRadius: '30px', borderTopRightRadius: '30px' }} className="input-group-text" id="search-icon">
          <FaSearch color='green' />
        </span>
      </div>
    </div>
  );
};

export default SearchInput;
