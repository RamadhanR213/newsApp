import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unsaveNews } from '../store/savedNewsSlice'; 
import NewsCard from '../components/NewsCard';

const Saved = () => {
  const [savedArticles, setSavedArticles] = useState([]);
  const savedNews = useSelector((state) => state.savedNews.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSavedArticles = () => {
      const articles = savedNews;
      setSavedArticles(articles);
    };

    fetchSavedArticles();
  }, [savedNews]); 

  const handleToggleSave = (article) => {
    dispatch(unsaveNews(article)); 
  };

  return (
    <div>
      <h2>Saved Articles</h2>
      <div className="row">
        {savedArticles.length > 0 ? (
          savedArticles.map((article, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
              <NewsCard
                article={article}
                isSaved={true}  
                onToggleSave={handleToggleSave}  
              />
            </div>
          ))
        ) : (
          <p>No saved articles yet.</p>
        )}
      </div>
    </div>
  );
};

export default Saved;
