import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Import the search icon from react-icons

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm); // Pass the search term to the parent component
  };

  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <div className="input-group" style={{ maxWidth: '500px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Find Your Dream Job"
          value={searchTerm}
          onChange={handleChange}
          style={{ borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px' }}
        />
        <span
          className="input-group-text"
          id="search-icon"
          style={{ borderBottomRightRadius: '30px', borderTopRightRadius: '30px', cursor: 'pointer' }}
          onClick={handleSearch}
        >
          <FaSearch color='green' />
        </span>
      </div>
    </div>
  );
};

export default SearchInput;
