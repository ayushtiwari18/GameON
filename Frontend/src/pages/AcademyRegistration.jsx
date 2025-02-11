"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./Registration.css"

function AcademyRegistration() {
  const [formData, setFormData] = useState({
    academyName: "",
    contactPerson: "",
    phoneNumber: "",
    city: "",
    address: "",
    email: "",
    sports: "",
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
        <p>Register your academy and connect with talented players.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Academy name</label>
            <input type="text" name="academyName" value={formData.academyName} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Contact person's name</label>
              <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone number</label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Academy's address</label>
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
            <label>Sports offered</label>
            <input type="text" name="sports" value={formData.sports} onChange={handleChange} required />
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
          Already registered? <Link to="/academy-login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default AcademyRegistration

