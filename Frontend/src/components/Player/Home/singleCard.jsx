import React from "react";
import "./singleCard.css"; // Import CSS for styling

const Card = ({ width = "300px", text, image, imgclass }) => {
  return (
    <div className="card" style={{ width }}>
      <p className="card-text">{text}</p>
      <img src={image} alt="Card Visual" className={`card-image-${imgclass}`} />
    </div>
  );
};

export default Card;
