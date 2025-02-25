import React, { useState, useEffect } from "react";
import EditProfilePopup from "./EditProfilePopup";
import "./PlayerProfile.css";
import playerService from "../../../../../Backend/src/api/services/playerService";

const PlayerProfile = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // Get player ID from localStorage or URL params
  const getPlayerId = () => {
    // Option 1: Get from localStorage if you store it there after login
    // const playerId = localStorage.getItem("playerId");

    // Option 2: Get from URL params if your route is like /profile/:id
    const playerId = window.location.pathname.split("/").pop();

    return playerId;
  };

  const playerId = getPlayerId();

  // Fetch player data on component mount
  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setLoading(true);
        const playerData = await playerService.profile.getProfile(playerId);
        setPlayer(playerData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching player data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (playerId) {
      fetchPlayerData();
    }
  }, [playerId]);

  // Handle profile save
  const handleSaveProfile = async (updatedData) => {
    try {
      const response = await playerService.profile.updateProfile(
        playerId,
        updatedData
      );
      setPlayer(response);
      setIsEditPopupOpen(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      // You could add error handling UI here
    }
  };

  // Handle profile deletion
  const handleDeleteProfile = async () => {
    try {
      await playerService.profile.deleteProfile(playerId);
      // Clear user data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("playerId");
      // Redirect to homepage or login page
      window.location.href = "/signin";
    } catch (err) {
      console.error("Error deleting profile:", err);
      // You could add error handling UI here
    }
  };

  // Mock data for activities and connections
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

  // Default data structures for player attributes (if they're missing in the API response)
  const defaultExperiences = [
    {
      organization: "National Football Association",
      period: "Feb 2020 - Nov 2023",
    },
  ];

  const defaultQualifications = [
    "Professional Football Training Certification",
    "Youth Coaching License - Level 2",
    "Sports Nutrition Certificate",
  ];

  const defaultSkills = [
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

  // Show loading state
  if (loading) {
    return <div className="loading">Loading profile data...</div>;
  }

  // Show error state
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  // If no player data
  if (!player) {
    return <div className="error">Player profile not found</div>;
  }
  console.log(player);
  // Convert API response to match component expectations
  const playerForDisplay = {
    player_id: player.Player_ID || player.player_id || "",
    full_name: player.Full_Name || player.full_name || "",
    email: player.Email || player.email || "",
    gender: player.Gender || player.gender || "",
    preferred_position:
      player.Preferred_Position || player.preferred_position || "",
    skill_level: player.Skill_level || player.skill_level || "",
    dob: player.Dob || player.dob || "",
    contact_number: player.Contact_number || player.contact_number || "",
    created_at: player.Created_at || player.created_at || "",
    updated_at: player.Updated_at || player.updated_at || "",
    state: player.State || player.state || "",
    address: player.Address || player.address || "",
    imageUrl: player.ProfileImage || player.imageUrl || "/default-avatar.png",
    city: player.City || player.city || "",
    profileUrl: player.profileUrl || `gameon.com/player/${playerId}`,
    language: player.language || "English",
    // Use player's actual data or default if missing
    experiences: player.experiences || defaultExperiences,
    qualifications: player.qualifications || defaultQualifications,
    skills: player.skills || defaultSkills,
  };

  // Confirmation dialog for account deletion
  const DeleteConfirmationDialog = () => (
    <div className={`delete-confirm-modal ${deleteConfirmOpen ? "open" : ""}`}>
      <div className="delete-confirm-content">
        <h2>Confirm Account Deletion</h2>
        <p>
          Are you sure you want to delete your profile? This action cannot be
          undone.
        </p>
        <div className="delete-confirm-actions">
          <button
            className="cancel-btn"
            onClick={() => setDeleteConfirmOpen(false)}
          >
            Cancel
          </button>
          <button className="delete-confirm-btn" onClick={handleDeleteProfile}>
            Yes, Delete My Account
          </button>
        </div>
      </div>
    </div>
  );

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
              <span className="profile-url">{playerForDisplay.profileUrl}</span>
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
              <span>{playerForDisplay.language}</span>
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
          <button
            className="signout-btn"
            onClick={() => setDeleteConfirmOpen(true)}
          >
            Delete Profile
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="profile-header">
          <div className="player-info">
            <div className="profile-image-container">
              <img
                src={playerForDisplay.imageUrl}
                className="profile-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-avatar.png";
                }}
                alt={playerForDisplay.full_name}
              />
            </div>
            <div className="player-details">
              <h1>{playerForDisplay.full_name}</h1>
              <p className="position">{playerForDisplay.preferred_position}</p>
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
            {playerForDisplay.experiences.map((exp, index) => (
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
              {playerForDisplay.qualifications.map((qual, index) => (
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
              {playerForDisplay.skills.map((skill, index) => (
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

      {/* Edit Profile Popup */}
      <EditProfilePopup
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        playerData={playerForDisplay}
        onSave={handleSaveProfile}
      />

      {/* Delete Confirmation Dialog */}
      {deleteConfirmOpen && <DeleteConfirmationDialog />}
    </div>
  );
};

export default PlayerProfile;
