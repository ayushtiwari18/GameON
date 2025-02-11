"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./Registration.css"

function PlayerRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    city: "",
    address: "",
    email: "",
    sportsPlayed: "",
    gender: "",
    state: "",
    password: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2>Welcome!</h2>
        <p>Start your journey to becoming a champion.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Player full name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone number</label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>State</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email ID</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Sports you play</label>
            <input type="text" name="sportsPlayed" value={formData.sportsPlayed} onChange={handleChange} required />
          </div>

          <div className="form-buttons">
            <button type="reset" className="btn btn-secondary">
              Clear
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>

        <p className="login-link">
          Already a member? <Link to="/player-login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default PlayerRegistration

