import React from "react";
import "./infoCard.css";

const InfoCard = ({ title, content }) => (
  <div className="info-card-academy card-academy">
    <h3 className="info-card-title-academy">{title}</h3>
    <p className="info-card-content-academy">{content}</p>
  </div>
);

export default InfoCard;
