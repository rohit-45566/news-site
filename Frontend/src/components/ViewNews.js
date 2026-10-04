import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ViewNews.css';

const API_URL = 'https://news-site-by-rohit-khairnar.onrender.com/api/news';

const ViewNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchNews = async () => {
      try {
        // Current news
        const newsResponse = await fetch(`${API_URL}/${id}`);
        const newsData = await newsResponse.json();

        if (!newsResponse.ok) {
          setNews(null);
          setLoading(false);
          return;
        }

        setNews(newsData.data);

        // All news for related articles
        const allResponse = await fetch(API_URL);
        const allData = await allResponse.json();

        setAllNews(allData.data || []);
      } catch (error) {
        console.error('Error fetching news:', error);
        setNews(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5">
        <h3>Loading news...</h3>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="container py-5">
        <h3>News not found.</h3>
      </div>
    );
  }

  const relatedNews = allNews.filter(
    (item) =>
      item.category?.toLowerCase() === news.category?.toLowerCase() &&
      item._id !== news._id
  );

  return (
    <div className="view-news-container container py-5">

      {/* MAIN NEWS */}
      <div className="main-news mb-5">

        <h1 className="news-title">
          {news.title}
        </h1>

        <div className="news-image-wrapper">
          <img
            src={news.thumbnail}
            alt={news.title}
            className="news-image"
          />
        </div>

        <div className="news-meta">
          <span
            className="category-badge"
            onClick={() => navigate(`/category/${news.category}`)}
          >
            {news.category?.toUpperCase()}
          </span>
        </div>

        <p className="news-content">
          {news.content}
        </p>

      </div>

      {/* RELATED NEWS */}
      {relatedNews.length > 0 && (
        <div className="related-news">

          <h3 className="related-heading">
            More from{' '}
            <span className="highlight">
              {news.category}
            </span>
          </h3>

          <div className="row g-4">

            {relatedNews.map((item) => (
              <div className="col-md-4" key={item._id}>

                <div className="related-card">

                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="related-img"
                  />

                  <div className="related-body">

                    <h5 className="related-title">
                      {item.title}
                    </h5>

                    <p className="related-text">
                      {item.content?.substring(0, 80)}...
                    </p>

                    <Link
                      to={`/news/${item._id}`}
                      className="read-more-btn"
                    >
                      Read More →
                    </Link>

                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>
      )}

    </div>
  );
};

export default ViewNews;