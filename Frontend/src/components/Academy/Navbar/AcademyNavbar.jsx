import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem, IconButton } from "@mui/material";
import Buttoncustom from "../../../common/Buttoncustom";
import "./AcademyNavbar.css";

function AcademyNavbar(id) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="navbar-academy">
      {/* Logo */}
      <div className="navbar-logo-academy">
        <img src="/assets/logot.png" alt="Game On" />
        <span>GAME ON</span>
      </div>

      {/* Navigation Links */}
      <div className="navbar-links-academy">
        <Link to="/academy" className="link-academy">
          Home
        </Link>
        <Link to="/academy/tournaments" className="link-academy">
          Tournaments
        </Link>
        <Link to="/academy/host-a-tournament" className="link-academy">
          Host Tournament
        </Link>
        <Link to="/academy/application" className="link-academy">
          Application
        </Link>
        <Link to="/academy/my-tournaments" className="link-academy">
          My Tournaments
        </Link>
        <Link to="/academy/notifications" className="link-academy">
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
              <Link to={`/player/profile/${id}`} onClick={handleClose}>
                <Buttoncustom text="Profile" />
              </Link>

              <Buttoncustom text="Logout" />
            </div>
          </Menu>
        </div>
      </div>
    </nav>
  );
}

export default AcademyNavbar;
