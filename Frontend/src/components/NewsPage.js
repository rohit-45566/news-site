import React, { useEffect, useState } from 'react';
import '../pages/Home.css';

const API_URL = 'https://news-site-by-rohit-khairnar.onrender.com/api/news';

const NewsPage = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch news');
        }
        return res.json();
      })
      .then((data) => {
        setNewsItems(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Unable to load news.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h3 className="text-center mt-4">Loading news...</h3>;
  }

  if (error) {
    return <h3 className="text-center mt-4">{error}</h3>;
  }

  return (
    <div className="news-scroll-area">
      <h2 className="section-heading mb-4">Latest Headlines</h2>

      <div className="news-feed">
        {newsItems.map((item) => (
          <div className="news-row" key={item._id}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="news-thumbnail"
            />

            <div className="news-content">
              <h5 className="news-title">{item.title}</h5>

              <p className="news-meta">
                {item.category}
              </p>

              <p className="news-snippet">
                {item.content?.slice(0, 120)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;