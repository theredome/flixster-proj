import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie-card" onClick={() => onClick(movie.id)}>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>Rating: {movie.vote_average.toFixed(2)}</p>
    </div>
  );
};

export default MovieCard;
