import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbarplayer.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { User } from "lucide-react";
import Buttoncustom from "../../../common/Buttoncustom";

function Navbar(id) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              <Link to={`/player/profile/${id}`} onClick={handleClose}>
                <Buttoncustom text="Profile" />
              </Link>
              <Link to="/" onClick={handleClose}>
                <Buttoncustom text="Logout" />
              </Link>
            </div>
          </Menu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
