import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import './Category.css';
import Sidebar from '../components/Sidebar';

const API_URL = 'https://news-site-by-rohit-khairnar.onrender.com/api/news';

const Category = () => {
  const { category } = useParams();

  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setNewsData(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        setLoading(false);
      });
  }, []);

  const filteredNews = newsData.filter(
    (item) =>
      item.category?.toLowerCase() === category?.toLowerCase()
  );

  return (
    <div className="category-layout">

      {/* Main Content */}
      <div className="category-main">

        <h2 className="category-heading text-capitalize">
          {category} News
        </h2>

        {loading ? (
          <p className="no-news-msg">
            Loading news...
          </p>
        ) : filteredNews.length > 0 ? (

          <div className="news-list">
            {filteredNews.map((news) => (
              <NewsCard
                key={news._id}
                id={news._id}
                title={news.title}
                content={news.content}
                image={news.thumbnail}
                category={news.category}
              />
            ))}
          </div>

        ) : (

          <p className="no-news-msg">
            No news articles available in this category yet.
          </p>

        )}

      </div>

      {/* Sidebar */}
      <aside className="category-sidebar">
        <Sidebar />
      </aside>

    </div>
  );
};

export default Category;