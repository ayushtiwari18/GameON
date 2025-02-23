import React from "react";
import "./Status.css"; // Import the CSS file

const Status = () => {
  return (
    <div className="tournament-container">
      <div className="status-card">
        <h3>About your Team Status</h3>
        <div className="sub-card"></div>
        <div className="sub-card"></div>
        <div className="sub-card"></div>
      </div>

      <div className="status-card">
        <h3>Upcoming Tournaments</h3>
        <div className="sub-card"></div>
        <div className="sub-card"></div>
        <div className="sub-card"></div>
      </div>

      <div className="status-card">
        <h3>Ongoing Tournaments</h3>
        <div className="sub-card"></div>
        <div className="sub-card"></div>
        <div className="sub-card"></div>
      </div>
    </div>
  );
};

export default Status;
