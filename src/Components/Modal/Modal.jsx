
import React, { useState, useEffect, useRef } from 'react';
import './Modal.css';

const Modal = ({ show, movie, onClose }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (show && movie && movie.trailerKey) {
      const timer = setTimeout(() => {
        setShowTrailer(true);
      }, 8000); // Play trailer after 3 seconds
      return () => clearTimeout(timer);
    } else {
      setShowTrailer(false); // Reset when modal is closed or movie changes
    }
  }, [show, movie]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);

  const handleClose = () => {
    setShowTrailer(false);
    onClose();
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content" ref={modalRef}>
        <span className="close-button" onClick={handleClose}>&times;</span>
        {movie && (
          <>
            {showTrailer && movie.trailerKey ? (
              <iframe
                title="movie-trailer"
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${movie.trailerKey}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                alt="Backdrop"
              />
            )}
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p><strong>Length:</strong> {movie.runtime} minutes</p>
            <p><strong>Genre:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;

