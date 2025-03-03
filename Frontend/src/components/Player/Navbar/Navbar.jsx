import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbarplayer.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem, IconButton } from "@mui/material";
import Buttoncustom from "../../../common/Buttoncustom";
import playerService from "../../../services/playerService.js";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [playerId, setPlayerId] = useState("");
  const navigate = useNavigate();

  // Get player ID from localStorage when component mounts
  useEffect(() => {
    const id = localStorage.getItem("playerId");
    if (id) {
      setPlayerId(id);
    } else {
      // If player ID is not in localStorage, try to get it from the token
      const token = localStorage.getItem("token");
      if (token) {
        // You might need to decode JWT token to get player ID
        // This is a placeholder for how you might extract ID from token
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          if (payload && payload.id) {
            setPlayerId(payload.id);
            localStorage.setItem("playerId", payload.id);
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    }
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      // Call the backend logout API
      await playerService.auth.logout();

      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("playerId");

      // Close the menu
      handleClose();

      // Redirect to homepage
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if API logout fails, clear local storage and redirect
      localStorage.removeItem("token");
      localStorage.removeItem("playerId");
      navigate("/player/login");
    }
  };

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
        <Link to="/player/notifications" className="link1">
          Notifications
        </Link>
        <div className="menu-container">
          <IconButton onClick={handleMenuClick}>
            <MenuIcon style={{ fontSize: 25 }} />
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className="custom-menu"
          >
            <div className="dropdown-content">
              {playerId ? (
                <Link to={`/player/profile/${playerId}`} onClick={handleClose}>
                  <Buttoncustom text="Profile" />
                </Link>
              ) : (
                <div onClick={handleClose}>
                  <Buttoncustom text="Profile Unavailable" disabled={true} />
                </div>
              )}
              <button onClick={handleLogout}>
                <Buttoncustom text="Logout" />
              </button>
            </div>
          </Menu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
