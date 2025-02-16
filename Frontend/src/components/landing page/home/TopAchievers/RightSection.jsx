import React from "react";
import "./RightSection.css";
const RightSection = ({ text, image }) => {
  return (
    <div className="right-section">
      <div className="basketball-text">{text}</div>
      <img src={image} alt="Basketball Players" className="basketball-image" />
    </div>
  );
};

export default RightSection;
