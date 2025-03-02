import React, { useState, useEffect } from "react";
import "./TournamentDetail.css";
import InfoCard from "./InfoCard";
import { useParams, useNavigate } from "react-router-dom";
import Buttoncustom from "../../../../common/Buttoncustom";
import tournamentService from "../../../../services/tournamentService";
import { generateTournamentPDF, formatDate } from "./TournamentPdfGenerator";

function TournamentDetail() {
  // Get id from URL parameters
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        setLoading(true);
        console.log("Fetching tournament with ID:", id);
        const data = await tournamentService.getById(id);
        console.log("API response:", data);
        setTournament(data.tournament); // Access the tournament object from response
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

  const handleVacancyButton = () => {
    navigate(`/player/tournaments/${id}/find-vacancy`);
  };

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
      dates: `${formatDate(tournament.Date)} - ${formatDate(
        new Date(new Date(tournament.Date).getTime() + 2 * 24 * 60 * 60 * 1000)
      )}`,
    },
    {
      phase: "Quarter Finals",
      dates: `${formatDate(
        new Date(new Date(tournament.Date).getTime() + 3 * 24 * 60 * 60 * 1000)
      )}`,
    },
    {
      phase: "Semi Finals",
      dates: `${formatDate(
        new Date(new Date(tournament.Date).getTime() + 4 * 24 * 60 * 60 * 1000)
      )}`,
    },
    {
      phase: "Finals",
      dates: `${formatDate(
        new Date(new Date(tournament.Date).getTime() + 5 * 24 * 60 * 60 * 1000)
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
    <div className="app-container">
      {/* Main Content */}
      <div className="main-container">
        <h1 className="tournament-title">{tournament.Name}</h1>

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
                <p>{tournament.description}</p>
                <div className="tournament-meta">
                  <p>
                    <strong>Date:</strong> {formatDate(tournament.Start_Date)} -{" "}
                    {formatDate(tournament.End_Date)}
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

              <div className="prizes card">
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

              <div className="rules card">
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

              <div className="tournament-track card">
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

              <div className="sponsors card">
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
          <div className="registration-sidebar">
            <div className="registration-buttons card">
              <Buttoncustom
                text="Find Vacancies"
                onClick={handleVacancyButton}
              />
              <Buttoncustom
                text={generatingPdf ? "Generating PDF..." : "Download Details"}
                onClick={handleDownloadButton}
                disabled={generatingPdf}
              />
            </div>
          </div>
        </div>
        <div className="info-cards">
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

export default TournamentDetail;
