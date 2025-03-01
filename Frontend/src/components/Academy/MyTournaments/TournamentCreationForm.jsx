import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, Image, Trophy, X } from "lucide-react";
import "./TournamentCreationForm.css";

const TournamentCreationForm = (academyId) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tournamentName: "",
    tournamentType: "",
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    location: "",
    address: "",
    maxParticipants: "",
    entryFee: "",
    description: "",
    rules: "",
    prizes: "",
    banner: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      banner: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tournament data submitted:", formData);
    // Here you would typically send the data to your backend
    // After successful submission, close the form
    navigate(`/academy/${academyId}/tournament/`);
    onClose();
  };

  return (
    <div className="glass-form-overlay">
      <div className="glass-form-container">
        <div className="form-header">
          <h2>Host a New Tournament</h2>
          <button className="close-button">
            <Link to={`/academy/${academyId}/tournament/`}>
              <X size={24} />
            </Link>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="tournament-form">
          <div className="form-section">
            <h3 className="section-title">Tournament Details</h3>

            <div className="form-group">
              <label htmlFor="tournamentName">Tournament Name*</label>
              <input
                type="text"
                id="tournamentName"
                name="tournamentName"
                value={formData.tournamentName}
                onChange={handleChange}
                required
                placeholder="e.g. Junior Equestrian Championship"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tournamentType">Tournament Type*</label>
                <select
                  id="tournamentType"
                  name="tournamentType"
                  value={formData.tournamentType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a type</option>
                  <option value="District">District</option>
                  <option value="Division">Division</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="maxParticipants">Max Participants*</label>
                <div className="input-with-icon">
                  <Users size={16} className="input-icon" />
                  <input
                    type="number"
                    id="maxParticipants"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleChange}
                    required
                    min="1"
                    placeholder="e.g. 32"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description*</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Provide a detailed description of your tournament..."
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Date & Time</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">Start Date*</label>
                <div className="input-with-icon">
                  <Calendar size={16} className="input-icon" />
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="endDate">End Date*</label>
                <div className="input-with-icon">
                  <Calendar size={16} className="input-icon" />
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="registrationDeadline">
                Registration Deadline*
              </label>
              <div className="input-with-icon">
                <Clock size={16} className="input-icon" />
                <input
                  type="date"
                  id="registrationDeadline"
                  name="registrationDeadline"
                  value={formData.registrationDeadline}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Location</h3>

            <div className="form-group">
              <label htmlFor="location">Venue Name*</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g. National Equesterian Academy"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Full Address*</label>
              <div className="input-with-icon">
                <MapPin size={16} className="input-icon" />
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 123 Sports Complex, Delhi"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Additional Information</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="entryFee">Entry Fee (₹)*</label>
                <div className="input-with-icon">
                  <span className="input-icon">₹</span>
                  <input
                    type="number"
                    id="entryFee"
                    name="entryFee"
                    value={formData.entryFee}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="e.g. 1000"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="rules">Rules & Regulations</label>
              <textarea
                id="rules"
                name="rules"
                value={formData.rules}
                onChange={handleChange}
                placeholder="List any specific rules for your tournament..."
                rows="3"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="prizes">Prizes & Awards</label>
              <div className="input-with-icon textarea-with-icon">
                <Trophy size={16} className="input-icon" />
                <textarea
                  id="prizes"
                  name="prizes"
                  value={formData.prizes}
                  onChange={handleChange}
                  placeholder="Describe prizes and recognition for winners..."
                  rows="2"
                ></textarea>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="banner">Tournament Banner</label>
              <div className="file-input-container">
                <div className="file-input-button">
                  <Image size={16} />
                  <span>Choose Image</span>
                </div>
                <input
                  type="file"
                  id="banner"
                  name="banner"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <span className="file-name">
                  {formData.banner ? formData.banner.name : "No file chosen"}
                </span>
              </div>
              <p className="form-hint">
                Recommended size: 1200 x 400 pixels, max 2MB
              </p>
            </div>
          </div>

          <div className="form-actions">
            <Link to={`/academy/${academyId}/tournament/`}>
              <button type="button" className="cancel-button">
                Cancel
              </button>
            </Link>
            <button type="submit" className="submit-button">
              Create Tournament
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TournamentCreationForm;
