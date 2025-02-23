import React from "react";
import { Link } from "react-router-dom";
import "./Navbarplayer.css";

function Navbar() {
  return (
    <nav className="navbar-player">
      {/* Logo */}
      <div className="navbar-logo1">
        <img src="/assets/logot.png" alt="Game On" />
        <span>GAME ON</span>
      </div>

      {/* Navigation Links */}
      <div className="navbar-links1">
        <Link to="/player" className="link1">
          Home
        </Link>
        <Link to="/player/tournaments" className="link1">
          Tournaments
        </Link>
        <Link to="/player/academies" className="link1">
          Academies
        </Link>
        <Link to="/player/team-creation" className="link1">
          Team Creation
        </Link>
        <Link to="/player/my-application" className="link1">
          My Application
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
