import React from "react";
import "./Footer.css";
import Buttoncustom from "../../../common/Buttoncustom";
import {
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaXTwitter,
} from "react-icons/fa6";
function Footer() {
  return (
    <footer>
      <div className="footer-container">
        {/* Left Section - Logo and Contact */}
        <div className="footer-logo">
          <img src="/assets/logot.png" alt="Game On Logo" />

          <div className="footer-text">
            <h2 className="footer-brand">GAMEON</h2>
            <p className="footer-email">support@GameON.com</p>
          </div>
        </div>
        {/* Center Section - Subscribe & Tournament Updates */}
        <div className="footer-center">
          <img src="/assets/footer-logo.svg" alt="Tournament Logo" />
          <p>Subscribe for tournament updates</p>
          <div className="subscribe-box">
            <input type="email" placeholder="Get product updates" />
            <button>➜</button>
          </div>
          <p>For further information, please visit Game On</p>
          <div className="footer-socials">
            <button>
              <FaXTwitter />
            </button>
            <button>
              <FaYoutube />
            </button>
            <button>
              <FaInstagram />
            </button>
            <button>
              <FaEnvelope />
            </button>
          </div>
        </div>

        {/* Right Section - Links */}
        <div className="footer-links">
          <h3>More Information</h3>
          <ul>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Data Protection & Security</a>
            </li>
          </ul>
          <Buttoncustom text="JOIN US NOW" />
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>© 2025 GameON. All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
