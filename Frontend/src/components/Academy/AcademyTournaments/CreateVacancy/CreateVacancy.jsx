import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
import Buttoncustom from "../../../../common/Buttoncustom";
import "./CreateVacancy.css";

const CreateVacancy = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    position: "",
    numberOfPlayers: "",
    ageGroup: "",
    skillLevel: "",
    eligibilityCriteria: "",
    specialRequirements: "",
    applicationMethod: "",
    selectionProcess: "",
    lastDateToApply: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await vacancyService.create(formData);
      navigate("/academy/vacancies");
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
              name="numberOfPlayers"
              value={formData.numberOfPlayers}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Age Group</label>
            <input
              type="text"
              name="ageGroup"
              value={formData.ageGroup}
              onChange={handleChange}
              required
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
            <label>Eligibility Criteria</label>
            <textarea
              name="eligibilityCriteria"
              value={formData.eligibilityCriteria}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Special Requirements</label>
            <textarea
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
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
            <label>How to Apply?</label>
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
            ></Buttoncustom>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVacancy;
