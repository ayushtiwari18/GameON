import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VenueCard from "./VenueCard";
import tournamentService from "../../../services/tournamentService.js";
import "./Tournaments.css";

function Tournaments({ type = "tournament" }) {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    city: "",
    search: "",
    category: "",
    state: "",
  });

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const response = await tournamentService.getAll();

      // Extract tournaments array from response
      const tournamentsData = response.tournaments || [];
      console.log(tournamentsData);

      // Ensure each tournament has required fields
      const sanitizedTournaments = tournamentsData.map((tournament) => ({
        ...tournament,
        console: console.log(tournament),
        _id: tournament.Tournament_id, // Map Tournament_id to _id for consistency
        Location: tournament.City || tournament.Location, // Use City if Location is null
        Name: tournament.Name || "",
        description: tournament.description || "",
        category: tournament.Category || "",
        state: tournament.City?.split(", ")[1] || "", // Extract state from City field
      }));

      setTournaments(sanitizedTournaments);
      setError(null);
    } catch (err) {
      console.error("Error fetching tournaments:", err);
      setError("Failed to fetch tournaments. Please try again later.");
      setTournaments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVenueClick = (id) => {
    if (type === "tournament") {
      navigate(`/player/tournaments/${id}`);
    } else {
      navigate(`/academy/${id}`);
    }
  };

  const filteredTournaments = tournaments.filter((tournament) => {
    const cityMatch =
      !filters.city ||
      tournament.Location?.toLowerCase().includes(filters.city.toLowerCase()) ||
      tournament.City?.toLowerCase().includes(filters.city.toLowerCase());

    const searchMatch =
      !filters.search ||
      tournament.Name?.toLowerCase().includes(filters.search.toLowerCase()) ||
      tournament.description
        ?.toLowerCase()
        .includes(filters.search.toLowerCase());

    const categoryMatch =
      !filters.category ||
      tournament.category
        ?.toLowerCase()
        .includes(filters.category.toLowerCase()) ||
      tournament.Category?.toLowerCase().includes(
        filters.category.toLowerCase()
      );

    const stateMatch =
      !filters.state ||
      tournament.state?.toLowerCase().includes(filters.state.toLowerCase());

    return cityMatch && searchMatch && categoryMatch && stateMatch;
  });

  return (
    <div className="venue-list">
      <div className="venue-list-header">
        <p className="venue-list-header-paragraph">
          Battle Arena <br /> Where Legends Compete!
        </p>
      </div>
      <div className="venue-box-outer">
        <div className="filters">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={filters.city}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="text"
            name="search"
            placeholder="Search"
            value={filters.search}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={filters.category}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={filters.state}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>

        {loading ? (
          <div className="loading">Loading tournaments...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="venues-grid">
            {filteredTournaments.length > 0 ? (
              filteredTournaments.map((tournament) => (
                <VenueCard
                  key={tournament.Tournament_id || tournament._id}
                  venue={tournament}
                  onClick={() =>
                    handleVenueClick(tournament.Tournament_id || tournament._id)
                  }
                />
              ))
            ) : (
              <div className="no-results">
                No tournaments found matching your criteria.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tournaments;
