import { Link } from "react-router-dom"
import "./Login.css"

function AcademyLogin() {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Welcome back!</h2>
        <h3>Sign in to your Academy Account</h3>

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

        <form>
          <div className="form-group">
            <label>Email ID</label>
            <input type="email" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" required />
          </div>

          <Link to="/forgot-password" className="forgot-password">
            Forget Password?
          </Link>

          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </form>

        <p className="register-link">
          Don't have an account? <Link to="/academy-registration">Register Academy</Link>
        </p>
      </div>
    </div>
  )
}

export default AcademyLogin

