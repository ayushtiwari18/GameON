import React from "react";
import "./TournamentDetail.css";
import InfoCard from "./InfoCard";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Buttoncustom from "../../../../common/Buttoncustom";

function TournamentDetail({ id }) {
  const navigate = useNavigate();

  const handleVacancyButton = () => {
    navigate(`/player/tournaments/${id}/find-vacancy`);
  };

  return (
    <div className="app-container">
      {/* Main Content */}
      <div className="main-container">
        <h1 className="tournament-title">
          Under 17 Senior State Basketball Championship, Madhya Pradesh
        </h1>

        <div className="content-layout">
          {/* Main Content Area */}
          <div className="main-content">
            {/* Image Grid */}
            <div className="image-grid">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="placeholder-image"></div>
              ))}
            </div>

            {/* Cards Grid Layout */}
            <div className="cards-container">
              <div className="tournament-overview card">
                <h2>Tournament Overview</h2>
                <p>
                  The State Level Basketball event is a 3-day event where teams
                  from every district across Madhya Pradesh come together to
                  compete for the grand prize. The event will host basketball
                  enthusiasts in an exciting atmosphere.
                </p>
              </div>

              <div className="prizes card">
                <h2>Prizes & Rewards</h2>
                <ul>
                  <li>First Prize: Trophy + Medal</li>
                  <li>Second Prize: Medal</li>
                  <li>Best Player Award</li>
                </ul>
              </div>

              <div className="rules card">
                <h2>Rules & Guidelines</h2>
                <ul>
                  <li>All players must bring valid ID proof</li>
                  <li>Teams must arrive 30 minutes before match</li>
                  <li>Tournament rules apply as per federation guidelines</li>
                </ul>
              </div>

              <div className="sponsors card">
                <h2>Sponsors & Partners</h2>
                <ul>
                  <li>MP Sports Council</li>
                  <li>District Basketball Association</li>
                  <li>State Youth Department</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Registration Sidebar */}
          <div className="registration-sidebar">
            <div className="registration-buttons card">
              <Buttoncustom
                text="Find Vacancies"
                onClick={handleVacancyButton}
              />

              <Buttoncustom text="Download Details" />
            </div>
          </div>
        </div>
        <div className="info-cards ">
          <InfoCard title="Age & Team Size" content="12-17 years" />
          <InfoCard title="Location" content="MP State Stadium" />
          <InfoCard title="Category" content="State Level" />
        </div>
      </div>
    </div>
  );
}

export default TournamentDetail;
