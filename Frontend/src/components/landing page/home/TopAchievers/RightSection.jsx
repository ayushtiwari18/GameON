import React from "react";
import "./RightSection.css";
const RightSection = ({ text, image }) => {
  return (
    <div className="right-section-home">
      <div className="basketball-text-right">{text}</div>
      <img
        src={image}
        alt="Basketball Players"
        className="basketball-image-right"
      />
    </div>
  );
};

export default RightSection;
