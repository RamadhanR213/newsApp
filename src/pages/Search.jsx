import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import NewsCard from '../components/NewsCard';

const Search = () => {
  const [news, setNews] = useState([]);           
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);       
  const [savedNews, setSavedNews] = useState([]);  

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');  

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('savedNews')) || [];
    setSavedNews(savedItems);
  }, []);

  useEffect(() => {
    if (query) {
      setLoading(true);
      const fetchNews = async () => {
        try {
          const response = await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
            params: {
              q: query,
              'api-key': 'QSvP5lfXArmGjKRhP3JnGyVXGo5DcHQe',
            },
          });
          setNews(response.data.response.docs); 
        } catch (error) {
          setError('Terjadi kesalahan saat mengambil data berita');
        } finally {
          setLoading(false);
        }
      };
      fetchNews();
    }
  }, [query]);

  const handleToggleSave = (article) => {
    const isSaved = savedNews.some((item) => item.web_url === article.web_url);

    let updatedNews;
    if (isSaved) {
      updatedNews = savedNews.filter((item) => item.web_url !== article.web_url);
    } else {
      updatedNews = [...savedNews, article];
    }

    setSavedNews(updatedNews);
    localStorage.setItem('savedNews', JSON.stringify(updatedNews));
  };

  return (
    <div className="container mt-4">
      <h2>Hasil Pencarian: "{query}"</h2>

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
        <p>Tidak ada berita ditemukan.</p>
      )}
    </div>
  );
};

export default Search;
