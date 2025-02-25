"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PlayerSignup.css";
import { Camera } from "lucide-react";
import Buttoncustom from "../../../common/Buttoncustom";
import playerService from "../../../../../Backend/src/api/services/playerService.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Add this import

function PlayerSignup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    experience: "Beginner",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = {
      fullName: "Name",
      emailId: "Email",
      password: "Password",
      phoneNumber: "Contact number",
      gender: "Gender",
      dateOfBirth: "Date of Birth",
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => !formData[key])
      .map(([, label]) => label);

    if (missingFields.length > 0) {
      toast.error(`Required fields missing: ${missingFields.join(", ")}`);
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.emailId)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }

    return true;
  };

  const checkDuplicate = async () => {
    try {
      const response = await playerService.auth.checkDuplicate({
        emailId: formData.emailId,
        phoneNumber: formData.phoneNumber,
      });
      return response.data;
    } catch (error) {
      console.error("Duplicate check error:", error);
      toast.error("Error checking duplicate records");
      return { emailExists: false, phoneExists: false };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const { emailExists, phoneExists } = await checkDuplicate();

      if (emailExists) {
        toast.error("Email is already registered");
        setLoading(false);
        return;
      }
      if (phoneExists) {
        toast.error("Phone number is already registered");
        setLoading(false);
        return;
      }

      await playerService.auth.register(formData);
      toast.success("Registration successful! Please login to continue.");
      navigate("/player");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Add ToastContainer at the top level of your component */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <header>
        <div className="header-container">
          <div className="header-left">
            <img src="/assets/logo.png" alt="Game On Logo" className="logo" />
            <span className="brand-name">GAME ON</span>
          </div>
          <div className="header-right">
            <span className="member-text">Already a member?</span>
            <Link to="/player/login" className="signin-link">
              login
            </Link>
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

      <div className="signup-card">
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
            <Buttoncustom
              text="Register"
              onClick={handleSubmit}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlayerSignup;
