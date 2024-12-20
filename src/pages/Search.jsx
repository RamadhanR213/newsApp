import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveNews, unsaveNews } from '../store/savedNewsSlice'; 
import NewsCard from '../components/NewsCard';

const Search = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const savedNews = useSelector((state) => state.savedNews.items); 

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    if (query) {
      setLoading(true);
      axios
        .get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
          params: {
            q: query,
            'api-key': import.meta.env.VITE_API_KEY,
          },
        })
        .then((response) => {
          setNews(response.data.response.docs);
        })
        .catch(() => {
          setError('Terjadi kesalahan saat mengambil data berita');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [query]);

  const handleToggleSave = (article) => {
    const isSaved = savedNews.some((item) => item.web_url === article.web_url); 

    if (isSaved) {
      dispatch(unsaveNews(article)); 
    } else {
      dispatch(saveNews(article)); 
    }
  };

  return (
    <div className="container mt-4">
      <h2>Search Result: "{query}"</h2>

      {loading && <p>Loading news...</p>}
      {error && <p className="text-danger">{error}</p>}

      {news.length > 0 ? (
        <div className="row">
          {news.map((article, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
              <NewsCard
                article={article}
                isSaved={savedNews.some((item) => item.web_url === article.web_url)} 
                onToggleSave={handleToggleSave} 
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No Articles Found.</p>
      )}
    </div>
  );
};

export default Search; // Search fix 
