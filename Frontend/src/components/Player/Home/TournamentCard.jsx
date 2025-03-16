import React from "react";
import "./Tournamentcard.css"; // Import the CSS file

const TournamentCard = () => {
  return (
    <div className="card2">
      <div className="images">
        <img src="https://via.placeholder.com/150" alt="Tournament" />
        <img src="https://via.placeholder.com/150" alt="Team" />
      </div>
      <div className="links">
        <a href="#" className="link">
          Join a Tournament
        </a>
        <a href="#" className="link">
          Create Your Team
        </a>
      </div>
      <button className="button">Which academy is for you</button>
      <button className="button">See the top players in your region</button>
    </div>
  );
};

export default TournamentCard;
