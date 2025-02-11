"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Login.css"

function PlayerLogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically handle authentication
    // For now, we'll just navigate to the dashboard
    navigate("/dashboard")
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Welcome back!</h2>
        <h3>Sign in to your Account</h3>

        <div className="social-login">
          <button className="social-btn google">
            <img src="/google-icon.png" alt="Google" />
          </button>
          <button className="social-btn facebook">
            <img src="/facebook-icon.png" alt="Facebook" />
          </button>
          <button className="social-btn twitter">
            <img src="/twitter-icon.png" alt="Twitter" />
          </button>
        </div>

        <div className="divider">or sign in with email</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email ID</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <Link to="/forgot-password" className="forgot-password">
            Forget Password?
          </Link>

          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </form>

        <p className="register-link">
          Don't have an account? <Link to="/player-registration">Create an account</Link>
        </p>
      </div>
    </div>
  )
}

export default PlayerLogin

