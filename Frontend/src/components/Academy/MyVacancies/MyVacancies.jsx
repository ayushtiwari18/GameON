import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Search, MapPin, Users, ChevronRight, Plus } from "lucide-react";
import "./MyVacancies.css";
import vacancyService from "../../../services/vacancyService.js"; // Adjust the path as needed

const MyVacancies = () => {
  const { academyId } = useParams();
  const [vacancies, setVacancies] = useState([]);
  const [filteredVacancies, setFilteredVacancies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        setLoading(true);
        const response = await vacancyService.academy.getAll(academyId);
        const vacanciesData = response.vacancies || [];
        setVacancies(vacanciesData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch vacancies:", err);
        setError("Failed to load vacancies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (academyId) {
      fetchVacancies();
    }
  }, [academyId]);

  useEffect(() => {
    let filtered = vacancies;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (vacancy) =>
          vacancy.title?.toLowerCase().includes(term) ||
          vacancy.location?.toLowerCase().includes(term)
      );
    }
    setFilteredVacancies(filtered);
  }, [vacancies, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
              placeholder="Search vacancies..."
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
                      {vacancy.location}
                    </div>
                    <div className="meta-item">
                      <Users size={14} className="meta-icon" />
                      {vacancy.slots} slots available
                    </div>
                  </div>
                </div>
                <div className="vacancy-actions">
                  <button className="view-button-vacancy">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No vacancies found.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyVacancies;
