import React from 'react';

const NewsCard = ({ article, isSaved, onToggleSave }) => {
  return (
    <div className="card mb-4">
      <img
        src={
          article.multimedia?.[0]?.url
            ? `https://www.nytimes.com/${article.multimedia[0].url}`
            : 'https://via.placeholder.com/150'
        }
        className="card-img-top"
        alt={article.headline?.main || 'Article'}
      />
      <div className="card-body">
        <h5 className="card-title">{article.headline?.main}</h5>
        <p className="card-text">{article.abstract || 'No description available.'}</p>
        <a
          href={article.web_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Read More
        </a>
        <button
          className={`btn ${isSaved ? 'btn-danger' : 'btn-success'} ml-2`}
          onClick={() => onToggleSave(article)} 
        >
          {isSaved ? 'Unsave' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
