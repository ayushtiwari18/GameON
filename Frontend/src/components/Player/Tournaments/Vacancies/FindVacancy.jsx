import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./FindVacancy.css";
import Buttoncustom from "../../../../common/Buttoncustom";
import vacancyService from "../../../../services/vacancyService"; // Adjust path as needed

function FindVacancy() {
  // Extract tournamentId from URL parameters
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryTournamentId = queryParams.get("tournamentId");
  const tournamentId = id || queryTournamentId || null;

  const [vacancies, setVacancies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [following, setFollowing] = useState([]);

  // Fetch vacancies when component mounts or URL changes
  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        setIsLoading(true);

        if (tournamentId) {
          console.log("Fetching vacancies for tournament ID:", tournamentId);
          const data = await vacancyService.getByTournament(tournamentId);
          setVacancies(data);
        } else {
          console.log(
            "No tournament ID found, fetching all tournaments with vacancies"
          );
          const tournamentsWithVacancies =
            await vacancyService.getTournamentsWithVacancies();
          setVacancies(tournamentsWithVacancies);
        }
      } catch (err) {
        console.error("Failed to fetch vacancies:", err);
        setError(`Failed to load vacancies: ${err.message || "Unknown error"}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVacancies();
  }, [tournamentId]);

  // Filter vacancies based on active tab
  const filteredVacancies = vacancies.filter((vacancy) => {
    if (activeTab === "all") return true;
    // Define conditions for "read" and "unread" here
    // For now, returning all vacancies
    return true;
  });

  const handleFollow = (id) => {
    setFollowing((prev) =>
      prev.includes(id)
        ? prev.filter((followId) => followId !== id)
        : [...prev, id]
    );
  };

  const handleApply = async (vacancyId) => {
    try {
      console.log("Applied to vacancy:", vacancyId);
      alert("Application submitted successfully!");
    } catch (err) {
      console.error("Failed to apply:", err);
      alert("Failed to submit application. Please try again.");
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Recently";

    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="find-vacancy-list">
      <div className="find-vacancy-box-outer">
        <div className="vacancies-page">
          <div className="vacancies-container">
            <h2>Vacancy Applications for this Tournament</h2>

            <div className="vacancy-tabs">
              <Buttoncustom
                text="All Vacancies"
                style={
                  activeTab === "all"
                    ? {
                        background:
                          "linear-gradient(to right, #4b46e8, #7535f5)",
                        color: "white",
                      }
                    : {}
                }
                onClick={() => setActiveTab("all")}
              />

              <Buttoncustom
                text="Read"
                style={
                  activeTab === "read"
                    ? {
                        background:
                          "linear-gradient(to right, #4b46e8, #7535f5)",
                        color: "white",
                      }
                    : {}
                }
                onClick={() => setActiveTab("read")}
              />

              <Buttoncustom
                text="Unread"
                style={
                  activeTab === "unread"
                    ? {
                        background:
                          "linear-gradient(to right, #4b46e8, #7535f5)",
                        color: "white",
                      }
                    : {}
                }
                onClick={() => setActiveTab("unread")}
              />
            </div>

            {isLoading ? (
              <div className="loading-spinner">Loading vacancies...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : filteredVacancies.length === 0 ? (
              <div className="no-vacancies">
                No vacancies found for this tournament.
              </div>
            ) : (
              <div className="vacancies-list">
                {filteredVacancies.map((vacancy) => (
                  <div
                    key={vacancy.id || vacancy.Vacancy_id}
                    className="vacancy-card"
                  >
                    <div className="vacancy-info">
                      <div className="academy-avatar">
                        {/* Default image is added via CSS */}
                      </div>
                      <div className="vacancy-details">
                        <h3>{vacancy.academy_name || "Academy's Name"}</h3>
                        <p>
                          <strong>Position:</strong>{" "}
                          {vacancy.Position ||
                            vacancy.position ||
                            "Not specified"}
                        </p>
                        <p>
                          <strong>Vacancies:</strong>{" "}
                          {vacancy.Vacancy_count || vacancy.vacancy_count || 0}
                        </p>
                        <p>
                          <strong>Requirements:</strong>{" "}
                          {vacancy.Requirements ||
                            vacancy.requirements ||
                            "None specified"}
                        </p>
                        {(vacancy.Age_limit || vacancy.age_limit) && (
                          <p>
                            <strong>Age Limit:</strong>{" "}
                            {vacancy.Age_limit || vacancy.age_limit}
                          </p>
                        )}
                        {(vacancy.Gender_preference ||
                          vacancy.gender_preference) && (
                          <p>
                            <strong>Gender Preference:</strong>{" "}
                            {vacancy.Gender_preference ||
                              vacancy.gender_preference}
                          </p>
                        )}
                        <p>
                          <strong>Posted:</strong>{" "}
                          {formatDate(vacancy.Created_at || vacancy.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="vacancy-actions">
                      <button
                        className="Vapply-btn"
                        onClick={() =>
                          handleApply(vacancy.id || vacancy.Vacancy_id)
                        }
                      >
                        Apply
                      </button>
                      <button
                        className={`follow-btn ${
                          following.includes(vacancy.id || vacancy.Vacancy_id)
                            ? "following"
                            : ""
                        }`}
                        onClick={() =>
                          handleFollow(vacancy.id || vacancy.Vacancy_id)
                        }
                      >
                        {following.includes(vacancy.id || vacancy.Vacancy_id)
                          ? "Following"
                          : "Follow"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindVacancy;
