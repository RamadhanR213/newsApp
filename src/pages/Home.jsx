import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveNews, unsaveNews } from '../store/savedNewsSlice';
import NewsCard from '../components/NewsCard';

const Home = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [mostViewedNews, setMostViewedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [savedStatus, setSavedStatus] = useState({});

  const savedNews = useSelector((state) => state.savedNews.items); 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const latestResponse = await axios.get('https://api.nytimes.com/svc/topstories/v2/home.json', {
          params: {
            'api-key': 'QSvP5lfXArmGjKRhP3JnGyVXGo5DcHQe',
          },
        });

        if (latestResponse.status === 200) {
          setLatestNews(latestResponse.data.results);
        } else {
          setError('Failed to fetch latest news');
        }

        const mostViewedResponse = await axios.get('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json', {
          params: {
            'api-key': 'QSvP5lfXArmGjKRhP3JnGyVXGo5DcHQe',
          },
        });

        if (mostViewedResponse.status === 200) {
          setMostViewedNews(mostViewedResponse.data.results);
        } else {
          setError('Failed to fetch most viewed news');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleToggleSave = (article) => {
    const isSaved = savedStatus[article.web_url];
    if (isSaved) {
      dispatch(unsaveNews(article)); 
    } else {
      dispatch(saveNews(article)); 
    }

    setSavedStatus((prevStatus) => ({
      ...prevStatus,
      [article.web_url]: !isSaved, 
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Latest News</h2>
      <div className="row">
        {latestNews.length > 0 ? (
          latestNews.map((article, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
              <NewsCard
                article={article}
                onToggleSave={handleToggleSave}
                isSaved={savedStatus[article.web_url] || false} 
              />
            </div>
          ))
        ) : (
          <p>No latest news available.</p>
        )}
      </div>

      <h2>Most Viewed News</h2>
      <div className="row">
        {mostViewedNews.length > 0 ? (
          mostViewedNews.map((article, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
              <NewsCard
                article={article}
                onToggleSave={handleToggleSave}
                isSaved={savedStatus[article.web_url] || false} 
              />
            </div>
          ))
        ) : (
          <p>No most viewed news available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
