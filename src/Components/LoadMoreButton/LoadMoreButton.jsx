import React from 'react';
import './LoadMoreButton.css'

const LoadMoreButton = ({ handleLoadMore }) => {
  return (
    <button onClick={handleLoadMore} className="load-more-button">
      Load More
    </button>
  );
};

export default LoadMoreButton;
