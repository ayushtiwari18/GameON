import React, { useState } from "react";
import EditProfilePopup from "./EditProfilePopup";
import "./PlayerProfile.css";

const PlayerProfile = ({ playerData }) => {
  const [activeTab, setActiveTab] = useState("all");

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  // Add handler function to save changes
  const handleSaveProfile = (updatedData) => {
    // Here you would typically update state or call an API
    console.log("Updated profile data:", updatedData);
    // If you have a state update or API call function, use it here
    // For example: updatePlayerData(updatedData);
  };

  // Mock data based on the images provided
  const defaultPlayer = {
    player_id: "12345",
    full_name: "James Pearson",
    email: "james.pearson@example.com",
    gender: "Male",
    preferred_position: "Ball Instruction Master",
    skill_level: "Professional",
    dob: "1990-05-15",
    contact_number: "+1234567890",
    created_at: "2023-01-01",
    updated_at: "2024-02-25",
    state: "California",
    address: "123 Soccer St.",
    imageUrl: "https://example.com/profile.jpg",
    city: "Los Angeles",
    profileUrl: "gameon.com/player/james-pearson",
    language: "English",
  };

  // Use provided data or fallback to default
  const player = playerData || defaultPlayer;

  const activities = [
    {
      id: 1,
      type: "goal",
      date: "2 days ago",
      description: "Scored winning goal against rivals",
    },
    {
      id: 2,
      type: "win",
      date: "1 week ago",
      description: "Won league match 3-2",
    },
    {
      id: 3,
      type: "train",
      date: "3 weeks ago",
      description: "Completed advanced training session",
    },
  ];

  const suggestedConnections = [
    {
      id: 1,
      name: "Kary Anderson",
      type: "Badminton player",
      imageUrl: "/default-avatar.png",
    },
    {
      id: 2,
      name: "Kary Anderson",
      type: "Badminton player",
      imageUrl: "/default-avatar.png",
    },
    {
      id: 3,
      name: "Kary Anderson",
      type: "Badminton player",
      imageUrl: "/default-avatar.png",
    },
  ];

  const experiences = [
    {
      organization: "National Football Association",
      period: "Feb 2020 - Nov 2023",
    },
  ];

  const qualifications = [
    "Professional Football Training Certification",
    "Youth Coaching License - Level 2",
    "Sports Nutrition Certificate",
  ];

  const skills = [
    { name: "Leadership", level: 5 },
    { name: "Team Management", level: 4 },
    { name: "Technical Skills", level: 5 },
    { name: "Tactical Knowledge", level: 4 },
  ];

  const renderSkillLevel = (level) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`skill-dot ${index < level ? "filled" : ""}`}
      >
        •
      </span>
    ));
  };

  return (
    <div className="profile-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="sidebar-menu">
          <div className="menu-item active">
            <i className="icon">📊</i>
            <span>Profile Analytics</span>
          </div>
          <div className="menu-item">
            <i className="icon">📝</i>
            <span>Personal Information</span>
          </div>
          <div className="menu-item">
            <i className="icon">🏆</i>
            <span>Achievements</span>
          </div>
          <div className="menu-item">
            <i className="icon">⚽</i>
            <span>Recent playing stats</span>
          </div>
          <div className="menu-item">
            <i className="icon">📅</i>
            <span>Match schedule</span>
          </div>
          <div className="menu-item">
            <i className="icon">👥</i>
            <span>Team members</span>
          </div>
        </div>

        {/* Blue Connection Section */}
        <div className="connection-section">
          {/* Public Profile Link */}
          <div className="connection-item">
            <div className="connection-item-title">
              <span>Public Profile Link</span>
              <button className="external-link-btn">
                <i className="external-icon">↗️</i>
              </button>
            </div>
            <div className="connection-item-content">
              <span className="profile-url">{player.profileUrl}</span>
            </div>
          </div>

          {/* Profile Language */}
          <div className="connection-item">
            <div className="connection-item-title">
              <span>Profile Language</span>
              <button className="external-link-btn">
                <i className="external-icon">↗️</i>
              </button>
            </div>
            <div className="connection-item-content">
              <span>{player.language}</span>
            </div>
          </div>

          {/* People you may know */}
          <div className="connection-item connections-list">
            <div className="connection-item-title">
              <span>People you may know</span>
            </div>

            {suggestedConnections.map((connection) => (
              <div key={connection.id} className="connection-user">
                <div className="connection-user-avatar">
                  <img
                    src={connection.imageUrl}
                    alt={connection.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-avatar.png";
                    }}
                  />
                </div>
                <div className="connection-user-info">
                  <div className="connection-user-name">{connection.name}</div>
                  <div className="connection-user-type">{connection.type}</div>
                </div>
                <button className="connect-btn">
                  <i className="connect-icon">👤</i> Connect
                </button>
              </div>
            ))}

            <div className="show-all-link">
              <button className="show-all-btn">Show all</button>
            </div>
          </div>
        </div>

        <div className="signout">
          <button className="signout-btn">Delete Profile</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="profile-header">
          <div className="player-info">
            <div className="profile-image-container">
              <img
                src="/default-avatar.png"
                className="profile-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-avatar.png";
                }}
              />
            </div>
            <div className="player-details">
              <h1>{player.full_name}</h1>
              <p className="position">{player.preferred_position}</p>
            </div>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="profile-actions">
          <button
            className="action-btn edit-profile"
            onClick={() => setIsEditPopupOpen(true)}
          >
            EDIT PROFILE
          </button>
          <button className="action-btn change-position">
            Change position
          </button>
          <button className="action-btn share">Share</button>
        </div>

        {/* Add Profile Section */}
        <div className="profile-section">
          <h2>
            Write a summary to tell fans about yourself or game experience
          </h2>
          <p className="section-description">
            Here fans can know a little bit more about you. Tell them what makes
            you a unique football player.
          </p>
          <button className="add-section-btn">+ Add a summary</button>
        </div>

        {/* Activity Section */}
        <div className="activity-section">
          <h2>ACTIVITY</h2>
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`tab-btn ${activeTab === "goals" ? "active" : ""}`}
              onClick={() => setActiveTab("goals")}
            >
              Goals
            </button>
            <button
              className={`tab-btn ${activeTab === "wins" ? "active" : ""}`}
              onClick={() => setActiveTab("wins")}
            >
              Wins & Losses
            </button>
          </div>
          <div className="activity-cards">
            {activities.map((activity) => (
              <div key={activity.id} className="activity-card">
                <div className="activity-image">
                  <img src={`/${activity.type}-icon.png`} alt={activity.type} />
                </div>
                <p className="activity-date">{activity.date}</p>
                <p className="activity-description">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="section">
          <div className="section-header">
            <h2>EXPERIENCE</h2>
            <div className="section-actions">
              <button className="add-btn">+</button>
              <button className="edit-btn">✏️</button>
            </div>
          </div>
          <div className="section-content">
            {experiences.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="org-logo">
                  <img src="/nfa-logo.png" alt="Organization logo" />
                </div>
                <div className="experience-details">
                  <h3>{exp.organization}</h3>
                  <p>{exp.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Qualifications Section */}
        <div className="section">
          <div className="section-header">
            <h2>QUALIFICATIONS</h2>
            <div className="section-actions">
              <button className="add-btn">+</button>
              <button className="edit-btn">✏️</button>
            </div>
          </div>
          <div className="section-content">
            <ul className="qualifications-list">
              {qualifications.map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Skills Section */}
        <div className="section">
          <div className="section-header">
            <h2>SKILLS</h2>
            <div className="section-actions">
              <button className="add-btn">+</button>
              <button className="edit-btn">✏️</button>
            </div>
          </div>
          <div className="section-content">
            <ul className="skills-list">
              {skills.map((skill, index) => (
                <li key={index}>
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">
                    {renderSkillLevel(skill.level)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <EditProfilePopup
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        playerData={player}
        onSave={handleSaveProfile}
      />
    </div>
  );
};
export default PlayerProfile;
