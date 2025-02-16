import React from "react";
import "./buttoncustom.css"; // Import CSS file

const Buttoncustom = ({ text, Icon, style }) => {
  return (
    <button className="neumorphic-btn" style={style}>
      {Icon && <Icon className="button-icon" />} {/* Icon before text */}
      {text}
    </button>
  );
};
export default Buttoncustom;
