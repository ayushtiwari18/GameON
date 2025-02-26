import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AcademySignup.css";
import { Camera } from "lucide-react";
import Buttoncustom from "../../../common/Buttoncustom";
function AcademySignup() {
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

  return (
    <div className="app-academy">
      <header>
        <div className="header-container-academy">
          <div className="header-left-academy">
            <img
              src="/assets/logot.png"
              alt="Game On Logo"
              className="logo-academy"
            />
            <span className="brand-name-academy">GAME ON</span>
          </div>
          <div className="header-right-academy">
            <span className="member-text-academy">Already a member?</span>
            <Link to="/academy/login" className="signin-link-academy">
              login
            </Link>
          </div>
          <div className="welcome-box-academy">
            <h2 className="welcome-title-academy">Welcome!</h2>
            <p className="welcome-text-academy">
              Start your journey to becoming a champion
              <br />
              <span className="quote-academy">
                "Step Onto the Field of Greatness – Join Us Today!"
              </span>
            </p>
          </div>
        </div>
      </header>

      <div className="signup-card-academy">
        <form>
          <div className="form-grid-academy">
            <div className="form-group-academy">
              <label htmlFor="fullName"> Academy name</label>
              <input
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                onChange={handleInputChange}
              />
            </div>

            <div className="photo-upload-academy">
              <button type="button" className="photo-btn-academy">
                <Camera size={24} />
                <span>Add photo</span>
              </button>
            </div>

            <div className="form-group-academy">
              <label htmlFor="Content-Person-Name">
                {" "}
                Content Person's Name{" "}
              </label>
              <input
                id=" Content-Person-Name "
                name="Content-Person-Name"
                placeholder="Enter Content Person's Name"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group-academy">
              <label htmlFor="specialization">Specialization sports</label>
              <input
                id="specialization"
                name="specialization"
                placeholder="Enter sports you provide"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group-academy">
              <label htmlFor="phoneNumber">Phone number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group-academy">
              <label htmlFor="state">State</label>
              <input
                id="state"
                name="state"
                placeholder="Enter your state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group-academy">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group-academy">
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

            <div className="form-group-academy full-width">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group-academy">
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

          <div className="button-group-signup-academy">
            <Buttoncustom text="Review"></Buttoncustom>
            <Link to="/player">
              <Buttoncustom text="Save"></Buttoncustom>
            </Link>
            <Buttoncustom text="confirm"></Buttoncustom>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AcademySignup;
