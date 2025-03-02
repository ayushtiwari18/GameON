import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AcademySignup.css";
import { Camera } from "lucide-react";
import Buttoncustom from "../../../common/Buttoncustom";
import academyService from "../../../services/academyService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AcademySignup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    academyName: "",
    contactPersonName: "",
    specialization: "",
    phoneNumber: "",
    state: "",
    city: "",
    password: "",
    address: "",
    emailId: "",
  });

  console.log("formData:", formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const requiredFields = {
      academyName: "Academy Name",
      emailId: "Email",
      password: "Password",
      phoneNumber: "Contact number",
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => !formData[key])
      .map(([, label]) => label);

    if (missingFields.length > 0) {
      toast.error(`Required fields missing: ${missingFields.join(", ")}`);
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.emailId)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }

    return true;
  };

  const checkDuplicate = async () => {
    try {
      const response = await academyService.auth.checkDuplicate({
        Email: formData.emailId,
        Contact_number: formData.phoneNumber,
      });
      return response;
    } catch (error) {
      console.error("Duplicate check error:", error);
      toast.error("Error checking duplicate records");
      return { emailExists: false, phoneExists: false };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      // First check for duplicates
      const duplicateCheck = await checkDuplicate();

      if (duplicateCheck.emailExists) {
        toast.error("Email is already registered");
        setLoading(false);
        return;
      }

      if (duplicateCheck.phoneExists) {
        toast.error("Phone number is already registered");
        setLoading(false);
        return;
      }

      // If no duplicates, proceed with registration
      const academyData = {
        name: formData.academyName,
        contactPerson: formData.contactPersonName,
        specialization: formData.specialization,
        email: formData.emailId,
        phone: formData.phoneNumber,
        city: formData.city,
        state: formData.state,
        address: formData.address,
        password: formData.password,
      };

      const response = await academyService.auth.register(academyData);

      if (response && response.token) {
        // Save token and academy ID
        localStorage.setItem("token", response.token);

        // If there's a profile image, upload it
        if (profileImage && response.academyId) {
          const imageFormData = new FormData();
          imageFormData.append("profileImage", profileImage);
          await academyService.profile.uploadProfileImage(
            response.academyId,
            imageFormData
          );
        }

        // If the response includes the academy ID, save it
        if (response.academyId) {
          localStorage.setItem("academyId", response.academyId);
        } else {
          // Try to extract from token
          try {
            const payload = JSON.parse(atob(response.token.split(".")[1]));
            if (payload && payload.id) {
              localStorage.setItem("academyId", payload.id);
            }
          } catch (error) {
            console.error("Error decoding token:", error);
          }
        }

        toast.success("Registration successful!");
        navigate("/academy");
      } else {
        toast.warning(
          "Registration successful, but automatic login failed. Please login manually."
        );
        navigate("/academy/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-academy">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <header>
        <div className="header-container-academy">
          <div className="header-left-academy">
            <img
              src="/assets/logo.png"
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
        <form onSubmit={handleSubmit}>
          <div className="form-grid-academy">
            <div className="form-group-academy">
              <label htmlFor="academyName">Academy name</label>
              <input
                id="academyName"
                name="academyName"
                placeholder="Enter academy name"
                value={formData.academyName}
                onChange={handleInputChange}
              />
            </div>

            <div className="photo-upload-academy">
              <label htmlFor="profileImageInput" className="photo-btn-academy">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="profile-preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <>
                    <Camera size={24} />
                    <span>Add photo</span>
                  </>
                )}
              </label>
              <input
                type="file"
                id="profileImageInput"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>

            <div className="form-group-academy">
              <label htmlFor="contactPersonName">Contact Person's Name</label>
              <input
                id="contactPersonName"
                name="contactPersonName"
                placeholder="Enter contact person's name"
                value={formData.contactPersonName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group-academy">
              <label htmlFor="specialization">Specialization sports</label>
              <input
                id="specialization"
                name="specialization"
                placeholder="Enter sports you provide"
                value={formData.specialization}
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
            <Link to="/academy">
              <Buttoncustom text="Save"></Buttoncustom>
            </Link>
            <Buttoncustom text="Confirm"></Buttoncustom>
            <Buttoncustom
              text="Register"
              onClick={handleSubmit}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AcademySignup;
