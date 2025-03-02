import React, { useState, useEffect } from "react";
import "./AcademyLogin.css";
import { Link, useNavigate } from "react-router-dom";
import Buttoncustom from "../../../common/Buttoncustom";
import academyService from "../../../../../Backend/src/api/services/academyService";

function AcademyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated via cookies
    const checkAuthentication = async () => {
      try {
        const { authenticated, academyId } =
          await academyService.auth.checkAuth();

        if (authenticated && academyId) {
          // User is already authenticated with valid cookie
          navigate(`/academy`);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await academyService.auth.login(email, password);
      setLoading(false);

      if (response.academy && response.academy.id) {
        // With cookie auth, we don't need to pass parameters in URL
        navigate(`/academy`);
      } else {
        setError("Could not retrieve academy ID. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || "Login failed. Please check your credentials.");
      console.error("Login error:", err);
    }
  };

  // Show loading state while checking authentication
  if (checkingAuth) {
    return <div className="login-container-academy">Loading...</div>;
  }

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

          {error && <div className="error-message">{error}</div>}

          <form className="login-form" onSubmit={handleSubmit}>
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
              <Link to="/academy/forgot-password">Forget Password?</Link>
            </div>

            <Buttoncustom
              text={loading ? "Signing in..." : "Sign in"}
              style={{ width: "100%" }}
              type="submit"
              disabled={loading}
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
