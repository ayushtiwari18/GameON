import React, { useState } from "react";
import "./SignUpDropdown.css";
import Buttoncustom from "../../common/Buttoncustom";

const SignUpDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonStyle = {
    background: "linear-gradient(90deg, #4a55e2, #0b0b2c)",
    color: "white",
    padding: "12px 30px",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    borderRadius: "40px",
    boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease",
    ...style, // Allow passing additional styles
  };
  return (
    <div
      className="signup-container"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="signup-btn">Sign Up</button>

      {isOpen && (
        <div className="dropdown-menu">
          <Buttoncustom text="As Player" style={buttonStyle}>
            As Player
          </Buttoncustom>
          <Buttoncustom text="As Academy" style={buttonStyle}></Buttoncustom>
        </div>
      )}
    </div>
  );
};

export default SignUpDropdown;
