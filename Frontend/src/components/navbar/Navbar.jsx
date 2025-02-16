import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Info, Users, Image, HelpCircle } from "lucide-react";
import Buttoncustom from "../../common/Buttoncustom";
import "./Navbar.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <img src="assets/logot.png" alt="Game On" />
        <span>GAME ON</span>
      </div>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/" className="link">
          <Home size={18} />
          HOME
        </Link>
        <Link to="/about" className="link">
          <Info size={18} />
          ABOUT US
        </Link>
        <Link to="/content" className="link">
          <Users size={18} />
          CONTACT
        </Link>
        <Link to="/gallery" className="link">
          <Image size={18} />
          GALLERY
        </Link>
        <Link to="/faqs" className="link">
          <HelpCircle size={18} />
          FAQs
        </Link>
      </div>

      {/* Signup Button with Dropdown */}
      <div
        className="signup-container"
        onMouseEnter={() => setShowDropdown(true)}
        // onMouseLeave={() => setShowDropdown(false)}
        onclick={() => setShowDropdown(true)}
      >
        <Buttoncustom text="Signup" className="signup-button" />

        {showDropdown && (
          <div
            className="signup-dropdown"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <Buttoncustom text="As Player"></Buttoncustom>
            <Buttoncustom text="As Academy"></Buttoncustom>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
