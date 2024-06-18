import React from 'react';
import './Modal.css';

const Modal = ({ show, movie, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{movie.title}</h2>
        <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
        <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default Modal;

// import React, { useState, useEffect } from 'react';
// import './Modal.css';

// const Modal = ({ show, movie, onClose }) => {
//   const [showTrailer, setShowTrailer] = useState(false);
//   const [trailerKey, setTrailerKey] = useState(null);

//   useEffect(() => {
//     if (show && movie) {
//       const trailer = movie.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
//       if (trailer) {
//         setTrailerKey(trailer.key);
//         const timer = setTimeout(() => {
//           setShowTrailer(true);
//         }, 3000); // Play trailer after 3 seconds
//         return () => clearTimeout(timer);
//       }
//     }
//     setTrailerKey(null);
//   }, [show, movie]);

//   const handleClose = () => {
//     setShowTrailer(false);
//     onClose();
//   };

//   return (
//     <div className={`modal ${show ? 'show' : ''}`}>
//       <div className="modal-content">
//         <span className="close-button" onClick={handleClose}>&times;</span>
//         {showTrailer && trailerKey ? (
//           <iframe
//             title="movie-trailer"
//             width="560"
//             height="315"
//             src={`https://www.youtube.com/embed/${trailerKey}`}
//             frameBorder="0"
//             allowFullScreen
//           ></iframe>
//         ) : (
//           <img
//             src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
//             alt="Backdrop"
//           />
//         )}
//         <h2>{movie.title}</h2>
//         <p>{movie.overview}</p>
//       </div>
//     </div>
//   );
// };

// export default Modal;
