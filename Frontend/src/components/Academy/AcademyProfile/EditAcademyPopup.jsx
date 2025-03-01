import React, { useState, useEffect } from "react";
import { X, Save, Camera } from "lucide-react";
import { useParams, useLocation } from "react-router-dom";
import "./EditAcademyPopup.css";
import academyService from "../../../../../Backend/src/api/services/academyService";

const EditAcademyPopup = ({ isOpen, onClose, onSave }) => {
  // Extract academyId from URL parameters
  const { id } = useParams();
  const location = useLocation();

  // Fallback to extract ID from URL if not in route params
  const getAcademyIdFromUrl = () => {
    if (id) return id;

    // Extract from pathname (e.g., /academy/123/profile)
    const pathParts = location.pathname.split("/");
    const academyIdIndex =
      pathParts.findIndex((part) => part === "academy") + 1;

    if (academyIdIndex > 0 && academyIdIndex < pathParts.length) {
      return pathParts[academyIdIndex];
    }

    // Extract from query params (e.g., ?academyId=123)
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get("academyId") || urlParams.get("id");
  };

  const academyId = getAcademyIdFromUrl();

  // Initialize with default values to prevent undefined issues
  const [formData, setFormData] = useState({
    academy_name: "",
    email: "",
    description: "",
    website: "",
    established: "",
    contact_number: "",
    address: "",
    city: "",
    state: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch academy data when the popup opens
  useEffect(() => {
    if (isOpen && academyId) {
      fetchAcademyData();
    } else if (isOpen && !academyId) {
      setError(
        "Academy ID not found in URL. Please check the URL and try again."
      );
    }
  }, [isOpen, academyId]);

  const fetchAcademyData = async () => {
    try {
      setLoading(true);
      const academyData = await academyService.profile.getAcademyProfile(
        academyId
      );

      // Map the API response to our form structure with fallback values
      setFormData({
        academy_name: academyData.Academy_Name || "",
        email: academyData.Email || "",
        description: academyData.Description || "",
        website: academyData.Website || "",
        established: academyData.established || "",
        contact_number: academyData.Contact_Number || "",
        address: academyData.Address || "",
        city: academyData.City || "",
        state: academyData.State || "",
      });
      setError(null);
    } catch (err) {
      console.error("Failed to fetch academy data:", err);
      setError("Failed to load academy profile data. Please try again.");
    } finally {
      setLoading(false);
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

    if (!academyId) {
      setError("Cannot update profile: Academy ID not found");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Map form data to match API expectations with null checks
      const updateData = {
        Academy_Name: formData.academy_name || null,
        Email: formData.email || null,
        Description: formData.description || null,
        Website: formData.website || null,
        established: formData.established || null,
        Contact_Number: formData.contact_number || null,
        Address: formData.address || null,
        City: formData.city || null,
        State: formData.state || null,
      };

      // Call the API to update the academy profile
      const response = await academyService.profile.updateAcademyProfile(
        academyId,
        updateData
      );

      // If successful, notify parent component and close popup
      if (onSave) {
        onSave(response);
      }
      onClose();
    } catch (err) {
      console.error("Failed to update academy profile:", err);
      setError(
        err.message || "Failed to update academy profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = () => {
    // This is a placeholder for image upload functionality
    // You would need to implement file upload logic here
    alert("Logo upload functionality not implemented yet");
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      {/* Popup container with glassmorphism effect */}
      <div className="popup-container">
        {/* Header */}
        <div className="popup-header">
          <h2 className="popup-title">Edit Academy</h2>
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
            {/* Academy Logo Section */}
            <div className="profile-image-section">
              <div className="image-container">
                <img
                  src={formData.logoUrl || "/default-academy-logo.png"}
                  alt="Academy Logo"
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
              {/* Basic Information */}
              <div className="form-group">
                <label className="form-label">Academy Name</label>
                <input
                  type="text"
                  name="academy_name"
                  value={formData.academy_name}
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
                <label className="form-label">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="https://example.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Established inr</label>
                <input
                  type="number"
                  name="established"
                  value={formData.established}
                  onChange={handleChange}
                  className="form-input"
                  min="1900"
                  max="2025"
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

              {/* Location Information */}
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

              {/* Detailed Information */}

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

export default EditAcademyPopup;
