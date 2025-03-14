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

  console.log("Tournament ID from URL:", id);

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        const data = await tournamentService.getById(id);

        setFormData(data);
      } catch (err) {
        console.error("Failed to fetch tournament details", err);
        setError("Error loading tournament data");
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
      await tournamentService.updateTournament(tournamentId, formData);
      navigate(`/academy/tournament/${tournamentId}`);
    } catch (err) {
      console.error("Error updating tournament:", err);
      setError("Failed to update tournament");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="loading-container">Loading...</div>;
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
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
