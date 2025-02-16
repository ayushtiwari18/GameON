import React from "react";
import "./LeftSection.css";

const LeftSection = ({ image, text }) => {
  return (
    <div className="left-section">
      <img src={image} alt="Football Players" className="football-image" />
      <div className="football-text">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default LeftSection;
