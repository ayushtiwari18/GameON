import React, { useState, useEffect } from "react";
import "./AcademyDetail.css";
import InfoCard from "../../Tournaments/TournamentDetail/InfoCard";
import Buttoncustom from "../../../../common/Buttoncustom";

function AcademyDetail() {
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

  return (
    <div className="app-container-playerAcademy">
      {/* Main Content */}
      <div className="main-container-playerAcademy">
        <h1 className="academy-title-playerAcademy">Yuva Bhavan</h1>

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
                <p>
                  "Yuva Bhavan is a premier basketball academy dedicated to
                  developing young talent through professional coaching and
                  state-of-the-art facilities."
                </p>
                <div className="academy-meta">
                  <p>
                    <strong>Established:</strong> {"Not specified"}
                  </p>
                  <p>
                    <strong>Students:</strong> {0} active students
                  </p>
                  <p>
                    <strong>Contact Person:</strong> {"Not specified"}
                  </p>
                  <p>
                    <strong>Has Vacancies:</strong> {"Yes"}
                  </p>
                </div>
              </div>

              <div className="programs card-playerAcademy">
                <h2>Training Programs</h2>
                <ul className="programs-list">
                  {Array.isArray(defaultPrograms) ? (
                    defaultPrograms.map((program, index) => (
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
                  {typeof facilitiesContent === "string" ? (
                    <li>{facilitiesContent}</li>
                  ) : (
                    Array.isArray(defaultFacilities) &&
                    defaultFacilities.map((facility, index) => (
                      <li key={index}>{facility}</li>
                    ))
                  )}
                </ul>
              </div>

              <div className="coaches card-playerAcademy">
                <h2>Coaching Staff</h2>
                {Array.isArray(defaultCoaches) ? (
                  defaultCoaches.map((coach, index) => (
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
                  <li>Produced 12+ state-level players in the last 5 years</li>
                  <li>Regional championship winners (2022, 2023)</li>
                  <li>Best Youth Development Program Award (2021)</li>
                  <li>Organized 8+ successful basketball tournaments</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Registration Sidebar */}
          <div className="registration-sidebar">
            <div className="registration-buttons card-playerAcademy">
              <Buttoncustom text="Enroll Now" />
              <Buttoncustom text={"Download Details"} />
            </div>

            <div className="contact-info card-playerAcademy">
              <h2>Contact Information</h2>
              <p>
                <strong>Phone:</strong> {"9617570327"}
              </p>
              <p>
                <strong>Email:</strong> {"ayush2019.107@gmail.com"}
              </p>
              <p>
                <strong>WhatsApp:</strong> {"Not available"}
              </p>

              <h3>Social Media</h3>
              <div className="social-links">
                {
                  <p>
                    <strong>Website:</strong> {"https://www.yuvabhavan.com"}
                  </p>
                }
                {
                  <p>
                    <strong>LinkedIn:</strong> {"Not available"}
                  </p>
                }
                {
                  <p>
                    <strong>YouTube:</strong> {"Not available"}
                  </p>
                }
                {
                  <p>
                    <strong>Twitter:</strong> {"Not available"}
                  </p>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="info-cards">
          <InfoCard
            title="Location"
            content={
              "328 shakti nagar, gupteshwar rd Jablpur, Madhya Pradesh 482001"
            }
          />
          <InfoCard title="Specialization" content={"Basketball"} />
          <InfoCard title="Language" content={"Hindi, English"} />
        </div>
      </div>
    </div>
  );
}

export default AcademyDetail;
