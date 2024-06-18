import React from 'react';
import './Header.css';
import SearchBar from '../SearchBar/SearchBar';

const Header = ({ searchQuery, handleSearchChange, handleSearch }) => {
  const handleClick = () => {
    window.location.href = '/'; // Redirect to home page
  };

  return (
    <header className="header">
      <div className='page-title' onClick={handleClick}>
        <h1><img src="/Flixster-Logo.svg" alt="Site Logo" /></h1>
      </div>
      <div className='search-bar'>
        <SearchBar
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          handleSearch={handleSearch}
        />
      </div>
    </header>
  );
};

export default Header;
