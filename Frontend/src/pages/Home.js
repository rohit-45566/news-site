import React, { useRef, useEffect, useState } from 'react';
import './Home.css';
import Sidebar from '../components/Sidebar';

// 🔮 Future backend URL (later replace)
const API_URL = "";

const Home = () => {
  const scrollRef = useRef(null);

  // 🔹 Data handled via JS (not hardcoded JSX)
  const [recentProblems, setRecentProblems] = useState([
    {
      title: "Garbage Overflow",
      location: "Main Road Area",
      status: "pending"
    },
    {
      title: "Street Light Not Working",
      location: "Shivaji Nagar",
      status: "solved"
    },
    {
      title: "Water Leakage",
      location: "Market Area",
      status: "pending"
    }
  ]);

  // 🔁 Auto scroll logic (same as your code)
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    let isPaused = false;

    const scrollInterval = setInterval(() => {
      if (!isPaused && scrollContainer) {
        scrollAmount += 1;
        if (
          scrollAmount >=
          scrollContainer.scrollHeight - scrollContainer.clientHeight
        ) {
          scrollAmount = 0;
        }
        scrollContainer.scrollTop = scrollAmount;
      }
    }, 35);

    const handleMouseEnter = () => (isPaused = true);
    const handleMouseLeave = () => (isPaused = false);

    if (scrollContainer) {
      scrollContainer.addEventListener('mouseenter', handleMouseEnter);
      scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      clearInterval(scrollInterval);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // 🔮 Future backend fetch (no HTML/CSS change later)
  /*
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setRecentProblems(data));
  }, []);
  */

  return (
    <div className="home-wrapper">

      {/* MAIN CONTENT */}
      <div className="main-content-scrolll" ref={scrollRef}>

        {/* HERO SECTION */}
        <section className="hero-section">
          <h1>Local Problem Reporting & Solution</h1>
          <p>
            Report problems like Road, Water, Garbage & Street Light issues
            and help authorities take quick action.
          </p>

          <div className="hero-buttons">
            <button onClick={() => window.location.href = '/report'}>
              📢 Report Problem
            </button>
            <button
              className="outline"
              onClick={() => window.location.href = '/problems'}
            >
              👀 View Problems
            </button>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how-section">
          <h2>How It Works</h2>

          <div className="steps">
            {[
              { icon: "📝", title: "Report", desc: "User submits local problem details" },
              { icon: "📍", title: "Track", desc: "Problem is visible with location" },
              { icon: "✅", title: "Resolve", desc: "Authority updates status after solution" }
            ].map((step, index) => (
              <div className="card" key={index}>
                <h3>{step.icon} {step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RECENT PROBLEMS */}
        <section className="recent-section">
          <h2>Recent Reported Problems</h2>

          <div className="problem-list">
            {recentProblems.map((problem, index) => (
              <div className="problem-card" key={index}>
                <h4>{problem.title}</h4>
                <p>📍 {problem.location}</p>
                <span className={`status ${problem.status}`}>
                  {problem.status}
                </span>
              </div>
            ))}
          </div>
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