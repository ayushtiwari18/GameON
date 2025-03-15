import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem, IconButton } from "@mui/material";
import Buttoncustom from "../../../common/Buttoncustom";
import academyService from "../../../services/academyService";
import "./AcademyNavbar.css";

function AcademyNavbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [academyId, setAcademyId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check authentication status via cookie
        const { authenticated, academyId: id } =
          await academyService.auth.checkAuth();

        if (authenticated && id) {
          setIsAuthenticated(true);
          setAcademyId(id);
          // Store in localStorage for components that might need it
          localStorage.setItem("academyId", id);
        } else {
          // If auth check fails, try localStorage as fallback
          const storedId = localStorage.getItem("academyId");
          if (storedId) {
            setAcademyId(storedId);
            setIsAuthenticated(true);
          } else {
            // Not authenticated, redirect to login
            navigate("/academy/login");
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/academy/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

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
      // The server will clear the cookie, and we clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("academyId");
      // Redirect to login page
      navigate("/academy/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    handleClose();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Don't render navbar for unauthenticated users
  }

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
        <Link to="/academy/tournament" className="link-academy">
          Tournaments
        </Link>
        <Link to={`/academy/${academyId}/tournament`} className="link-academy">
          My Tournaments
        </Link>
        <Link to="/academy/application" className="link-academy">
          Application
        </Link>
        <Link to={`/academy/${academyId}/my-vacancy`} className="link-academy">
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
