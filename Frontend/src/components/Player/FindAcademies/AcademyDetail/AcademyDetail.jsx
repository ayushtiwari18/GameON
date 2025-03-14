import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import these
import "./AcademyDetail.css";
import InfoCard from "../../Tournaments/TournamentDetail/InfoCard";
import Buttoncustom from "../../../../common/Buttoncustom";
import academyService from "../../../../services/academyService"; // Adjust the path as needed

function AcademyDetail() {
  const [academy, setAcademy] = useState({
    name: "Loading...",
    overview: "Loading academy details...",
    established: "Not specified",
    students: 0,
    contactPerson: "Not specified",
    hasVacancies: "Loading...",
    programs: [],
    facilities: [],
    coaches: [],
    achievements: [],
    contactInfo: {
      phone: "Loading...",
      email: "Loading...",
      whatsapp: "Not available",
      website: "Loading...",
      linkedin: "Not available",
      youtube: "Not available",
      twitter: "Not available",
    },
    location: "Loading...",
    specialization: "Loading...",
    language: "Loading...",
  });

  const { id } = useParams(); // Get the academy ID from URL parameters
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcademyDetails = async () => {
      try {
        // Get academy ID from URL parameters or localStorage
        const academyId =
          id ||
          new URLSearchParams(window.location.search).get("id") ||
          localStorage.getItem("viewAcademyId");
        console.log("Attempting to fetch academy with ID:", academyId);
        console.log("Current academy details:", academy);

        if (!academyId) {
          // If no ID is available, use a fallback or show an error
          setLoading(false);
          setError(
            "Academy ID not found. Please go back and select an academy."
          );
          return;
        }

        // Store the academy ID for future reference
        localStorage.setItem("viewAcademyId", academyId);

        // Fetch academy details
        const response = await academyService.profile.getProfile(academyId);
        console.log("Fetched academy details:", response);

        // Update state with fetched data
        setAcademy({
          name: response.Name || "Yuva Bhavan",
          overview:
            response.Description ||
            "Yuva Bhavan is a premier basketball academy dedicated to developing young talent through professional coaching and state-of-the-art facilities.",
          established: response.Established || "Not specified",
          students: response.Student_Count || 1000,
          contactPerson: response.Contact_Person || "Not specified",
          hasVacancies: response.Has_Vacancies ? "Yes" : "No",
          programs: response.Programs || defaultPrograms,
          facilities: response.Facilities || defaultFacilities,
          coaches: response.Coaches || defaultCoaches,
          achievements: response.Achievements || [
            "Produced 12+ state-level players in the last 5 years",
            "Regional championship winners (2022, 2023)",
            "Best Youth Development Program Award (2021)",
            "Organized 8+ successful basketball tournaments",
          ],
          contactInfo: {
            phone: response.Contact_phone || "9617570327",
            email: response.Contact_email || "ayush2019.107@gmail.com",
            whatsapp: response.Whatsapp || "Not available",
            website: response.Website_url || "https://www.yuvabhavan.com",
            linkedin: response.linkedin || "Not available",
            youtube: response.Youtube || "Not available",
            twitter: response.Twitter || "Not available",
          },
          location:
            response.Location ||
            "328 shakti nagar, gupteshwar rd Jablpur, Madhya Pradesh 482001",
          specialization: response.Specialization || "Basketball",
          language: response.Language || "Hindi, English",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching academy details:", err);
        setError("Failed to load academy details. Please try again later.");
        setLoading(false);
      }
    };

    fetchAcademyDetails();
  }, [id]); // Add id as a dependency to re-fetch when it changes

  // Default programs if not provided in the API
  const defaultPrograms = [
    {
      name: "Beginner Training",
      description: "Fundamental basketball skills for newcomers",
      duration: "3 months",
      fee: "₹2,500/month",
    },
    {
      name: "Intermediate Training",
      description: "Advanced techniques for players with basic skills",
      duration: "4 months",
      fee: "₹3,000/month",
    },
    {
      name: "Advanced Training",
      description: "Competitive training for seasoned players",
      duration: "6 months",
      fee: "₹4,000/month",
    },
    {
      name: "Summer Camp",
      description: "Intensive training during summer holidays",
      duration: "1 month",
      fee: "₹8,000 (total)",
    },
  ];

  // Default facilities if not provided in the API
  const defaultFacilities = [
    "Indoor basketball court",
    "Outdoor practice area",
    "Strength training equipment",
    "Video analysis room",
    "Locker rooms with showers",
    "Hydration station",
    "Recovery area",
  ];

  // Default coaching staff if not provided in the API
  const defaultCoaches = [
    {
      name: "Coach Rajesh Kumar",
      experience: "15 years",
      specialization: "Defense tactics",
    },
    {
      name: "Coach Priya Singh",
      experience: "10 years",
      specialization: "Shooting techniques",
    },
    {
      name: "Coach Amit Sharma",
      experience: "8 years",
      specialization: "Youth development",
    },
  ];

  // Handle enrollment button click
  const handleEnroll = async () => {
    try {
      // Get user ID from localStorage (assuming player is logged in)
      const playerId = localStorage.getItem("playerId");
      const academyId =
        id ||
        new URLSearchParams(window.location.search).get("id") ||
        localStorage.getItem("viewAcademyId");

      if (!playerId) {
        alert("Please log in as a player to enroll");
        // Redirect to login page
        navigate("/login");
        return;
      }

      if (!academyId) {
        alert("Academy information not found");
        return;
      }

      // You'll need to implement this endpoint in your academyService
      const response = await academyService.enrollment.enroll(
        academyId,
        playerId
      );

      if (response.success) {
        alert("Enrollment request sent successfully!");
      } else {
        alert("Failed to enroll. Please try again.");
      }
    } catch (err) {
      console.error("Enrollment error:", err);
      alert("An error occurred during enrollment. Please try again later.");
    }
  };

  // Handle download details
  const handleDownloadDetails = () => {
    // This would typically generate a PDF with academy details
    alert("Download functionality will be implemented soon.");
    // You could implement this with a library like jsPDF
  };

  if (loading) {
    return <div className="loading">Loading academy details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app-container-playerAcademy">
      {/* Main Content */}
      <div className="main-container-playerAcademy">
        <h1 className="academy-title-playerAcademy">{academy.name}</h1>

        <div className="content-layout-playerAcademy">
          {/* Main Content Area */}
          <div className="main-content-playerAcademy">
            {/* Image Grid */}
            <div className="image-grid-playerAcademy">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="placeholder-image"></div>
              ))}
            </div>

            {/* Cards Grid Layout */}
            <div className="cards-container-playerAcademy">
              <div className="academy-overview-playerAcademy card-playerAcademy">
                <h2>Academy Overview</h2>
                <p>"{academy.overview}"</p>
                <div className="academy-meta">
                  <p>
                    <strong>Established:</strong> {academy.established}
                  </p>
                  <p>
                    <strong>Students:</strong> {academy.students} active
                    students
                  </p>
                  <p>
                    <strong>Contact Person:</strong> {academy.contactPerson}
                  </p>
                  <p>
                    <strong>Has Vacancies:</strong> {academy.hasVacancies}
                  </p>
                </div>
              </div>

              <div className="programs card-playerAcademy">
                <h2>Training Programs</h2>
                <ul className="programs-list">
                  {Array.isArray(academy.programs) &&
                  academy.programs.length > 0 ? (
                    academy.programs.map((program, index) => (
                      <li key={index} className="program-item">
                        <h3>{program.name}</h3>
                        <p>{program.description}</p>
                        <div className="program-details">
                          <span>
                            <strong>Duration:</strong> {program.duration}
                          </span>
                          <span>
                            <strong>Fee:</strong> {program.fee}
                          </span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>Program details will be announced soon</li>
                  )}
                </ul>
              </div>

              <div className="facilities card-playerAcademy">
                <h2>Facilities & Infrastructure</h2>
                <ul>
                  {Array.isArray(academy.facilities) &&
                  academy.facilities.length > 0 ? (
                    academy.facilities.map((facility, index) => (
                      <li key={index}>{facility}</li>
                    ))
                  ) : (
                    <li>Facility details will be updated soon</li>
                  )}
                </ul>
              </div>

              <div className="coaches card-playerAcademy">
                <h2>Coaching Staff</h2>
                {Array.isArray(academy.coaches) &&
                academy.coaches.length > 0 ? (
                  academy.coaches.map((coach, index) => (
                    <div key={index} className="coach-profile">
                      <h3>{coach.name}</h3>
                      <div className="coach-details">
                        <p>
                          <strong>Experience:</strong> {coach.experience}
                        </p>
                        <p>
                          <strong>Specialization:</strong>{" "}
                          {coach.specialization}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Coaching staff information will be updated soon</p>
                )}
              </div>

              <div className="achievements card-playerAcademy">
                <h2>Academy Achievements</h2>
                <ul>
                  {Array.isArray(academy.achievements) &&
                  academy.achievements.length > 0 ? (
                    academy.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))
                  ) : (
                    <li>Achievement details will be updated soon</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Registration Sidebar */}
          <div className="registration-sidebar">
            <div className="registration-buttons card-playerAcademy">
              <Buttoncustom text="Enroll Now" onClick={handleEnroll} />
              <Buttoncustom
                text="Download Details"
                onClick={handleDownloadDetails}
              />
            </div>

            <div className="contact-info card-playerAcademy">
              <h2>Contact Information</h2>
              <p>
                <strong>Phone:</strong> {academy.contactInfo.phone}
              </p>
              <p>
                <strong>Email:</strong> {academy.contactInfo.email}
              </p>
              <p>
                <strong>WhatsApp:</strong> {academy.contactInfo.whatsapp}
              </p>

              <h3>Social Media</h3>
              <div className="social-links">
                <p>
                  <strong>Website:</strong> {academy.contactInfo.website}
                </p>
                <p>
                  <strong>LinkedIn:</strong> {academy.contactInfo.linkedin}
                </p>
                <p>
                  <strong>YouTube:</strong> {academy.contactInfo.youtube}
                </p>
                <p>
                  <strong>Twitter:</strong> {academy.contactInfo.twitter}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="info-cards">
          <InfoCard title="Location" content={academy.location} />
          <InfoCard title="Specialization" content={academy.specialization} />
          <InfoCard title="Language" content={academy.language} />
        </div>
      </div>
    </div>
  );
}

export default AcademyDetail;
