import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, Image, Trophy, X } from "lucide-react";
import tournamentService from "../../../services/tournamentService.js";
import "./EditTournament.css";

const TournamentEditForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    Name: "",
    Start_Date: "",
    End_Date: "",
    Location: "",
    Max_Teams: "",
    description: "",
    Rules: "",
    Registration_Deadline: "",
    Registration_fee: "",
    Prize_Pool: "",
    contact_email: "",
    contact_phone: "",
    Category: "",
    Min_Teams: "",
  });

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        const response = await tournamentService.getById(id);

        // Extract tournament data from response
        const tournament = response.tournament || response;

        // Convert date strings to YYYY-MM-DD format for date inputs
        const formatDateForInput = (dateString) => {
          if (!dateString) return "";
          const date = new Date(dateString);
          return date.toISOString().split("T")[0];
        };

        setFormData({
          Name: tournament.Name || "",
          Start_Date: formatDateForInput(tournament.Start_Date),
          End_Date: formatDateForInput(tournament.End_Date),
          Location: tournament.Location || "",
          Max_Teams: tournament.Max_Teams || "",
          description: tournament.description || "",
          Rules: tournament.Rules || "",
          Registration_Deadline: formatDateForInput(
            tournament.Registration_Deadline
          ),
          Registration_fee: tournament.Registration_fee || "",
          Prize_Pool: tournament.Prize_Pool || "",
          contact_email: tournament.contact_email || "",
          contact_phone: tournament.contact_phone || "",
          Category: tournament.Category || "",
          Min_Teams: tournament.Min_Teams || "",
        });
      } catch (err) {
        console.error("Failed to fetch tournament details", err);
        setError(
          "Error loading tournament data: " + (err.message || "Unknown error")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournamentDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, banner: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Get academyId from localStorage
      const academyId = localStorage.getItem("academyId");

      if (!academyId) {
        throw new Error("Academy ID not found. Please log in again.");
      }

      // Prepare data for API
      const updateData = {
        ...formData,
        tournamentId: id, // Add the tournament ID to the request body
      };

      // Call the API to update the tournament
      await tournamentService.academy.update(academyId, id, updateData);

      // Upload banner if selected
      if (formData.banner) {
        const bannerFormData = new FormData();
        bannerFormData.append("banner", formData.banner);
        await tournamentService.academy.uploadBanner(
          academyId,
          id,
          bannerFormData
        );
      }

      // Redirect to tournament detail page
      navigate(`/academy/tournament/${id}`);
    } catch (err) {
      console.error("Error updating tournament:", err);
      setError(
        "Failed to update tournament: " + (err.message || "Unknown error")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">Loading tournament details...</div>
    );
  }

  return (
    <div className="glass-form-overlay">
      <div className="glass-form-container">
        <div className="form-header">
          <h2>Edit Tournament</h2>
          <button className="close-button">
            <Link to={`/academy/tournament/${id}`}>
              <X size={24} />
            </Link>
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="tournament-form">
          <div className="form-group">
            <label>Tournament Name</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="Start_Date"
              value={formData.Start_Date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="End_Date"
              value={formData.End_Date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Registration Deadline</label>
            <input
              type="date"
              name="Registration_Deadline"
              value={formData.Registration_Deadline}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="Location"
              value={formData.Location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="Category"
              value={formData.Category}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Maximum Teams</label>
            <input
              type="number"
              name="Max_Teams"
              value={formData.Max_Teams}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Minimum Teams</label>
            <input
              type="number"
              name="Min_Teams"
              value={formData.Min_Teams}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Registration Fee (₹)</label>
            <input
              type="number"
              name="Registration_fee"
              value={formData.Registration_fee}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Prize Pool (₹)</label>
            <input
              type="number"
              name="Prize_Pool"
              value={formData.Prize_Pool}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Rules</label>
            <textarea
              name="Rules"
              value={formData.Rules}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Contact Email</label>
            <input
              type="email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Contact Phone</label>
            <input
              type="tel"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Banner</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Tournament"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TournamentEditForm;
