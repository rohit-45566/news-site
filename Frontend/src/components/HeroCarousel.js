import React, { useEffect, useState } from 'react';
import './HeroCarousel.css';

const API_URL = 'https://news-site-by-rohit-khairnar.onrender.com/api/news';

const HeroCarousel = () => {
    const [newsItems, setNewsItems] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                setNewsItems(data.data || []);
            })
            .catch((err) => {
                console.error('Error fetching news:', err);
            });
    }, []);

    // First 5 news for carousel
    const carouselItems = newsItems.slice(0, 5);

    return (
        <div
            id="topNewsCarousel"
            className="carousel slide hero-carousel"
            data-bs-ride="carousel"
            data-bs-interval="1500"
        >
            {/* Indicators */}
            <div className="carousel-indicators">
                {carouselItems.map((_, idx) => (
                    <button
                        key={idx}
                        type="button"
                        data-bs-target="#topNewsCarousel"
                        data-bs-slide-to={idx}
                        className={idx === 0 ? 'active' : ''}
                        aria-current={idx === 0 ? 'true' : undefined}
                        aria-label={`Slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Slides */}
            <div className="carousel-inner">
                {carouselItems.map((item, idx) => (
                    <div
                        className={`carousel-item ${idx === 0 ? 'active' : ''}`}
                        key={item._id}
                    >
                        <img
                            src={item.thumbnail}
                            className="carousel-img"
                            alt={item.title}
                            loading="lazy"
                        />

                        <div className="carousel-caption">
                            <h5 className="carousel-title">
                                {item.title}
                            </h5>
                        </div>
                    </div>
                ))}
            </div>

            {/* Previous */}
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#topNewsCarousel"
                data-bs-slide="prev"
            >
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
            </button>

            {/* Next */}
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#topNewsCarousel"
                data-bs-slide="next"
            >
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default HeroCarousel;