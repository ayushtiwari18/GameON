import React, { useState, useEffect } from "react";
import "./AcademyTournamentDetail.css";
import InfoCard from "./infoCard.jsx";
import { useParams, useNavigate } from "react-router-dom";
import Buttoncustom from "../../../../common/Buttoncustom.jsx";
import tournamentService from "../../../../services/tournamentService.js";
import {
  generateTournamentPDF,
  formatDate,
} from "../../../Player/Tournaments/TournamentDetail/TournamentPdfGenerator.js";

function AcademyTournamentDetail() {
  // Get id from URL parameters
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        setLoading(true);
        console.log("Fetching tournament with ID:", id);
        const data = await tournamentService.getById(id);
        console.log("API response:", data);
        setTournament(data.tournament); // Access the tournament object from response

        // Check if the logged-in academy is the owner of this tournament
        const loggedInAcademyId = localStorage.getItem("academyId");
        const tournamentCreatorId =
          data.tournament?.Academy_id || data.tournament?.academy_id;

        if (loggedInAcademyId && tournamentCreatorId) {
          setIsOwner(loggedInAcademyId === tournamentCreatorId);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching tournament details:", err);
        setError("Failed to load tournament details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTournamentDetails();
    } else {
      console.warn("No tournament ID found in URL");
      setError("Tournament ID not found");
      setLoading(false);
    }
  }, [id]);

  // Handler for Download button
  const handleDownloadButton = async () => {
    if (!tournament) return;

    setGeneratingPdf(true);
    try {
      await generateTournamentPDF(tournament);
    } catch (error) {
      console.error("Error in PDF generation:", error);
      alert("Failed to generate PDF. Please try again later.");
    } finally {
      setGeneratingPdf(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading tournament details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!tournament) {
    return <div className="not-found">Tournament not found</div>;
  }

  // Default rules and regulations if not provided in the API
  const defaultRules = [
    "All players must bring valid ID proof",
    "Teams must arrive 30 minutes before match",
    "Tournament rules apply as per federation guidelines",
    `Registration fee of ₹${tournament.Registration_fee} must be paid before the deadline`,
    "Teams must have proper uniforms with visible numbers",
    "Minimum 8 players must be registered per team",
    "Substitutions must follow official game rules",
    "Decisions by referees are final",
    "Unsportsmanlike conduct may result in disqualification",
  ];

  // Default tournament track if not provided in the API
  const defaultTrack = [
    {
      phase: "Registration Phase",
      dates: `Until ${formatDate(tournament.registration_deadline)}`,
    },
    {
      phase: "Team Confirmation",
      dates: `${formatDate(tournament.registration_deadline)} - ${formatDate(
        new Date(
          new Date(tournament.registration_deadline).getTime() +
            2 * 24 * 60 * 60 * 1000
        )
      )}`,
    },
    {
      phase: "Group Stage",
      dates: `${formatDate(tournament.Start_Date)} - ${formatDate(
        new Date(
          new Date(tournament.End_Date).getTime() + 2 * 24 * 60 * 60 * 1000
        )
      )}`,
    },
    {
      phase: "Quarter Finals",
      dates: `${formatDate(
        new Date(
          new Date(tournament.Start_Date).getTime() + 3 * 24 * 60 * 60 * 1000
        )
      )}`,
    },
    {
      phase: "Semi Finals",
      dates: `${formatDate(
        new Date(
          new Date(tournament.Start_Date).getTime() + 4 * 24 * 60 * 60 * 1000
        )
      )}`,
    },
    {
      phase: "Finals",
      dates: `${formatDate(
        new Date(
          new Date(tournament.Start_Date).getTime() + 5 * 24 * 60 * 60 * 1000
        )
      )}`,
    },
  ];

  // Default sponsors if not provided in the API
  const defaultSponsors = [
    "MP Sports Council",
    "District Basketball Association",
    "State Youth Department",
    "Regional Sports Authority",
    "City Youth Development Program",
  ];

  // Use rules from API if available, otherwise use default
  const rulesContent = tournament.rules ? tournament.rules : defaultRules;

  // Use tournament track from API if available, otherwise use default
  const trackContent = tournament.track ? tournament.track : defaultTrack;

  // Use sponsors from API if available, otherwise use default
  const sponsorsContent = tournament.sponsors
    ? tournament.sponsors
    : defaultSponsors;

  return (
    <div className="app-container-academy">
      {/* Main Content */}
      <div className="main-container-academy">
        <h1 className="tournament-title-academy">{tournament.Name}</h1>

        <div className="content-layout-academy">
          {/* Main Content Area */}
          <div className="main-content-academy">
            {/* Image Grid */}
            <div className="image-grid-academy">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="placeholder-image-academy"></div>
              ))}
            </div>

            {/* Cards Grid Layout */}
            <div className="cards-container-academy">
              <div className="tournament-overview card-detail-academy">
                <h2>Tournament Overview</h2>
                <p>{tournament.description}</p>
                <div className="tournament-meta">
                  <p>
                    <strong>Date:</strong> {formatDate(tournament.Date)}
                  </p>
                  <p>
                    <strong>Registration Deadline:</strong>{" "}
                    {formatDate(tournament.registration_deadline)}
                  </p>
                  <p>
                    <strong>Teams:</strong> Min {tournament.Min_Teams} - Max{" "}
                    {tournament.Max_Teams}
                  </p>
                  <p>
                    <strong>Registration Fee:</strong> ₹
                    {tournament.Registration_fee}
                  </p>
                </div>
              </div>

              <div className="prizes card-detail-academy">
                <h2>Prizes & Rewards</h2>
                <p>
                  <strong>Prize Pool:</strong> ₹
                  {tournament.Prize_pool?.toLocaleString()}
                </p>
                <ul>
                  <li>First Prize: Trophy + Medal</li>
                  <li>Second Prize: Medal</li>
                  <li>Best Player Award</li>
                </ul>
              </div>

              <div className="rules card-detail-academy">
                <h2>Rules & Guidelines</h2>
                <ul>
                  {typeof rulesContent === "string" ? (
                    <li>{rulesContent}</li>
                  ) : (
                    Array.isArray(rulesContent) &&
                    rulesContent.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))
                  )}
                </ul>
              </div>

              <div className="tournament-track card-detail-academy">
                <h2>Tournament Track</h2>
                <ul className="track-timeline">
                  {Array.isArray(trackContent) ? (
                    trackContent.map((phase, index) => (
                      <li key={index} className="track-phase">
                        <div className="phase-name">{phase.phase}</div>
                        <div className="phase-dates">{phase.dates}</div>
                      </li>
                    ))
                  ) : (
                    <li>Tournament schedule will be announced soon</li>
                  )}
                </ul>
              </div>

              <div className="sponsors card-detail-academy">
                <h2>Sponsors & Partners</h2>
                <ul>
                  {typeof sponsorsContent === "string" ? (
                    <li>{sponsorsContent}</li>
                  ) : (
                    Array.isArray(sponsorsContent) &&
                    sponsorsContent.map((sponsor, index) => (
                      <li key={index}>{sponsor}</li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Registration Sidebar */}
          <div className="registration-sidebar-academy">
            <div className="registration-buttons-academy card-detail-academy">
              <Buttoncustom
                text="Create Vacancy"
                onClick={() => {
                  navigate(`/academy/tournament/${id}/create-vacancy`);
                }}
              />
              <Buttoncustom
                text={generatingPdf ? "Generating PDF..." : "Download Details"}
                onClick={handleDownloadButton}
                disabled={generatingPdf}
              />
              {/* Only render Edit Tournament button if the logged-in academy is the owner */}
              {isOwner && (
                <Buttoncustom
                  text="Edit Tournament"
                  onClick={() => {
                    navigate(`/academy/tournament/${id}/edit-tournament`);
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="info-cards-academy">
          <InfoCard
            title="Age & Team Size"
            content={tournament.Age_group || "Open"}
          />
          <InfoCard
            title="Location"
            content={`${tournament.Location}, ${tournament.City}`}
          />
          <InfoCard title="Category" content={tournament.Category} />
        </div>
      </div>
    </div>
  );
}

export default AcademyTournamentDetail;
