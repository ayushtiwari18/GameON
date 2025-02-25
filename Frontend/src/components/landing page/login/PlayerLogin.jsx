import React from "react";
import "./PlayerLogin.css";
import { FaGoogle, FaFacebook, FaEnvelope } from "react-icons/fa";

const PlayerLogin = () => {
  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="logo">GAME ON</h1>
        <div className="illustration">
          <img src="your-illustration-image.png" alt="Sports Illustration" />
        </div>
      </div>
      <div className="login-right">
        <h2 className="welcome-text">
          Welcome <span>back!</span>
        </h2>
        <p>Sign in to your Account</p>
        <div className="social-login">
          <button className="social-btn google">
            <FaGoogle />
          </button>
          <button className="social-btn facebook">
            <FaFacebook />
          </button>
          <button className="social-btn email">
            <FaEnvelope />
          </button>
        </div>
        <p className="or-text">or sign in with email</p>
        <div className="input-group">
          <input type="email" placeholder="Email ID" />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Password" />
        </div>
        <p className="forgot-password">Forget Password?</p>
        <button className="sign-in-btn">Sign in</button>
        <p className="signup-text">
          Don’t have an account? <a href="#">Create an account.</a>
        </p>
      </div>
    </div>
  );
};

export default PlayerLogin;
