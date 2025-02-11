"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="Game On" className="logo" />
          <span>GAME ON</span>
        </Link>
        <div className="nav-links">
          <Link to="/">HOME</Link>
          <Link to="/about">About Us</Link>
          <Link to="/content">Content</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/faqs">FAQs</Link>
          <div className="dropdown">
            <button className="btn btn-primary" onClick={() => setShowDropdown(!showDropdown)}>
              Sign up
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/player-registration">Register as Player</Link>
                <Link to="/academy-registration">Register as Academy</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

