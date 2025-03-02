import React, { useState, useEffect } from "react";
import { X, Save, Camera } from "lucide-react";
import { useParams, useLocation } from "react-router-dom";
import "./EditProfilePopup.css";
import playerService from "../../../services/playerService.js";

const EditProfilePopup = ({ isOpen, onClose, onSave }) => {
  // Extract playerId from URL parameters
  const { id } = useParams();
  const location = useLocation();

  // Fallback to extract ID from URL if not in route params
  const getPlayerIdFromUrl = () => {
    if (id) return id;

    // Extract from pathname (e.g., /player/123/profile)
    const pathParts = location.pathname.split("/");
    const playerIdIndex = pathParts.findIndex((part) => part === "player") + 1;

    if (playerIdIndex > 0 && playerIdIndex < pathParts.length) {
      return pathParts[playerIdIndex];
    }

    // Extract from query params (e.g., ?playerId=123)
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get("playerId") || urlParams.get("id");
  };

  const playerId = getPlayerIdFromUrl();

  // Initialize with default values to prevent undefined issues
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    gender: "",
    preferred_position: "",
    skill_level: "",
    dob: "",
    contact_number: "",
    state: "",
    address: "",
    city: "",
    language: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch player data when the popup opens
  useEffect(() => {
    if (isOpen && playerId) {
      fetchPlayerData();
    } else if (isOpen && !playerId) {
      setError(
        "Player ID not found in URL. Please check the URL and try again."
      );
    }
  }, [isOpen, playerId]);

  const fetchPlayerData = async () => {
    try {
      setLoading(true);
      const playerData = await playerService.profile.getProfile(playerId);

      // Map the API response to our form structure with fallback values
      setFormData({
        full_name: playerData.Full_Name || "",
        email: playerData.Email || "",
        gender: playerData.Gender || "",
        preferred_position: playerData.Preferred_position || "",
        skill_level: playerData.Skill_level || "",
        // Ensure dob is in a valid format or empty string
        dob: formatDateForInput(playerData.Dob) || "",
        contact_number: playerData.Contact_number || "",
        state: playerData.State || "",
        address: playerData.Address || "",
        city: playerData.City || "",
        language: playerData.Language || "",
      });
      setError(null);
    } catch (err) {
      console.error("Failed to fetch player data:", err);
      setError("Failed to load profile data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to format date for input field
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) return "";

      // Format as YYYY-MM-DD
      return date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Date formatting error:", error);
      return "";
    }
  };

  // Function to format date for SQL server
  const formatDateForDatabase = (dateString) => {
    if (!dateString) return null;

    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) return null;

      // Format as YYYY-MM-DD for SQL Server
      return date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Date formatting error:", error);
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!playerId) {
      setError("Cannot update profile: Player ID not found");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Prepare the date properly
      const formattedDob = formatDateForDatabase(formData.dob);

      // Map form data to match API expectations with null checks
      const updateData = {
        Full_Name: formData.full_name || null,
        Email: formData.email || null,
        Gender: formData.gender || null,
        Preferred_position: formData.preferred_position || null,
        Skill_level: formData.skill_level || null,
        Dob: formattedDob, // Use properly formatted date or null
        Contact_number: formData.contact_number || null,
        State: formData.state || null,
        Address: formData.address || null,
        City: formData.city || null,
        Language: formData.language || null,
      };

      // Call the API to update the profile
      const response = await playerService.profile.updateProfile(
        playerId,
        updateData
      );

      // If successful, notify parent component and close popup
      if (onSave) {
        onSave(response);
      }
      onClose();
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError(err.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = () => {
    // This is a placeholder for image upload functionality
    // You would need to implement file upload logic here
    alert("Image upload functionality not implemented yet");
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      {/* Popup container with glassmorphism effect */}
      <div className="popup-container">
        {/* Header */}
        <div className="popup-header">
          <h2 className="popup-title">Edit Profile</h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Error message display */}
        {error && <div className="error-message">{error}</div>}

        {/* Loading indicator */}
        {loading ? (
          <div className="loading-indicator">Loading...</div>
        ) : (
          <>
            {/* Profile Image Section */}
            <div className="profile-image-section">
              <div className="image-container">
                <img
                  src={formData.imageUrl || "/default-avatar.png"}
                  alt="Profile"
                  className="profile-image"
                />
                <button
                  className="image-upload-button"
                  onClick={handleImageUpload}
                  type="button"
                >
                  <Camera size={16} />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="edit-form">
              {/* Personal Information */}
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Position</label>
                <input
                  type="text"
                  name="preferred_position"
                  value={formData.preferred_position}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Skill Level</label>
                <select
                  name="skill_level"
                  value={formData.skill_level}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Number</label>
                <input
                  type="tel"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Language</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Language</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="form-actions">
                <button
                  type="button"
                  onClick={onClose}
                  className="cancel-button"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="save-button"
                  disabled={loading}
                >
                  <Save size={16} />
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProfilePopup;
