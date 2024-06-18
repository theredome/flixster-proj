import React from 'react';
import './SortDropdown.css'

function SortDropdown({ sortOption, handleSortChange }) {
  return (
    <div className='sort-dropdown'>
    <select value={sortOption} onChange={handleSortChange}>
      <option value="popularity.desc">Popularity Descending</option>
      <option value="popularity.asc">Popularity Ascending</option>
      <option value="release_date.desc">Release Date Descending</option>
      <option value="release_date.asc">Release Date Ascending</option>
      <option value="title.desc">Title Z-A</option>
      <option value="title.asc">Title A-Z</option>
    </select>
    </div>
  );
}

export default SortDropdown;
