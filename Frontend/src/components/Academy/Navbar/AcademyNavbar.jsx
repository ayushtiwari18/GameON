import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem, IconButton } from "@mui/material";
import Buttoncustom from "../../../common/Buttoncustom";
import academyService from "../../../../../Backend/src/api/services/academyService";
import "./AcademyNavbar.css";

function AcademyNavbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL params
  const [academyId, setAcademyId] = useState(null);

  useEffect(() => {
    // First try to get the ID from URL params
    if (id) {
      setAcademyId(id);
      // Also store in localStorage as a backup
      localStorage.setItem("academyId", id);
    } else {
      // If not in URL, try to get from localStorage
      const storedId = localStorage.getItem("academyId");
      if (storedId) {
        setAcademyId(storedId);
      } else {
        // If no ID available, redirect to login
        navigate("/academy/login");
      }
    }
  }, [id, navigate]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await academyService.auth.logout();
      // Clear stored data
      localStorage.removeItem("token");
      localStorage.removeItem("academyId");
      // Redirect to login page after logout
      navigate("/academy/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // You could add error handling UI here
    }
    handleClose();
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
        <Link
          to={academyId ? `/academy/${academyId}/home` : "/academy"}
          className="link-academy"
        >
          Home
        </Link>
        <Link to="/academy/tournament" className="link-academy">
          Tournaments
        </Link>
        <Link to={`/academy/${academyId}/tournament`} className="link-academy">
          My Tournaments
        </Link>
        <Link to="/academy/application" className="link-academy">
          Application
        </Link>
        <Link to={`/academy/${academyId}/vacancy`} className="link-academy">
          My vacancies
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
              {academyId && (
                <Link
                  to={`/academy/profile/${academyId}`}
                  onClick={handleClose}
                >
                  <Buttoncustom text="Profile" />
                </Link>
              )}
              <div onClick={handleLogout}>
                <Buttoncustom text="Logout" />
              </div>
            </div>
          </Menu>
        </div>
      </div>
    </nav>
  );
}

export default AcademyNavbar;
