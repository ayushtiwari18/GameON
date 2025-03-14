import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, Image, Trophy, X } from "lucide-react";
import tournamentService from "../../../services/tournamentService.js";
import academyService from "../../../services/academyService.js";
import "./TournamentCreationForm.css";

const TournamentCreationForm = () => {
  const navigate = useNavigate();
  const { academyId: paramAcademyId } = useParams();
  const [academyId, setAcademyId] = useState(paramAcademyId || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    start_date: "",
    end_date: "",
    location: "",
    max_teams: "",
    description: "",
    rules: "",
    registration_deadline: "",
    entry_fee: "",
    prize_pool: "",
    contact_email: "",
    contact_phone: "",
    category: "",
    address: "",
    banner: null,
  });

  // Verify authentication and get academyId from cookie if not in params
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Check if user is authenticated using cookies
        const { authenticated, academyId: cookieAcademyId } =
          await academyService.auth.checkAuth();

        // if (!authenticated) {
        //   // Redirect to login if not authenticated
        //   navigate("/academy/login");
        //   return;
        // }

        // If academyId is not in URL params, use the one from cookie/auth check
        if (!paramAcademyId && cookieAcademyId) {
          setAcademyId(cookieAcademyId);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setError("Authentication failed. Please login again.");
        navigate("/academy/login");
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [navigate, paramAcademyId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate academyId
      if (!academyId) {
        throw new Error("Academy ID is missing. Please login again.");
      }

      // Map the form data to match the expected API format
      const tournamentData = {
        Name: formData.name,
        Start_Date: formData.start_date,
        End_Date: formData.end_date,
        Location: formData.location,
        Max_Teams: parseInt(formData.max_teams),
        Description: formData.description,
        Rules: formData.rules,
        Registration_Deadline: formData.registration_deadline,
        Registration_fee: formData.entry_fee,
        Prize_Pool: formData.prize_pool,
        Contact_Email: formData.contact_email,
        Contact_Phone: formData.contact_phone,
        Academy_ID: academyId,
        Category: formData.category,
        Min_Teams: parseInt(formData.min_teams || 5),
      };

      // Call the API to create the tournament
      const response = await tournamentService.academy.create(
        academyId,
        tournamentData
      );
      console.log("Tournament created successfully:", tournamentData);

      console.log("Tournament created successfully:", response);

      // Handle file upload if a tournament was created successfully
      if (formData.banner && response.id) {
        const tournamentId = response.id;
        const formData = new FormData();
        formData.append("banner", formData.banner);

        // Example implementation - adjust based on your actual API
        await tournamentService.academy.uploadBanner(
          academyId,
          tournamentId,
          formData
        );
      }

      // Redirect on success
      navigate(`/academy/${academyId}/tournament/`);
    } catch (err) {
      console.error("Error creating tournament:", err);
      setError(err.message || "Failed to create tournament. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="glass-form-overlay-create">
      <div className="glass-form-container-create">
        <div className="form-header">
          <h2>Host a New Tournament</h2>
          <button className="close-button">
            <Link to={`/academy/${academyId}/tournament/`}>
              <X size={24} />
            </Link>
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="tournament-form">
          <div className="form-section">
            <h3 className="section-title">Tournament Details</h3>

            <div className="form-group">
              <label htmlFor="tournamentName">Tournament Name*</label>
              <input
                type="text"
                id="tournamentName"
                name="name"
                value={formData.Name}
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
                  name="category"
                  value={formData.category}
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
                    name="max_teams"
                    value={formData.max_teams}
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
                    name="start_date"
                    value={formData.start_date}
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
                    name="end_date"
                    value={formData.end_date}
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
                  name="registration_deadline"
                  value={formData.registration_deadline}
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
                    name="entry_fee"
                    value={formData.entry_fee}
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
                  name="prize_pool"
                  value={formData.prize_pool}
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
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Tournament"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TournamentCreationForm;
