import React, { useEffect, useState } from 'react';
import './NewsPage.css';

const API_URL = 'https://news-site-by-rohit-khairnar.onrender.com/api/news';

const NewsPage = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setNewsItems(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="news-scroll-area">
      <h2 className="section-heading mb-4">
        Latest Headlines
      </h2>

      {loading ? (
        <h4>Loading news...</h4>
      ) : (
        <div className="news-feed">
          {newsItems.map((item) => (
            <div className="news-row" key={item._id}>

              <img
                src={item.thumbnail}
                alt={item.title}
                className="news-thumbnail"
              />

              <div className="news-content">
                <h5 className="news-title">
                  {item.title}
                </h5>

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
      )}
    </div>
  );
};

export default NewsPage;