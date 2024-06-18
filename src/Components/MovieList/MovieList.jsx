import React, { useState, useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import SearchBar from '../SearchBar/SearchBar';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import Modal from '../Modal/Modal';
import FilterDropdown from '../FilterDropdown/FilterDropdown';
import SortDropdown from '../SortDropdown/SortDropdown';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './MovieList.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOption, setSortOption] = useState('popularity.desc'); // Set to "popularity.desc" by default
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [page, searchQuery, selectedGenre, sortOption]);

  const fetchMovies = async () => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sortOption}&page=${page}`;

    if (searchQuery) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&query=${searchQuery}`;
    }

    if (selectedGenre) {
      url += `&with_genres=${selectedGenre}`;
    }

    console.log('Fetching Movies with URL:', url); // Debug statement
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      console.log('API Response Data:', data); // Debug statement

      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies(prevMovies => [...prevMovies, ...data.results]);
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  const fetchGenres = async () => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }
      const data = await response.json();
      console.log('Fetched Genres:', data.genres); // Debug statement
      setGenres(data.genres);
    } catch (error) {
      console.error('Error fetching genre data:', error);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleMovieClick = (movieId) => {
    fetchMovieDetails(movieId);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset page to 1 when search query changes
  };

  const handleSearch = () => {
    fetchMovies();
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleGenreChange = (event) => {
    const genre = event.target.value;
    console.log('Selected Genre:', genre);
    setSelectedGenre(genre);
    setPage(1); // Reset page to 1 when genre changes
  };

  const handleSortChange = (event) => {
    const sort = event.target.value;
    console.log('Selected Sort Option:', sort);
    setSortOption(sort);
    setPage(1); // Reset page to 1 when sort option changes
  };

  return (
    <>
      <Header
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />
      <h1>Now Playing</h1>
      <div className="controls">
        <FilterDropdown
          genres={genres}
          selectedGenre={selectedGenre}
          handleGenreChange={handleGenreChange}
        />
        <SortDropdown
          sortOption={sortOption}
          handleSortChange={handleSortChange}
        />
      </div>
      <div className="main-content">
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={handleMovieClick}
            />
          ))}
        </div>
        <LoadMoreButton handleLoadMore={handleLoadMore} />
      </div>
      <Modal 
        show={selectedMovie !== null}
        movie={selectedMovie}
        onClose={handleCloseModal}
      />
      <Footer />
    </>
  );
}

export default MovieList;
