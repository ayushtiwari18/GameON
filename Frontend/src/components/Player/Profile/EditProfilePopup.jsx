import React, { useState, useEffect } from "react";
import { X, Save, Camera } from "lucide-react";
import "./EditProfilePopup.css"; // Import the CSS file

const EditProfilePopup = ({ isOpen, onClose, playerData, onSave }) => {
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

  useEffect(() => {
    if (playerData && isOpen) {
      setFormData({
        full_name: playerData.full_name || "",
        email: playerData.email || "",
        gender: playerData.gender || "",
        preferred_position: playerData.preferred_position || "",
        skill_level: playerData.skill_level || "",
        dob: playerData.dob || "",
        contact_number: playerData.contact_number || "",
        state: playerData.state || "",
        address: playerData.address || "",
        city: playerData.city || "",
        language: playerData.language || "",
      });
    }
  }, [playerData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
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

        {/* Profile Image Section */}
        <div className="profile-image-section">
          <div className="image-container">
            <img
              src={playerData?.imageUrl || "/default-avatar.png"}
              alt="Profile"
              className="profile-image"
            />
            <button className="image-upload-button">
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
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePopup;
