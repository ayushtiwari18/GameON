"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, MapPin, ChevronRight, Plus } from "react-feather";
import "./AcademyHome.css";

const sportCategories = [
  { icon: "🎾", name: "Tennis" },
  { icon: "🏑", name: "Hockey" },
  { icon: "🐎", name: "Equestrian" },
  { icon: "🏀", name: "Basketball" },
  { icon: "🥋", name: "Kho-Kho" },
  { icon: "🏊‍♂️", name: "Swimming" },
  { icon: "🏸", name: "Badminton" },
];

const players = [
  {
    id: 1,
    name: "Zrand Hobs",
    sport: "Tennis",
    rating: 4.8,
    reviews: 6,
    skills: ["Gimp", "Wordpress"],
    image: "/assets/academy/tennis.jpeg",
  },
  // Add more player data as needed
];

const faqs = [
  {
    id: 1,
    question: "How do I create an account for my academy?",
    answer: "Fill out the registration form with your academy details...",
  },
  {
    id: 2,
    question: "How do I create vacancy for a player?",
    answer: "Go to the create vacancy section and fill in the requirements...",
  },
  {
    id: 3,
    question: "How can I track the status of my applications?",
    answer: "Visit the Applications section in your dashboard...",
  },
  {
    id: 4,
    question: "How do I close a vacancy?",
    answer:
      "Use the search bar on the homepage to enter keywords related to your skills, job title, or preferred location. You can also use the advanced search filters to narrow down results by industry, job type (full-time, part-time, freelance), and experience level.",
  },
  {
    id: 5,
    question:
      "Is there a cost to use the create vacancy, and what features are free?",
    answer: "Basic features are free, premium features require subscription...",
  },
];

function AcademyHome() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Tennis");
  const [expandedFaq, setExpandedFaq] = useState(4);
  const academyName = "Sports Excellence";

  return (
    <div className="academy-dashboard">
      {/* Header */}
      <header className="dashboard-header"></header>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="platform-info">
          <span className="platform-tag">
            Your #1 Platform for Skill Sharing
          </span>
        </div>
        <h1>Welcome {academyName} Academy!</h1>
        <p>Create your profile, Grow your team & Train emerging talents</p>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-input">
            <Search size={20} />
            <input type="text" placeholder="e.g. tennis player" />
          </div>
          <div className="search-input">
            <MapPin size={20} />
            <input type="text" placeholder="e.g. Jabalpur, India" />
          </div>
          <button className="search-btn">Search</button>
        </div>
      </section>

      {/* Sports Categories */}
      <section className="categories-section">
        <div className="categories-list">
          {sportCategories.map((sport) => (
            <button
              key={sport.name}
              className={`category-btn ${
                selectedCategory === sport.name ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(sport.name)}
            >
              <span>{sport.icon}</span>
              <span>{sport.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Players Grid */}
      <section className="players-section">
        <div className="players-grid">
          {players.map((player) => (
            <div key={player.id} className="player-card">
              <img
                src={player.image || "/placeholder.svg"}
                alt={player.name}
                className="player-image"
              />
              <div className="player-info">
                <div className="player-rating">
                  <span className="star">⭐</span>
                  <span>{player.rating}</span>
                  <span className="reviews">({player.reviews})</span>
                </div>
                <h3>{player.name}</h3>
                <p>{player.sport}</p>
                <div className="skills-tags">
                  {player.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="view-all-btn">
          View All <ChevronRight size={16} />
        </button>
      </section>

      {/* Create Vacancy Section */}
      <section className="create-vacancy-section">
        <div className="vacancy-content">
          <h2>Create vacancy for players!</h2>
          <button className="create-vacancy-btn">CREATE VACANCY</button>
        </div>
        <img
          src="/assets/academy/application.png"
          alt="Create Vacancy"
          className="vacancy-image"
        />
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Sign Up and create Account</h3>
                <p>Fill out your details and showcase your credibility</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Create Vacancy</h3>
                <p>Create vacancy,conduct trial,select the best</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Get Discovered</h3>
                <p>Let player find and contact you</p>
              </div>
            </div>
          </div>
          <div className="steps-image">
            <img src="/assets/academy/how.jpeg" alt="How it works" />
            <div className="player-count">
              <div className="player-avatars">
                <img src="/placeholder.svg" alt="Player" />
                <img src="/placeholder.svg" alt="Player" />
                <img src="/placeholder.svg" alt="Player" />
              </div>
              <span>10K+ Players</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently asked Questions</h2>
        <div className="faq-grid">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`faq-item ${expandedFaq === faq.id ? "expanded" : ""}`}
              onClick={() =>
                setExpandedFaq(faq.id === expandedFaq ? null : faq.id)
              }
            >
              <div className="faq-header">
                <span className="faq-number">
                  {String(faq.id).padStart(2, "0")}
                </span>
                <h3>{faq.question}</h3>
                <Plus className="faq-icon" />
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AcademyHome;
