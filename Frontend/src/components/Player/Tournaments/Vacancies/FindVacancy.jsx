import React, { useState } from "react";
import "./FindVacancy.css";
import Buttoncustom from "../../../../common/Buttoncustom";

const dummyVacancies = [
  {
    id: 1,
    name: "Academy's Name",
    vacancies: 5,
    postedTime: "2hrs ago",
    expiryDate: "10+",
  },
  {
    id: 2,
    name: "Academy's Name",
    vacancies: 3,
    postedTime: "4hrs ago",
    expiryDate: "10+",
  },
  {
    id: 3,
    name: "Academy's Name",
    vacancies: 2,
    postedTime: "6hrs ago",
    expiryDate: "10+",
  },
  {
    id: 4,
    name: "Academy's Name",
    vacancies: 4,
    postedTime: "8hrs ago",
    expiryDate: "10+",
  },
];

function FindVacancy() {
  const [filter, setFilter] = useState("all");

  const [activeTab, setActiveTab] = useState("all");
  const [following, setFollowing] = useState([]);

  const handleFollow = (id) => {
    setFollowing((prev) =>
      prev.includes(id)
        ? prev.filter((followId) => followId !== id)
        : [...prev, id]
    );
  };

  const handleApply = (id) => {
    console.log("Applied to vacancy:", id);
  };
  return (
    <div className="find-vacancy-list">
      <div className="find-vacancy-box-outer">
        <div className="vacancies-page">
          <div className="vacancies-container">
            <h2>Vacancy Applications for this tournament are opened by:</h2>

            <div className="vacancy-tabs">
              <Buttoncustom
                text="All"
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

            <div className="vacancies-list">
              {dummyVacancies.map((vacancy) => (
                <div key={vacancy.id} className="vacancy-card">
                  <div className="vacancy-info">
                    <div className="academy-avatar" />
                    <div className="vacancy-details">
                      <h3>{vacancy.name}</h3>
                      <p>No. of vacancy</p>
                      <p>Posted {vacancy.postedTime}</p>
                      <p>Exp: {vacancy.expiryDate}</p>
                    </div>
                  </div>
                  <div className="vacancy-actions">
                    <button
                      className="apply-btn"
                      onClick={() => handleApply(vacancy.id)}
                    >
                      Apply
                    </button>
                    <button
                      className={`follow-btn ${
                        following.includes(vacancy.id) ? "following" : ""
                      }`}
                      onClick={() => handleFollow(vacancy.id)}
                    >
                      {following.includes(vacancy.id) ? "Following" : "Follow"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindVacancy;
