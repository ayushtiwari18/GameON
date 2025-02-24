import React from "react";
import "./InfoCard.css";

const InfoCard = ({ title, content }) => (
  <div className="info-card card">
    <h3 className="info-card-title">{title}</h3>
    <p className="info-card-content">{content}</p>
  </div>
);

export default InfoCard;
