import React, { useState, useEffect } from "react";
import EditAcademyPopup from "./EditAcademyPopup";
import "./AcademyProfile.css";
import academyService from "../../../services/academyService";

const AcademyProfile = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [academy, setAcademy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [suggestedConnections, setSuggestedConnections] = useState([]);
  const [activities, setActivities] = useState([]);

  // Mock data for events since endpoint isn't implemented yet
  const mockEvents = [
    {
      id: 1,
      type: "tournament",
      date: "2025-02-15",
      title: "Regional Youth Basketball Tournament",
      description:
        "Hosted annual regional youth tournament with 12 participating academies",
    },
    {
      id: 2,
      type: "training",
      date: "2025-01-20",
      title: "Advanced Skills Training Program",
      description:
        "Launched new technical skills development program for advanced players",
    },
    {
      id: 3,
      type: "achievement",
      date: "2024-12-10",
      title: "District Championship",
      description: "Academy's U-16 team won the district championship",
    },
    {
      id: 4,
      type: "event",
      date: "2025-02-05",
      title: "Coach Certification Workshop",
      description: "Hosted certification workshop for youth basketball coaches",
    },
  ];

  // Mock data for academies by state since endpoint isn't implemented yet
  const getMockStateAcademies = (state) => {
    const mockStateMap = {
      "Madhya Pradesh": [
        {
          id: "MP001",
          Academy_Name: "Elite Basketball Academy",
          specialization: "Basketball",
          ProfileImage: "/basketball-academy-logo.png",
          Address: "Civil Lines, Jabalpur",
          State: "Madhya Pradesh",
        },
        {
          id: "MP002",
          Academy_Name: "Champions Sports Club",
          specialization: "Multi-Sport Facility",
          ProfileImage: "/champions-logo.png",
          Address: "Napier Town, Jabalpur",
          State: "Madhya Pradesh",
        },
        {
          id: "MP003",
          Academy_Name: "NextGen Athletics",
          specialization: "Basketball & Athletics",
          ProfileImage: "/nextgen-logo.png",
          Address: "Gwarighat Road, Jabalpur",
          State: "Madhya Pradesh",
        },
      ],
      Maharashtra: [
        {
          id: "MH001",
          Academy_Name: "Mumbai Basketball Club",
          specialization: "Basketball",
          ProfileImage: "/mbc-logo.png",
          Address: "Andheri, Mumbai",
          State: "Maharashtra",
        },
        {
          id: "MH002",
          Academy_Name: "Pune Sports Academy",
          specialization: "Multi-Sport Facility",
          ProfileImage: "/psa-logo.png",
          Address: "Kothrud, Pune",
          State: "Maharashtra",
        },
      ],
      // Default academies if state isn't in our mock data
      default: [
        {
          id: "DEF001",
          Academy_Name: "National Sports Academy",
          specialization: "Multi-Sport Training",
          ProfileImage: "/nsa-logo.png",
          Address: "Sports Complex, New Delhi",
          State: "Delhi",
        },
        {
          id: "DEF002",
          Academy_Name: "Youth Development Center",
          specialization: "Youth Sports",
          ProfileImage: "/ydc-logo.png",
          Address: "Stadium Road, Bangalore",
          State: "Karnataka",
        },
        {
          id: "DEF003",
          Academy_Name: "Athletic Excellence Institute",
          specialization: "Performance Training",
          ProfileImage: "/aei-logo.png",
          Address: "Sports Village, Chennai",
          State: "Tamil Nadu",
        },
      ],
    };

    return mockStateMap[state] || mockStateMap["default"];
  };

  // Get academy ID from localStorage or URL params
  const getAcademyId = () => {
    // Check localStorage first
    const storedId = localStorage.getItem("academyId");
    if (storedId) return storedId;

    // Then check URL params
    const academyId = window.location.pathname.split("/").pop();
    return academyId;
  };

  const academyId = getAcademyId();

  // Fetch academy data on component mount
  useEffect(() => {
    const fetchAcademyData = async () => {
      try {
        setLoading(true);
        const academyData = await academyService.profile.getProfile(academyId);
        console.log("Raw API response:", academyData);
        // Convert API response to our expected format
        const formattedData = {
          academy_id: academyData.Academy_id || "",
          name: academyData.Name || "",
          email: academyData.Contact_email || "",
          established: academyData.Established || academyData.established || "",
          contact_number:
            academyData.Contact_phone || academyData.Contact_Number || "",
          location: academyData.Location || academyData.Address || "",
          city: academyData.City || "",
          state: academyData.State || "",
          country: academyData.Country || "USA",
          website: academyData.Website_url || academyData.Website || "",
          description: academyData.Description || academyData.description || "",
          ProfileImage:
            academyData.ImageUrl ||
            academyData.ProfileImage ||
            "/default-academy-logo.png",

          // Default empty arrays for these properties
          coaches: academyData.coaches || [],
          facilities: academyData.facilities || [],
          programs: academyData.programs || [],
          achievements: academyData.achievements || [],
        };

        setAcademy(formattedData);

        // Try to fetch activities if available, otherwise use mock data
        try {
          const eventsData = await academyService.events.getAcademyEvents(
            academyId
          );
          // Transform events to activities format
          const formattedActivities = eventsData.map((event, index) => ({
            id: event.id || index + 1,
            type: event.type || "event",
            date: new Date(event.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
            description: event.title || event.description,
          }));

          setActivities(formattedActivities);
        } catch (eventsErr) {
          console.warn("Could not fetch academy events:", eventsErr);
          // Use mock events data since API endpoint isn't implemented
          const formattedMockActivities = mockEvents.map((event) => ({
            id: event.id,
            type: event.type,
            date: new Date(event.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
            description: event.title || event.description,
          }));

          setActivities(formattedMockActivities);
        }

        // Fetch suggested connections or use mock data
        try {
          // Try to fetch academies from the same state for potential connections
          const stateAcademies = await academyService.location.getByState(
            formattedData.state
          );

          // Filter out the current academy
          const filteredAcademies = stateAcademies
            .filter((a) => a.id !== academyId)
            .slice(0, 3) // Limit to 3 suggestions
            .map((academy) => ({
              id: academy.id,
              name: academy.Academy_Name || academy.name,
              type: academy.specialization || "Sports Academy",
              imageUrl:
                academy.ProfileImage ||
                academy.logo ||
                "/default-academy-logo.png",
            }));

          setSuggestedConnections(filteredAcademies);
        } catch (connectionsErr) {
          console.warn(
            "Could not fetch suggested connections:",
            connectionsErr
          );

          // Use mock state academies since API endpoint isn't implemented
          const mockStateAcademies = getMockStateAcademies(formattedData.state);

          // Filter and format mock academies for display
          const filteredMockAcademies = mockStateAcademies
            .filter((a) => a.id !== academyId)
            .slice(0, 3) // Limit to 3 suggestions
            .map((academy) => ({
              id: academy.id,
              name: academy.Academy_Name || academy.name,
              type: academy.specialization || "Sports Academy",
              imageUrl:
                academy.ProfileImage ||
                academy.logo ||
                "/default-academy-logo.png",
            }));

          setSuggestedConnections(filteredMockAcademies);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching academy data:", err);
        setError("Failed to load academy profile");
        setLoading(false);
      }
    };

    if (academyId) {
      fetchAcademyData();
    } else {
      setError("Academy ID not found. Please log in again.");
      setLoading(false);
    }
  }, [academyId]);

  // Handle profile save
  const handleSaveProfile = async (updatedData) => {
    try {
      setLoading(true);

      // Map the backend response format to our display format
      const formattedResponse = {
        ...(academy || {}),
        name: updatedData.Academy_Name || academy.name,
        email: updatedData.Email || academy.email,
        description: updatedData.Description || academy.description,
        website: updatedData.Website || academy.website,
        established: updatedData.established || academy.established,
        contact_number: updatedData.Contact_Number || academy.contact_number,
        location: updatedData.Address || academy.location,
        city: updatedData.City || academy.city,
        state: updatedData.State || academy.state,
      };

      setAcademy(formattedResponse);
      setIsEditPopupOpen(false);
      setLoading(false);
    } catch (err) {
      console.error("Error updating academy profile:", err);
      setError("Failed to update profile. Please try again.");
      setLoading(false);
    }
  };

  // Handle profile deletion
  const handleDeleteProfile = async () => {
    try {
      setLoading(true);
      await academyService.profile.deleteProfile(academyId);

      // Clear user data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("academyId");

      // Redirect to homepage or login page
      window.location.href = "/academy/login";
    } catch (err) {
      console.error("Error deleting academy profile:", err);
      setError("Failed to delete profile. Please try again.");
      setLoading(false);
    }
  };

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

  console.log("academyForDisplay", academyForDisplay);
  console.log("academy", academy);

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
            <button
              className="academy-add-btn"
              onClick={() => setIsEditPopupOpen(true)}
            >
              + Add description
            </button>
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
            {activities
              .filter(
                (activity) =>
                  activeTab === "all" ||
                  (activeTab === "tournaments" &&
                    activity.type === "tournament") ||
                  (activeTab === "training" && activity.type === "training")
              )
              .map((activity) => (
                <div key={activity.id} className="academy-activity-card">
                  <div className="academy-activity-image">
                    <img
                      src={`/${activity.type}-icon.png`}
                      alt={activity.type}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-activity-icon.png";
                      }}
                    />
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
            academyForDisplay.coaches.length > 0 ? (
              academyForDisplay.coaches.map((coach, index) => (
                <div key={index} className="academy-coach-item">
                  <div className="academy-coach-avatar">
                    <img
                      src={coach.profileImage || "/default-coach.png"}
                      alt={`${coach.name}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-coach.png";
                      }}
                    />
                  </div>
                  <div className="academy-coach-details">
                    <h3>{coach.name}</h3>
                    <p className="academy-coach-role">{coach.role}</p>
                    <p className="academy-coach-exp">
                      {coach.experience} experience
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="academy-empty-content">
                <p>No coaching staff added yet.</p>
                <button className="academy-add-btn">+ Add Coaches</button>
              </div>
            )}
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
            {academyForDisplay.facilities &&
            academyForDisplay.facilities.length > 0 ? (
              <ul className="academy-facilities-list">
                {academyForDisplay.facilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>
            ) : (
              <div className="academy-empty-content">
                <p>No facilities added yet.</p>
                <button className="academy-add-btn">+ Add Facilities</button>
              </div>
            )}
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
            {academyForDisplay.programs &&
            academyForDisplay.programs.length > 0 ? (
              <div className="academy-programs-grid">
                {academyForDisplay.programs.map((program, index) => (
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
            ) : (
              <div className="academy-empty-content">
                <p>No programs added yet.</p>
                <button className="academy-add-btn">+ Add Programs</button>
              </div>
            )}
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
            {academyForDisplay.achievements &&
            academyForDisplay.achievements.length > 0 ? (
              <ul className="academy-achievements-list">
                {academyForDisplay.achievements.map((achievement, index) => (
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
            ) : (
              <div className="academy-empty-content">
                <p>No achievements added yet.</p>
                <button className="academy-add-btn">+ Add Achievements</button>
              </div>
            )}
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
    </div>
  );
};

export default AcademyProfile;
