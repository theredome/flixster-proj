import React from 'react';
import './FilterDropdown.css'

function FilterDropdown({ genres, selectedGenre, handleGenreChange }) {
  return (
    <div className="filtered-dropdown">
    <select value={selectedGenre} onChange={handleGenreChange}>
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>{genre.name}</option>
      ))}
    </select>
    </div>
  );
}

export default FilterDropdown;

