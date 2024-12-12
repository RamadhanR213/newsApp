import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { saveNews, unsaveNews } from '../store/savedNewsSlice';
import NewsCard from '../components/NewsCard';

const Programming = () => {
  const [news, setNews] = useState([]);
  const savedNews = useSelector((state) => state.savedNews.items);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
        params: {
          q: 'Programming',
          'api-key': 'QSvP5lfXArmGjKRhP3JnGyVXGo5DcHQe',
        },
      })
      .then((response) => {
        setNews(response.data.response.docs);
      })
      .catch((error) => {
        console.error('Error fetching programming news:', error);
      });
  }, []);

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
      <h2>Programming News</h2>
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
    </div>
  );
};

export default Programming;
