import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Users,
  ChevronRight,
  Plus,
  Calendar,
} from "lucide-react";
import "./MyVacancies.css";
import vacancyService from "../../../services/vacancyService.js"; // Adjust the path as needed

const MyVacancies = () => {
  const { academyId } = useParams();
  const navigate = useNavigate();
  const [vacancies, setVacancies] = useState([]);
  const [filteredVacancies, setFilteredVacancies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        setLoading(true);
        // First, ensure the academyId from params or from local storage (if needed)
        const currentAcademyId = academyId || localStorage.getItem("academyId");

        if (!currentAcademyId) {
          throw new Error("Academy ID is required");
        }

        const response = await vacancyService.academy.getAll(currentAcademyId);

        // Transform backend data to match our component expectations
        const formattedVacancies = Array.isArray(response)
          ? response.map((vacancy) => ({
              id: vacancy.Vacancy_id || vacancy.vacancy_id,
              title: vacancy.Position || vacancy.position,
              location:
                vacancy.tournament_name ||
                vacancy.Tournament_name ||
                "No location specified",
              slots: vacancy.Vacancy_count || vacancy.vacancy_count || 0,
              genderPreference:
                vacancy.Gender_preference || vacancy.gender_preference,
              ageLimit: vacancy.Age_limit || vacancy.age_limit,
              requirements: vacancy.Requirements || vacancy.requirements,
              // Add additional fields as needed
              tournamentId: vacancy.Tournament_id || vacancy.tournament_id,
            }))
          : [];

        setVacancies(formattedVacancies);
        setFilteredVacancies(formattedVacancies);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch vacancies:", err);
        setError("Failed to load vacancies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, [academyId]);

  useEffect(() => {
    // Filter vacancies based on search term
    if (searchTerm.trim() === "") {
      setFilteredVacancies(vacancies);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = vacancies.filter(
      (vacancy) =>
        (vacancy.title && vacancy.title.toLowerCase().includes(term)) ||
        (vacancy.location && vacancy.location.toLowerCase().includes(term)) ||
        (vacancy.requirements &&
          vacancy.requirements.toLowerCase().includes(term))
    );

    setFilteredVacancies(filtered);
  }, [vacancies, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewVacancy = (vacancy) => {
    // Navigate to vacancy details page
    navigate(`/academy/vacancy/${vacancy.id}`);
  };

  const getFormattedDate = (dateString) => {
    if (!dateString) return "No date specified";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="vacancies-page">
      <main className="main-content-vacancy">
        <div className="page-header-vacancy">
          <h1 className="page-title-vacancy">Academy Vacancies</h1>
          <Link to={`/academy/tournament`} className="link-wrapper">
            <button className="post-vacancy-btn">
              <Plus size={20} className="btn-icon" />
              Post a New Vacancy
            </button>
          </Link>
        </div>
        <div className="search-container-vacancy">
          <div className="search-box-vacancy">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by position, tournament, or requirements..."
              className="search-input-vacancy"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="vacancy-list">
          {loading ? (
            <div className="loading-state">Loading vacancies...</div>
          ) : error ? (
            <div className="error-state">{error}</div>
          ) : filteredVacancies.length > 0 ? (
            filteredVacancies.map((vacancy) => (
              <div key={vacancy.id} className="vacancy-item">
                <div className="vacancy-info">
                  <h3 className="vacancy-title">{vacancy.title}</h3>
                  <div className="vacancy-meta">
                    <div className="meta-item">
                      <MapPin size={14} className="meta-icon" />
                      <span>{vacancy.location}</span>
                    </div>
                    <div className="meta-item">
                      <Users size={14} className="meta-icon" />
                      <span>{vacancy.slots} slots available</span>
                    </div>
                    <div className="meta-item">
                      <Calendar size={14} className="meta-icon" />
                      <span>{getFormattedDate(vacancy.lastDateToApply)}</span>
                    </div>
                  </div>
                </div>
                <div className="vacancy-actions">
                  <button
                    className="view-button-vacancy"
                    onClick={() => handleViewVacancy(vacancy)}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No vacancies found. Create a new vacancy to get started!</p>
              <Link to={`/academy/vacancy/create`} className="link-wrapper">
                <button className="post-vacancy-btn empty-state-btn">
                  <Plus size={20} className="btn-icon" />
                  Create First Vacancy
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyVacancies;
