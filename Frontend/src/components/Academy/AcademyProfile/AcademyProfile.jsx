import React, { useState, useEffect } from "react";
import EditAcademyPopup from "./EditAcademyPopup";
import "./AcademyProfile.css";

const AcademyProfile = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [academy, setAcademy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // Get academy ID from localStorage or URL params
  const getAcademyId = () => {
    // Option 2: Get from URL params if your route is like /academy-profile/:id
    const academyId = window.location.pathname.split("/").pop();
    return academyId;
  };

  const academyId = getAcademyId();

  // Fetch academy data on component mount
  useEffect(() => {
    const fetchAcademyData = async () => {
      try {
        setLoading(true);
        // Replace with your actual API call
        // const academyData = await academyService.profile.getProfile(academyId);

        // Mock data for development
        const academyData = {
          academy_id: "ac123456",
          name: "Elite Soccer Academy",
          email: "info@elitesocceracademy.com",
          established: "2010",
          contact_number: "+1 (555) 123-4567",
          location: "123 Sports Way, Athletic City",
          state: "California",
          country: "USA",
          website: "www.elitesocceracademy.com",
          description: "Premier soccer training facility for youth development",
          ProfileImage: "/academy-logo.png",
          coaches: [
            {
              name: "James Wilson",
              role: "Head Coach",
              experience: "15 years",
            },
            {
              name: "Sarah Johnson",
              role: "Youth Development",
              experience: "10 years",
            },
          ],
          facilities: [
            "4 Full-size Soccer Fields",
            "Indoor Training Facility",
            "Fitness Center",
            "Video Analysis Room",
          ],
          programs: [
            {
              name: "Youth Development",
              age: "8-12 years",
              level: "Beginner to Intermediate",
            },
            { name: "Elite Training", age: "13-18 years", level: "Advanced" },
            { name: "Adult Fitness", age: "18+ years", level: "All levels" },
          ],
          achievements: [
            "Regional Youth Championship 2023",
            "5 Players Drafted to Professional Teams",
            "Certified Excellence in Youth Development",
          ],
        };

        setAcademy(academyData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching academy data:", err);
        setError("Failed to load academy profile");
        setLoading(false);
      }
    };

    if (academyId) {
      fetchAcademyData();
    }
  }, [academyId]);

  // Handle profile save
  const handleSaveProfile = async (updatedData) => {
    try {
      // Replace with your actual API call
      // const response = await academyService.profile.updateProfile(academyId, updatedData);
      // Mock response
      const response = { ...academy, ...updatedData };
      setAcademy(response);
      setIsEditPopupOpen(false);
    } catch (err) {
      console.error("Error updating academy profile:", err);
      // You could add error handling UI here
    }
  };

  // Handle profile deletion
  const handleDeleteProfile = async () => {
    try {
      // Replace with your actual API call
      // await academyService.profile.deleteProfile(academyId);

      // Clear user data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("academyId");
      // Redirect to homepage or login page
      window.location.href = "/academy/login";
    } catch (err) {
      console.error("Error deleting academy profile:", err);
      // You could add error handling UI here
    }
  };

  // Mock data for activities and connections
  const activities = [
    {
      id: 1,
      type: "tournament",
      date: "2 weeks ago",
      description: "Hosted Regional Youth Tournament",
    },
    {
      id: 2,
      type: "training",
      date: "1 month ago",
      description: "Launched Advanced Skills Training Program",
    },
    {
      id: 3,
      type: "achievement",
      date: "2 months ago",
      description: "Academy team won district championship",
    },
  ];

  const suggestedConnections = [
    {
      id: 1,
      name: "Victory Sports School",
      type: "Sports Academy",
      imageUrl: "/default-academy-logo.png",
    },
    {
      id: 2,
      name: "Champions Club",
      type: "Youth Sports Club",
      imageUrl: "/default-academy-logo.png",
    },
    {
      id: 3,
      name: "Athletic Development Center",
      type: "Training Facility",
      imageUrl: "/default-academy-logo.png",
    },
  ];

  // Show loading state
  if (loading) {
    return <div className="academy-loading">Loading academy data...</div>;
  }

  // Show error state
  if (error) {
    return <div className="academy-error">Error: {error}</div>;
  }

  // If no academy data
  if (!academy) {
    return <div className="academy-error">Academy profile not found</div>;
  }

  // Format academy data for display
  const academyForDisplay = {
    ...academy,
    profileUrl: academy.website || `gameon.com/academy/${academyId}`,
    language: academy.language || "English",
    imageUrl: academy.ProfileImage || "/default-academy-logo.png",
  };

  // Confirmation dialog for account deletion
  const DeleteConfirmationDialog = () => (
    <div className={`academy-delete-modal ${deleteConfirmOpen ? "open" : ""}`}>
      <div className="academy-delete-content">
        <h2>Confirm Academy Deletion</h2>
        <p>
          Are you sure you want to delete this academy profile? This action
          cannot be undone.
        </p>
        <div className="academy-delete-actions">
          <button
            className="academy-cancel-btn"
            onClick={() => setDeleteConfirmOpen(false)}
          >
            Cancel
          </button>
          <button className="academy-delete-btn" onClick={handleDeleteProfile}>
            Yes, Delete Academy
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="academy-container">
      {/* Left Sidebar */}
      <div className="academy-sidebar">
        <div className="academy-menu"></div>

        {/* Blue Connection Section */}
        <div className="academy-connection-section">
          {/* Public Profile Link */}
          <div className="academy-connection-item">
            <div className="academy-connection-title">
              <span>Academy Website</span>
              <button className="academy-external-btn">
                <i className="academy-external-icon">↗️</i>
              </button>
            </div>
            <div className="academy-connection-content">
              <span className="academy-url">
                {academyForDisplay.profileUrl}
              </span>
            </div>
          </div>

          {/* Profile Language */}
          <div className="academy-connection-item">
            <div className="academy-connection-title">
              <span>Profile Language</span>
              <button className="academy-external-btn">
                <i className="academy-external-icon">↗️</i>
              </button>
            </div>
            <div className="academy-connection-content">
              <span>{academyForDisplay.language}</span>
            </div>
          </div>

          {/* Potential partnerships */}
          <div className="academy-connection-item academy-connections-list">
            <div className="academy-connection-title">
              <span>Potential Partnerships</span>
            </div>

            {suggestedConnections.map((connection) => (
              <div key={connection.id} className="academy-partner">
                <div className="academy-partner-logo">
                  <img
                    src={connection.imageUrl}
                    alt={connection.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-academy-logo.png";
                    }}
                  />
                </div>
                <div className="academy-partner-info">
                  <div className="academy-partner-name">{connection.name}</div>
                  <div className="academy-partner-type">{connection.type}</div>
                </div>
                <button className="academy-connect-btn">
                  <i className="academy-connect-icon">🤝</i> Partner
                </button>
              </div>
            ))}

            <div className="academy-show-all">
              <button className="academy-show-all-btn">Show all</button>
            </div>
          </div>
        </div>

        <div className="academy-delete">
          <button
            className="academy-delete-btn"
            onClick={() => setDeleteConfirmOpen(true)}
          >
            Delete Academy
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="academy-main-content">
        {/* Header */}
        <div className="academy-header">
          <div className="academy-info">
            <div className="academy-image-container">
              <img
                src={academyForDisplay.imageUrl}
                className="academy-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-academy-logo.png";
                }}
                alt={academyForDisplay.name}
              />
            </div>
            <div className="academy-details">
              <h1>{academyForDisplay.name}</h1>
              <p className="academy-location">{academyForDisplay.location}</p>
              <p className="academy-established">
                Est. {academyForDisplay.established}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="academy-actions">
          <button
            className="academy-action-btn academy-edit"
            onClick={() => setIsEditPopupOpen(true)}
          >
            EDIT ACADEMY
          </button>
          <button className="academy-action-btn academy-update">
            Update Programs
          </button>
          <button className="academy-action-btn academy-share">Share</button>
        </div>

        {/* Description Section */}
        <div className="academy-description-section">
          <h2>ABOUT THE ACADEMY</h2>
          <p className="academy-description">
            {academyForDisplay.description ||
              "Add a description of your academy, including its philosophy, approach to training, and what makes it unique."}
          </p>
          {!academyForDisplay.description && (
            <button className="academy-add-btn">+ Add description</button>
          )}
        </div>

        {/* Activity Section */}
        <div className="academy-activity-section">
          <h2>RECENT ACTIVITY</h2>
          <div className="academy-tabs">
            <button
              className={`academy-tab-btn ${
                activeTab === "all" ? "active" : ""
              }`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`academy-tab-btn ${
                activeTab === "tournaments" ? "active" : ""
              }`}
              onClick={() => setActiveTab("tournaments")}
            >
              Tournaments
            </button>
            <button
              className={`academy-tab-btn ${
                activeTab === "training" ? "active" : ""
              }`}
              onClick={() => setActiveTab("training")}
            >
              Training Programs
            </button>
          </div>
          <div className="academy-activity-cards">
            {activities.map((activity) => (
              <div key={activity.id} className="academy-activity-card">
                <div className="academy-activity-image">
                  <img src={`/${activity.type}-icon.png`} alt={activity.type} />
                </div>
                <p className="academy-activity-date">{activity.date}</p>
                <p className="academy-activity-description">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Coaches Section */}
        <div className="academy-section">
          <div className="academy-section-header">
            <h2>COACHING STAFF</h2>
            <div className="academy-section-actions">
              <button className="academy-add-section-btn">+</button>
              <button className="academy-edit-section-btn">✏️</button>
            </div>
          </div>
          <div className="academy-section-content">
            {academyForDisplay.coaches &&
              academyForDisplay.coaches.map((coach, index) => (
                <div key={index} className="academy-coach-item">
                  <div className="academy-coach-avatar">
                    <img src="/default-coach.png" alt={`${coach.name}`} />
                  </div>
                  <div className="academy-coach-details">
                    <h3>{coach.name}</h3>
                    <p className="academy-coach-role">{coach.role}</p>
                    <p className="academy-coach-exp">
                      {coach.experience} experience
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Facilities Section */}
        <div className="academy-section">
          <div className="academy-section-header">
            <h2>FACILITIES</h2>
            <div className="academy-section-actions">
              <button className="academy-add-section-btn">+</button>
              <button className="academy-edit-section-btn">✏️</button>
            </div>
          </div>
          <div className="academy-section-content">
            <ul className="academy-facilities-list">
              {academyForDisplay.facilities &&
                academyForDisplay.facilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
            </ul>
          </div>
        </div>

        {/* Programs Section */}
        <div className="academy-section">
          <div className="academy-section-header">
            <h2>PROGRAMS</h2>
            <div className="academy-section-actions">
              <button className="academy-add-section-btn">+</button>
              <button className="academy-edit-section-btn">✏️</button>
            </div>
          </div>
          <div className="academy-section-content">
            <div className="academy-programs-grid">
              {academyForDisplay.programs &&
                academyForDisplay.programs.map((program, index) => (
                  <div key={index} className="academy-program-card">
                    <h3>{program.name}</h3>
                    <div className="academy-program-details">
                      <span className="academy-program-age">
                        Age Group: {program.age}
                      </span>
                      <span className="academy-program-level">
                        Level: {program.level}
                      </span>
                    </div>
                    <button className="academy-program-more-btn">
                      More details
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="academy-section">
          <div className="academy-section-header">
            <h2>ACHIEVEMENTS</h2>
            <div className="academy-section-actions">
              <button className="academy-add-section-btn">+</button>
              <button className="academy-edit-section-btn">✏️</button>
            </div>
          </div>
          <div className="academy-section-content">
            <ul className="academy-achievements-list">
              {academyForDisplay.achievements &&
                academyForDisplay.achievements.map((achievement, index) => (
                  <li key={index}>
                    <div className="academy-achievement-item">
                      <span className="academy-achievement-icon">🏆</span>
                      <span className="academy-achievement-text">
                        {achievement}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Edit Academy Popup */}
      {isEditPopupOpen && (
        <EditAcademyPopup
          isOpen={isEditPopupOpen}
          onClose={() => setIsEditPopupOpen(false)}
          academyData={academyForDisplay}
          onSave={handleSaveProfile}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmOpen && <DeleteConfirmationDialog />}
    </div>
  );
};

export default AcademyProfile;
