import React from "react";
import "./AcademyLogin.css";
import { Link } from "react-router-dom";
import Buttoncustom from "../../../common/Buttoncustom";
function AcademyLogin() {
  return (
    <div className="login-container-academy">
      <header>
        <div className="header-container-login-academy">
          <div className="header-left-login-academy">
            <img src="/assets/logot.png" alt="Game On Logo" className="logo" />
            <span className="brand-name">GAME ON</span>
          </div>
        </div>
      </header>

      <div className="login-content-academy">
        <div className="left-section-academy">
          <img
            src="/assets/academy-login.png"
            alt="Basketball player"
            className="illustration-icon-academy"
          />
        </div>

        <div className="right-section-academy">
          <div className="welcome-section">
            <h1>Welcome back!</h1>
            <p>Sign in to your Account</p>
          </div>

          <div className="social-login">
            <div className="social-icons">
              <button className="social-button">
                <img src="/assets/icons/google.png" alt="Google" />
              </button>
              <button className="social-button">
                <img src="/assets/icons/facebook.png" alt="Facebook" />
              </button>
              <button className="social-button">
                <img src="/assets/icons/twitter.png" alt="X" />
              </button>
            </div>
            <div className="divider">
              <span className="divider-line"></span>
              <span className="divider-text">or sign in with email</span>
              <span className="divider-line"></span>
            </div>
          </div>

          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="visually-hidden">
                Email ID
              </label>
              <div className="input-with-icon">
                <input
                  type="email"
                  id="email"
                  placeholder="Email ID"
                  className="form-input"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="visually-hidden">
                Password
              </label>
              <div className="input-with-icon">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="form-input"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="forgot-password">
              <Link to="/academy/forgot-password">Forget Password?</Link>
            </div>

            <Buttoncustom
              text="Sign in"
              style={{ width: "100%" }}
              type="submit"
            />

            <div className="create-account">
              <span>Don't have an account? </span>
              <Link to="/academy/signup">Create an account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AcademyLogin;
