import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VenueCard from "./VenueCard";
{
  /* venue card is the single tournament card */
}
import "./Tournaments.css";

const dummyTournaments = [
  {
    id: 1,
    title: "Basketball tournament",
    image:
      "https://img.freepik.com/free-photo/black-man-doing-sports-playing-basketball-sunrise-silhouette_285396-1451.jpg",
    description:
      "The GameOn Basketball Championship brings together the most talented teams and rising stars for an electrifying tournament filled with skill, speed, and passion.",
    location: "Krishi upag mandi deen dyal chowk",
    rating: 4,
  },
  // Add more tournaments...
];
function Tournaments({ type = "tournament" }) {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    city: "",
    search: "",
    category: "",
    state: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVenueClick = (id) => {
    if (type === "tournament") {
      navigate(`/tournament/${id}`);
    } else {
      navigate(`/academy/${id}`);
    }
  };

  const venues = type === "tournament" ? dummyTournaments : dummyAcademies;

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
        {/* venue card is the single tournament card */}
        <div className="venues-grid">
          <VenueCard />
          <VenueCard />
          <VenueCard />
          <VenueCard />
          <VenueCard />
          <VenueCard />
          <VenueCard />
          <VenueCard />
          <VenueCard />
        </div>
      </div>
    </div>
  );
}

export default Tournaments;
