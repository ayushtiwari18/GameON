"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import "./PlayerSignup.css";
import { Camera } from "lucide-react";
import Buttoncustom from "../../../common/Buttoncustom";

function PlayerSignup() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    city: "",
    address: "",
    emailId: "",
    gender: "",
    state: "",
    password: "",
    experience: "",
    sports: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="app">
      <header>
        <div className="header-container">
          <div className="header-left">
            <img src="/assets/logo.png" alt="Game On Logo" className="logo" />
            <span className="brand-name">GAME ON</span>
          </div>
          <div className="header-right">
            <span className="member-text">Already a member?</span>
            <a href="/signin" className="signin-link">
              Sign in
            </a>
          </div>
          <div className="welcome-box">
            <h2 className="welcome-title">Welcome!</h2>
            <p className="welcome-text">
              Start your journey to becoming a champion
              <br />
              <span className="quote">
                "Step Onto the Field of Greatness – Join Us Today!"
              </span>
            </p>
          </div>
        </div>
      </header>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="fullName">Player full name</label>
              <input
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>

            <div className="photo-upload">
              <button type="button" className="photo-btn">
                <Camera size={24} />
                <span>Add photo</span>
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="" style={{ opacity: "0.9" }}>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                id="state"
                name="state"
                placeholder="Enter your state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create your password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="emailId">Email ID</label>
              <input
                id="emailId"
                name="emailId"
                type="email"
                placeholder="Email Address"
                value={formData.emailId}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="button-group-signup">
            <Buttoncustom text="Review"></Buttoncustom>
            <Link to="/player">
              <Buttoncustom text="Save"></Buttoncustom>
            </Link>
            <Buttoncustom text="confirm"></Buttoncustom>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlayerSignup;
