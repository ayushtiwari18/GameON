import React, { useState } from "react";
import "./PlayerLogin.css";
import { Link, useNavigate } from "react-router-dom";
import Buttoncustom from "../../../common/Buttoncustom";
import playerService from "../../../services/playerService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../context/AuthContext";
import { useEffect } from "react";

const PlayerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated via cookies
    const checkAuthentication = async () => {
      try {
        const { authenticated } = await playerService.auth.checkAuth();

        if (authenticated) {
          // User is already authenticated with valid cookie
          navigate(`/player`);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Continue to login page if authentication check fails
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuthentication();
  }, [navigate]);

  // Show loading state while checking authentication
  if (checkingAuth) {
    return <div className="login-container">Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      // Use auth context's login method instead
      await login(email, password, "player");

      // Show success message
      toast.success("Login successful! Redirecting to dashboard...");

      // Short delay before redirect for toast to be visible
      setTimeout(() => {
        navigate("/player");
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      // Show error toast with the error message
      toast.error(
        err.message || "Failed to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* ToastContainer should be outside the main component structure */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

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
              <img
                src="/assets/PlayerDashboard/Player-login-2.png"
                alt="Volleyball player"
                className="illustration-left-icon"
              />
            </div>
          </div>

          <div className="illustration-right">
            <img
              src="/assets/PlayerDashboard/Player-login-3.png"
              alt="Basketball player"
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

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="visually-hidden">
                Email ID
              </label>
              <div className="input-with-icon">
                <img 
                  src="/assets/icons/mail.png" 
                  alt="Email" 
                  className="input-icon" 
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Email ID"
                  className="form-input"
                  value={email}
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
                <img 
                  src="/assets/icons/lock.png" 
                  alt="Password" 
                  className="input-icon" 
                />
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="forgot-password">
              <Link to="/player/forgot-password">Forget Password?</Link>
            </div>

            <Buttoncustom
              text={loading ? "Signing in..." : "Sign in"}
              style={{ width: "100%" }}
              disabled={loading}
              type="submit"
            />

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