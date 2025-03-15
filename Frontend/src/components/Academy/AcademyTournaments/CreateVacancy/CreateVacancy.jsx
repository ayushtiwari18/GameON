import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
import Buttoncustom from "../../../../common/Buttoncustom";
import vacancyService from "../../../../services/vacancyService"; // Make sure this path is correct
import "./CreateVacancy.css";

const CreateVacancy = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams(); // This should be the tournament ID

  // Initialize form with fields that match the backend expectations
  const [formData, setFormData] = useState({
    tournamentId: id, // Use the tournament ID from URL params
    academyId: "", // This should be set from the user's context/session
    position: "",
    requirements: "", // Combine eligibility criteria and special requirements
    vacancyCount: "", // This was numberOfPlayers in your original form
    genderPreference: "", // This was gender in your original form
    ageLimit: "", // This was ageGroup in your original form
    applicationMethod: "",
    selectionProcess: "",
    lastDateToApply: "",
    skillLevel: "",
  });

  // Fetch the current academy ID from user session/context
  useEffect(() => {
    // This is a placeholder - replace with your actual implementation
    // to get the current user's academy ID from localStorage, context, etc.
    const getCurrentAcademyId = () => {
      const academyId = localStorage.getItem("academyId"); // Example approach
      return academyId;
    };

    setFormData((prev) => ({
      ...prev,
      academyId: getCurrentAcademyId(),
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Prepare data for API - combine relevant fields
    const vacancyData = {
      ...formData,
      // Convert string to number for numeric fields
      vacancyCount: parseInt(formData.vacancyCount),
      ageLimit: parseInt(formData.ageLimit),
      // Combine eligibility criteria and special requirements if needed
      requirements: `Skill Level: ${formData.skillLevel}\n${
        formData.requirements || ""
      }\n\nApplication Method: ${
        formData.applicationMethod || ""
      }\n\nSelection Process: ${
        formData.selectionProcess || ""
      }\n\nLast Date to Apply: ${formData.lastDateToApply || ""}`,
    };

    try {
      await vacancyService.create(vacancyData);
      navigate(`/academy/tournament/${id}`);
    } catch (err) {
      console.error("Error creating vacancy:", err);
      setError("Failed to create vacancy: " + (err.message || "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-form-overlay-vacancy">
      <div className="glass-form-container-vacancy">
        <div className="form-header-vacancy">
          <h2>Create Vacancy</h2>
          <button className="close-button">
            <Link to={`/academy/tournament/${id}`}>
              <X size={24} />
            </Link>
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="vacancy-form">
          <div className="form-group">
            <label>Position Required</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Number of Players Needed</label>
            <input
              type="number"
              name="vacancyCount"
              value={formData.vacancyCount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Age Limit</label>
            <input
              type="number"
              name="ageLimit"
              value={formData.ageLimit}
              onChange={handleChange}
              required
              placeholder="Age limit in years"
            />
          </div>

          <div className="form-group">
            <label>Skill Level Required</label>
            <select
              name="skillLevel"
              value={formData.skillLevel}
              onChange={handleChange}
              required
            >
              <option value="">Select Skill Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Professional">Professional</option>
            </select>
          </div>

          <div className="form-group">
            <label>Requirements</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows="3"
              placeholder="Include any specific eligibility criteria or special requirements"
            />
          </div>

          <div className="form-group">
            <label>Gender Preference</label>
            <select
              name="genderPreference"
              value={formData.genderPreference}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Any">Any</option>
            </select>
          </div>

          <div className="form-group">
            <label>How to Apply</label>
            <input
              type="text"
              name="applicationMethod"
              value={formData.applicationMethod}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Selection Process</label>
            <input
              type="text"
              name="selectionProcess"
              value={formData.selectionProcess}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Date to Apply</label>
            <input
              type="date"
              name="lastDateToApply"
              value={formData.lastDateToApply}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <Buttoncustom
              text={isSubmitting ? "Submitting..." : "Create Vacancy"}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVacancy;
