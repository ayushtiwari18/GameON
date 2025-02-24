import React from "react";
import "./home.css";
import Card from "./singleCard";
import Status from "./StatusCard";
import CalendarWidget from "./Calender";
import TournamentCard from "./TournamentCard";

function PlayerHome({ playerName }) {
  return (
    <div className="home-container">
      <div className="welcome-header">
        <h2>
          WELCOME{" "}
          <span className="player-name">{playerName || "[player’s name]"}</span>
          ! Ready to elevate your game?
        </h2>
      </div>

      <div className="card-container">
        {/* First Row */}
        <div className="card-row">
          <Card
            width="400px"
            text="Track your application"
            image="/assets/PlayerDashboard/application.png"
            imgclass="application"
          />
          <Card
            width="800px"
            text="One click and you are good to go..."
            image="/assets/PlayerDashboard/appointment.png"
            imgclass="appointment"
          />
        </div>

        {/* Second Row */}
        <div className="card-row">
          <Card
            width="700px"
            text="Introducing online team formation feature"
            image="/assets/PlayerDashboard/Playing-volleyball.png"
            imgclass="playing-volleyball"
          />
          <Card
            width="500px"
            text="Get rewards and recognition"
            image="/assets/PlayerDashboard/Award-success-trophy.png"
            imgclass="award-success-trophy"
          />
        </div>
      </div>
      <Status />
      <div className="tournament-calender">
        <TournamentCard />
        <CalendarWidget />
      </div>
    </div>
  );
}

export default PlayerHome;
