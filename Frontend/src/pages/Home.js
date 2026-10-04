import React from 'react';
import './Home.css';

import HeroCarousel from '../components/HeroCarousel';
import NewsPage from '../components/NewsPage';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const staticNews = [
    {
      title: "India Announces Major Technology Initiative",
      category: "Technology",
      description:
        "The government has announced a new technology initiative focused on digital innovation, startups and opportunities for young developers."
    },
    {
      title: "India's Cricket Team Begins New Tournament",
      category: "Sports",
      description:
        "The Indian cricket team has started preparations for an important upcoming tournament with players focusing on performance and fitness."
    },
    {
      title: "New Space Mission Enters Final Testing",
      category: "Science",
      description:
        "Scientists and engineers are completing the final testing phase of a new space mission designed to improve research and scientific understanding."
    },
    {
      title: "Digital Education Expands Across India",
      category: "Education",
      description:
        "Digital learning platforms are becoming increasingly popular among students, providing easier access to courses, study material and learning resources."
    }
  ];

  return (
    <div className="home-wrapper">

      {/* MAIN CONTENT */}
      <div className="main-content-scrolll">

        {/* HERO CAROUSEL */}
        <section className="mb-4">
          <HeroCarousel />
        </section>

        {/* WELCOME */}
        <section
          className="p-4 mb-4 rounded-4"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <h1 className="text-white fw-bold">
            Welcome to Our News Portal 📰
          </h1>

          <p className="text-light mb-0">
            Get the latest updates, breaking news and important
            stories from around the world.
          </p>
        </section>

        {/* STATIC NEWS */}
        <section className="mb-5">

          <h2 className="text-white mb-4">
            Latest News
          </h2>

          <div className="news-feed">

            {staticNews.map((news, index) => (
              <div className="news-row" key={index}>

                <div className="news-content">

                  <h4 className="news-title text-white">
                    {news.title}
                  </h4>

                  <p className="news-meta">
                    {news.category} | Latest Update
                  </p>

                  <p className="news-snippet text-light">
                    {news.description}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </section>

        {/* LIVE NEWS FROM BACKEND */}
        <section>
          <NewsPage />
        </section>

      </div>

      {/* SIDEBAR */}
      <div className="sidebar-fixed">
        <Sidebar />
      </div>

    </div>
  );
};

export default Home;