import React from "react";
import "./AcademyCard.css";
import { FaWhatsapp, FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa";

const AcademyCard = () => {
  return (
    <div className="academy-card-container">
      <div className="academy-card-header">
        <div className="academy-card-logo">Logo</div>
        <div className="academy-card-title">Basketball Academy</div>
      </div>
      <div className="academy-card-image">
        <img src="/assets/Basketball Court.jpg" alt="Basketball Court" />
      </div>
      <div className="academy-card-description">
        The GameOn Basketball Championship brings together the most talented
        teams and rising stars for an electrifying tournament filled with skill,
        speed, and passion.
      </div>
      <div className="academy-card-tags">Basketball Football Tennis</div>
      <div className="academy-card-details">
        <div className="academy-card-location">
          Krishi upag mandi deen dayal chowk
        </div>
        <div className="academy-card-vacancy">Vacancy Available</div>
        <div className="academy-card-contact">Contact No</div>
      </div>
      <div className="academy-card-footer">
        <button className="academy-card-join">Join Now</button>
        <div className="academy-card-rating">⭐⭐⭐⭐☆</div>
        <div className="academy-card-social-icons">
          <FaWhatsapp />
          <FaLinkedin />
          <FaYoutube />
          <FaTwitter />
        </div>
      </div>
    </div>
  );
};

export default AcademyCard;
