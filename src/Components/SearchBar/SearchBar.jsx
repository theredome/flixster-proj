import React from 'react';
import './SearchBar.css'

const SearchBar = ({ searchQuery, handleSearchChange, handleSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search for a movie..."
      />
     
    </div>
  );
};

export default SearchBar;