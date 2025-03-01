import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Calendar,
  MapPin,
  Users,
  ChevronRight,
  Plus,
} from "lucide-react";
import "./MyTournament.css";

const MyTournament = (academyId) => {
  const [activeTab, setActiveTab] = useState("Upcoming");

  // Sample tournament data
  const tournaments = [
    {
      id: 1,
      title: "Junior Equestrian Championship",
      location: "National Equesterian Academy, Delhi",
      date: "March 15-17, 2025",
      participants: "32 registered",
      status: "Upcoming",
      image: "/api/placeholder/60/60",
    },
    {
      id: 2,
      title: "Regional District Competition",
      location: "National Equesterian Academy, Delhi",
      date: "April 5-6, 2025",
      participants: "24 registered",
      status: "Upcoming",
      image: "/api/placeholder/60/60",
    },
    {
      id: 3,
      title: "Division Masters",
      location: "National Equesterian Academy, Delhi",
      date: "February 10-12, 2025",
      participants: "48 registered",
      status: "Completed",
      image: "/api/placeholder/60/60",
    },
    {
      id: 4,
      title: "Beginners Horse Riding Contest",
      location: "National Equesterian Academy, Delhi",
      date: "January 25-26, 2025",
      participants: "16 registered",
      status: "Completed",
      image: "/api/placeholder/60/60",
    },
  ];

  const filteredTournaments = tournaments.filter(
    (tournament) => activeTab === "All" || tournament.status === activeTab
  );

  return (
    <div className="tournaments-page">
      {/* Main Content */}
      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">Academy Tournaments</h1>
          <Link to={`/academy/${academyId}/tournament/create-tournament`}>
            <button className="host-tournament-btn">
              <Plus size={20} className="btn-icon" />
              Host a New Tournament
            </button>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="search-filter-container">
          <div className="filter-row">
            <div className="search-box">
              <div className="search-icon">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search tournaments..."
                className="search-input"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs-header">
            {["All", "Upcoming", "Ongoing", "Completed"].map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? "active-tab" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tournament List */}
          <div className="tournament-list">
            {filteredTournaments.length > 0 ? (
              filteredTournaments.map((tournament) => (
                <div key={tournament.id} className="tournament-item">
                  <div className="tournament-info">
                    <img
                      src={tournament.image}
                      alt={tournament.title}
                      className="tournament-image"
                    />
                    <div className="tournament-details">
                      <h3 className="tournament-title">{tournament.title}</h3>
                      <div className="tournament-meta">
                        <div className="meta-item">
                          <MapPin size={14} className="meta-icon" />
                          {tournament.location}
                        </div>
                        <div className="meta-item">
                          <Calendar size={14} className="meta-icon" />
                          {tournament.date} • {tournament.participants}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tournament-actions">
                    <span
                      className={`status-badge status-${tournament.status.toLowerCase()}`}
                    >
                      {tournament.status}
                    </span>
                    <button className="view-button">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No tournaments found for the selected filter.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyTournament;
