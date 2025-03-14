import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FindAcademies.css";
import AcademyCard from "./AcademyCard";
import academyService from "../../../services/academyService";

function FindAcademy() {
  const [academies, setAcademies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    city: "",
    search: "",
    category: "",
    state: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    // Initial fetch of academies
    fetchAcademies();
  }, []);

  const fetchAcademies = async () => {
    try {
      setLoading(true);
      // If city filter is applied, use the city-specific endpoint
      if (filters.city) {
        const data = await academyService.location.getByCity(filters.city);
        setAcademies(data);
      } else {
        // Otherwise fetch all academies
        const data = await academyService.getAll();
        setAcademies(data);
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch academies. Please try again later.");
      setLoading(false);
      console.error("Error fetching academies:", err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAcademies();
  };

  // Filter academies based on search and category
  const filteredAcademies = academies.filter((academy) => {
    const searchMatch =
      !filters.search ||
      (academy.Name &&
        academy.Name.toLowerCase().includes(filters.search.toLowerCase())) ||
      (academy.Description &&
        academy.Description.toLowerCase().includes(
          filters.search.toLowerCase()
        ));

    const categoryMatch =
      !filters.category ||
      (academy.Specialization &&
        academy.Specialization.toLowerCase().includes(
          filters.category.toLowerCase()
        ));

    const stateMatch =
      !filters.state ||
      (academy.Location &&
        academy.Location.toLowerCase().includes(filters.state.toLowerCase()));

    return searchMatch && categoryMatch && stateMatch;
  });

  return (
    <div className="academy-list">
      <div className="academy-list-header">
        <p className="academy-list-header-paragraph">
          Battle Arena <br /> Where Legends meet!
        </p>
      </div>
      <div className="academy-box-outer">
        <form className="filters" onSubmit={handleSearch}>
          <input
            type="text"
            name="city"
            placeholder="City"
            className="filter-input"
            value={filters.city}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="filter-input"
            value={filters.search}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="filter-input"
            value={filters.category}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            className="filter-input"
            value={filters.state}
            onChange={handleFilterChange}
          />
        </form>

        {loading ? (
          <div className="loading">Loading academies...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="academy-grid">
            {filteredAcademies.length > 0 ? (
              filteredAcademies.map((academy) => (
                <AcademyCard
                  key={academy.Academy_id || `academy-${Math.random()}`}
                  academy={academy}
                  onClick={() => {
                    navigate(`/player/academies/${academy.Academy_id}`);
                  }}
                />
              ))
            ) : (
              <div className="no-results">
                No academies found matching your criteria.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FindAcademy;
