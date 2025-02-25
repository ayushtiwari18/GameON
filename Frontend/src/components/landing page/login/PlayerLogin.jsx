import React from "react";
import "./PlayerLogin.css";
import { Link } from "react-router-dom";
import Buttoncustom from "../../../common/Buttoncustom";

const PlayerLogin = () => {
  return (
    <div className="login-container">
      <header>
        <div className="header-container-login">
          <div className="header-left-login">
            <img src="/assets/logot.png" alt="Game On Logo" className="logo" />
            <span className="brand-name">GAME ON</span>
          </div>
        </div>
      </header>

      <div className="login-content">
        <div className="left-section">
          <div className="illustrations-left">
            <div className="illustration">
              <img
                src="/assets/PlayerDashboard/Player-login-1.png"
                alt="Football icon"
                className="illustration-left-icon"
              />
            </div>
            <div className="illustration">
              {/* Volleyball player illustration */}
              <img
                src="/assets/PlayerDashboard/Player-login-2.png"
                alt="Football icon"
                className="illustration-left-icon"
              />
            </div>
          </div>

          <div className="illustration-right">
            {/* Basketball player illustration */}
            <img
              src="/assets/PlayerDashboard/Player-login-3.png"
              alt="Football icon"
              className="illustration-right-icon"
            />
          </div>
        </div>

        <div className="right-section">
          <div className="welcome-section">
            <h1>Welcome back!</h1>
            <p>Sign in to your Account</p>
          </div>

          <div className="social-login">
            <div className="social-icons">
              <button className="social-button">
                <img src="" alt="Google" />
              </button>
              <button className="social-button">
                <img src="" alt="Facebook" />
              </button>
              <button className="social-button">
                <img src="" alt="X" />
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
                />
              </div>
            </div>

            <div className="forgot-password">
              <a href="#">Forget Password?</a>
            </div>

            <Buttoncustom text="Sign in" style={{ width: "680px" }} />

            <div className="create-account">
              <span>Don't have an account? </span>
              <Link to="/player/signup">Create an account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlayerLogin;
